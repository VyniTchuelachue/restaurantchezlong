import { ArrowRight, MapPin, MessageCircle, Navigation, Phone, Star } from "lucide-react";
import Reveal from "@/components/Reveal";
import { restaurant } from "@/data/restaurant";
import { formatRating, useLang } from "@/i18n";

export default function Contact() {
  const { t, tl, lang } = useLang();

  const rows = [
    {
      icon: MapPin,
      main: t(restaurant.city),
      sub: t({
        fr: `Plus code : ${restaurant.plusCode}`,
        en: `Plus code: ${restaurant.plusCode}`,
        zh: `位置代码：${restaurant.plusCode}`,
      }),
      href: restaurant.mapsUrl,
    },
    {
      icon: Phone,
      main: restaurant.phone,
      sub: t({ fr: "Réservations & informations", en: "Reservations & information", zh: "订座及咨询" }),
      href: restaurant.phoneHref,
    },
    {
      icon: MessageCircle,
      main: "WhatsApp",
      sub: t({ fr: "Écrivez-nous pour réserver", en: "Message us to book", zh: "发消息预订" }),
      href: `https://wa.me/${restaurant.whatsapp}`,
    },
    {
      icon: Star,
      main: `${formatRating(restaurant.googleRating, lang)} / 5`,
      sub: t({ fr: "Note des clients sur Google", en: "Customer rating on Google", zh: "谷歌顾客评分" }),
      href: restaurant.mapsUrl,
    },
  ];

  return (
    <section id="contact" className="relative bg-ink">
      <div className="grid lg:grid-cols-2">
        <div className="relative overflow-hidden ink-texture">
          <div
            aria-hidden
            className="pointer-events-none absolute right-4 top-1/2 hidden -translate-y-1/2 whitespace-nowrap font-brush text-[150px] leading-[0.95] text-paper/[0.05] [writing-mode:vertical-rl] sm:block"
          >
            湘菜
          </div>
          <Reveal className="relative px-4 py-16 sm:px-10 lg:px-14 xl:pl-[max(3.5rem,calc((100vw-1240px)/2+1.5rem))]">
            <h2 className="flex items-baseline gap-4">
              <span lang="zh" className="font-zh text-3xl font-bold tracking-wider text-paper sm:text-4xl">
                联系我们
              </span>
              <span className="font-serif text-2xl text-gold-light">Contact</span>
            </h2>

            <ul className="mt-8 space-y-5">
              {rows.map(({ icon: Icon, main, sub, href }) => (
                <li key={main}>
                  <a
                    href={href}
                    target={href.startsWith("http") ? "_blank" : undefined}
                    rel="noreferrer"
                    className="group flex items-center gap-4"
                  >
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-gold/40 bg-gold/10 text-gold-light transition group-hover:bg-gold group-hover:text-ink">
                      <Icon className="h-5 w-5" aria-hidden />
                    </span>
                    <span>
                      <span className="block font-semibold text-paper">{main}</span>
                      <span className="block text-xs text-paper/60">{sub}</span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>

            <div className="mt-10 flex flex-wrap gap-4">
              <a href={restaurant.directionsUrl} target="_blank" rel="noreferrer" className="btn-red">
                <Navigation className="h-5 w-5 text-gold-light" aria-hidden />
                <span>
                  <span className="btn-label-zh">获取路线</span>
                  <span className="btn-label-fr inline-flex items-center gap-1">
                    {tl({ fr: "Itinéraire", en: "Directions" })} <ArrowRight className="h-3 w-3" aria-hidden />
                  </span>
                </span>
              </a>
              <a href={restaurant.phoneHref} className="btn-ghost">
                <Phone className="h-5 w-5 text-gold-light" aria-hidden />
                <span>
                  <span className="btn-label-zh">电话预订</span>
                  <span className="btn-label-fr inline-flex items-center gap-1">
                    {tl({ fr: "Appeler", en: "Call us" })} <ArrowRight className="h-3 w-3" aria-hidden />
                  </span>
                </span>
              </a>
            </div>
          </Reveal>
        </div>

        <div className="relative min-h-[360px] bg-paper-dark lg:min-h-full">
          <iframe
            title={t({ fr: "Plan d'accès — 鑫龙饭店, Douala", en: "Map — 鑫龙饭店, Douala", zh: "鑫龙饭店位置地图" })}
            src={restaurant.mapEmbedUrl}
            className="absolute inset-0 h-full w-full border-0 grayscale-[35%] sepia-[15%]"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        </div>
      </div>
    </section>
  );
}
