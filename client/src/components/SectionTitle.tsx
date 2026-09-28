import clsx from "clsx";
import { Seal } from "@/components/Decor";

type SectionTitleProps = {
  zh: string;
  fr: string;
  sub?: string;
  seal?: string;
  dark?: boolean;
  align?: "center" | "left";
  className?: string;
};

/** Bilingual heading: Chinese title with its French counterpart alongside. */
export default function SectionTitle({
  zh,
  fr,
  sub,
  seal,
  dark = false,
  align = "center",
  className,
}: SectionTitleProps) {
  return (
    <div className={clsx(align === "center" ? "text-center" : "text-left", className)}>
      <h2
        className={clsx(
          "flex flex-wrap items-baseline gap-x-4 gap-y-1",
          align === "center" ? "justify-center" : "justify-start"
        )}
      >
        <span
          lang="zh"
          className={clsx(
            "font-zh text-3xl font-bold tracking-[0.08em] sm:text-4xl",
            dark ? "text-paper" : "text-cinnabar"
          )}
        >
          {zh}
        </span>
        <span className={clsx("font-serif text-2xl sm:text-3xl", dark ? "text-gold-light" : "text-cinnabar-dark")}>
          {fr}
        </span>
        {seal && <Seal char={seal} className="h-7 w-7 self-center text-base" />}
      </h2>
      {sub && (
        <p className={clsx("mt-3 text-sm", dark ? "text-paper/70" : "text-ink/65")}>{sub}</p>
      )}
    </div>
  );
}
