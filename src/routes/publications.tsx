import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, Check } from "lucide-react";
import { useEffect, useMemo, useState, type FormEvent, type ReactNode } from "react";
import { PageIntro } from "@/components/site-shell";
import { Button } from "@/components/ui/button";
import {
  mergePublications,
  readLocalPublications,
  writeLocalPublication,
  type Publication,
} from "@/data/publications";
import { useI18n } from "@/i18n/provider";
import { listPublications } from "@/lib/publications.server";

type CitePreview = {
  doi: string | null;
  url: string;
  title: string;
  authors: string;
  year: string | null;
  container: string | null;
};

export const Route = createFileRoute("/publications")({
  loader: () => listPublications(),
  component: PublicationsPage,
});

async function postPublications(body: Record<string, unknown>) {
  const res = await fetch("/api/publications", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const json = (await res.json()) as Record<string, unknown>;
  if (!res.ok) throw new Error(String(json.error || "Request failed"));
  return json;
}

function PublicationsPage() {
  const { t } = useI18n();
  const p = t.publicationsPage;
  const loaded = Route.useLoaderData();
  const [local, setLocal] = useState<Publication[]>([]);
  const [source, setSource] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [institution, setInstitution] = useState("");
  const [note, setNote] = useState("");
  const [preview, setPreview] = useState<CitePreview | null>(null);
  const [status, setStatus] = useState<"idle" | "looking" | "saving">("idle");
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);

  useEffect(() => {
    setLocal(readLocalPublications());
  }, []);

  const items = useMemo(
    () => mergePublications(loaded.publications, local),
    [loaded.publications, local],
  );

  async function onLookup() {
    setError(null);
    setNotice(null);
    setStatus("looking");
    try {
      const cited = (await postPublications({ action: "lookup", source })) as CitePreview;
      setPreview(cited);
    } catch (err) {
      setPreview(null);
      setError(err instanceof Error ? err.message : p.lookupError);
    } finally {
      setStatus("idle");
    }
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setNotice(null);
    setStatus("saving");
    try {
      const result = (await postPublications({
        action: "submit",
        source,
        submitterName: name,
        submitterEmail: email,
        institution: institution || undefined,
        note: note || undefined,
      })) as { publication: Publication; duplicate: boolean };
      writeLocalPublication(result.publication);
      setLocal(readLocalPublications());
      setNotice(result.duplicate ? p.duplicate : p.success);
      setSource("");
      setNote("");
      setPreview(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : p.submitError);
    } finally {
      setStatus("idle");
    }
  }

  return (
    <main>
      <PageIntro title={p.title}>
        <p>{p.intro}</p>
      </PageIntro>

      <section className="border-b border-line bg-cream">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-blue">{p.formKicker}</p>
            <h2 className="mt-2 font-display text-3xl font-medium text-navy">{p.formTitle}</h2>
            <p className="mt-3 text-muted">{p.formLead}</p>
          </div>
          <form onSubmit={onSubmit} className="space-y-4 lg:col-span-7">
            <Field label={p.sourceLabel} hint={p.sourceHint}>
              <input
                value={source}
                onChange={(e) => {
                  setSource(e.target.value);
                  setPreview(null);
                }}
                required
                placeholder="10.1061/… or https://doi.org/…"
                className="h-11 w-full rounded-md border border-line bg-surface px-3 text-ink outline-none ring-navy/20 focus:ring-2"
              />
            </Field>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label={p.nameLabel}>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="h-11 w-full rounded-md border border-line bg-surface px-3 text-ink outline-none ring-navy/20 focus:ring-2"
                />
              </Field>
              <Field label={p.emailLabel}>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="h-11 w-full rounded-md border border-line bg-surface px-3 text-ink outline-none ring-navy/20 focus:ring-2"
                />
              </Field>
            </div>
            <Field label={p.institutionLabel}>
              <input
                value={institution}
                onChange={(e) => setInstitution(e.target.value)}
                className="h-11 w-full rounded-md border border-line bg-surface px-3 text-ink outline-none ring-navy/20 focus:ring-2"
              />
            </Field>
            <Field label={p.noteLabel} hint={p.noteHint}>
              <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                rows={3}
                className="w-full rounded-md border border-line bg-surface px-3 py-2 text-ink outline-none ring-navy/20 focus:ring-2"
              />
            </Field>

            {preview ? (
              <div className="rounded-xl border border-navy/15 bg-surface p-4">
                <p className="text-xs font-medium uppercase tracking-[0.14em] text-blue">{p.preview}</p>
                <p className="mt-2 font-medium text-navy">{preview.title}</p>
                <p className="mt-1 text-sm text-muted">
                  {preview.authors}
                  {preview.year ? ` · ${preview.year}` : ""}
                  {preview.container ? ` · ${preview.container}` : ""}
                </p>
                {preview.doi ? <p className="mt-2 text-xs text-subtle">doi:{preview.doi}</p> : null}
              </div>
            ) : null}

            {error ? <p className="text-sm text-navy">{error}</p> : null}
            {notice ? (
              <p className="inline-flex items-center gap-2 text-sm text-navy">
                <Check className="size-4" />
                {notice}
              </p>
            ) : null}

            <div className="flex flex-wrap gap-3">
              <Button type="button" variant="invert" disabled={status !== "idle"} onClick={() => void onLookup()}>
                {status === "looking" ? p.looking : p.lookup}
              </Button>
              <Button type="submit" disabled={status !== "idle" || !preview}>
                {status === "saving" ? p.saving : p.submit}
              </Button>
            </div>
          </form>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <div className="flex items-end justify-between gap-4">
          <h2 className="font-display text-3xl font-medium text-navy">{p.listTitle}</h2>
          <p className="text-sm text-muted">
            {items.length} {items.length === 1 ? p.one : p.many}
          </p>
        </div>
        {items.length === 0 ? (
          <p className="mt-8 rounded-xl border border-dashed border-line bg-surface px-5 py-10 text-muted">{p.empty}</p>
        ) : (
          <ul className="mt-8 space-y-4">
            {items.map((item) => (
              <li key={item.id} className="rounded-xl border border-line bg-surface p-5 shadow-card">
                <p className="text-xs text-subtle">
                  {item.year ?? "n.d."}
                  {item.container ? ` · ${item.container}` : ""}
                </p>
                <h3 className="mt-1 font-display text-2xl font-medium text-navy">{item.title}</h3>
                <p className="mt-2 text-sm text-muted">{item.authors}</p>
                {item.note ? <p className="mt-3 text-sm text-ink/80">{item.note}</p> : null}
                <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 font-medium text-navy"
                  >
                    {item.doi ? `doi:${item.doi}` : p.open}
                    <ArrowUpRight className="size-4" />
                  </a>
                  <Link to="/news/$slug" params={{ slug: `pub-${item.id}` }} className="text-muted hover:text-navy">
                    {p.viewNews}
                  </Link>
                  <span className="text-subtle">
                    {p.addedBy} {item.submitterName}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}

function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: ReactNode;
}) {
  return (
    <label className="block">
      <span className="text-xs font-medium uppercase tracking-[0.12em] text-muted">{label}</span>
      <span className="mt-1.5 block">{children}</span>
      {hint ? <span className="mt-1 block text-xs text-subtle">{hint}</span> : null}
    </label>
  );
}
