import type { NEWS } from "./site";

export type Publication = {
  id: string;
  doi: string | null;
  url: string;
  title: string;
  authors: string;
  year: string | null;
  container: string | null;
  submitterName: string;
  submitterEmail: string;
  institution: string | null;
  note: string | null;
  createdAt: string;
};

export type NewsItem = (typeof NEWS)[number] & { source?: "editorial" | "publication" };

const LOCAL_KEY = "ia-crc-publications-v1";

export const SEEDED_PUBLICATIONS: Publication[] = [];

export function extractDoi(input: string): string | null {
  const trimmed = input.trim();
  const match = trimmed.match(/10\.\d{4,9}\/[-._;()/:A-Z0-9]+/i);
  if (!match) return null;
  return match[0].replace(/[).,;]+$/, "").toLowerCase();
}

export function doiUrl(doi: string) {
  return `https://doi.org/${doi}`;
}

export function formatDisplayDate(iso: string) {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso.slice(0, 10);
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(d);
}

export function publicationToNews(p: Publication): NewsItem {
  const year = p.year ?? "n.d.";
  const citation = `${p.authors} (${year}). ${p.title}${p.container ? `. ${p.container}` : ""}.`;
  const who = [p.submitterName, p.institution].filter(Boolean).join(", ");
  return {
    slug: `pub-${p.id}`,
    date: formatDisplayDate(p.createdAt),
    dateSort: p.createdAt.slice(0, 10),
    title: `New publication: ${p.title}`,
    excerpt: `${p.authors} (${year}). Added by ${p.submitterName}.`,
    body: [
      citation,
      p.note
        ? `${who} notes that this work grew from IA-CRC conversations: ${p.note}`
        : `Submitted by ${who}. The paper was initiated through conversation in the IA-CRC community — it does not have to be a formal IA-CRC project.`,
      p.doi
        ? `DOI: ${p.doi}`
        : "The full text is available from the link below.",
    ],
    href: p.url,
    hrefLabel: p.doi ? `doi:${p.doi}` : "Open the paper",
    source: "publication",
  };
}

export function mergePublications(...lists: Publication[][]) {
  const byKey = new Map<string, Publication>();
  for (const list of lists) {
    for (const item of list) {
      const key = item.doi ? `doi:${item.doi}` : `id:${item.id}`;
      const prev = byKey.get(key);
      if (!prev || prev.createdAt < item.createdAt) byKey.set(key, item);
    }
  }
  return [...byKey.values()].sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export function readLocalPublications(): Publication[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(LOCAL_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as Publication[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function writeLocalPublication(item: Publication) {
  if (typeof window === "undefined") return;
  const next = mergePublications(readLocalPublications(), [item]);
  window.localStorage.setItem(LOCAL_KEY, JSON.stringify(next));
}

export function mergeNews(editorial: NewsItem[], publications: Publication[]) {
  const extra = publications.map(publicationToNews);
  return [...editorial, ...extra].sort((a, b) => b.dateSort.localeCompare(a.dateSort));
}
