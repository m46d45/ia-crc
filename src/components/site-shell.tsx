import type { ReactNode } from "react";
import { SiteFooter } from "./site-footer";
import { SiteHeader } from "./site-header";

export function SiteShell({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-svh flex-col bg-paper text-ink">
      <SiteHeader />
      <div className="flex-1">{children}</div>
      <SiteFooter />
    </div>
  );
}

export function PageIntro({
  kicker,
  title,
  children,
}: {
  kicker?: string;
  title: string;
  children?: ReactNode;
}) {
  return (
    <header className="border-b border-line bg-navy text-paper">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
        {kicker ? (
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-paper/55">{kicker}</p>
        ) : null}
        <h1 className="mt-3 max-w-3xl font-display text-4xl font-medium tracking-tight sm:text-5xl">{title}</h1>
        {children ? <div className="mt-5 max-w-2xl text-base leading-relaxed text-paper/75">{children}</div> : null}
      </div>
    </header>
  );
}
