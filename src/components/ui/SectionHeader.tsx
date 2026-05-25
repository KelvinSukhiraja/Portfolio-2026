interface SectionHeaderProps {
  number: string;
  title: string;
}

export function SectionHeader({ number, title }: SectionHeaderProps) {
  return (
    <div className="flex items-baseline gap-4 mb-12">
      <span className="font-mono text-[11px] tracking-[0.1em] text-[#6b6b6b] dark:text-[#9a9890]">
        {number} /
      </span>
      <h2 className="font-serif text-[1.9rem] font-normal tracking-tight text-[#0f0f0f] dark:text-[#f0efe8]">
        {title}
      </h2>
    </div>
  );
}
