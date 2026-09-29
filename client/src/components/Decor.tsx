import type { SVGProps } from "react";
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

/** Official WhatsApp glyph (from Simple Icons, CC0), drawn in currentColor. */
export function WhatsAppIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
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
