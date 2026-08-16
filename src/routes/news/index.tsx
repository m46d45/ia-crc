import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { PageIntro } from "@/components/site-shell";
import { mergeNews, readLocalPublications, type Publication } from "@/data/publications";
import { newsByDate } from "@/data/site";
import { useI18n } from "@/i18n/provider";
import { listPublications } from "@/lib/publication-fns";

export const Route = createFileRoute("/news/")({
  loader: () => listPublications(),
  component: NewsIndex,
});

function NewsIndex() {
  const { t } = useI18n();
  const loaded = Route.useLoaderData();
  const [local, setLocal] = useState<Publication[]>([]);
  useEffect(() => {
    setLocal(readLocalPublications());
  }, []);
  const items = useMemo(
    () => mergeNews(newsByDate(), [...loaded.publications, ...local]),
    [loaded.publications, local],
  );

  return (
    <main>
      <PageIntro title={t.newsPage.title}>
        <p>{t.newsPage.intro}</p>
      </PageIntro>
      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <ul className="space-y-4">
          {items.map((item) => (
            <li key={item.slug}>
              <Link
                to="/news/$slug"
                params={{ slug: item.slug }}
                className="block rounded-xl border border-line bg-surface p-6 shadow-card transition-colors hover:border-navy/25"
              >
                <p className="text-xs font-medium uppercase tracking-[0.14em] text-blue">{item.date}</p>
                <h2 className="mt-2 font-display text-2xl font-medium text-navy">{item.title}</h2>
                <p className="mt-3 max-w-3xl text-muted">{item.excerpt}</p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-navy">
                  {t.readMore}
                  <ArrowRight className="size-4" />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
