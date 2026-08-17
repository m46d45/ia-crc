import { createFileRoute } from "@tanstack/react-router";
import { getVisitStats, recordVisit } from "@/lib/visits.server";

export const Route = createFileRoute("/api/visits")({
  server: {
    handlers: {
      GET: async () => {
        const stats = await getVisitStats();
        return Response.json(stats, { headers: { "cache-control": "no-store" } });
      },
      POST: async ({ request }) => {
        let visitorId = "";
        let path = "/";
        try {
          const body = (await request.json()) as { visitorId?: string; path?: string };
          visitorId = String(body.visitorId ?? "");
          path = String(body.path ?? "/");
        } catch {
          visitorId = "";
        }
        const stats = await recordVisit(visitorId, path);
        return Response.json(stats, { headers: { "cache-control": "no-store" } });
      },
    },
  },
});
