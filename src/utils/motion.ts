export function prefersReducedMotion(): boolean {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/** Editorial eases — smooth deceleration, never bouncy */
export const MOTION_EASE = {
  smooth: "power3.out",
  editorial: "expo.out",
  soft: "power2.out",
} as const;

export type MotionVariant =
  | "fade-up"
  | "fade-right"
  | "fade-left"
  | "rise-soft"
  | "reveal-panel"
  | "drift-in";

type RevealVars = {
  opacity: number;
  duration: number;
  ease: string;
  y?: number;
  x?: number;
  scale?: number;
  transformOrigin?: string;
};

const VARIANTS: MotionVariant[] = [
  "fade-up",
  "fade-right",
  "fade-left",
  "rise-soft",
  "reveal-panel",
  "drift-in",
];

export function parseMotionVariant(
  value: string | undefined,
): MotionVariant {
  if (value && VARIANTS.includes(value as MotionVariant)) {
    return value as MotionVariant;
  }
  return "fade-up";
}

export function revealFromVars(
  variant: MotionVariant,
  index = 0,
): RevealVars {
  const base: RevealVars = {
    opacity: 0,
    duration: 0.72,
    ease: MOTION_EASE.smooth,
  };

  switch (variant) {
    case "fade-right":
      return { ...base, x: -12, y: 10, ease: MOTION_EASE.editorial };
    case "fade-left":
      return { ...base, x: 12, y: 10, ease: MOTION_EASE.editorial };
    case "rise-soft":
      return {
        ...base,
        y: 22,
        duration: 0.88,
        ease: MOTION_EASE.editorial,
      };
    case "reveal-panel":
      return {
        ...base,
        y: 14,
        scale: 0.988,
        transformOrigin: "top center",
        duration: 0.92,
        ease: MOTION_EASE.smooth,
      };
    case "drift-in":
      return {
        ...base,
        y: 12,
        x: index % 2 === 0 ? -8 : 8,
        duration: 0.78,
        ease: MOTION_EASE.editorial,
      };
    case "fade-up":
    default:
      return { ...base, y: 16, ease: MOTION_EASE.soft };
  }
}
