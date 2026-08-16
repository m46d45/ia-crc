import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { PageIntro } from "@/components/site-shell";
import { MEMBER_GROUPS, type MemberGroup } from "@/data/site";
import { useI18n } from "@/i18n/provider";

export const Route = createFileRoute("/members")({ component: MembersPage });

function MembersPage() {
  const { t } = useI18n();
  const [q, setQ] = useState("");
  const query = q.trim().toLowerCase();

  const groups = useMemo(() => {
    if (!query) return MEMBER_GROUPS;
    return MEMBER_GROUPS.map((g) => {
      const orgMatch = g.org.toLowerCase().includes(query);
      return {
        ...g,
        people: orgMatch ? g.people : g.people.filter((name) => name.toLowerCase().includes(query)),
      };
    }).filter((g) => g.people.length > 0);
  }, [query]);

  const sections: { key: MemberGroup["country"]; title: string }[] = [
    { key: "au", title: t.membersPage.au },
    { key: "id", title: t.membersPage.id },
    { key: "industry", title: t.membersPage.industry },
  ];

  return (
    <main>
      <PageIntro title={t.membersPage.title}>
        <p>{t.membersPage.intro}</p>
        <label className="mt-6 block max-w-md">
          <span className="sr-only">{t.membersPage.search}</span>
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder={t.membersPage.search}
            className="h-11 w-full rounded-lg border border-white/20 bg-navy-soft px-3 text-paper placeholder:text-paper/45 focus:border-paper/40 focus:outline-none"
          />
        </label>
      </PageIntro>

      <section className="mx-auto max-w-6xl space-y-12 px-4 py-14 sm:px-6">
        {sections.map((sec) => {
          const list = groups.filter((g) => g.country === sec.key);
          if (list.length === 0) return null;
          return (
            <div key={sec.key}>
              <h2 className="font-display text-2xl font-medium text-navy">{sec.title}</h2>
              <div className="mt-5 grid gap-4 md:grid-cols-2">
                {list.map((g) => (
                  <article key={g.org} className="rounded-xl border border-line bg-surface p-5">
                    <h3 className="font-medium text-navy">{g.org}</h3>
                    <p className="mt-1 text-xs uppercase tracking-wide text-subtle">
                      {g.people.length} {t.membersPage.people}
                    </p>
                    <ul className="mt-3 space-y-1 text-sm text-muted">
                      {g.people.map((name) => (
                        <li key={name}>{name}</li>
                      ))}
                    </ul>
                  </article>
                ))}
              </div>
            </div>
          );
        })}
        {groups.length === 0 ? <p className="text-muted">{t.membersPage.empty}</p> : null}

        <figure className="overflow-hidden rounded-xl border border-line bg-surface">
          <img src="/images/universities.png" alt="" className="w-full object-contain p-6" />
        </figure>
      </section>
    </main>
  );
}
