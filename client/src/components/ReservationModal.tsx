import { useEffect, useRef, useState, type FormEvent } from "react";
import clsx from "clsx";
import { CheckCircle2, Loader2, MessageCircle, Phone, X } from "lucide-react";
import { Seal } from "@/components/Decor";
import { restaurant } from "@/data/restaurant";
import { useLang } from "@/i18n";
import type { ReservationType } from "@/reservation";

type Form = {
  name: string;
  phone: string;
  date: string;
  time: string;
  guests: string;
  type: ReservationType;
  message: string;
};

type Status = "idle" | "sending" | "saved" | "offline";

const today = () => {
  const d = new Date();
  d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
  return d.toISOString().slice(0, 10);
};

export default function ReservationModal({
  initialType,
  onClose,
}: {
  initialType: ReservationType;
  onClose: () => void;
}) {
  const { t, tl, lang } = useLang();
  const firstFieldRef = useRef<HTMLInputElement>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [form, setForm] = useState<Form>({
    name: "",
    phone: "",
    date: today(),
    time: "19:30",
    guests: initialType === "salon" ? "8" : "2",
    type: initialType,
    message: "",
  });

  useEffect(() => {
    firstFieldRef.current?.focus();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  const update = <K extends keyof Form>(key: K, value: Form[K]) => setForm((f) => ({ ...f, [key]: value }));

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 6000);
    try {
      const res = await fetch("/api/reservation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, guests: Number(form.guests) }),
        signal: controller.signal,
      });
      setStatus(res.ok ? "saved" : "offline");
    } catch {
      // Site déployé sans serveur : la demande passe par WhatsApp.
      setStatus("offline");
    } finally {
      clearTimeout(timer);
    }
  };

  const salon = form.type === "salon";
  const whatsappLines = {
    zh: [
      `您好，鑫龙饭店！我想预订${salon ? "包间" : "餐桌"}。`,
      `姓名：${form.name}`,
      `电话：${form.phone}`,
      `日期：${form.date} ${form.time}`,
      `人数：${form.guests}`,
      form.message && `备注：${form.message}`,
    ],
    fr: [
      `Bonjour 鑫龙饭店 ! Je souhaite réserver ${salon ? "un salon privé" : "une table"}.`,
      `Nom : ${form.name}`,
      `Téléphone : ${form.phone}`,
      `Date : ${form.date} à ${form.time}`,
      `Personnes : ${form.guests}`,
      form.message && `Message : ${form.message}`,
    ],
    en: [
      `Hello 鑫龙饭店! I would like to book ${salon ? "a private room" : "a table"}.`,
      `Name: ${form.name}`,
      `Phone: ${form.phone}`,
      `Date: ${form.date} at ${form.time}`,
      `Guests: ${form.guests}`,
      form.message && `Message: ${form.message}`,
    ],
  }[lang];
  const whatsappUrl = `https://wa.me/${restaurant.whatsapp}?text=${encodeURIComponent(
    whatsappLines.filter(Boolean).join("\n")
  )}`;

  const field =
    "mt-1.5 w-full rounded-md border border-paper-line bg-white px-3 py-2.5 text-[15px] text-ink outline-none transition focus:border-cinnabar focus:ring-2 focus:ring-cinnabar/20";
  const label = "block text-[13px] font-semibold text-ink/80";
  const done = status === "saved" || status === "offline";
  const closeLabel = t({ fr: "Fermer", en: "Close", zh: "关闭" });

  return (
    <div className="fixed inset-0 z-[60] flex items-end justify-center sm:items-center sm:p-4" role="dialog" aria-modal="true" aria-labelledby="reservation-title">
      <button
        type="button"
        aria-label={closeLabel}
        className="absolute inset-0 cursor-default bg-ink/75 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative max-h-[92svh] w-full max-w-lg animate-fadeUp overflow-y-auto rounded-t-xl bg-paper shadow-2xl sm:rounded-xl">
        <div className="sticky top-0 z-10 flex items-center justify-between gap-4 border-b border-gold/30 bg-cinnabar px-5 py-4 text-paper">
          <div className="flex items-center gap-3">
            <Seal char="订" className="h-9 w-9 border-gold-light/60 bg-cinnabar-dark text-xl text-gold-light" />
            <h2 id="reservation-title">
              <span className="block font-zh text-lg font-bold leading-tight">{salon ? "预订包间" : "预订餐桌"}</span>
              <span className="block text-xs text-gold-light">
                {salon
                  ? tl({ fr: "Réserver un salon privé", en: "Book a private room" })
                  : tl({ fr: "Réserver une table", en: "Book a table" })}
              </span>
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="grid h-9 w-9 place-items-center rounded-full border border-paper/30 transition hover:bg-paper/10"
            aria-label={closeLabel}
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {done ? (
          <div className="px-6 py-8 text-center">
            <CheckCircle2 className="mx-auto h-12 w-12 text-cinnabar" aria-hidden />
            <p className="mt-4 font-serif text-xl font-semibold text-ink">
              {status === "saved"
                ? t({ fr: "Demande enregistrée, merci !", en: "Request received, thank you!", zh: "预订请求已提交，谢谢！" })
                : t({ fr: "Dernière étape", en: "One last step", zh: "最后一步" })}
            </p>
            <p className="mx-auto mt-2 max-w-sm text-sm leading-relaxed text-ink/70">
              {status === "saved"
                ? t({
                    fr: "Pour une confirmation rapide, envoyez aussi votre demande sur WhatsApp ou appelez-nous.",
                    en: "For a quick confirmation, also send your request on WhatsApp or give us a call.",
                    zh: "如需尽快确认，请通过 WhatsApp 发送或直接致电我们。",
                  })
                : t({
                    fr: "Envoyez votre demande sur WhatsApp (le message est déjà rédigé) ou appelez-nous pour confirmer.",
                    en: "Send your request on WhatsApp (the message is already written) or call us to confirm.",
                    zh: "请通过 WhatsApp 发送预订信息（已为您填好），或致电确认。",
                  })}
            </p>
            <div className="mx-auto mt-5 max-w-xs rounded-md border border-paper-line bg-paper-dark/50 p-4 text-left text-sm text-ink/80">
              <p className="font-semibold text-ink">{form.name}</p>
              <p>
                {form.date} · {form.time} · {form.guests} {t({ fr: "pers.", en: "guests", zh: "位" })}
              </p>
            </div>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-md bg-[#25D366] px-5 py-3 font-semibold text-white transition hover:brightness-95"
              >
                <MessageCircle className="h-5 w-5" aria-hidden />
                {t({ fr: "Envoyer sur WhatsApp", en: "Send on WhatsApp", zh: "通过 WhatsApp 发送" })}
              </a>
              <a
                href={restaurant.phoneHref}
                className="inline-flex items-center justify-center gap-2 rounded-md border border-cinnabar px-5 py-3 font-semibold text-cinnabar transition hover:bg-cinnabar hover:text-paper"
              >
                <Phone className="h-4 w-4" aria-hidden />
                {restaurant.phone}
              </a>
            </div>
          </div>
        ) : (
          <form onSubmit={submit} className="space-y-4 px-5 py-6 sm:px-6">
            <fieldset>
              <legend className={label}>{t({ fr: "Type de réservation", en: "Booking type", zh: "预订类型" })}</legend>
              <div className="mt-1.5 grid grid-cols-2 gap-2">
                {(
                  [
                    { value: "table", zh: "餐桌", fr: "Table", en: "Table" },
                    { value: "salon", zh: "包间", fr: "Salon privé", en: "Private room" },
                  ] as const
                ).map((opt) => (
                  <label
                    key={opt.value}
                    className={clsx(
                      "flex cursor-pointer items-center justify-center gap-2 rounded-md border px-3 py-2.5 text-sm transition",
                      form.type === opt.value
                        ? "border-cinnabar bg-cinnabar/10 font-semibold text-cinnabar"
                        : "border-paper-line bg-white text-ink/70 hover:border-cinnabar/40"
                    )}
                  >
                    <input
                      type="radio"
                      name="type"
                      value={opt.value}
                      checked={form.type === opt.value}
                      onChange={() => update("type", opt.value)}
                      className="sr-only"
                    />
                    <span className="font-zh">{opt.zh}</span>
                    <span>{tl(opt)}</span>
                  </label>
                ))}
              </div>
            </fieldset>

            <div className="grid gap-4 sm:grid-cols-2">
              <label className={label}>
                {t({ fr: "Nom complet", en: "Full name", zh: "姓名" })} *
                <input
                  ref={firstFieldRef}
                  required
                  maxLength={80}
                  autoComplete="name"
                  value={form.name}
                  onChange={(e) => update("name", e.target.value)}
                  className={field}
                />
              </label>
              <label className={label}>
                {t({ fr: "Téléphone", en: "Phone", zh: "电话" })} *
                <input
                  required
                  type="tel"
                  maxLength={30}
                  autoComplete="tel"
                  placeholder="+237 6XX XX XX XX"
                  value={form.phone}
                  onChange={(e) => update("phone", e.target.value)}
                  className={field}
                />
              </label>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <label className={clsx(label, "col-span-3 sm:col-span-1")}>
                {t({ fr: "Date", en: "Date", zh: "日期" })} *
                <input
                  required
                  type="date"
                  min={today()}
                  value={form.date}
                  onChange={(e) => update("date", e.target.value)}
                  className={field}
                />
              </label>
              <label className={clsx(label, "col-span-3 sm:col-span-1")}>
                {t({ fr: "Heure", en: "Time", zh: "时间" })} *
                <input
                  required
                  type="time"
                  value={form.time}
                  onChange={(e) => update("time", e.target.value)}
                  className={field}
                />
              </label>
              <label className={clsx(label, "col-span-3 sm:col-span-1")}>
                {t({ fr: "Personnes", en: "Guests", zh: "人数" })} *
                <input
                  required
                  type="number"
                  min={1}
                  max={60}
                  inputMode="numeric"
                  value={form.guests}
                  onChange={(e) => update("guests", e.target.value)}
                  className={field}
                />
              </label>
            </div>

            <label className={label}>
              {t({ fr: "Message (occasion, allergies…)", en: "Message (occasion, allergies…)", zh: "备注（场合、忌口等）" })}
              <textarea
                rows={3}
                maxLength={500}
                value={form.message}
                onChange={(e) => update("message", e.target.value)}
                className={clsx(field, "resize-none")}
              />
            </label>

            <button
              type="submit"
              disabled={status === "sending"}
              className="btn-red w-full justify-center py-3 disabled:cursor-wait disabled:opacity-80"
            >
              {status === "sending" && <Loader2 className="h-4 w-4 animate-spin" aria-hidden />}
              <span className="text-center">
                <span className="btn-label-zh">提交预订</span>
                <span className="btn-label-fr">{tl({ fr: "Envoyer ma demande", en: "Send my request" })}</span>
              </span>
            </button>
            <p className="text-center text-xs text-ink/55">
              {t({
                fr: "Votre réservation sera confirmée par téléphone ou WhatsApp.",
                en: "Your booking will be confirmed by phone or WhatsApp.",
                zh: "我们将通过电话或 WhatsApp 与您确认预订。",
              })}
            </p>
          </form>
        )}
      </div>
    </div>
  );
}
