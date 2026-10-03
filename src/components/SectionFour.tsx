import { CalendarCheck, ChevronRight, MessagesSquare, Presentation, type LucideIcon } from 'lucide-react';
import Reveal from './Reveal';
import Section, { Eyebrow, Heading, Lead } from './Section';

const demoPoints: { icon: LucideIcon; title: string; body: string }[] = [
  { icon: Presentation, title: 'Un tour sur mesure', body: 'Le produit présenté avec vos priorités, pas une démo générique.' },
  { icon: MessagesSquare, title: 'Des réponses concrètes', body: 'Vos questions sur la mise en place, traitées une par une.' },
  { icon: CalendarCheck, title: '30 minutes, sans engagement', body: 'À l’heure qui vous convient, en visio.' },
];

export default function SectionFour() {
  return (
    <>
      <Section id="beta">
        <Reveal from="scale">
          <div className="mx-auto max-w-4xl rounded-3xl border border-white/15 bg-white/10 px-6 py-14 text-center backdrop-blur-xl sm:px-12 sm:py-16">
            <Eyebrow>Construit avec le terrain</Eyebrow>
            <p className="mt-6 text-6xl font-semibold tracking-display text-white sm:text-7xl md:text-8xl">14</p>
            <Heading className="mt-2 !text-3xl sm:!text-4xl lg:!text-5xl">
              associations construisent PilotAsso avec nous.
            </Heading>
            <Lead className="mx-auto mt-6 max-w-2xl">
              Le programme bêta reste ouvert aux associations qui veulent influencer directement les prochaines
              évolutions du produit : vos retours d'aujourd'hui deviennent les fonctionnalités de demain.
            </Lead>
            <a
              href="#beta"
              className="mt-9 inline-flex items-center gap-1.5 rounded-full border border-white/25 bg-white/10 px-6 py-3 text-sm text-white backdrop-blur-md transition-colors duration-300 hover:bg-white/20 sm:text-base"
            >
              Découvrir le programme bêta
              <ChevronRight size={16} />
            </a>
          </div>
        </Reveal>
      </Section>

      <Section id="demo">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <Eyebrow>Démo personnalisée</Eyebrow>
          </Reveal>
          <Reveal delay={120} className="mt-5">
            <Heading>
              Et si vous pilotiez enfin votre association depuis un seul endroit ?
            </Heading>
          </Reveal>
          <Reveal delay={240} className="mt-6">
            <Lead>
              Pas de discours commercial générique : une démonstration construite autour de vos données et de vos
              priorités. 30 minutes suffisent pour voir si PilotAsso répond à vos besoins.
            </Lead>
          </Reveal>
        </div>

        <div className="mx-auto mt-14 grid max-w-5xl gap-4 sm:grid-cols-3">
          {demoPoints.map(({ icon: Icon, title, body }, i) => (
            <Reveal key={title} delay={200 + i * 120}>
              <div className="h-full rounded-2xl border border-white/15 bg-white/10 p-6 text-left backdrop-blur-xl">
                <Icon size={20} className="text-white" />
                <h3 className="mt-4 text-lg font-semibold tracking-heading text-white">{title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-white/70">{body}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={500} className="mt-12 flex flex-wrap justify-center gap-3">
          <a
            href="#demo"
            className="inline-flex items-center gap-1.5 rounded-full bg-white px-7 py-3.5 text-base font-medium tracking-snug text-black transition-colors duration-300 hover:bg-white/85"
          >
            Réserver ma démo gratuite
            <ChevronRight size={16} />
          </a>
          <a
            href="#abonnement"
            className="rounded-full border border-white/25 bg-white/10 px-7 py-3.5 text-base text-white backdrop-blur-md transition-colors duration-300 hover:bg-white/20"
          >
            S'abonner
          </a>
        </Reveal>
      </Section>
    </>
  );
}
