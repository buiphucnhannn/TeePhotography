import Image from "next/image";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import Parallax from "@/components/fx/Parallax";
import SplitText from "@/components/fx/SplitText";

// Dải ảnh tràn màn hình có parallax + lời mời đặt lịch.
export default function CtaBand({ lang, t, photo }) {
  return (
    <section data-nav-theme="dark" className="relative overflow-hidden bg-ink text-white">
      <Parallax speed={0.15} className="absolute -inset-y-[15%] inset-x-0">
        <Image src={photo.src} alt={photo.alt[lang]} fill sizes="100vw" quality={85} placeholder="blur" blurDataURL={photo.blurDataURL} className="object-cover object-[center_80%] contrast-[1.15] saturate-[1.25]" />
      </Parallax>
      <div className="absolute inset-0 bg-gradient-to-b from-ink/65 via-ink/35 to-ink/75" />

      <Container className="relative py-24 text-center lg:py-32">
        <h2 className="h-display text-legible-lg mx-auto max-w-3xl text-[2.4rem] text-white sm:text-[3.4rem] lg:text-[4.2rem]">
          <SplitText text={t.cta.title} step={40} />
        </h2>
        <p className="reveal mx-auto mt-6 max-w-xl text-[15px] leading-relaxed text-white/80 sm:text-lg" style={{ "--reveal-delay": "200ms" }}>
          {t.cta.description}
        </p>
        <div className="reveal mt-10" style={{ "--reveal-delay": "320ms" }}>
          <Button data-booking variant="pill">
            {t.cta.button}
          </Button>
        </div>
      </Container>
    </section>
  );
}
