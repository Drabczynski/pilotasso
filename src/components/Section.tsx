import type { ReactNode } from 'react';

type Tone = 'dark' | 'light';

type SectionProps = {
  id?: string;
  className?: string;
  children: ReactNode;
};

/** Section with content kept in a centred column. */
export default function Section({ id, className = '', children }: SectionProps) {
  return (
    <section id={id} className={`px-5 py-24 sm:px-8 sm:py-32 md:px-12 ${className}`}>
      <div className="mx-auto w-full max-w-6xl">{children}</div>
    </section>
  );
}

export function Eyebrow({ children, tone = 'dark' }: { children: ReactNode; tone?: Tone }) {
  return (
    <p
      className={`font-mono text-xs font-medium uppercase tracking-[0.15em] ${
        tone === 'dark' ? 'text-white/85 drop-shadow-md' : 'text-ink/50'
      }`}
    >
      {children}
    </p>
  );
}

export function Heading({
  children,
  className = '',
  tone = 'dark',
}: {
  children: ReactNode;
  className?: string;
  tone?: Tone;
}) {
  return (
    <h2
      className={`text-3xl font-semibold leading-[1.08] tracking-display sm:text-4xl lg:text-5xl ${
        tone === 'dark' ? 'text-white drop-shadow-lg' : 'text-ink'
      } ${className}`}
    >
      {children}
    </h2>
  );
}

export function Lead({ children, className = '', tone = 'dark' }: { children: ReactNode; className?: string; tone?: Tone }) {
  return (
    <p
      className={`text-base leading-relaxed tracking-snug sm:text-lg ${
        tone === 'dark' ? 'text-white/90 drop-shadow-md' : 'text-ink/65'
      } ${className}`}
    >
      {children}
    </p>
  );
}
