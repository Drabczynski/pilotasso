import type { ReactNode } from 'react';

type SectionProps = {
  id?: string;
  className?: string;
  children: ReactNode;
};

/** Transparent section laid over the scroll video, content kept in a centred column. */
export default function Section({ id, className = '', children }: SectionProps) {
  return (
    <section id={id} className={`px-5 py-24 sm:px-8 sm:py-32 md:px-12 ${className}`}>
      <div className="mx-auto w-full max-w-6xl">{children}</div>
    </section>
  );
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <p className="font-mono text-xs font-medium uppercase tracking-[0.15em] text-white/70 drop-shadow-md">
      {children}
    </p>
  );
}

export function Heading({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <h2
      className={`text-4xl font-semibold leading-[1.05] tracking-display text-white drop-shadow-lg sm:text-5xl lg:text-6xl ${className}`}
    >
      {children}
    </h2>
  );
}

export function Lead({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <p className={`text-lg leading-relaxed tracking-snug text-white/85 drop-shadow-md sm:text-xl ${className}`}>
      {children}
    </p>
  );
}
