import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Icon from "@/components/ui/Icon";
import Ornament from "@/components/ui/Ornament";

// <details>/<summary> gốc của HTML — accordion không cần JavaScript, mở một mục một lúc nhờ name chung.
export default function FAQ({ t }) {
  return (
    <section id="faq" className="py-16 lg:py-20">
      <Container wide className="grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-4 lg:sticky lg:top-28 lg:self-start">
          <SectionHeading eyebrow={t.faq.eyebrow} title={t.faq.title} description={t.faq.description} />
          <Ornament name="lantern" float className="mt-12 hidden w-20 text-ink/[0.08] lg:block" />
        </div>
        <div className="reveal divide-y divide-ink/10 border-y border-ink/10 lg:col-span-8" data-reveal="right">
          {t.faq.items.map((item, i) => (
            <details key={item.q} name="faq" open={i === 0} className="group py-6">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-left font-serif text-xl text-ink sm:text-2xl [&::-webkit-details-marker]:hidden">
                {item.q}
                <span className="flex size-9 shrink-0 items-center justify-center rounded-full border border-ink/15 text-ink transition-all duration-500 group-open:rotate-45 group-open:border-ink group-open:bg-ink group-open:text-white">
                  <Icon name="plus" className="size-4" />
                </span>
              </summary>
              <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-ink-soft">{item.a}</p>
            </details>
          ))}
        </div>
      </Container>
    </section>
  );
}
