import type { ReactNode } from "react";
import clsx from "clsx";
import { ArrowRight } from "lucide-react";
import { useLang } from "@/i18n";

type DuoProps = {
  zh: ReactNode;
  latin: ReactNode;
  /** Classes for whichever language is in front (the one selected with 中文 / Français·English). */
  primary?: string;
  /** Classes for the other language. */
  secondary?: string;
  /** Classes that always apply to the Chinese text (font, tracking…). */
  zhClassName?: string;
  /** Classes that always apply to the French/English text. */
  latinClassName?: string;
};

/** A Chinese + French/English pair. The language chosen with the 中文 or
 *  Français/English button comes first and gets the `primary` style. */
export function Duo({ zh, latin, primary, secondary, zhClassName, latinClassName }: DuoProps) {
  const { mode, latin: latinLang } = useLang();
  const zhFirst = mode === "zh";

  const zhNode = (
    <span key="zh" lang="zh" className={clsx(zhClassName, zhFirst ? primary : secondary)}>
      {zh}
    </span>
  );
  const latinNode = (
    <span key="latin" lang={latinLang} className={clsx(latinClassName, zhFirst ? secondary : primary)}>
      {latin}
    </span>
  );

  return <>{zhFirst ? [zhNode, latinNode] : [latinNode, zhNode]}</>;
}

/** Two-line button label: the selected language on top, the other below (with an optional arrow). */
export function BtnLabel({
  zh,
  latin,
  arrow = false,
  center = false,
}: {
  zh: string;
  latin: string;
  arrow?: boolean;
  center?: boolean;
}) {
  const { mode, latin: latinLang } = useLang();
  const zhFirst = mode === "zh";

  return (
    <span className={clsx("block", center && "text-center")}>
      <span
        lang={zhFirst ? "zh" : latinLang}
        className={clsx("block text-[15px] font-semibold leading-tight", zhFirst && "font-zh")}
      >
        {zhFirst ? zh : latin}
      </span>
      <span
        lang={zhFirst ? latinLang : "zh"}
        className={clsx(
          "mt-0.5 flex items-center gap-1 text-[12px] leading-tight text-gold-light",
          !zhFirst && "font-zh",
          center && "justify-center"
        )}
      >
        {zhFirst ? latin : zh}
        {arrow && <ArrowRight className="h-3 w-3" aria-hidden />}
      </span>
    </span>
  );
}
