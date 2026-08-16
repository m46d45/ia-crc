import { createFileRoute } from "@tanstack/react-router";
import { PageIntro } from "@/components/site-shell";
import { useI18n } from "@/i18n/provider";

export const Route = createFileRoute("/about")({ component: AboutPage });

function AboutPage() {
  const { t } = useI18n();
  const p = t.aboutPage;

  return (
    <main>
      <PageIntro title={p.title}>
        <p>{p.intro}</p>
        <p className="mt-3">{p.extension}</p>
      </PageIntro>

      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <h2 className="font-display text-3xl font-medium text-navy">{t.vision.title}</h2>
        <p className="mt-4 max-w-3xl text-lg leading-relaxed text-muted">{t.vision.body}</p>
      </section>

      <section className="border-y border-line bg-surface">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
          <h2 className="font-display text-3xl font-medium text-navy">{t.objectivesTitle}</h2>
          <ol className="mt-8 grid gap-4 md:grid-cols-2">
            {t.objectives.map((obj, i) => (
              <li key={obj.title} className="rounded-xl border border-line bg-paper p-5">
                <p className="font-display text-2xl text-blue">{String(i + 1).padStart(2, "0")}</p>
                <h3 className="mt-2 font-display text-xl font-medium text-navy">{obj.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{obj.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <h2 className="font-display text-3xl font-medium text-navy">{p.timelineTitle}</h2>
        <ol className="mt-8 space-y-0">
          {p.timeline.map((item, i) => (
            <li key={item.title} className="grid gap-2 border-l-2 border-blue/35 py-5 pl-6 sm:grid-cols-12">
              <p className="text-sm font-medium text-blue sm:col-span-3">{item.date}</p>
              <div className="sm:col-span-9">
                <h3 className="font-display text-xl font-medium text-navy">{item.title}</h3>
                <p className="mt-1 text-muted">{item.body}</p>
              </div>
              <span className="sr-only">{i + 1}</span>
            </li>
          ))}
        </ol>
      </section>

      <section className="bg-cream">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
          <h2 className="font-display text-3xl font-medium text-navy">{p.walkTitle}</h2>
          <p className="mt-3 max-w-2xl text-muted">{p.walkIntro}</p>
          <div className="mt-8 grid gap-3 md:grid-cols-2">
            {p.walk.map((item) => (
              <article key={item.title} className="rounded-xl border border-line bg-surface p-5">
                <h3 className="font-display text-lg font-medium text-navy">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{item.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <h2 className="font-display text-3xl font-medium text-navy">{p.auxiliaryTitle}</h2>
        <p className="mt-3 max-w-3xl text-muted">{p.auxiliary}</p>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {[p.vit, p.vic].map((item) => (
            <article key={item.title} className="rounded-xl bg-navy p-6 text-paper">
              <h3 className="font-display text-xl font-medium">{item.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-paper/72">{item.body}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
