import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { SEEDED_PUBLICATIONS, type Publication } from "@/data/publications";
import { resolveCitation } from "@/lib/cite.server";
import { getSql } from "@/lib/db";

const submitSchema = z.object({
  source: z.string().trim().min(3),
  submitterName: z.string().trim().min(2).max(120),
  submitterEmail: z.string().trim().email(),
  institution: z.string().trim().max(160).optional(),
  note: z.string().trim().max(500).optional(),
});

function rowToPub(row: Record<string, unknown>): Publication {
  return {
    id: String(row.id),
    doi: row.doi ? String(row.doi) : null,
    url: String(row.url),
    title: String(row.title),
    authors: String(row.authors),
    year: row.year ? String(row.year) : null,
    container: row.container ? String(row.container) : null,
    submitterName: String(row.submitter_name),
    submitterEmail: String(row.submitter_email),
    institution: row.institution ? String(row.institution) : null,
    note: row.note ? String(row.note) : null,
    createdAt: new Date(String(row.created_at)).toISOString(),
  };
}

async function ensureTable() {
  const sql = await getSql();
  await sql.query(`
    create table if not exists publications (
      id text primary key,
      doi text,
      url text not null,
      title text not null,
      authors text not null,
      year text,
      container text,
      submitter_name text not null,
      submitter_email text not null,
      institution text,
      note text,
      created_at timestamptz not null default now()
    )
  `);
  return sql;
}

async function loadFromDb(): Promise<Publication[]> {
  const sql = await ensureTable();
  const rows = await sql.query<Record<string, unknown>>(
    "select * from publications order by created_at desc",
  );
  return rows.map(rowToPub);
}

export const listPublications = createServerFn({ method: "GET" }).handler(async () => {
  try {
    const rows = await loadFromDb();
    return { publications: [...SEEDED_PUBLICATIONS, ...rows] };
  } catch {
    return { publications: [...SEEDED_PUBLICATIONS] };
  }
});

export const lookupPublication = createServerFn({ method: "POST" })
  .inputValidator(z.object({ source: z.string().trim().min(3) }))
  .handler(async ({ data }) => resolveCitation(data.source));

export const submitPublication = createServerFn({ method: "POST" })
  .inputValidator(submitSchema)
  .handler(async ({ data }) => {
    const cite = await resolveCitation(data.source);
    const sql = await ensureTable();
    if (cite.doi) {
      const existing = await sql.query<Record<string, unknown>>(
        "select * from publications where doi = $1 limit 1",
        [cite.doi],
      );
      if (existing[0]) return { publication: rowToPub(existing[0]), duplicate: true };
    }
    const now = new Date();
    const publication: Publication = {
      id: crypto.randomUUID(),
      doi: cite.doi,
      url: cite.url,
      title: cite.title,
      authors: cite.authors,
      year: cite.year,
      container: cite.container,
      submitterName: data.submitterName,
      submitterEmail: data.submitterEmail,
      institution: data.institution?.trim() || null,
      note: data.note?.trim() || null,
      createdAt: now.toISOString(),
    };
    await sql.query(
      `insert into publications
        (id, doi, url, title, authors, year, container, submitter_name, submitter_email, institution, note, created_at)
       values ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12)`,
      [
        publication.id,
        publication.doi,
        publication.url,
        publication.title,
        publication.authors,
        publication.year,
        publication.container,
        publication.submitterName,
        publication.submitterEmail,
        publication.institution,
        publication.note,
        now.toISOString(),
      ],
    );
    return { publication, duplicate: false };
  });
