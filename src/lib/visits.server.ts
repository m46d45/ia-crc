export type VisitStats = {
  visits: number;
  visitors: number;
};

const EMPTY: VisitStats = { visits: 0, visitors: 0 };

const databaseUrl =
  typeof process !== "undefined" && process.env.DATABASE_URL?.trim()
    ? process.env.DATABASE_URL.trim()
    : "";

const ABACUS = "https://abacus.jasoncameron.dev";
const ABACUS_NS = "ia-crc.net";
const ABACUS_KEY = "people";

async function fromAbacus(mode: "get" | "hit"): Promise<VisitStats> {
  const path = mode === "hit" ? "hit" : "get";
  const res = await fetch(`${ABACUS}/${path}/${ABACUS_NS}/${ABACUS_KEY}`, {
    cache: "no-store",
  });
  if (!res.ok) return EMPTY;
  const data = (await res.json()) as { value?: number };
  const n = Number(data.value ?? 0);
  if (!Number.isFinite(n) || n < 0) return EMPTY;
  return { visits: n, visitors: n };
}

async function fromSql(
  visitorId?: string,
  path?: string,
): Promise<VisitStats | null> {
  if (!databaseUrl) return null;
  const { getSql } = await import("@/lib/db");
  const sql = await getSql();
  if (visitorId) {
    await sql.query("insert into site_visit (visitor_id, path) values ($1, $2)", [
      visitorId,
      path || "/",
    ]);
  }
  const rows = await sql.query<{ visitor_id: string }>("select visitor_id from site_visit");
  return {
    visits: rows.length,
    visitors: new Set(rows.map((r) => r.visitor_id)).size,
  };
}

export async function getVisitStats(): Promise<VisitStats> {
  try {
    const sqlStats = await fromSql();
    if (sqlStats) return sqlStats;
  } catch {
    // Host has no database — fall through.
  }
  try {
    return await fromAbacus("get");
  } catch {
    return EMPTY;
  }
}

export async function recordVisit(visitorId: string, path: string): Promise<VisitStats> {
  const id = visitorId.trim().slice(0, 80);
  const safePath = path.trim().slice(0, 200) || "/";
  if (!id) return getVisitStats();
  try {
    const sqlStats = await fromSql(id, safePath);
    if (sqlStats) return sqlStats;
  } catch {
    // Host has no database — fall through.
  }
  try {
    return await fromAbacus("hit");
  } catch {
    return EMPTY;
  }
}
