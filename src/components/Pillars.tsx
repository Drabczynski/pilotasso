import { Banknote, Check, Search, Zap, type LucideIcon } from 'lucide-react';
import Reveal from './Reveal';
import Section, { Eyebrow, Heading, Lead } from './Section';

const pillars: { icon: LucideIcon; title: string; body: string; points: string[] }[] = [
  {
    icon: Banknote,
    title: 'Du budget à la trésorerie',
    body: 'Budget, réel, écarts et trésorerie au même endroit, avec des projections pour anticiper plutôt que subir.',
    points: ['Budget et réalisé comparés en continu', 'Projections de trésorerie', 'Écarts visibles avant qu’ils ne bloquent'],
  },
  {
    icon: Search,
    title: 'Les financements',
    body: 'Les opportunités pertinentes pour votre association repérées plus tôt, et toutes vos échéances au même endroit.',
    points: ['Opportunités identifiées plus tôt', 'Échéances centralisées', 'Suivi unifié de vos financeurs'],
  },
  {
    icon: Zap,
    title: 'Les tâches répétitives',
    body: 'L’automatisation libère vos équipes : moins de temps à rassembler l’information, plus de temps pour décider.',
    points: ['Moins de saisie manuelle', 'Aide intelligente à la recherche', 'Préparation des bilans plus rapide'],
  },
];

export default function Pillars() {
  return (
    <Section id="fonctionnalites">
      <div className="max-w-2xl">
        <Reveal>
          <Eyebrow tone="light">La plateforme</Eyebrow>
        </Reveal>
        <Reveal delay={120} className="mt-5">
          <Heading tone="light">Trois sujets qui vous prennent du temps. Une seule plateforme.</Heading>
        </Reveal>
        <Reveal delay={240} className="mt-6">
          <Lead tone="light">
            PilotAsso rassemble ce qu'il faut connaître pour piloter votre association, sans naviguer entre dix
            outils différents.
          </Lead>
        </Reveal>
      </div>

      <div className="mt-14 grid gap-5 md:grid-cols-3">
        {pillars.map(({ icon: Icon, title, body, points }, i) => (
          <Reveal key={title} delay={150 + i * 130}>
            <div className="group h-full rounded-3xl border border-ink/10 bg-white p-7 shadow-[0_1px_0_rgba(11,27,51,0.04)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_50px_-24px_rgba(11,27,51,0.35)]">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-lime-300 text-ink">
                <Icon size={20} />
              </span>
              <h3 className="mt-6 text-xl font-semibold tracking-heading text-ink">{title}</h3>
              <p className="mt-3 text-[15px] leading-relaxed text-ink/65">{body}</p>
              <ul className="mt-6 flex flex-col gap-2.5 border-t border-ink/10 pt-6">
                {points.map((point) => (
                  <li key={point} className="flex items-start gap-2.5 text-sm text-ink/80">
                    <Check size={15} className="mt-0.5 shrink-0 text-lime-600" />
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
