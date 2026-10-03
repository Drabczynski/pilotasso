import type { ReactNode } from 'react';
import {
  AlertTriangle,
  ArrowRight,
  Bell,
  CalendarClock,
  Check,
  FileText,
  FolderKanban,
  Hexagon,
  Landmark,
  LayoutDashboard,
  Receipt,
  Search,
  Settings2,
  Sparkles,
  Users,
  Wallet,
  Zap,
} from 'lucide-react';
import Reveal from './Reveal';

const bars = [
  [52, 48],
  [60, 57],
  [58, 64],
  [70, 66],
  [66, 71],
  [78, 74],
  [74, 80],
  [86, 82],
];
const months = ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil', 'Août'];

const grants = [
  { name: 'Région', amount: '8 k€', pct: 80 },
  { name: 'Département', amount: '6 k€', pct: 60 },
  { name: 'Fondation', amount: '5 k€', pct: 50 },
];

const funders = [
  { name: 'Collectivités', pct: 46, color: '#7dd3fc' },
  { name: 'Fondations', pct: 24, color: '#bef264' },
  { name: 'Cotisations & dons', pct: 18, color: '#fcd34d' },
  { name: 'Autres', pct: 12, color: 'rgba(255,255,255,0.35)' },
];

const nav = [
  { label: 'Tableau de bord', icon: LayoutDashboard, active: true },
  { label: 'Budgets', icon: Wallet },
  { label: 'Transactions', icon: Receipt },
  { label: 'Financements', icon: Landmark },
  { label: 'Projets', icon: FolderKanban },
  { label: 'Gouvernance', icon: Users },
  { label: 'Documents', icon: FileText },
];

function Tile({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.06] p-3.5">
      <p className="text-[11px] text-white/55">{label}</p>
      {children}
    </div>
  );
}

/** Donut drawn with stroke-dasharray so it stays crisp at any size. */
function Donut() {
  const r = 15.9155; // circumference = 100
  let offset = 25;
  return (
    <svg viewBox="0 0 42 42" className="h-20 w-20 shrink-0 -rotate-0">
      <circle cx="21" cy="21" r={r} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="6" />
      {funders.map((f) => {
        const dash = `${f.pct - 1} ${101 - f.pct}`;
        const el = (
          <circle
            key={f.name}
            cx="21"
            cy="21"
            r={r}
            fill="none"
            stroke={f.color}
            strokeWidth="6"
            strokeDasharray={dash}
            strokeDashoffset={offset}
          />
        );
        offset -= f.pct;
        return el;
      })}
    </svg>
  );
}

/** Product preview built in HTML so it stays crisp and on-brand at any size. */
export default function DashboardMock() {
  return (
    <div className="relative mx-auto mt-16 w-full max-w-5xl text-left sm:mt-20">
      {/* Main dashboard */}
      <Reveal from="scale" delay={500}>
        <div className="flex overflow-hidden rounded-2xl border border-white/20 bg-[#0d1626]/75 shadow-[0_40px_120px_-20px_rgba(0,0,0,0.8)] backdrop-blur-xl">
          {/* Sidebar */}
          <aside className="hidden w-44 shrink-0 flex-col border-r border-white/10 p-3 lg:flex">
            <div className="flex items-center gap-2 px-2 py-1.5 text-sm font-medium text-white">
              <Hexagon size={16} strokeWidth={1.75} /> pilotasso
            </div>
            <p className="mt-5 px-2 text-[9px] uppercase tracking-[0.15em] text-white/35">Pilotage</p>
            <ul className="mt-1.5 flex flex-col gap-0.5">
              {nav.map(({ label, icon: Icon, active }) => (
                <li
                  key={label}
                  className={`flex items-center gap-2 rounded-md px-2 py-1.5 text-[11px] ${
                    active ? 'bg-white/10 text-white' : 'text-white/55'
                  }`}
                >
                  <Icon size={13} /> {label}
                </li>
              ))}
            </ul>
            <div className="mt-auto flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.04] p-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-lime-300 text-[9px] font-semibold text-ink">
                HS
              </span>
              <span className="text-[10px] leading-tight text-white/70">
                Horizons Solidaires
                <span className="block text-white/40">Démo</span>
              </span>
            </div>
          </aside>

          <div className="min-w-0 flex-1">
            {/* Top bar */}
            <div className="flex items-center justify-between border-b border-white/10 px-4 py-2.5 sm:px-5">
              <div className="flex items-center gap-2 text-xs text-white/60">
                <Hexagon size={13} strokeWidth={1.75} className="lg:hidden" />
                <span>Horizons Solidaires</span>
                <span className="text-white/30">/</span>
                <span className="text-white">Tableau de bord</span>
              </div>
              <div className="flex items-center gap-3 text-white/50">
                <Search size={13} />
                <span className="relative">
                  <Bell size={13} />
                  <i className="absolute -right-0.5 -top-0.5 h-1.5 w-1.5 rounded-full bg-rose-400" />
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-3 p-4 sm:p-5">
              {/* Greeting */}
              <div className="flex items-end justify-between gap-4">
                <div>
                  <p className="text-lg font-semibold tracking-heading text-white">Bonsoir</p>
                  <p className="text-[11px] text-white/45">Mardi 18 août 2026</p>
                </div>
                <div className="hidden items-center gap-2 sm:flex">
                  <span className="flex items-center gap-1 rounded-md border border-white/10 px-2 py-1 text-[10px] text-white/60">
                    <Settings2 size={11} /> Personnaliser
                  </span>
                  <span className="flex items-center gap-1 rounded-md border border-lime-300/30 bg-lime-300/10 px-2 py-1 text-[10px] text-lime-200">
                    <Zap size={11} /> Santé 55/100
                  </span>
                </div>
              </div>

              {/* Hero card */}
              <div className="rounded-xl border border-white/10 bg-gradient-to-br from-[#12305a] to-[#0b1b33] p-4 sm:p-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <div className="rounded-lg border border-white/10 bg-white/[0.05] p-3.5">
                    <div className="flex items-baseline justify-between">
                      <p className="text-[11px] text-white/60">Consommation budget</p>
                      <p className="text-xl font-semibold tracking-heading text-lime-300">72 %</p>
                    </div>
                    <div className="mt-2.5 h-1.5 overflow-hidden rounded-full bg-white/10">
                      <div className="h-full w-[72%] rounded-full bg-gradient-to-r from-lime-300 to-emerald-300" />
                    </div>
                    <div className="mt-2 flex justify-between text-[10px] text-white/50">
                      <span>52 600 € réalisés</span>
                      <span>20 600 € restants</span>
                    </div>
                    <p className="mt-1 text-[10px] text-white/50">
                      Écart vs budget : <span className="text-lime-200">+6 %</span>
                    </p>
                  </div>
                  <div>
                    <p className="text-[11px] text-white/60">Résultat net · 2026</p>
                    <div className="mt-1 flex flex-wrap items-center gap-2">
                      <p className="text-3xl font-semibold tracking-heading text-white sm:text-[2rem]">+18 250 €</p>
                      <span className="rounded bg-emerald-400/20 px-1.5 py-0.5 text-[10px] text-emerald-200">
                        Excédent
                      </span>
                    </div>
                    <p className="mt-1 text-[11px] text-white/50">Budget voté : 73 200 €</p>
                  </div>
                </div>
                <div className="mt-4 flex flex-col gap-1.5 border-t border-white/10 pt-3 text-[10px] sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex flex-col gap-1">
                    <span className="text-white/50">
                      Exercice janv.–août 2026 · <span className="text-lime-200">Trajectoire dans l’enveloppe</span>
                    </span>
                    <span className="text-white/50">
                      Trésorerie prévisionnelle (mois prochain) : <span className="text-lime-200">+24 800 €</span>
                    </span>
                  </div>
                  <div className="flex flex-col gap-1 sm:items-end">
                    <span className="flex items-center gap-1 text-lime-200">
                      Détails budget <ArrowRight size={10} />
                    </span>
                    <span className="flex items-center gap-1 text-lime-200">
                      33 transactions à classer <ArrowRight size={10} />
                    </span>
                  </div>
                </div>
              </div>

              {/* KPI tiles */}
              <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
                <Tile label="Alertes">
                  <p className="mt-1 text-2xl font-semibold tracking-heading text-white">3</p>
                  <div className="mt-2 flex gap-1">
                    <i className="h-1 flex-1 rounded-full bg-rose-400" />
                    <i className="h-1 flex-1 rounded-full bg-amber-300" />
                    <i className="h-1 flex-1 rounded-full bg-amber-300" />
                  </div>
                  <p className="mt-1.5 text-[10px] text-rose-300">1 critique</p>
                </Tile>
                <Tile label="Subventions">
                  <p className="mt-1 flex items-baseline gap-1.5 text-2xl font-semibold tracking-heading text-white">
                    6 <span className="text-[10px] font-normal tracking-normal text-white/45">en cours</span>
                  </p>
                  <ul className="mt-2 flex flex-col gap-1">
                    {grants.map((g) => (
                      <li key={g.name} className="flex items-center gap-2 text-[9px] text-white/50">
                        <span className="h-1 flex-1 overflow-hidden rounded-full bg-white/10">
                          <span className="block h-full rounded-full bg-sky-300" style={{ width: `${g.pct}%` }} />
                        </span>
                        {g.amount}
                      </li>
                    ))}
                  </ul>
                </Tile>
                <Tile label="Gouvernance">
                  <p className="mt-1 flex items-center gap-1.5 text-sm font-semibold text-emerald-300">
                    <i className="h-1.5 w-1.5 rounded-full bg-emerald-300" /> Conforme
                  </p>
                  <div className="mt-2.5 flex flex-col gap-1 text-[10px]">
                    <span className="flex justify-between text-white/50">
                      CA <span className="text-emerald-200">1 tenu</span>
                    </span>
                    <span className="flex justify-between text-white/50">
                      AG <span className="text-emerald-200">1 tenue</span>
                    </span>
                  </div>
                </Tile>
                <Tile label="Financeurs">
                  <p className="mt-1 text-2xl font-semibold tracking-heading text-white">5</p>
                  <p className="text-[10px] text-white/50">actifs · 102 k€</p>
                  <p className="mt-1.5 flex items-center gap-1 text-[10px] text-emerald-200">
                    <Check size={10} /> Aucun financeur en risque
                  </p>
                </Tile>
              </div>

              {/* Charts */}
              <div className="hidden gap-3 sm:grid sm:grid-cols-[1.6fr_1fr]">
                <div className="rounded-xl border border-white/10 bg-white/[0.04] p-3.5">
                  <div className="mb-2 flex items-center justify-between text-[11px] text-white/60">
                    <span>Tendance budgétaire</span>
                    <span className="flex gap-3 text-[10px] text-white/45">
                      <span className="flex items-center gap-1">
                        <i className="h-1.5 w-1.5 rounded-full bg-white/35" /> Prévu
                      </span>
                      <span className="flex items-center gap-1">
                        <i className="h-1.5 w-1.5 rounded-full bg-sky-300" /> Réalisé
                      </span>
                    </span>
                  </div>
                  <div className="flex h-20 items-end gap-2">
                    {bars.map(([planned, actual], i) => (
                      <div key={months[i]} className="flex h-full flex-1 flex-col justify-end">
                        <div className="flex h-full items-end gap-0.5">
                          <div className="flex-1 rounded-t-sm bg-white/20" style={{ height: `${planned}%` }} />
                          <div className="flex-1 rounded-t-sm bg-sky-300/80" style={{ height: `${actual}%` }} />
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-1.5 flex gap-2 text-[8px] text-white/35">
                    {months.map((m) => (
                      <span key={m} className="flex-1 text-center">
                        {m}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="rounded-xl border border-white/10 bg-white/[0.04] p-3.5">
                  <p className="mb-2 text-[11px] text-white/60">Répartition des financeurs</p>
                  <div className="flex items-center gap-3">
                    <Donut />
                    <ul className="flex flex-col gap-1">
                      {funders.map((f) => (
                        <li key={f.name} className="flex items-center gap-1.5 text-[9px] text-white/55">
                          <i className="h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: f.color }} />
                          {f.name} <span className="text-white/35">{f.pct} %</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Reveal>

      {/* Floating cards that slide in from the sides */}
      <Reveal
        from="left"
        delay={900}
        className="absolute -left-4 top-[48%] hidden w-64 md:block lg:-left-16 xl:-left-28"
      >
        <div className="animate-float rounded-2xl border border-white/20 bg-white/15 p-4 shadow-2xl backdrop-blur-xl">
          <div className="flex items-center gap-2 text-[11px] font-medium text-white/70">
            <Sparkles size={13} className="text-amber-200" /> Nouvelle opportunité
          </div>
          <p className="mt-2 text-sm font-medium leading-snug tracking-snug text-white">
            Appel à projets « Vie associative locale »
          </p>
          <div className="mt-3 flex items-center justify-between text-[11px]">
            <span className="flex items-center gap-1 text-white/60">
              <CalendarClock size={12} /> Clôture le 14 nov.
            </span>
            <span className="rounded-full bg-emerald-400/20 px-2 py-0.5 text-emerald-100">Éligible</span>
          </div>
        </div>
      </Reveal>

      <Reveal
        from="right"
        delay={1100}
        className="absolute -right-4 -bottom-8 hidden w-56 md:block lg:-right-16 xl:-right-28"
      >
        <div className="animate-float-slow rounded-2xl border border-white/20 bg-white/15 p-4 shadow-2xl backdrop-blur-xl">
          <div className="flex items-center gap-2 text-[11px] font-medium text-white/70">
            <Zap size={13} className="text-lime-300" /> Classée automatiquement
          </div>
          <p className="mt-2 text-sm font-medium tracking-snug text-white">Subvention Région</p>
          <div className="mt-1 flex items-center justify-between">
            <p className="text-xl font-semibold tracking-heading text-lime-300">+8 000 €</p>
            <span className="rounded-full bg-white/15 px-2 py-0.5 text-[10px] text-white/80">Projet Jardins</span>
          </div>
        </div>
      </Reveal>

      <Reveal from="left" delay={1300} className="absolute -bottom-5 left-[26%] hidden lg:block">
        <div className="animate-float-slow flex items-center gap-2 rounded-full border border-white/20 bg-white/15 px-4 py-2 text-xs text-white shadow-2xl backdrop-blur-xl">
          <AlertTriangle size={13} className="text-amber-200" />
          Écart de 8 % sur le poste « Événements »
        </div>
      </Reveal>
    </div>
  );
}
