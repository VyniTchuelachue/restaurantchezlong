import clsx from "clsx";
import { Flame, Leaf, Users } from "lucide-react";
import Reveal from "@/components/Reveal";
import { Duo } from "@/components/Bilingual";
import { Cloud } from "@/components/Decor";
import { starters, type StarterDish } from "@/data/restaurant";
import { useLang } from "@/i18n";

const tagStyle: Record<StarterDish["tag"]["tone"], { className: string; icon: typeof Flame }> = {
  mild: { className: "bg-cinnabar/10 text-cinnabar border-cinnabar/25", icon: Leaf },
  hot: { className: "bg-cinnabar text-paper border-cinnabar", icon: Flame },
  share: { className: "bg-gold/25 text-ink border-gold/50", icon: Users },
};

export default function Discover() {
  const { t, tl, mode, latin } = useLang();
  const zhHeading = "第一次品尝中国菜？从这些开始";
  const latinHeading = tl({
    fr: "Vous découvrez la cuisine chinoise ? Commencez ici.",
    en: "New to Chinese cuisine? Start here.",
  });
  const zhFirst = mode === "zh";

  return (
    <section className="relative overflow-hidden paper-texture py-20 sm:py-24">
      <Cloud className="pointer-events-none absolute left-4 top-8 w-40 text-gold/40" />
      <Cloud className="pointer-events-none absolute -right-6 bottom-6 w-52 -scale-x-100 text-gold/40" />

      <div className="container relative">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p lang={zhFirst ? latin : "zh"} className={clsx("text-lg text-cinnabar", zhFirst ? "font-serif" : "font-zh font-semibold")}>
            {zhFirst ? latinHeading : zhHeading}
          </p>
          <h2
            lang={zhFirst ? "zh" : latin}
            className={clsx("mt-2 text-3xl font-bold leading-tight text-cinnabar-dark sm:text-4xl", zhFirst ? "font-zh" : "font-serif")}
          >
            {zhFirst ? zhHeading : latinHeading}
          </h2>
          <p className="mt-4 text-sm text-ink/65">
            {t({
              fr: "Des plats savoureux et accessibles pour une première expérience.",
              en: "Tasty, approachable dishes for a first experience.",
              zh: "口味温和、容易接受，最适合第一次尝试中餐的朋友。",
            })}
          </p>
        </Reveal>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {starters.map((dish, i) => {
            const tag = tagStyle[dish.tag.tone];
            const TagIcon = tag.icon;
            return (
              <Reveal
                key={dish.zh}
                delay={i * 100}
                as="article"
                className="group overflow-hidden rounded-lg border border-paper-line bg-paper shadow-card"
              >
                <div className="aspect-[16/9] overflow-hidden">
                  <img
                    src={dish.img}
                    alt={tl(dish)}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="p-5">
                  <h3>
                    <Duo
                      zh={dish.zh}
                      latin={tl(dish)}
                      primary="text-xl font-bold text-ink"
                      secondary="text-sm font-semibold text-cinnabar-dark"
                      zhClassName="block font-zh"
                      latinClassName="block"
                    />
                  </h3>
                  <p className="mt-2 min-h-[2.8rem] text-[13px] leading-relaxed text-ink/65">{t(dish.desc)}</p>
                  <span
                    className={clsx(
                      "mt-4 inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold",
                      tag.className
                    )}
                  >
                    {t(dish.tag)}
                    <TagIcon className="h-3.5 w-3.5" aria-hidden />
                  </span>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
