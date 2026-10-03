import { useEffect, useRef, useState } from 'react';

/** True once the element has scrolled into view (fires once). */
export function useInView<T extends Element>(threshold = 0.3) {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);
  return [ref, inView] as const;
}

/** Steps 0..count once `active` turns true, one every `interval` ms. */
export function useSteps(active: boolean, count: number, interval = 600, startDelay = 400) {
  const [step, setStep] = useState(0);
  useEffect(() => {
    if (!active) return;
    const timers: number[] = [];
    for (let i = 1; i <= count; i++) {
      timers.push(window.setTimeout(() => setStep(i), startDelay + i * interval));
    }
    return () => timers.forEach(clearTimeout);
  }, [active, count, interval, startDelay]);
  return step;
}
