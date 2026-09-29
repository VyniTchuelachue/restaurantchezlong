import { UtensilsCrossed } from "lucide-react";
import Reveal from "@/components/Reveal";
import { BtnLabel, Duo } from "@/components/Bilingual";
import { Mountains, Seal } from "@/components/Decor";
import { images } from "@/data/restaurant";
import { useLang } from "@/i18n";

export default function About() {
  const { mode, latin, tl } = useLang();

  const zhText = (
    <p lang="zh" className="font-zh text-[15px] leading-8 text-ink/80">
      鑫龙饭店致力于为杜阿拉的华人朋友以及喜爱中国美食的当地食客，带来正宗的湘菜与地道的中式风味。
      我们选用新鲜食材，传承家乡的味道，让每一餐都充满温暖与归属感。
    </p>
  );
  const latinText = (
    <p lang={latin} className="text-[15px] leading-7 text-ink/75">
      {tl({
        fr: "鑫龙饭店 — Chez Long propose une cuisine chinoise authentique, spécialement des saveurs du Hunan, pour la communauté chinoise de Douala et pour tous ceux qui souhaitent découvrir la richesse de la gastronomie chinoise. Des ingrédients frais, des recettes traditionnelles et un accueil chaleureux, comme à la maison.",
        en: "鑫龙饭店 — Chez Long serves authentic Chinese cuisine, with a focus on the flavors of Hunan, for Douala's Chinese community and for everyone who wants to discover the richness of Chinese gastronomy. Fresh ingredients, traditional recipes and a warm welcome, just like home.",
      })}
    </p>
  );

  return (
    <section id="a-propos" className="relative overflow-hidden paper-texture">
      <div className="grid lg:grid-cols-2">
        <Reveal className="relative min-h-[320px] sm:min-h-[420px] lg:min-h-[560px]">
          <img
            src={images.chef}
            alt={tl({ fr: "Chef faisant sauter un wok dans les flammes", en: "Chef tossing a flaming wok" })}
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div aria-hidden className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-paper/10" />
        </Reveal>

        <div className="relative flex items-center">
          <Mountains className="pointer-events-none absolute bottom-0 right-0 w-[70%] max-w-lg text-ink/40" />
          <Reveal className="relative w-full px-4 py-14 sm:px-10 lg:px-14 xl:px-20">
            <div className="flex items-start justify-between gap-6">
              <h2>
                <Duo
                  zh="家乡的味道，来到杜阿拉"
                  latin={tl({ fr: "Une vraie table chinoise à Douala", en: "A true Chinese table in Douala" })}
                  primary="text-3xl font-bold leading-snug text-cinnabar sm:text-[2.2rem]"
                  secondary="mt-2 text-2xl text-cinnabar-dark sm:text-[1.7rem]"
                  zhClassName="block font-zh"
                  latinClassName="block font-serif"
                />
              </h2>
              <Seal char="湘" className="mt-1 h-10 w-10 shrink-0 text-2xl" />
            </div>

            <div className="mt-8 space-y-5">
              {mode === "zh" ? (
                <>
                  {zhText}
                  {latinText}
                </>
              ) : (
                <>
                  {latinText}
                  {zhText}
                </>
              )}
            </div>

            <a href="#menu" className="btn-red mt-9">
              <UtensilsCrossed className="h-5 w-5 text-gold-light" aria-hidden />
              <BtnLabel zh="了解菜单" latin={tl({ fr: "Découvrir la carte", en: "Discover the menu" })} arrow />
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
