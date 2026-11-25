import { createFileRoute } from "@tanstack/react-router";
import { PageIntro } from "@/components/site-shell";
import { Button } from "@/components/ui/button";
import { LINKS } from "@/data/site";
import { useI18n } from "@/i18n/provider";

export const Route = createFileRoute("/feedback")({ component: FeedbackPage });

function FeedbackPage() {
  const { t } = useI18n();
  const p = t.feedbackPage;

  return (
    <main>
      <PageIntro title={p.title} />
      <section className="mx-auto grid max-w-6xl items-start gap-10 px-4 py-14 sm:px-6 md:grid-cols-[minmax(0,42rem)_auto]">
        <div>
          <div className="space-y-4 text-base leading-relaxed text-muted">
            <p>{p.who}</p>
            <p>{p.time}</p>
            <p>{p.review}</p>
          </div>
          <Button asChild className="mt-8">
            <a href={LINKS.feedbackForm} target="_blank" rel="noreferrer">
              {p.open}
            </a>
          </Button>
        </div>
        <figure className="w-fit rounded-xl border border-line bg-surface p-4">
          <img
            src="/images/feedback-form-qr.png"
            alt={p.qrAlt}
            width={480}
            height={480}
            className="h-52 w-52"
          />
          <figcaption className="mt-3 max-w-52 text-sm text-muted">{p.qrCaption}</figcaption>
        </figure>
      </section>
    </main>
  );
}
