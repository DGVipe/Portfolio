"use client";

import { MailIcon, MapPinIcon } from "lucide-react";

import { ContactForm } from "@/components/contact-form";
import { CopyEmailButton } from "@/components/copy-email-button";
import { SocialIcon } from "@/components/icons";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { site } from "@/content/site";
import { useI18n } from "@/lib/i18n";

export function Contact() {
  const { t, tx } = useI18n();
  const socials = site.socials.filter((s) => s.icon !== "mail");

  return (
    <section id="contact" className="scroll-mt-16 py-24 sm:py-32">
      <div className="mx-auto grid max-w-6xl gap-14 px-6 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-20">
        <Reveal>
          <SectionHeading
            title={tx(site.contact.title)}
            description={tx(site.contact.blurb)}
            className="mb-10"
          />

          <ul className="space-y-4">
            <li className="flex items-center gap-3">
              <span className="flex size-10 items-center justify-center rounded-full bg-muted">
                <MailIcon className="size-4" aria-hidden="true" />
              </span>
              <a
                href={`mailto:${site.email}`}
                className="font-medium underline-offset-4 hover:text-brand hover:underline"
              >
                {site.email}
              </a>
              <CopyEmailButton email={site.email} />
            </li>
            <li className="flex items-center gap-3">
              <span className="flex size-10 items-center justify-center rounded-full bg-muted">
                <MapPinIcon className="size-4" aria-hidden="true" />
              </span>
              <span>{tx(site.location)}</span>
            </li>
          </ul>

          <ul className="mt-8 flex gap-3">
            {socials.map((social) => (
              <li key={social.label}>
                <a
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex size-10 items-center justify-center rounded-full border transition-colors hover:border-brand hover:text-brand"
                >
                  <SocialIcon icon={social.icon} className="size-4" />
                  <span className="sr-only">
                    {social.label} {t.work.opensInNewTab}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={120}>
          <div className="rounded-2xl border bg-card p-6 shadow-sm sm:p-8">
            <ContactForm />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
