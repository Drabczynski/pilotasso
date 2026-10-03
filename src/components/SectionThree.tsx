import { Check, Minus } from 'lucide-react';
import Badge from './Badge';
import Reveal from './Reveal';
import Section from './Section';

const before = [
  'Multiplication des fichiers Excel',
  'Informations dispersées',
  'Consolidation manuelle',
  'Ressaisies',
  'Manque de visibilité',
];

const after = [
  'Informations centralisées',
  'Budgets actualisés',
  'Vision globale',
  'Automatisations',
  'Recherche de financements',
];

export default function SectionThree() {
  return (
    <Section id="federations">
      <div className="flex flex-col gap-8 sm:flex-row sm:justify-between">
        <Reveal delay={120}>
          <Badge>Positionnement</Badge>
        </Reveal>
        <Reveal delay={220} className="max-w-sm sm:text-right">
          <p className="text-lg leading-relaxed text-white drop-shadow-md sm:text-xl">
            PilotAsso ne vous demande pas de tout remplacer. La plateforme se branche progressivement sur ce
            que vous utilisez déjà.
          </p>
        </Reveal>
      </div>

      <div className="flex flex-1 flex-col justify-end gap-12 pt-12 md:flex-row md:items-end md:justify-between md:gap-16">
        <Reveal as="h2" delay={180} className="max-w-xl">
          <span className="block text-5xl font-normal leading-[1.05] tracking-tight text-white drop-shadow-lg sm:text-6xl lg:text-7xl">
            Vos outils restent.
            <br />
            Le pilotage se centralise.
          </span>
        </Reveal>

        <div className="grid w-full max-w-xl grid-cols-1 overflow-hidden rounded-2xl border border-white/15 bg-white/10 backdrop-blur-md sm:grid-cols-2">
          <Reveal delay={300} className="border-b border-white/15 p-5 sm:border-b-0 sm:border-r sm:p-6">
            <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.15em] text-white/55">Avant</p>
            <ul className="flex flex-col gap-3">
              {before.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm text-white/60">
                  <Minus size={16} className="mt-0.5 shrink-0 text-white/35" />
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={410} className="bg-white/10 p-5 sm:p-6">
            <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.15em] text-white">Avec PilotAsso</p>
            <ul className="flex flex-col gap-3">
              {after.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm text-white">
                  <Check size={16} className="mt-0.5 shrink-0 text-white" />
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
