"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginForm() {
  const router = useRouter();
  const [show, setShow] = useState(false);
  const [error, setError] = useState(false);
  const [busy, setBusy] = useState(false);

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (busy) return;
    setBusy(true);
    setError(false);
    const password = new FormData(e.currentTarget).get("password");
    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    setBusy(false);
    if (res.ok) {
      router.push("/dashboard");
    } else {
      setError(true);
    }
  };

  return (
    <form onSubmit={submit}>
      {error && (
        <div className="mb-5 rounded-[14px] border border-[#f43f5e]/35 bg-[#f43f5e]/[0.07] px-4 py-3 text-[12.5px] text-[#fda4af]">
          รหัสผ่านไม่ถูกต้อง ลองอีกครั้ง
        </div>
      )}

      <div className="mb-[18px] text-left">
        <label
          htmlFor="passInput"
          className="mb-[9px] block text-[11px] tracking-[0.08em] text-mute"
        >
          รหัสผ่าน
        </label>
        <div className="relative">
          <input
            type={show ? "text" : "password"}
            name="password"
            id="passInput"
            placeholder="••••••••••••"
            required
            autoFocus
            autoComplete="current-password"
            className="w-full border border-white/20 bg-black/40 py-[15px] pl-4 pr-16 font-mono text-sm tracking-[0.25em] text-ink transition-colors duration-300 placeholder:text-faint focus:border-white/60"
          />
          <button
            type="button"
            onClick={() => setShow((s) => !s)}
            className="absolute right-[18px] top-1/2 -translate-y-1/2 cursor-pointer border-0 bg-transparent font-mono text-[10px] tracking-[0.14em] text-faint transition-colors hover:text-ink"
          >
            {show ? "HIDE" : "SHOW"}
          </button>
        </div>
      </div>

      <button
        type="submit"
        disabled={busy}
        className="inline-flex w-full cursor-pointer items-center justify-center border border-white/40 bg-linear-to-b from-white to-[#b7b8bd] px-7 py-4 font-sans text-sm font-semibold tracking-[0.12em] text-[#0a0a0a] transition-all duration-300 hover:brightness-110 disabled:cursor-wait disabled:opacity-60"
      >
        {busy ? "กำลังตรวจสอบ..." : "เข้าสู่ระบบ"}
      </button>
    </form>
  );
}
