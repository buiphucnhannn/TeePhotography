import Link from "next/link";
import { cn } from "@/lib/utils";
import Icon from "@/components/ui/Icon";

const base =
  "group inline-flex items-center justify-center gap-2 rounded-full font-medium tracking-wide whitespace-nowrap transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber disabled:pointer-events-none disabled:opacity-60";
const sizes = {
  sm: "px-5 py-2.5 text-[13px]",
  md: "px-7 py-3.5 text-sm",
  lg: "px-8 py-4 text-sm",
};
const styles = {
  primary: "bg-ink text-white shadow-card hover:bg-graphite hover:shadow-soft",
  outline: "border border-ink/20 bg-transparent text-ink hover:border-ink hover:bg-ink hover:text-white",
  light: "border border-white/60 bg-white/15 text-white backdrop-blur-sm hover:bg-white hover:text-ink",
  // "pill" là kiểu chữ ký: nền trắng, vòng tròn đen chứa mũi tên bên phải
  pill: "bg-white py-1.5 pr-1.5 pl-6 text-ink shadow-card hover:bg-paper-100",
  pillDark: "bg-ink py-1.5 pr-1.5 pl-6 text-white shadow-card hover:bg-graphite",
};

// Render <Link> khi có href, <a> khi href ngoài, ngược lại <button>.
export default function Button({ href, variant = "primary", size = "md", arrow = false, className, children, ...props }) {
  const isPill = variant === "pill" || variant === "pillDark";
  const classes = cn(base, isPill ? "text-sm" : sizes[size], styles[variant], className);

  const content = (
    <>
      {children}
      {isPill && (
        <span
          className={cn(
            "flex h-9 w-9 items-center justify-center rounded-full transition-transform duration-300 group-hover:translate-x-0.5",
            variant === "pill" ? "bg-ink text-white" : "bg-white text-ink"
          )}
        >
          <Icon name="arrow" className="size-4" />
        </span>
      )}
      {arrow && !isPill && (
        <Icon name="arrow" className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
      )}
    </>
  );

  if (href?.startsWith("http") || href?.startsWith("tel:") || href?.startsWith("mailto:")) {
    return (
      <a href={href} className={classes} {...props}>
        {content}
      </a>
    );
  }
  if (href) {
    return (
      <Link href={href} className={classes} {...props}>
        {content}
      </Link>
    );
  }
  return (
    <button className={classes} {...props}>
      {content}
    </button>
  );
}
