"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { RANK_COLORS, RANK_ORDER, type Member, type Rank } from "@/data/members";
import PasswordCard from "./PasswordCard";
import AddMemberModal from "./AddMemberModal";

export default function DashboardClient({
  initialMembers,
}: {
  initialMembers: Member[];
}) {
  const router = useRouter();
  const [list, setList] = useState<Member[]>(initialMembers);
  const [saving, setSaving] = useState(false);
  const [notice, setNotice] = useState<{ ok: boolean; text: string } | null>(null);
  const [query, setQuery] = useState("");

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return list.map((m, i) => ({ m, i })).filter(({ m }) =>
      !q || `${m.name} ${m.rank}`.toLowerCase().includes(q)
    );
  }, [list, query]);

  const dirty = useMemo(
    () => JSON.stringify(list) !== JSON.stringify(initialMembers),
    [list, initialMembers]
  );

  const update = (i: number, patch: Partial<Member>) =>
    setList((l) => l.map((m, j) => (j === i ? { ...m, ...patch } : m)));

  const remove = (i: number) => setList((l) => l.filter((_, j) => j !== i));

  const add = (member: Member) => {
    setList((l) => [...l, member]);
    setNotice({ ok: true, text: `เพิ่ม ${member.name} แล้ว — กดบันทึกการเปลี่ยนแปลงเพื่อยืนยัน` });
  };

  const save = async () => {
    if (list.some((m) => !m.name.trim())) {
      setNotice({ ok: false, text: "มีสมาชิกที่ยังไม่ได้ใส่ชื่อ" });
      return;
    }
    setSaving(true);
    setNotice(null);
    const res = await fetch("/api/members", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(list),
    });
    setSaving(false);
    if (res.ok) {
      setNotice({ ok: true, text: "บันทึกแล้ว — roster อัปเดตเรียบร้อย" });
      router.refresh();
    } else if (res.status === 401) {
      router.push("/login");
    } else {
      setNotice({ ok: false, text: "บันทึกไม่สำเร็จ ลองอีกครั้ง" });
    }
  };

  const logout = async () => {
    await fetch("/api/logout", { method: "POST" });
    router.push("/login");
    router.refresh();
  };

  const counts = useMemo(() => {
    const c: Record<Rank, number> = { founder: 0, leader: 0, lastname: 0, member: 0 };
    for (const m of list) c[m.rank]++;
    return c;
  }, [list]);

  return (
    <div className="mx-auto w-full max-w-[1280px] flex-1 px-[clamp(18px,4vw,40px)] pb-20 [&_input]:rounded-none [&_select]:rounded-none [&_button]:rounded-none [&_.lux-card]:rounded-none">
      {/* Nav */}
      <nav className="sticky top-0 z-50 flex flex-wrap items-center justify-between gap-3 border-b border-white/20 bg-[#0b0b0d]/95 py-4 backdrop-blur-2xl">
        <Link href="/" className="flex items-center gap-3">
          <img
            src="/og-avatar.png"
            alt="Logo"
            className="h-11 w-11 object-contain"
          />
          <span className="font-display text-[13px] font-bold uppercase tracking-[0.25em] text-white">
            ADMIN STUDIO
          </span>
        </Link>
        <div className="flex gap-2">
          <Link
            href="/Craywind"
            className="whitespace-nowrap border border-line bg-white/[0.03] px-[18px] py-[9px] text-[11.5px] tracking-[0.08em] transition-colors duration-300 hover:border-line-strong hover:bg-white/[0.07]"
          >
            ดู Roster
          </Link>
          <button
            onClick={logout}
            className="cursor-pointer whitespace-nowrap rounded-full border border-line bg-white/[0.03] px-[18px] py-[9px] font-sans text-[11.5px] tracking-[0.08em] text-ink transition-colors duration-300 hover:border-[#f43f5e]/60 hover:bg-[#f43f5e]/10"
          >
            ออกจากระบบ
          </button>
        </div>
      </nav>

      {/* Header */}
      <header className="pb-6 pt-[clamp(32px,6vh,56px)]">
        <span className="mb-3.5 block font-mono text-[11px] tracking-[0.14em] text-mute">
          จัดการสมาชิก · {list.length} คน
        </span>
        <h1 className="m-0 font-display text-[calc(clamp(2rem,4.6vw,3.4rem)*0.7)] uppercase leading-[0.95] tracking-[0.12em]">
          Member Studio
        </h1>
        <div className="mt-6 flex flex-wrap gap-5 font-mono text-[10px] uppercase tracking-[0.24em] text-mute">
          {RANK_ORDER.map((r) => (
            <span key={r} className="flex items-center gap-2">
              <i
                className="h-1.5 w-1.5 rounded-full"
                style={{ background: RANK_COLORS[r] }}
              />
              {r} {counts[r]}
            </span>
          ))}
        </div>
      </header>

      {/* Toolbar */}
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-3">
          <AddMemberModal onAdd={add} />
          <div className="relative">
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="ค้นหาชื่อหรือยศ..."
              aria-label="ค้นหาสมาชิก"
              className="w-[220px] border border-line bg-black/40 px-4 py-2.5 pl-9 text-xs text-ink outline-none transition-colors placeholder:text-faint focus:border-line-strong"
            />
            <svg
              aria-hidden
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-faint"
            >
              <circle cx="11" cy="11" r="7" />
              <path d="m20 20-3.5-3.5" />
            </svg>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          {notice && (
            <span
              role="status"
              className={`font-mono text-[10px] tracking-[0.14em] ${
                notice.ok ? "text-emerald-300" : "text-rose-300"
              }`}
            >
              {notice.text}
            </span>
          )}
          <button
            onClick={save}
            disabled={!dirty || saving}
            className="cursor-pointer rounded-full border-0 bg-ink px-6 py-2.5 font-sans text-[11px] font-medium uppercase tracking-[0.22em] text-[#0a0a0a] transition-all duration-300 hover:bg-white disabled:cursor-not-allowed disabled:opacity-30"
          >
            {saving ? "กำลังบันทึก..." : dirty ? "บันทึกการเปลี่ยนแปลง" : "บันทึกแล้ว"}
          </button>
        </div>
      </div>

      {/* Member rows */}
      <div className="overflow-hidden border border-line bg-[#0d0d10]/90">
        <div className="grid grid-cols-[40px_1fr_140px_1fr_56px] items-center gap-3 border-b border-line bg-white/[0.03] px-4 py-3 font-mono text-[9.5px] uppercase tracking-[0.2em] text-faint max-md:hidden">
          <span>#</span>
          <span>ชื่อ</span>
          <span>ยศ</span>
          <span>Facebook URL</span>
          <span />
        </div>

        {visible.map(({ m, i }) => (
          <div
            key={i}
            className="grid grid-cols-[40px_1fr_140px_1fr_56px] items-center gap-3 border-b border-line px-4 py-3 last:border-b-0 max-md:grid-cols-[32px_1fr_56px] max-md:gap-2"
          >
            <span className="font-mono text-[10px] text-faint">{i + 1}</span>

            <input
              value={m.name}
              onChange={(e) => update(i, { name: e.target.value })}
              placeholder="ชื่อสมาชิก"
              className="w-full rounded-lg border border-line bg-black/40 px-3 py-2 text-[13px] font-light text-ink outline-none transition-colors placeholder:text-faint focus:border-line-strong"
            />

            <div className="relative max-md:col-start-1 max-md:row-start-2 max-md:col-span-3">
              <i
                className="pointer-events-none absolute left-3 top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full"
                style={{ background: RANK_COLORS[m.rank] }}
              />
              <select
                value={m.rank}
                onChange={(e) => update(i, { rank: e.target.value as Rank })}
                className="w-full cursor-pointer appearance-none rounded-lg border border-line bg-black/40 py-2 pl-7 pr-3 font-mono text-[10px] uppercase tracking-[0.14em] text-ink outline-none transition-colors focus:border-line-strong"
              >
                {RANK_ORDER.map((r) => (
                  <option key={r} value={r} className="bg-[#0c0c0e]">
                    {r}
                  </option>
                ))}
              </select>
            </div>

            <input
              value={m.facebook}
              onChange={(e) => update(i, { facebook: e.target.value })}
              placeholder="https://www.facebook.com/..."
              className="w-full rounded-lg border border-line bg-black/40 px-3 py-2 font-mono text-[11px] font-light text-ink outline-none transition-colors placeholder:text-faint focus:border-line-strong max-md:col-start-1 max-md:row-start-3 max-md:col-span-3"
            />

            <button
              onClick={() => remove(i)}
              title="ลบ"
              className="cursor-pointer rounded-lg border border-line bg-transparent px-2 py-2 font-mono text-[10px] text-faint transition-all duration-200 hover:border-[#f43f5e]/60 hover:bg-[#f43f5e]/10 hover:text-rose-300 max-md:col-start-3 max-md:row-start-1"
            >
              ลบ
            </button>
          </div>
        ))}

        {visible.length === 0 && (
          <div className="px-5 py-16 text-center text-[13px] text-faint">
            {list.length === 0
              ? "ไม่มีสมาชิก — กด “เพิ่มสมาชิก” เพื่อเริ่ม"
              : <>ไม่พบ “{query.trim()}” — <button onClick={() => setQuery("")} className="cursor-pointer text-mute underline underline-offset-4 transition-colors hover:text-ink">ล้างคำค้น</button></>}
          </div>
        )}
      </div>

      <PasswordCard />
    </div>
  );
}
