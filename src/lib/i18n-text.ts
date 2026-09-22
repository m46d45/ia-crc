import type { Lang } from "@/data/site";

export type LocalizedText = { en: string; id: string };
export type LocalizedParagraphs = { en: string[]; id: string[] };

export function pickLang(value: string | LocalizedText, lang: Lang): string {
  if (typeof value === "string") return value;
  return value[lang] || value.en;
}

export function pickLangList(
  value: string[] | LocalizedParagraphs,
  lang: Lang,
): string[] {
  if (Array.isArray(value)) return value;
  return value[lang]?.length ? value[lang] : value.en;
}
