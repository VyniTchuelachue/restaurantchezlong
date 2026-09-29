import { useEffect, useState } from "react";
import clsx from "clsx";
import { MessageCircle } from "lucide-react";
import { restaurant } from "@/data/restaurant";
import { useLang } from "@/i18n";

/** Floating WhatsApp shortcut, shown once the visitor scrolls past the hero. */
export default function FloatingActions() {
  const { t } = useLang();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 500);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const message = t({
    fr: "Bonjour 鑫龙饭店, je souhaite avoir des informations.",
    en: "Hello 鑫龙饭店, I would like some information.",
    zh: "您好，鑫龙饭店，我想咨询一下。",
  });

  return (
    <a
      href={`https://wa.me/${restaurant.whatsapp}?text=${encodeURIComponent(message)}`}
      target="_blank"
      rel="noreferrer"
      aria-label={t({ fr: "Nous écrire sur WhatsApp", en: "Message us on WhatsApp", zh: "WhatsApp 联系我们" })}
      className={clsx(
        "fixed bottom-5 right-5 z-40 grid h-14 w-14 place-items-center rounded-full bg-[#25D366] text-white shadow-lg ring-4 ring-white/20 transition-all duration-300 hover:scale-105",
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-6 opacity-0"
      )}
    >
      <MessageCircle className="h-7 w-7" aria-hidden />
    </a>
  );
}
