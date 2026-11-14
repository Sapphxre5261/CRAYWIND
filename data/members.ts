export type Rank = "founder" | "leader" | "lastname" | "member";

export interface Member {
  name: string;
  rank: Rank;
  facebook: string;
}

export const RANK_ORDER: Rank[] = ["founder", "leader", "lastname", "member"];

export const RANK_COLORS: Record<Rank, string> = {
  founder: "#f43f5e",
  leader: "#f59e0b",
  lastname: "#06b6d4",
  member: "#a855f7",
};

