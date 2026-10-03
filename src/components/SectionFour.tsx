import { ChevronRight } from 'lucide-react';
import Badge from './Badge';
import Reveal from './Reveal';
import Section from './Section';

const demoPoints = [
  { title: 'Un tour sur mesure', body: 'Le produit présenté avec vos priorités, pas une démo générique.' },
  { title: 'Des réponses concrètes', body: 'Vos questions sur la mise en place, traitées une par une.' },
  { title: '30 minutes, sans engagement', body: 'À l’heure qui vous convient, en visio.' },
];

export default function SectionFour() {
  return (
    <Section id="beta">
      <div className="flex flex-col gap-8 sm:flex-row sm:justify-between">
        <Reveal delay={120}>
          <Badge>Construit avec le terrain</Badge>
        </Reveal>
        <Reveal delay={220} className="max-w-sm sm:text-right">
          <p className="text-lg leading-relaxed text-white drop-shadow-md sm:text-xl">
            14 associations participent aujourd'hui à la construction de PilotAsso. Le programme bêta reste
            ouvert.
          </p>
        </Reveal>
      </div>

      <div
        id="demo"
        className="flex flex-1 flex-col justify-end gap-12 pt-12 md:flex-row md:items-end md:justify-between md:gap-16"
      >
        <div className="max-w-xl">
          <Reveal as="h2" delay={180}>
            <span className="block text-5xl font-normal leading-[1.05] tracking-tight text-white drop-shadow-lg sm:text-6xl lg:text-7xl">
              Voyez-le tourner
              <br />
              avec vos données.
            </span>
          </Reveal>
          <Reveal delay={320}>
            <p className="mt-6 max-w-md text-sm text-white/80 drop-shadow-md sm:text-base">
              Pas de discours commercial générique : une démonstration construite autour de votre association,
              et la possibilité d'influencer directement les prochaines évolutions du produit.
            </p>
          </Reveal>
          <Reveal delay={420} className="mt-8 flex flex-wrap gap-3">
            <a
              href="#demo"
              className="inline-flex items-center gap-1 rounded-full bg-white px-5 py-2.5 text-xs font-medium text-black transition-colors duration-300 hover:bg-white/85 sm:text-sm"
            >
              Réserver ma démo gratuite
              <ChevronRight size={14} />
            </a>
            <a
              href="#beta"
              className="rounded-full border border-white/25 bg-white/10 px-5 py-2.5 text-xs text-white backdrop-blur-md transition-colors duration-300 hover:bg-white/20 sm:text-sm"
            >
              Rejoindre le programme bêta
            </a>
          </Reveal>
        </div>

        <div className="w-full max-w-md rounded-2xl border border-white/15 bg-white/10 px-5 backdrop-blur-md sm:px-6">
          {demoPoints.map((item, i) => (
            <Reveal
              key={item.title}
              delay={300 + i * 110}
              className={`flex gap-5 py-5 ${i < demoPoints.length - 1 ? 'border-b border-white/15' : ''}`}
            >
              <span className="pt-1 font-mono text-[11px] tracking-[0.15em] text-white/55">
                {String(i + 1).padStart(2, '0')}
              </span>
              <div>
                <h3 className="text-base font-medium text-white sm:text-lg">{item.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-white/70">{item.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}
