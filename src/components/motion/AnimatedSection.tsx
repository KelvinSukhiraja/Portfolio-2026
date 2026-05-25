import gsap from "gsap";
import {
  useLayoutEffect,
  useRef,
  type ComponentPropsWithoutRef,
  type ReactNode,
} from "react";
import {
  parseMotionVariant,
  prefersReducedMotion,
  revealFromVars,
} from "../../utils/motion";

type AnimatedSectionProps = Omit<
  ComponentPropsWithoutRef<"section">,
  "children"
> & {
  children: ReactNode;
};

export function AnimatedSection({
  children,
  ...sectionProps
}: AnimatedSectionProps) {
  const ref = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    if (prefersReducedMotion()) return;

    const section = ref.current;
    if (!section) return;

    const targets = section.querySelectorAll<HTMLElement>(
      "[data-motion-reveal]",
    );
    if (targets.length === 0) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 84%",
          toggleActions: "play none none none",
        },
      });

      targets.forEach((el, index) => {
        const variant = parseMotionVariant(el.dataset.motionVariant);
        tl.from(el, revealFromVars(variant, index), index * 0.08);
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} {...sectionProps}>
      {children}
    </section>
  );
}
