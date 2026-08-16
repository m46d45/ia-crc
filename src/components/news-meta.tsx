import { useI18n } from "@/i18n/provider";
import { cn } from "@/lib/utils";

export function NewsMeta({
  date,
  category,
  light = false,
}: {
  date: string;
  category?: "conference" | "publication" | "announcement";
  light?: boolean;
}) {
  const { t } = useI18n();
  const label = t.newsCategory[category ?? "announcement"];

  return (
    <p
      className={cn(
        "text-xs font-medium uppercase tracking-[0.14em]",
        light ? "text-paper/55" : "text-blue",
      )}
    >
      <span>{date}</span>
      <span className={cn("mx-2", light ? "text-paper/30" : "text-blue/35")}>·</span>
      <span>{label}</span>
    </p>
  );
}
