import { createFileRoute } from "@tanstack/react-router";
import { SEEDED_PUBLICATIONS, type Publication } from "@/data/publications";
import { resolveCitation } from "@/lib/cite.server";
import { getSql } from "@/lib/db";

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

async function allPublications() {
  try {
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
    return [...SEEDED_PUBLICATIONS, ...rows.map(rowToPub)];
  } catch {
    return [...SEEDED_PUBLICATIONS];
  }
}

export const Route = createFileRoute("/api/publications")({
  server: {
    handlers: {
      GET: async () => Response.json({ publications: await allPublications() }),
      POST: async ({ request }) => {
        const body = (await request.json()) as {
          action?: string;
          source?: string;
          submitterName?: string;
          submitterEmail?: string;
          institution?: string;
          note?: string;
        };
        if (body.action === "lookup") {
          try {
            const cite = await resolveCitation(String(body.source ?? ""));
            return Response.json(cite);
          } catch (err) {
            return Response.json(
              { error: err instanceof Error ? err.message : "Lookup failed" },
              { status: 400 },
            );
          }
        }
        if (body.action === "submit") {
          try {
            const cite = await resolveCitation(String(body.source ?? ""));
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
            if (cite.doi) {
              const existing = await sql.query<Record<string, unknown>>(
                "select * from publications where doi = $1 limit 1",
                [cite.doi],
              );
              if (existing[0]) {
                return Response.json({ publication: rowToPub(existing[0]), duplicate: true });
              }
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
              submitterName: String(body.submitterName ?? "").trim(),
              submitterEmail: String(body.submitterEmail ?? "").trim(),
              institution: body.institution?.trim() || null,
              note: body.note?.trim() || null,
              createdAt: now.toISOString(),
            };
            if (publication.submitterName.length < 2 || !publication.submitterEmail.includes("@")) {
              return Response.json({ error: "Name and a valid email are required." }, { status: 400 });
            }
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
            return Response.json({ publication, duplicate: false });
          } catch (err) {
            return Response.json(
              { error: err instanceof Error ? err.message : "Could not add the paper." },
              { status: 400 },
            );
          }
        }
        return Response.json({ error: "Unknown action" }, { status: 400 });
      },
    },
  },
});
