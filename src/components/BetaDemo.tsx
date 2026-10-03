import { ArrowRight, CalendarCheck, ChevronRight, MessagesSquare, Presentation, type LucideIcon } from 'lucide-react';
import Reveal from './Reveal';
import Section from './Section';

const demoPoints: { icon: LucideIcon; title: string; body: string }[] = [
  { icon: Presentation, title: 'Un tour sur mesure', body: 'Le produit présenté avec vos priorités, pas une démo générique.' },
  { icon: MessagesSquare, title: 'Des réponses concrètes', body: 'Vos questions sur la mise en place, traitées une par une.' },
  { icon: CalendarCheck, title: '30 minutes, sans engagement', body: 'À l’heure qui vous convient, en visio.' },
];

export default function BetaDemo() {
  return (
    <>
      <Section id="beta" className="!py-12 sm:!py-16">
        <Reveal from="scale">
          <div className="grid items-center gap-8 rounded-[2rem] bg-lime-300 p-8 sm:p-12 md:grid-cols-[auto_1fr_auto]">
            <p className="text-7xl font-semibold leading-none tracking-display text-ink sm:text-8xl">14</p>
            <div>
              <p className="font-mono text-xs font-medium uppercase tracking-[0.15em] text-ink/60">
                Construit avec le terrain
              </p>
              <p className="mt-2 text-2xl font-semibold leading-tight tracking-heading text-ink sm:text-3xl">
                associations construisent PilotAsso avec nous.
              </p>
              <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-ink/70">
                Le programme bêta reste ouvert aux associations qui veulent influencer directement les prochaines
                évolutions du produit.
              </p>
            </div>
            <a
              href="#beta"
              className="group inline-flex w-fit items-center gap-2 rounded-full bg-ink px-6 py-3 text-sm font-medium text-white transition-colors duration-300 hover:bg-ink/85"
            >
              Rejoindre la bêta
              <ArrowRight size={15} className="transition-transform duration-300 group-hover:translate-x-0.5" />
            </a>
          </div>
        </Reveal>
      </Section>

      <Section id="demo" className="!pb-28 !pt-12 sm:!pb-36 sm:!pt-16">
        <Reveal from="scale">
          <div className="relative overflow-hidden rounded-[2rem] bg-ink px-6 py-16 text-center sm:px-12 sm:py-20">
            <div
              aria-hidden
              className="pointer-events-none absolute -top-40 left-1/2 h-80 w-[40rem] -translate-x-1/2 rounded-full bg-lime-300/20 blur-3xl"
            />
            <p className="relative font-mono text-xs font-medium uppercase tracking-[0.15em] text-lime-300">
              Démo personnalisée
            </p>
            <h2 className="relative mx-auto mt-5 max-w-3xl text-3xl font-semibold leading-[1.08] tracking-display text-white sm:text-4xl lg:text-5xl">
              Et si vous pilotiez enfin votre association depuis un seul endroit ?
            </h2>
            <p className="relative mx-auto mt-6 max-w-2xl text-base leading-relaxed tracking-snug text-white/70 sm:text-lg">
              Pas de discours commercial générique : une démonstration construite autour de vos données et de vos
              priorités. 30 minutes suffisent pour voir si PilotAsso répond à vos besoins.
            </p>

            <div className="relative mx-auto mt-12 grid max-w-4xl gap-4 text-left sm:grid-cols-3">
              {demoPoints.map(({ icon: Icon, title, body }) => (
                <div key={title} className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
                  <Icon size={18} className="text-lime-300" />
                  <h3 className="mt-3 font-semibold tracking-heading text-white">{title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-white/60">{body}</p>
                </div>
              ))}
            </div>

            <div className="relative mt-12 flex flex-wrap justify-center gap-3">
              <a
                href="#demo"
                className="inline-flex items-center gap-1.5 rounded-full bg-lime-300 px-6 py-3 text-sm font-medium tracking-snug text-black shadow-[0_0_40px_-8px_rgba(190,242,100,0.6)] transition-colors duration-300 hover:bg-lime-200 sm:text-base"
              >
                Réserver ma démo gratuite
                <ChevronRight size={16} />
              </a>
              <a
                href="#abonnement"
                className="rounded-full border border-white/20 px-6 py-3 text-sm text-white transition-colors duration-300 hover:bg-white/10 sm:text-base"
              >
                S'abonner
              </a>
            </div>
          </div>
        </Reveal>
      </Section>
    </>
  );
}
