"use client";

import { useEffect, useState } from "react";
import Icon from "@/components/ui/Icon";
import { siteConfig } from "@/data/site";
import { cn } from "@/lib/utils";

// Cụm nút liên hệ nhanh góc phải dưới — hiện sau khi cuộn qua nửa hero.
// Hover: nhãn là một viên pill trắng tách rời, trượt ra bên trái nút.
export default function FloatingContact({ labels }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > window.innerHeight * 0.5);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const { contact } = siteConfig;
  const items = [
    { icon: "whatsapp", label: labels.whatsapp, href: contact.whatsapp, cls: "bg-[#25d366] text-white" },
    { icon: "chat", label: labels.zalo, href: contact.zalo, cls: "bg-[#0068ff] text-white" },
    { icon: "phone", label: contact.phone, href: contact.phoneHref, cls: "bg-ink text-white", ripple: true },
  ];

  return (
    <div
      className={cn(
        "fixed right-3 bottom-3 z-40 flex flex-col items-end gap-2 transition-all duration-500 sm:right-6 sm:bottom-6 sm:gap-3",
        show ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"
      )}
    >
      {items.map((item) => (
        <a
          key={item.icon}
          href={item.href}
          target={item.href.startsWith("http") ? "_blank" : undefined}
          rel="noopener noreferrer"
          aria-label={item.label}
          className="group relative flex items-center"
        >
          <span
            className={cn(
              "pointer-events-none absolute right-full mr-3 rounded-full bg-white px-4 py-2 text-[13px] font-medium whitespace-nowrap text-ink shadow-card",
              "translate-x-2 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:opacity-100"
            )}
          >
            {item.label}
          </span>
          <span className={cn("relative flex size-11 items-center justify-center rounded-full shadow-card transition-transform duration-300 group-hover:scale-105 sm:size-12", item.cls)}>
            {item.ripple && <span className="absolute inset-0 animate-ripple rounded-full bg-ink/40" />}
            <Icon name={item.icon} className="relative size-5" />
          </span>
        </a>
      ))}
    </div>
  );
}
