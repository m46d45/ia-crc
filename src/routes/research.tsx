import { createFileRoute } from "@tanstack/react-router";
import { PageIntro } from "@/components/site-shell";
import { Button } from "@/components/ui/button";
import { LINKS, PROJECTS, RWGS, type ProjectStatus } from "@/data/site";
import { useI18n } from "@/i18n/provider";

export const Route = createFileRoute("/research")({ component: ResearchPage });

const ORDER: ProjectStatus[] = ["ongoing", "proposal", "finished"];

function ResearchPage() {
  const { t, lang } = useI18n();
  const p = t.researchPage;

  return (
    <main>
      <PageIntro title={p.title}>
        <p>{p.intro}</p>
      </PageIntro>

      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <h2 className="font-display text-3xl font-medium text-navy">{p.groups}</h2>
        <ul className="mt-8 grid gap-4 md:grid-cols-2">
          {RWGS.map((g) => (
            <li key={g.id} id={`rwg-${g.id}`} className="scroll-mt-24 rounded-xl border border-line bg-surface p-5 shadow-card">
              <p className="text-xs font-medium uppercase tracking-[0.16em] text-blue">{g.code}</p>
              <h3 className="mt-2 font-display text-2xl font-medium text-navy">{g.title[lang]}</h3>
              <p className="mt-2 text-sm text-muted">
                {g.lead} · {g.org}
              </p>
            </li>
          ))}
        </ul>
      </section>

      <section id="projects" className="scroll-mt-24 border-t border-line bg-cream">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
          <h2 className="font-display text-3xl font-medium text-navy">{p.projects}</h2>
          {ORDER.map((status) => {
            const items = PROJECTS.filter((x) => x.status === status);
            return (
              <div key={status} className="mt-10">
                <h3 className="text-xs font-medium uppercase tracking-[0.16em] text-blue">{t.status[status]}</h3>
                <ul className="mt-3 divide-y divide-line rounded-xl border border-line bg-surface">
                  {items.map((item) => (
                    <li key={item.title.en} className="grid gap-1 px-5 py-4 sm:grid-cols-12 sm:items-baseline">
                      <p className="text-xs font-medium text-muted sm:col-span-2">{item.rwg}</p>
                      <div className="sm:col-span-7">
                        <p className="font-medium text-navy">{item.title[lang]}</p>
                      </div>
                      <p className="text-sm text-muted sm:col-span-3 sm:text-right">{item.lead}</p>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </section>

      <section className="bg-navy text-paper">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-14 sm:flex-row sm:items-end sm:justify-between sm:px-6">
          <div className="max-w-2xl">
            <h2 className="font-display text-3xl font-medium">{p.proposeTitle}</h2>
            <p className="mt-3 text-paper/72">{p.propose}</p>
          </div>
          <Button asChild variant="invert" size="lg">
            <a href={LINKS.proposalTemplate} target="_blank" rel="noreferrer">
              {p.downloadTemplate}
            </a>
          </Button>
        </div>
      </section>
    </main>
  );
}
