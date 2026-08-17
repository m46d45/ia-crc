import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { PageIntro } from "@/components/site-shell";
import {
  mergePublications,
  readLocalPublications,
  type Publication,
} from "@/data/publications";
import { useI18n } from "@/i18n/provider";
import { listPublications } from "@/lib/publication-fns";
import { computePublicationStats } from "@/lib/publication-stats";

export const Route = createFileRoute("/statistics")({
  loader: () => listPublications(),
  component: StatisticsPage,
});

function StatisticsPage() {
  const { t } = useI18n();
  const s = t.statsPage;
  const loaded = Route.useLoaderData();
  const [local, setLocal] = useState<Publication[]>([]);

  useEffect(() => {
    setLocal(readLocalPublications());
  }, []);

  const papers = useMemo(
    () => mergePublications(loaded.publications, local),
    [loaded.publications, local],
  );
  const stats = useMemo(() => computePublicationStats(papers), [papers]);

  return (
    <main>
      <PageIntro title={s.title}>
        <p>{s.intro}</p>
      </PageIntro>

      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          <Kpi label={s.papers} value={stats.total} hint={s.since} />
          <Kpi label={s.members} value={stats.members.length} hint={s.membersHint} />
          <Kpi label={s.venues} value={stats.venues} hint={s.venuesHint} />
          <Kpi label={s.news} value={stats.news} hint={s.newsHint} />
        </div>

        <div className="mt-6 rounded-xl border border-line bg-surface p-5 shadow-card sm:p-6">
          <h2 className="font-display text-2xl font-medium text-navy">{s.byYear}</h2>
          <div className="mt-4 h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={stats.byYear} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
                <CartesianGrid stroke="var(--color-line, #d7d2c8)" vertical={false} />
                <XAxis dataKey="year" tick={{ fill: "#5c6a7a", fontSize: 12 }} axisLine={false} tickLine={false} />
                <YAxis allowDecimals={false} tick={{ fill: "#5c6a7a", fontSize: 12 }} axisLine={false} tickLine={false} />
                <Tooltip />
                <Bar dataKey="papers" fill="#0E2F6B" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="mt-4 grid gap-4 lg:grid-cols-2">
          <article className="rounded-xl border border-line bg-surface p-5 shadow-card sm:p-6">
            <h2 className="font-display text-2xl font-medium text-navy">{s.venueTitle}</h2>
            {stats.byVenue.length === 0 ? (
              <p className="mt-4 text-sm text-muted">{s.emptyVenues}</p>
            ) : (
              <ul className="mt-4 space-y-3">
                {stats.byVenue.map((v) => (
                  <li key={v.name}>
                    <div className="flex items-baseline justify-between gap-3 text-sm">
                      <span>{v.name}</span>
                      <span className="tabular-nums text-muted">{v.papers}</span>
                    </div>
                    <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-sand">
                      <div
                        className="h-full rounded-full bg-navy"
                        style={{ width: `${(v.papers / Math.max(stats.total, 1)) * 100}%` }}
                      />
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </article>

          <article className="rounded-xl border border-line bg-surface p-5 shadow-card sm:p-6">
            <h2 className="font-display text-2xl font-medium text-navy">{s.memberTitle}</h2>
            {stats.members.length === 0 ? (
              <p className="mt-4 text-sm text-muted">{s.emptyMembers}</p>
            ) : (
              <ol className="mt-4 divide-y divide-line">
                {stats.members.map((m, i) => (
                  <li key={m.name} className="flex items-start justify-between gap-3 py-2.5 first:pt-0 last:pb-0">
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-navy">
                        <span className="mr-2 tabular-nums text-subtle">{i + 1}</span>
                        {m.name}
                      </p>
                      <p className="mt-0.5 pl-6 text-xs text-muted">{m.titles.join(" · ")}</p>
                    </div>
                    <span className="shrink-0 text-sm tabular-nums">
                      {m.papers} {m.papers === 1 ? s.one : s.many}
                    </span>
                  </li>
                ))}
              </ol>
            )}
          </article>
        </div>
      </section>
    </main>
  );
}

function Kpi({ label, value, hint }: { label: string; value: number; hint: string }) {
  return (
    <div className="rounded-xl border border-line bg-surface px-5 py-4 shadow-card">
      <p className="text-xs font-medium uppercase tracking-[0.14em] text-subtle">{label}</p>
      <p className="mt-1 font-display text-4xl font-medium tabular-nums text-navy">{value}</p>
      <p className="mt-1 text-xs text-muted">{hint}</p>
    </div>
  );
}
