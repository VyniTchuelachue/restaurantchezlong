import { useEffect, useState } from "react";
import clsx from "clsx";
import { CalendarDays, Menu as MenuIcon, X } from "lucide-react";
import { Logo } from "@/components/Decor";
import { useLang } from "@/i18n";
import { useReservation } from "@/reservation";

export const navItems = [
  { id: "accueil", zh: "首页", fr: "Accueil", en: "Home" },
  { id: "menu", zh: "菜单", fr: "Menu", en: "Menu" },
  { id: "a-propos", zh: "关于我们", fr: "À propos", en: "About" },
  { id: "salons", zh: "包间", fr: "Salons privés", en: "Private rooms" },
  { id: "contact", zh: "联系我们", fr: "Contact", en: "Contact" },
];

/** 中文 | Français [FR/EN] — the switch turns every French text into English. */
export function LangSwitch({ className }: { className?: string }) {
  const { mode, latin, setMode, setLatin } = useLang();
  const option = (active: boolean) =>
    clsx("transition-colors", active ? "font-semibold text-gold-light" : "text-paper/60 hover:text-paper");

  return (
    <div className={clsx("flex items-center text-[13px]", className)} role="group" aria-label="Langue / Language / 语言">
      <button type="button" onClick={() => setMode("zh")} aria-pressed={mode === "zh"} className={clsx("font-zh", option(mode === "zh"))}>
        中文
      </button>
      <span className="mx-2 h-3 w-px bg-paper/30" aria-hidden />
      <button type="button" onClick={() => setMode("latin")} aria-pressed={mode === "latin"} className={option(mode === "latin")}>
        {latin === "fr" ? "Français" : "English"}
      </button>
      <button
        type="button"
        role="switch"
        aria-checked={latin === "en"}
        aria-label="English"
        title="Français / English"
        onClick={() => setLatin(latin === "fr" ? "en" : "fr")}
        className="relative ml-2.5 grid h-6 w-[54px] shrink-0 grid-cols-2 items-center rounded-full border border-gold/50 bg-ink/60 text-[10px] font-semibold tracking-wide transition-colors hover:border-gold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
      >
        <span
          aria-hidden
          className={clsx(
            "absolute inset-y-0.5 left-0.5 w-[calc(50%-2px)] rounded-full bg-gold transition-transform duration-300",
            latin === "en" && "translate-x-full"
          )}
        />
        <span aria-hidden className={clsx("relative text-center transition-colors", latin === "fr" ? "text-ink" : "text-paper/60")}>
          FR
        </span>
        <span aria-hidden className={clsx("relative text-center transition-colors", latin === "en" ? "text-ink" : "text-paper/60")}>
          EN
        </span>
      </button>
    </div>
  );
}

export default function Navbar() {
  const { t, tl } = useLang();
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
        <a href="#accueil" aria-label={`鑫龙饭店 Chez Long — ${tl(navItems[0])}`} onClick={() => setOpen(false)}>
          <Logo />
        </a>

        <nav className="hidden xl:block" aria-label={t({ fr: "Navigation principale", en: "Main navigation", zh: "主导航" })}>
          <ul className="flex items-center gap-1">
            {navItems.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  className={clsx(
                    "group relative block px-3.5 py-2 text-center transition-colors xl:px-4",
                    active === item.id ? "text-gold-light" : "text-paper/85 hover:text-gold-light"
                  )}
                >
                  <span className="block font-zh text-[14px] font-semibold tracking-wider">{item.zh}</span>
                  <span className="block text-[11px] text-current opacity-75">{tl(item)}</span>
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

        <div className="hidden items-center gap-5 xl:flex">
          <LangSwitch />
          <button type="button" onClick={() => openReservation()} className="btn-red py-2 pl-4 pr-3">
            <span>
              <span className="btn-label-zh">预订</span>
              <span className="btn-label-fr">{tl({ fr: "Réserver", en: "Book" })}</span>
            </span>
            <CalendarDays className="h-5 w-5 text-gold-light" aria-hidden />
          </button>
        </div>

        <button
          type="button"
          className="grid h-11 w-11 place-items-center rounded-md border border-gold/40 text-gold-light xl:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={
            open
              ? t({ fr: "Fermer le menu", en: "Close menu", zh: "关闭菜单" })
              : t({ fr: "Ouvrir le menu", en: "Open menu", zh: "打开菜单" })
          }
        >
          {open ? <X className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div id="mobile-nav" className="fixed inset-x-0 bottom-0 top-[72px] z-40 overflow-y-auto ink-texture xl:hidden">
          <nav className="container py-6" aria-label={t({ fr: "Navigation mobile", en: "Mobile navigation", zh: "移动导航" })}>
            <ul className="divide-y divide-gold/15 border-y border-gold/15">
              {navItems.map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    onClick={() => setOpen(false)}
                    className="flex items-baseline justify-between py-4"
                  >
                    <span className="font-zh text-xl font-semibold text-paper">{item.zh}</span>
                    <span className="text-sm text-gold-light">{tl(item)}</span>
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
                <span className="btn-label-fr">{tl({ fr: "Réserver une table", en: "Book a table" })}</span>
              </span>
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}
