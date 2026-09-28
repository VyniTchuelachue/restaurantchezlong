import { ArrowRight, Cake, Briefcase, Users, DoorClosed } from "lucide-react";
import Reveal from "@/components/Reveal";
import { images } from "@/data/restaurant";
import { useLang } from "@/i18n";
import { useReservation } from "@/reservation";

export default function Groups() {
  const { t, lang } = useLang();
  const { openReservation } = useReservation();

  const occasions = [
    { icon: Users, text: { fr: "Repas de famille", zh: "家庭聚会" } },
    { icon: Cake, text: { fr: "Anniversaires", zh: "生日庆祝" } },
    { icon: Briefcase, text: { fr: "Dîners d'entreprise", zh: "公司宴请" } },
  ];

  return (
    <section id="salons" className="relative bg-cinnabar-deep">
      <div className="grid lg:grid-cols-[1.15fr_1fr]">
        <Reveal className="relative min-h-[300px] sm:min-h-[400px] lg:min-h-[480px]">
          <img
            src={images.banquet}
            alt="Grande table ronde dressée pour un banquet"
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-cinnabar-deep/60 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:via-transparent lg:to-cinnabar-deep/80" />
        </Reveal>

        <div className="relative overflow-hidden bg-gradient-to-br from-cinnabar to-cinnabar-deep">
          <div aria-hidden className="lattice absolute inset-0" />
          <div
            aria-hidden
            className="absolute -right-10 -top-10 font-brush text-[220px] leading-none text-paper/[0.06]"
          >
            宴
          </div>
          <Reveal className="relative px-4 py-14 sm:px-10 lg:px-12 xl:px-16">
            <h2>
              <span lang="zh" className="block font-zh text-3xl font-bold tracking-wider text-paper sm:text-[2.2rem]">
                聚餐与包间
              </span>
              <span className="mt-2 block font-serif text-2xl text-gold-light">
                Repas de groupe & salons privés
              </span>
            </h2>

            <p className="mt-6 max-w-md text-[15px] leading-relaxed text-paper/85">
              {t({
                fr: "Grandes tables rondes à partager et salons privés : idéal pour les repas en famille, les anniversaires, les dîners d'entreprise et plus encore.",
                zh: "圆桌合菜与私密包间，适合家庭聚会、生日庆祝、公司宴请等多种场合。",
              })}
            </p>

            <ul className="mt-6 flex flex-wrap gap-2.5">
              {occasions.map(({ icon: Icon, text }) => (
                <li
                  key={text.fr}
                  className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-ink/20 px-3.5 py-1.5 text-sm text-paper"
                >
                  <Icon className="h-4 w-4 text-gold-light" aria-hidden />
                  <span className={lang === "zh" ? "font-zh" : undefined}>{t(text)}</span>
                </li>
              ))}
            </ul>

            <button type="button" onClick={() => openReservation("salon")} className="btn-ghost mt-9 border-gold bg-ink/25">
              <DoorClosed className="h-6 w-6 text-gold-light" aria-hidden />
              <span>
                <span className="btn-label-zh">预订包间</span>
                <span className="btn-label-fr inline-flex items-center gap-1">
                  Réserver un salon privé <ArrowRight className="h-3 w-3" aria-hidden />
                </span>
              </span>
            </button>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
