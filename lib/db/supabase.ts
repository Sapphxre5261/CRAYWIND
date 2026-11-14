import type { Member } from "@/data/members";

interface SupaCfg {
  url: string;
  key: string;
  table: string;
}

const SETTINGS_TABLE = "settings";

function endpoint(cfg: SupaCfg, table = cfg.table) {
  if (!cfg.url || !cfg.key) {
    throw new Error(
      "Supabase config missing — ตั้ง env SUPABASE_URL + SUPABASE_SERVICE_ROLE_KEY"
    );
  }
  return `${cfg.url.replace(/\/$/, "")}/rest/v1/${table}`;
}

function headers(cfg: SupaCfg, extra: Record<string, string> = {}) {
  return {
    apikey: cfg.key,
    Authorization: `Bearer ${cfg.key}`,
    "Content-Type": "application/json",
    ...extra,
  };
}

export async function getMembers(cfg: SupaCfg): Promise<Member[]> {
  const res = await fetch(`${endpoint(cfg)}?select=name,rank,facebook&order=pos.asc`, {
    headers: headers(cfg),
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`Supabase read failed: ${res.status} ${await res.text()}`);
  const rows = (await res.json()) as Member[];
  return rows.map((r) => ({ name: r.name, rank: r.rank, facebook: r.facebook }));
}

export async function saveMembers(cfg: SupaCfg, members: Member[]) {
  // insert ก่อนแล้วค่อยลบแถวเก่า — ถ้าล้มกลางทางข้อมูลเดิมไม่หาย (retry แล้วหายเอง)
  let newIds: number[] = [];
  if (members.length > 0) {
    const rows = members.map((m, i) => ({
      name: m.name.trim(),
      rank: m.rank,
      facebook: m.facebook ?? "",
      pos: i,
    }));
    const ins = await fetch(endpoint(cfg), {
      method: "POST",
      headers: headers(cfg, { Prefer: "return=representation" }),
      body: JSON.stringify(rows),
    });
    if (!ins.ok) throw new Error(`Supabase insert failed: ${ins.status} ${await ins.text()}`);
    newIds = ((await ins.json()) as { id: number }[]).map((r) => r.id);
  }

  const del = await fetch(
    `${endpoint(cfg)}?id=${newIds.length ? `not.in.(${newIds.join(",")})` : "gte.0"}`,
    { method: "DELETE", headers: headers(cfg) }
  );
  if (!del.ok) throw new Error(`Supabase delete failed: ${del.status} ${await del.text()}`);
}

export async function getSetting(cfg: SupaCfg, key: string): Promise<string | null> {
  try {
    const res = await fetch(
      `${endpoint(cfg, SETTINGS_TABLE)}?key=eq.${encodeURIComponent(key)}&select=value`,
      { headers: headers(cfg), cache: "no-store" }
    );
    if (!res.ok) return null;
    const rows = (await res.json()) as { value: string }[];
    return rows[0]?.value ?? null;
  } catch {
    return null; // settings table อาจยังไม่มี — ถือว่าไม่มีค่า
  }
}

export async function setSetting(cfg: SupaCfg, key: string, value: string) {
  const res = await fetch(endpoint(cfg, SETTINGS_TABLE), {
    method: "POST",
    headers: headers(cfg, {
      Prefer: "resolution=merge-duplicates,return=minimal",
    }),
    body: JSON.stringify({ key, value }),
  });
  if (!res.ok) throw new Error(`Supabase setSetting failed: ${res.status} ${await res.text()}`);
}
