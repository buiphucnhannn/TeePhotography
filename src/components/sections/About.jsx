import Image from "next/image";
import Container from "@/components/ui/Container";
import Parallax from "@/components/fx/Parallax";
import SplitText from "@/components/fx/SplitText";
import Ornament from "@/components/ui/Ornament";

// Gọn: 1 tiêu đề, 1 đoạn, chữ ký, dải 3 con số — cột ảnh tỷ lệ 5/4 để section không quá cao.
export default function About({ lang, t, photos }) {
  const [ring, rooftop] = photos;
  const [name, role] = t.about.signature.split(" — ");

  return (
    <section id="about" className="relative overflow-hidden py-16 lg:py-20">
      <Ornament name="sun" float className="absolute -bottom-6 left-[38%] hidden w-40 text-ink/[0.06] lg:block" />
      <Container wide className="grid items-center gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16 xl:gap-20">
        <div className="max-w-xl">
          <p className="eyebrow reveal">{t.about.eyebrow}</p>
          <h2 className="h-display mt-4 text-[1.9rem] text-ink sm:text-[2.3rem] lg:text-[2.6rem] xl:text-[2.9rem]">
            <SplitText text={t.about.title} step={30} />
          </h2>
          <p className="reveal mt-6 text-[15px] leading-relaxed text-ink-soft sm:text-base" style={{ "--reveal-delay": "100ms" }}>
            {t.about.paragraphs[0]}
          </p>

          <div className="reveal mt-7 flex items-center gap-4" style={{ "--reveal-delay": "180ms" }}>
            <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-paper-100 font-serif text-lg text-ink">
              T
            </span>
            <div>
              <p className="font-serif text-lg leading-tight text-ink italic">{name}</p>
              <p className="text-xs text-ink-muted">{role}</p>
            </div>
          </div>

          <dl className="mt-8 grid grid-cols-3 divide-x divide-ink/10 border-t border-ink/10 pt-6">
            {t.about.stats.map((s, i) => (
              <div key={s.label} className="reveal px-4 first:pl-0 last:pr-0" style={{ "--reveal-delay": `${240 + i * 80}ms` }}>
                <dd className="font-serif text-[1.75rem] leading-none text-ink sm:text-[2.1rem]">{s.value}</dd>
                <dt className="mt-2 text-[11px] leading-snug text-ink-muted sm:text-xs">{s.label}</dt>
              </div>
            ))}
          </dl>
        </div>

        <div className="relative mx-auto w-full max-w-lg pb-10 pl-6 sm:pl-12 lg:max-w-none">
          <Parallax speed={0.07} desktopOnly>
            <div className="reveal relative aspect-[5/4] overflow-hidden rounded-[1.75rem]" data-reveal="clip">
              <Image
                src={rooftop.src}
                alt={rooftop.alt[lang]}
                fill
                sizes="(min-width: 1024px) 55vw, 92vw"
                quality={90}
                placeholder="blur"
                blurDataURL={rooftop.blurDataURL}
                className="object-cover"
              />
            </div>
          </Parallax>
          <Parallax speed={-0.05} desktopOnly className="absolute bottom-0 left-0 w-40 sm:w-52">
            <figure className="reveal polaroid -rotate-6" data-reveal="scale" style={{ "--reveal-delay": "300ms" }}>
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image src={ring.src} alt={ring.alt[lang]} fill sizes="260px" quality={85} placeholder="blur" blurDataURL={ring.blurDataURL} className="object-cover" />
              </div>
              <figcaption className="mt-2 text-center font-serif text-sm text-ink-soft italic">Hội An, 2026</figcaption>
            </figure>
          </Parallax>
          <Ornament name="frame" className="absolute -top-6 -right-6 hidden w-28 text-amber/50 lg:block" />
        </div>
      </Container>
    </section>
  );
}
