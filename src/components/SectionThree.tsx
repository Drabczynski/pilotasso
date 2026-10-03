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

export default function SectionThree() {
  return (
    <Section id="federations">
      <div className="mx-auto max-w-3xl text-center">
        <Reveal>
          <Eyebrow>Positionnement</Eyebrow>
        </Reveal>
        <Reveal delay={120} className="mt-5">
          <Heading>
            Vos outils peuvent rester.
            <br />
            <span className="text-white/75">Votre pilotage se centralise.</span>
          </Heading>
        </Reveal>
        <Reveal delay={240} className="mt-6">
          <Lead>
            PilotAsso ne vous demande pas de tout remplacer. La plateforme se connecte progressivement à ce que vous
            utilisez déjà, pour vous donner un point central où retrouver l'essentiel — à votre rythme.
          </Lead>
        </Reveal>
      </div>

      <div className="mx-auto mt-16 grid max-w-4xl overflow-hidden rounded-3xl border border-white/15 backdrop-blur-xl sm:grid-cols-2">
        <Reveal from="left" delay={200} className="bg-white/[0.06] p-7 sm:p-9">
          <p className="font-mono text-xs uppercase tracking-[0.15em] text-white/50">Avant PilotAsso</p>
          <ul className="mt-6 flex flex-col gap-4">
            {before.map((item) => (
              <li key={item} className="flex items-start gap-3 text-base text-white/55">
                <Minus size={18} className="mt-0.5 shrink-0 text-white/30" />
                {item}
              </li>
            ))}
          </ul>
        </Reveal>
        <Reveal from="right" delay={340} className="bg-white/15 p-7 sm:p-9">
          <p className="font-mono text-xs uppercase tracking-[0.15em] text-emerald-200">Avec PilotAsso</p>
          <ul className="mt-6 flex flex-col gap-4">
            {after.map((item) => (
              <li key={item} className="flex items-start gap-3 text-base font-medium text-white">
                <span className="mt-0.5 flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full bg-emerald-300">
                  <Check size={12} strokeWidth={3} className="text-[#0a0a0a]" />
                </span>
                {item}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </Section>
  );
}
