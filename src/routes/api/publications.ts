import { createFileRoute } from "@tanstack/react-router";
import type { Publication, PublicationKind } from "@/data/publications";
import { yearToSort } from "@/data/publications";
import { resolveCitation } from "@/lib/cite.server";
import {
  adminTokenMatches,
  approvePublication,
  countRecentSubmissions,
  findPublication,
  listedPublications,
  rememberPublication,
  submissionsRequireApproval,
} from "@/lib/publication-store";

const MAX_SUBMISSIONS_PER_DAY = 5;

export const Route = createFileRoute("/api/publications")({
  server: {
    handlers: {
      GET: async () => Response.json({ publications: await listedPublications() }),
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
          kind?: PublicationKind;
          id?: string;
        };

        if (body.action === "approve") {
          if (!adminTokenMatches(request.headers.get("x-admin-token"))) {
            return Response.json({ error: "Unauthorized" }, { status: 401 });
          }
          const id = String(body.id ?? "").trim();
          if (!id) return Response.json({ error: "Missing publication id" }, { status: 400 });
          const publication = await approvePublication(id);
          if (!publication) {
            return Response.json({ error: "Publication not found" }, { status: 404 });
          }
          return Response.json({ publication });
        }

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
            const kind = (body.kind ?? cite.kind) as PublicationKind | undefined;
            const doi = cite.doi;
            if (!title) {
              return Response.json({ error: "Add the paper title, then submit." }, { status: 400 });
            }
            const existing = await findPublication(doi);
            if (existing) return Response.json({ publication: existing, duplicate: true });

            const name = String(body.submitterName ?? "").trim();
            const email = String(body.submitterEmail ?? "").trim();
            if (name.length < 2 || !email.includes("@")) {
              return Response.json({ error: "Name and a valid email are required." }, { status: 400 });
            }

            try {
              const recent = await countRecentSubmissions(email);
              if (recent >= MAX_SUBMISSIONS_PER_DAY) {
                return Response.json(
                  { error: "Too many submissions from this email today. Try again tomorrow." },
                  { status: 429 },
                );
              }
            } catch (err) {
              console.error("[publications] rate-limit check failed:", err);
            }

            const pending = submissionsRequireApproval();
            const publication: Publication = {
              id: crypto.randomUUID(),
              doi,
              url: cite.url,
              title,
              authors: authors || "Unknown authors",
              year,
              dateSort: cite.dateSort || yearToSort(year),
              kind,
              status: pending ? "pending" : "approved",
              container,
              submitterName: name,
              submitterEmail: email,
              institution: body.institution?.trim() || null,
              note: body.note?.trim() || null,
              createdAt: new Date().toISOString(),
            };
            await rememberPublication(publication);
            const saved = await findPublication(doi);
            if (saved && saved.id !== publication.id) {
              return Response.json({ publication: saved, duplicate: true });
            }
            return Response.json({
              publication,
              duplicate: false,
              pending: publication.status === "pending",
            });
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
