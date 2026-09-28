import { useState } from "react";
import clsx from "clsx";
import { Phone } from "lucide-react";
import Reveal from "@/components/Reveal";
import SectionTitle from "@/components/SectionTitle";
import { Chili, SpiceMeter } from "@/components/Decor";
import { menu, restaurant } from "@/data/restaurant";
import { useLang } from "@/i18n";

export default function Menu() {
  const { t } = useLang();
  const [activeId, setActiveId] = useState(menu[0].id);
  const active = menu.find((c) => c.id === activeId) ?? menu[0];

  return (
    <section id="menu" className="relative overflow-hidden bg-ink py-20 sm:py-24">
      <div aria-hidden className="lattice absolute inset-0 opacity-60" />
      <div className="container relative">
        <SectionTitle
          dark
          zh="菜单"
          fr="La carte"
          sub={t({
            fr: "Une sélection de nos plats — demandez aussi les suggestions du jour.",
            zh: "精选菜品 · 更多每日特色菜请咨询服务员",
          })}
        />

        <Reveal className="mx-auto mt-12 max-w-4xl rounded-lg bg-paper p-1.5 shadow-card">
          <div className="rounded-md border-2 border-double border-gold/70 px-4 py-8 sm:px-10">
            <div
              role="tablist"
              aria-label={t({ fr: "Catégories du menu", zh: "菜单分类" })}
              className="scrollbar-none -mx-4 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:justify-center sm:px-0"
            >
              {menu.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  role="tab"
                  id={`tab-${cat.id}`}
                  aria-selected={cat.id === activeId}
                  aria-controls="menu-panel"
                  onClick={() => setActiveId(cat.id)}
                  className={clsx(
                    "shrink-0 rounded-full border px-4 py-2 text-center transition-colors",
                    cat.id === activeId
                      ? "border-cinnabar bg-cinnabar text-paper shadow-red"
                      : "border-paper-line bg-paper-dark/50 text-ink/75 hover:border-cinnabar/50 hover:text-cinnabar"
                  )}
                >
                  <span className="block font-zh text-sm font-bold leading-tight">{cat.title.zh}</span>
                  <span className="block text-[11px] leading-tight opacity-80">{cat.title.fr}</span>
                </button>
              ))}
            </div>

            <div id="menu-panel" role="tabpanel" aria-labelledby={`tab-${active.id}`} className="mt-8">
              <h3 className="flex items-center justify-center gap-3 text-center">
                <span className="h-px w-10 bg-gold" aria-hidden />
                <span lang="zh" className="font-zh text-2xl font-bold text-cinnabar">
                  {active.title.zh}
                </span>
                <span className="font-serif text-xl text-cinnabar-dark">{active.title.fr}</span>
                <span className="h-px w-10 bg-gold" aria-hidden />
              </h3>

              <ul key={active.id} className="mt-6 grid animate-fadeUp gap-x-10 sm:grid-cols-2">
                {active.items.map((item) => (
                  <li
                    key={item.zh}
                    className="flex items-center justify-between gap-4 border-b border-dashed border-paper-line py-3.5"
                  >
                    <span>
                      <span lang="zh" className="block font-zh text-[17px] font-bold text-ink">
                        {item.zh}
                      </span>
                      <span className="block text-[13px] text-ink/65">{item.fr}</span>
                    </span>
                    <SpiceMeter level={item.spice} className="shrink-0" />
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8 flex flex-col items-center justify-between gap-4 text-center text-xs text-ink/60 sm:flex-row sm:text-left">
              <p className="flex items-center gap-1.5">
                <Chili className="h-3.5 w-3.5 text-cinnabar-light" />
                {t({ fr: "= niveau de piment", zh: "= 辣度" })}
                <span className="mx-1">·</span>
                {t({
                  fr: "Prix et plats du jour : sur place ou par téléphone.",
                  zh: "价格及每日特色菜请到店或来电咨询。",
                })}
              </p>
              <a
                href={restaurant.phoneHref}
                className="inline-flex items-center gap-2 rounded-full border border-cinnabar/40 px-4 py-2 font-semibold text-cinnabar transition hover:bg-cinnabar hover:text-paper"
              >
                <Phone className="h-3.5 w-3.5" aria-hidden />
                {restaurant.phone}
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
