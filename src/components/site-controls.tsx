"use client";

import { DownloadIcon, MoonIcon, SunIcon } from "lucide-react";
import { useTheme } from "next-themes";
import { useSyncExternalStore } from "react";

import { site } from "@/content/site";
import { useI18n } from "@/lib/i18n";
import { cn } from "@/lib/utils";

/** `onHero`: the header is transparent over the dark hero gradient. */
type ControlProps = { onHero?: boolean; className?: string };

function SpainFlag() {
  return (
    <svg viewBox="0 0 24 24" className="size-full" aria-hidden="true">
      <rect width="24" height="24" fill="#c60b1e" />
      <rect y="6" width="24" height="12" fill="#ffc400" />
    </svg>
  );
}

function UsFlag() {
  return (
    <svg viewBox="0 0 24 24" className="size-full" aria-hidden="true">
      <rect width="24" height="24" fill="#fff" />
      {[0, 2, 4, 6, 8, 10, 12].map((i) => (
        <rect key={i} y={(i * 24) / 13} width="24" height={24 / 13} fill="#b22234" />
      ))}
      <rect width="11" height={(24 * 7) / 13} fill="#3c3b6e" />
    </svg>
  );
}

/** Pill toggle, same size as ThemeSwitch: the flag thumb slides (ES left, EN right) and the active code shows on the other side. */
export function LanguageToggle({ onHero, className }: ControlProps) {
  const { locale, t, setLocale } = useI18n();
  const isEs = locale === "es";
  const code = "absolute top-1/2 -translate-y-1/2 font-mono text-[9px] leading-none font-semibold";

  return (
    <button
      type="button"
      role="switch"
      aria-checked={isEs}
      onClick={() => setLocale(isEs ? "en" : "es")}
      aria-label={t.switchLanguage}
      title={t.switchLanguage}
      className={cn(
        "relative h-6 w-11 shrink-0 cursor-pointer rounded-full transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
        onHero ? "bg-white/25 text-white" : "bg-input text-foreground dark:bg-primary/30",
        className,
      )}
    >
      <span className={cn(code, "right-1.5", isEs ? "opacity-100" : "opacity-0")} aria-hidden="true">
        ES
      </span>
      <span className={cn(code, "left-1.5", isEs ? "opacity-0" : "opacity-100")} aria-hidden="true">
        EN
      </span>
      <span
        className={cn(
          "absolute top-0.5 left-0.5 size-5 overflow-hidden rounded-full shadow transition-transform duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)]",
          isEs ? "translate-x-0" : "translate-x-5",
        )}
        aria-hidden="true"
      >
        <span className={cn("absolute inset-0 transition-opacity duration-300", isEs ? "opacity-100" : "opacity-0")}>
          <SpainFlag />
        </span>
        <span className={cn("absolute inset-0 transition-opacity duration-300", isEs ? "opacity-0" : "opacity-100")}>
          <UsFlag />
        </span>
      </span>
    </button>
  );
}

/** On/off switch whose thumb shows a sun (light) or moon (dark). */
export function ThemeSwitch({ onHero, className }: ControlProps) {
  const { t } = useI18n();
  const { resolvedTheme, setTheme } = useTheme();
  // resolvedTheme is unknown on the server, so only expose it to the DOM after hydration.
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );

  return (
    <button
      type="button"
      role="switch"
      aria-checked={mounted && resolvedTheme === "dark"}
      aria-label={t.toggleTheme}
      title={t.toggleTheme}
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      className={cn(
        "group relative h-6 w-11 shrink-0 cursor-pointer rounded-full transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
        onHero ? "bg-white/25" : "bg-input dark:bg-primary/30",
        className,
      )}
    >
      <span className="absolute top-0.5 left-0.5 flex size-5 items-center justify-center rounded-full bg-background text-foreground shadow transition-transform duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-active:scale-90 dark:translate-x-5">
        {/* Both icons stay in the DOM and cross-fade/rotate via CSS, so SSR/hydration can't mismatch. */}
        <SunIcon className="absolute size-3.5 scale-100 rotate-0 opacity-100 transition-all duration-300 dark:scale-0 dark:-rotate-90 dark:opacity-0" />
        <MoonIcon className="absolute size-3.5 scale-0 rotate-90 opacity-0 transition-all duration-300 dark:scale-100 dark:rotate-0 dark:opacity-100" />
      </span>
    </button>
  );
}

/** Pill link, same height as the switches, that downloads the CV. */
export function CvDownload({ onHero, className }: ControlProps) {
  const { t, tx } = useI18n();

  return (
    <a
      href={tx(site.cv)}
      download
      aria-label={t.cv.download}
      title={t.cv.download}
      className={cn(
        "inline-flex h-6 shrink-0 items-center gap-1 rounded-full px-2.5 text-xs font-medium transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
        onHero
          ? "bg-white/25 text-white hover:bg-white/35"
          : "bg-input text-foreground hover:bg-input/70 dark:bg-primary/30 dark:hover:bg-primary/40",
        className,
      )}
    >
      <DownloadIcon className="size-3.5" aria-hidden="true" />
      {t.cv.label}
    </a>
  );
}

export function SiteControls({ onHero, className }: ControlProps) {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <CvDownload onHero={onHero} />
      <LanguageToggle onHero={onHero} />
      <ThemeSwitch onHero={onHero} />
    </div>
  );
}
