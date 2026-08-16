import { createServerFn } from "@tanstack/react-start";
import { listedPublications } from "@/lib/publication-store";

export const listPublications = createServerFn({ method: "GET" }).handler(async () => {
  return { publications: listedPublications() };
});
