import { cn } from "@/lib/utils";

export function SectionHeading({
  title,
  description,
  className,
}: {
  title: string;
  description?: string;
  className?: string;
}) {
  return (
    <div className={cn("mb-14 max-w-2xl", className)}>
      <h2 className="text-3xl font-medium tracking-tight text-balance sm:text-4xl">{title}</h2>
      {description && (
        <p className="mt-4 text-lg text-pretty text-muted-foreground">{description}</p>
      )}
    </div>
  );
}
