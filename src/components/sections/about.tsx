"use client";

import Image from "next/image";

import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { Badge } from "@/components/ui/badge";
import { site } from "@/content/site";
import { useI18n } from "@/lib/i18n";

export function About() {
  const { t, tx } = useI18n();
  const { about } = site;

  return (
    <section id="about" className="scroll-mt-16 pt-16 pb-24 sm:pt-20 sm:pb-32">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <SectionHeading title={tx(about.title)} />
        </Reveal>

        <div className="grid gap-14 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-20">
          <Reveal className="space-y-8 lg:self-center">
            <Image
              src="/me.jpg"
              alt={t.about.photoOf(tx(site.name))}
              width={600}
              height={600}
              sizes="(min-width: 640px) 224px, 192px"
              className="mx-auto size-48 rounded-full object-cover sm:size-56"
            />

            <dl className="mx-auto grid max-w-sm grid-cols-1 divide-y border-y text-sm">
              {about.facts.map((fact, i) => (
                <div key={i} className="flex justify-between gap-4 py-3">
                  <dt className="font-mono text-xs tracking-wider text-muted-foreground uppercase">
                    {tx(fact.label)}
                  </dt>
                  <dd className="text-right">{tx(fact.value)}</dd>
                </div>
              ))}
            </dl>
          </Reveal>

          <Reveal delay={120} className="space-y-12">
            <div className="space-y-6 text-lg leading-relaxed text-pretty text-muted-foreground">
              {about.paragraphs.map((paragraph, i) => (
                <p key={i}>{tx(paragraph)}</p>
              ))}
            </div>

            <div className="space-y-6">
              <h3 className="font-mono text-xs tracking-[0.2em] text-muted-foreground uppercase">
                {t.about.skills}
              </h3>
              <div className="grid gap-6 sm:grid-cols-3">
                {about.skills.map((group, i) => (
                  <div key={i}>
                    <p className="mb-3 font-medium">{tx(group.group)}</p>
                    <ul className="flex flex-wrap gap-2">
                      {group.items.map((skill) => (
                        <li key={skill}>
                          <Badge variant="secondary" className="h-6 px-2.5">
                            {skill}
                          </Badge>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
