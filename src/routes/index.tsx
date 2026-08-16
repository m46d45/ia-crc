import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { ACTIVITIES, LINKS, PHOTOS, PROJECTS, RWGS, STATS, newsByDate } from "@/data/site";
import { mergeNews, readLocalPublications, type Publication } from "@/data/publications";
import { useI18n } from "@/i18n/provider";
import { Button } from "@/components/ui/button";
import { listPublications } from "@/lib/publication-fns";

export const Route = createFileRoute("/")({
  loader: () => listPublications(),
  component: Home,
});

function Home() {
  const { t, lang } = useI18n();
  const loaded = Route.useLoaderData();
  const featuredProjects = PROJECTS.filter((p) => p.status !== "proposal").slice(0, 4);
  const featuredActivities = [...ACTIVITIES].sort((a, b) => b.dateSort.localeCompare(a.dateSort)).slice(0, 4);
  const [local, setLocal] = useState<Publication[]>([]);
  useEffect(() => {
    setLocal(readLocalPublications());
  }, []);
  const latestNews = useMemo(
    () => mergeNews(newsByDate(), [...loaded.publications, ...local]).slice(0, 3),
    [loaded.publications, local],
  );

  return (
    <main>
      <section className="relative isolate min-h-[78svh] overflow-hidden bg-navy text-paper">
        <img
          src="/images/workshop-2023.jpg"
          alt=""
          className="absolute inset-0 h-full w-full object-cover object-[50%_28%] opacity-55"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-deep via-navy/70 to-navy/45" />
        <div className="relative mx-auto flex min-h-[78svh] max-w-6xl flex-col justify-end px-4 pb-14 pt-24 sm:px-6 sm:pb-20">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-paper/70">{t.hero.kicker}</p>
          <h1 className="mt-4 max-w-3xl font-display text-[2.35rem] font-medium leading-[1.08] tracking-tight sm:text-6xl">
            {t.fullName}
          </h1>
          <p className="mt-3 font-display text-xl italic text-paper/80 sm:text-2xl">{t.tagline}</p>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-paper/78 sm:text-lg">{t.hero.lead}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild size="lg">
              <Link to="/join">{t.hero.ctaPrimary}</Link>
            </Button>
            <Button asChild size="lg" variant="invert">
              <Link to="/research">{t.hero.ctaSecondary}</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="border-b border-line bg-surface">
        <div className="mx-auto grid max-w-6xl grid-cols-2 divide-x divide-line sm:grid-cols-4">
          {STATS.map((stat) => (
            <div key={stat.label.en} className="px-4 py-7 sm:px-6 sm:py-8">
              <p className="font-display text-3xl font-medium tracking-tight text-navy sm:text-4xl">{stat.value}</p>
              <p className="mt-1 text-sm text-muted">{stat.label[lang]}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-b border-line bg-cream">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <h2 className="font-display text-3xl font-medium tracking-tight text-navy">{t.newsTitle}</h2>
            <Link to="/news" className="inline-flex items-center gap-1.5 text-sm font-medium text-navy">
              {t.viewAllNews}
              <ArrowRight className="size-4" />
            </Link>
          </div>
          <ul className="mt-8 grid gap-4 md:grid-cols-1">
            {latestNews.map((item) => (
              <li key={item.slug}>
                <Link
                  to="/news/$slug"
                  params={{ slug: item.slug }}
                  className="block rounded-xl border border-line bg-surface p-6 shadow-card transition-colors hover:border-navy/25"
                >
                  <p className="text-xs font-medium uppercase tracking-[0.14em] text-blue">{item.date}</p>
                  <h3 className="mt-2 font-display text-2xl font-medium text-navy">{item.title}</h3>
                  <p className="mt-3 max-w-3xl text-muted">{item.excerpt}</p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-navy">
                    {t.readMore}
                    <ArrowRight className="size-4" />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-12 lg:py-20">
        <div className="lg:col-span-5">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-blue">{t.aboutPreview.kicker}</p>
          <h2 className="mt-3 font-display text-3xl font-medium tracking-tight text-navy sm:text-4xl">
            {t.aboutPreview.title}
          </h2>
        </div>
        <div className="lg:col-span-7">
          <p className="text-base leading-relaxed text-muted sm:text-lg">{t.aboutPreview.body}</p>
          <Link
            to="/about"
            className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-navy underline decoration-line underline-offset-4 hover:decoration-navy"
          >
            {t.aboutPreview.more}
            <ArrowRight className="size-4" />
          </Link>
        </div>
      </section>

      <section className="bg-navy text-paper">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-paper/50">{t.vision.kicker}</p>
          <h2 className="mt-3 max-w-3xl font-display text-3xl font-medium tracking-tight sm:text-4xl">
            {t.vision.title}
          </h2>
          <p className="mt-5 max-w-3xl text-base leading-relaxed text-paper/72 sm:text-lg">{t.vision.body}</p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="font-display text-3xl font-medium tracking-tight text-navy">{t.rwgTitle}</h2>
            <p className="mt-2 max-w-2xl text-muted">{t.rwgLead}</p>
          </div>
          <Link to="/research" className="inline-flex items-center gap-1.5 text-sm font-medium text-navy">
            {t.viewAllRwg}
            <ArrowRight className="size-4" />
          </Link>
        </div>
        <ul className="mt-8 grid gap-3 sm:grid-cols-2">
          {RWGS.map((g) => (
            <li key={g.id}>
              <Link
                to="/research"
                hash={`rwg-${g.id}`}
                className="group flex h-full items-start gap-4 rounded-xl border border-line bg-surface p-4 shadow-card transition-colors hover:border-navy/25"
              >
                <span className="font-display text-2xl font-medium text-blue">{g.id}</span>
                <span>
                  <span className="block font-medium text-navy group-hover:underline">{g.title[lang]}</span>
                  <span className="mt-1 block text-sm text-muted">
                    {g.lead} · {g.org}
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="border-y border-line bg-cream">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <h2 className="font-display text-3xl font-medium tracking-tight text-navy">{t.projectsTitle}</h2>
            <Link to="/research" hash="projects" className="inline-flex items-center gap-1.5 text-sm font-medium text-navy">
              {t.viewAllProjects}
              <ArrowRight className="size-4" />
            </Link>
          </div>
          <ul className="mt-8 grid gap-4 md:grid-cols-2">
            {featuredProjects.map((p) => (
              <li key={p.title.en} className="rounded-xl border border-line bg-surface p-5">
                <p className="text-xs font-medium uppercase tracking-[0.14em] text-blue">
                  {t.status[p.status]} · {p.rwg}
                </p>
                <h3 className="mt-2 font-display text-xl font-medium text-navy">{p.title[lang]}</h3>
                <p className="mt-2 text-sm text-muted">{p.lead}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <h2 className="font-display text-3xl font-medium tracking-tight text-navy">{t.activitiesTitle}</h2>
          <Link to="/activities" className="inline-flex items-center gap-1.5 text-sm font-medium text-navy">
            {t.viewAllActivities}
            <ArrowRight className="size-4" />
          </Link>
        </div>
        <ul className="mt-8 divide-y divide-line border-y border-line">
          {featuredActivities.map((a) => (
            <li key={a.title.en} className="grid gap-2 py-5 sm:grid-cols-12 sm:items-baseline">
              <p className="text-sm text-muted sm:col-span-3">{a.date}</p>
              <div className="sm:col-span-9">
                <p className="text-xs font-medium uppercase tracking-[0.14em] text-blue">{t.kind[a.kind]}</p>
                <p className="mt-1 font-medium text-navy">{a.title[lang]}</p>
                <p className="mt-1 text-sm text-muted">{a.place[lang]}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section className="bg-surface">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <h2 className="font-display text-3xl font-medium tracking-tight text-navy">{t.galleryTitle}</h2>
          <div className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-5">
            {PHOTOS.map((photo) => (
              <figure key={photo.src} className="overflow-hidden rounded-xl bg-sand">
                <img src={photo.src} alt={photo.alt[lang]} className="aspect-[4/3] w-full object-cover" />
                <figcaption className="px-3 py-2 text-xs text-muted">{photo.caption[lang]}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-navy text-paper">
        <div className="mx-auto flex max-w-6xl flex-col items-start gap-6 px-4 py-16 sm:flex-row sm:items-end sm:justify-between sm:px-6 sm:py-20">
          <div className="max-w-xl">
            <h2 className="font-display text-3xl font-medium tracking-tight sm:text-4xl">{t.joinBanner.title}</h2>
            <p className="mt-3 text-paper/72">{t.joinBanner.body}</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button asChild size="lg">
              <a href={LINKS.memberForm} target="_blank" rel="noreferrer">
                {t.joinBanner.member}
              </a>
            </Button>
            <Button asChild size="lg" variant="invert">
              <a href={LINKS.supporterForm} target="_blank" rel="noreferrer">
                {t.joinBanner.supporter}
              </a>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
