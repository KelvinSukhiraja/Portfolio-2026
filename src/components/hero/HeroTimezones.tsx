import { useEffect, useState } from "react";
import {
  OWNER_TIMEZONE,
  OWNER_TIMEZONE_OFFSET,
} from "../../data/portfolioContent";
import {
  formatClockTime,
  getTimezoneCityName,
  getUtcOffsetLabel,
} from "../../utils/timezone";

type TimezoneRowProps = {
  time: string;
  offset: string;
  place: string;
  muted?: boolean;
};

function TimezoneRow({ time, offset, place, muted }: TimezoneRowProps) {
  return (
    <div
      className={`hero-timezone ${muted ? "opacity-70" : ""}`}
      aria-live="polite"
    >
      <p className="font-mono text-[1.125rem] sm:text-[1.25rem] leading-none tabular-nums tracking-tight text-[#0f0f0f] dark:text-[#f0efe8]">
        {time}
      </p>
      <p className="font-mono text-[10px] sm:text-[11px] tracking-[0.06em] text-[#6b6b6b] dark:text-[#9a9890] mt-1.5">
        <span className="text-[#0f0f0f] dark:text-[#f0efe8]">{offset}</span>
        <span className="mx-1.5 text-[#d4d3cb] dark:text-[#3d3c38]">·</span>
        {place}
      </p>
    </div>
  );
}

export function HeroTimezones() {
  const [now, setNow] = useState(() => new Date());
  const [visitorTimeZone, setVisitorTimeZone] = useState<string | null>(null);

  useEffect(() => {
    setVisitorTimeZone(Intl.DateTimeFormat().resolvedOptions().timeZone);
    const id = window.setInterval(() => setNow(new Date()), 1000);
    return () => window.clearInterval(id);
  }, []);

  const ownerTime = formatClockTime(now, OWNER_TIMEZONE);
  const visitorTz = visitorTimeZone ?? OWNER_TIMEZONE;
  const visitorTime = formatClockTime(now, visitorTz);
  const visitorOffset = getUtcOffsetLabel(visitorTz, now);
  const visitorCity = getTimezoneCityName(visitorTz);
  const sameTimezone = visitorTimeZone === OWNER_TIMEZONE;
  const showVisitor = visitorTimeZone !== null;

  return (
    <div className="hero-timezones w-full sm:w-auto sm:min-w-[7.5rem] md:min-w-[8.25rem] md:border-l md:border-[#e2e1da] md:dark:border-[#2a2927] md:pl-8 lg:pl-10 self-stretch flex flex-col justify-end gap-5 ">
      <TimezoneRow
        time={ownerTime}
        offset={OWNER_TIMEZONE_OFFSET}
        place="Jakarta"
      />
      {showVisitor && (
        <TimezoneRow
          time={visitorTime}
          offset={visitorOffset || "—"}
          place={sameTimezone ? "you" : visitorCity}
          muted={sameTimezone}
        />
      )}
    </div>
  );
}
