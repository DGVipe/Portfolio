"use client";

import { ArrowUpIcon } from "lucide-react";

import { GradientBackdrop } from "@/components/gradient-backdrop";
import { SocialIcon } from "@/components/icons";
import { site } from "@/content/site";
import { useI18n } from "@/lib/i18n";

export function SiteFooter() {
  const { t, tx } = useI18n();

  return (
    <footer className="relative isolate overflow-hidden text-white">
      <GradientBackdrop />
      <div className="mx-auto flex max-w-6xl flex-col gap-12 px-6 pt-28 pb-12">
        <div className="flex flex-col justify-between gap-8 sm:flex-row sm:items-end">
          <div>
            <p className="text-3xl font-medium tracking-tight">{site.name}</p>
            <p className="mt-2 text-white/75">{tx(site.role)}</p>
          </div>
          <a
            href="#home"
            className="inline-flex items-center gap-2 self-start rounded-full border border-white/30 bg-white/5 px-4 py-2 text-sm backdrop-blur transition-colors hover:bg-white/15 sm:self-auto"
          >
            {t.footer.backToTop}
            <ArrowUpIcon className="size-4" aria-hidden="true" />
          </a>
        </div>

        <div className="flex flex-col gap-6 border-t border-white/20 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <nav
            aria-label={t.navLabels.footer}
            className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-white/75"
          >
            {site.nav.map((id) => (
              <a key={id} href={`#${id}`} className="transition-colors hover:text-white">
                {t.nav[id]}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-5">
            <ul className="flex gap-4">
              {site.socials.map((social) => (
                <li key={social.label}>
                  <a
                    href={social.href}
                    {...(social.icon !== "mail" && { target: "_blank", rel: "noopener noreferrer" })}
                    className="text-white/75 transition-colors hover:text-white"
                  >
                    <SocialIcon icon={social.icon} className="size-4" />
                    <span className="sr-only">{social.label}</span>
                  </a>
                </li>
              ))}
            </ul>
            {/* Rendered at request time (inside the locale Suspense boundary), so the year is current. */}
            <p className="text-sm text-white/75">
              © {new Date().getFullYear()} {site.name}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
