"use client";

import { useState } from "react";
import Icon from "@/components/ui/Icon";
import { siteConfig } from "@/data/site";
import { cn } from "@/lib/utils";

/**
 * Form đặt lịch (demo, chưa có backend): soạn tin nhắn từ các ô nhập, sao chép vào clipboard
 * rồi mở WhatsApp (có điền sẵn nội dung) / Zalo của Tee để khách gửi. Khi có backend thay handleSend bằng gọi API.
 */
export default function BookingForm({ booking, services, preset }) {
  const f = booking.fields;
  const [form, setForm] = useState({
    name: "",
    contact: "",
    date: "",
    people: "2",
    service: services.includes(preset) ? preset : "",
    note: "",
  });
  const [copied, setCopied] = useState(false);
  const set = (k) => (e) => setForm((v) => ({ ...v, [k]: e.target.value }));

  const compose = () =>
    [
      booking.message,
      `• ${f.name}: ${form.name}`,
      `• ${f.contact}: ${form.contact}`,
      form.date && `• ${f.date}: ${form.date}`,
      `• ${f.people}: ${form.people}`,
      `• ${f.service}: ${form.service || f.undecided}`,
      form.note && `• ${f.note.split(" (")[0]}: ${form.note}`,
    ]
      .filter(Boolean)
      .join("\n");

  const handleSend = async (channel) => {
    const text = compose();
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 4000);
    } catch {}
    const url =
      channel === "zalo" ? siteConfig.contact.zalo : `${siteConfig.contact.whatsapp}?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const floating = "absolute top-1.5 left-4 text-[11px] tracking-wider text-ink-muted uppercase lg:text-[10px]";
  const btn =
    "inline-flex flex-1 items-center justify-center gap-2 rounded-full border border-ink/20 px-4 py-3 text-[13px] font-medium whitespace-nowrap text-ink transition hover:border-ink hover:bg-ink hover:text-white sm:px-6 sm:text-sm";

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSend("whatsapp");
      }}
      className="space-y-2.5 sm:space-y-3"
    >
      <div className="grid gap-2.5 sm:grid-cols-2 sm:gap-3">
        <input required className="field" placeholder={f.name} autoComplete="name" value={form.name} onChange={set("name")} />
        <input required className="field" placeholder={f.contact} value={form.contact} onChange={set("contact")} />
      </div>
      <div className="grid grid-cols-[1.4fr_1fr] gap-2.5 sm:grid-cols-2 sm:gap-3">
        <label className="relative block">
          <span className={floating}>{f.date}</span>
          <input className="field pt-5" type="date" value={form.date} onChange={set("date")} />
        </label>
        <label className="relative block">
          <span className={floating}>{f.people}</span>
          <select className="field pt-5" value={form.people} onChange={set("people")}>
            {["1", "2", "3-5", "6-10", "10+"].map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>
        </label>
      </div>
      <label className="relative block">
        <span className={floating}>{f.service}</span>
        <select className="field pt-5" value={form.service} onChange={set("service")}>
          <option value="">{f.undecided}</option>
          {services.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </label>
      <textarea className="field min-h-[60px] resize-none sm:min-h-[88px]" rows={2} placeholder={f.note} value={form.note} onChange={set("note")} />

      <div className="flex flex-col gap-2 pt-1 sm:flex-row">
        <button type="submit" className={cn(btn, "max-sm:border-ink max-sm:bg-ink max-sm:text-white")}>
          <Icon name="whatsapp" className="size-4" /> {f.submit}
        </button>
        <button type="button" onClick={() => handleSend("zalo")} className={btn}>
          <Icon name="chat" className="size-4" /> {f.submitZalo}
        </button>
      </div>

      <p className={cn("flex items-center justify-center gap-2 text-center text-[11px] text-balance transition-all duration-300 sm:text-[12px]", copied ? "text-ink" : "text-ink-muted")}>
        {copied && <Icon name="check" className="size-3.5" strokeWidth={2} />}
        {copied ? f.copied : f.privacy}
      </p>
    </form>
  );
}
