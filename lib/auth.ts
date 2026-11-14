import { createHmac, randomBytes, scryptSync, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";
import { getSetting, setSetting } from "./store";

export const SESSION_COOKIE = "cw_admin_session";
const TTL_MS = 1000 * 60 * 60 * 24 * 7; // 7 days

const PASSWORD_KEY = "admin_password";

function secret() {
  return process.env.SESSION_SECRET ?? process.env.ADMIN_PASSWORD ?? "dev-secret";
}

/* ---------- password (scrypt hash stored in DB) ---------- */

export function hashPassword(password: string): string {
  const salt = randomBytes(16).toString("hex");
  const hash = scryptSync(password, salt, 64).toString("hex");
  return `scrypt$${salt}$${hash}`;
}

function verifyPassword(password: string, stored: string): boolean {
  const [algo, salt, hash] = stored.split("$");
  if (algo !== "scrypt" || !salt || !hash) return false;
  const candidate = scryptSync(password, salt, 64);
  return timingSafeEqual(Buffer.from(hash, "hex"), candidate);
}

/**
 * เช็ครหัสจาก DB ก่อน — ถ้า DB ยังไม่มี record (ฐานใหม่ที่ว่าง)
 * ให้ bootstrap จาก env ADMIN_PASSWORD แล้วเขียน hash ลง DB ให้อัตโนมัติ
 * → ย้ายฐานข้อมูลแล้ว login ด้วยรหัสเดิมได้ทันที
 */
export async function checkPassword(input: string): Promise<boolean> {
  try {
    const stored = await getSetting(PASSWORD_KEY);
    if (stored) return verifyPassword(input, stored);
  } catch {
    // DB ยังไม่พร้อม — fallback env
  }
  const envPass = process.env.ADMIN_PASSWORD ?? "admin1234";
  if (input === envPass) {
    setSetting(PASSWORD_KEY, hashPassword(envPass)).catch(() => {});
    return true;
  }
  return false;
}

export async function changePassword(current: string, next: string): Promise<boolean> {
  if (!(await checkPassword(current))) return false;
  await setSetting(PASSWORD_KEY, hashPassword(next));
  return true;
}

/* ---------- session token ---------- */

export function createToken(): string {
  const payload = `admin:${Date.now() + TTL_MS}`;
  const sig = createHmac("sha256", secret()).update(payload).digest("hex");
  return `${Buffer.from(payload).toString("base64url")}.${sig}`;
}

export function verifyToken(token?: string): boolean {
  if (!token) return false;
  const [b64, sig] = token.split(".");
  if (!b64 || !sig) return false;
  const payload = Buffer.from(b64, "base64url").toString();
  const expect = createHmac("sha256", secret()).update(payload).digest("hex");
  try {
    if (!timingSafeEqual(Buffer.from(sig), Buffer.from(expect))) return false;
  } catch {
    return false;
  }
  const exp = Number(payload.split(":")[1]);
  return payload.startsWith("admin:") && exp > Date.now();
}

export async function isAuthed() {
  const store = await cookies();
  return verifyToken(store.get(SESSION_COOKIE)?.value);
}
