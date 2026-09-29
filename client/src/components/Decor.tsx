import clsx from "clsx";
import type { SpiceLevel } from "@/data/restaurant";
import { useLang } from "@/i18n";

/** Square red seal (印章) with a single brush character. */
export function Seal({ char, className }: { char: string; className?: string }) {
  return (
    <span aria-hidden className={clsx("seal", className ?? "h-7 w-7 text-lg")}>
      {char}
    </span>
  );
}

export function Logo({ light = true }: { light?: boolean }) {
  const { tl } = useLang();
  return (
    <span className="flex items-center gap-3">
      <span
        aria-hidden
        className="relative grid h-11 w-11 shrink-0 place-items-center rounded-[4px] bg-cinnabar shadow-red ring-1 ring-gold/50"
      >
        <span className="absolute inset-[3px] rounded-[2px] border border-gold-light/70" />
        <span className="font-brush text-[26px] leading-none text-gold-light">龙</span>
      </span>
      <span className="leading-none">
        <span
          className={clsx(
            "block font-zh text-[22px] font-bold tracking-[0.12em]",
            light ? "text-gold-light" : "text-cinnabar"
          )}
        >
          鑫龙饭店
        </span>
        <span
          className={clsx(
            "mt-1 block text-[9.5px] font-medium uppercase tracking-[0.2em]",
            light ? "text-gold/80" : "text-ink/60"
          )}
        >
          Chez Long · {tl({ fr: "Restaurant chinois", en: "Chinese restaurant" })}
        </span>
      </span>
    </span>
  );
}

/** Auspicious cloud motif (祥云). */
export function Cloud({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 160 70" fill="none" aria-hidden className={className}>
      <g stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
        <path d="M8 58h140" />
        <path d="M22 58c-10 0-13-14-3-17 2-13 20-14 24-3 5-12 26-11 27 4 3-6 12-7 16 0" />
        <path d="M43 38c-1-6 8-8 9-2 1 4-4 6-6 3" />
        <path d="M86 42c9-12 30-10 31 5 8-6 20 0 17 11" />
        <path d="M110 44c0-5 7-6 8-1 1 3-3 5-5 3" />
        <path d="M30 50c4-5 12-4 13 2" />
      </g>
    </svg>
  );
}

/** Ink-wash mountains (水墨山). */
export function Mountains({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 400 160" aria-hidden className={className} preserveAspectRatio="xMaxYMax meet">
      <defs>
        <linearGradient id="mtn-a" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="currentColor" stopOpacity="0.55" />
          <stop offset="1" stopColor="currentColor" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="mtn-b" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="currentColor" stopOpacity="0.3" />
          <stop offset="1" stopColor="currentColor" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path
        fill="url(#mtn-b)"
        d="M0 150 L40 110 L62 122 L110 60 L140 96 L168 80 L214 128 L250 92 L290 118 L330 70 L372 112 L400 96 V160 H0Z"
      />
      <path
        fill="url(#mtn-a)"
        d="M120 160 L170 104 L188 116 L232 52 L262 96 L284 84 L320 130 L352 100 L400 140 V160Z"
      />
      <path
        d="M226 60 l6 -8 l7 10 M326 76 l4 -6 l6 8"
        stroke="currentColor"
        strokeOpacity="0.4"
        strokeWidth="1.5"
        fill="none"
      />
    </svg>
  );
}

export function Chili({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={className}>
      <path
        fill="currentColor"
        d="M17.6 6.2c1.6.9 2.5 2.7 2.2 4.8-.6 4.6-5.5 9.6-13.4 10.9-1.3.2-1.8-1.3-.7-2 4.6-2.9 7.1-6.3 8.2-10.6.4-1.7 2-3.3 3.7-3.1z"
      />
      <path
        fill="none"
        stroke="#3f7d2c"
        strokeWidth="1.8"
        strokeLinecap="round"
        d="M16.2 6.4c.3-1.6 1.3-2.8 3-3.4"
      />
    </svg>
  );
}

export function SpiceMeter({ level, className }: { level: SpiceLevel; className?: string }) {
  const { t } = useLang();
  if (level === 0) return null;
  const label = t({ fr: `Piment ${level}/3`, en: `Spice ${level}/3`, zh: `辣度 ${level}/3` });
  return (
    <span className={clsx("inline-flex items-center gap-0.5", className)} role="img" aria-label={label}>
      {Array.from({ length: level }, (_, i) => (
        <Chili key={i} className="h-3.5 w-3.5 text-cinnabar-light" />
      ))}
    </span>
  );
}
