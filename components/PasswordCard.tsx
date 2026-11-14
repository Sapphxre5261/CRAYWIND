"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function PasswordCard() {
  const router = useRouter();
  const [curPass, setCurPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [busy, setBusy] = useState(false);
  const [notice, setNotice] = useState<{ ok: boolean; text: string } | null>(null);

  const changePass = async () => {
    setBusy(true);
    setNotice(null);
    const res = await fetch("/api/password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ current: curPass, next: newPass }),
    });
    const data = await res.json().catch(() => ({}));
    setBusy(false);
    if (res.ok) {
      setNotice({ ok: true, text: "เปลี่ยนรหัสผ่านแล้ว" });
      setCurPass("");
      setNewPass("");
    } else if (res.status === 401) {
      router.push("/login");
    } else {
      setNotice({ ok: false, text: data.error ?? "เปลี่ยนรหัสไม่สำเร็จ" });
    }
  };

  return (
    <section className="mt-14">
      <div className="mb-5 flex items-center gap-3.5">
        <span className="h-1.5 w-1.5 rounded-full bg-accent" />
        <h2 className="m-0 font-mono text-[11px] font-semibold uppercase tracking-[0.28em]">
          ความปลอดภัย
        </h2>
        <div className="h-px flex-1 bg-line" />
      </div>

      <div className="lux-card p-[clamp(20px,4vw,32px)]">
        <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.2em] text-mute">
          รหัสผ่านแอดมิน (เก็บ hash ในฐานข้อมูล)
        </p>
        <div className="grid gap-4 md:grid-cols-[1fr_1fr_auto]">
          <input
            type="password"
            value={curPass}
            onChange={(e) => setCurPass(e.target.value)}
            placeholder="รหัสผ่านปัจจุบัน"
            autoComplete="current-password"
            className="w-full border border-line bg-black/40 px-3 py-2 font-mono text-[11px] font-light text-ink outline-none transition-colors placeholder:text-faint focus:border-line-strong"
          />
          <input
            type="password"
            value={newPass}
            onChange={(e) => setNewPass(e.target.value)}
            placeholder="รหัสผ่านใหม่ (อย่างน้อย 6 ตัว)"
            autoComplete="new-password"
            className="w-full border border-line bg-black/40 px-3 py-2 font-mono text-[11px] font-light text-ink outline-none transition-colors placeholder:text-faint focus:border-line-strong"
          />
          <div className="flex items-center gap-3">
            {notice && (
              <span
                role="status"
                className={`font-mono text-[10px] tracking-[0.14em] ${notice.ok ? "text-emerald-300" : "text-rose-300"}`}
              >
                {notice.text}
              </span>
            )}
            <button
              onClick={changePass}
              disabled={busy || !curPass || !newPass}
              className="cursor-pointer border border-line bg-transparent px-[18px] py-2 font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-mute transition-all duration-200 hover:border-line-strong hover:text-ink disabled:opacity-30"
            >
              {busy ? "กำลังทำงาน..." : "เปลี่ยนรหัส"}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
