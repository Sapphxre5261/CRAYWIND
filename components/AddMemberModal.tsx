"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { RANK_ORDER, type Member, type Rank } from "@/data/members";

export default function AddMemberModal({ onAdd }: { onAdd: (member: Member) => void }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const dialog = dialogRef.current;
    if (!dialog) return;
    const previousOverflow = document.body.style.overflow;
    dialog.showModal();
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
      dialog.close();
    };
  }, [open]);

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") ?? "").trim();
    if (!name) {
      const input = form.elements.namedItem("name") as HTMLInputElement;
      input.setCustomValidity("กรุณากรอกชื่อสมาชิก");
      input.reportValidity();
      return;
    }
    onAdd({
      name,
      rank: data.get("rank") as Rank,
      facebook: String(data.get("facebook") ?? "").trim(),
    });
    dialogRef.current?.close();
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-haspopup="dialog"
        className="cursor-pointer border border-line bg-white/[0.03] px-[18px] py-2.5 font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-mute transition-colors hover:border-line-strong hover:text-ink"
      >
        + เพิ่มสมาชิก
      </button>

      <dialog
        ref={dialogRef}
        aria-labelledby="add-member-title"
        aria-describedby="add-member-description"
        onClose={() => {
          formRef.current?.reset();
          const name = formRef.current?.elements.namedItem("name") as HTMLInputElement | null;
          name?.setCustomValidity("");
          setOpen(false);
        }}
        onClick={(event) => {
          if (event.target === event.currentTarget) event.currentTarget.close();
        }}
        className="fixed inset-0 m-auto max-h-[calc(100dvh-2rem)] w-[calc(100%-2rem)] max-w-[480px] overflow-y-auto border border-white/20 bg-[#17171b] p-0 text-ink shadow-[0_30px_100px_#000b] backdrop:bg-black/70 backdrop:backdrop-blur-sm"
      >
        <div className="border-t-2 border-accent p-6 sm:p-8">
          <div className="mb-6 flex items-start justify-between gap-4">
            <div>
              <p className="mb-2 font-mono text-[9px] tracking-[0.2em] text-mute">CRAYWIND / MEMBER STUDIO</p>
              <h2 id="add-member-title" className="text-2xl font-medium">เพิ่มสมาชิก</h2>
            </div>
            <button
              type="button"
              onClick={() => dialogRef.current?.close()}
              aria-label="ปิดหน้าต่างเพิ่มสมาชิก"
              className="-mr-2 -mt-2 grid h-11 w-11 shrink-0 cursor-pointer place-items-center text-mute transition-colors hover:bg-white/5 hover:text-white"
            >
              <svg aria-hidden viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-5 w-5"><path d="m6 6 12 12M6 18 18 6" /></svg>
            </button>
          </div>

          <form ref={formRef} onSubmit={submit} className="space-y-5">
            <div>
              <label htmlFor="new-member-name" className="mb-2 block text-xs text-mute">ชื่อสมาชิก <span className="text-accent">*</span></label>
              <input
                id="new-member-name"
                name="name"
                autoFocus
                required
                autoComplete="off"
                placeholder="กรอกชื่อสมาชิก"
                onChange={(event) => event.currentTarget.setCustomValidity("")}
                className="w-full border border-white/20 bg-black/25 px-4 py-3 text-sm placeholder:text-faint focus:border-white/50"
              />
            </div>
            <div>
              <label htmlFor="new-member-rank" className="mb-2 block text-xs text-mute">ยศ</label>
              <select id="new-member-rank" name="rank" defaultValue="member" className="w-full cursor-pointer border border-white/20 bg-[#111114] px-4 py-3 text-sm uppercase focus:border-white/50">
                {RANK_ORDER.map((rank) => <option key={rank} value={rank}>{rank}</option>)}
              </select>
            </div>
            <div>
              <label htmlFor="new-member-facebook" className="mb-2 block text-xs text-mute">ลิงก์ Facebook <span className="text-faint">(ไม่บังคับ)</span></label>
              <input
                id="new-member-facebook"
                name="facebook"
                type="url"
                pattern="https?://.+"
                title="กรอกลิงก์ที่ขึ้นต้นด้วย https:// หรือ http://"
                autoComplete="off"
                placeholder="https://www.facebook.com/..."
                className="w-full border border-white/20 bg-black/25 px-4 py-3 text-sm placeholder:text-faint focus:border-white/50"
              />
            </div>
            <p id="add-member-description" className="text-xs leading-relaxed text-mute">
              เพิ่มสมาชิกลงรายการก่อน แล้วกด “บันทึกการเปลี่ยนแปลง” เพื่อแสดงบนหน้าเว็บ
            </p>
            <div className="flex justify-end gap-3 border-t border-white/10 pt-5">
              <button type="button" onClick={() => dialogRef.current?.close()} className="cursor-pointer border border-white/20 px-5 py-3 text-sm text-mute transition-colors hover:border-white/40 hover:text-white">ยกเลิก</button>
              <button type="submit" className="cursor-pointer border border-white/30 bg-linear-to-b from-white to-[#b7b8bd] px-5 py-3 text-sm font-semibold text-[#151518] transition-[filter] hover:brightness-110">เพิ่มลงรายการ</button>
            </div>
          </form>
        </div>
      </dialog>
    </>
  );
}
