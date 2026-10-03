import { Banknote, Check, Search, Zap, type LucideIcon } from 'lucide-react';
import Reveal from './Reveal';
import Section, { Eyebrow, Heading, Lead } from './Section';

const pillars: { icon: LucideIcon; title: string; body: string; points: string[] }[] = [
  {
    icon: Banknote,
    title: 'Finances',
    body: 'Budget, réel, écarts et trésorerie au même endroit, avec des projections qui vous laissent décider avant de subir.',
    points: ['Budget et réalisé comparés en continu', 'Projections de trésorerie', 'Écarts visibles avant qu’ils ne bloquent'],
  },
  {
    icon: Search,
    title: 'Financements',
    body: 'Les opportunités pertinentes pour votre association repérées plus tôt, et toutes vos échéances suivies au même endroit.',
    points: ['Opportunités identifiées plus tôt', 'Échéances centralisées', 'Suivi unifié de vos financeurs'],
  },
  {
    icon: Zap,
    title: 'Automatisation',
    body: 'Moins de saisie, moins de ressaisie : le temps passé à rassembler l’information revient à votre mission.',
    points: ['Moins de saisie manuelle', 'Aide intelligente à la recherche', 'Préparation des bilans plus rapide'],
  },
];

export default function SectionTwo() {
  return (
    <Section id="solutions">
      <div className="mx-auto max-w-3xl text-center">
        <Reveal>
          <Eyebrow>Vision à 360°</Eyebrow>
        </Reveal>
        <Reveal delay={120} className="mt-5">
          <Heading>Tout ce qu'il faut savoir pour piloter. Au même endroit.</Heading>
        </Reveal>
        <Reveal delay={240} className="mt-6">
          <Lead>
            Combien de fichiers devez-vous ouvrir pour savoir où en est votre association ? Finances, financements,
            activité et gouvernance : PilotAsso rassemble l'essentiel pour que chaque décision parte d'une information
            à jour, sans naviguer entre dix outils.
          </Lead>
        </Reveal>
      </div>

      <div className="mt-16 grid gap-4 md:grid-cols-3">
        {pillars.map(({ icon: Icon, title, body, points }, i) => (
          <Reveal key={title} delay={200 + i * 140} from="scale">
            <div className="h-full rounded-2xl border border-white/15 bg-white/10 p-6 backdrop-blur-xl transition-colors duration-300 hover:bg-white/15 sm:p-7">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/20 bg-white/10">
                <Icon size={18} className="text-white" />
              </span>
              <h3 className="mt-5 text-xl font-semibold tracking-heading text-white sm:text-2xl">{title}</h3>
              <p className="mt-3 text-[15px] leading-relaxed text-white/75">{body}</p>
              <ul className="mt-5 flex flex-col gap-2.5 border-t border-white/10 pt-5">
                {points.map((point) => (
                  <li key={point} className="flex items-start gap-2.5 text-sm text-white/85">
                    <Check size={15} className="mt-0.5 shrink-0 text-emerald-300" />
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
