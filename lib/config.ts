export interface SupaConfig {
  url: string;
  key: string;
  table: string;
}

// env-only — ตั้งค่าใน .env.local ตอน dev / project env vars ตอน deploy
export async function loadConfig(): Promise<SupaConfig> {
  return {
    url: process.env.SUPABASE_URL ?? "",
    key: process.env.SUPABASE_SERVICE_ROLE_KEY ?? "",
    table: process.env.SUPABASE_TABLE ?? "members",
  };
}
