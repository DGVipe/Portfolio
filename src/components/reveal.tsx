"use client";

import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

/** Fades + lifts its children into view the first time they scroll on screen. */
export function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "0px 0px -8% 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      data-visible={visible}
      style={{ transitionDelay: `${delay}ms` }}
      className={cn(
        "transition-[opacity,translate] duration-700 ease-out motion-reduce:transition-none",
        "data-[visible=false]:translate-y-6 data-[visible=false]:opacity-0",
        "motion-reduce:data-[visible=false]:translate-y-0 motion-reduce:data-[visible=false]:opacity-100",
        className,
      )}
    >
      {children}
    </div>
  );
}
