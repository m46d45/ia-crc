import type { LocalizedParagraphs, LocalizedText } from "@/lib/i18n-text";
import type { NEWS } from "./site";
import catalog from "./member-publications.json";

export type PublicationKind = "article" | "book" | "chapter" | "conference";
export type PublicationStatus = "approved" | "pending";

export type Publication = {
  id: string;
  doi: string | null;
  url: string;
  title: string;
  authors: string;
  year: string | null;
  dateSort?: string;
  kind?: PublicationKind;
  status?: PublicationStatus;
  container: string | null;
  submitterName: string;
  submitterEmail: string;
  institution: string | null;
  note: string | null;
  createdAt: string;
};

/** Editorial or auto-generated news row. Localized fields may be plain strings. */
export type NewsItem = {
  slug: string;
  date: string | LocalizedText;
  dateSort: string;
  category: "conference" | "publication" | "announcement";
  title: string | LocalizedText;
  excerpt: string | LocalizedText;
  body: string[] | LocalizedParagraphs;
  href?: string;
  hrefLabel?: string | LocalizedText;
};

const LOCAL_KEY = "ia-crc-publications-v1";

export const SEEDED_PUBLICATIONS: Publication[] = catalog as Publication[];

export function extractDoi(input: string): string | null {
  const trimmed = input.trim();
  const match = trimmed.match(/10\.\d{4,9}\/[-._;()/:A-Z0-9]+/i);
  if (!match) return null;
  return match[0].replace(/[).,;]+$/, "").toLowerCase();
}

export function doiUrl(doi: string) {
  return `https://doi.org/${doi}`;
}

export function formatDisplayDate(iso: string, locale = "en-GB") {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso.slice(0, 10);
  return new Intl.DateTimeFormat(locale, {
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
    date: {
      en: formatDisplayDate(p.createdAt, "en-GB"),
      id: formatDisplayDate(p.createdAt, "id-ID"),
    },
    dateSort: p.createdAt.slice(0, 10),
    category: "publication",
    title: p.title,
    excerpt: {
      en: `${p.authors} (${year}). Added by ${p.submitterName}.`,
      id: `${p.authors} (${year}). Ditambahkan oleh ${p.submitterName}.`,
    },
    body: {
      en: [
        citation,
        p.note
          ? `${who} notes that this work grew from IA-CRC conversations: ${p.note}`
          : `Submitted by ${who}. The paper was initiated through conversation in the IA-CRC community — it does not have to be a formal IA-CRC project.`,
        p.doi ? `DOI: ${p.doi}` : "The full text is available from the link below.",
      ],
      id: [
        citation,
        p.note
          ? `${who} mencatat bahwa karya ini tumbuh dari percakapan IA-CRC: ${p.note}`
          : `Dikirim oleh ${who}. Makalah ini berawal dari percakapan komunitas IA-CRC — tidak harus menjadi proyek formal forum.`,
        p.doi ? `DOI: ${p.doi}` : "Teks lengkap tersedia melalui tautan di bawah.",
      ],
    },
    href: p.url,
    hrefLabel: p.doi
      ? `doi:${p.doi}`
      : { en: "Open the paper", id: "Buka makalah" },
  };
}

export function yearToSort(year: string | null | undefined): string {
  if (!year) return "0000-00-00";
  const months: Record<string, string> = {
    january: "01",
    february: "02",
    march: "03",
    april: "04",
    may: "05",
    june: "06",
    july: "07",
    august: "08",
    september: "09",
    october: "10",
    november: "11",
    december: "12",
  };
  const named = year.trim().match(/^(january|february|march|april|may|june|july|august|september|october|november|december)\s+(\d{4})$/i);
  if (named) return `${named[2]}-${months[named[1].toLowerCase()]}-01`;
  const iso = year.trim().match(/^(\d{4})(?:-(\d{2}))?(?:-(\d{2}))?/);
  if (iso) return `${iso[1]}-${iso[2] ?? "01"}-${iso[3] ?? "01"}`;
  const y = year.match(/(\d{4})/);
  return y ? `${y[1]}-01-01` : "0000-00-00";
}

export function publicationDateSort(p: Publication): string {
  return p.dateSort || yearToSort(p.year);
}

function isHostname(value: string) {
  return /^[a-z0-9.-]+\.[a-z]{2,}$/i.test(value.trim()) && !value.includes(" ");
}

export function publicationMeta(p: Publication): string {
  const bits: string[] = [p.year ?? "n.d."];
  if (p.kind === "book") bits.push("Book");
  if (p.kind === "chapter") bits.push("Chapter");
  if (p.container && !isHostname(p.container)) bits.push(p.container);
  return bits.join(" · ");
}

export function mergePublications(...lists: Publication[][]) {
  const byKey = new Map<string, Publication>();
  const score = (p: Publication) =>
    (p.dateSort ? 2 : 0) + (p.kind ? 1 : 0) + (p.container && !isHostname(p.container) ? 1 : 0);
  for (const list of lists) {
    for (const item of list) {
      const key = item.doi ? `doi:${item.doi.toLowerCase()}` : `id:${item.id}`;
      const prev = byKey.get(key);
      if (!prev || score(item) >= score(prev)) byKey.set(key, item);
    }
  }
  return [...byKey.values()].sort((a, b) => {
    const byDate = publicationDateSort(b).localeCompare(publicationDateSort(a));
    if (byDate !== 0) return byDate;
    return a.title.localeCompare(b.title);
  });
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

export function mergeNews(
  editorial: Array<(typeof NEWS)[number]>,
  publications: Publication[],
) {
  const listed = publications.filter((p) => (p.status ?? "approved") !== "pending");
  const extra = listed.map(publicationToNews);
  return [...editorial, ...extra].sort((a, b) => b.dateSort.localeCompare(a.dateSort));
}

export function isListedPublication(p: Publication) {
  return (p.status ?? "approved") !== "pending";
}
