import Link from "next/link";

export default function HomeScene() {
  return (
    <main className="relative isolate min-h-[480px] flex-1 overflow-hidden bg-[#070709] [perspective:1200px]">
      <h1 className="sr-only">CRAYWIND — Winterfell</h1>

      {/* Ambient light stays behind the artwork, so the mobile crop never cuts the name. */}
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_42%,#313136_0%,#121215_40%,#070709_72%)]" />
      <div aria-hidden className="pointer-events-none absolute inset-0 opacity-60 [background:radial-gradient(ellipse_45%_45%_at_50%_35%,#ffffff0d,transparent)]" />
      <div aria-hidden className="pointer-events-none absolute inset-x-[22%] top-[9%] h-px bg-linear-to-r from-transparent via-white/50 to-transparent shadow-[0_0_24px_4px_#ffffff15] sm:inset-x-[35%]" />

      <div aria-hidden className="pointer-events-none absolute inset-0 motion-safe:animate-scene-arrive [transform-style:preserve-3d]">
        <div className="absolute inset-0 [transform-style:preserve-3d]">
          {/* The horizon and elliptical floor occupy a different depth plane. */}
          <div className="absolute top-[70%] left-1/2 h-[min(60vw,650px)] w-[min(125vw,1100px)] rounded-[50%] border border-white/[0.12] bg-radial from-white/[0.025] to-transparent shadow-[0_0_35px_#ffffff04,inset_0_0_35px_#ffffff04] [transform:translateX(-50%)_translateY(-50%)_translateZ(-120px)_rotateX(78deg)]" />
          <div className="absolute top-[70%] left-1/2 h-[min(45vw,450px)] w-[min(100vw,850px)] rounded-[50%] border border-white/[0.06] [transform:translateX(-50%)_translateY(-50%)_translateZ(-80px)_rotateX(78deg)]" />

          {/* Original silver artwork, presented as a floating plane with feathered edges. */}
          <div className="absolute top-[43%] left-1/2 aspect-video w-[160vw] max-w-none [mask-image:radial-gradient(ellipse_48%_48%_at_50%_48%,black_50%,transparent_100%)] [transform:translate(-50%,-50%)_translateZ(35px)] sm:top-[45%] sm:w-[112vw] lg:w-[min(105vw,1650px)]">
            <img src="/Craywind_X3UF.png" alt="" width={1920} height={1080} fetchPriority="high" draggable={false} className="h-full w-full object-contain" />
          </div>

          {/* Static reflections preserve the depth of the scene. */}
          <div className="absolute top-[71%] left-1/2 h-px w-[35%] bg-linear-to-r from-transparent via-[#b91e2d]/60 to-transparent shadow-[0_0_16px_2px_#b91e2d20] [transform:translateX(-50%)_translateZ(80px)] sm:w-[22%]" />
          <div className="absolute top-[71%] left-1/2 h-12 w-[45%] rounded-[50%] bg-black/65 blur-xl [transform:translateX(-50%)_translateZ(-60px)_rotateX(50deg)]" />
        </div>
      </div>

      <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_35%,#030304_100%)] opacity-60" />

      <div className="absolute inset-x-0 bottom-[max(3rem,env(safe-area-inset-bottom))] flex justify-center px-6 [transform-style:preserve-3d] sm:bottom-[10%]">
        <div className="motion-safe:animate-scene-enter">
          <div className="[transform:translateZ(80px)]">
            <Link
              href="/Craywind"
              className="group relative inline-flex items-center gap-7 overflow-hidden rounded-full border border-white/25 bg-linear-to-b from-white/15 to-white/5 py-2.5 pr-2.5 pl-7 text-sm font-medium tracking-[0.06em] text-white shadow-[inset_0_1px_0_#ffffff25,0_12px_35px_#0009] backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-white/55 hover:from-white/20 hover:to-white/10 hover:shadow-[inset_0_1px_0_#ffffff35,0_16px_45px_#0009,0_0_25px_#ffffff08] focus-visible:outline-white motion-reduce:transform-none"
            >
              <span aria-hidden className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/3 -skew-x-12 bg-linear-to-r from-transparent via-white/10 to-transparent transition-[left] duration-700 group-hover:left-[120%] motion-reduce:hidden" />
              <span>ดูรายชื่อสมาชิก</span>
              <span aria-hidden className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-linear-to-b from-white to-[#aeb0b7] text-[#242429] shadow-[0_2px_8px_#0004]">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-[18px] w-[18px] transition-transform duration-300 group-hover:-rotate-45 motion-reduce:transform-none"><path d="M5 12h14m-6-6 6 6-6 6" /></svg>
              </span>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
