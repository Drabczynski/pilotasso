import { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useInView, useReducedMotion, type PanInfo } from 'framer-motion';
import { Check, ChevronRight, Plus, X } from 'lucide-react';
import Reveal from './Reveal';
import Section, { Eyebrow, Heading, Lead } from './Section';

const NB = ' ';

/**
 * Interactive card stack (drag, tap, arrow keys) adapted from the AI Canvas
 * "interactive card stack" component, with a detail popup per card.
 */

interface UseCase {
  id: number;
  orientation: 'portrait' | 'landscape';
  title: string;
  eyebrow: string;
  photo: string; // Unsplash photo id (Unsplash License)
  alt: string;
  body: string;
  points: string[];
}

const CASES: UseCase[] = [
  {
    id: 0,
    orientation: 'portrait',
    eyebrow: 'Gouvernance',
    title: 'Préparer le conseil d’administration en une heure',
    photo: 'photo-1573164574572-cb89e39749b4',
    alt: 'Une équipe réunie autour d’une table avec des ordinateurs',
    body: 'Les chiffres clés, l’avancement des projets et les décisions à prendre sont déjà rassemblés. Vous arrivez au CA avec une vision claire, sans passer trois soirées à consolider des tableurs.',
    points: ['Synthèse budgétaire prête à présenter', 'Suivi des décisions et des votes', 'Historique des CA et AG au même endroit'],
  },
  {
    id: 1,
    orientation: 'landscape',
    eyebrow: 'Finances',
    title: 'Suivre budget et trésorerie en temps réel',
    photo: 'photo-1517048676732-d65bc937f952',
    alt: 'Une réunion de travail autour de documents',
    body: 'Budget voté, réalisé et écarts se mettent à jour au fil des transactions. Les projections de trésorerie vous montrent les mois tendus avant qu’ils n’arrivent.',
    points: ['Budget et réalisé comparés en continu', 'Projection de trésorerie sur 12 mois', 'Alertes quand un poste dérive'],
  },
  {
    id: 2,
    orientation: 'portrait',
    eyebrow: 'Financements',
    title: 'Ne plus rater un appel à projets',
    photo: 'photo-1599059813005-11265ba4b4ce',
    alt: 'Des bénévoles trient des dons',
    body: 'PilotAsso repère les subventions et appels à projets adaptés à votre association et centralise toutes les échéances : dépôt, justificatifs, bilans.',
    points: ['Opportunités filtrées selon votre activité', 'Calendrier unique des échéances', 'Suivi de chaque financeur'],
  },
  {
    id: 3,
    orientation: 'landscape',
    eyebrow: 'Projets',
    title: 'Garder le fil de chaque projet',
    photo: 'photo-1542744173-8e7e53415bb0',
    alt: 'Une personne présente un projet à son équipe',
    body: 'Chaque projet a son budget, ses financements et son activité. Vous savez où il en est, ce qu’il a coûté et ce qu’il reste à financer.',
    points: ['Budget et financements par projet', 'Avancement partagé avec l’équipe', 'Bilans de projet générés pour les financeurs'],
  },
  {
    id: 4,
    orientation: 'portrait',
    eyebrow: 'Automatisation',
    title: 'Classer les dépenses sans y passer la soirée',
    photo: 'photo-1787647561633-dcbbad61f227',
    alt: 'Une bénévole souriante travaille sur son ordinateur',
    body: 'Les transactions bancaires arrivent toutes seules et sont classées automatiquement par poste et par projet. Il ne reste qu’à valider.',
    points: ['Synchronisation bancaire', 'Catégorisation automatique', 'Moins de saisie, moins d’erreurs'],
  },
];

const photoUrl = (c: UseCase, w: number) =>
  `https://images.unsplash.com/${c.photo}?auto=format&fit=crop&w=${w}&h=${Math.round(
    c.orientation === 'portrait' ? w * 1.25 : w * 0.625,
  )}&q=80`;

interface Slot {
  x: number;
  y: number;
  rotate: number;
  scale: number;
  zIndex: number;
}

const SLOTS_DESKTOP: Slot[] = [
  { x: 0, y: 0, rotate: 1.5, scale: 1, zIndex: 50 },
  { x: 190, y: -30, rotate: 12, scale: 0.9, zIndex: 40 },
  { x: -180, y: -10, rotate: -14, scale: 0.89, zIndex: 30 },
  { x: 110, y: 70, rotate: 8, scale: 0.86, zIndex: 20 },
  { x: -130, y: 60, rotate: -9, scale: 0.84, zIndex: 10 },
];

const SLOTS_MOBILE: Slot[] = [
  { x: 0, y: 0, rotate: 1, scale: 1, zIndex: 50 },
  { x: 80, y: -15, rotate: 6, scale: 0.92, zIndex: 40 },
  { x: -75, y: 20, rotate: -7, scale: 0.91, zIndex: 30 },
  { x: 50, y: 35, rotate: 4, scale: 0.88, zIndex: 20 },
  { x: -50, y: 25, rotate: -4.5, scale: 0.87, zIndex: 10 },
];

const SPRING = { type: 'spring' as const, stiffness: 280, damping: 26 };
const MOUNT_SPRING = { type: 'spring' as const, stiffness: 200, damping: 22 };
const SHADOW_FOCUS = '0 24px 48px rgba(11,27,51,0.28), 0 6px 14px rgba(11,27,51,0.16)';
const SHADOW_REST = '0 12px 28px rgba(11,27,51,0.18), 0 4px 8px rgba(11,27,51,0.12)';
const RING = 'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime-500';

/* ----------------------------------------------------------------- popup */

function DetailModal({ item, onClose }: { item: UseCase; onClose: () => void }) {
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const previous = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    const overflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = overflow;
      previous?.focus();
    };
  }, [onClose]);

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-end justify-center p-0 sm:items-center sm:p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="absolute inset-0 bg-ink/60 backdrop-blur-sm" onClick={onClose} aria-hidden />
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-labelledby={`case-${item.id}-title`}
        className="relative max-h-[92svh] w-full max-w-2xl overflow-y-auto rounded-t-3xl bg-white text-ink shadow-[0_40px_100px_-20px_rgba(11,27,51,0.6)] sm:rounded-3xl"
        initial={{ y: 60, scale: 0.96, opacity: 0 }}
        animate={{ y: 0, scale: 1, opacity: 1 }}
        exit={{ y: 40, scale: 0.97, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 320, damping: 30 }}
      >
        <div className="relative h-56 overflow-hidden sm:h-64">
          <img src={photoUrl({ ...item, orientation: 'landscape' }, 1200)} alt={item.alt} className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/50 to-transparent" />
          <span className="absolute bottom-4 left-6 rounded-full bg-lime-300 px-3 py-1 text-xs font-semibold text-ink">
            {item.eyebrow}
          </span>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Fermer"
            className={`absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-ink backdrop-blur transition-colors hover:bg-white ${RING}`}
          >
            <X size={18} />
          </button>
        </div>
        <div className="p-6 sm:p-8">
          <h3 id={`case-${item.id}-title`} className="text-2xl font-semibold leading-tight tracking-heading sm:text-3xl">
            {item.title}
          </h3>
          <p className="mt-4 text-base leading-relaxed text-ink/70">{item.body}</p>
          <ul className="mt-6 flex flex-col gap-3">
            {item.points.map((point) => (
              <li key={point} className="flex items-start gap-3 text-[15px] text-ink/85">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-ink text-lime-300">
                  <Check size={12} strokeWidth={3} />
                </span>
                {point}
              </li>
            ))}
          </ul>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#demo"
              onClick={onClose}
              className="inline-flex items-center gap-1.5 rounded-full bg-lime-300 px-6 py-3 text-sm font-medium text-black transition-colors duration-300 hover:bg-lime-200"
            >
              Réserver une démo
              <ChevronRight size={16} />
            </a>
            <button
              type="button"
              onClick={onClose}
              className="rounded-full border border-ink/15 px-6 py-3 text-sm text-ink transition-colors duration-300 hover:bg-ink/5"
            >
              Fermer
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ------------------------------------------------------------ card stack */

function CardStack({ onOpen }: { onOpen: (item: UseCase) => void }) {
  const [order, setOrder] = useState<number[]>(CASES.map((c) => c.id));
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const dragDelta = useRef(0);
  const reduceMotion = useReducedMotion();
  const inView = useInView(containerRef, { once: true, amount: 0.3 });

  // Staggered entrance once the stack scrolls into view, then snappy springs.
  useEffect(() => {
    if (!inView) return;
    const t = window.setTimeout(() => setMounted(true), 900);
    return () => window.clearTimeout(t);
  }, [inView]);

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 640px)');
    const apply = () => setIsMobile(!mq.matches);
    apply();
    mq.addEventListener('change', apply);
    return () => mq.removeEventListener('change', apply);
  }, []);

  const focusCard = useCallback((id: number) => {
    setOrder((prev) => {
      const idx = prev.indexOf(id);
      if (idx <= 0) return prev;
      return [id, ...prev.slice(0, idx), ...prev.slice(idx + 1)];
    });
  }, []);

  const step = useCallback((dir: 1 | -1) => {
    setOrder((prev) =>
      dir === 1 ? [...prev.slice(1), prev[0]] : [prev[prev.length - 1], ...prev.slice(0, prev.length - 1)],
    );
  }, []);

  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      if (event.key !== 'ArrowRight' && event.key !== 'ArrowLeft') return;
      const root = containerRef.current;
      if (!root || !root.contains(document.activeElement)) return;
      event.preventDefault();
      step(event.key === 'ArrowRight' ? 1 : -1);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [step]);

  const handleDragEnd = useCallback(
    (_: unknown, info: PanInfo) => {
      if (info.offset.x < -80 || info.velocity.x < -400) step(1);
      else if (info.offset.x > 80 || info.velocity.x > 400) step(-1);
    },
    [step],
  );

  const slots = isMobile ? SLOTS_MOBILE : SLOTS_DESKTOP;
  const front = CASES.find((c) => c.id === order[0])!;

  return (
    <div ref={containerRef} className="relative mx-auto flex w-full max-w-4xl flex-col items-center gap-8">
      <div
        role="group"
        aria-label="Cas d’usage PilotAsso"
        aria-describedby="cases-hint"
        className="relative flex w-full select-none items-center justify-center"
        style={{ perspective: '1400px', height: 'clamp(380px, 46vw, 500px)' }}
      >
        {CASES.map((card) => {
          const slotIndex = order.indexOf(card.id);
          const slot = slots[slotIndex];
          const isFocus = slotIndex === 0;
          const isLandscape = card.orientation === 'landscape';
          const widthClass = isLandscape
            ? isMobile
              ? 'w-[clamp(220px,64vw,280px)]'
              : 'w-[clamp(260px,30vw,360px)]'
            : isMobile
              ? 'w-[clamp(160px,46vw,200px)]'
              : 'w-[clamp(190px,22vw,250px)]';

          return (
            <motion.div
              key={card.id}
              tabIndex={0}
              role="button"
              aria-label={isFocus ? `${card.title}, en avant. Ouvrir le détail.` : `Afficher : ${card.title}`}
              onPointerDown={() => {
                dragDelta.current = 0;
              }}
              onClick={(event) => {
                event.preventDefault();
                if (Math.abs(dragDelta.current) >= 8) return;
                if (isFocus) onOpen(card);
                else focusCard(card.id);
              }}
              onKeyDown={(event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                  event.preventDefault();
                  if (isFocus) onOpen(card);
                  else focusCard(card.id);
                }
              }}
              drag={isFocus ? 'x' : false}
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.6}
              onDrag={(_, info) => {
                dragDelta.current = info.offset.x;
              }}
              onDragEnd={handleDragEnd}
              className={`absolute ${widthClass} rounded-[20px] outline-none ${RING}`}
              style={{ cursor: isFocus ? 'grab' : 'pointer', zIndex: slot.zIndex }}
              initial={reduceMotion ? false : { opacity: 0, scale: 0.5, y: 60 }}
              animate={
                inView || reduceMotion
                  ? { x: slot.x, y: slot.y, rotate: slot.rotate, scale: slot.scale, opacity: 1 }
                  : { opacity: 0, scale: 0.5, y: 60 }
              }
              transition={!reduceMotion && !mounted ? { ...MOUNT_SPRING, delay: slotIndex * 0.08 } : SPRING}
              whileTap={isFocus ? { cursor: 'grabbing' } : undefined}
            >
              <motion.div
                className="relative flex w-full flex-col rounded-[20px] bg-white p-2.5 ring-1 ring-ink/[0.08]"
                style={{ boxShadow: isFocus ? SHADOW_FOCUS : SHADOW_REST }}
                animate={
                  reduceMotion
                    ? undefined
                    : { y: isFocus ? [0, -12, 0, 8, 0] : [0, -6, 0, 5, 0], rotate: isFocus ? [0, 1.2, 0, -1.2, 0] : [0, 0.8, 0, -0.8, 0] }
                }
                transition={reduceMotion ? undefined : { duration: 7 + card.id * 0.6, repeat: Infinity, ease: 'easeInOut' }}
              >
                <div className="relative px-3 pb-2 pt-3">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-ink/45">{card.eyebrow}</p>
                  <p className="mt-1 line-clamp-2 min-h-[2.6em] pr-10 text-[15px] font-semibold leading-tight tracking-snug text-ink">
                    {card.title}
                  </p>
                  {isFocus && (
                    <motion.span
                      aria-hidden
                      className="absolute right-2 top-3 flex h-9 w-9 items-center justify-center rounded-xl bg-ink text-lime-300 shadow-lg"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      whileHover={{ scale: 1.1 }}
                      transition={SPRING}
                    >
                      <Plus size={18} strokeWidth={2.5} />
                    </motion.span>
                  )}
                </div>
                <div className={`relative w-full overflow-hidden rounded-xl ${isLandscape ? 'aspect-[16/10]' : 'aspect-[4/5]'}`}>
                  <img
                    src={photoUrl(card, isLandscape ? 720 : 500)}
                    alt={card.alt}
                    loading="lazy"
                    draggable={false}
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                </div>
              </motion.div>
            </motion.div>
          );
        })}
      </div>

      <p className="sr-only" aria-live="polite">
        {front.title} en avant
      </p>

      <div className="flex flex-col items-center gap-3">
        <div className="flex items-center gap-1.5">
          {CASES.map((card) => {
            const isCurrent = front.id === card.id;
            return (
              <button
                key={card.id}
                type="button"
                aria-label={`Afficher : ${card.title}`}
                aria-current={isCurrent ? true : undefined}
                onClick={() => focusCard(card.id)}
                className={`flex h-6 w-6 items-center justify-center rounded-full outline-none ${RING}`}
              >
                <motion.span
                  className="block h-[5px] rounded-full bg-ink"
                  animate={{ width: isCurrent ? 22 : 5, opacity: isCurrent ? 1 : 0.3 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              </button>
            );
          })}
        </div>
        <p id="cases-hint" className="text-sm text-ink/55">
          Faites glisser, cliquez ou utilisez les flèches{NB}· <span className="font-medium text-ink/75">+ pour en savoir plus</span>
        </p>
      </div>
    </div>
  );
}

export default function UseCases() {
  const [open, setOpen] = useState<UseCase | null>(null);
  const close = useCallback(() => setOpen(null), []);

  return (
    <Section id="cas-usage" className="overflow-x-clip">
      <div className="mx-auto max-w-2xl text-center">
        <Reveal>
          <Eyebrow tone="light">Au quotidien</Eyebrow>
        </Reveal>
        <Reveal delay={120} className="mt-5">
          <Heading tone="light">Ce que PilotAsso change, concrètement.</Heading>
        </Reveal>
        <Reveal delay={240} className="mt-6">
          <Lead tone="light">Cinq moments de la vie d’une association, avant et après PilotAsso.</Lead>
        </Reveal>
      </div>

      <div className="mt-14">
        <CardStack onOpen={setOpen} />
      </div>

      <AnimatePresence>{open && <DetailModal key={open.id} item={open} onClose={close} />}</AnimatePresence>
    </Section>
  );
}
