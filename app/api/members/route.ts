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
    const fb = typeof m?.facebook === "string" ? m.facebook.trim() : "";
    if (
      typeof m?.name !== "string" ||
      !m.name.trim() ||
      !RANK_ORDER.includes(m?.rank) ||
      (fb !== "" && !/^https?:\/\//i.test(fb)) // กัน javascript:/data: URL ไปโผล่ใน href หน้า public
    ) {
      return NextResponse.json({ error: "invalid member" }, { status: 400 });
    }
    members.push({ name: m.name.trim(), rank: m.rank, facebook: fb });
  }
  await saveMembers(members);
  return NextResponse.json({ ok: true, count: members.length });
}
