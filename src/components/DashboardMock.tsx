import type { ReactNode } from 'react';
import { AlertTriangle, Bell, CalendarClock, Check, Hexagon, Search, Sparkles, TrendingUp } from 'lucide-react';
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

function Tile({ label, value, children }: { label: string; value: string; children?: ReactNode }) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.06] p-4">
      <p className="text-[11px] text-white/55">{label}</p>
      <p className="mt-1 text-2xl font-semibold tracking-heading text-white">{value}</p>
      {children}
    </div>
  );
}

/** Product preview built in HTML so it stays crisp and on-brand at any size. */
export default function DashboardMock() {
  return (
    <div className="relative mx-auto mt-16 w-full max-w-5xl text-left sm:mt-20">
      {/* Main dashboard */}
      <Reveal from="scale" delay={500}>
        <div className="overflow-hidden rounded-2xl border border-white/20 bg-[#0d1626]/70 shadow-[0_40px_120px_-20px_rgba(0,0,0,0.8)] backdrop-blur-xl">
          <div className="flex items-center justify-between border-b border-white/10 px-4 py-3 sm:px-5">
            <div className="flex items-center gap-2 text-xs text-white/70">
              <Hexagon size={14} strokeWidth={1.75} />
              <span className="hidden sm:inline">Horizons Solidaires</span>
              <span className="text-white/30">/</span>
              <span className="text-white">Tableau de bord</span>
            </div>
            <div className="flex items-center gap-3 text-white/50">
              <Search size={14} />
              <Bell size={14} />
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/15 text-[10px] text-white">
                HS
              </span>
            </div>
          </div>

          <div className="grid gap-3 p-4 sm:p-5 lg:grid-cols-[1.35fr_1fr]">
            <div className="rounded-xl border border-white/10 bg-gradient-to-br from-white/[0.10] to-white/[0.03] p-5">
              <div className="flex items-start justify-between gap-6">
                <div className="min-w-0 flex-1">
                  <p className="text-[11px] text-white/55">Consommation du budget</p>
                  <p className="mt-1 text-3xl font-semibold tracking-heading text-white">72 %</p>
                  <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/10">
                    <div className="h-full w-[72%] rounded-full bg-gradient-to-r from-sky-400 to-emerald-300" />
                  </div>
                  <p className="mt-2 text-[11px] text-white/50">52 600 € réalisés · 20 600 € restants</p>
                </div>
                <div className="text-right">
                  <p className="text-[11px] text-white/55">Résultat net 2026</p>
                  <p className="mt-1 text-2xl font-semibold tracking-heading text-emerald-300 sm:text-3xl">
                    +18 250 €
                  </p>
                  <span className="mt-2 inline-block rounded-full bg-emerald-400/15 px-2 py-0.5 text-[10px] text-emerald-200">
                    Excédent
                  </span>
                </div>
              </div>

              <div className="mt-6">
                <div className="mb-2 flex items-center justify-between text-[11px] text-white/55">
                  <span>Tendance budgétaire</span>
                  <span className="flex gap-3">
                    <span className="flex items-center gap-1">
                      <i className="h-1.5 w-1.5 rounded-full bg-white/35" /> Prévu
                    </span>
                    <span className="flex items-center gap-1">
                      <i className="h-1.5 w-1.5 rounded-full bg-sky-300" /> Réalisé
                    </span>
                  </span>
                </div>
                <div className="flex h-24 items-end gap-2 sm:gap-3">
                  {bars.map(([planned, actual], i) => (
                    <div key={i} className="flex h-full flex-1 items-end gap-0.5 sm:gap-1">
                      <div className="flex-1 rounded-t bg-white/20" style={{ height: `${planned}%` }} />
                      <div className="flex-1 rounded-t bg-sky-300/80" style={{ height: `${actual}%` }} />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Tile label="Alertes" value="3">
                <div className="mt-3 flex gap-1">
                  <i className="h-1 flex-1 rounded-full bg-rose-400" />
                  <i className="h-1 flex-1 rounded-full bg-amber-300" />
                  <i className="h-1 flex-1 rounded-full bg-amber-300" />
                </div>
                <p className="mt-2 text-[10px] text-white/45">1 critique</p>
              </Tile>
              <Tile label="Subventions" value="6">
                <p className="mt-3 text-[10px] text-white/45">en cours d'instruction</p>
              </Tile>
              <Tile label="Gouvernance" value="Conforme">
                <p className="mt-3 flex items-center gap-1 text-[10px] text-emerald-200">
                  <Check size={11} /> CA & AG tenus
                </p>
              </Tile>
              <Tile label="Financeurs" value="5">
                <p className="mt-3 text-[10px] text-white/45">actifs · 102 k€</p>
              </Tile>
            </div>
          </div>
        </div>
      </Reveal>

      {/* Floating cards that slide in from the sides */}
      <Reveal
        from="left"
        delay={900}
        className="absolute -left-4 top-[14%] hidden w-64 md:block lg:-left-16 xl:-left-28"
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
        className="absolute -right-4 -bottom-10 hidden w-60 md:block lg:-right-14 xl:-right-24"
      >
        <div className="animate-float-slow rounded-2xl border border-white/20 bg-white/15 p-4 shadow-2xl backdrop-blur-xl">
          <div className="flex items-center gap-2 text-[11px] font-medium text-white/70">
            <TrendingUp size={13} className="text-sky-200" /> Trésorerie prévisionnelle
          </div>
          <p className="mt-1.5 text-2xl font-semibold tracking-heading text-white">+24 800 €</p>
          <svg viewBox="0 0 120 32" className="mt-2 h-8 w-full" fill="none">
            <path
              d="M0 26 L15 22 L30 24 L45 17 L60 19 L75 12 L90 14 L105 7 L120 4"
              stroke="rgb(125 211 252)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <p className="text-[10px] text-white/50">à fin du mois prochain</p>
        </div>
      </Reveal>

      <Reveal from="left" delay={1300} className="absolute -bottom-5 left-[22%] hidden lg:block">
        <div className="animate-float-slow flex items-center gap-2 rounded-full border border-white/20 bg-white/15 px-4 py-2 text-xs text-white shadow-2xl backdrop-blur-xl">
          <AlertTriangle size={13} className="text-amber-200" />
          Écart de 8 % sur le poste « Événements »
        </div>
      </Reveal>
    </div>
  );
}
