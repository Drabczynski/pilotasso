import { useEffect, useRef } from 'react';
import Reveal from './Reveal';


// TODO: placeholder testimonial (fictional association and person).
// Replace with a real, approved quote from a beta association before going live.
const QUOTE = {
  text: 'Avant, préparer un conseil d’administration nous prenait trois soirées de tableurs. Aujourd’hui, une heure suffit. Le reste du temps, on le passe là où ça compte : sur le terrain, avec les familles qu’on accompagne.',
  name: 'Claire Martin',
  role: 'Trésorière bénévole · Les Jardins du Lien',
  initials: 'CM',
};

/** Full-bleed photo with a slow parallax and a testimonial on top. */
export default function Testimonial() {
  const sectionRef = useRef<HTMLElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const img = imgRef.current;
    if (!section || !img) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let raf = 0;
    const update = () => {
      raf = 0;
      const rect = section.getBoundingClientRect();
      if (rect.bottom < 0 || rect.top > window.innerHeight) return;
      // -1 when the section enters from below, +1 when it leaves at the top
      const t = (window.innerHeight - rect.top) / (window.innerHeight + rect.height) * 2 - 1;
      img.style.transform = `translate3d(0, ${t * -6}%, 0) scale(1.15)`;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      aria-label="Témoignage"
      className="relative flex min-h-screen items-end overflow-hidden bg-ink supports-[height:100svh]:min-h-[100svh]"
    >
      <img
        ref={imgRef}
        src="/images/temoignage.jpg"
        srcSet="/images/temoignage-960.jpg 960w, /images/temoignage.jpg 1912w"
        sizes="100vw"
        alt="Une bénévole souriante à son bureau, dans les locaux de l’association"
        loading="lazy"
        className="absolute inset-0 h-full w-full scale-[1.15] object-cover object-[58%_center] will-change-transform"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-[linear-gradient(to_top,rgba(5,10,20,0.9)_0%,rgba(5,10,20,0.35)_45%,rgba(5,10,20,0.1)_100%)] lg:bg-[linear-gradient(to_right,rgba(5,10,20,0.92)_0%,rgba(5,10,20,0.7)_35%,rgba(5,10,20,0.1)_62%,transparent_100%)]"
      />

      <div className="relative w-full px-5 pb-16 pt-40 sm:px-8 sm:pb-24 md:px-12">
        <figure className="mx-auto max-w-6xl">
          <Reveal>
            <span aria-hidden className="block text-7xl font-semibold leading-none text-lime-300 sm:text-8xl">
              “
            </span>
          </Reveal>
          <Reveal as="blockquote" delay={150} className="mt-2 max-w-4xl lg:max-w-[46%]">
            <p className="text-legible text-2xl font-medium leading-[1.25] tracking-heading text-white sm:text-3xl lg:text-[2.1rem] lg:leading-[1.22]">
              {QUOTE.text}
            </p>
          </Reveal>
          <Reveal as="figcaption" delay={300} className="mt-10 flex items-center gap-4">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-lime-300 text-sm font-semibold text-ink">
              {QUOTE.initials}
            </span>
            <span>
              <span className="block font-semibold tracking-snug text-white">{QUOTE.name}</span>
              <span className="block text-sm text-white/70">{QUOTE.role}</span>
            </span>
          </Reveal>
        </figure>
      </div>
    </section>
  );
}
