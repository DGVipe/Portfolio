import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { cookies, headers } from "next/headers";
import { Suspense } from "react";

import { PageSkeleton } from "@/components/page-skeleton";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { site } from "@/content/site";
import { I18nProvider } from "@/lib/i18n";
import {
  LOCALE_COOKIE,
  LOCALES,
  localeFromAcceptLanguage,
  localize,
  parseLocale,
  type Locale,
} from "@/lib/i18n/locale";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const titles = Object.fromEntries(
  LOCALES.map((l) => [l, `${site.name} — ${localize(site.role, l)}`]),
) as Record<Locale, string>;

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: titles.en,
  description: site.description,
  openGraph: {
    type: "website",
    title: titles.en,
    description: site.description,
    url: site.url,
    siteName: site.name,
    locale: "en_US",
    alternateLocale: "es_CL",
  },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0f1117" },
  ],
};

/** Dev-only: set SKELETON_DELAY_MS to keep the loading skeleton on screen long enough to inspect it. */
const skeletonDelayMs =
  process.env.NODE_ENV === "development" ? Number(process.env.SKELETON_DELAY_MS) || 0 : 0;

/**
 * Picks the language before anything renders: the saved choice, or on a first
 * visit the browser's language (Accept-Language), so the page never switches.
 */
async function LocaleProvider({ children }: { children: React.ReactNode }) {
  if (skeletonDelayMs) await new Promise((r) => setTimeout(r, skeletonDelayMs));
  const saved = parseLocale((await cookies()).get(LOCALE_COOKIE)?.value);
  const locale = saved ?? localeFromAcceptLanguage((await headers()).get("accept-language"));
  return (
    <I18nProvider initialLocale={locale} titles={titles}>
      {children}
    </I18nProvider>
  );
}

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <Suspense fallback={<PageSkeleton />}>
            <LocaleProvider>{children}</LocaleProvider>
          </Suspense>
          <Toaster position="bottom-right" />
        </ThemeProvider>
      </body>
    </html>
  );
}
