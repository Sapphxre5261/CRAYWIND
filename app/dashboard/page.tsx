import type { Metadata } from "next";
import { redirect } from "next/navigation";
import DashboardClient from "@/components/DashboardClient";
import { isAuthed } from "@/lib/auth";
import { getMembers } from "@/lib/store";

export const metadata: Metadata = {
  title: "ADMIN STUDIO — CRAYWIND",
};

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  if (!(await isAuthed())) redirect("/login");
  const members = await getMembers();
  return <DashboardClient initialMembers={members} />;
}
