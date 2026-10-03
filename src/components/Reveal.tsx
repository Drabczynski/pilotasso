import { useEffect, useRef, useState, type ElementType, type ReactNode } from 'react';

type From = 'up' | 'left' | 'right' | 'scale';

type RevealProps = {
  as?: ElementType;
  delay?: number;
  from?: From;
  className?: string;
  children: ReactNode;
};

const hidden: Record<From, string> = {
  up: 'translate-y-8 opacity-0',
  left: '-translate-x-16 translate-y-6 opacity-0',
  right: 'translate-x-16 translate-y-6 opacity-0',
  scale: 'translate-y-16 scale-[0.96] opacity-0',
};

export default function Reveal({ as: Tag = 'div', delay = 0, from = 'up', className = '', children }: RevealProps) {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const duration = from === 'up' ? 'duration-700' : 'duration-1000';

  return (
    <Tag
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`will-change-transform transition-all ${duration} ease-out ${
        visible ? 'translate-x-0 translate-y-0 scale-100 opacity-100' : hidden[from]
      } ${className}`}
    >
      {children}
    </Tag>
  );
}
