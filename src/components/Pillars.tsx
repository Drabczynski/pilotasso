import type { ReactNode } from 'react';
import { Banknote, CalendarClock, Check, Search, Sparkles, Zap, type LucideIcon } from 'lucide-react';
import { useInView, useSteps } from '../hooks/useInView';
import Reveal from './Reveal';
import Section, { Eyebrow, Heading, Lead } from './Section';

const NB = ' ';

// Unsplash photos (Unsplash License, free for commercial use).
const unsplash = (id: string, w: number) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&h=${Math.round(w * 0.78)}&q=80`;

/* ------------------------------------------------------------ mini demos */

/** Budget vs actual bars grow, then the cash-flow line draws itself. */
function FinanceDemo({ active }: { active: boolean }) {
  const bars = [
    [55, 50],
    [62, 60],
    [60, 66],
    [72, 70],
    [70, 75],
    [80, 78],
  ];
  return (
    <div className="w-72 rounded-2xl border border-white/20 bg-ink/80 p-4 text-white shadow-2xl backdrop-blur-xl">
      <div className="flex items-center justify-between text-[11px] text-white/60">
        <span>Budget vs réalisé</span>
        <span
          className={`rounded-full bg-lime-300/20 px-2 py-0.5 text-lime-200 transition-all delay-[1400ms] duration-500 ${
            active ? 'scale-100 opacity-100' : 'scale-75 opacity-0'
          }`}
        >
          Écart +6{NB}%
        </span>
      </div>
      <div className="relative mt-3 flex h-24 items-end gap-2">
        {bars.map(([planned, actual], i) => (
          <div key={i} className="flex h-full flex-1 items-end gap-0.5">
            <div
              className="flex-1 rounded-t-sm bg-white/25 transition-all duration-700 ease-out"
              style={{ height: active ? `${planned}%` : '4%', transitionDelay: `${i * 90}ms` }}
            />
            <div
              className="flex-1 rounded-t-sm bg-sky-300 transition-all duration-700 ease-out"
              style={{ height: active ? `${actual}%` : '4%', transitionDelay: `${i * 90 + 60}ms` }}
            />
          </div>
        ))}
        <svg viewBox="0 0 100 40" preserveAspectRatio="none" className="pointer-events-none absolute inset-0 h-full w-full">
          <path
            d="M0 32 L20 28 L40 30 L60 20 L80 16 L100 6"
            fill="none"
            stroke="#bef264"
            strokeWidth="1.6"
            vectorEffect="non-scaling-stroke"
            pathLength={1}
            strokeDasharray="1"
            className="transition-[stroke-dashoffset] delay-700 duration-[1200ms] ease-out"
            style={{ strokeDashoffset: active ? 0 : 1 }}
          />
        </svg>
      </div>
      <p className="mt-2 flex items-center gap-1.5 text-[10px] text-white/55">
        <i className="h-0.5 w-3 rounded bg-lime-300" /> Trésorerie prévisionnelle{NB}: +24{NB}800{NB}€
      </p>
    </div>
  );
}

/** Matching grants appear one by one, the best one is added to the follow-up. */
function FundingDemo({ active }: { active: boolean }) {
  const step = useSteps(active, 4, 550);
  const items = [
    { name: 'Fonds vie associative', match: 92, date: '14 nov.' },
    { name: 'Fondation Solidarités', match: 81, date: '2 déc.' },
    { name: 'Appel à projets Jeunesse', match: 74, date: '9 janv.' },
  ];
  return (
    <div className="w-80 rounded-2xl border border-white/20 bg-ink/80 p-4 text-white shadow-2xl backdrop-blur-xl">
      <p className="flex items-center gap-1.5 text-[11px] text-white/60">
        <Sparkles size={12} className="text-amber-200" /> Opportunités pour votre association
      </p>
      <ul className="mt-3 flex flex-col gap-2">
        {items.map((item, i) => (
          <li
            key={item.name}
            className={`flex items-center justify-between gap-3 rounded-lg border px-3 py-2 transition-all duration-500 ${
              step > i ? 'translate-x-0 opacity-100' : 'translate-x-6 opacity-0'
            } ${i === 0 && step > 3 ? 'border-lime-300/60 bg-lime-300/10' : 'border-white/10 bg-white/[0.05]'}`}
          >
            <span className="min-w-0">
              <span className="block truncate text-[12px] font-medium">{item.name}</span>
              <span className="flex items-center gap-1 text-[10px] text-white/50">
                <CalendarClock size={10} /> Clôture le {item.date}
              </span>
            </span>
            {i === 0 && step > 3 ? (
              <span className="flex shrink-0 items-center gap-1 rounded-full bg-lime-300 px-2 py-0.5 text-[10px] font-medium text-ink">
                <Check size={10} /> Suivi
              </span>
            ) : (
              <span className="shrink-0 rounded-full bg-emerald-400/20 px-2 py-0.5 text-[10px] text-emerald-100">
                {item.match}{NB}%
              </span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

/** Uncategorised bank lines get classified automatically, the counter drops. */
function AutomationDemo({ active }: { active: boolean }) {
  const step = useSteps(active, 4, 650);
  const rows = [
    { label: 'VIR Conseil régional', amount: '+8 000 €', cat: 'Subvention' },
    { label: 'CB Jardinerie du quartier', amount: '−142 €', cat: 'Projet Jardins' },
    { label: 'PRLV Assurance locaux', amount: '−310 €', cat: 'Frais généraux' },
    { label: 'VIR Cotisation adhérent', amount: '+30 €', cat: 'Cotisations' },
  ];
  const left = 33 - step * 8 - (step === 4 ? 1 : 0);
  return (
    <div className="w-80 rounded-2xl border border-white/20 bg-ink/80 p-4 text-white shadow-2xl backdrop-blur-xl">
      <div className="flex items-center justify-between text-[11px] text-white/60">
        <span className="flex items-center gap-1.5">
          <Zap size={12} className="text-lime-300" /> Transactions
        </span>
        <span className={left === 0 ? 'text-lime-200' : ''}>
          {left === 0 ? 'Tout est classé' : `${left} à classer`}
        </span>
      </div>
      <ul className="mt-3 flex flex-col gap-1.5">
        {rows.map((row, i) => {
          const done = step > i;
          return (
            <li key={row.label} className="flex items-center justify-between gap-2 rounded-lg bg-white/[0.05] px-3 py-2">
              <span className="min-w-0">
                <span className="block truncate text-[11px]">{row.label}</span>
                <span className="text-[10px] text-white/45">{row.amount.replace(' ', NB).replace(' €', `${NB}€`)}</span>
              </span>
              <span
                className={`flex shrink-0 items-center gap-1 rounded-full px-2 py-0.5 text-[10px] transition-all duration-500 ${
                  done ? 'bg-lime-300 font-medium text-ink' : 'bg-white/10 text-white/50'
                }`}
              >
                {done && <Check size={10} />}
                {done ? row.cat : 'À classer'}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

/* ---------------------------------------------------------------- layout */

type Feature = {
  icon: LucideIcon;
  eyebrow: string;
  title: string;
  body: string;
  points: string[];
  photo: { id: string; alt: string };
  Demo: (props: { active: boolean }) => ReactNode;
};

const features: Feature[] = [
  {
    icon: Banknote,
    eyebrow: 'Finances',
    title: 'Du budget à la trésorerie, anticipez plutôt que subir.',
    body: 'Budget, réel, écarts et trésorerie au même endroit. Les projections vous montrent où vous allez, pas seulement où vous en êtes.',
    points: ['Budget et réalisé comparés en continu', 'Projections de trésorerie', 'Écarts visibles avant qu’ils ne bloquent'],
    photo: { id: 'photo-1517048676732-d65bc937f952', alt: 'Une équipe autour d’une table, en réunion de travail' },
    Demo: FinanceDemo,
  },
  {
    icon: Search,
    eyebrow: 'Financements',
    title: 'Ne passez plus à côté d’une opportunité.',
    body: 'PilotAsso repère les appels à projets et subventions pertinents pour votre association, et centralise le suivi de toutes vos échéances.',
    points: ['Opportunités identifiées plus tôt', 'Échéances centralisées', 'Suivi unifié de vos financeurs'],
    photo: { id: 'photo-1599059813005-11265ba4b4ce', alt: 'Des bénévoles trient des dons alimentaires' },
    Demo: FundingDemo,
  },
  {
    icon: Zap,
    eyebrow: 'Automatisation',
    title: 'Moins de tâches répétitives, plus de temps pour la mission.',
    body: 'Les transactions bancaires sont classées automatiquement et les bilans se préparent tout seuls. Le temps gagné revient à vos projets.',
    points: ['Moins de saisie manuelle', 'Aide intelligente à la recherche', 'Préparation des bilans plus rapide'],
    photo: { id: 'photo-1787647561633-dcbbad61f227', alt: 'Une bénévole souriante travaille sur son ordinateur' },
    Demo: AutomationDemo,
  },
];

function FeatureRow({ feature, index }: { feature: Feature; index: number }) {
  const [ref, active] = useInView<HTMLDivElement>(0.35);
  const flip = index % 2 === 1;
  const { icon: Icon, Demo } = feature;
  return (
    <div ref={ref} className="grid items-center gap-10 md:grid-cols-2 lg:gap-16">
      <Reveal from={flip ? 'right' : 'left'} className={`relative ${flip ? 'md:order-2' : ''}`}>
        <div className="relative overflow-hidden rounded-3xl shadow-[0_30px_60px_-30px_rgba(11,27,51,0.5)]">
          <img
            src={unsplash(feature.photo.id, 1100)}
            srcSet={`${unsplash(feature.photo.id, 700)} 700w, ${unsplash(feature.photo.id, 1100)} 1100w`}
            sizes="(min-width: 768px) 50vw, 100vw"
            alt={feature.photo.alt}
            loading="lazy"
            className={`aspect-[4/3] w-full object-cover transition-transform duration-[2000ms] ease-out ${
              active ? 'scale-100' : 'scale-110'
            }`}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/40 via-transparent to-transparent" />
        </div>
        <div
          className={`relative -mt-16 flex justify-center transition-all delay-300 duration-700 ease-out md:absolute md:-bottom-8 md:mt-0 md:block ${
            flip ? 'md:-left-8' : 'md:-right-8'
          } ${active ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}
        >
          <Demo active={active} />
        </div>
      </Reveal>

      <div className={flip ? 'md:order-1' : ''}>
        <Reveal>
          <span className="inline-flex items-center gap-2 rounded-full bg-lime-300 px-3 py-1 text-xs font-medium text-ink">
            <Icon size={14} /> {feature.eyebrow}
          </span>
        </Reveal>
        <Reveal delay={100} className="mt-5">
          <h3 className="text-2xl font-semibold leading-[1.12] tracking-display text-ink sm:text-3xl">{feature.title}</h3>
        </Reveal>
        <Reveal delay={200} className="mt-4">
          <p className="text-base leading-relaxed text-ink/65 sm:text-lg">{feature.body}</p>
        </Reveal>
        <ul className="mt-6 flex flex-col gap-3">
          {feature.points.map((point, i) => (
            <Reveal as="li" key={point} delay={300 + i * 100} className="flex items-start gap-3 text-[15px] text-ink/80">
              <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-ink text-lime-300">
                <Check size={12} strokeWidth={3} />
              </span>
              {point}
            </Reveal>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default function Pillars() {
  return (
    <Section id="fonctionnalites">
      <div className="mx-auto max-w-2xl text-center">
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

      <div className="mt-20 flex flex-col gap-28 sm:gap-36">
        {features.map((feature, i) => (
          <FeatureRow key={feature.eyebrow} feature={feature} index={i} />
        ))}
      </div>
    </Section>
  );
}
