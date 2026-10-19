"use client";

import { useState } from "react";
import Image from "next/image";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Icon from "@/components/ui/Icon";
import Ornament from "@/components/ui/Ornament";
import { anchor, cn, fmt } from "@/lib/utils";

/**
 * Accordion ngang: card nào được hover/chạm thì nở rộng, card khác thu lại hiện tên dọc.
 * Mobile: dải cuộn ngang có snap. Bấm "Xem bộ sưu tập" → cuộn tới Gallery và lọc theo bộ đó.
 */
export default function Collections({ lang, t, items }) {
  const [active, setActive] = useState(0);
  const total = items.reduce((n, c) => n + c.count, 0);

  const filter = (id) => window.dispatchEvent(new CustomEvent("tee:filter", { detail: id }));

  return (
    <section id="collections" className="relative overflow-hidden bg-paper-100 py-16 lg:py-20">
      <Ornament name="lantern" float className="absolute top-10 right-[22%] hidden w-14 text-ink/[0.09] lg:block" />
      <Ornament name="lantern" float delay={900} className="absolute top-24 right-[17%] hidden w-9 text-amber/30 lg:block" />
      <Container wide className="relative">
        <div className="relative">
          <SectionHeading eyebrow={t.collections.eyebrow} title={t.collections.title} description={t.collections.description} />
          {/* Tổng số ảnh: canh ngang tâm dòng tiêu đề (eyebrow 16px + mt 16px + nửa chiều cao h2) */}
          <p className="reveal absolute top-[58px] right-0 hidden -translate-y-1/2 items-center gap-2 rounded-full border border-ink/10 px-4 py-2 text-xs text-ink-muted lg:inline-flex">
            <Icon name="camera" className="size-4 text-amber" />
            {fmt(t.collections.count, { n: total })}
          </p>
        </div>

        {/* Desktop */}
        <div className="reveal mt-8 hidden h-[420px] gap-3 lg:flex xl:h-[480px]" data-reveal="scale">
          {items.map((c, i) => {
            const open = active === i;
            return (
              <article
                key={c.id}
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                className={cn(
                  "group relative overflow-hidden rounded-[1.75rem] transition-[flex] duration-[800ms] ease-[var(--ease-out-expo)]",
                  open ? "flex-[3.2]" : "flex-[1]"
                )}
              >
                <Image
                  src={c.cover.src}
                  alt={c.cover.alt[lang]}
                  fill
                  sizes="(min-width: 1024px) 66vw, 100vw"
                  quality={90}
                  placeholder="blur"
                  blurDataURL={c.cover.blurDataURL}
                  className={cn("object-cover transition-transform duration-[1200ms] ease-out", c.cover.position, open ? "scale-100" : "scale-[1.03]")}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/20 to-transparent" />

                <span className="absolute top-6 left-6 rounded-full border border-white/30 bg-white/10 px-3 py-1 text-[11px] font-medium tracking-[0.2em] text-white backdrop-blur">
                  0{i + 1}
                </span>

                {/* Tên dọc khi thu gọn */}
                <h3
                  className={cn(
                    "absolute bottom-8 left-1/2 -translate-x-1/2 rotate-180 font-serif text-3xl whitespace-nowrap text-white transition-opacity duration-500 [writing-mode:vertical-rl]",
                    open ? "opacity-0" : "opacity-100"
                  )}
                >
                  {c.title}
                </h3>

                {/* Chi tiết khi mở */}
                <div
                  className={cn(
                    "absolute inset-x-0 bottom-0 p-8 text-white transition-all duration-700 ease-[var(--ease-out-expo)]",
                    open ? "translate-y-0 opacity-100 delay-200" : "translate-y-6 opacity-0"
                  )}
                >
                  <p className="text-[11px] tracking-eyebrow text-amber-light uppercase">{c.subtitle}</p>
                  <div className="mt-3 flex items-end justify-between gap-6">
                    <div>
                      <h3 className="font-serif text-4xl xl:text-5xl">{c.title}</h3>
                      <p className="mt-3 max-w-md text-sm leading-relaxed text-white/75">{c.description}</p>
                    </div>
                    <a
                      href={anchor(lang, "#gallery")}
                      onClick={() => filter(c.id)}
                      className="group/btn flex shrink-0 items-center gap-3 text-sm font-medium"
                    >
                      <span className="hidden xl:inline">{t.collections.view}</span>
                      <span className="flex size-12 items-center justify-center rounded-full bg-white text-ink transition-transform duration-300 group-hover/btn:translate-x-1">
                        <Icon name="arrow" className="size-5" />
                      </span>
                    </a>
                  </div>
                  <p className="mt-4 text-xs text-white/50">{fmt(t.collections.count, { n: c.count })}</p>
                </div>
              </article>
            );
          })}
        </div>

        {/* Mobile / tablet */}
        <div className="no-scrollbar -mx-5 mt-8 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-4 sm:-mx-8 sm:px-8 lg:hidden">
          {items.map((c, i) => (
            <a
              key={c.id}
              href={anchor(lang, "#gallery")}
              onClick={() => filter(c.id)}
              className="reveal relative aspect-[3/4] w-[72vw] max-w-xs shrink-0 snap-center overflow-hidden rounded-[1.5rem]"
              style={{ "--reveal-delay": `${i * 100}ms` }}
            >
              <Image
                src={c.cover.src}
                alt={c.cover.alt[lang]}
                fill
                sizes="84vw"
                quality={85}
                placeholder="blur"
                blurDataURL={c.cover.blurDataURL}
                className={cn("object-cover", c.cover.position)}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/20 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6 text-white">
                <p className="text-[11px] tracking-eyebrow text-amber-light uppercase">{c.subtitle}</p>
                <h3 className="mt-2 font-serif text-3xl">{c.title}</h3>
                <p className="mt-2 text-xs text-white/60">{fmt(t.collections.count, { n: c.count })}</p>
              </div>
            </a>
          ))}
        </div>
      </Container>
    </section>
  );
}
