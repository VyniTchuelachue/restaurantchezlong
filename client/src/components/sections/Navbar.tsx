import { useEffect, useState } from "react";
import clsx from "clsx";
import { CalendarDays, Menu as MenuIcon, X } from "lucide-react";
import { Logo } from "@/components/Decor";
import { useLang } from "@/i18n";
import { useReservation } from "@/reservation";
import type { Lang } from "@/data/restaurant";

export const navItems = [
  { id: "accueil", zh: "首页", fr: "Accueil" },
  { id: "menu", zh: "菜单", fr: "Menu" },
  { id: "a-propos", zh: "关于我们", fr: "À propos" },
  { id: "salons", zh: "包间", fr: "Salons privés" },
  { id: "contact", zh: "联系我们", fr: "Contact" },
];

export function LangSwitch({ className }: { className?: string }) {
  const { lang, setLang } = useLang();
  const options: { value: Lang; label: string }[] = [
    { value: "zh", label: "中文" },
    { value: "fr", label: "Français" },
  ];
  return (
    <div className={clsx("flex items-center text-[13px]", className)} role="group" aria-label="Langue / 语言">
      {options.map((opt, i) => (
        <span key={opt.value} className="flex items-center">
          {i > 0 && <span className="mx-2 h-3 w-px bg-paper/30" aria-hidden />}
          <button
            type="button"
            onClick={() => setLang(opt.value)}
            aria-pressed={lang === opt.value}
            className={clsx(
              "transition-colors",
              opt.value === "zh" && "font-zh",
              lang === opt.value ? "font-semibold text-gold-light" : "text-paper/60 hover:text-paper"
            )}
          >
            {opt.label}
          </button>
        </span>
      ))}
    </div>
  );
}

export default function Navbar() {
  const { t } = useLang();
  const { openReservation } = useReservation();
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("accueil");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const sections = navItems
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => el !== null);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    sections.forEach((el) => observer.observe(el));

    return () => {
      window.removeEventListener("scroll", onScroll);
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  return (
    <header
      className={clsx(
        "sticky top-0 z-50 border-b transition-colors duration-300",
        scrolled ? "border-gold/25 bg-ink/95 backdrop-blur-md" : "border-gold/15 bg-ink"
      )}
    >
      <div className="container flex h-[72px] items-center justify-between gap-4">
        <a href="#accueil" aria-label="鑫龙饭店 Chez Long — Accueil" onClick={() => setOpen(false)}>
          <Logo />
        </a>

        <nav className="hidden lg:block" aria-label="Navigation principale">
          <ul className="flex items-center gap-1">
            {navItems.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  className={clsx(
                    "group relative block px-4 py-2 text-center transition-colors",
                    active === item.id ? "text-gold-light" : "text-paper/85 hover:text-gold-light"
                  )}
                >
                  <span className="block font-zh text-[14px] font-semibold tracking-wider">{item.zh}</span>
                  <span className="block text-[11px] text-current opacity-75">{item.fr}</span>
                  <span
                    className={clsx(
                      "absolute inset-x-4 -bottom-0.5 h-0.5 rounded-full bg-gold transition-transform duration-300",
                      active === item.id ? "scale-x-100" : "scale-x-0 group-hover:scale-x-50"
                    )}
                  />
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="hidden items-center gap-6 lg:flex">
          <LangSwitch />
          <button type="button" onClick={() => openReservation()} className="btn-red py-2 pl-4 pr-3">
            <span>
              <span className="btn-label-zh">预订</span>
              <span className="btn-label-fr">Réserver</span>
            </span>
            <CalendarDays className="h-5 w-5 text-gold-light" aria-hidden />
          </button>
        </div>

        <button
          type="button"
          className="grid h-11 w-11 place-items-center rounded-md border border-gold/40 text-gold-light lg:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={t({ fr: open ? "Fermer le menu" : "Ouvrir le menu", zh: open ? "关闭菜单" : "打开菜单" })}
        >
          {open ? <X className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div id="mobile-nav" className="fixed inset-x-0 bottom-0 top-[72px] z-40 overflow-y-auto ink-texture lg:hidden">
          <nav className="container py-6" aria-label="Navigation mobile">
            <ul className="divide-y divide-gold/15 border-y border-gold/15">
              {navItems.map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    onClick={() => setOpen(false)}
                    className="flex items-baseline justify-between py-4"
                  >
                    <span className="font-zh text-xl font-semibold text-paper">{item.zh}</span>
                    <span className="text-sm text-gold-light">{item.fr}</span>
                  </a>
                </li>
              ))}
            </ul>
            <LangSwitch className="mt-6 text-base" />
            <button
              type="button"
              onClick={() => {
                setOpen(false);
                openReservation();
              }}
              className="btn-red mt-6 w-full justify-center py-3"
            >
              <CalendarDays className="h-5 w-5 text-gold-light" aria-hidden />
              <span>
                <span className="btn-label-zh">预订餐桌</span>
                <span className="btn-label-fr">Réserver une table</span>
              </span>
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}
