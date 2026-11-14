"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { RANK_COLORS, RANK_ORDER, type Member, type Rank } from "@/data/members";

const rankLabels: Record<Rank, string> = {
  founder: "ผู้ก่อตั้ง",
  leader: "ผู้นำทีม",
  lastname: "ครอบครัว Craywind",
  member: "สมาชิก",
};

export default function RosterClient({ members }: { members: Member[] }) {
  const [filter, setFilter] = useState<Rank | "all">("all");
  const [query, setQuery] = useState("");
  const searchRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        searchRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const counts = Object.fromEntries(RANK_ORDER.map((rank) => [
    rank, members.filter((m) => m.rank === rank).length,
  ])) as Record<Rank, number>;
  const visible = members.filter((m) =>
    (filter === "all" || m.rank === filter) &&
    `${m.name} ${m.rank} ${rankLabels[m.rank]}`.toLowerCase().includes(query.trim().toLowerCase()),
  );

  return (
    <>
      <nav aria-label="เมนูหลัก" className="relative mx-auto w-full max-w-[720px] px-5 pt-7 sm:pt-9">
        <div aria-hidden className="pointer-events-none absolute inset-x-1/4 top-6 h-28 rounded-full bg-[#d5bc84]/[0.06] blur-3xl" />
        <div className="relative flex items-center justify-center gap-6 sm:gap-10">
          <span aria-hidden className="h-px flex-1 bg-linear-to-r from-transparent to-[#d8c18c]/35" />
          <Link href="/" className="group flex shrink-0 flex-col items-center">
            <img src="/og-avatar.png" alt="" width={54} height={54} className="mb-3 object-contain drop-shadow-[0_2px_10px_#d4b87730] transition-transform duration-300 group-hover:scale-105 motion-reduce:transform-none" />
            <span className="bg-linear-to-b from-white to-[#a8a8b0] bg-clip-text font-display text-base font-bold tracking-[0.22em] text-transparent sm:text-xl">CRAYWIND</span>
            <span className="mt-2 font-mono text-[7px] tracking-[0.4em] text-[#cbb680]/80">WINTERFELL</span>
          </Link>
          <span aria-hidden className="h-px flex-1 bg-linear-to-l from-transparent to-[#d8c18c]/35" />
        </div>
        <div className="relative mx-auto mt-6 grid max-w-[420px] grid-cols-3 border-b border-white/10 text-xs">
          <Link href="/" className="group flex min-h-14 items-center justify-center gap-2 rounded-t-lg text-[#a4a4af] transition-colors hover:bg-white/[0.03] hover:text-white">
            <svg aria-hidden viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="hidden h-3.5 w-3.5 sm:block"><path d="m3 10 9-7 9 7M5 9v12h5v-7h4v7h5V9" /></svg>
            หน้าแรก
          </Link>
          <Link href="/Craywind" aria-current="page" className="relative flex min-h-14 items-center justify-center gap-2 rounded-t-lg bg-linear-to-t from-white/[0.07] to-transparent font-medium text-white">
            สมาชิก <span className="font-mono text-[8px] text-[#cbb680]">{String(members.length).padStart(2, "0")}</span>
            <span aria-hidden className="absolute inset-x-5 -bottom-px h-px bg-linear-to-r from-transparent via-[#d8c18c] to-transparent" />
            <span aria-hidden className="absolute -bottom-[3px] left-1/2 h-[5px] w-[5px] -translate-x-1/2 rotate-45 bg-[#d8c18c] shadow-[0_0_10px_#d8c18c60]" />
          </Link>
          <Link href="/login" className="flex min-h-14 items-center justify-center gap-2 rounded-t-lg font-mono text-[9px] tracking-[0.1em] text-[#a4a4af] transition-colors hover:bg-white/[0.03] hover:text-white">
            <svg aria-hidden viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="hidden h-3.5 w-3.5 sm:block"><path d="m12 3 8 3v5c0 5-4 8-8 10-4-2-8-5-8-10V6Z" /><path d="m9 12 2 2 4-4" /></svg>
            ADMIN <span aria-hidden className="text-xs sm:hidden">↗</span>
          </Link>
        </div>
      </nav>

      <main className="mx-auto w-full max-w-[1360px] px-5 pb-10 sm:px-10">
        <header className="relative my-8 overflow-hidden border border-white/15 bg-[#101012] sm:my-10">
          <div aria-hidden className="absolute inset-0 bg-[url('/Craywind_X3UF.png')] bg-cover bg-center opacity-50 sm:bg-[position:100%_42%]" />
          <div aria-hidden className="absolute inset-0 bg-linear-to-r from-[#09090b] via-[#09090b]/80 to-transparent" />
          <div className="relative flex min-h-[330px] flex-col justify-center p-7 sm:min-h-[380px] sm:p-12">
            <p className="mb-7 flex items-center gap-3 font-mono text-[10px] tracking-[0.24em] text-mute"><span className="h-px w-8 bg-accent" /> THE CRAYWIND COLLECTIVE</p>
            <h1 className="font-display text-[clamp(1.5rem,5.7vw,4.6rem)] font-bold leading-[1.12] tracking-tight">
              ONE NAME.<br /><span className="bg-linear-to-b from-white via-[#c4c5c8] to-[#626368] bg-clip-text text-transparent">ONE FAMILY.</span>
            </h1>
            <p className="mt-6 text-sm text-[#b4b4b9]">ทุกชื่อ คือส่วนหนึ่งของ CRAYWIND</p>
            <span className="absolute right-6 bottom-5 font-mono text-[9px] tracking-[0.25em] text-white/40 sm:right-10">WINTERFELL / CRAYWIND</span>
          </div>
          <span aria-hidden className="absolute top-0 left-0 h-1 w-20 bg-accent" />
        </header>

        <div className="rounded-xl border border-white/15 bg-[#121215]/45 p-4 backdrop-blur-sm sm:p-8">
        <div className="mb-10 grid grid-cols-2 gap-3 lg:grid-cols-4">
          {RANK_ORDER.map((rank, i) => (
            <button key={rank} onClick={() => setFilter(filter === rank ? "all" : rank)} aria-pressed={filter === rank}
              className={`group flex cursor-pointer items-center justify-between gap-2 rounded-lg border p-4 text-left transition-colors sm:p-5 ${filter === rank ? "border-accent/70 bg-accent/15" : "border-white/15 bg-linear-to-br from-[#303034] to-[#202024] hover:border-white/40"}`}>
              <span><span className="mb-2 block font-mono text-[9px] text-faint">0{i + 1} /</span><span className="font-mono text-[10px] uppercase tracking-[0.15em] sm:text-xs">{rank}</span></span>
              <span className="font-display text-2xl font-medium text-[#eeeef1] sm:text-3xl">{String(counts[rank]).padStart(2, "0")}</span>
            </button>
          ))}
        </div>

        <div className="mb-6 flex flex-wrap items-end justify-between gap-6">
          <div><p className="mb-2 font-mono text-[9px] tracking-[0.24em] text-accent">THE PEOPLE BEHIND THE NAME</p><h2 className="text-2xl font-medium tracking-wide sm:text-3xl">รายชื่อสมาชิก<span className="ml-3 align-top font-mono text-xs text-mute">/{members.length}</span></h2></div>
          <div className="relative w-full sm:w-80">
            <svg aria-hidden viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="absolute top-3.5 left-4 h-4 w-4 text-mute"><circle cx="10.5" cy="10.5" r="6.5" /><path d="m16 16 5 5" /></svg>
            <input ref={searchRef} type="search" aria-label="ค้นหาสมาชิก" placeholder="ค้นหาชื่อ หรือ ยศ..." value={query} onChange={(e) => setQuery(e.target.value)} className="w-full border border-white/15 bg-[#101012] py-3 pr-14 pl-11 text-sm placeholder:text-faint focus:border-white/50 focus:outline-none" />
            <kbd className="pointer-events-none absolute top-4 right-3 font-mono text-[9px] text-faint">Ctrl K</kbd>
          </div>
        </div>
        <div aria-label="กรองตามยศ" className="mb-10 flex flex-wrap gap-1 border-b border-white/10">
          {(["all", ...RANK_ORDER] as const).map((rank) => (
            <button key={rank} onClick={() => setFilter(rank)} aria-pressed={filter === rank}
              className={`cursor-pointer border-b-2 px-4 py-4 font-mono text-[10px] uppercase tracking-[0.1em] transition-colors ${filter === rank ? "border-accent text-white" : "border-transparent text-mute hover:text-white"}`}>
              {rank === "all" ? "ทั้งหมด" : rank} <span className="ml-2 text-faint">{rank === "all" ? members.length : counts[rank]}</span>
            </button>
          ))}
        </div>

        {RANK_ORDER.map((rank, rankIndex) => {
          const list = visible.filter((m) => m.rank === rank);
          if (!list.length) return null;
          return (
            <section key={rank} aria-labelledby={`rank-${rank}`} className="mb-12">
              <div
                className="relative mb-5 flex items-center gap-4 overflow-hidden rounded-lg border px-4 py-3.5 sm:px-5"
                style={{ borderColor: `${RANK_COLORS[rank]}38`, background: `linear-gradient(90deg, ${RANK_COLORS[rank]}14, transparent 55%)` }}
              >
                <span aria-hidden className="absolute inset-y-0 left-0 w-[3px]" style={{ background: RANK_COLORS[rank] }} />
                <span aria-hidden className="pointer-events-none absolute right-20 top-1/2 hidden -translate-y-1/2 select-none font-display text-6xl font-black uppercase tracking-wider opacity-[0.05] sm:block">{rank}</span>
                <span className="font-mono text-[10px]" style={{ color: RANK_COLORS[rank] }}>0{rankIndex + 1}</span>
                <h3 id={`rank-${rank}`} className="font-display text-base font-bold uppercase tracking-[0.18em] sm:text-lg">{rank}</h3>
                <span className="hidden border-l border-white/10 pl-4 text-xs text-mute sm:inline">{rankLabels[rank]}</span>
                <div className="h-px flex-1" style={{ background: `linear-gradient(90deg, ${RANK_COLORS[rank]}40, transparent)` }} />
                <span className="relative border px-2.5 py-1 font-mono text-[10px]" style={{ borderColor: `${RANK_COLORS[rank]}45`, color: RANK_COLORS[rank] }}>{list.length} PEOPLE</span>
              </div>
              <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
                {list.map((m, i) => (
                  <article key={`${m.name}-${i}`} className={`group flex min-w-0 items-center gap-3 rounded-lg border bg-linear-to-r from-white/[0.06] to-white/[0.02] px-3 py-3 backdrop-blur-md transition-colors duration-200 hover:border-white/35 hover:bg-white/[0.05] ${rank === "founder" ? "border-[#bba16b]/30" : "border-white/15"}`}>
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#d4ba7d]/25 bg-black/15">
                      <img src="/og-avatar.png" alt="" width={38} height={38} loading="lazy" className="object-contain" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h4 title={m.name} className="truncate text-sm font-medium leading-5 text-[#f0f0f3]">{m.name}</h4>
                      <p className={`mt-1 font-mono text-[8px] uppercase tracking-[0.15em] ${rank === "founder" ? "text-[#d8c18c]" : "text-mute"}`}>{rank}</p>
                    </div>
                    <a href={m.facebook} target="_blank" rel="noopener noreferrer" aria-label={`Facebook ของ ${m.name}`} title={`เปิด Facebook ของ ${m.name}`}
                      className="grid h-11 w-11 shrink-0 place-items-center rounded-md text-[#bdbdc5] transition-colors hover:bg-white/10 hover:text-white">
                      <svg aria-hidden viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4"><path d="M7 17 17 7M7 7h10v10" /></svg>
                    </a>
                  </article>
                ))}
              </div>
            </section>
          );
        })}
        {visible.length === 0 && <div role="status" className="border border-dashed border-white/20 bg-black/30 p-14 text-center"><p className="mb-4 text-mute">ไม่พบสมาชิกที่ตรงกับการค้นหา</p><button onClick={() => { setFilter("all"); setQuery(""); }} className="cursor-pointer text-sm text-white underline underline-offset-4">แสดงสมาชิกทั้งหมด</button></div>}
        </div>
        <footer className="relative mt-8 overflow-hidden rounded-xl border border-white/10 bg-linear-to-b from-white/[0.03] to-transparent">
          <div aria-hidden className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-[#d8c18c]/40 to-transparent" />
          <div className="flex flex-col items-center gap-6 px-6 py-10 text-center sm:py-12">
            <img src="/og-avatar.png" alt="" width={46} height={46} className="object-contain opacity-90" />
            <div>
              <p className="font-display text-sm font-bold tracking-[0.3em] text-[#d8d8de]">CRAYWIND</p>
            </div>
            <nav aria-label="เมนูท้ายหน้า" className="flex items-center gap-1 border border-white/10 bg-black/25 p-1 font-mono text-[9px] tracking-[0.15em] text-mute">
              <Link href="/" className="px-4 py-2.5 transition-colors hover:bg-white/5 hover:text-white">หน้าแรก</Link>
              <Link href="/Craywind" className="px-4 py-2.5 text-white/80">รายชื่อ</Link>
              <Link href="/login" className="px-4 py-2.5 transition-colors hover:bg-white/5 hover:text-white">ADMIN</Link>
            </nav>
            <div className="flex w-full flex-wrap items-center justify-between gap-3 border-t border-white/[0.07] pt-5 font-mono text-[8px] tracking-[0.2em] text-faint max-sm:justify-center">
              <span>© {new Date().getFullYear()} CRAYWIND — ALL RIGHTS RESERVED</span>
              <span className="hidden sm:inline">WINTERFELL</span>
            </div>
          </div>
        </footer>
      </main>
    </>
  );
}
