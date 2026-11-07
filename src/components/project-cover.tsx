"use client";

import Image from "next/image";

import type { Project } from "@/content/site";
import { useI18n } from "@/lib/i18n";

/**
 * Project thumbnail. Shows the real screenshot when `project.image` is set,
 * otherwise a gradient "browser window" placeholder.
 */
export function ProjectCover({ project }: { project: Project }) {
  const { t, tx } = useI18n();
  const [from, to] = project.palette;

  return (
    <div
      className="relative aspect-16/10 w-full overflow-hidden bg-muted"
      style={project.image ? undefined : { backgroundImage: `linear-gradient(135deg, ${from}, ${to})` }}
    >
      {project.image ? (
        <Image
          src={tx(project.image)}
          alt={t.work.screenshotOf(tx(project.title))}
          fill
          sizes="(min-width: 768px) 50vw, 100vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
        />
      ) : (
        <div
          aria-hidden="true"
          className="absolute inset-x-[8%] top-[12%] bottom-0 overflow-hidden rounded-t-lg bg-black/25 shadow-2xl ring-1 ring-white/15 backdrop-blur-sm transition-transform duration-700 ease-out group-hover:-translate-y-2"
        >
          <div className="flex items-center gap-1.5 border-b border-white/10 px-3 py-2">
            <span className="size-2 rounded-full bg-white/40" />
            <span className="size-2 rounded-full bg-white/30" />
            <span className="size-2 rounded-full bg-white/20" />
            <span className="ml-3 h-2 w-1/3 rounded-full bg-white/15" />
          </div>
          <div className="space-y-3 p-[6%]">
            <div className="h-3 w-1/2 rounded-full bg-white/50" />
            <div className="h-2 w-3/4 rounded-full bg-white/25" />
            <div className="h-2 w-2/3 rounded-full bg-white/25" />
            <div className="grid grid-cols-3 gap-2 pt-3">
              <div className="aspect-4/3 rounded-md bg-white/15" />
              <div className="aspect-4/3 rounded-md bg-white/15" />
              <div className="aspect-4/3 rounded-md bg-white/15" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
