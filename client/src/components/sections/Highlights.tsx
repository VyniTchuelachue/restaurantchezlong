import { MapPin, Soup, Users } from "lucide-react";
import Reveal from "@/components/Reveal";
import { restaurant } from "@/data/restaurant";
import { useLang } from "@/i18n";

export default function Highlights() {
  const { t, tl } = useLang();

  const items = [
    {
      icon: Soup,
      zh: "正宗湘菜",
      latin: tl({ fr: "Cuisine du Hunan authentique", en: "Authentic Hunan cuisine" }),
      desc: t({
        fr: "Des saveurs authentiques et des ingrédients frais",
        en: "Authentic flavors and fresh ingredients",
        zh: "地道风味 · 新鲜食材",
      }),
    },
    {
      icon: Users,
      zh: "适合家庭与商务聚餐",
      latin: tl({ fr: "Famille & repas d'affaires", en: "Family & business dining" }),
      desc: t({
        fr: "Repas en famille, entre amis ou professionnels",
        en: "Meals with family, friends or colleagues",
        zh: "家庭聚会 · 朋友聚餐 · 公司宴请",
      }),
    },
    {
      icon: MapPin,
      zh: "杜阿拉",
      latin: tl(restaurant.city),
      desc: t({
        fr: `Plus code ${restaurant.plusCode} — voir l'itinéraire`,
        en: `Plus code ${restaurant.plusCode} — get directions`,
        zh: `位置代码 ${restaurant.plusCode} · 查看路线`,
      }),
      href: restaurant.mapsUrl,
    },
  ];

  return (
    <section
      className="relative border-b border-paper-line bg-paper-dark/60"
      aria-label={t({ fr: "Nos atouts", en: "Why choose us", zh: "我们的特色" })}
    >
      <div className="container grid gap-px py-2 sm:grid-cols-3">
        {items.map((item, i) => {
          const Icon = item.icon;
          const body = (
            <>
              <span className="grid h-14 w-14 shrink-0 place-items-center rounded-full border border-gold/50 bg-paper text-cinnabar shadow-sm">
                <Icon className="h-6 w-6" strokeWidth={1.6} aria-hidden />
              </span>
              <span>
                <span className="block font-zh text-lg font-bold text-ink">{item.zh}</span>
                <span className="block text-[13px] font-semibold text-cinnabar-dark">{item.latin}</span>
                <span className="mt-1.5 block text-xs leading-relaxed text-ink/60">{item.desc}</span>
              </span>
            </>
          );
          return (
            <Reveal
              key={item.zh}
              delay={i * 100}
              className="flex items-center border-paper-line py-5 sm:justify-center sm:border-l sm:px-4 sm:first:border-l-0"
            >
              {item.href ? (
                <a href={item.href} target="_blank" rel="noreferrer" className="flex items-center gap-4 hover:opacity-80">
                  {body}
                </a>
              ) : (
                <div className="flex items-center gap-4">{body}</div>
              )}
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
