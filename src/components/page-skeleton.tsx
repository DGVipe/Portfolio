import { GradientBackdrop } from "@/components/gradient-backdrop";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

/** A skeleton bar that sits on one line of text, sized in `em` so it scales with the font. */
function Line({
  width,
  className,
  wrapperClassName,
}: {
  width: string;
  className?: string;
  wrapperClassName?: string;
}) {
  return (
    <div className={cn("flex h-lh w-full items-center", wrapperClassName)}>
      <Skeleton className={className ?? "h-[0.7em] bg-white/15"} style={{ width }} />
    </div>
  );
}

/**
 * Static shell shown while the page streams in (the language comes from a
 * cookie, so the real page can't be prerendered). It mirrors the layout of
 * `SiteHeader` + `Hero` + the top of `About` and has no text, so nothing
 * shifts or flips language when the real content replaces it.
 *
 * Update it whenever the header or hero layout changes.
 */
export function PageSkeleton() {
  return (
    <div aria-busy="true" className="flex flex-1 flex-col">
      {/* Header (transparent, over the hero) */}
      <div className="fixed inset-x-0 top-0 z-50 border-b border-transparent">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
          <Skeleton className="h-5 w-28 bg-white/20" />
          <div className="flex items-center gap-2 md:gap-1">
            <div className="hidden items-center gap-1 md:flex">
              <Skeleton className="mx-3 h-4 w-11 bg-white/15" />
              <Skeleton className="mx-3 h-4 w-9 bg-white/15" />
              <Skeleton className="mx-3 h-4 w-13 bg-white/15" />
            </div>
            <div className="flex items-center gap-3 md:ml-3">
              <Skeleton className="h-6 w-14 rounded-full bg-white/25" />
              <Skeleton className="h-6 w-9 bg-white/20" />
              <Skeleton className="h-6 w-11 rounded-full bg-white/25" />
            </div>
            <Skeleton className="size-8 bg-white/15 md:hidden" />
          </div>
        </div>
      </div>

      {/* Hero */}
      <section className="relative isolate flex min-h-svh flex-col overflow-hidden">
        <GradientBackdrop />
        <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col px-6 pt-32 pb-16 sm:pt-40">
          <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between">
            <div className="w-full max-w-3xl text-5xl leading-[1.05] sm:text-6xl lg:text-7xl">
              {/* Phones: greeting / name and role each wrap onto two lines. */}
              <Line width="min(100%, 8.6em)" wrapperClassName="hidden sm:flex" />
              <Line width="3.6em" wrapperClassName="sm:hidden" />
              <Line width="5.2em" wrapperClassName="sm:hidden" />
              <div className="mt-2">
                <Line width="min(100%, 8.2em)" className="h-[0.7em] bg-white/10" wrapperClassName="hidden sm:flex" />
                <Line width="4.4em" className="h-[0.7em] bg-white/10" wrapperClassName="sm:hidden" />
                <Line width="4.8em" className="h-[0.7em] bg-white/10" wrapperClassName="sm:hidden" />
              </div>
            </div>
            <div className="flex flex-wrap gap-3 lg:flex-col lg:items-end lg:pt-3">
              <Skeleton className="h-11 w-40 rounded-lg bg-white/30" />
              <Skeleton className="h-11 w-36 rounded-lg bg-white/15" />
            </div>
          </div>
        </div>
      </section>

      {/* Top of About, in case the visitor scrolls before the content arrives */}
      <section className="pt-16 pb-24 sm:pt-20 sm:pb-32">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-14 space-y-4">
            <Skeleton className="h-3 w-16" />
            <Skeleton className="h-9 w-72 max-w-full" />
          </div>
          <div className="grid gap-14 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-20">
            <Skeleton className="aspect-4/5 w-full max-w-sm rounded-2xl" />
            <div className="space-y-3">
              <Skeleton className="h-5 w-full" />
              <Skeleton className="h-5 w-11/12" />
              <Skeleton className="h-5 w-full" />
              <Skeleton className="h-5 w-3/4" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
