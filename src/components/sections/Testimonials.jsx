import Image from "next/image";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Icon from "@/components/ui/Icon";

/**
 * Lời cảm ơn: nền tối với 2 dải ảnh marquee chạy ngược chiều phía sau (theo mẫu RentalInfo của ButStudio),
 * phủ tối để chữ dễ đọc; card kính mờ.
 */
export default function Testimonials({ lang, t, photos }) {
  const rows = [photos.slice(0, 5), photos.slice(5, 10), photos.slice(10, 15)];

  return (
    <section id="testimonials" data-nav-theme="dark" className="relative isolate overflow-hidden bg-ink py-16 text-white lg:py-20">
      {/* Collage nền */}
      <div className="pointer-events-none absolute inset-0 -z-10 flex flex-col gap-3 opacity-70" aria-hidden="true">
        {rows.map((row, r) => (
          <div key={r} className="marquee min-h-0 flex-1 overflow-hidden">
            <div className={`marquee-track h-full gap-3 ${r % 2 ? "reverse" : ""}`} style={{ "--marquee-duration": `${90 + r * 15}s` }}>
              {[0, 1].map((half) => (
                <div key={half} className="flex h-full shrink-0 gap-3">
                  {[...row, ...row].map((p, k) => (
                    <div key={`${half}-${k}`} className="relative aspect-[3/2] h-full shrink-0 overflow-hidden rounded-2xl">
                      <Image src={p.src} alt="" fill sizes="520px" className="object-cover" />
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="absolute inset-0 -z-10 bg-ink/70" aria-hidden="true" />

      <Container wide className="relative">
        <SectionHeading eyebrow={t.testimonials.eyebrow} title={t.testimonials.title} align="center" light />

        <div className="no-scrollbar mt-8 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-4 max-sm:-mx-5 sm:mt-10 sm:grid sm:gap-5 sm:overflow-visible sm:px-0 sm:pb-0 lg:grid-cols-3">
          {t.testimonials.items.map((item, i) => (
            <figure
              key={item.name}
              className="reveal flex h-full w-[84vw] shrink-0 snap-center flex-col rounded-[1.5rem] border border-white/15 bg-white/10 p-7 backdrop-blur-md transition-all duration-500 hover:-translate-y-1 hover:bg-white/15 sm:w-auto sm:rounded-[1.75rem] sm:p-10"
              style={{ "--reveal-delay": `${i * 100}ms` }}
            >
              <Icon name="quote" className="size-8 text-amber-light" />
              <blockquote className="mt-5 flex-1 font-serif text-xl leading-relaxed text-white">“{item.quote}”</blockquote>
              <figcaption className="mt-8 flex items-center gap-4 border-t border-white/15 pt-6">
                <span className="flex size-11 items-center justify-center rounded-full bg-white/15 font-serif text-lg text-white">
                  {item.name.charAt(0)}
                </span>
                <div>
                  <p className="text-sm font-medium text-white">{item.name}</p>
                  <p className="mt-0.5 flex items-center gap-1.5 text-xs text-white/60">
                    <Icon name="globe" className="size-3.5" />
                    {item.origin}
                  </p>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </Container>
    </section>
  );
}
