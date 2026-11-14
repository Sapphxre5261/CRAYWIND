import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import LoginForm from "@/components/LoginForm";
import { isAuthed } from "@/lib/auth";

export const metadata: Metadata = {
  title: "SECURITY GATE — CRAYWIND",
};

export const dynamic = "force-dynamic";

export default async function LoginPage() {
  if (await isAuthed()) redirect("/dashboard");
  return (
    <main className="grid min-h-dvh place-items-center px-5 py-12">
      <div className="grid w-full max-w-[940px] border border-white/15 bg-[#0e0e11]/95 shadow-2xl md:grid-cols-2">
        <div className="relative hidden flex-col justify-between overflow-hidden border-r border-white/10 bg-[url('/Craywind_X3UF.png')] bg-cover bg-center p-9 md:flex">
          <div className="absolute inset-0 bg-linear-to-b from-black/40 via-black/10 to-black/90" />
          <span className="relative font-display text-sm tracking-[0.2em]">CRAYWIND<span className="text-accent">.</span></span>
          <div className="relative"><div className="mb-5 h-0.5 w-10 bg-accent" /><p className="font-display text-2xl font-bold leading-relaxed">BEHIND<br />THE NAME.</p><p className="mt-4 font-mono text-[9px] tracking-widest text-mute">WINTERFELL</p></div>
        </div>
        <div className="relative px-7 py-10 sm:p-12">
          <span className="absolute top-0 right-0 h-1 w-16 bg-accent" />
          <img src="/og-avatar.png" alt="CRAYWIND" width={64} height={64} className="mb-7 object-contain" />
          <p className="mb-3 font-mono text-[9px] tracking-[0.25em] text-accent">CRAYWIND / ADMIN ACCESS</p>
          <h1 className="text-3xl font-medium">เข้าสู่ระบบ</h1>
          <p className="mt-3 mb-9 text-sm text-mute">พื้นที่จัดการสำหรับผู้ดูแล CRAYWIND</p>
          <LoginForm />
          <div className="mt-8 flex justify-between gap-3 border-t border-white/10 pt-5 text-xs text-mute">
            <Link href="/" className="hover:text-white">← หน้าแรก</Link>
            <Link href="/Craywind" className="hover:text-white">รายชื่อสมาชิก ↗</Link>
          </div>
        </div>
      </div>
    </main>
  );
}
