// Ghép className có điều kiện: cn("a", isActive && "b") => "a b"
export function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

// Đường dẫn theo ngôn ngữ: vi là mặc định (không prefix), en có prefix /en.
export function localePath(lang, path = "/") {
  const clean = path.startsWith("/") ? path : `/${path}`;
  if (lang === "vi") return clean;
  return clean === "/" ? `/${lang}` : `/${lang}${clean}`;
}

// Link tới anchor trên trang chủ: "#about" → "/#about" hoặc "/en#about"
export function anchor(lang, hash) {
  return `${localePath(lang, "/")}${hash}`;
}

// Khóa cuộn (menu mobile, lightbox): bù độ rộng scrollbar, dừng/chạy lại Lenis.
let lockCount = 0;
export function lockScroll(lock) {
  if (typeof document === "undefined") return;
  lockCount = Math.max(0, lockCount + (lock ? 1 : -1));
  const locked = lockCount > 0;
  const html = document.documentElement;
  if (locked) {
    const sbw = window.innerWidth - html.clientWidth;
    html.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
    if (sbw > 0) document.body.style.paddingRight = sbw + "px";
    window.__lenis?.stop();
  } else {
    html.style.overflow = "";
    document.body.style.overflow = "";
    document.body.style.paddingRight = "";
    window.__lenis?.start();
  }
}

// Nối 2 từ cuối bằng NBSP để không rớt một chữ lẻ ở dòng cuối.
export function noOrphan(text) {
  const i = text.lastIndexOf(" ");
  return i > 0 ? `${text.slice(0, i)} ${text.slice(i + 1)}` : text;
}

// Điền biến vào chuỗi mẫu: fmt("{n} ảnh", { n: 14 }) => "14 ảnh"
export function fmt(template, vars) {
  return template.replace(/\{(\w+)\}/g, (_, k) => vars[k] ?? "");
}
