import Link from "next/link";
import Container from "@/components/ui/Container";
import Logo from "@/components/ui/Logo";
import Icon from "@/components/ui/Icon";
import { siteConfig } from "@/data/site";
import { anchor } from "@/lib/utils";

export default function Footer({ lang, t }) {
  const { contact, socials } = siteConfig;

  return (
    <footer data-nav-theme="dark" className="relative overflow-hidden bg-ink text-white/75">
      <div className="pointer-events-none absolute -top-40 right-0 size-[520px] rounded-full bg-amber/15 blur-[160px]" />

      <Container wide className="relative grid gap-10 py-14 lg:grid-cols-[1.2fr_0.8fr_1fr_1.2fr] lg:gap-10 lg:py-16">
        <div className="reveal">
          <Logo className="h-9 w-[150px]" light />
          <p className="mt-6 max-w-xs text-sm leading-relaxed text-white/60">{t.footer.tagline}</p>
          <ul className="mt-7 flex gap-3">
            {socials.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 items-center rounded-full border border-white/15 px-4 text-xs tracking-wide transition hover:border-white hover:bg-white hover:text-ink"
                >
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="reveal" style={{ "--reveal-delay": "80ms" }}>
          <h3 className="text-[11px] font-semibold tracking-eyebrow text-white uppercase">{t.footer.explore}</h3>
          <ul className="mt-6 space-y-3 text-sm">
            {t.nav.links.map((link) => (
              <li key={link.href}>
                <Link href={anchor(lang, link.href)} className="transition hover:text-amber-light">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="reveal" style={{ "--reveal-delay": "160ms" }}>
          <h3 className="text-[11px] font-semibold tracking-eyebrow text-white uppercase">{t.footer.contact}</h3>
          <ul className="mt-6 space-y-4 text-sm">
            <li className="flex gap-3">
              <Icon name="phone" className="mt-0.5 size-4 shrink-0 text-amber" />
              <a href={contact.phoneHref} className="hover:text-white">
                {contact.phone}
              </a>
            </li>
            <li className="flex gap-3">
              <Icon name="mail" className="mt-0.5 size-4 shrink-0 text-amber" />
              <a href={`mailto:${contact.email}`} className="hover:text-white">
                {contact.email}
              </a>
            </li>
            <li className="flex gap-3">
              <Icon name="pin" className="mt-0.5 size-4 shrink-0 text-amber" />
              <a href={contact.mapsLink} target="_blank" rel="noopener noreferrer" className="hover:text-white">
                {contact.address}
              </a>
            </li>
            <li className="flex gap-3">
              <Icon name="clock" className="mt-0.5 size-4 shrink-0 text-amber" />
              <span>{t.contact.hours}</span>
            </li>
          </ul>
        </div>

        {/* Bản đồ: khung nhỏ chỉ để định vị → bấm bất kỳ đâu là mở Google Maps; iframe không bắt chuột
            (tránh kéo nhầm / cuộn trang bị iframe "nuốt" khi dùng Lenis). */}
        <a
          href={contact.mapsLink}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={t.contact.directions}
          data-reveal="scale"
          style={{ "--reveal-delay": "240ms" }}
          className="group reveal relative block overflow-hidden rounded-[1.5rem] border border-white/10 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber"
        >
          <iframe
            title="Google Maps — Tee.Photography in Hoi An"
            src={contact.mapsEmbed}
            loading="lazy"
            tabIndex={-1}
            referrerPolicy="no-referrer-when-downgrade"
            className="pointer-events-none h-56 w-full grayscale-[45%] transition duration-500 group-hover:scale-[1.03] group-hover:grayscale-0 lg:h-full lg:min-h-[220px]"
          />
          <span className="pointer-events-none absolute inset-0 bg-ink/10 transition group-hover:bg-transparent" />
          <span className="pointer-events-none absolute bottom-3 left-3 inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-[11px] font-medium text-ink shadow-card">
            <Icon name="pin" className="size-3.5 text-amber" />
            {t.contact.directions}
          </span>
        </a>
      </Container>

      <div className="border-t border-white/10">
        <Container wide className="flex flex-col items-center gap-2 py-5 text-center text-xs text-white/45 sm:flex-row sm:items-center sm:justify-between sm:gap-3 sm:py-6 sm:pr-8 sm:text-left lg:pr-24">
          <p>
            © {siteConfig.year} {siteConfig.name}. {t.footer.rights}
          </p>
          <button type="button" data-booking className="inline-flex items-center gap-2 transition hover:text-amber-light">
            {t.nav.cta} <Icon name="arrow" className="size-4" />
          </button>
        </Container>
      </div>
    </footer>
  );
}
