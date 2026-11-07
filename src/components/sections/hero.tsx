"use client";

import { ArrowDownIcon, ArrowRightIcon } from "lucide-react";

import { GradientBackdrop } from "@/components/gradient-backdrop";
import { Button } from "@/components/ui/button";
import { site } from "@/content/site";
import { useI18n } from "@/lib/i18n";

export function Hero() {
  const { t, tx } = useI18n();

  return (
    <section
      id="home"
      className="relative isolate flex min-h-svh flex-col overflow-hidden text-white"
    >
      <GradientBackdrop />

      <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col px-6 pt-32 pb-16 sm:pt-40">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between">
          <h1 className="max-w-3xl text-5xl leading-[1.05] font-medium tracking-tight text-balance sm:text-6xl lg:text-7xl">
            {t.hero.greeting} <span className="text-brand-light">{site.name}.</span>
            <span className="mt-2 block text-white/65">{tx(site.role)}.</span>
          </h1>

          <div className="flex flex-wrap gap-3 lg:flex-col lg:items-end lg:pt-3">
            <Button
              asChild
              size="lg"
              className="h-11 bg-white px-5 text-base text-neutral-900 hover:bg-white/85"
            >
              <a href="#work">
                {t.hero.viewWork}
                <ArrowDownIcon data-icon="inline-end" />
              </a>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="h-11 border-white/40 bg-white/5 px-5 text-base text-white backdrop-blur hover:bg-white/15 hover:text-white dark:border-white/40 dark:bg-white/5 dark:hover:bg-white/15"
            >
              <a href="#contact">
                {t.hero.getInTouch}
                <ArrowRightIcon data-icon="inline-end" />
              </a>
            </Button>
          </div>
        </div>
      </div>

      <a
        href="#about"
        aria-label={t.hero.scrollToAbout}
        className="absolute bottom-5 left-1/2 hidden -translate-x-1/2 rounded-full p-2 text-white/70 transition-colors hover:text-white sm:block"
      >
        <ArrowDownIcon className="size-5 motion-safe:animate-bounce" />
      </a>
    </section>
  );
}
