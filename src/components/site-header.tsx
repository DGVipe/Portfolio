"use client";

import { MenuIcon, XIcon } from "lucide-react";
import { useEffect, useState } from "react";

import { SiteControls } from "@/components/site-controls";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { site } from "@/content/site";
import { useI18n } from "@/lib/i18n";
import { cn } from "@/lib/utils";

const sectionIds: string[] = [...site.nav];

function useScrolled(threshold = 24) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > threshold);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);
  return scrolled;
}

/** Tracks which section currently sits in the middle band of the viewport. */
function useActiveSection(ids: string[]) {
  const [active, setActive] = useState<string | null>(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    const hero = document.getElementById("home");
    const targets = [hero, ...ids.map((id) => document.getElementById(id))].filter(
      (el): el is HTMLElement => el !== null,
    );
    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [ids]);
  return active;
}

export function SiteHeader() {
  const scrolled = useScrolled();
  const active = useActiveSection(sectionIds);
  const { t, tx } = useI18n();
  const onHero = !scrolled;

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,color] duration-300",
        scrolled
          ? "border-b bg-background/80 text-foreground backdrop-blur-lg"
          : "border-b border-transparent text-white",
      )}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <a href="#home" className="text-lg font-medium tracking-tight">
          {site.name}
        </a>

        <nav aria-label={t.navLabels.main} className="hidden items-center gap-1 md:flex">
          {site.nav.map((id) => {
            const isActive = active === id;
            return (
              <a
                key={id}
                href={`#${id}`}
                aria-current={isActive ? "true" : undefined}
                className={cn(
                  "rounded-md px-3 py-1.5 text-sm transition-colors",
                  isActive
                    ? "text-brand"
                    : scrolled
                      ? "text-muted-foreground hover:text-foreground"
                      : "text-white/75 hover:text-white",
                )}
              >
                {t.nav[id]}
              </a>
            );
          })}
          <SiteControls onHero={onHero} className="ml-3" />
        </nav>

        <div className="flex items-center gap-2 md:hidden">
          <SiteControls onHero={onHero} />
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                aria-label={t.openMenu}
                className={cn("text-current", !scrolled && "hover:bg-white/10 hover:text-white")}
              >
                <MenuIcon />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" showCloseButton={false}>
              <SheetHeader>
                <SheetTitle>{site.name}</SheetTitle>
                <SheetDescription>{tx(site.role)}</SheetDescription>
              </SheetHeader>
              <nav aria-label={t.navLabels.mobile} className="flex flex-col px-4">
                {site.nav.map((id) => (
                  <SheetClose asChild key={id}>
                    <a
                      href={`#${id}`}
                      className="border-b py-4 text-2xl font-medium tracking-tight last:border-b-0"
                    >
                      {t.nav[id]}
                    </a>
                  </SheetClose>
                ))}
              </nav>
              <SheetClose asChild>
                <Button
                  variant="ghost"
                  size="icon-sm"
                  aria-label={t.closeMenu}
                  className="absolute top-3 right-3"
                >
                  <XIcon />
                </Button>
              </SheetClose>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}

export function SkipLink() {
  const { t } = useI18n();
  return (
    <a
      href="#main"
      className="sr-only z-60 rounded-md bg-background px-4 py-2 focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
    >
      {t.skipToContent}
    </a>
  );
}
