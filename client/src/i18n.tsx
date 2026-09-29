import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";
import type { Lang, Latin, LatinText, Text } from "@/data/restaurant";

/** "zh" shows body text in Chinese; "latin" shows it in French or English. */
export type Mode = "zh" | "latin";

type LangContextValue = {
  /** Effective language of body text. */
  lang: Lang;
  mode: Mode;
  latin: Latin;
  setMode: (mode: Mode) => void;
  setLatin: (latin: Latin) => void;
  /** Body text in the current language. */
  t: (text: Text) => string;
  /** The French/English label that sits next to the Chinese. */
  tl: (text: LatinText) => string;
};

const LangContext = createContext<LangContextValue | null>(null);
const MODE_KEY = "xinlong-mode";
const LATIN_KEY = "xinlong-latin";

function readStorage(key: string) {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}

function writeStorage(key: string, value: string) {
  try {
    localStorage.setItem(key, value);
  } catch {
    /* storage unavailable */
  }
}

const browserLang = () => navigator.language?.toLowerCase() ?? "";

function initialMode(): Mode {
  const saved = readStorage(MODE_KEY);
  if (saved === "zh" || saved === "latin") return saved;
  return browserLang().startsWith("zh") ? "zh" : "latin";
}

function initialLatin(): Latin {
  const saved = readStorage(LATIN_KEY);
  if (saved === "fr" || saved === "en") return saved;
  return browserLang().startsWith("en") ? "en" : "fr";
}

export function LangProvider({ children }: { children: ReactNode }) {
  const [mode, setModeState] = useState<Mode>(initialMode);
  const [latin, setLatinState] = useState<Latin>(initialLatin);
  const lang: Lang = mode === "zh" ? "zh" : latin;

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const setMode = useCallback((next: Mode) => {
    setModeState(next);
    writeStorage(MODE_KEY, next);
  }, []);

  const setLatin = useCallback((next: Latin) => {
    setLatinState(next);
    writeStorage(LATIN_KEY, next);
  }, []);

  const t = useCallback((text: Text) => text[lang], [lang]);
  const tl = useCallback((text: LatinText) => text[latin], [latin]);

  return (
    <LangContext.Provider value={{ lang, mode, latin, setMode, setLatin, t, tl }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error("useLang must be used inside <LangProvider>");
  return ctx;
}

/** 4.4 → "4,4" in French, "4.4" otherwise. */
export function formatRating(value: number, lang: Lang) {
  const text = value.toFixed(1);
  return lang === "fr" ? text.replace(".", ",") : text;
}
