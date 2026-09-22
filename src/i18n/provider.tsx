import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { COPY, type Copy } from "./copy";
import type { Lang } from "@/data/site";

const STORAGE_KEY = "ia-crc-lang";

type I18n = {
  lang: Lang;
  t: Copy;
  setLang: (lang: Lang) => void;
};

const I18nContext = createContext<I18n | null>(null);

function readStoredLang(): Lang {
  if (typeof window === "undefined") return "en";
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (raw === "id" || raw === "en") return raw;
  } catch {
    // Ignore private-mode / blocked storage.
  }
  const nav = window.navigator.language.toLowerCase();
  if (nav.startsWith("id")) return "id";
  return "en";
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setLangState(readStoredLang());
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    document.documentElement.lang = lang;
    try {
      window.localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      // Ignore write failures.
    }
  }, [lang, ready]);

  const setLang = useCallback((next: Lang) => {
    setLangState(next);
  }, []);

  const value = useMemo<I18n>(
    () => ({ lang, t: COPY[lang], setLang }),
    [lang, setLang],
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within I18nProvider");
  return ctx;
}
