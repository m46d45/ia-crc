import { createServerFn } from "@tanstack/react-start";
import { SEEDED_PUBLICATIONS, type Publication } from "@/data/publications";

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

export const listPublications = createServerFn({ method: "GET" }).handler(async () => {
  try {
    const { getSql } = await import("@/lib/db");
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
    const rows = await sql.query<Record<string, unknown>>(
      "select * from publications order by created_at desc",
    );
    return { publications: [...SEEDED_PUBLICATIONS, ...rows.map(rowToPub)] };
  } catch {
    return { publications: [...SEEDED_PUBLICATIONS] };
  }
});
