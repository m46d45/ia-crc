import { createFileRoute } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { PageIntro } from "@/components/site-shell";
import { LINKS } from "@/data/site";
import { useI18n } from "@/i18n/provider";

export const Route = createFileRoute("/resources")({ component: ResourcesPage });

function ResourcesPage() {
  const { t } = useI18n();
  const p = t.resourcesPage;

  return (
    <main>
      <PageIntro title={p.title}>
        <p>{p.intro}</p>
      </PageIntro>
      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <ul className="divide-y divide-line rounded-xl border border-line bg-surface">
          {p.items.map((item) => (
            <li key={item.title}>
              <a
                href={LINKS[item.hrefKey]}
                target="_blank"
                rel="noreferrer"
                className="flex items-start justify-between gap-4 px-5 py-5 hover:bg-cream"
              >
                <span>
                  <span className="block font-medium text-navy">{item.title}</span>
                  <span className="mt-1 block text-sm text-muted">{item.meta}</span>
                </span>
                <ArrowUpRight className="mt-1 size-4 shrink-0 text-subtle" />
              </a>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
