import { notFound } from "next/navigation";
import { Be_Vietnam_Pro, Cormorant_Garamond } from "next/font/google";
import SmoothScroll from "@/components/fx/SmoothScroll";
import Reveal from "@/components/fx/Reveal";
import Preloader from "@/components/fx/Preloader";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import FloatingContact from "@/components/layout/FloatingContact";
import ScrollTop from "@/components/layout/ScrollTop";
import BookingModal from "@/components/booking/BookingModal";
import { featured } from "@/data/gallery";
import { getDictionary, hasLocale } from "@/data/dictionaries";
import { locales, siteConfig } from "@/data/site";
import { localePath } from "@/lib/utils";
import "../globals.css";

const sans = Be_Vietnam_Pro({
  variable: "--font-sans",
  subsets: ["latin", "vietnamese"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

const serif = Cormorant_Garamond({
  variable: "--font-serif",
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }) {
  const { lang } = await params;
  const t = getDictionary(lang);
  return {
    metadataBase: new URL(siteConfig.url),
    title: { default: t.meta.title, template: `%s | ${siteConfig.shortName}` },
    description: t.meta.description,
    keywords: t.meta.keywords,
    alternates: {
      canonical: localePath(lang, "/"),
      languages: { vi: "/", en: "/en", "x-default": "/" },
    },
    openGraph: {
      type: "website",
      locale: lang === "vi" ? "vi_VN" : "en_US",
      url: localePath(lang, "/"),
      siteName: siteConfig.name,
      title: t.meta.title,
      description: t.meta.description,
      images: [{ url: siteConfig.ogImage, width: 1200, height: 630, alt: siteConfig.name }],
    },
    twitter: { card: "summary_large_image", title: t.meta.title, description: t.meta.description, images: [siteConfig.ogImage] },
  };
}

export const viewport = { themeColor: "#faf8f4" };

export default async function RootLayout({ children, params }) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const t = getDictionary(lang);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: siteConfig.name,
    description: t.meta.description,
    url: siteConfig.url,
    image: `${siteConfig.url}${siteConfig.ogImage}`,
    telephone: siteConfig.contact.phone,
    email: siteConfig.contact.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: "13A Nguyễn Hoàng, An Hội",
      addressLocality: "Hội An",
      addressRegion: "Quảng Nam",
      addressCountry: "VN",
    },
    hasMap: siteConfig.contact.mapsLink,
    sameAs: siteConfig.socials.map((s) => s.href),
    priceRange: "$$",
  };

  return (
    <html lang={lang} className={`${sans.variable} ${serif.variable}`}>
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[300] focus:rounded-full focus:bg-ink focus:px-5 focus:py-3 focus:text-white"
        >
          {t.nav.skip}
        </a>
        <Preloader caption={lang === "vi" ? "Nhiếp ảnh cưới · Hội An" : "Wedding photography · Hoi An"} />
        <SmoothScroll />
        <Reveal />
        <Header lang={lang} nav={t.nav} phone={siteConfig.contact.phone} phoneHref={siteConfig.contact.phoneHref} />
        <main id="main">{children}</main>
        <Footer lang={lang} t={t} />
        <FloatingContact labels={{ whatsapp: t.contact.whatsapp, zalo: t.contact.zalo }} />
        <ScrollTop label={t.footer.backToTop} />
        <BookingModal lang={lang} booking={t.booking} services={t.services.items.map((s) => s.title)} photo={featured.booking} />
      </body>
    </html>
  );
}
