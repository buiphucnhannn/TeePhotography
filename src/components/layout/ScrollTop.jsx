"use client";

import { useEffect, useState } from "react";
import Icon from "@/components/ui/Icon";
import { cn } from "@/lib/utils";

const easeOutExpo = (t) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t));

// Nút tròn kính mờ góc trái dưới, cuộn êm về đầu trang qua Lenis.
export default function ScrollTop({ label }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > window.innerHeight);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const toTop = () => {
    if (window.__lenis) window.__lenis.scrollTo(0, { duration: 1.6, easing: easeOutExpo, force: true });
    else window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      type="button"
      onClick={toTop}
      aria-label={label}
      className={cn(
        "fixed bottom-4 left-4 z-40 hidden size-11 items-center justify-center sm:flex rounded-full border border-ink/10 bg-paper/80 text-ink shadow-card backdrop-blur-md transition-all duration-500 hover:bg-ink hover:text-white sm:bottom-6 sm:left-6",
        show ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"
      )}
    >
      <Icon name="arrowUp" className="size-4" />
    </button>
  );
}
