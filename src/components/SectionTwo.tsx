import { Banknote, Search, Zap, type LucideIcon } from 'lucide-react';
import Reveal from './Reveal';
import { Eyebrow, Heading, Lead } from './Section';

const pillars: { icon: LucideIcon; title: string; body: string }[] = [
  { icon: Banknote, title: 'Finances', body: 'Budget, réel, écarts et trésorerie au même endroit.' },
  { icon: Search, title: 'Financements', body: 'Les bonnes opportunités repérées plus tôt.' },
  { icon: Zap, title: 'Automatisation', body: 'Moins de saisie, plus de temps pour la mission.' },
];

/** Over the video: kept to the left so the footage stays visible. */
export default function SectionTwo() {
  return (
    <div id="solutions" className="relative isolate max-w-lg text-legible">
      {/* Soft dark halo behind the copy, keeps it readable on bright frames */}
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-x-40 -inset-y-28 -z-10 bg-[radial-gradient(closest-side,rgba(4,8,16,0.7)_0%,rgba(4,8,16,0.5)_45%,transparent_100%)]"
      />
      <Reveal from="left">
        <Eyebrow>Vision à 360°</Eyebrow>
      </Reveal>
      <Reveal from="left" delay={120} className="mt-5">
        <Heading>Tout ce qu'il faut savoir pour piloter. Au même endroit.</Heading>
      </Reveal>
      <Reveal from="left" delay={240} className="mt-6">
        <Lead>
          Finances, financements, activité et gouvernance : chaque décision part d'une information à jour, sans
          naviguer entre dix outils.
        </Lead>
      </Reveal>

      <ul className="mt-10 flex flex-col gap-5 border-l border-white/20 pl-6">
        {pillars.map(({ icon: Icon, title, body }, i) => (
          <Reveal as="li" key={title} from="left" delay={360 + i * 120} className="flex items-start gap-4">
            <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-white/20 bg-white/10 backdrop-blur-md">
              <Icon size={16} className="text-lime-300" />
            </span>
            <div>
              <p className="font-semibold tracking-heading text-white drop-shadow-md">{title}</p>
              <p className="mt-0.5 text-sm text-white/90">{body}</p>
            </div>
          </Reveal>
        ))}
      </ul>
    </div>
  );
}
