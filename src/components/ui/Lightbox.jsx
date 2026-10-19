"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Icon from "@/components/ui/Icon";
import { cn, fmt, lockScroll } from "@/lib/utils";

// Xem ảnh phóng to: phím Esc/←/→, vuốt trên cảm ứng, khóa cuộn trang khi mở.
export default function Lightbox({ photos, index, lang, labels, onClose, onChange }) {
  const open = index !== null && index >= 0;
  const [visible, setVisible] = useState(false);
  const touch = useRef(null);

  const step = useCallback(
    (dir) => {
      if (!open) return;
      onChange((index + dir + photos.length) % photos.length);
    },
    [open, index, photos.length, onChange]
  );

  useEffect(() => {
    if (!open) return;
    lockScroll(true);
    const raf = requestAnimationFrame(() => setVisible(true));
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      cancelAnimationFrame(raf);
      setVisible(false);
      lockScroll(false);
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose, step]);

  if (!open) return null;
  const photo = photos[index];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={photo.alt[lang]}
      className={cn(
        "fixed inset-0 z-[100] flex flex-col bg-ink/95 text-white backdrop-blur-sm transition-opacity duration-300",
        visible ? "opacity-100" : "opacity-0"
      )}
      onClick={onClose}
      onTouchStart={(e) => (touch.current = e.touches[0].clientX)}
      onTouchEnd={(e) => {
        if (touch.current === null) return;
        const dx = e.changedTouches[0].clientX - touch.current;
        if (Math.abs(dx) > 50) step(dx < 0 ? 1 : -1);
        touch.current = null;
      }}
    >
      <div className="flex items-center justify-between px-5 py-4 text-xs tracking-[0.2em] text-white/60 uppercase sm:px-8">
        <span>{fmt(labels.counter, { i: index + 1, n: photos.length })}</span>
        <button
          type="button"
          onClick={onClose}
          aria-label={labels.close}
          className="flex size-11 items-center justify-center rounded-full transition hover:bg-white/10"
        >
          <Icon name="close" className="size-5" />
        </button>
      </div>

      {/* Bấm ra ngoài tấm ảnh → đóng. <img> object-contain chiếm cả khung nên phải tự tính vùng ảnh thật sự được vẽ. */}
      <figure
        className="relative flex min-h-0 flex-1 items-center justify-center px-4 pb-6 sm:px-20"
        onClick={(e) => {
          const img = e.currentTarget.querySelector("img");
          if (!img?.naturalWidth) return;
          const r = img.getBoundingClientRect();
          const scale = Math.min(r.width / img.naturalWidth, r.height / img.naturalHeight);
          const w = img.naturalWidth * scale;
          const h = img.naturalHeight * scale;
          const x0 = r.left + (r.width - w) / 2;
          const y0 = r.top + (r.height - h) / 2;
          const inside = e.clientX >= x0 && e.clientX <= x0 + w && e.clientY >= y0 && e.clientY <= y0 + h;
          if (inside) e.stopPropagation();
        }}
      >
        <div key={photo.src} className="relative h-full w-full animate-[hero-in_0.6s_var(--ease-out-expo)_both]">
          <Image
            src={photo.src}
            alt={photo.alt[lang]}
            fill
            sizes="100vw"
            quality={90}
            placeholder="blur"
            blurDataURL={photo.blurDataURL}
            className="object-contain"
          />
        </div>
        <figcaption className="absolute inset-x-0 bottom-0 pb-1 text-center font-serif text-sm text-white/70 italic sm:text-base">
          {photo.alt[lang]}
        </figcaption>
      </figure>

      {[
        { dir: -1, icon: "chevronLeft", label: labels.prev, cls: "left-3 sm:left-6" },
        { dir: 1, icon: "chevronRight", label: labels.next, cls: "right-3 sm:right-6" },
      ].map((b) => (
        <button
          key={b.dir}
          type="button"
          aria-label={b.label}
          onClick={(e) => {
            e.stopPropagation();
            step(b.dir);
          }}
          className={cn(
            "absolute top-1/2 hidden size-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-white/10 backdrop-blur transition hover:bg-white hover:text-ink sm:flex",
            b.cls
          )}
        >
          <Icon name={b.icon} className="size-5" />
        </button>
      ))}
    </div>
  );
}
