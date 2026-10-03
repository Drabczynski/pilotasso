import { useEffect, useState, type ReactNode } from 'react';
import { ArrowRight, Banknote, ChevronRight, FileSpreadsheet, FileText, FolderOpen, Hexagon, Search, Zap } from 'lucide-react';
import {
  AbsoluteFill,
  Easing,
  Freeze,
  Img,
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

// 24 fps = the source footage's own rate: every video frame is shown exactly once, no judder.
export const PROMO_FPS = 24;

// Scene timeline, in frames. Neighbouring scenes overlap by FADE frames for crossfades.
const FADE = 12;
const CUT = 5; // near-cut between the brand "posters"
const SCENES: Record<string, { from: number; len: number; fade?: number }> = {
  files: { from: 0, len: 108 },
  lidar: { from: 96, len: 130 },
  dashboard: { from: 214, len: 168 },
  office: { from: 370, len: 156 },
  poster1: { from: 521, len: 100, fade: CUT },
  poster2: { from: 616, len: 100, fade: CUT },
  poster3: { from: 711, len: 100, fade: CUT },
  poster4: { from: 806, len: 100, fade: CUT },
  beta: { from: 901, len: 90, fade: CUT },
  end: { from: 986, len: 132, fade: CUT },
};
export const PROMO_DURATION = SCENES.end.from + SCENES.end.len;

// hero.mp4 is 7.08 s: LiDAR scan until ~3.4 s, photographic office after.
const VIDEO = staticFile('video/hero.mp4');
const SCAN_END = Math.round(3.4 * PROMO_FPS);
const VIDEO_END = 168; // last frame of the 169-frame source

/**
 * Plays [from, to) of the source at real speed, then holds the last frame.
 * Never slows the footage down, so nothing stutters.
 */
function Clip({ from, to }: { from: number; to: number }) {
  const f = useCurrentFrame();
  const video = <OffthreadVideo src={VIDEO} muted trimBefore={from} className="h-full w-full object-cover" />;
  return f < to - from ? video : <Freeze frame={to - from - 1}>{video}</Freeze>;
}

const NB = ' ';

/** Fades its children in and out at the edges of the enclosing Sequence. */
function Fade({ len, fade = FADE, children }: { len: number; fade?: number; children: ReactNode }) {
  const f = useCurrentFrame();
  const opacity = interpolate(f, [0, fade, len - fade, len], [0, 1, 1, 0], {
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

/** Charter wordmark: « pilot asso » + signature. */
function Logo({ size = 28, color = '#ffffff' }: { size?: number; color?: string }) {
  return (
    <div style={{ color }} className="inline-flex flex-col items-start leading-none">
      <span className="font-bold tracking-display" style={{ fontSize: size * 1.15 }}>
        pilot asso
      </span>
      <span className="mt-1 font-semibold uppercase" style={{ fontSize: size * 0.26, letterSpacing: '0.2em' }}>
        Le pilotage des associations
      </span>
    </div>
  );
}

const scrim =
  'linear-gradient(to bottom, rgba(10,10,10,0.3) 0%, rgba(10,10,10,0.05) 40%, rgba(10,10,10,0.4) 100%)';

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
  const collapse = interpolate(f, [78, 100], [0, 1], {
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
        <Clip from={0} to={SCAN_END} />
      </AbsoluteFill>
      <AbsoluteFill style={{ background: scrim }} />
      <AbsoluteFill
        style={{ background: 'radial-gradient(45% 35% at 50% 50%, rgba(4,8,16,0.42) 0%, rgba(4,8,16,0.18) 55%, transparent 100%)' }}
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
      <AbsoluteFill style={{ opacity: 0.75, filter: 'blur(6px)' }}>
        <Freeze frame={0}>
          <OffthreadVideo src={VIDEO} muted trimBefore={SCAN_END - 1} className="h-full w-full object-cover" />
        </Freeze>
      </AbsoluteFill>
      <AbsoluteFill
        style={{ background: 'radial-gradient(60% 55% at 50% 45%, rgba(18,48,90,0.35) 0%, rgba(10,10,10,0.6) 100%)' }}
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
        <Clip from={SCAN_END} to={VIDEO_END + 1} />
      </AbsoluteFill>
      <AbsoluteFill style={{ background: scrim }} />
      <AbsoluteFill
        style={{
          background: 'radial-gradient(55% 75% at 22% 52%, rgba(4,8,16,0.55) 0%, rgba(4,8,16,0.25) 50%, transparent 85%)',
        }}
      />
      <div className="absolute left-[140px] top-1/2 w-[780px] -translate-y-1/2 text-legible">
        <Rise at={14}>
          <p className="font-mono text-[20px] font-medium uppercase tracking-[0.15em] text-white/85">Vision à 360°</p>
        </Rise>
        <Rise at={24}>
          <p className="mt-5 text-[76px] font-semibold leading-[1.04] tracking-display text-white">
            Tout ce qu’il faut savoir pour piloter. <span className="text-lime-300">Au même endroit.</span>
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


/* ------------------------------------------------------- brand "posters" */

const LIME = '#d4f54a';

type Poster = {
  bg: string;
  ink: string; // colour of the first line, logo and subline
  accent: string; // colour of the second line
  lines: [string, string];
  sub: string;
  photo: string;
  focus: string; // object-position of the photo
  ribbon: string; // path in the 1920 × 1080 frame
};

const POSTERS: Poster[] = [
  {
    bg: '#f6b894',
    ink: '#5b1631',
    accent: '#5b1631',
    lines: ['Vos projets avancent.', 'Gardez le fil.'],
    sub: 'Une vue d’ensemble de vos projets, de vos financements et de votre activité.',
    photo: 'promo/office-168.jpg',
    focus: '52% 50%',
    ribbon: 'M -40 610 C 240 520, 520 560, 600 700 C 660 820, 470 900, 420 790 C 360 650, 760 560, 1010 640 S 1500 760, 1980 470',
  },
  {
    bg: '#0b1f44',
    ink: '#ffffff',
    accent: LIME,
    lines: ['Voyez plus clair.', 'Décidez avec confiance.'],
    sub: 'Finances, projets, activité : une vision d’ensemble pour vos décisions.',
    photo: 'promo/office-140.jpg',
    focus: '48% 55%',
    ribbon: 'M -40 780 C 260 700, 460 860, 700 820 S 980 600, 1100 520 S 1600 380, 1980 420',
  },
  {
    bg: '#0e4a36',
    ink: '#ffffff',
    accent: LIME,
    lines: ['Moins de recherches.', 'Plus de temps pour agir.'],
    sub: 'Retrouvez vos finances, vos projets et votre activité au même endroit.',
    photo: 'promo/office-120.jpg',
    focus: '30% 50%',
    ribbon: 'M -40 900 C 200 860, 380 700, 520 760 C 640 810, 560 960, 450 900 C 330 830, 640 620, 980 640 S 1600 520, 1980 300',
  },
  {
    bg: '#f1a6cf',
    ink: '#0b1f44',
    accent: '#0b1f44',
    lines: ['Gardez le cap.', 'Faites avancer vos projets.'],
    sub: 'Projets, financements, activité : les informations utiles, au même endroit.',
    photo: 'promo/office-168.jpg',
    focus: '18% 60%',
    ribbon: 'M -40 520 C 300 600, 420 900, 640 860 S 900 620, 1060 700 S 1500 980, 1980 760',
  },
];

function PosterScene({ poster }: { poster: Poster }) {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  const photoIn = spring({ frame: f - 2, fps, config: { damping: 20, mass: 0.9 } });
  const draw = interpolate(f, [4, 46], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.inOut(Easing.cubic),
  });
  const zoom = interpolate(f, [0, 100], [1.12, 1.02]);
  return (
    <AbsoluteFill style={{ background: poster.bg }}>
      {/* photo, bottom right, rounded top-left corner like the posters */}
      <div
        className="absolute bottom-0 right-0 overflow-hidden rounded-tl-[56px]"
        style={{ width: 900, height: 700, transform: `translate(${(1 - photoIn) * 420}px, ${(1 - photoIn) * 120}px)` }}
      >
        <Img
          src={staticFile(poster.photo)}
          className="h-full w-full object-cover"
          style={{ objectPosition: poster.focus, transform: `scale(${zoom})` }}
        />
      </div>

      {/* lime ribbon drawing itself, with its loop */}
      <svg viewBox="0 0 1920 1080" className="absolute inset-0 h-full w-full" fill="none">
        <path
          d={poster.ribbon}
          stroke={LIME}
          strokeWidth={30}
          strokeLinecap="round"
          strokeLinejoin="round"
          pathLength={1}
          strokeDasharray="1 1"
          strokeDashoffset={draw}
        />
      </svg>

      <div className="absolute left-[120px] top-[96px]" style={{ color: poster.ink }}>
        <Rise at={0} distance={14}>
          <Logo size={44} color={poster.ink} />
        </Rise>
        <div className="mt-16 max-w-[980px]">
          <Rise at={4}>
            <p className="text-[92px] font-bold leading-[1.02] tracking-display" style={{ color: poster.ink }}>
              {poster.lines[0]}
            </p>
          </Rise>
          <Rise at={10}>
            <p className="text-[92px] font-bold leading-[1.02] tracking-display" style={{ color: poster.accent }}>
              {poster.lines[1]}
            </p>
          </Rise>
          <Rise at={16} distance={20}>
            <p className="mt-7 max-w-[720px] text-[30px] font-medium leading-snug" style={{ color: poster.ink }}>
              {poster.sub}
            </p>
          </Rise>
        </div>
      </div>
    </AbsoluteFill>
  );
}

const Poster1 = () => <PosterScene poster={POSTERS[0]} />;
const Poster2 = () => <PosterScene poster={POSTERS[1]} />;
const Poster3 = () => <PosterScene poster={POSTERS[2]} />;
const Poster4 = () => <PosterScene poster={POSTERS[3]} />;

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
  const cta = spring({ frame: f - 30, fps, config: { damping: 12 } });
  const draw = interpolate(f, [0, 50], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.inOut(Easing.cubic),
  });
  return (
    <AbsoluteFill className="items-center justify-center text-center" style={{ background: '#1652f0' }}>
      <svg viewBox="0 0 1920 1080" className="absolute inset-0 h-full w-full" fill="none">
        <path
          d="M -40 960 C 320 900, 700 1040, 1100 990 C 1420 950, 1520 830, 1440 800 C 1340 770, 1360 960, 1560 960 S 1860 860, 1980 820"
          stroke={LIME}
          strokeWidth={30}
          strokeLinecap="round"
          pathLength={1}
          strokeDasharray="1 1"
          strokeDashoffset={draw}
        />
      </svg>
      <Rise at={4}>
        <Logo size={72} />
      </Rise>
      <Rise at={14}>
        <p className="mt-14 text-[76px] font-bold leading-[1.05] tracking-display text-white">
          Découvrez Pilot Asso
          <br />
          <span style={{ color: LIME }}>en 30{' '}minutes.</span>
        </p>
      </Rise>
      <div style={{ transform: `scale(${0.85 + cta * 0.15})`, opacity: cta }}>
        <div className="mt-12 inline-flex items-center gap-3 rounded-2xl px-12 py-6 text-[34px] font-semibold tracking-snug text-ink" style={{ background: LIME }}>
          Réservez votre démo
          <ArrowRight size={34} />
        </div>
      </div>
      <Rise at={44}>
        <p className="mt-8 text-[30px] font-semibold text-white">pilotasso.com</p>
      </Rise>
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

  const scenes: [string, () => JSX.Element][] = [
    ['files', FilesScene],
    ['lidar', LidarScene],
    ['dashboard', DashboardScene],
    ['office', OfficeScene],
    ['poster1', Poster1],
    ['poster2', Poster2],
    ['poster3', Poster3],
    ['poster4', Poster4],
    ['beta', BetaScene],
    ['end', EndScene],
  ];

  return (
    <AbsoluteFill className="bg-[#0a0a0a] font-sans">
      {scenes.map(([key, Scene]) => {
        const { from, len, fade } = SCENES[key];
        return (
          <Sequence key={key} from={from} durationInFrames={len} name={key}>
            <Fade len={len} fade={fade}>
              <Scene />
            </Fade>
          </Sequence>
        );
      })}
    </AbsoluteFill>
  );
}
