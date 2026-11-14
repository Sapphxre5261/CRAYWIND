import type { Metadata } from "next";
import RosterClient from "@/components/RosterClient";
import { getMembers } from "@/lib/store";

export const metadata: Metadata = {
  title: "ROSTER — CRAYWIND",
};

export const dynamic = "force-dynamic";

export default async function RosterPage() {
  const members = await getMembers();
  return <RosterClient members={members} />;
}
