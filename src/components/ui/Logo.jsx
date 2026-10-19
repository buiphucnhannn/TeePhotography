import Image from "next/image";
import { siteConfig } from "@/data/site";
import { cn } from "@/lib/utils";

// Logo chữ ký (PNG trong suốt). light = bản trắng cho nền tối.
export default function Logo({ className = "h-8", light = false, preload = false }) {
  return (
    <span className={cn("relative block aspect-[738/207]", className)}>
      <Image
        src={light ? siteConfig.logoWhite : siteConfig.logo}
        alt={siteConfig.name}
        fill
        sizes="240px"
        preload={preload}
        className="object-contain object-left"
      />
    </span>
  );
}
