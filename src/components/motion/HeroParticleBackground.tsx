import gsap from "gsap";
import { useLayoutEffect, useRef } from "react";
import { prefersReducedMotion } from "../../utils/motion";

interface Particle {
  x: number;
  y: number;
  homeX: number;
  homeY: number;
  radius: number;
  alpha: number;
}

const CURSOR_RADIUS = 130;
const CURSOR_STRENGTH = 14;
const SPRING = 0.1;

function particleColor(): string {
  return document.documentElement.classList.contains("dark")
    ? "rgba(255, 255, 255, 0.7)"
    : "rgba(255, 255, 255, 0.85)";
}

function createParticles(
  width: number,
  height: number,
  count: number,
): Particle[] {
  return Array.from({ length: count }, () => {
    const x = gsap.utils.random(0, width);
    const y = gsap.utils.random(0, height);
    return {
      x,
      y,
      homeX: x,
      homeY: y,
      radius: gsap.utils.random(0.5, 1.8),
      alpha: gsap.utils.random(0.25, 0.65),
    };
  });
}

function drawParticles(
  ctx: CanvasRenderingContext2D,
  particles: Particle[],
  width: number,
  height: number,
) {
  ctx.clearRect(0, 0, width, height);
  ctx.fillStyle = particleColor();

  for (const p of particles) {
    ctx.globalAlpha = p.alpha;
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
    ctx.fill();
  }

  ctx.globalAlpha = 1;
}

interface HeroParticleBackgroundProps {
  className?: string;
}

export function HeroParticleBackground({
  className = "",
}: HeroParticleBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useLayoutEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const ctx2d = canvas.getContext("2d");
    if (!ctx2d) return;

    const reducedMotion = prefersReducedMotion();
    const mobile = window.matchMedia("(max-width: 640px)").matches;
    const finePointer = window.matchMedia(
      "(hover: hover) and (pointer: fine)",
    ).matches;
    const count = mobile ? 90 : 160;
    const interactionTarget = container.parentElement;

    let particles: Particle[] = [];
    let width = 0;
    let height = 0;
    let tweens: gsap.core.Tween[] = [];
    let cursorX = -9999;
    let cursorY = -9999;
    let cursorActive = false;

    const killTweens = () => {
      tweens.forEach((tween) => tween.kill());
      tweens = [];
    };

    const syncSize = () => {
      width = container.clientWidth;
      height = container.clientHeight;
      if (width === 0 || height === 0) return false;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx2d.setTransform(dpr, 0, 0, dpr, 0, 0);
      return true;
    };

    const render = () => {
      if (width > 0 && height > 0) {
        drawParticles(ctx2d, particles, width, height);
      }
    };

    const updateFromCursor = () => {
      for (const p of particles) {
        let targetX = p.homeX;
        let targetY = p.homeY;

        if (cursorActive) {
          const dx = p.x - cursorX;
          const dy = p.y - cursorY;
          const dist = Math.hypot(dx, dy);

          if (dist < CURSOR_RADIUS && dist > 0.5) {
            const influence = 1 - dist / CURSOR_RADIUS;
            const push = influence * CURSOR_STRENGTH;
            targetX += (dx / dist) * push;
            targetY += (dy / dist) * push;
          }
        }

        targetX = gsap.utils.clamp(0, width, targetX);
        targetY = gsap.utils.clamp(0, height, targetY);

        p.x += (targetX - p.x) * SPRING;
        p.y += (targetY - p.y) * SPRING;
      }

      render();
    };

    const onPointerMove = (event: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      cursorX = event.clientX - rect.left;
      cursorY = event.clientY - rect.top;
      cursorActive = true;
    };

    const onPointerLeave = () => {
      cursorActive = false;
    };

    const startAnimations = () => {
      killTweens();
      if (reducedMotion || particles.length === 0) return;

      for (const p of particles) {
        const driftX =
          gsap.utils.random(30, 80) * (Math.random() > 0.5 ? 1 : -1);
        const driftY =
          gsap.utils.random(30, 80) * (Math.random() > 0.5 ? 1 : -1);

        tweens.push(
          gsap.fromTo(
            p,
            { homeX: p.homeX, homeY: p.homeY },
            {
              homeX: gsap.utils.clamp(0, width, p.homeX + driftX),
              homeY: gsap.utils.clamp(0, height, p.homeY + driftY),
              duration: gsap.utils.random(3.5, 7),
              repeat: -1,
              yoyo: true,
              ease: "sine.inOut",
            },
          ),
        );

        tweens.push(
          gsap.to(p, {
            alpha: gsap.utils.random(0.55, 1),
            duration: gsap.utils.random(1.8, 3.5),
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
          }),
        );
      }

      gsap.ticker.add(updateFromCursor);
    };

    const refresh = () => {
      if (!syncSize()) return;
      particles = createParticles(width, height, count);
      render();
      gsap.ticker.remove(updateFromCursor);
      startAnimations();
    };

    refresh();

    const resizeObserver = new ResizeObserver(refresh);
    resizeObserver.observe(container);

    if (!reducedMotion && finePointer && interactionTarget) {
      interactionTarget.addEventListener("pointermove", onPointerMove);
      interactionTarget.addEventListener("pointerleave", onPointerLeave);
    }

    const onThemeChange = () => render();
    const themeObserver = new MutationObserver(onThemeChange);
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => {
      themeObserver.disconnect();
      resizeObserver.disconnect();
      killTweens();
      gsap.ticker.remove(updateFromCursor);
      interactionTarget?.removeEventListener("pointermove", onPointerMove);
      interactionTarget?.removeEventListener("pointerleave", onPointerLeave);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`pointer-events-none absolute inset-0 z-0 ${className}`.trim()}
      aria-hidden
    >
      <canvas ref={canvasRef} className="block h-full w-full" />
    </div>
  );
}
