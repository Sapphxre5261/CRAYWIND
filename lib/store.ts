import type { Member } from "@/data/members";
import { loadConfig } from "./config";
import * as supabase from "./db/supabase";

export async function getMembers(): Promise<Member[]> {
  const cfg = await loadConfig();
  return supabase.getMembers(cfg);
}

export async function saveMembers(members: Member[]) {
  const cfg = await loadConfig();
  return supabase.saveMembers(cfg, members);
}

export async function getSetting(key: string): Promise<string | null> {
  const cfg = await loadConfig();
  return supabase.getSetting(cfg, key);
}

export async function setSetting(key: string, value: string) {
  const cfg = await loadConfig();
  return supabase.setSetting(cfg, key, value);
}
