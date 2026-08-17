import { MEMBER_GROUPS } from "@/data/site";
import type { Publication } from "@/data/publications";

export const FOUNDING_YEAR = 2023;

export type MemberPaperStat = {
  name: string;
  papers: number;
  titles: string[];
};

export type PublicationStats = {
  total: number;
  venues: number;
  news: number;
  yearMin: number;
  yearMax: number;
  byYear: { year: string; papers: number }[];
  byVenue: { name: string; papers: number }[];
  members: MemberPaperStat[];
};

function keyOf(name: string): string {
  return name
    .replace(/[‐‑–—]/g, "-")
    .replace(/\./g, "")
    .replace(/-/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .toLowerCase();
}

function partsOf(name: string): string[] {
  return keyOf(name).split(" ").filter(Boolean);
}

const MEMBER_BY_KEY = new Map<string, string>();
const MEMBERS_BY_LAST = new Map<string, string[]>();

for (const group of MEMBER_GROUPS) {
  for (const person of group.people) {
    const key = keyOf(person);
    MEMBER_BY_KEY.set(key, person);
    const parts = partsOf(person);
    const last = parts[parts.length - 1];
    if (!last) continue;
    const list = MEMBERS_BY_LAST.get(last) ?? [];
    if (!list.includes(person)) list.push(person);
    MEMBERS_BY_LAST.set(last, list);
  }
}

export function findListedMember(name: string): string | null {
  const exact = MEMBER_BY_KEY.get(keyOf(name));
  if (exact) return exact;

  const parts = partsOf(name);
  if (parts.length === 0) return null;
  const last = parts[parts.length - 1];
  const candidates = MEMBERS_BY_LAST.get(last) ?? [];
  if (candidates.length === 1) return candidates[0];
  if (candidates.length === 0) return null;

  const first = parts[0];
  const narrowed = candidates.filter((person) => {
    const memberFirst = partsOf(person)[0] ?? "";
    if (!first || !memberFirst) return false;
    return first[0] === memberFirst[0] && (memberFirst.startsWith(first) || first.startsWith(memberFirst));
  });
  return narrowed.length === 1 ? narrowed[0] : null;
}

export function splitAuthors(raw: string): string[] {
  return raw
    .split(/\s*(?:,|&| and )\s*/i)
    .map((s) => s.trim())
    .filter(Boolean);
}

function paperYear(p: Publication): number | null {
  const m = (p.year ?? "").match(/(\d{4})/);
  return m ? Number(m[1]) : null;
}

export function computePublicationStats(papers: Publication[]): PublicationStats {
  const now = new Date().getFullYear();
  const yearCount = new Map<number, number>();
  const venueCount = new Map<string, number>();
  const memberMap = new Map<string, MemberPaperStat>();
  let news = 0;

  for (const paper of papers) {
    if (paper.note) news += 1;
    const venue = (paper.container ?? "").trim();
    if (venue) venueCount.set(venue, (venueCount.get(venue) ?? 0) + 1);
    const y = paperYear(paper);
    if (y) yearCount.set(y, (yearCount.get(y) ?? 0) + 1);

    for (const raw of splitAuthors(paper.authors)) {
      const member = findListedMember(raw);
      if (!member) continue;
      const existing = memberMap.get(member);
      if (existing) {
        existing.papers += 1;
        existing.titles.push(paper.title);
      } else {
        memberMap.set(member, { name: member, papers: 1, titles: [paper.title] });
      }
    }
  }

  const yearMin = FOUNDING_YEAR;
  const yearMax = Math.max(now, ...yearCount.keys(), FOUNDING_YEAR);
  const byYear: { year: string; papers: number }[] = [];
  for (let y = yearMin; y <= yearMax; y++) {
    byYear.push({ year: String(y), papers: yearCount.get(y) ?? 0 });
  }

  return {
    total: papers.length,
    venues: venueCount.size,
    news,
    yearMin,
    yearMax,
    byYear,
    byVenue: [...venueCount.entries()]
      .map(([name, count]) => ({ name, papers: count }))
      .sort((a, b) => b.papers - a.papers || a.name.localeCompare(b.name)),
    members: [...memberMap.values()].sort(
      (a, b) => b.papers - a.papers || a.name.localeCompare(b.name),
    ),
  };
}
