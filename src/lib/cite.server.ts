import { doiUrl, extractDoi } from "@/data/publications";

export type CiteResult = {
  doi: string | null;
  url: string;
  title: string;
  authors: string;
  year: string | null;
  container: string | null;
};

function formatAuthors(
  authors: Array<{ given?: string; family?: string; name?: string }> | undefined,
) {
  if (!authors?.length) return "Unknown authors";
  const names = authors.map((a) => {
    if (a.name) return a.name;
    return [a.given, a.family].filter(Boolean).join(" ").trim() || "Unknown";
  });
  if (names.length === 1) return names[0];
  if (names.length === 2) return `${names[0]} & ${names[1]}`;
  return `${names.slice(0, -1).join(", ")} & ${names[names.length - 1]}`;
}

function yearFromParts(parts?: number[][]) {
  const y = parts?.[0]?.[0];
  return y ? String(y) : null;
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
    };
  } | null;
  const work = json?.message;
  const title = work?.title?.[0]?.trim();
  if (!work || !title) return null;
  const resolved = (work.DOI ?? doi).toLowerCase();
  return {
    doi: resolved,
    url: work.URL || doiUrl(resolved),
    title,
    authors: formatAuthors(work.author),
    year: yearFromParts(work.issued?.["date-parts"]),
    container: work["container-title"]?.[0] ?? null,
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
  return html.match(re)?.[1] || html.match(alt)?.[1] || null;
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
    headers: { "User-Agent": "IA-CRC/1.0 (mailto:abduh@itb.ac.id)", Accept: "text/html" },
    redirect: "follow",
    signal: AbortSignal.timeout(8000),
  });
  if (!res.ok) return null;
  const html = (await res.text()).slice(0, 200_000);
  const doi = extractDoi(metaContent(html, "citation_doi") || html);
  if (doi) {
    return (await fromCrossref(doi)) ?? (await fromOpenAlex(doi));
  }
  const title = metaContent(html, "citation_title") || metaContent(html, "og:title");
  if (!title) return null;
  const author = metaContent(html, "citation_author");
  const journal = metaContent(html, "citation_journal_title");
  const date = metaContent(html, "citation_publication_date");
  return {
    doi: null,
    url: parsed.toString(),
    title,
    authors: author || "Unknown authors",
    year: date?.slice(0, 4) ?? null,
    container: journal,
  };
}

export async function resolveCitation(source: string): Promise<CiteResult> {
  const doi = extractDoi(source);
  if (doi) {
    const cited = (await fromCrossref(doi)) ?? (await fromOpenAlex(doi));
    if (cited) return cited;
    throw new Error("That DOI could not be found. Check the number and try again.");
  }
  const fromPage = await fromLandingPage(source);
  if (fromPage) return fromPage;
  throw new Error("Paste a DOI (10.xxxx/…) or the full URL of the paper.");
}
