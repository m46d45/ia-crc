import { createFileRoute } from "@tanstack/react-router";
import type { Publication } from "@/data/publications";
import { resolveCitation } from "@/lib/cite.server";
import { findPublication, listedPublications, rememberPublication } from "@/lib/publication-store";

export const Route = createFileRoute("/api/publications")({
  server: {
    handlers: {
      GET: async () => Response.json({ publications: listedPublications() }),
      POST: async ({ request }) => {
        const body = (await request.json()) as {
          action?: string;
          source?: string;
          submitterName?: string;
          submitterEmail?: string;
          institution?: string;
          note?: string;
          title?: string;
          authors?: string;
          year?: string;
          container?: string;
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
            const title = String(body.title ?? cite.title ?? "").trim();
            const authors = String(body.authors ?? cite.authors ?? "").trim();
            const year = String(body.year ?? cite.year ?? "").trim() || null;
            const container = String(body.container ?? cite.container ?? "").trim() || null;
            const doi = cite.doi;
            if (!title) {
              return Response.json({ error: "Add the paper title, then submit." }, { status: 400 });
            }
            const existing = findPublication(doi);
            if (existing) return Response.json({ publication: existing, duplicate: true });

            const name = String(body.submitterName ?? "").trim();
            const email = String(body.submitterEmail ?? "").trim();
            if (name.length < 2 || !email.includes("@")) {
              return Response.json({ error: "Name and a valid email are required." }, { status: 400 });
            }

            const publication: Publication = {
              id: crypto.randomUUID(),
              doi,
              url: cite.url,
              title,
              authors: authors || "Unknown authors",
              year,
              container,
              submitterName: name,
              submitterEmail: email,
              institution: body.institution?.trim() || null,
              note: body.note?.trim() || null,
              createdAt: new Date().toISOString(),
            };
            rememberPublication(publication);
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
