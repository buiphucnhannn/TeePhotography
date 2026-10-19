// Thông tin doanh nghiệp (từ hồ sơ yêu cầu docs/demo.docx) — sửa tại đây, toàn trang cập nhật theo.
export const locales = ["vi", "en"];
export const defaultLocale = "vi";

export const siteConfig = {
  name: "Tee.Photography in Hoi An",
  shortName: "Tee.Photography",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://teephotography.vn",
  ogImage: "/images/og/og-image.jpg",
  logo: "/images/brand/logo.png",
  logoWhite: "/images/brand/logo-white.png",
  year: 2026,
  contact: {
    person: "Trần Trung Toàn Thiện",
    phone: "090 555 0417",
    phoneHref: "tel:+84905550417",
    whatsapp: "https://wa.me/84905550417",
    zalo: "https://zalo.me/0905550417",
    email: "hello@teephotography.vn",
    address: "13A Nguyễn Hoàng, An Hội, Hội An, Đà Nẵng, Việt Nam",
    mapsLink: "https://maps.app.goo.gl/EFgnh8WavwG6dUti8",
    mapsEmbed:
      "https://www.google.com/maps?q=13A+Nguy%E1%BB%85n+Ho%C3%A0ng,+An+H%E1%BB%99i,+H%E1%BB%99i+An,+Qu%E1%BA%A3ng+Nam&output=embed",
  },
  socials: [
    { label: "Facebook", href: "https://www.facebook.com/tee.photographyinhoian" },
    { label: "Instagram", href: "https://instagram.com/" },
    { label: "WhatsApp", href: "https://wa.me/84905550417" },
  ],
};
