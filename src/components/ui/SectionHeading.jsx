import { cn } from "@/lib/utils";

// Eyebrow + tiêu đề serif + mô tả; mỗi phần hiện dần lần lượt.
export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  light = false,
  size = "md",
  className,
}) {
  const center = align === "center";
  return (
    <div className={cn("max-w-2xl", center && "mx-auto text-center", className)}>
      {eyebrow && <p className="eyebrow reveal">{eyebrow}</p>}
      <h2
        className={cn(
          "h-display reveal mt-4",
          size === "lg" ? "text-[2.4rem] sm:text-[3.2rem] lg:text-[3.6rem]" : "text-[2rem] sm:text-[2.6rem] lg:text-[3rem]",
          light ? "text-white" : "text-ink"
        )}
        style={{ "--reveal-delay": "80ms" }}
      >
        {title}
      </h2>
      {description && (
        <p
          className={cn("reveal mt-5 text-[15px] leading-relaxed sm:text-base", light ? "text-white/70" : "text-ink-soft")}
          style={{ "--reveal-delay": "160ms" }}
        >
          {description}
        </p>
      )}
    </div>
  );
}
