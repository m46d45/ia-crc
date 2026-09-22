import { Link, useRouterState } from "@tanstack/react-router";
import { ChevronDown, Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useI18n } from "@/i18n/provider";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";

const NAV_PRIMARY = [
  { to: "/about", key: "about" as const },
  { to: "/news", key: "news" as const },
  { to: "/research", key: "research" as const },
  { to: "/publications", key: "publications" as const },
  { to: "/members", key: "members" as const },
  { to: "/contact", key: "contact" as const },
];

const NAV_MORE = [
  { to: "/activities", key: "activities" as const },
  { to: "/resources", key: "resources" as const },
  { to: "/statistics", key: "statistics" as const },
];

const showAuthUi = import.meta.env.VITE_SHOW_AUTH_UI === "true";

export function SiteHeader() {
  const { t, lang, setLang } = useI18n();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [open, setOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const moreRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (!moreRef.current?.contains(e.target as Node)) setMoreOpen(false);
    }
    document.addEventListener("click", onDocClick);
    return () => document.removeEventListener("click", onDocClick);
  }, []);

  const moreActive = NAV_MORE.some((item) => pathname === item.to);

  return (
    <header className="sticky top-0 z-40 border-b border-line/70 bg-paper/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:h-[4.25rem] sm:px-6">
        <Link to="/" className="flex min-w-0 items-center" onClick={() => setOpen(false)}>
          <img src="/images/logo-wordmark.png" alt="IA-CRC" className="h-7 w-auto sm:h-8" />
        </Link>

        <nav className="hidden items-center gap-0.5 lg:flex" aria-label="Primary">
          {NAV_PRIMARY.map((item) => {
            const active = pathname === item.to;
            return (
              <Link
                key={item.to}
                to={item.to}
                className={cn(
                  "rounded-md px-2.5 py-1.5 text-[0.92rem] transition-colors",
                  active ? "bg-sand text-navy" : "text-muted hover:bg-sand/70 hover:text-ink",
                )}
              >
                {t.nav[item.key]}
              </Link>
            );
          })}
          <div className="relative" ref={moreRef}>
            <button
              type="button"
              className={cn(
                "inline-flex items-center gap-1 rounded-md px-2.5 py-1.5 text-[0.92rem] transition-colors",
                moreActive || moreOpen
                  ? "bg-sand text-navy"
                  : "text-muted hover:bg-sand/70 hover:text-ink",
              )}
              aria-expanded={moreOpen}
              aria-haspopup="menu"
              onClick={() => setMoreOpen((v) => !v)}
            >
              {t.nav.more}
              <ChevronDown className={cn("size-3.5 transition-transform", moreOpen && "rotate-180")} />
            </button>
            {moreOpen ? (
              <div
                role="menu"
                className="absolute right-0 mt-2 min-w-[11rem] rounded-lg border border-line bg-surface p-1.5 shadow-card"
              >
                {NAV_MORE.map((item) => (
                  <Link
                    key={item.to}
                    to={item.to}
                    role="menuitem"
                    onClick={() => setMoreOpen(false)}
                    className={cn(
                      "block rounded-md px-3 py-2 text-sm",
                      pathname === item.to ? "bg-sand text-navy" : "text-ink hover:bg-sand/70",
                    )}
                  >
                    {t.nav[item.key]}
                  </Link>
                ))}
              </div>
            ) : null}
          </div>
        </nav>

        <div className="flex items-center gap-1.5 sm:gap-2">
          <div
            className="inline-flex items-center rounded-md border border-line bg-surface p-0.5 text-xs font-medium"
            role="group"
            aria-label={t.nav.language}
          >
            <button
              type="button"
              className={cn(
                "rounded px-2 py-1 transition-colors",
                lang === "en" ? "bg-navy text-paper" : "text-muted hover:text-ink",
              )}
              aria-pressed={lang === "en"}
              onClick={() => setLang("en")}
            >
              EN
            </button>
            <button
              type="button"
              className={cn(
                "rounded px-2 py-1 transition-colors",
                lang === "id" ? "bg-navy text-paper" : "text-muted hover:text-ink",
              )}
              aria-pressed={lang === "id"}
              onClick={() => setLang("id")}
            >
              ID
            </button>
          </div>

          <Button asChild size="sm" className="hidden sm:inline-flex">
            <Link to="/join">{t.nav.join}</Link>
          </Button>

          {showAuthUi ? (
            <Link
              to="/login"
              className="hidden h-8 items-center rounded-md px-2 text-sm text-muted hover:text-ink sm:inline-flex"
            >
              {t.nav.signIn}
            </Link>
          ) : null}

          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-md text-navy lg:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {open ? (
        <div className="border-t border-line bg-paper px-4 py-3 lg:hidden">
          <nav className="flex flex-col gap-1" aria-label="Mobile">
            {[...NAV_PRIMARY, ...NAV_MORE].map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className={cn(
                  "rounded-lg px-3 py-3 text-base",
                  pathname === item.to ? "bg-sand text-navy" : "text-ink",
                )}
              >
                {t.nav[item.key]}
              </Link>
            ))}
            <Link
              to="/join"
              onClick={() => setOpen(false)}
              className="rounded-lg bg-blue px-3 py-3 text-center text-base font-medium text-surface"
            >
              {t.nav.join}
            </Link>
            {showAuthUi ? (
              <Link to="/login" onClick={() => setOpen(false)} className="px-3 py-2 text-sm text-muted">
                {t.nav.signIn}
              </Link>
            ) : null}
          </nav>
        </div>
      ) : null}
    </header>
  );
}
