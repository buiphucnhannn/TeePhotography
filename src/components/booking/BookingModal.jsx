"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import Logo from "@/components/ui/Logo";
import Icon from "@/components/ui/Icon";
import BookingForm from "./BookingForm";
import { siteConfig } from "@/data/site";
import { lockScroll } from "@/lib/utils";

/**
 * Popup đặt lịch dùng chung toàn site (theo mẫu ButStudio).
 * Mở bằng bất kỳ phần tử nào có thuộc tính data-booking (giá trị tuỳ chọn = tên dịch vụ/gói để chọn sẵn).
 */
export default function BookingModal({ lang, booking, services, photo }) {
  const [open, setOpen] = useState(false);
  const [preset, setPreset] = useState("");

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    const onClick = (e) => {
      const el = e.target.closest("[data-booking]");
      if (!el) return;
      e.preventDefault();
      setPreset(el.getAttribute("data-booking") || "");
      setOpen(true);
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && close();
    window.addEventListener("keydown", onKey);
    lockScroll(true);
    return () => {
      window.removeEventListener("keydown", onKey);
      lockScroll(false);
    };
  }, [open, close]);

  if (!open) return null;

  const { contact } = siteConfig;
  const quick = [
    { href: contact.whatsapp, label: "WhatsApp", icon: "whatsapp", ext: true },
    { href: contact.zalo, label: "Zalo", icon: "chat", ext: true },
    { href: contact.phoneHref, label: contact.phone, icon: "phone" },
  ];

  return (
    <div
      className="fixed inset-0 z-[150] flex items-center justify-center p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-label={booking.title}
    >
      <div className="absolute inset-0 bg-ink/70 backdrop-blur-sm [animation:fadeIn_.4s_ease-out_both]" onClick={close} />

      <div className="relative grid max-h-[92svh] w-full max-w-[980px] overflow-hidden rounded-[1.5rem] bg-paper shadow-soft [animation:popIn_.55s_cubic-bezier(.22,1,.36,1)_both] sm:rounded-[1.75rem] lg:grid-cols-[0.42fr_0.58fr] lg:rounded-[2rem]">
        {/* Cột ảnh (desktop) */}
        <div className="relative hidden lg:block">
          {/* Cột cao ~600px và ảnh ngang bị cắt theo chiều dọc → cần nguồn rộng ~900px (x2 trên màn retina) để nét */}
          <Image src={photo.src} alt="" fill sizes="900px" quality={90} placeholder="blur" blurDataURL={photo.blurDataURL} className="object-cover object-[60%_center]" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/20 to-ink/10" />
          <div className="absolute inset-x-0 bottom-0 px-8 pt-8 pb-12 text-white">
            <p className="font-serif text-[1.7rem] leading-tight whitespace-pre-line">{booking.headline}</p>
            <ul className="mt-4 space-y-2">
              {booking.bullets.map((b) => (
                <li key={b} className="flex items-start gap-2 text-[13px] text-white/85">
                  <Icon name="check" className="mt-0.5 size-3.5 shrink-0 text-amber-light" strokeWidth={2} />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Cột form — data-lenis-prevent: Lenis không chặn cuộn bên trong popup */}
        <div
          data-lenis-prevent
          className="no-scrollbar relative overflow-y-auto overscroll-contain px-5 pt-6 pb-5 sm:px-9 sm:py-8"
        >
          <button
            type="button"
            onClick={close}
            aria-label="Close"
            className="absolute top-2.5 right-2.5 flex size-9 items-center justify-center rounded-full bg-ink/5 text-ink/70 transition hover:bg-ink/10 hover:text-ink sm:top-4 sm:right-4 sm:size-10 sm:bg-transparent"
          >
            <Icon name="close" className="size-5" />
          </button>

          <div className="flex flex-col items-center text-center">
            <Logo className="h-6 w-[86px] sm:h-8 sm:w-[114px]" />
            <h3 className="mt-3 px-6 font-serif text-[1.5rem] leading-tight text-ink sm:mt-4 sm:px-0 sm:text-[2.2rem]">{booking.title}</h3>
            <p className="mt-2 hidden max-w-sm text-[13.5px] leading-relaxed text-balance text-ink-soft sm:block">{booking.desc}</p>
          </div>

          <div className="mt-5 sm:mt-6">
            <BookingForm lang={lang} booking={booking} services={services} preset={preset} />
          </div>

          <div className="mt-4 flex flex-wrap items-center justify-center gap-x-4 gap-y-1.5 border-t border-ink/10 pt-4 text-[12px] text-ink-muted sm:mt-6 sm:gap-x-5 sm:pt-5">
            <span>{booking.fields.or}</span>
            {quick.map((q) => (
              <a
                key={q.label}
                href={q.href}
                target={q.ext ? "_blank" : undefined}
                rel={q.ext ? "noopener noreferrer" : undefined}
                className="inline-flex items-center gap-1.5 text-ink/80 transition hover:text-ink"
              >
                <Icon name={q.icon} className="size-4" /> {q.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
