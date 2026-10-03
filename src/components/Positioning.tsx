import {
  ArrowDown,
  Bell,
  Check,
  FileSpreadsheet,
  FileText,
  FolderOpen,
  Hexagon,
  Landmark,
  Minus,
  PieChart,
  Wallet,
  type LucideIcon,
} from 'lucide-react';
import { useInView } from '../hooks/useInView';
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

type Node = { icon: LucideIcon; label: string; y: number };

// Coordinates in a 1000 × 360 canvas; nodes are placed in % of it.
const sources: Node[] = [
  { icon: FileSpreadsheet, label: 'Vos tableurs', y: 50 },
  { icon: Landmark, label: 'Votre banque', y: 136 },
  { icon: FolderOpen, label: 'Dossiers partagés', y: 222 },
  { icon: FileText, label: 'Logiciel comptable', y: 308 },
];
const outputs: Node[] = [
  { icon: Wallet, label: 'Budget à jour', y: 90 },
  { icon: Bell, label: 'Alertes utiles', y: 180 },
  { icon: PieChart, label: 'Bilans prêts', y: 270 },
];
const HUB = { x: 500, y: 180 };

function Chip({ node, tone }: { node: Node; tone: 'source' | 'output' }) {
  const Icon = node.icon;
  return (
    <div
      className={`flex items-center gap-2.5 rounded-xl border px-3.5 py-2.5 text-sm font-medium shadow-sm ${
        tone === 'source' ? 'border-ink/10 bg-white text-ink/75' : 'border-lime-300/70 bg-lime-300/25 text-ink'
      }`}
    >
      <Icon size={16} className={tone === 'source' ? 'text-ink/40' : 'text-ink'} />
      {node.label}
    </div>
  );
}

/** Existing tools flow into PilotAsso, which turns them into usable outputs. */
function ConnectDiagram() {
  const [ref, active] = useInView<HTMLDivElement>(0.4);

  const curve = (x1: number, y1: number, x2: number, y2: number) => {
    const mid = (x1 + x2) / 2;
    return `M${x1} ${y1} C${mid} ${y1}, ${mid} ${y2}, ${x2} ${y2}`;
  };

  return (
    <div ref={ref} className="mx-auto mt-14 max-w-5xl rounded-3xl border border-ink/10 bg-white/70 p-6 sm:p-10">
      {/* Desktop: animated connectors */}
      <div className="relative hidden aspect-[1000/360] md:block">
        <svg viewBox="0 0 1000 360" className="absolute inset-0 h-full w-full" fill="none">
          {[
            ...sources.map((s) => curve(235, s.y, HUB.x - 110, HUB.y)),
            ...outputs.map((o) => curve(HUB.x + 110, HUB.y, 765, o.y)),
          ].map((d, i) => (
            <g key={d}>
              <path
                d={d}
                stroke="rgba(11,27,51,0.12)"
                strokeWidth="2"
                pathLength={1}
                strokeDasharray="1"
                className="transition-[stroke-dashoffset] duration-1000 ease-out"
                style={{ strokeDashoffset: active ? 0 : 1, transitionDelay: `${i * 120}ms` }}
              />
              <path
                d={d}
                stroke={i < sources.length ? '#0b1b33' : '#65a30d'}
                strokeWidth="2"
                strokeDasharray="4 8"
                className={`animate-flow transition-opacity duration-500 ${active ? 'opacity-60' : 'opacity-0'}`}
                style={{ transitionDelay: `${900 + i * 100}ms` }}
              />
            </g>
          ))}
        </svg>

        {sources.map((node, i) => (
          <div
            key={node.label}
            className={`absolute left-0 w-[23.5%] -translate-y-1/2 transition-all duration-500 ${
              active ? 'translate-x-0 opacity-100' : '-translate-x-6 opacity-0'
            }`}
            style={{ top: `${(node.y / 360) * 100}%`, transitionDelay: `${i * 120}ms` }}
          >
            <Chip node={node} tone="source" />
          </div>
        ))}

        <div
          className="absolute -translate-x-1/2 -translate-y-1/2"
          style={{ left: `${(HUB.x / 1000) * 100}%`, top: `${(HUB.y / 360) * 100}%` }}
        >
          <div className={`relative transition-all delay-500 duration-700 ${active ? 'scale-100 opacity-100' : 'scale-75 opacity-0'}`}>
            <span className="absolute inset-0 animate-pulse-ring rounded-2xl bg-lime-300/40" />
            <div className="relative flex items-center gap-3 rounded-2xl bg-ink px-6 py-5 text-white shadow-[0_20px_50px_-15px_rgba(11,27,51,0.6)]">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-lime-300 text-ink">
                <Hexagon size={20} strokeWidth={2} />
              </span>
              <span>
                <span className="block text-base font-semibold tracking-snug">PilotAsso</span>
                <span className="block text-xs text-white/60">Tout centralisé</span>
              </span>
            </div>
          </div>
        </div>

        {outputs.map((node, i) => (
          <div
            key={node.label}
            className={`absolute right-0 w-[23.5%] -translate-y-1/2 transition-all duration-500 ${
              active ? 'translate-x-0 opacity-100' : 'translate-x-6 opacity-0'
            }`}
            style={{ top: `${(node.y / 360) * 100}%`, transitionDelay: `${1300 + i * 150}ms` }}
          >
            <Chip node={node} tone="output" />
          </div>
        ))}
      </div>

      {/* Mobile: stacked version */}
      <div className="flex flex-col items-center gap-3 md:hidden">
        <div className="grid w-full grid-cols-2 gap-2">
          {sources.map((node) => (
            <Chip key={node.label} node={node} tone="source" />
          ))}
        </div>
        <ArrowDown size={20} className="text-ink/30" />
        <div className="flex items-center gap-3 rounded-2xl bg-ink px-5 py-4 text-white">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-lime-300 text-ink">
            <Hexagon size={18} strokeWidth={2} />
          </span>
          <span className="font-semibold">PilotAsso</span>
        </div>
        <ArrowDown size={20} className="text-ink/30" />
        <div className="flex w-full flex-col gap-2">
          {outputs.map((node) => (
            <Chip key={node.label} node={node} tone="output" />
          ))}
        </div>
      </div>
    </div>
  );
}

function BeforeAfter() {
  const [ref, active] = useInView<HTMLDivElement>(0.35);
  return (
    <div ref={ref} className="mx-auto mt-6 grid max-w-5xl gap-4 sm:grid-cols-2">
      <div className="h-full rounded-3xl border border-ink/10 bg-ink/[0.03] p-8">
        <p className="font-mono text-xs uppercase tracking-[0.15em] text-ink/45">Avant PilotAsso</p>
        <ul className="mt-6 flex flex-col gap-4">
          {before.map((item, i) => (
            <li key={item} className="flex items-start gap-3 text-base text-ink/50">
              <Minus size={18} className="mt-0.5 shrink-0 text-ink/25" />
              <span className="relative">
                {item}
                {/* strike-through drawn progressively */}
                <span
                  className="absolute left-0 top-1/2 h-px bg-rose-400/70 transition-all duration-500 ease-out"
                  style={{ width: active ? '100%' : '0%', transitionDelay: `${300 + i * 160}ms` }}
                />
              </span>
            </li>
          ))}
        </ul>
      </div>
      <div className="h-full rounded-3xl bg-ink p-8 shadow-[0_30px_60px_-30px_rgba(11,27,51,0.7)]">
        <p className="font-mono text-xs uppercase tracking-[0.15em] text-lime-300">Avec PilotAsso</p>
        <ul className="mt-6 flex flex-col gap-4">
          {after.map((item, i) => (
            <li
              key={item}
              className={`flex items-start gap-3 text-base font-medium text-white transition-all duration-500 ${
                active ? 'translate-x-0 opacity-100' : 'translate-x-4 opacity-0'
              }`}
              style={{ transitionDelay: `${1100 + i * 160}ms` }}
            >
              <span className="mt-0.5 flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full bg-lime-300">
                <Check size={12} strokeWidth={3} className="text-ink" />
              </span>
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

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

      <ConnectDiagram />
      <BeforeAfter />
    </Section>
  );
}
