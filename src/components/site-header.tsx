import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { SignedIn, SignedOut, UserButton } from "@/lib/auth/gates";
import { useCurrentUserState } from "@/lib/auth/use-current-user";
import { useI18n } from "@/i18n/provider";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";

const NAV = [
  { to: "/about", key: "about" as const },
  { to: "/research", key: "research" as const },
  { to: "/activities", key: "activities" as const },
  { to: "/members", key: "members" as const },
  { to: "/resources", key: "resources" as const },
  { to: "/contact", key: "contact" as const },
];

export function SiteHeader() {
  const { t } = useI18n();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [open, setOpen] = useState(false);
  const { user, isPending } = useCurrentUserState();

  return (
    <header className="sticky top-0 z-40 border-b border-line/70 bg-paper/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:h-[4.25rem] sm:px-6">
        <Link to="/" className="flex min-w-0 items-center gap-2.5" onClick={() => setOpen(false)}>
          <img src="/images/logo.png" alt="" className="h-9 w-9 rounded-sm object-contain sm:h-10 sm:w-10" />
          <span className="min-w-0">
            <span className="block font-display text-[1.05rem] font-medium leading-none tracking-tight text-navy">
              {t.brand}
            </span>
            <span className="mt-0.5 hidden truncate text-[0.68rem] uppercase tracking-[0.14em] text-muted sm:block">
              Research forum
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-0.5 lg:flex" aria-label="Primary">
          {NAV.map((item) => {
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
        </nav>

        <div className="flex items-center gap-1.5 sm:gap-2">
          <Button asChild size="sm" className="hidden sm:inline-flex">
            <Link to="/join">{t.nav.join}</Link>
          </Button>

          <div className="hidden sm:block">
            {isPending ? (
              <div className="h-8 w-8 animate-pulse rounded-full bg-sand" />
            ) : user ? (
              <SignedIn>
                <UserButton />
              </SignedIn>
            ) : (
              <SignedOut>
                <Link
                  to="/login"
                  className="inline-flex h-8 items-center rounded-md px-2 text-sm text-muted hover:text-ink"
                >
                  {t.nav.signIn}
                </Link>
              </SignedOut>
            )}
          </div>

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
            {NAV.map((item) => (
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
            {!isPending && !user ? (
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
