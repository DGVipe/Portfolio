"use client";

import { ArrowUpRightIcon } from "lucide-react";

import { GitHubIcon } from "@/components/icons";
import { ProjectCover } from "@/components/project-cover";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { Badge } from "@/components/ui/badge";
import { site, type Project } from "@/content/site";
import { useI18n } from "@/lib/i18n";
import { cn } from "@/lib/utils";

function ProjectLinks({ project }: { project: Project }) {
  const { t, tx } = useI18n();
  const { live, source } = project.links ?? {};
  const title = tx(project.title);
  if (!live && !source) return null;

  return (
    <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm">
      {live && (
        <a
          href={live}
          target="_blank"
          rel="noopener noreferrer"
          className="group/link inline-flex items-center gap-1 font-medium underline-offset-4 hover:text-brand hover:underline"
        >
          {t.work.viewProject}
          <ArrowUpRightIcon className="size-4 transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
          <span className="sr-only">
            : {title} {t.work.opensInNewTab}
          </span>
        </a>
      )}
      {source && (
        <a
          href={source}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
        >
          <GitHubIcon className="size-4" />
          {t.work.source}
          <span className="sr-only">{t.work.sourceFor(title)}</span>
        </a>
      )}
    </div>
  );
}

function CoverFrame({ project }: { project: Project }) {
  const href = project.links?.live ?? project.links?.source;
  const frame = "block overflow-hidden rounded-xl ring-1 ring-border";

  return href ? (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      tabIndex={-1}
      aria-hidden="true"
      className={frame}
    >
      <ProjectCover project={project} />
    </a>
  ) : (
    <div className={frame}>
      <ProjectCover project={project} />
    </div>
  );
}

/** Staggered two-column card: cover on top, title + summary left, outcome right. */
function FeaturedProject({ project }: { project: Project }) {
  const { tx } = useI18n();
  return (
    <article className="group">
      <CoverFrame project={project} />

      <div className="mt-6 grid gap-4 sm:grid-cols-2 sm:gap-8">
        <div>
          <p className="font-mono text-xs tracking-wider text-muted-foreground uppercase">
            {tx(project.category)}
          </p>
          <h3 className="mt-2 text-2xl font-medium tracking-tight">{tx(project.title)}</h3>
          <p className="mt-3 leading-relaxed text-pretty text-muted-foreground">
            {tx(project.summary)}
          </p>
        </div>
        <div className="flex flex-col gap-4 sm:pt-6">
          <p className="font-medium text-pretty text-foreground/85">{tx(project.outcome)}</p>
          <ul className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <li key={tag}>
                <Badge variant="outline">{tag}</Badge>
              </li>
            ))}
          </ul>
          <ProjectLinks project={project} />
        </div>
      </div>
    </article>
  );
}

export function Work() {
  const { t } = useI18n();
  return (
    <section id="work" className="scroll-mt-16 bg-muted/30 pt-16 pb-24 sm:pt-20 sm:pb-32">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <SectionHeading title={t.work.title} />
        </Reveal>

        <div className="grid gap-x-10 gap-y-20 md:grid-cols-2">
          {site.featuredProjects.map((project, i) => (
            // Offset every right-column card to create the staggered layout.
            <Reveal key={i} className={cn(i % 2 === 1 && "md:mt-32")}>
              <FeaturedProject project={project} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
