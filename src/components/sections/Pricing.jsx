import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";
import Ornament from "@/components/ui/Ornament";
import { cn } from "@/lib/utils";

export default function Pricing({ lang, t }) {
  return (
    <section id="pricing" className="relative overflow-hidden bg-paper-100 py-16 lg:py-20">
      <Ornament name="aperture" float className="absolute -left-10 bottom-10 hidden w-56 text-ink/[0.06] lg:block" />
      <Ornament name="sparkle" float delay={1200} className="absolute top-24 right-[8%] hidden w-10 text-amber/40 lg:block" />
      <Container wide className="relative">
        <SectionHeading eyebrow={t.pricing.eyebrow} title={t.pricing.title} description={t.pricing.description} align="center" />

        <div className="mt-10 grid items-stretch gap-5 lg:grid-cols-3 lg:gap-6">
          {t.pricing.plans.map((plan, i) => (
            <article
              key={plan.name}
              className={cn(
                "reveal relative flex h-full flex-col rounded-[1.75rem] p-8 sm:p-10",
                plan.featured ? "overflow-hidden bg-gradient-to-br from-[#4a3b32] via-[#3a2f29] to-[#2a2320] text-white shadow-soft lg:-my-5 lg:py-14" : "bg-white text-ink shadow-card"
              )}
              data-reveal={plan.featured ? "scale" : i === 0 ? "left" : "right"}
              style={{ "--reveal-delay": `${plan.featured ? 0 : 150}ms` }}
            >
              {plan.featured && <span aria-hidden className="pointer-events-none absolute -top-24 -right-24 size-64 rounded-full bg-amber/25 blur-[90px]" />}
              {plan.featured && (
                <span className="absolute top-8 right-8 rounded-full bg-amber-light px-3 py-1 text-[10px] font-semibold tracking-[0.2em] text-ink uppercase shadow-[0_0_0_4px_rgba(241,215,187,0.25)]">
                  {t.pricing.popular}
                </span>
              )}
              <h3 className="text-[11px] font-semibold tracking-eyebrow uppercase">{plan.name}</h3>
              <p className={cn("mt-2 text-sm", plan.featured ? "text-white/60" : "text-ink-muted")}>{plan.duration}</p>
              <p className="mt-8 font-serif text-4xl sm:text-5xl">{plan.price}</p>
              <p className={cn("mt-1 text-sm", plan.featured ? "text-white/60" : "text-ink-muted")}>{plan.alt}</p>
              <ul className="mt-8 flex-1 space-y-3 text-[15px]">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-3">
                    <Icon name="check" className="mt-1 size-4 shrink-0 text-amber" strokeWidth={2} />
                    <span className={plan.featured ? "text-white/85" : "text-ink-soft"}>{f}</span>
                  </li>
                ))}
              </ul>
              <Button data-booking={plan.name} variant={plan.featured ? "pill" : "outline"} className="mt-10 w-full">
                {t.pricing.cta}
              </Button>
            </article>
          ))}
        </div>
        <p className="reveal mx-auto mt-8 max-w-2xl text-center text-xs text-ink-muted">{t.pricing.note}</p>
      </Container>
    </section>
  );
}
