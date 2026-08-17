import { Link } from "@tanstack/react-router";
import { LINKS } from "@/data/site";
import { useI18n } from "@/i18n/provider";
import { useVisits } from "@/lib/use-visits";

export function SiteFooter() {
  const { t } = useI18n();
  const year = new Date().getFullYear();
  const { visitors } = useVisits();

  return (
    <footer className="border-t border-navy/10 bg-navy text-paper">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-12">
        <div className="md:col-span-5">
          <div>
            <img src="/images/logo-wordmark.png" alt="IA-CRC" className="h-8 w-auto" />
            <p className="mt-2 text-sm text-paper/65">{t.tagline}</p>
          </div>
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-paper/70">{t.fullName}</p>
        </div>

        <div className="md:col-span-3">
          <p className="text-xs font-medium uppercase tracking-[0.16em] text-paper/50">{t.footer.links}</p>
          <ul className="mt-3 space-y-2 text-sm">
            {[
              ["/about", t.nav.about],
              ["/news", t.nav.news],
              ["/research", t.nav.research],
              ["/publications", t.nav.publications],
              ["/statistics", t.nav.statistics],
              ["/activities", t.nav.activities],
              ["/resources", t.nav.resources],
              ["/members", t.nav.members],
              ["/join", t.nav.join],
            ].map(([to, label]) => (
              <li key={to}>
                <Link to={to} className="text-paper/80 hover:text-paper">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-4">
          <p className="text-xs font-medium uppercase tracking-[0.16em] text-paper/50">{t.footer.secretariat}</p>
          <p className="mt-3 whitespace-pre-line text-sm leading-relaxed text-paper/75">{t.footer.address}</p>
          <p className="mt-4 text-sm">
            <a href={`mailto:${LINKS.email}`} className="text-paper underline decoration-paper/30 underline-offset-4">
              {LINKS.email}
            </a>
          </p>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-5 text-xs text-paper/50 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <p>
            © {year} {t.footer.rights}
          </p>
          <div className="flex flex-col gap-1 sm:items-end">
            {visitors > 0 ? (
              <p>
                {visitors.toLocaleString()} {t.footer.visitors}
              </p>
            ) : null}
            <p>Institut Teknologi Bandung · La Trobe · Melbourne · Deakin</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
