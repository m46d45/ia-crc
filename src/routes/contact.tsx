import { createFileRoute } from "@tanstack/react-router";
import { Mail, MapPin } from "lucide-react";
import { PageIntro } from "@/components/site-shell";
import { Button } from "@/components/ui/button";
import { LINKS } from "@/data/site";
import { useI18n } from "@/i18n/provider";

export const Route = createFileRoute("/contact")({ component: ContactPage });

function ContactPage() {
  const { t } = useI18n();
  const p = t.contactPage;

  return (
    <main>
      <PageIntro title={p.title}>
        <p>{p.intro}</p>
      </PageIntro>
      <section className="mx-auto grid max-w-6xl gap-6 px-4 py-14 sm:px-6 lg:grid-cols-2">
        <article className="rounded-xl border border-line bg-surface p-6">
          <p className="text-xs font-medium uppercase tracking-[0.16em] text-blue">{p.person}</p>
          <h2 className="mt-3 font-display text-3xl font-medium text-navy">{p.name}</h2>
          <p className="mt-2 text-muted">{p.role}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild>
              <a href={`mailto:${LINKS.email}`}>
                <Mail />
                {p.write}
              </a>
            </Button>
            <Button asChild variant="outline">
              <a href={LINKS.maps} target="_blank" rel="noreferrer">
                <MapPin />
                {p.map}
              </a>
            </Button>
          </div>
        </article>
        <article className="rounded-xl bg-navy p-6 text-paper">
          <p className="text-xs font-medium uppercase tracking-[0.16em] text-paper/50">{t.footer.secretariat}</p>
          <p className="mt-4 whitespace-pre-line text-base leading-relaxed text-paper/80">{t.footer.address}</p>
          <a
            href={`mailto:${LINKS.email}`}
            className="mt-6 inline-block text-paper underline decoration-paper/30 underline-offset-4"
          >
            {LINKS.email}
          </a>
        </article>
      </section>
    </main>
  );
}
