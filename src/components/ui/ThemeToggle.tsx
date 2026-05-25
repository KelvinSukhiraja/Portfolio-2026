import { useTheme } from "../../context/ThemeContext";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const isLight = theme === "light";

  return (
    <label className="flex cursor-pointer items-center gap-2.5 select-none">
      <span className="font-mono text-[11px] tracking-[0.04em] text-[#6b6b6b] dark:text-[#9a9890]">
        light
      </span>
      <button
        type="button"
        role="switch"
        aria-checked={isLight}
        aria-label={isLight ? "Switch to dark mode" : "Switch to light mode"}
        onClick={() => setTheme(isLight ? "dark" : "light")}
        className="
          p-0.5 text-[#6b6b6b] dark:text-[#9a9890]
          transition-colors duration-400 ease-[cubic-bezier(0.22,1,0.36,1)]
          hover:text-[#0f0f0f] dark:hover:text-[#f0efe8]
          focus-visible:outline-2 focus-visible:outline-offset-2
          focus-visible:outline-[#0f0f0f] dark:focus-visible:outline-[#f0efe8]
        "
      >
        <svg
          width="20"
          height="30"
          viewBox="0 0 20 30"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.25"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden
        >
          {/* wall plate */}
          <rect x="1" y="1" width="18" height="28" rx="2" />
          {/* rocker paddle — up when light is on */}
          <g
            className={`
              origin-[10px_15px]
              transition-transform duration-400 ease-[cubic-bezier(0.22,1,0.36,1)]
              ${isLight ? "-rotate-[18deg]" : "rotate-[18deg]"}
            `}
          >
            <rect x="5.5" y="9" width="9" height="12" rx="1" />
          </g>
        </svg>
      </button>
    </label>
  );
}
