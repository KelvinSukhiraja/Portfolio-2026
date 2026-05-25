interface KSMonogramProps {
  size?: number;
}

const VIEWBOX_HEIGHT = 44;
const VIEWBOX_WIDTH = 220;

export function KSMonogram({ size = 44 }: KSMonogramProps) {
  const scale = size / VIEWBOX_HEIGHT;
  const width = Math.round(VIEWBOX_WIDTH * scale);

  return (
    <svg
      width={width}
      height={size}
      viewBox={`0 0 ${VIEWBOX_WIDTH} ${VIEWBOX_HEIGHT}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="text-[#0f0f0f] dark:text-[#f0efe8]"
      aria-hidden
    >
      <rect width="44" height="44" rx="10" fill="#f0efe8" />
      <text
        x="8"
        y="36"
        textAnchor="start"
        dominantBaseline="alphabetic"
        fontFamily="'DM Serif Display', Georgia, serif"
        fontSize="22"
        fontStyle="italic"
        fill="#0f0f0f"
        letterSpacing="-1"
      >
        ks
      </text>
      <line
        x1="8"
        y1="40"
        x2="36"
        y2="40"
        stroke="#0f0f0f"
        strokeWidth="0.75"
        opacity="0.3"
      />
      <text
        x="56"
        y="28"
        textAnchor="start"
        dominantBaseline="alphabetic"
        fontFamily="'Outfit', sans-serif"
        fontSize="14"
        fontWeight="300"
        fill="currentColor"
        letterSpacing="0.6"
      >
        Kelvin Sukhiraja
      </text>
      <text
        x="56"
        y="39"
        textAnchor="start"
        dominantBaseline="alphabetic"
        fontFamily="'Outfit', sans-serif"
        fontSize="8"
        fontWeight="300"
        fill="#666"
        letterSpacing="2.5"
      >
        FRONT-END DEV
      </text>
    </svg>
  );
}
