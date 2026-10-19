"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Lightbox from "@/components/ui/Lightbox";
import Icon from "@/components/ui/Icon";
import Ornament from "@/components/ui/Ornament";
import { cn } from "@/lib/utils";

/**
 * Thư viện ảnh dạng masonry + lọc theo bộ sưu tập + lightbox.
 * Nhận event `tee:filter` từ section Collections để lọc sẵn.
 */
export default function Gallery({ lang, t, photos, collections }) {
  const [filter, setFilter] = useState("all");
  const [open, setOpen] = useState(null);

  useEffect(() => {
    const on = (e) => setFilter(e.detail);
    window.addEventListener("tee:filter", on);
    return () => window.removeEventListener("tee:filter", on);
  }, []);

  const items = filter === "all" ? photos : photos.filter((p) => p.collection === filter);
  const close = useCallback(() => setOpen(null), []);

  return (
    <section id="gallery" className="relative overflow-hidden py-16 lg:py-20">
      <Ornament name="sparkle" float className="absolute top-20 left-[18%] hidden w-8 text-amber/50 lg:block" />
      <Ornament name="sparkle" float delay={700} className="absolute top-36 right-[16%] hidden w-5 text-amber/40 lg:block" />
      <Ornament name="aperture" className="absolute -right-16 bottom-24 hidden w-64 text-ink/[0.05] lg:block" />
      <Container wide className="relative">
        <SectionHeading eyebrow={t.gallery.eyebrow} title={t.gallery.title} align="center" />

        <div role="tablist" aria-label={t.gallery.eyebrow} className="reveal mt-8 flex flex-wrap justify-center gap-2">
          {[{ id: "all", title: t.gallery.all }, ...collections].map((c) => (
            <button
              key={c.id}
              type="button"
              role="tab"
              aria-selected={filter === c.id}
              onClick={() => setFilter(c.id)}
              className={cn(
                "rounded-full px-5 py-2.5 text-[13px] font-medium tracking-wide transition-all duration-300",
                filter === c.id ? "bg-ink text-white shadow-card" : "text-ink/70 hover:bg-ink/5 hover:text-ink"
              )}
            >
              {c.title}
            </button>
          ))}
        </div>

        <ul key={filter} className="mt-8 columns-2 gap-3 sm:mt-10 sm:gap-4 lg:columns-3 [&>li]:mb-3 sm:[&>li]:mb-4">
          {items.map((p, i) => (
            <li key={p.src} className="reveal break-inside-avoid" data-reveal="scale" style={{ "--reveal-delay": `${(i % 3) * 90}ms` }}>
              <button
                type="button"
                onClick={() => setOpen(i)}
                aria-label={`${t.gallery.open}: ${p.alt[lang]}`}
                className="group relative block w-full overflow-hidden rounded-2xl bg-paper-100 text-left sm:rounded-[1.25rem]"
              >
                <Image
                  src={p.src}
                  alt={p.alt[lang]}
                  width={p.width}
                  height={p.height}
                  sizes="(min-width: 1024px) 34vw, (min-width: 640px) 48vw, 92vw"
                  quality={85}
                  placeholder="blur"
                  blurDataURL={p.blurDataURL}
                  className="h-auto w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
                />
                <span className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <span className="absolute inset-x-0 bottom-0 flex translate-y-3 items-end justify-between gap-4 p-5 text-white opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                  <span>
                    <span className="block text-[10px] tracking-eyebrow text-amber-light uppercase">
                      {collections.find((c) => c.id === p.collection)?.title}
                    </span>
                    <span className="mt-1 block font-serif text-base italic">{p.alt[lang]}</span>
                  </span>
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-white/15 backdrop-blur">
                    <Icon name="expand" className="size-4" />
                  </span>
                </span>
              </button>
            </li>
          ))}
        </ul>
      </Container>

      <Lightbox photos={items} index={open} lang={lang} labels={t.gallery} onClose={close} onChange={setOpen} />
    </section>
  );
}
