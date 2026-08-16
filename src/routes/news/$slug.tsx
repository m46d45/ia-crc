import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { newsBySlug } from "@/data/site";
import { useI18n } from "@/i18n/provider";

export const Route = createFileRoute("/news/$slug")({
  loader: ({ params }) => {
    const item = newsBySlug(params.slug);
    if (!item) throw notFound();
    return item;
  },
  component: NewsArticle,
});

function NewsArticle() {
  const item = Route.useLoaderData();
  const { t } = useI18n();

  return (
    <main>
      <article className="border-b border-line bg-navy text-paper">
        <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
          <Link to="/news" className="inline-flex items-center gap-1.5 text-sm text-paper/70 hover:text-paper">
            <ArrowLeft className="size-4" />
            {t.newsPage.back}
          </Link>
          <p className="mt-6 text-xs font-medium uppercase tracking-[0.16em] text-paper/55">{item.date}</p>
          <h1 className="mt-3 font-display text-3xl font-medium tracking-tight sm:text-4xl">{item.title}</h1>
        </div>
      </article>
      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
        <div className="space-y-5 text-base leading-relaxed text-ink">
          {item.body.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>
        {item.href ? (
          <div className="mt-10">
            <Button asChild>
              <a href={item.href} target="_blank" rel="noreferrer">
                {item.hrefLabel ?? t.newsPage.visit}
                <ArrowUpRight />
              </a>
            </Button>
          </div>
        ) : null}
      </div>
    </main>
  );
}
