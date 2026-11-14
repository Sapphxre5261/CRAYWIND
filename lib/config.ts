import { promises as fs } from "fs";
import path from "path";

export interface SupaConfig {
  url: string;
  key: string;
  table: string;
}

function parseIni(text: string): Record<string, Record<string, string>> {
  const out: Record<string, Record<string, string>> = {};
  let section = "";
  for (const raw of text.split(/\r?\n/)) {
    const line = raw.trim();
    if (!line || line.startsWith(";") || line.startsWith("#")) continue;
    const m = line.match(/^\[(.+)\]\s*$/);
    if (m) {
      section = m[1].trim();
      out[section] ??= {};
      continue;
    }
    const i = line.indexOf("=");
    if (i === -1) continue;
    out[section] ??= {};
    out[section][line.slice(0, i).trim()] = line.slice(i + 1).trim();
  }
  return out;
}

const CONFIG_FILE = path.join(process.cwd(), "config.ini");

// อ่าน config.ini สดทุกครั้ง (ไฟล์เล็กมาก) — จุดตั้งค่าฐานข้อมูลเดียวของทั้งเว็บ
export async function loadConfig(): Promise<SupaConfig> {
  const raw = await fs.readFile(CONFIG_FILE, "utf8").catch(() => "");
  const ini = parseIni(raw);
  return {
    // env vars override config.ini — handy on Vercel where secrets live in env
    url: process.env.SUPABASE_URL ?? ini.supabase?.url ?? "",
    key: process.env.SUPABASE_SERVICE_ROLE_KEY ?? ini.supabase?.service_role_key ?? "",
    table: ini.supabase?.table ?? "members",
  };
}
