import clsx from "clsx";
import { Seal } from "@/components/Decor";
import { Duo } from "@/components/Bilingual";

type SectionTitleProps = {
  zh: string;
  /** French or English counterpart shown next to the Chinese title. */
  latin: string;
  sub?: string;
  seal?: string;
  dark?: boolean;
  align?: "center" | "left";
  className?: string;
};

/** Bilingual heading: the selected language comes first and larger. */
export default function SectionTitle({
  zh,
  latin,
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
        <Duo
          zh={zh}
          latin={latin}
          primary={clsx("text-3xl font-bold sm:text-4xl", dark ? "text-paper" : "text-cinnabar")}
          secondary={clsx("text-2xl sm:text-3xl", dark ? "text-gold-light" : "text-cinnabar-dark")}
          zhClassName="font-zh tracking-[0.08em]"
          latinClassName="font-serif"
        />
        {seal && <Seal char={seal} className="h-7 w-7 self-center text-base" />}
      </h2>
      {sub && (
        <p className={clsx("mt-3 text-sm", dark ? "text-paper/70" : "text-ink/65")}>{sub}</p>
      )}
    </div>
  );
}
