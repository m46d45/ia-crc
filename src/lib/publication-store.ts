import {
  mergePublications,
  SEEDED_PUBLICATIONS,
  type Publication,
  type PublicationKind,
  type PublicationStatus,
} from "@/data/publications";
import { getSql } from "@/lib/db";

type PublicationRow = {
  id: string;
  doi: string | null;
  url: string;
  title: string;
  authors: string;
  year: string | null;
  container: string | null;
  kind: string | null;
  date_sort: string | null;
  status: string;
  submitter_name: string;
  submitter_email: string;
  institution: string | null;
  note: string | null;
  created_at: string | Date;
};

function asStatus(value: string | null | undefined): PublicationStatus {
  return value === "pending" ? "pending" : "approved";
}

function asKind(value: string | null | undefined): PublicationKind | undefined {
  if (value === "article" || value === "book" || value === "chapter" || value === "conference") {
    return value;
  }
  return undefined;
}

function rowToPublication(row: PublicationRow): Publication {
  const createdAt =
    typeof row.created_at === "string"
      ? row.created_at
      : row.created_at.toISOString();
  return {
    id: row.id,
    doi: row.doi,
    url: row.url,
    title: row.title,
    authors: row.authors,
    year: row.year,
    dateSort: row.date_sort || undefined,
    kind: asKind(row.kind),
    container: row.container,
    status: asStatus(row.status),
    submitterName: row.submitter_name,
    submitterEmail: row.submitter_email,
    institution: row.institution,
    note: row.note,
    createdAt,
  };
}

async function loadFromDb(statuses: PublicationStatus[]): Promise<Publication[]> {
  const sql = await getSql();
  const placeholders = statuses.map((_, i) => `$${i + 1}`).join(", ");
  const rows = await sql.query<PublicationRow>(
    `select id, doi, url, title, authors, year, container, kind, date_sort, status,
            submitter_name, submitter_email, institution, note, created_at
     from publications
     where status in (${placeholders})
     order by coalesce(date_sort, to_char(created_at, 'YYYY-MM-DD')) desc`,
    statuses,
  );
  return rows.map(rowToPublication);
}

/** Public catalogue: seeded papers plus approved database submissions. */
export async function listedPublications(): Promise<Publication[]> {
  try {
    const fromDb = await loadFromDb(["approved"]);
    return mergePublications(SEEDED_PUBLICATIONS, fromDb);
  } catch (err) {
    console.error("[publications] list failed, falling back to seed:", err);
    return mergePublications(SEEDED_PUBLICATIONS);
  }
}

export async function findPublication(doi: string | null): Promise<Publication | undefined> {
  if (!doi) return undefined;
  const needle = doi.toLowerCase();
  const seeded = SEEDED_PUBLICATIONS.find((p) => p.doi?.toLowerCase() === needle);
  if (seeded) return seeded;
  try {
    const sql = await getSql();
    const rows = await sql.query<PublicationRow>(
      `select id, doi, url, title, authors, year, container, kind, date_sort, status,
              submitter_name, submitter_email, institution, note, created_at
       from publications
       where lower(doi) = $1
       limit 1`,
      [needle],
    );
    return rows[0] ? rowToPublication(rows[0]) : undefined;
  } catch (err) {
    console.error("[publications] find failed:", err);
    return undefined;
  }
}

export async function countRecentSubmissions(email: string, hours = 24): Promise<number> {
  const sql = await getSql();
  const rows = await sql.query<{ n: number }>(
    `select count(*)::int as n
     from publications
     where lower(submitter_email) = lower($1)
       and created_at > now() - ($2::text || ' hours')::interval`,
    [email.trim(), String(hours)],
  );
  return Number(rows[0]?.n ?? 0);
}

export async function rememberPublication(item: Publication): Promise<Publication> {
  const sql = await getSql();
  const status: PublicationStatus = item.status ?? "approved";
  try {
    await sql.query(
      `insert into publications (
         id, doi, url, title, authors, year, container, kind, date_sort, status,
         submitter_name, submitter_email, institution, note, created_at
       ) values (
         $1, $2, $3, $4, $5, $6, $7, $8, $9, $10,
         $11, $12, $13, $14, $15::timestamptz
       )
       on conflict (id) do nothing`,
      [
        item.id,
        item.doi,
        item.url,
        item.title,
        item.authors,
        item.year,
        item.container,
        item.kind ?? null,
        item.dateSort ?? null,
        status,
        item.submitterName,
        item.submitterEmail,
        item.institution,
        item.note,
        item.createdAt,
      ],
    );
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    if (item.doi && /publications_doi_uidx|duplicate key/i.test(message)) {
      const existing = await findPublication(item.doi);
      if (existing) return existing;
    }
    throw err;
  }
  return { ...item, status };
}

export async function approvePublication(id: string): Promise<Publication | undefined> {
  const sql = await getSql();
  const rows = await sql.query<PublicationRow>(
    `update publications
     set status = 'approved'
     where id = $1
     returning id, doi, url, title, authors, year, container, kind, date_sort, status,
               submitter_name, submitter_email, institution, note, created_at`,
    [id],
  );
  return rows[0] ? rowToPublication(rows[0]) : undefined;
}

/** Whether new submissions stay pending until an admin token approves them. */
export function submissionsRequireApproval(): boolean {
  const token = process.env.PUBLICATIONS_ADMIN_TOKEN?.trim();
  return Boolean(token);
}

export function adminTokenMatches(header: string | null): boolean {
  const expected = process.env.PUBLICATIONS_ADMIN_TOKEN?.trim();
  if (!expected) return false;
  return Boolean(header && header.trim() === expected);
}
