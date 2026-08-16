import { createFileRoute, Link } from "@tanstack/react-router";
import { GROK_PROVIDERS, authEnabled, signIn } from "@/lib/auth/client";
import { useI18n } from "@/i18n/provider";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/login")({ component: Login });

function Login() {
  const { t } = useI18n();

  return (
    <main className="mx-auto flex min-h-[70svh] max-w-md flex-col justify-center px-4 py-16">
      <p className="text-xs font-medium uppercase tracking-[0.18em] text-blue">{t.brand}</p>
      <h1 className="mt-3 font-display text-4xl font-medium text-navy">{t.login.title}</h1>
      <p className="mt-3 text-muted">{t.login.body}</p>
      <div className="mt-8 space-y-3">
        {authEnabled ? (
          GROK_PROVIDERS.map((p) => (
            <Button
              key={p.providerId}
              type="button"
              variant="outline"
              className="w-full"
              onClick={() => signIn(p.providerId, { callbackURL: "/" })}
            >
              Continue with {p.label}
            </Button>
          ))
        ) : (
          <p className="text-sm text-muted">{t.login.disabled}</p>
        )}
      </div>
      <Link to="/" className="mt-8 text-sm text-muted hover:text-ink">
        ← {t.brand}
      </Link>
    </main>
  );
}
