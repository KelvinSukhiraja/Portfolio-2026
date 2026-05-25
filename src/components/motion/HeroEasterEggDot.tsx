type HeroEasterEggDotProps = {
  active: boolean;
  onToggle: () => void;
};

export function HeroEasterEggDot({ active, onToggle }: HeroEasterEggDotProps) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className={`hero-easter-egg-dot group absolute z-20 hidden sm:flex items-center justify-center rounded-full border-0 bg-transparent p-3 transition-[transform] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0f0f0f] ${
        active ? "scale-110" : "hover:scale-110"
      }`}
      style={{ top: "18%", right: "max(1rem, env(safe-area-inset-right, 0px))" }}
      aria-label={active ? "Hide skeleton" : "?"}
      title=""
    >
      <span
        className={`block rounded-full transition-[transform,background-color,box-shadow] duration-300 ${
          active
            ? "h-2.5 w-2.5 bg-[#0f0f0f] shadow-[0_0_0_3px_rgba(15,15,15,0.12)]"
            : "h-2 w-2 bg-[#6b6b6b]/75 shadow-[0_0_0_2px_rgba(107,107,107,0.2)] group-hover:bg-[#0f0f0f]/85"
        }`}
      />
    </button>
  );
}
