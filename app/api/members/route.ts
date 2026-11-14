import { NextResponse } from "next/server";
import { isAuthed } from "@/lib/auth";
import { getMembers, saveMembers } from "@/lib/store";
import { RANK_ORDER, type Member } from "@/data/members";

export async function GET() {
  return NextResponse.json(await getMembers());
}

export async function PUT(req: Request) {
  if (!(await isAuthed())) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
  const body = await req.json().catch(() => null);
  if (!Array.isArray(body)) {
    return NextResponse.json({ error: "expected array" }, { status: 400 });
  }
  const members: Member[] = [];
  for (const m of body) {
    if (
      typeof m?.name !== "string" ||
      !m.name.trim() ||
      !RANK_ORDER.includes(m?.rank) ||
      typeof m?.facebook !== "string"
    ) {
      return NextResponse.json({ error: "invalid member" }, { status: 400 });
    }
    members.push({ name: m.name.trim(), rank: m.rank, facebook: m.facebook.trim() });
  }
  await saveMembers(members);
  return NextResponse.json({ ok: true, count: members.length });
}
