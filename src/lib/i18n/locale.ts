export const LOCALES = ["en", "es"] as const;
export type Locale = (typeof LOCALES)[number];

// The choice is kept in a cookie so the server can read it and render the
// page in the right language from the first byte.
export const LOCALE_COOKIE = "locale";

export function parseLocale(value: string | null | undefined): Locale | null {
  return value === "en" || value === "es" ? value : null;
}

/** Spanish for an `Accept-Language` led by es-*, English otherwise. */
export function localeFromAcceptLanguage(header: string | null | undefined): Locale {
  return header?.trim().toLowerCase().startsWith("es") ? "es" : "en";
}

/**
 * Content text: a plain string is used for every language; an object gives
 * one value per language.
 */
export type Text = string | Record<Locale, string>;

export function localize(text: Text, locale: Locale): string {
  return typeof text === "string" ? text : text[locale];
}
