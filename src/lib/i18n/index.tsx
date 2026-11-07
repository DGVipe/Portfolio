"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useSyncExternalStore,
} from "react";

import { LOCALE_COOKIE, localize, parseLocale, type Locale, type Text } from "./locale";
import { MESSAGES, type Messages } from "./messages";

const CHANGE_EVENT = "locale-change";

function readCookieLocale(): Locale | null {
  const value = document.cookie.match(new RegExp(`(?:^|; )${LOCALE_COOKIE}=([^;]*)`))?.[1];
  return parseLocale(value);
}

function subscribe(callback: () => void) {
  window.addEventListener(CHANGE_EVENT, callback);
  return () => window.removeEventListener(CHANGE_EVENT, callback);
}

type I18n = {
  locale: Locale;
  /** Interface strings for the current language. */
  t: Messages;
  /** Resolves a content `Text` (string or `{ en, es }`) for the current language. */
  tx: (text: Text) => string;
  setLocale: (locale: Locale) => void;
};

const I18nContext = createContext<I18n | null>(null);

export function I18nProvider({
  children,
  initialLocale,
  titles,
}: {
  children: React.ReactNode;
  /** The language the server picked (saved cookie, else Accept-Language). */
  initialLocale: Locale;
  /** Document title per language. */
  titles?: Record<Locale, string>;
}) {
  // Server render and hydration use `initialLocale`, so the first paint is
  // already in the right language. After that the cookie is the source of truth.
  const locale = useSyncExternalStore(
    subscribe,
    () => readCookieLocale() ?? initialLocale,
    () => initialLocale,
  );

  const setLocale = useCallback((next: Locale) => {
    document.cookie = `${LOCALE_COOKIE}=${next}; path=/; max-age=31536000; samesite=lax`;
    window.dispatchEvent(new Event(CHANGE_EVENT));
  }, []);

  const value = useMemo<I18n>(
    () => ({
      locale,
      t: MESSAGES[locale],
      tx: (text) => localize(text, locale),
      setLocale,
    }),
    [locale, setLocale],
  );

  // Keep <html lang> and the tab title in sync with the chosen language.
  useEffect(() => {
    document.documentElement.lang = locale;
    if (titles) document.title = titles[locale];
  }, [locale, titles]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n(): I18n {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used inside I18nProvider");
  return ctx;
}
