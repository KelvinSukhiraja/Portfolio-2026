import type { HeroStat } from "../../types/portfolio";

type HeroFocusAreasProps = {
  items: HeroStat[];
};

export function HeroFocusAreas({ items }: HeroFocusAreasProps) {
  return (
    <ul className="hero-focus-list flex flex-col gap-5 sm:flex-row sm:flex-wrap sm:gap-x-10 sm:gap-y-5 md:gap-x-12 list-none m-0 p-0">
      {items.map(({ value, label }) => (
        <li key={label} className="hero-focus min-w-[9.5rem]">
          <p className="text-[15px] sm:text-[16px] font-medium tracking-tight text-[#0f0f0f] dark:text-[#f0efe8] leading-snug">
            {value}
          </p>
          <p className="font-mono text-[10px] sm:text-[11px] tracking-[0.08em] uppercase text-[#6b6b6b] dark:text-[#9a9890] mt-1">
            {label}
          </p>
        </li>
      ))}
    </ul>
  );
}
