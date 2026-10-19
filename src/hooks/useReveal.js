"use client";

import { useEffect } from "react";

/**
 * Hiệu ứng hiện dần khi cuộn tới cho mọi phần tử `.reveal` và `.split`.
 * Chạy animation bằng Web Animations API (không đổi class) để tránh lệch hydration.
 * - Biến thể: data-reveal="left|right|scale|clip"
 * - Trễ: style={{ "--reveal-delay": "120ms" }}
 */
const EASE = "cubic-bezier(0.22, 1, 0.36, 1)";
const SHOWN = { opacity: 1, transform: "none", filter: "blur(0)" };
const FRAMES = {
  default: [{ opacity: 0, transform: "translateY(26px)", filter: "blur(6px)" }, SHOWN],
  left: [{ opacity: 0, transform: "translateX(-32px)", filter: "blur(6px)" }, SHOWN],
  right: [{ opacity: 0, transform: "translateX(32px)", filter: "blur(6px)" }, SHOWN],
  scale: [{ opacity: 0, transform: "scale(0.94)", filter: "blur(6px)" }, SHOWN],
  clip: [{ clipPath: "inset(12% 6% 12% 6% round 2rem)" }, { clipPath: "inset(0 0 0 0 round 0)" }],
};
const SPLIT_FRAMES = [
  { opacity: 0, transform: "translateY(0.35em)", filter: "blur(8px)" },
  { opacity: 1, transform: "none", filter: "blur(0)" },
];
const SELECTOR = ".reveal, .split:not([data-manual])";

const ms = (cs, prop, fallback = 0) => parseFloat(cs.getPropertyValue(prop)) || fallback;

function reveal(el) {
  if (el.__revealed) return;
  el.__revealed = true;
  const cs = getComputedStyle(el);
  if (el.classList.contains("split")) {
    const base = ms(cs, "--base");
    const step = ms(cs, "--step", 45);
    el.querySelectorAll(".split-unit").forEach((unit, i) =>
      unit.animate(SPLIT_FRAMES, { duration: 700, delay: base + i * step, easing: EASE, fill: "both" })
    );
    return;
  }
  const variant = el.dataset.reveal;
  el.animate(FRAMES[variant] || FRAMES.default, {
    duration: variant === "clip" ? 1200 : 1000,
    delay: ms(cs, "--reveal-delay"),
    easing: EASE,
    fill: "both",
  });
}

export function useReveal() {
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            reveal(entry.target);
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );

    const observe = (root) => {
      if (root.matches?.(SELECTOR)) io.observe(root);
      root.querySelectorAll?.(SELECTOR).forEach((el) => !el.__revealed && io.observe(el));
    };
    observe(document.body);

    // Phần tử tải sau (đổi tab lọc, modal…)
    const mo = new MutationObserver((muts) =>
      muts.forEach((m) => m.addedNodes.forEach((n) => n.nodeType === 1 && observe(n)))
    );
    mo.observe(document.body, { childList: true, subtree: true });

    // Phần tử đã nằm trong khung nhìn sau khi resize
    const sweep = () => {
      const vh = window.innerHeight;
      document.querySelectorAll(SELECTOR).forEach((el) => {
        if (el.__revealed) return;
        const r = el.getBoundingClientRect();
        if (r.top < vh * 0.92 && r.bottom > 0) reveal(el);
      });
    };
    window.addEventListener("resize", sweep);

    return () => {
      io.disconnect();
      mo.disconnect();
      window.removeEventListener("resize", sweep);
    };
  }, []);
}
