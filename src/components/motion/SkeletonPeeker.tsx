import gsap from "gsap";
import { useLayoutEffect, useRef } from "react";
import { MOTION_EASE, prefersReducedMotion } from "../../utils/motion";

type SkeletonPeekerProps = {
  visible: boolean;
};

function PixelSkeleton({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 40"
      width={64}
      height={80}
      className={`block [image-rendering:pixelated] ${className}`.trim()}
      aria-hidden
    >
      {/* skull */}
      <rect x="10" y="4" width="12" height="10" fill="currentColor" />
      <rect x="8" y="6" width="2" height="6" fill="currentColor" />
      <rect x="22" y="6" width="2" height="6" fill="currentColor" />
      <rect x="12" y="8" width="2" height="3" fill="#fafaf8" />
      <rect x="18" y="8" width="2" height="3" fill="#fafaf8" />
      <rect x="14" y="12" width="4" height="1" fill="#fafaf8" />
      {/* jaw / neck */}
      <rect x="13" y="14" width="6" height="2" fill="currentColor" />
      <rect x="14" y="16" width="4" height="2" fill="currentColor" />
      {/* ribs peeking */}
      <rect x="11" y="18" width="10" height="2" fill="currentColor" />
      <rect x="10" y="20" width="2" height="6" fill="currentColor" />
      <rect x="20" y="20" width="2" height="6" fill="currentColor" />
      <rect x="12" y="20" width="2" height="5" fill="currentColor" />
      <rect x="16" y="20" width="2" height="5" fill="currentColor" />
      <rect x="14" y="22" width="4" height="1" fill="#fafaf8" />
      <rect x="13" y="24" width="6" height="2" fill="currentColor" />
      {/* arm reaching in */}
      <rect x="6" y="18" width="4" height="2" fill="currentColor" />
      <rect x="4" y="20" width="2" height="4" fill="currentColor" />
      <rect x="2" y="22" width="2" height="2" fill="currentColor" />
    </svg>
  );
}

export function SkeletonPeeker({ visible }: SkeletonPeekerProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const figureRef = useRef<HTMLDivElement>(null);
  const idleTweenRef = useRef<gsap.core.Tween | null>(null);
  const wasVisibleRef = useRef(false);

  useLayoutEffect(() => {
    const root = rootRef.current;
    const figure = figureRef.current;
    if (!root || !figure) return;

    idleTweenRef.current?.kill();
    idleTweenRef.current = null;

    const origin = "50% 88%";
    gsap.set(figure, { transformOrigin: origin });

    if (prefersReducedMotion()) {
      gsap.set(root, { autoAlpha: visible ? 1 : 0, visibility: "visible" });
      gsap.set(figure, {
        xPercent: visible ? 52 : 108,
        rotation: visible ? -10 : 22,
      });
      wasVisibleRef.current = visible;
      return;
    }

    const ctx = gsap.context(() => {
      if (visible) {
        wasVisibleRef.current = true;
        gsap.set(root, { autoAlpha: 1, visibility: "visible" });
        gsap.fromTo(
          figure,
          { xPercent: 108, rotation: 22 },
          {
            xPercent: 52,
            rotation: -9,
            duration: 0.85,
            ease: MOTION_EASE.editorial,
            onComplete: () => {
              idleTweenRef.current = gsap.to(figure, {
                rotation: -14,
                duration: 1.4,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut",
              });
            },
          },
        );
      } else if (wasVisibleRef.current) {
        wasVisibleRef.current = false;
        gsap.to(figure, {
          xPercent: 108,
          rotation: 22,
          duration: 0.55,
          ease: MOTION_EASE.smooth,
          onComplete: () => {
            gsap.set(root, { autoAlpha: 0 });
          },
        });
      } else {
        gsap.set(root, { autoAlpha: 0, visibility: "hidden" });
        gsap.set(figure, { xPercent: 108, rotation: 22 });
      }
    }, root);

    return () => {
      idleTweenRef.current?.kill();
      ctx.revert();
    };
  }, [visible]);

  return (
    <div
      ref={rootRef}
      className="skeleton-peeker pointer-events-none fixed inset-y-0 right-0 z-30 w-[min(42vw,220px)]"
      style={{ visibility: "hidden" }}
      aria-hidden={!visible}
    >
      <div
        ref={figureRef}
        className="skeleton-peeker__figure absolute right-0 top-[38%] text-[#0f0f0f]"
        style={{ transformOrigin: "50% 88%" }}
      >
        <PixelSkeleton />
      </div>
    </div>
  );
}
