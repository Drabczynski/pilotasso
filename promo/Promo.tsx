import { useEffect, useState, type ReactNode } from 'react';
import { Banknote, ChevronRight, FileSpreadsheet, FileText, FolderOpen, Hexagon, Search, Zap } from 'lucide-react';
import {
  AbsoluteFill,
  Easing,
  OffthreadVideo,
  Sequence,
  continueRender,
  delayRender,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import DashboardMock from '../src/components/DashboardMock';
import { RevealEnabled } from '../src/components/Reveal';

export const PROMO_FPS = 30;

// Scene timeline, in frames. Neighbouring scenes overlap by FADE frames for crossfades.
const FADE = 14;
const SCENES = {
  files: { from: 0, len: 120 },
  lidar: { from: 106, len: 194 },
  dashboard: { from: 286, len: 224 },
  office: { from: 496, len: 194 },
  beta: { from: 676, len: 104 },
  end: { from: 766, len: 134 },
};
export const PROMO_DURATION = SCENES.end.from + SCENES.end.len;

// hero.mp4 is 7.08 s: LiDAR scan until ~3.4 s, photographic office after.
const VIDEO = staticFile('video/hero.mp4');
const SCAN_END = 3.4 * PROMO_FPS;
const VIDEO_END = 7.0 * PROMO_FPS;

const NB = ' ';

/** Fades its children in and out at the edges of the enclosing Sequence. */
function Fade({ len, children }: { len: number; children: ReactNode }) {
  const f = useCurrentFrame();
  const opacity = interpolate(f, [0, FADE, len - FADE, len], [0, 1, 1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  return <AbsoluteFill style={{ opacity }}>{children}</AbsoluteFill>;
}

/** Spring-driven rise for a piece of copy. */
function Rise({ at = 0, children, distance = 40 }: { at?: number; children: ReactNode; distance?: number }) {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  const p = spring({ frame: f - at, fps, config: { damping: 200, mass: 0.8 } });
  return (
    <div style={{ opacity: p, transform: `translateY(${(1 - p) * distance}px)`, filter: `blur(${(1 - p) * 8}px)` }}>
      {children}
    </div>
  );
}

function Logo({ size = 28 }: { size?: number }) {
  return (
    <div className="flex items-center gap-2.5 text-white">
      <Hexagon size={size} strokeWidth={1.5} />
      <span className="font-medium tracking-tight" style={{ fontSize: size * 0.85 }}>
        pilotasso
      </span>
    </div>
  );
}

const scrim =
  'linear-gradient(to bottom, rgba(10,10,10,0.55) 0%, rgba(10,10,10,0.3) 40%, rgba(10,10,10,0.75) 100%)';

/* ---------------------------------------------------------------- scenes */

const files = [
  { icon: FileSpreadsheet, name: 'Budget_2026_v3_FINAL.xlsx', x: -330, y: -40, r: -6 },
  { icon: FileSpreadsheet, name: 'Trésorerie_mensuelle.xlsx', x: 300, y: -90, r: 5 },
  { icon: FolderOpen, name: 'Subventions (dossier partagé)', x: -260, y: 130, r: 3 },
  { icon: FileText, name: 'CR_Conseil_administration.docx', x: 320, y: 110, r: -4 },
  { icon: FileSpreadsheet, name: 'Budget_2026_v4_FINAL_ok.xlsx', x: 20, y: 230, r: 2 },
  { icon: FileText, name: 'Relevé_banque_juillet.pdf', x: -20, y: -210, r: -3 },
];

function FilesScene() {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  // Everything collapses into a single point at the end of the scene.
  const collapse = interpolate(f, [86, 112], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.in(Easing.cubic),
  });
  return (
    <AbsoluteFill className="items-center justify-center bg-[#0a0a0a]">
      {files.map((file, i) => {
        const p = spring({ frame: f - 8 - i * 7, fps, config: { damping: 14, mass: 0.7 } });
        const x = file.x * (1 - collapse);
        const y = (file.y + (1 - p) * -260) * (1 - collapse);
        const Icon = file.icon;
        return (
          <div
            key={file.name}
            className="absolute flex items-center gap-3 rounded-2xl border border-white/15 bg-white/[0.07] px-6 py-4 text-2xl text-white/80"
            style={{
              transform: `translate(${x}px, ${y}px) rotate(${file.r * (1 - collapse)}deg) scale(${1 - collapse * 0.8})`,
              opacity: p * (1 - collapse),
            }}
          >
            <Icon size={26} className="text-white/45" />
            {file.name}
          </div>
        );
      })}
      <div className="absolute inset-x-0 bottom-[110px] text-center" style={{ opacity: 1 - collapse }}>
        <Rise at={30}>
          <p className="mx-auto max-w-[1300px] text-[56px] font-semibold leading-[1.1] tracking-display text-white">
            Combien de fichiers pour savoir
            <br />
            où en est votre association{NB}?
          </p>
        </Rise>
      </div>
      <div
        className="absolute h-5 w-5 rounded-full bg-lime-300"
        style={{ opacity: collapse, transform: `scale(${0.4 + collapse})`, boxShadow: '0 0 60px 20px rgba(190,242,100,0.5)' }}
      />
    </AbsoluteFill>
  );
}

function LidarScene() {
  const f = useCurrentFrame();
  const len = SCENES.lidar.len;
  const zoom = interpolate(f, [0, len], [1, 1.08]);
  return (
    <AbsoluteFill className="bg-[#0a0a0a]">
      <AbsoluteFill style={{ transform: `scale(${zoom})` }}>
        <OffthreadVideo src={VIDEO} muted playbackRate={SCAN_END / len} className="h-full w-full object-cover" />
      </AbsoluteFill>
      <AbsoluteFill style={{ background: scrim }} />
      <AbsoluteFill
        style={{ background: 'radial-gradient(45% 35% at 50% 50%, rgba(4,8,16,0.7) 0%, rgba(4,8,16,0.35) 55%, transparent 100%)' }}
      />
      <div className="absolute left-[72px] top-[56px]">
        <Rise at={10} distance={16}>
          <Logo />
        </Rise>
      </div>
      <AbsoluteFill className="items-center justify-center text-center">
        <Rise at={18}>
          <p className="text-[104px] font-semibold leading-[1] tracking-display text-white text-legible">
            Pilotez votre association,
          </p>
        </Rise>
        <Rise at={40}>
          <p className="mt-2 text-[104px] font-semibold leading-[1.05] tracking-display text-white/75 text-legible">
            pas vos fichiers Excel.
          </p>
        </Rise>
      </AbsoluteFill>
    </AbsoluteFill>
  );
}

function DashboardScene() {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  const len = SCENES.dashboard.len;
  const p = spring({ frame: f - 6, fps, config: { damping: 22, mass: 1.1 } });
  const push = interpolate(f, [40, len], [1, 1.07]);
  const rotateX = (1 - p) * 32;
  const y = (1 - p) * 420;
  return (
    <AbsoluteFill className="items-center justify-center overflow-hidden bg-[#0a0a0a]">
      {/* LiDAR floor, slowed down and dimmed, as a backdrop */}
      <AbsoluteFill style={{ opacity: 0.45, filter: 'blur(6px)' }}>
        <OffthreadVideo src={VIDEO} muted playbackRate={0.25} className="h-full w-full object-cover" />
      </AbsoluteFill>
      <AbsoluteFill
        style={{ background: 'radial-gradient(60% 55% at 50% 45%, rgba(18,48,90,0.55) 0%, rgba(10,10,10,0.9) 100%)' }}
      />
      <div className="absolute inset-x-0 top-[64px] text-center">
        <Rise at={50}>
          <p className="text-[54px] font-semibold tracking-display text-white">
            Un seul tableau de bord. <span className="text-white/55">Toujours à jour.</span>
          </p>
        </Rise>
      </div>
      <div style={{ perspective: 2200 }}>
        <div
          style={{
            width: 1280,
            transform: `translateY(${y + 60}px) rotateX(${rotateX}deg) scale(${push})`,
            transformOrigin: '50% 30%',
            opacity: p,
          }}
        >
          <RevealEnabled.Provider value={false}>
            <div className="[&>div]:!mt-0 [&>div]:!max-w-none">
              <DashboardMock />
            </div>
          </RevealEnabled.Provider>
        </div>
      </div>
    </AbsoluteFill>
  );
}

const pillars = [
  { icon: Banknote, title: 'Finances', body: 'Budget, réel, écarts et trésorerie au même endroit.' },
  { icon: Search, title: 'Financements', body: 'Les bonnes opportunités repérées plus tôt.' },
  { icon: Zap, title: 'Automatisation', body: 'Moins de saisie, plus de temps pour la mission.' },
];

function OfficeScene() {
  const f = useCurrentFrame();
  const len = SCENES.office.len;
  const zoom = interpolate(f, [0, len], [1.04, 1]);
  return (
    <AbsoluteFill className="bg-[#0a0a0a]">
      <AbsoluteFill style={{ transform: `scale(${zoom})` }}>
        <OffthreadVideo
          src={VIDEO}
          muted
          trimBefore={Math.round(SCAN_END)}
          playbackRate={(VIDEO_END - SCAN_END) / len}
          className="h-full w-full object-cover"
        />
      </AbsoluteFill>
      <AbsoluteFill style={{ background: scrim }} />
      <AbsoluteFill
        style={{
          background: 'radial-gradient(55% 75% at 22% 52%, rgba(4,8,16,0.78) 0%, rgba(4,8,16,0.45) 50%, transparent 85%)',
        }}
      />
      <div className="absolute left-[140px] top-1/2 w-[780px] -translate-y-1/2 text-legible">
        <Rise at={14}>
          <p className="font-mono text-[20px] font-medium uppercase tracking-[0.15em] text-white/85">Vision à 360°</p>
        </Rise>
        <Rise at={24}>
          <p className="mt-5 text-[76px] font-semibold leading-[1.04] tracking-display text-white">
            Tout ce qu’il faut savoir pour piloter. Au même endroit.
          </p>
        </Rise>
        <div className="mt-12 flex flex-col gap-7 border-l border-white/25 pl-9">
          {pillars.map(({ icon: Icon, title, body }, i) => (
            <Rise key={title} at={60 + i * 14} distance={24}>
              <div className="flex items-start gap-5">
                <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl border border-white/20 bg-white/10">
                  <Icon size={26} className="text-lime-300" />
                </span>
                <div>
                  <p className="text-[30px] font-semibold tracking-heading text-white">{title}</p>
                  <p className="text-[22px] text-white/85">{body}</p>
                </div>
              </div>
            </Rise>
          ))}
        </div>
      </div>
    </AbsoluteFill>
  );
}

function BetaScene() {
  const f = useCurrentFrame();
  const count = Math.round(
    interpolate(f, [8, 44], [0, 14], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic) }),
  );
  return (
    <AbsoluteFill className="items-center justify-center bg-lime-300 text-center text-ink">
      <p className="font-mono text-[22px] font-medium uppercase tracking-[0.15em] text-ink/60">Construit avec le terrain</p>
      <p className="mt-2 text-[300px] font-semibold leading-none tracking-display">{count}</p>
      <Rise at={30}>
        <p className="text-[60px] font-semibold tracking-display">associations construisent PilotAsso avec nous.</p>
      </Rise>
    </AbsoluteFill>
  );
}

function EndScene() {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  const glow = interpolate(f, [0, 60], [0.6, 1], { extrapolateRight: 'clamp' });
  const cta = spring({ frame: f - 44, fps, config: { damping: 12 } });
  return (
    <AbsoluteFill className="items-center justify-center bg-ink text-center">
      <div
        className="absolute left-1/2 top-[18%] h-[600px] w-[1100px] -translate-x-1/2 rounded-full bg-lime-300/20 blur-[120px]"
        style={{ opacity: glow }}
      />
      <Rise at={6}>
        <Logo size={64} />
      </Rise>
      <Rise at={20}>
        <p className="mt-8 text-[64px] font-semibold leading-[1.08] tracking-display text-white">
          Moins de fichiers.
          <br />
          <span className="text-white/60">Plus de mission.</span>
        </p>
      </Rise>
      <div style={{ transform: `scale(${0.85 + cta * 0.15})`, opacity: cta }}>
        <div className="mt-14 inline-flex items-center gap-2 rounded-full bg-lime-300 px-12 py-6 text-[32px] font-medium tracking-snug text-black shadow-[0_0_80px_-10px_rgba(190,242,100,0.7)]">
          Réservez votre démo gratuite
          <ChevronRight size={34} />
        </div>
      </div>
    </AbsoluteFill>
  );
}

/* --------------------------------------------------------------- timeline */

export function Promo() {
  // Wait for Inter before the first frame is captured.
  const [handle] = useState(() => delayRender('fonts'));
  useEffect(() => {
    document.fonts.ready.then(() => continueRender(handle));
  }, [handle]);

  const scenes: [keyof typeof SCENES, () => JSX.Element][] = [
    ['files', FilesScene],
    ['lidar', LidarScene],
    ['dashboard', DashboardScene],
    ['office', OfficeScene],
    ['beta', BetaScene],
    ['end', EndScene],
  ];

  return (
    <AbsoluteFill className="bg-[#0a0a0a] font-sans">
      {scenes.map(([key, Scene]) => {
        const { from, len } = SCENES[key];
        return (
          <Sequence key={key} from={from} durationInFrames={len} name={key}>
            <Fade len={len}>
              <Scene />
            </Fade>
          </Sequence>
        );
      })}
    </AbsoluteFill>
  );
}
