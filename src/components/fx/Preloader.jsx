"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { siteConfig } from "@/data/site";
import { cn } from "@/lib/utils";

// Màn chào ngắn: logo + thanh nạp, sau đó kéo lên và phát event `tee:ready` cho Hero.
export default function Preloader({ caption }) {
  const [state, setState] = useState("show"); // show | leave | done

  useEffect(() => {
    // Đã xem trong phiên này → bỏ qua màn chào
    const seen = sessionStorage.getItem("tee:seen");
    const leave = setTimeout(
      () => {
        setState(seen ? "done" : "leave");
        document.documentElement.classList.add("is-ready");
        window.dispatchEvent(new Event("tee:ready"));
        sessionStorage.setItem("tee:seen", "1");
      },
      seen ? 0 : 1200
    );
    const done = setTimeout(() => setState("done"), seen ? 0 : 2200);
    return () => {
      clearTimeout(leave);
      clearTimeout(done);
    };
  }, []);

  if (state === "done") return null;

  return (
    <div
      aria-hidden="true"
      className={cn(
        "fixed inset-0 z-[200] flex items-center justify-center bg-paper transition-transform ease-expo",
        state === "leave" ? "-translate-y-full duration-[900ms]" : "translate-y-0"
      )}
    >
      <div className="flex flex-col items-center">
        <span className="relative block aspect-[738/207] h-10 sm:h-12">
          <Image src={siteConfig.logo} alt="" fill sizes="260px" className="object-contain" preload />
        </span>
        <span className="mt-5 text-[10px] font-medium tracking-[0.4em] text-ink-muted uppercase">{caption}</span>
        <span className="relative mt-7 block h-px w-28 overflow-hidden bg-ink/10">
          <span className="absolute inset-y-0 left-0 w-full origin-left bg-ink [animation:loadbar_1.1s_cubic-bezier(.22,1,.36,1)_.1s_both]" />
        </span>
      </div>
    </div>
  );
}
