import { formatFoundedDate, forumNumbers } from "@/lib/forum-numbers";
import { useI18n } from "@/i18n/provider";

function phrase(count: number, one: string, many: string) {
  return `${count} ${count === 1 ? one : many}`;
}

function joinAnd(items: string[], andWord: string) {
  if (items.length <= 1) return items[0] ?? "";
  if (items.length === 2) return `${items[0]} ${andWord} ${items[1]}`;
  return `${items.slice(0, -1).join(", ")}, ${andWord} ${items[items.length - 1]}`;
}

export function InNumbers() {
  const { t, lang } = useI18n();
  const copy = t.inNumbers;
  const numbers = forumNumbers();
  const title = `${copy.title}: ${phrase(numbers.years, copy.yearOne, copy.yearMany)} (${copy.month} ${numbers.foundedYear} – ${copy.month} ${numbers.throughYear})`;

  const institutionsHint = `${phrase(numbers.universities, copy.universityOne, copy.universityMany)} (${numbers.auUniversities} ${copy.australian}, ${numbers.idUniversities} ${copy.indonesian}) ${copy.and} ${phrase(numbers.industryPartners, copy.industryOne, copy.industryMany)}`;

  const activityHint = [
    [numbers.activitiesByKind.seminar, copy.seminarOne, copy.seminarMany],
    [numbers.activitiesByKind.workshop, copy.workshopOne, copy.workshopMany],
    [numbers.activitiesByKind.talk, copy.talkOne, copy.talkMany],
    [numbers.activitiesByKind.conference, copy.conferenceOne, copy.conferenceMany],
    [numbers.activitiesByKind.meeting, copy.meetingOne, copy.meetingMany],
    [numbers.activitiesByKind.booklaunch, copy.booklaunchOne, copy.booklaunchMany],
  ]
    .filter(([count]) => Number(count) > 0)
    .map(([count, one, many]) => phrase(Number(count), String(one), String(many)))
    .join(", ");

  const projectsHint = [
    phrase(numbers.projectsByStatus.finished, copy.finishedOne, copy.finishedMany),
    phrase(numbers.projectsByStatus.ongoing, copy.ongoingOne, copy.ongoingMany),
    phrase(numbers.projectsByStatus.proposal, copy.proposalOne, copy.proposalMany),
  ].join(", ");

  const items = [
    {
      label: copy.yearsLabel,
      value: numbers.years,
      hint: copy.yearsHint.replace("{date}", formatFoundedDate(lang)),
    },
    {
      label: copy.foundingLabel,
      value: numbers.foundingUniversities,
      hint: joinAnd(
        numbers.foundingNames.map((name) => name[lang]),
        copy.and,
      ),
    },
    { label: copy.rwgLabel, value: numbers.rwgs, hint: copy.rwgHint },
    { label: copy.institutionsLabel, value: numbers.memberInstitutions, hint: institutionsHint },
    { label: copy.researchersLabel, value: numbers.researchers, hint: copy.researchersHint },
    { label: copy.supportersLabel, value: numbers.supporters, hint: copy.supportersHint },
    { label: copy.activitiesLabel, value: numbers.activities, hint: activityHint },
    { label: copy.projectsLabel, value: numbers.projects, hint: projectsHint },
    {
      label: copy.publicationsLabel,
      value: numbers.publications,
      hint: `${numbers.foundedYear}–${numbers.throughYear} ${copy.publicationsHint}`,
    },
  ];

  return (
    <section id="in-numbers" className="border-b border-line bg-surface">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-14">
        <h2 className="max-w-3xl font-display text-3xl font-medium tracking-tight text-navy sm:text-4xl">
          {title}
        </h2>
        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted sm:text-base">
          {copy.lead}
        </p>
        <dl className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <div key={item.label} className="rounded-xl border border-line bg-cream px-5 py-4">
              <dt className="text-xs font-medium uppercase tracking-[0.14em] text-subtle">
                {item.label}
              </dt>
              <dd className="mt-1 font-display text-4xl font-medium tabular-nums text-navy">
                {item.value}
              </dd>
              <p className="mt-2 text-sm leading-relaxed text-muted">{item.hint}</p>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
