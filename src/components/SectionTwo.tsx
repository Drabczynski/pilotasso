import { ChevronRight } from 'lucide-react';
import Badge from './Badge';
import Reveal from './Reveal';
import Section from './Section';

const capabilities = [
  {
    title: 'Finances',
    body: 'Budget et réalisé comparés en continu, projections de trésorerie, écarts visibles avant qu’ils ne bloquent.',
  },
  {
    title: 'Financements',
    body: 'Les opportunités adaptées à votre association repérées plus tôt, échéances et financeurs suivis au même endroit.',
  },
  {
    title: 'Automatisation',
    body: 'Moins de saisie et de ressaisie : le temps passé à rassembler l’information revient à la décision.',
  },
];

export default function SectionTwo() {
  return (
    <Section id="solutions">
      <div className="flex flex-col gap-8 sm:flex-row sm:justify-between">
        <Reveal delay={120}>
          <Badge>Vision à 360°</Badge>
        </Reveal>
        <Reveal delay={220} className="max-w-sm sm:text-right">
          <p className="text-lg leading-relaxed text-white drop-shadow-md sm:text-xl">
            Finances, financements, activité, gouvernance — tout ce qu'il faut savoir pour piloter, sans
            naviguer entre dix outils.
          </p>
        </Reveal>
      </div>

      <div className="flex flex-1 flex-col justify-end gap-12 pt-12 md:flex-row md:items-end md:justify-between md:gap-16">
        <div className="max-w-xl">
          <Reveal as="h2" delay={180}>
            <span className="block text-5xl font-normal leading-[1.05] tracking-tight text-white drop-shadow-lg sm:text-6xl lg:text-7xl">
              Anticiper
              <br />
              plutôt que subir.
            </span>
          </Reveal>
          <Reveal delay={320}>
            <p className="mt-6 max-w-md text-sm text-white/80 drop-shadow-md sm:text-base">
              Budget, réel, écarts et trésorerie au même endroit, avec des projections qui vous laissent
              prendre les décisions avant de les découvrir trop tard.
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
              href="#abonnement"
              className="rounded-full border border-white/25 bg-white/10 px-5 py-2.5 text-xs text-white backdrop-blur-md transition-colors duration-300 hover:bg-white/20 sm:text-sm"
            >
              S'abonner
            </a>
          </Reveal>
        </div>

        <div className="w-full max-w-md rounded-2xl border border-white/15 bg-white/10 px-5 backdrop-blur-md sm:px-6">
          {capabilities.map((item, i) => (
            <Reveal
              key={item.title}
              delay={300 + i * 110}
              className={`group flex gap-5 py-5 ${i < capabilities.length - 1 ? 'border-b border-white/15' : ''}`}
            >
              <span className="pt-1 font-mono text-[11px] tracking-[0.15em] text-white/55">
                {String(i + 1).padStart(2, '0')}
              </span>
              <div>
                <h3 className="flex items-center gap-1 text-base font-medium text-white sm:text-lg">
                  {item.title}
                  <ChevronRight
                    size={16}
                    className="text-white/40 transition-all duration-300 group-hover:translate-x-0.5 group-hover:text-white"
                  />
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-white/70">{item.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}
