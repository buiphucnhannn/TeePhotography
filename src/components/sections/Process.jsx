import Image from "next/image";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import { cn } from "@/lib/utils";

// 4 bước dạng card ảnh dọc 4/5 (theo mẫu ButStudio): chữ trắng trên gradient, card chẵn lệch xuống tạo nhịp.
export default function Process({ lang, t, photos }) {
  return (
    <section id="process" className="relative overflow-hidden bg-paper-100 py-16 lg:py-20">
      <Container wide>
        <SectionHeading eyebrow={t.process.eyebrow} title={t.process.title} align="center" />

        <ol className="no-scrollbar mt-8 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-4 max-sm:-mx-5 sm:mt-10 sm:grid sm:grid-cols-2 sm:gap-5 sm:overflow-visible sm:px-0 sm:pb-0 lg:mb-8 lg:grid-cols-4 lg:gap-6">
          {t.process.steps.map((step, i) => {
            const p = photos[i];
            return (
              <li
                key={step.title}
                className="reveal group relative aspect-[4/5] w-[74vw] shrink-0 snap-center overflow-hidden rounded-[1.5rem] bg-paper-200 sm:w-auto sm:rounded-[1.75rem] lg:even:translate-y-8"
                data-reveal="scale"
                style={{ "--reveal-delay": `${i * 100}ms` }}
              >
                <Image
                  src={p.src}
                  alt={p.alt[lang]}
                  fill
                  sizes="(min-width: 1024px) 28vw, (min-width: 640px) 50vw, 92vw"
                  quality={85}
                  placeholder="blur"
                  blurDataURL={p.blurDataURL}
                  className={cn("object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105", p.position)}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/35 to-ink/5" />
                <div className="absolute inset-x-0 bottom-0 p-6 text-white sm:p-7">
                  <p className="font-sans text-[11px] font-medium tracking-[0.3em] text-amber-light tabular-nums">0{i + 1}</p>
                  <h3 className="mt-2 font-serif text-2xl leading-tight xl:text-[1.7rem]">{step.title}</h3>
                  <p className="mt-2.5 text-[13.5px] leading-relaxed text-white/80">{step.description}</p>
                </div>
              </li>
            );
          })}
        </ol>
      </Container>
    </section>
  );
}
