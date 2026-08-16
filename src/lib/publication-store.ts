import { mergePublications, SEEDED_PUBLICATIONS, type Publication } from "@/data/publications";

const extra: Publication[] = [];

export function listedPublications(): Publication[] {
  return mergePublications(SEEDED_PUBLICATIONS, extra);
}

export function findPublication(doi: string | null) {
  if (!doi) return undefined;
  const needle = doi.toLowerCase();
  return listedPublications().find((p) => p.doi?.toLowerCase() === needle);
}

export function rememberPublication(item: Publication) {
  extra.push(item);
  return item;
}
