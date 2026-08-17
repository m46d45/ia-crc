import { getSql } from "@/lib/db";

export type VisitStats = {
  visits: number;
  visitors: number;
};

const EMPTY: VisitStats = { visits: 0, visitors: 0 };

export async function getVisitStats(): Promise<VisitStats> {
  try {
    const sql = await getSql();
    const rows = await sql.query<{ visitor_id: string }>("select visitor_id from site_visit");
    return {
      visits: rows.length,
      visitors: new Set(rows.map((r) => r.visitor_id)).size,
    };
  } catch {
    return EMPTY;
  }
}

export async function recordVisit(visitorId: string, path: string): Promise<VisitStats> {
  const id = visitorId.trim().slice(0, 80);
  if (!id) return getVisitStats();
  const safePath = path.trim().slice(0, 200) || "/";
  try {
    const sql = await getSql();
    await sql.query("insert into site_visit (visitor_id, path) values ($1, $2)", [id, safePath]);
    return getVisitStats();
  } catch {
    return EMPTY;
  }
}
