"use client";

import { useState } from "react";
import Image from "next/image";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Icon from "@/components/ui/Icon";
import Ornament from "@/components/ui/Ornament";
import { cn } from "@/lib/utils";

/**
 * Dịch vụ (theo mẫu ButStudio): danh sách 4 mục bên trái, rê chuột vào mục nào thì ảnh bên phải đổi theo
 * (crossfade + ken burns). Section cao đúng một màn hình. Mobile: mỗi mục là một thẻ có ảnh nhỏ.
 */
export default function Services({ lang, t, photos }) {
  const [active, setActive] = useState(0);
  const items = t.services.items;
  const current = items[active];
  const n = (i) => String(i + 1).padStart(2, "0");

  return (
    <section id="services" className="screen relative isolate flex items-center overflow-hidden bg-paper py-16 lg:py-20">
      <Ornament name="aperture" float className="absolute right-[10%] bottom-[5%] -z-10 hidden w-28 text-ink/[0.08] lg:block" />
      <Ornament name="sparkle" float delay={1500} className="absolute top-[18%] right-[6%] -z-10 hidden w-7 text-amber/40 lg:block" />

      <Container wide className="grid items-center gap-12 lg:grid-cols-[1fr_0.9fr] lg:gap-16">
        <div>
          <SectionHeading eyebrow={t.services.eyebrow} title={t.services.title} description={t.services.description} />

          <ul className="mt-8 divide-y divide-ink/10 border-t border-ink/10">
            {items.map((s, i) => {
              const on = active === i;
              return (
                <li
                  key={s.title}
                  className="reveal"
                  style={{ "--reveal-delay": `${200 + i * 80}ms` }}
                  onPointerEnter={(e) => e.pointerType === "mouse" && setActive(i)}
                >
                  <button type="button" onClick={() => setActive(i)} className="group flex w-full items-baseline gap-4 py-4 text-left" aria-expanded={on}>
                    {/* Số dùng font sans + tabular-nums: số old-style của Cormorant nhìn như lỗi font */}
                    <span className={cn("w-7 shrink-0 font-sans text-sm font-medium tracking-wide tabular-nums transition-colors", on ? "text-amber" : "text-ink-muted")}>
                      {n(i)}
                    </span>
                    <span className="flex-1">
                      <span className="flex items-baseline gap-3">
                        <span className={cn("block font-serif text-xl leading-snug transition-colors sm:text-[1.4rem]", on ? "text-ink" : "text-ink/55 group-hover:text-ink")}>
                          {s.title}
                        </span>
                        {s.tag && (
                          <span className={cn("shrink-0 text-[10px] tracking-[0.2em] uppercase transition-colors", on ? "text-amber" : "text-ink-muted/60")}>
                            {s.tag}
                          </span>
                        )}
                      </span>
                      <span className={cn("grid transition-[grid-template-rows,opacity] duration-500 ease-out", on ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0")}>
                        {/* padding nằm TRONG phần tử overflow-hidden để không bị cắt khi grid-rows thu/mở */}
                        <span className="block overflow-hidden">
                          <span className="block max-w-xl pt-1.5 text-[13.5px] leading-relaxed text-ink-soft">{s.description}</span>
                        </span>
                      </span>
                    </span>
                  </button>

                  {/* Mobile: ảnh nhỏ của mục đang mở */}
                  <div className={cn("overflow-hidden transition-all duration-500 lg:hidden", on ? "max-h-[320px] pb-5 opacity-100" : "max-h-0 opacity-0")}>
                    <div className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-paper-200">
                      <Image src={photos[i].src} alt={photos[i].alt[lang]} fill sizes="92vw" quality={85} placeholder="blur" blurDataURL={photos[i].blurDataURL} className="object-cover" />
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Desktop: khung ảnh đổi theo mục — luôn là CÙNG MỘT <div> để không mất animation reveal */}
        <div
          className="group reveal relative hidden aspect-[4/5] max-h-[calc(var(--screen)*0.74)] w-full overflow-hidden rounded-[1.75rem] bg-paper-200 lg:block"
          data-reveal="clip"
          style={{ "--reveal-delay": "200ms" }}
        >
          {photos.map((p, i) => (
            <div key={p.src} className={cn("absolute inset-0 transition-opacity duration-[900ms] ease-out", active === i ? "opacity-100" : "opacity-0")} aria-hidden={active !== i}>
              <Image
                src={p.src}
                alt={p.alt[lang]}
                fill
                sizes="(min-width: 1024px) 46vw, 92vw"
                quality={90}
                placeholder="blur"
                blurDataURL={p.blurDataURL}
                className={cn("object-cover", active === i && "animate-kenburns")}
              />
            </div>
          ))}
          <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" />
          <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-7 text-white">
            <div>
              <p className="text-[11px] tracking-[0.3em] text-white/70 uppercase lg:text-[10px]">{n(active)}</p>
              <p className="mt-1 font-serif text-2xl">{current.title}</p>
            </div>
            <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-white text-ink transition duration-300 group-hover:translate-x-0.5 group-hover:bg-paper-100">
              <Icon name="arrow" className="size-5" />
            </span>
          </div>
          {/* Phủ nút trong suốt lên toàn card: bấm → mở popup đặt lịch với dịch vụ đang chọn */}
          <button
            type="button"
            data-booking={current.title}
            aria-label={`${t.services.more}: ${current.title}`}
            className="absolute inset-0 z-10 rounded-[1.75rem] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink"
          />
        </div>
      </Container>
    </section>
  );
}
