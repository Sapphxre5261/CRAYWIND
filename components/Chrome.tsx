"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

export default function Chrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  useEffect(() => {
    const onMenu = (e: MouseEvent) => e.preventDefault();
    const onKey = (e: KeyboardEvent) => {
      if (
        e.key === "F12" ||
        (e.ctrlKey && e.shiftKey && ["I", "i", "J", "j", "C", "c"].includes(e.key)) ||
        (e.ctrlKey && ["U", "u", "S", "s"].includes(e.key))
      ) {
        e.preventDefault();
      }
    };
    document.addEventListener("contextmenu", onMenu);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("contextmenu", onMenu);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  return (
    <>
      {/* dim overlay — หน้าแรกไม่มีตัวหนังสือเลยไม่ต้องหรี่ */}
      {pathname !== "/" && (
        <div className="pointer-events-none fixed inset-0 z-0 bg-[#08080a]/85" />
      )}
      <div className="vignette pointer-events-none fixed inset-0 z-0" />
      <div className="relative z-[2] flex min-h-dvh flex-col">{children}</div>
    </>
  );
}
