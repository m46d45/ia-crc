import { doiUrl, extractDoi, yearToSort, type PublicationKind } from "@/data/publications";

export type CiteResult = {
  doi: string | null;
  url: string;
  title: string;
  authors: string;
  year: string | null;
  container: string | null;
  kind?: PublicationKind;
  dateSort?: string;
  incomplete?: boolean;
};

function formatAuthors(
  authors: Array<{ given?: string; family?: string; name?: string }> | undefined,
) {
  if (!authors?.length) return "";
  const names = authors.map((a) => {
    if (a.name) return a.name;
    return [a.given, a.family].filter(Boolean).join(" ").trim() || "";
  }).filter(Boolean);
  if (!names.length) return "";
  if (names.length === 1) return names[0];
  if (names.length === 2) return `${names[0]} & ${names[1]}`;
  return `${names.slice(0, -1).join(", ")} & ${names[names.length - 1]}`;
}

function yearFromParts(parts?: number[][]) {
  const y = parts?.[0]?.[0];
  return y ? String(y) : null;
}

function mapKind(type?: string): PublicationKind | undefined {
  if (!type) return undefined;
  if (type === "book" || type === "monograph" || type === "edited-book" || type === "reference-book") {
    return "book";
  }
  if (type === "book-chapter") return "chapter";
  if (type === "proceedings-article" || type === "proceedings") return "conference";
  return "article";
}

function issuedSort(parts?: number[][]) {
  const [y, m, d] = parts?.[0] ?? [];
  if (!y) return undefined;
  return `${y}-${String(m ?? 1).padStart(2, "0")}-${String(d ?? 1).padStart(2, "0")}`;
}

function looksLikeUrl(value: string) {
  try {
    const u = new URL(value);
    return /^https?:$/.test(u.protocol);
  } catch {
    return false;
  }
}

async function fetchJson(url: string) {
  const res = await fetch(url, {
    headers: {
      Accept: "application/json",
      "User-Agent": "IA-CRC/1.0 (mailto:abduh@itb.ac.id)",
    },
    signal: AbortSignal.timeout(8000),
  });
  if (!res.ok) return null;
  return res.json();
}

async function fromCrossref(doi: string): Promise<CiteResult | null> {
  const json = (await fetchJson(`https://api.crossref.org/works/${encodeURIComponent(doi)}`)) as {
    message?: {
      title?: string[];
      author?: Array<{ given?: string; family?: string }>;
      "container-title"?: string[];
      issued?: { "date-parts": number[][] };
      DOI?: string;
      URL?: string;
      type?: string;
      publisher?: string;
    };
  } | null;
  const work = json?.message;
  const title = work?.title?.[0]?.trim();
  if (!work || !title) return null;
  const resolved = (work.DOI ?? doi).toLowerCase();
  const kind = mapKind(work.type);
  const container = work["container-title"]?.[0] || (kind === "book" ? work.publisher ?? null : null);
  return {
    doi: resolved,
    url: work.URL || doiUrl(resolved),
    title,
    authors: formatAuthors(work.author),
    year: yearFromParts(work.issued?.["date-parts"]),
    container,
    kind,
    dateSort: issuedSort(work.issued?.["date-parts"]),
  };
}

async function fromOpenAlex(doi: string): Promise<CiteResult | null> {
  const work = (await fetchJson(`https://api.openalex.org/works/https://doi.org/${doi}`)) as {
    display_name?: string;
    publication_year?: number;
    doi?: string;
    primary_location?: { source?: { display_name?: string } };
    authorships?: Array<{ author?: { display_name?: string } }>;
  } | null;
  if (!work?.display_name) return null;
  const resolved = extractDoi(work.doi ?? doi);
  return {
    doi: resolved,
    url: resolved ? doiUrl(resolved) : `https://doi.org/${doi}`,
    title: work.display_name,
    authors: formatAuthors(work.authorships?.map((a) => ({ name: a.author?.display_name }))),
    year: work.publication_year ? String(work.publication_year) : null,
    container: work.primary_location?.source?.display_name ?? null,
  };
}

function metaContent(html: string, name: string) {
  const re = new RegExp(
    `<meta[^>]+(?:name|property)=["']${name}["'][^>]+content=["']([^"']+)["']`,
    "i",
  );
  const alt = new RegExp(
    `<meta[^>]+content=["']([^"']+)["'][^>]+(?:name|property)=["']${name}["']`,
    "i",
  );
  return decode(html.match(re)?.[1] || html.match(alt)?.[1] || null);
}

function decode(value: string | null) {
  if (!value) return null;
  return value
    .replace(/&/g, "&")
    .replace(/"/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/</g, "<")
    .replace(/>/g, ">")
    .trim();
}

function pageTitle(html: string) {
  const raw = html.match(/<title[^>]*>(.*?)<\/title>/i)?.[1];
  if (!raw) return null;
  return decode(raw.replace(/\s+/g, " "));
}

async function fromLandingPage(url: string): Promise<CiteResult | null> {
  let parsed: URL;
  try {
    parsed = new URL(url);
  } catch {
    return null;
  }
  if (!/^https?:$/.test(parsed.protocol)) return null;
  const res = await fetch(parsed.toString(), {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (compatible; IA-CRC/1.0; +https://www.ia-crc.net) AppleWebKit/537.36",
      Accept: "text/html,application/xhtml+xml",
    },
    redirect: "follow",
    signal: AbortSignal.timeout(8000),
  });
  if (!res.ok) return null;
  const html = (await res.text()).slice(0, 200_000);
  const pageDoi = extractDoi(metaContent(html, "citation_doi") || "");
  const catalog = pageDoi
    ? ((await fromCrossref(pageDoi)) ?? (await fromOpenAlex(pageDoi)))
    : null;
  if (catalog) return { ...catalog, url: parsed.toString() };

  const title =
    metaContent(html, "citation_title") ||
    metaContent(html, "dc.title") ||
    metaContent(html, "og:title") ||
    metaContent(html, "twitter:title") ||
    pageTitle(html);
  if (!title) return null;
  const author =
    metaContent(html, "citation_author") ||
    metaContent(html, "dc.creator") ||
    metaContent(html, "author");
  const journal =
    metaContent(html, "citation_journal_title") ||
    metaContent(html, "dc.source") ||
    metaContent(html, "og:site_name");
  const date =
    metaContent(html, "citation_publication_date") ||
    metaContent(html, "citation_year") ||
    metaContent(html, "dc.date");
  return {
    doi: pageDoi,
    url: parsed.toString(),
    title,
    authors: author || "",
    year: date?.slice(0, 4) ?? null,
    container: journal,
  };
}

function urlFallback(source: string, doi: string | null): CiteResult {
  const url = looksLikeUrl(source) ? source.trim() : doi ? doiUrl(doi) : source.trim();
  let host: string | null = null;
  try {
    host = new URL(url).hostname.replace(/^www\./, "");
  } catch {
    host = null;
  }
  return {
    doi,
    url,
    title: "",
    authors: "",
    year: null,
    container: host,
    incomplete: true,
  };
}

export async function resolveCitation(source: string): Promise<CiteResult> {
  const trimmed = source.trim();
  const doi = extractDoi(trimmed);
  if (doi) {
    const cited = (await fromCrossref(doi)) ?? (await fromOpenAlex(doi));
    if (cited) return cited;
  }
  if (looksLikeUrl(trimmed)) {
    const fromPage = await fromLandingPage(trimmed);
    if (fromPage) {
      return { ...fromPage, doi: doi ?? fromPage.doi };
    }
    return urlFallback(trimmed, doi);
  }
  if (doi) return urlFallback(doiUrl(doi), doi);
  throw new Error("Paste a DOI (10.xxxx/…) or the full URL of the paper.");
}
