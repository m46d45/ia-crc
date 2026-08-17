import { createFileRoute, Link } from "@tanstack/react-router";
import { PageIntro } from "@/components/site-shell";
import { Button } from "@/components/ui/button";
import { LINKS, SUPPORTERS } from "@/data/site";
import { useI18n } from "@/i18n/provider";

export const Route = createFileRoute("/join")({ component: JoinPage });

function JoinPage() {
  const { t } = useI18n();
  const p = t.joinPage;

  return (
    <main>
      <PageIntro title={p.title}>
        <p>{p.intro}</p>
      </PageIntro>
      <section className="mx-auto grid max-w-6xl gap-5 px-4 py-14 sm:px-6 md:grid-cols-2">
        <article className="flex flex-col rounded-xl border border-line bg-surface p-6 shadow-card">
          <p className="text-xs font-medium uppercase tracking-[0.16em] text-blue">01</p>
          <h2 className="mt-2 font-display text-3xl font-medium text-navy">{p.memberTitle}</h2>
          <p className="mt-4 flex-1 leading-relaxed text-muted">{p.memberBody}</p>
          <Button asChild className="mt-8">
            <a href={LINKS.memberForm} target="_blank" rel="noreferrer">
              {p.memberCta}
            </a>
          </Button>
        </article>
        <article className="flex flex-col rounded-xl bg-navy p-6 text-paper">
          <p className="text-xs font-medium uppercase tracking-[0.16em] text-paper/50">02</p>
          <h2 className="mt-2 font-display text-3xl font-medium">{p.supporterTitle}</h2>
          <p className="mt-4 flex-1 leading-relaxed text-paper/72">{p.supporterBody}</p>
          <Button asChild variant="invert" className="mt-8">
            <a href={LINKS.supporterForm} target="_blank" rel="noreferrer">
              {p.supporterCta}
            </a>
          </Button>
        </article>
      </section>
      <section className="mx-auto max-w-6xl px-4 pb-8 sm:px-6">
        <h2 className="font-display text-2xl font-medium text-navy">{t.membersPage.supporters}</h2>
        <ul className="mt-4 divide-y divide-line border-y border-line">
          {SUPPORTERS.map((s) => (
            <li key={s.org} className="py-3">
              <p className="font-medium text-navy">{s.org}</p>
              <p className="mt-1 text-sm text-muted">{s.contacts.join(" · ")}</p>
            </li>
          ))}
        </ul>
        <Link to="/members" hash="supporters" className="mt-4 inline-block text-sm font-medium text-navy">
          {t.membersPage.supporters}
        </Link>
      </section>
      <p className="mx-auto max-w-6xl px-4 pb-16 text-sm text-muted sm:px-6">{p.note}</p>
    </main>
  );
}
