"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";
import SplitText from "@/components/fx/SplitText";
import { anchor, cn } from "@/lib/utils";

const INTERVAL = 4800;

/**
 * Hero toàn màn hình: slideshow crossfade + Ken Burns, chữ ở đáy trái, parallax nhẹ khi cuộn.
 * Chờ event `tee:ready` (Preloader) rồi mới chạy intro.
 */
export default function Hero({ lang, t, photos }) {
  const [ready, setReady] = useState(false);
  const [index, setIndex] = useState(0);
  const imgRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    const on = () => setReady(true);
    window.addEventListener("tee:ready", on);
    // Preloader đã chạy xong trước khi Hero mount (ví dụ điều hướng client)
    const t = setTimeout(() => document.documentElement.classList.contains("is-ready") && on(), 0);
    return () => {
      window.removeEventListener("tee:ready", on);
      clearTimeout(t);
    };
  }, []);

  useEffect(() => {
    if (!ready) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % photos.length), INTERVAL);
    return () => clearInterval(id);
  }, [ready, photos.length]);

  // Parallax: ảnh trôi chậm hơn, chữ trôi nhanh hơn và mờ dần
  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const y = window.scrollY;
      if (y > window.innerHeight * 1.2) return;
      if (imgRef.current) imgRef.current.style.transform = `translate3d(0, ${y * 0.28}px, 0)`;
      if (textRef.current) {
        textRef.current.style.transform = `translate3d(0, ${y * 0.12}px, 0)`;
        textRef.current.style.opacity = String(Math.max(0, 1 - y / (window.innerHeight * 0.6)));
      }
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  const fade = (delay) => ({
    className: cn("transition-all duration-1000 ease-out", ready ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"),
    style: { transitionDelay: `${delay}ms` },
  });

  return (
    <section id="top" data-nav-theme="dark" className="relative h-[var(--screen)] min-h-[600px] overflow-hidden bg-ink text-white">
      {/* Ảnh nền */}
      <div ref={imgRef} className={cn("absolute inset-0 will-change-transform", ready && "animate-hero-in")}>
        {photos.map((p, i) => (
          <div
            key={p.src}
            aria-hidden={i !== index}
            className={cn("absolute inset-0 transition-opacity duration-[1500ms] ease-out", i === index ? "opacity-100" : "opacity-0")}
          >
            <Image
              src={p.src}
              alt={p.alt[lang]}
              fill
              sizes="100vw"
              quality={90}
              preload={i === 0}
              placeholder="blur"
              blurDataURL={p.blurDataURL}
              className={cn("object-cover", i === index && ready && "animate-kenburns")}
            />
          </div>
        ))}
        <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/20 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/35 to-transparent" />
      </div>

      {/* Nội dung: khối chữ căn giữa chiều cao (trừ phần header), chỉ số slide + cuộn xuống ghim ở đáy */}
      <div ref={textRef} className="absolute inset-0 will-change-transform">
        <div className="mx-auto flex h-full w-full max-w-[1440px] flex-col px-5 pt-[84px] pb-8 sm:px-8 sm:pb-10 lg:px-16 lg:pb-12">
          <div className="flex flex-1 items-center">
            <div className="max-w-3xl">
              <p {...fade(600)} className={cn(fade(600).className, "eyebrow text-legible flex items-center gap-3 text-amber-light max-sm:text-[10px] max-sm:tracking-[0.2em]")}>
                <span className="h-px w-10 bg-amber-light/70" />
                {t.hero.eyebrow}
              </p>
              <h1 className="h-display text-legible-lg mt-5 text-[2.3rem] text-white min-[380px]:text-[2.6rem] sm:text-[4rem] lg:text-[5rem] xl:text-[5.6rem]">
                {ready ? (
                  <SplitText
                    as="span"
                    text={t.hero.titleLines[0]}
                    accent={t.hero.titleLines[1]}
                    breakBeforeAccent
                    step={55}
                    baseDelay={300}
                    accentClassName="italic font-normal text-amber-light"
                  />
                ) : (
                  <span className="opacity-0">
                    {t.hero.titleLines[0]}
                    <br />
                    {t.hero.titleLines[1]}
                  </span>
                )}
              </h1>
              <p {...fade(1500)} className={cn(fade(1500).className, "text-legible mt-6 max-w-xl text-[15px] leading-relaxed text-white/85 sm:text-lg")}>
                {t.hero.description}
              </p>
              <div {...fade(1700)} className={cn(fade(1700).className, "mt-8 flex flex-wrap gap-3")}>
                <Button data-booking variant="pill">
                  {t.hero.primary}
                </Button>
                <Button href={anchor(lang, "#collections")} variant="light" size="md">
                  {t.hero.secondary}
                </Button>
              </div>
            </div>

          </div>

          {/* Chỉ số slide + cuộn xuống */}
          <div {...fade(2000)} className={cn(fade(2000).className, "flex items-end justify-between gap-8")}>
              <ol className="flex gap-2" aria-label="Slides">
                {photos.map((p, i) => (
                  <li key={p.src}>
                    <button
                      type="button"
                      aria-label={`${i + 1}`}
                      aria-current={i === index}
                      onClick={() => setIndex(i)}
                      className="relative h-6 w-10 overflow-hidden"
                    >
                      <span className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-white/30" />
                      <span
                        className={cn(
                          "absolute inset-x-0 top-1/2 h-px origin-left -translate-y-1/2 bg-white",
                          i === index ? "scale-x-100 transition-transform ease-linear" : "scale-x-0"
                        )}
                        style={{ transitionDuration: i === index ? `${INTERVAL}ms` : "0ms" }}
                      />
                    </button>
                  </li>
                ))}
              </ol>
              <a
                href={anchor(lang, "#about")}
                className="group flex items-center gap-3 text-[11px] font-medium tracking-[0.3em] text-white/70 uppercase transition hover:text-white"
              >
                {t.hero.scroll}
                <span className="flex size-10 items-center justify-center rounded-full border border-white/30 transition group-hover:border-white">
                  <Icon name="arrowDown" className="size-4 animate-float" />
                </span>
              </a>
          </div>
        </div>
      </div>
    </section>
  );
}
