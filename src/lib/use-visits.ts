import { useEffect, useState } from "react";

export type VisitStats = {
  visits: number;
  visitors: number;
};

const VISITOR_KEY = "ia-crc-visitor-id";
const COUNTED_KEY = "ia-crc-visitor-counted";

let inflight: Promise<VisitStats> | null = null;

function visitorId(): string {
  let id = localStorage.getItem(VISITOR_KEY);
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem(VISITOR_KEY, id);
  }
  return id;
}

function loadVisits(): Promise<VisitStats> {
  if (inflight) return inflight;
  inflight = (async () => {
    const already = localStorage.getItem(COUNTED_KEY);
    const res = already
      ? await fetch("/api/visits", { cache: "no-store" })
      : await fetch("/api/visits", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ visitorId: visitorId(), path: window.location.pathname }),
        });
    if (!res.ok) throw new Error("visit request failed");
    const data = (await res.json()) as VisitStats;
    if (!already && data.visitors > 0) localStorage.setItem(COUNTED_KEY, "1");
    return data;
  })().finally(() => {
    inflight = null;
  });
  return inflight;
}

export function useVisits(): VisitStats {
  const [stats, setStats] = useState<VisitStats>({ visits: 0, visitors: 0 });

  useEffect(() => {
    let cancelled = false;
    void loadVisits()
      .then((data) => {
        if (!cancelled) setStats(data);
      })
      .catch(() => undefined);
    return () => {
      cancelled = true;
    };
  }, []);

  return stats;
}
