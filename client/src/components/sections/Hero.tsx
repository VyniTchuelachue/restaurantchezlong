import { ArrowRight, CalendarDays, Star, UtensilsCrossed } from "lucide-react";
import { Cloud, Seal } from "@/components/Decor";
import { images, restaurant } from "@/data/restaurant";
import { useLang } from "@/i18n";
import { useReservation } from "@/reservation";

export default function Hero() {
  const { t, lang } = useLang();
  const { openReservation } = useReservation();
  const rating = lang === "fr" ? restaurant.googleRating.toFixed(1).replace(".", ",") : restaurant.googleRating.toFixed(1);

  return (
    <section id="accueil" className="relative isolate overflow-hidden bg-ink">
      <img
        src={images.hero}
        alt=""
        className="absolute inset-0 -z-20 h-full w-full animate-slowZoom object-cover object-[70%_center]"
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-gradient-to-r from-cinnabar-deep via-cinnabar-deep/85 to-ink/10 sm:via-cinnabar-deep/70 lg:to-transparent"
      />
      <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-t from-ink/70 via-transparent to-ink/30" />

      {/* Vertical calligraphy */}
      <div aria-hidden className="absolute left-5 top-1/2 hidden -translate-y-1/2 flex-col items-center gap-4 xl:flex">
        <span className="whitespace-nowrap font-brush text-[88px] leading-[0.95] text-cinnabar-light/80 [writing-mode:vertical-rl]">
          湘菜
        </span>
        <Seal char="鑫" className="h-9 w-9 text-xl ring-1 ring-gold/40" />
      </div>
      <Cloud className="pointer-events-none absolute -bottom-2 right-6 hidden w-56 text-gold/25 md:block" />

      <div className="container flex min-h-[min(calc(100svh-72px),780px)] items-center py-20 lg:min-h-[640px] xl:pl-28">
        <div className="max-w-2xl">
          <a
            href={restaurant.mapsUrl}
            target="_blank"
            rel="noreferrer"
            className="mb-6 inline-flex animate-fadeUp items-center gap-2 rounded-full border border-gold/40 bg-ink/50 px-3.5 py-1.5 text-xs text-paper/90 backdrop-blur transition hover:border-gold"
          >
            <Star className="h-3.5 w-3.5 fill-gold text-gold" aria-hidden />
            <span className="font-semibold text-gold-light">{rating}</span>
            <span>{t({ fr: "sur Google Maps", zh: "谷歌地图评分" })}</span>
          </a>

          <h1 className="animate-fadeUp [animation-delay:120ms]">
            <span lang="zh" className="block font-zh text-4xl font-bold leading-[1.25] tracking-wide text-paper sm:text-5xl lg:text-[3.6rem]">
              在杜阿拉，
              <br />
              品味真正的中国味道
            </span>
            <span className="mt-4 block font-serif text-2xl leading-snug text-gold-light sm:text-3xl lg:text-[2.1rem]">
              Le vrai goût de la Chine,
              <br />
              au cœur de Douala.
            </span>
          </h1>

          <p lang="zh" className="mt-6 animate-fadeUp font-zh text-lg tracking-[0.2em] text-gold [animation-delay:240ms] sm:text-xl">
            正宗湘菜 · 家庭聚餐 · 商务宴请
          </p>
          <p className="mt-3 max-w-md animate-fadeUp text-[15px] leading-relaxed text-paper/85 [animation-delay:300ms]">
            {t({
              fr: "Une cuisine chinoise authentique pour vos repas en famille, entre amis et d'affaires.",
              zh: "正宗中餐，适合家庭聚会、朋友小聚与商务宴请。",
            })}
          </p>

          <div className="mt-9 flex animate-fadeUp flex-wrap gap-4 [animation-delay:380ms]">
            <a href="#menu" className="btn-red">
              <UtensilsCrossed className="h-6 w-6 text-gold-light" aria-hidden />
              <span>
                <span className="btn-label-zh">查看菜单</span>
                <span className="btn-label-fr inline-flex items-center gap-1">
                  Voir le menu <ArrowRight className="h-3 w-3" aria-hidden />
                </span>
              </span>
            </a>
            <button type="button" onClick={() => openReservation()} className="btn-ghost">
              <CalendarDays className="h-6 w-6 text-gold-light" aria-hidden />
              <span>
                <span className="btn-label-zh">预订餐桌</span>
                <span className="btn-label-fr inline-flex items-center gap-1">
                  Réserver une table <ArrowRight className="h-3 w-3" aria-hidden />
                </span>
              </span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
