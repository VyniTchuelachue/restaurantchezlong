import Reveal from "@/components/Reveal";
import SectionTitle from "@/components/SectionTitle";
import { Chili, SpiceMeter } from "@/components/Decor";
import { signatures } from "@/data/restaurant";
import { useLang } from "@/i18n";

export default function Signatures() {
  const { t } = useLang();

  return (
    <section className="relative overflow-hidden ink-texture py-20 sm:py-24">
      <Chili className="pointer-events-none absolute -left-6 top-16 hidden h-28 w-28 -rotate-12 text-cinnabar/40 md:block" />
      <Chili className="pointer-events-none absolute -right-4 bottom-10 hidden h-24 w-24 rotate-[160deg] text-cinnabar/35 md:block" />

      <div className="container relative">
        <SectionTitle
          dark
          zh="招牌菜"
          fr="Nos spécialités"
          seal="湘"
          sub={t({
            fr: "Des plats signature aux saveurs du Hunan",
            zh: "精选湘菜经典 · 招牌风味",
          })}
        />

        <div className="mt-12 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
          {signatures.map((dish, i) => (
            <Reveal
              key={dish.zh}
              delay={i * 90}
              as="article"
              className="group overflow-hidden rounded-lg border border-gold/25 bg-ink-soft shadow-card transition-colors hover:border-gold/60"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={dish.img}
                  alt={dish.fr}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                {dish.origin && (
                  <span className="absolute left-2 top-2 rounded-sm bg-cinnabar/90 px-2 py-0.5 font-zh text-[11px] text-paper">
                    {t(dish.origin)}
                  </span>
                )}
              </div>
              <div className="px-3 py-4 text-center">
                <h3 lang="zh" className="font-zh text-lg font-bold tracking-wider text-paper sm:text-xl">
                  {dish.zh}
                </h3>
                <p className="mt-1 text-[13px] leading-snug text-paper/75">{dish.fr}</p>
                <SpiceMeter level={dish.spice} className="mt-2 justify-center" />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
