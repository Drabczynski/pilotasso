import { useLayoutEffect, useRef, useState, type ReactNode } from 'react';

/**
 * Key moments of the background video, as a fraction of its length.
 * hero.mp4 (169 frames): LiDAR scan until ~0.36, photographic from ~0.55,
 * the team around the laptop from ~0.92.
 */
const HERO_LEAVES_AT = 0.38;
const MOMENTS = [0.57, 0.93];
const GAP = 0.15; // min gap (in viewport heights) between hero bottom and the first message

type Layout = { height: number; tops: number[] };

/**
 * Lays out the dark zone over the scroll video so each message is centred on
 * screen exactly when the video reaches its moment. Video progress is
 * scrollY / (zoneHeight - viewportHeight), see ScrollVideo.
 */
export default function DarkZone({ hero, messages }: { hero: ReactNode; messages: ReactNode[] }) {
  const heroRef = useRef<HTMLDivElement>(null);
  const msgRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [layout, setLayout] = useState<Layout | null>(null);

  useLayoutEffect(() => {
    const compute = () => {
      const heroEl = heroRef.current;
      if (!heroEl) return;
      const vh = window.innerHeight;
      const heroH = heroEl.offsetHeight;
      const heights = msgRefs.current.map((el) => el?.offsetHeight ?? 0);

      // Hero (and its dashboard) has mostly scrolled away when the scan ends.
      let maxScroll = Math.max(3.5 * vh, (heroH - 0.5 * vh) / HERO_LEAVES_AT);
      // Make sure the first message never overlaps the hero.
      const firstTop = (s: number) => MOMENTS[0] * s + vh / 2 - heights[0] / 2;
      while (firstTop(maxScroll) < heroH + GAP * vh) maxScroll += 0.1 * vh;

      const tops = MOMENTS.map((m, i) => Math.round(m * maxScroll + vh / 2 - heights[i] / 2));
      setLayout({ height: Math.round(maxScroll + vh), tops });
    };

    compute();
    const ro = new ResizeObserver(compute);
    if (heroRef.current) ro.observe(heroRef.current);
    msgRefs.current.forEach((el) => el && ro.observe(el));
    window.addEventListener('resize', compute);
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', compute);
    };
  }, []);

  return (
    <div className="relative overflow-x-clip" style={{ height: layout ? layout.height : undefined }}>
      <div ref={heroRef}>{hero}</div>
      {messages.map((message, i) => (
        <div
          key={i}
          ref={(el) => {
            msgRefs.current[i] = el;
          }}
          className="absolute inset-x-0 px-5 sm:px-8 md:px-12"
          style={{ top: layout ? layout.tops[i] : '100%', visibility: layout ? 'visible' : 'hidden' }}
        >
          <div className="mx-auto w-full max-w-6xl">{message}</div>
        </div>
      ))}
    </div>
  );
}
