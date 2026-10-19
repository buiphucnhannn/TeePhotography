import Hero from "@/components/sections/Hero";
import Marquee from "@/components/sections/Marquee";
import About from "@/components/sections/About";
import Collections from "@/components/sections/Collections";
import Gallery from "@/components/sections/Gallery";
import Services from "@/components/sections/Services";
import Process from "@/components/sections/Process";
import Testimonials from "@/components/sections/Testimonials";
import Pricing from "@/components/sections/Pricing";
import CtaBand from "@/components/sections/CtaBand";
import FAQ from "@/components/sections/FAQ";
import { getDictionary } from "@/data/dictionaries";
import { byCollection, featured, photos } from "@/data/gallery";

export default async function HomePage({ params }) {
  const { lang } = await params;
  const t = getDictionary(lang);

  const collections = Object.entries(t.collections.items).map(([id, text]) => ({
    id,
    ...text,
    cover: featured.collections[id],
    count: byCollection(id).length,
  }));

  return (
    <>
      <Hero lang={lang} t={t} photos={featured.hero} />
      <Marquee items={t.marquee} />
      <About lang={lang} t={t} photos={featured.about} />
      <Collections lang={lang} t={t} items={collections} />
      <Gallery lang={lang} t={t} photos={photos} collections={collections} />
      <Services lang={lang} t={t} photos={featured.services} />
      <Process lang={lang} t={t} photos={featured.process} />
      <Testimonials lang={lang} t={t} photos={photos} />
      <Pricing lang={lang} t={t} />
      <CtaBand lang={lang} t={t} photo={featured.cta} />
      <FAQ t={t} />
    </>
  );
}
