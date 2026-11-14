import { NextResponse } from "next/server";
import { changePassword, isAuthed } from "@/lib/auth";

export async function POST(req: Request) {
  if (!(await isAuthed())) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
  const { current, next } = await req.json().catch(() => ({}));
  if (typeof next !== "string" || next.length < 6) {
    return NextResponse.json({ error: "รหัสผ่านใหม่ต้องยาวอย่างน้อย 6 ตัว" }, { status: 400 });
  }
  const ok = await changePassword(current ?? "", next);
  if (!ok) {
    return NextResponse.json({ error: "รหัสผ่านปัจจุบันไม่ถูกต้อง" }, { status: 403 });
  }
  return NextResponse.json({ ok: true });
}
