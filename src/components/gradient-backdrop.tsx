/** Animated brand gradient with film grain. Place inside a `relative isolate` parent. */
export function GradientBackdrop() {
  return (
    <div aria-hidden="true" className="grain absolute inset-0 -z-10 overflow-hidden">
      <div className="brand-gradient absolute inset-[-10%] motion-safe:animate-drift" />
    </div>
  );
}
