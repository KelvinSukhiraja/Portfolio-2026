import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLayoutEffect, useRef, useState } from "react";
import { useTheme } from "../../context/ThemeContext";
import { prefersReducedMotion } from "../../utils/motion";

const FRAME_COUNT = 6;
const FRAME_SIZE = 32;
const DISPLAY_SCALE = 2;
const DISPLAY_SIZE = FRAME_SIZE * DISPLAY_SCALE;
const RUN_FPS = 6;

const FRAMES = Array.from(
  { length: FRAME_COUNT },
  (_, i) => `/Ghosty/sprite_${i}.png`,
);

const JOKES = [
  "Why do I love this portfolio? The scroll performance is hauntingly good.",
  "I'm not a bug.. Just a paranoid ghoul at 6 FPS.",
  "Boo..?",
  "Have you seen my skeleton?",
  "Available for work. Will haunt for free!",
  "Don't arrest me cause I talk in maths.",
  "Me or a job application?",
];

function scrollX(progress: number) {
  const startX = window.innerWidth;
  const endX = -DISPLAY_SIZE;
  return startX + (endX - startX) * progress;
}

function pickJoke() {
  return JOKES[Math.floor(Math.random() * JOKES.length)];
}

export function GhostyRunner() {
  const { theme } = useTheme();
  const runnerRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const [hovered, setHovered] = useState(false);
  const [joke, setJoke] = useState(JOKES[0]);
  const enabled = theme === "dark" && !prefersReducedMotion();

  useLayoutEffect(() => {
    if (!enabled) return;

    const el = runnerRef.current;
    const img = imgRef.current;
    if (!el || !img) return;

    const setX = gsap.quickSetter(el, "x", "px");
    const setScaleX = gsap.quickSetter(img, "scaleX");
    gsap.set(img, { transformOrigin: "center center" });

    let frameIndex = 0;
    let facing = 1;

    const setFrame = (index: number) => {
      const normalized = ((index % FRAME_COUNT) + FRAME_COUNT) % FRAME_COUNT;
      const frame = facing === -1 ? FRAME_COUNT - 1 - normalized : normalized;
      img.src = FRAMES[frame];
    };

    const updatePosition = (progress: number) => {
      setX(scrollX(progress));
    };

    const updateFacing = (direction: number) => {
      if (direction === 0) return;
      const nextFacing = direction === -1 ? -1 : 1;
      if (nextFacing === facing) return;
      facing = nextFacing;
      setScaleX(facing);
      setFrame(frameIndex);
    };

    gsap.set(el, { x: window.innerWidth });
    setFrame(0);

    let scrollTrigger: ScrollTrigger | undefined;

    const ctx = gsap.context(() => {
      scrollTrigger = ScrollTrigger.create({
        start: 0,
        end: "max",
        scrub: 0.35,
        onUpdate: (self) => {
          updatePosition(self.progress);
          updateFacing(self.direction);
        },
      });

      gsap.to(
        {},
        {
          duration: 1 / RUN_FPS,
          repeat: -1,
          onRepeat: () => {
            frameIndex += 1;
            setFrame(frameIndex);
          },
        },
      );
    }, el);

    const onResize = () => {
      ScrollTrigger.refresh();
      if (scrollTrigger) updatePosition(scrollTrigger.progress);
    };
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
      ctx.revert();
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div ref={runnerRef} className="fixed bottom-0 left-0 z-20 hidden md:block">
      <div
        className="relative w-16 cursor-pointer"
        onMouseEnter={() => {
          setJoke(pickJoke());
          setHovered(true);
        }}
        onMouseLeave={() => setHovered(false)}
        onFocus={() => {
          setJoke(pickJoke());
          setHovered(true);
        }}
        onBlur={() => setHovered(false)}
        tabIndex={0}
        role="button"
        aria-label="Ghosty — hover for a joke"
      >
        {hovered && (
          <div className="ghosty-thought" role="tooltip">
            <p>{joke}</p>
            <div className="ghosty-thought__tail" aria-hidden>
              <span />
              <span />
              {/* <span /> */}
            </div>
          </div>
        )}
        <img
          ref={imgRef}
          alt=""
          width={DISPLAY_SIZE}
          height={DISPLAY_SIZE}
          draggable={false}
          className="ghosty-runner block h-16 w-16 [image-rendering:pixelated]"
        />
      </div>
    </div>
  );
}
