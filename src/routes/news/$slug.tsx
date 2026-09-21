import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { NewsMeta } from "@/components/news-meta";
import { publicationToNews, readLocalPublications, type NewsItem } from "@/data/publications";
import { newsBySlug } from "@/data/site";
import { useI18n } from "@/i18n/provider";
import { pickLang, pickLangList } from "@/lib/i18n-text";
import { listPublications } from "@/lib/publication-fns";

export const Route = createFileRoute("/news/$slug")({
  loader: async ({ params }) => {
    const editorial = newsBySlug(params.slug);
    if (editorial) return { item: editorial as NewsItem };
    if (params.slug.startsWith("pub-")) {
      const { publications } = await listPublications();
      const pub = publications.find((p) => `pub-${p.id}` === params.slug);
      if (pub) return { item: publicationToNews(pub) };
      return { item: null, slug: params.slug };
    }
    throw notFound();
  },
  component: NewsArticle,
});

function NewsArticle() {
  const loaded = Route.useLoaderData();
  const { t, lang } = useI18n();
  const [item, setItem] = useState<NewsItem | null>(loaded.item);

  useEffect(() => {
    if (item || !("slug" in loaded) || !loaded.slug) return;
    const pub = readLocalPublications().find((p) => `pub-${p.id}` === loaded.slug);
    if (pub) setItem(publicationToNews(pub));
  }, [item, loaded]);

  if (!item) {
    return (
      <main className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
        <p className="text-muted">{t.newsPage.notFound}</p>
        <Link to="/news" className="mt-4 inline-block text-navy">
          {t.newsPage.back}
        </Link>
      </main>
    );
  }

  const paragraphs = pickLangList(item.body, lang);

  return (
    <main>
      <article className="border-b border-line bg-navy text-paper">
        <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
          <Link to="/news" className="inline-flex items-center gap-1.5 text-sm text-paper/70 hover:text-paper">
            <ArrowLeft className="size-4" />
            {t.newsPage.back}
          </Link>
          <div className="mt-6">
            <NewsMeta date={pickLang(item.date, lang)} category={item.category} light />
          </div>
          <h1 className="mt-3 font-display text-3xl font-medium tracking-tight sm:text-4xl">
            {pickLang(item.title, lang)}
          </h1>
        </div>
      </article>
      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
        <div className="space-y-5 text-base leading-relaxed text-ink">
          {paragraphs.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>
        {item.href ? (
          <div className="mt-10">
            <Button asChild>
              <a href={item.href} target="_blank" rel="noreferrer">
                {item.hrefLabel ? pickLang(item.hrefLabel, lang) : t.newsPage.visit}
                <ArrowUpRight />
              </a>
            </Button>
          </div>
        ) : null}
      </div>
    </main>
  );
}
