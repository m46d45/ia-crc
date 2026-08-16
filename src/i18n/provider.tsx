import { createContext, useContext, useMemo, type ReactNode } from "react";
import { COPY, type Copy } from "./copy";
import type { Lang } from "@/data/site";

type I18n = {
  lang: Lang;
  t: Copy;
};

const I18nContext = createContext<I18n | null>(null);

export function I18nProvider({ children }: { children: ReactNode }) {
  const value = useMemo<I18n>(() => ({ lang: "en", t: COPY.en }), []);
  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within I18nProvider");
  return ctx;
}
