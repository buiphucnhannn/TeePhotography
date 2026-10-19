"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "@/components/ui/Logo";
import Icon from "@/components/ui/Icon";
import { anchor, cn, localePath, lockScroll } from "@/lib/utils";

/**
 * Header dạng "viên thuốc" kính mờ nổi cách mép (theo mẫu ButStudio):
 * - trên section tối (data-nav-theme="dark") là kính tối chữ trắng; section sáng → kính sáng chữ đen.
 * - menu giữa có ô active theo section đang xem, CTA kèm vòng tròn mũi tên, nút đổi ngôn ngữ VI/EN.
 */
export default function Header({ lang, nav, phone, phoneHref }) {
  const pathname = usePathname();
  const [menu, setMenu] = useState({ open: false, path: "" });
  const [onDark, setOnDark] = useState(false);
  const [active, setActive] = useState("");

  const open = menu.open && menu.path === pathname;
  const setOpen = (v) =>
    setMenu((m) => ({ open: typeof v === "function" ? v(m.open && m.path === pathname) : v, path: pathname }));

  // Dò section nằm sau header: data-nav-theme="dark" phủ qua tâm header → kính tối.
  // Đồng thời tìm section (có id) đang chiếm phần lớn khung nhìn để tô ô menu active.
  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const y = 52; // tâm header (top 20px + 64/2)
      let theme = "light";
      document.querySelectorAll("[data-nav-theme]").forEach((el) => {
        const r = el.getBoundingClientRect();
        if (r.top <= y && r.bottom >= y) theme = el.dataset.navTheme;
      });
      setOnDark(theme === "dark");

      const probe = window.innerHeight * 0.4;
      let current = "";
      nav.links.forEach((item) => {
        const el = document.querySelector(item.href);
        if (!el) return;
        const r = el.getBoundingClientRect();
        if (r.top <= probe && r.bottom >= probe) current = item.href;
      });
      setActive(current);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    const t = setTimeout(update, 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      clearTimeout(t);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [pathname, nav]);

  useEffect(() => {
    if (!open) return;
    lockScroll(true);
    return () => lockScroll(false);
  }, [open]);

  const dark = onDark && !open;
  const otherLang = lang === "vi" ? "en" : "vi";

  return (
    <header className="fixed inset-x-3 top-3 z-50 sm:inset-x-5 sm:top-5">
      <div
        className={cn(
          "mx-auto flex h-[64px] w-full max-w-[1280px] items-center justify-between rounded-full border pr-2 pl-5 backdrop-blur-xl transition-all duration-500 sm:pl-7",
          dark
            ? "border-white/15 bg-ink/40 text-white shadow-[0_10px_40px_-20px_rgba(0,0,0,0.7)]"
            : "border-white/70 bg-paper/80 text-ink shadow-[0_12px_40px_-24px_rgba(26,24,22,0.35)]"
        )}
      >
        <Link href={localePath(lang, "/") + "#top"} aria-label="Tee.Photography" className="-my-2 flex shrink-0 items-center py-2">
          <Logo className="h-7 w-[100px] sm:h-8 sm:w-[114px]" light={dark} preload />
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Main">
          {nav.links.map((item) => {
            const isActive = active === item.href;
            return (
              <Link
                key={item.href}
                href={anchor(lang, item.href)}
                className={cn(
                  "rounded-full px-4 py-2 text-[13px] font-medium tracking-wide transition-all duration-300",
                  isActive
                    ? dark
                      ? "bg-white text-ink"
                      : "bg-ink text-white"
                    : dark
                      ? "text-white/80 hover:bg-white/10 hover:text-white"
                      : "text-ink/75 hover:bg-ink/5 hover:text-ink"
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Đổi ngôn ngữ bằng <a> thường (tải lại trang) vì đổi cả layout gốc (html lang, metadata) */}
          <a
            href={localePath(otherLang, "/")}
            hrefLang={otherLang}
            aria-label={otherLang === "en" ? "Switch to English" : "Chuyển sang tiếng Việt"}
            className={cn(
              "flex h-9 items-center gap-1 rounded-full px-3 text-[11px] font-semibold tracking-[0.18em] transition",
              dark ? "text-white/80 hover:bg-white/10 hover:text-white" : "text-ink/70 hover:bg-ink/5 hover:text-ink"
            )}
          >
            <span className={lang === "vi" ? "opacity-100" : "opacity-40"}>VI</span>
            <span className="opacity-30">/</span>
            <span className={lang === "en" ? "opacity-100" : "opacity-40"}>EN</span>
          </a>

          <button
            type="button"
            data-booking
            className={cn(
              "group hidden items-center gap-3 rounded-full py-1.5 pr-1.5 pl-5 text-[13px] font-medium transition-all duration-300 md:inline-flex",
              dark ? "bg-white text-ink hover:bg-paper-100" : "bg-ink text-white hover:bg-graphite"
            )}
          >
            {nav.cta}
            <span
              className={cn(
                "flex h-9 w-9 items-center justify-center rounded-full transition-transform duration-300 group-hover:translate-x-0.5",
                dark ? "bg-ink text-white" : "bg-white text-ink"
              )}
            >
              <Icon name="arrow" className="size-4" />
            </span>
          </button>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? nav.close : nav.menu}
            aria-expanded={open}
            aria-controls="mobile-menu"
            className={cn(
              "flex h-11 w-11 items-center justify-center rounded-full transition lg:hidden",
              dark ? "text-white hover:bg-white/10" : "text-ink hover:bg-ink/5"
            )}
          >
            {open ? (
              <Icon name="close" className="size-5" />
            ) : (
              <span className="flex flex-col gap-[5px]">
                <span className="block h-px w-6 bg-current" />
                <span className="block h-px w-4 bg-current" />
                <span className="block h-px w-6 bg-current" />
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Menu mobile toàn màn hình */}
      <div
        id="mobile-menu"
        className={cn(
          "fixed inset-0 -z-10 bg-paper transition-all duration-500 lg:hidden",
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        )}
      >
        <nav className="flex h-full flex-col px-7 pt-28 pb-8">
          {nav.links.map((item, i) => (
            <Link
              key={item.href}
              href={anchor(lang, item.href)}
              onClick={() => setOpen(false)}
              className={cn(
                "flex items-center justify-between border-b border-ink/10 py-3.5 font-serif text-2xl text-ink transition-all duration-500",
                open ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
              )}
              style={{ transitionDelay: open ? `${120 + i * 50}ms` : "0ms" }}
            >
              {item.label}
              <Icon name="arrow" className="size-5 text-ink-muted" />
            </Link>
          ))}
          <button
            type="button"
            data-booking
            onClick={() => setOpen(false)}
            className="mt-8 inline-flex items-center justify-center gap-2 rounded-full bg-ink px-6 py-4 text-sm font-medium text-white"
          >
            {nav.cta} <Icon name="arrow" className="size-4" />
          </button>
          <p className="mt-auto text-center text-xs text-ink-muted">
            Hotline:{" "}
            <a href={phoneHref} className="-my-2 inline-block py-2 text-ink">
              {phone}
            </a>
          </p>
        </nav>
      </div>
    </header>
  );
}
