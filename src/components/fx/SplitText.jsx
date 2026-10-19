import { cn, noOrphan } from "@/lib/utils";

/**
 * Tách chữ thành từng từ (hoặc ký tự) để hiện dần lần lượt — animation do useReveal chạy.
 * - accent: cụm in nghiêng cuối câu (xuống dòng riêng khi breakBeforeAccent)
 * - step/baseDelay: nhịp & độ trễ ban đầu (ms)
 */
export default function SplitText({
  as: Tag = "span",
  text,
  accent,
  mode = "word",
  step = 45,
  baseDelay = 0,
  breakBeforeAccent = false,
  className,
  accentClassName = "italic font-normal",
}) {
  let i = 0;
  const unit = (content, extra) => (
    <span key={i} className={cn("split-unit", extra)} style={{ "--i": i++ }}>
      {content}
    </span>
  );
  const render = (str, extra) => {
    if (mode === "char") {
      return str.split("").map((ch) => (ch === " " ? " " : unit(ch, extra)));
    }
    return noOrphan(str)
      .split(" ")
      .map((w, idx, arr) => (
        <span key={`${w}-${idx}`} className="inline-block whitespace-nowrap">
          {unit(w, extra)}
          {idx < arr.length - 1 ? " " : ""}
        </span>
      ))
      .reduce((acc, el, idx) => (idx ? [...acc, " ", el] : [el]), []);
  };

  return (
    <Tag className={cn("split", className)} style={{ "--base": `${baseDelay}ms`, "--step": `${step}ms` }}>
      {render(text)}
      {accent && (
        <>
          {breakBeforeAccent ? <br /> : " "}
          {render(accent, accentClassName)}
        </>
      )}
    </Tag>
  );
}
