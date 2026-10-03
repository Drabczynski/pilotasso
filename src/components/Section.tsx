import type { ReactNode } from 'react';

type SectionProps = {
  id?: string;
  className?: string;
  children: ReactNode;
};

/** Full-viewport transparent shell laid over the scroll video. */
export default function Section({ id, className = '', children }: SectionProps) {
  return (
    <section
      id={id}
      className={`flex min-h-screen flex-col justify-between px-5 pb-12 pt-24 supports-[height:100svh]:min-h-[100svh] sm:px-8 sm:pt-28 md:px-12 md:pb-16 ${className}`}
    >
      {children}
    </section>
  );
}
