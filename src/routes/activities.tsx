import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { PageIntro } from "@/components/site-shell";
import { Button } from "@/components/ui/button";
import { ACTIVITIES, LINKS, PHOTOS, type ActivityKind } from "@/data/site";
import { useI18n } from "@/i18n/provider";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/activities")({ component: ActivitiesPage });

const FILTERS: Array<"all" | ActivityKind> = ["all", "seminar", "workshop", "talk", "conference", "meeting"];

function ActivitiesPage() {
  const { t, lang } = useI18n();
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("all");
  const items = useMemo(() => {
    const list = filter === "all" ? ACTIVITIES : ACTIVITIES.filter((a) => a.kind === filter);
    return [...list].sort((a, b) => b.dateSort.localeCompare(a.dateSort));
  }, [filter]);

  return (
    <main>
      <PageIntro title={t.activitiesPage.title}>
        <p>{t.activitiesPage.intro}</p>
        <div className="mt-6">
          <Button asChild variant="invert" size="sm">
            <a href={LINKS.seminar2025Teams} target="_blank" rel="noreferrer">
              {t.activitiesPage.seminarCta}
            </a>
          </Button>
        </div>
      </PageIntro>

      <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <div className="flex flex-wrap gap-2">
          {FILTERS.map((key) => (
            <button
              key={key}
              type="button"
              onClick={() => setFilter(key)}
              className={cn(
                "h-10 rounded-full border px-4 text-sm",
                filter === key ? "border-navy bg-navy text-paper" : "border-line bg-surface text-muted hover:text-ink",
              )}
            >
              {key === "all" ? t.activitiesPage.all : t.kind[key]}
            </button>
          ))}
        </div>

        <ul className="mt-8 space-y-3">
          {items.map((a) => (
            <li key={`${a.title.en}-${a.date}`} className="rounded-xl border border-line bg-surface p-5">
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-sand px-2.5 py-0.5 text-xs font-medium uppercase tracking-wide text-navy">
                  {t.kind[a.kind]}
                </span>
                {a.rwg ? <span className="text-xs text-muted">{a.rwg}</span> : null}
              </div>
              <h2 className="mt-2 font-display text-xl font-medium text-navy">{a.title[lang]}</h2>
              <p className="mt-2 text-sm text-muted">
                {a.date} · {a.place[lang]}
              </p>
            </li>
          ))}
        </ul>
      </section>

      <section className="border-t border-line bg-cream">
        <div className="mx-auto grid max-w-6xl gap-3 px-4 py-12 sm:grid-cols-2 sm:px-6 lg:grid-cols-3">
          {PHOTOS.map((photo) => (
            <figure key={photo.src} className="overflow-hidden rounded-xl bg-surface">
              <img src={photo.src} alt={photo.alt[lang]} className="aspect-[16/10] w-full object-cover" />
              <figcaption className="px-4 py-3 text-sm text-muted">{photo.caption[lang]}</figcaption>
            </figure>
          ))}
        </div>
      </section>
    </main>
  );
}
