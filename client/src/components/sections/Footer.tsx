import { MessageCircle, Phone, MapPin } from "lucide-react";
import { Logo } from "@/components/Decor";
import { LangSwitch, navItems } from "@/components/sections/Navbar";
import { restaurant } from "@/data/restaurant";
import { useLang } from "@/i18n";

export default function Footer() {
  const { t } = useLang();
  const year = new Date().getFullYear();

  const links = [
    { href: restaurant.phoneHref, icon: Phone, label: t({ fr: "Appeler", zh: "致电" }) },
    { href: `https://wa.me/${restaurant.whatsapp}`, icon: MessageCircle, label: "WhatsApp" },
    { href: restaurant.mapsUrl, icon: MapPin, label: "Google Maps" },
  ];

  return (
    <footer className="border-t border-gold/20 bg-[#0b0706] text-paper">
      <div className="container flex flex-col items-center gap-8 py-10 lg:flex-row lg:justify-between">
        <a href="#accueil" aria-label="鑫龙饭店 Chez Long">
          <Logo />
        </a>

        <nav aria-label={t({ fr: "Liens du pied de page", zh: "页脚导航" })}>
          <ul className="flex flex-wrap justify-center gap-x-6 gap-y-3">
            {navItems.map((item) => (
              <li key={item.id}>
                <a href={`#${item.id}`} className="block text-center text-paper/75 transition hover:text-gold-light">
                  <span className="block font-zh text-sm">{item.zh}</span>
                  <span className="block text-[11px] opacity-75">{item.fr}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-6">
          <LangSwitch />
          <div className="flex gap-2">
            {links.map(({ href, icon: Icon, label }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel="noreferrer"
                aria-label={label}
                className="grid h-9 w-9 place-items-center rounded-full border border-gold/30 text-gold-light transition hover:bg-gold hover:text-ink"
              >
                <Icon className="h-4 w-4" aria-hidden />
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-paper/10">
        <div className="container flex flex-col items-center justify-between gap-2 py-5 text-center text-xs text-paper/50 sm:flex-row">
          <p>
            © {year} 鑫龙饭店 Chez Long. {t({ fr: "Tous droits réservés.", zh: "版权所有。" })}
          </p>
          <p>
            {t(restaurant.city)} · {restaurant.phone}
          </p>
        </div>
      </div>
    </footer>
  );
}
