import { useCallback, useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { ChevronLeft, ChevronRight } from "lucide-react";
import SectionTitle from "@/components/SectionTitle";
import { Cloud } from "@/components/Decor";
import { gallery } from "@/data/restaurant";
import { useLang } from "@/i18n";

export default function Gallery() {
  const { t, tl } = useLang();
  const trackRef = useRef<HTMLUListElement>(null);
  const [edges, setEdges] = useState({ start: true, end: false });

  const updateEdges = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    setEdges({
      start: el.scrollLeft <= 4,
      end: el.scrollLeft + el.clientWidth >= el.scrollWidth - 4,
    });
  }, []);

  useEffect(() => {
    updateEdges();
    window.addEventListener("resize", updateEdges);
    return () => window.removeEventListener("resize", updateEdges);
  }, [updateEdges]);

  const scroll = (dir: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.querySelector("li");
    const step = card ? card.getBoundingClientRect().width + 16 : el.clientWidth * 0.8;
    el.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  const arrow =
    "absolute top-1/2 z-10 hidden h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-paper-line bg-paper text-ink shadow-card transition hover:border-cinnabar hover:text-cinnabar disabled:pointer-events-none disabled:opacity-0 sm:grid";

  return (
    <section className="relative overflow-hidden paper-texture py-20 sm:py-24">
      <Cloud className="pointer-events-none absolute right-6 top-6 w-44 text-gold/40" />
      <div className="container relative">
        <SectionTitle
          zh="餐厅环境"
          latin={tl({ fr: "Notre ambiance", en: "Our atmosphere" })}
          seal="境"
          sub={t({ fr: "Un cadre élégant et convivial", en: "An elegant, welcoming setting", zh: "舒适优雅 · 正宗中餐氛围" })}
        />

        <div className="relative mt-12">
          <button
            type="button"
            className={clsx(arrow, "-left-3 lg:-left-5")}
            onClick={() => scroll(-1)}
            disabled={edges.start}
            aria-label={t({ fr: "Photo précédente", en: "Previous photo", zh: "上一张" })}
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          <ul
            ref={trackRef}
            onScroll={updateEdges}
            className="scrollbar-none -mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth px-4 sm:mx-0 sm:px-0"
          >
            {gallery.map((photo) => (
              <li
                key={photo.img}
                className="group relative aspect-[4/3] w-[78%] shrink-0 snap-start overflow-hidden rounded-lg shadow-card sm:w-[calc((100%-2rem)/3)] lg:w-[calc((100%-3rem)/4)]"
              >
                <img
                  src={photo.img}
                  alt={tl(photo.caption)}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/80 to-transparent px-4 pb-3 pt-10">
                  <p className="text-sm font-medium text-paper">
                    <span lang="zh" className="mr-2 font-zh font-bold text-gold-light">
                      {photo.caption.zh}
                    </span>
                    {tl(photo.caption)}
                  </p>
                </div>
              </li>
            ))}
          </ul>

          <button
            type="button"
            className={clsx(arrow, "-right-3 lg:-right-5")}
            onClick={() => scroll(1)}
            disabled={edges.end}
            aria-label={t({ fr: "Photo suivante", en: "Next photo", zh: "下一张" })}
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </section>
  );
}
