import { Check, Minus } from 'lucide-react';
import Reveal from './Reveal';
import Section, { Eyebrow, Heading, Lead } from './Section';

const before = [
  'Multiplication des fichiers Excel',
  'Informations dispersées',
  'Consolidation manuelle',
  'Ressaisies à chaque bilan',
  'Manque de visibilité',
];

const after = [
  'Informations centralisées',
  'Budgets actualisés',
  'Vision globale',
  'Automatisations',
  'Recherche de financements',
];

export default function Positioning() {
  return (
    <Section id="federations">
      <div className="mx-auto max-w-3xl text-center">
        <Reveal>
          <Eyebrow tone="light">Positionnement</Eyebrow>
        </Reveal>
        <Reveal delay={120} className="mt-5">
          <Heading tone="light">
            Vos outils peuvent rester.
            <br />
            <span className="text-ink/45">Votre pilotage se centralise.</span>
          </Heading>
        </Reveal>
        <Reveal delay={240} className="mt-6">
          <Lead tone="light">
            PilotAsso ne vous demande pas de tout remplacer. La plateforme se connecte progressivement à ce que vous
            utilisez déjà, pour vous donner un point central où retrouver l'essentiel.
          </Lead>
        </Reveal>
      </div>

      <div className="mx-auto mt-14 grid max-w-4xl gap-4 sm:grid-cols-2">
        <Reveal from="left" delay={200}>
          <div className="h-full rounded-3xl border border-ink/10 bg-ink/[0.03] p-8">
            <p className="font-mono text-xs uppercase tracking-[0.15em] text-ink/45">Avant PilotAsso</p>
            <ul className="mt-6 flex flex-col gap-4">
              {before.map((item) => (
                <li key={item} className="flex items-start gap-3 text-base text-ink/50">
                  <Minus size={18} className="mt-0.5 shrink-0 text-ink/25" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
        <Reveal from="right" delay={340}>
          <div className="h-full rounded-3xl bg-ink p-8 shadow-[0_30px_60px_-30px_rgba(11,27,51,0.7)]">
            <p className="font-mono text-xs uppercase tracking-[0.15em] text-lime-300">Avec PilotAsso</p>
            <ul className="mt-6 flex flex-col gap-4">
              {after.map((item) => (
                <li key={item} className="flex items-start gap-3 text-base font-medium text-white">
                  <span className="mt-0.5 flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full bg-lime-300">
                    <Check size={12} strokeWidth={3} className="text-ink" />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
