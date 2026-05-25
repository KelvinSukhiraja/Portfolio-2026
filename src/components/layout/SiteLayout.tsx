import type { ReactNode } from "react";

interface SiteLayoutProps {
  children: ReactNode;
}

export function SiteLayout({ children }: SiteLayoutProps) {
  return (
    <div className="min-h-screen bg-[#fafaf8] dark:bg-[#111110] text-[#0f0f0f] dark:text-[#f0efe8]">
      {children}
    </div>
  );
}
