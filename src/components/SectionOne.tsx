import { ChevronRight, Hexagon } from 'lucide-react';
import Badge from './Badge';
import Reveal from './Reveal';
import Section from './Section';

const services = ['Finances & trésorerie', 'Recherche de financements', 'Projets & gouvernance'];

export default function SectionOne() {
  return (
    <Section id="top">
      <div className="flex flex-col gap-8 sm:flex-row sm:justify-between">
        <ul className="flex flex-col gap-2">
          {services.map((service, i) => (
            <Reveal
              as="li"
              key={service}
              delay={150 + i * 120}
              className="font-mono text-xs uppercase tracking-[0.15em] text-white/90 drop-shadow-md"
            >
              / {service}
            </Reveal>
          ))}
        </ul>

        <Reveal delay={300} className="max-w-xs sm:text-right">
          <p className="text-lg leading-relaxed text-white drop-shadow-md sm:text-xl">
            Vos finances, vos projets et vos financements enfin réunis — sans abandonner les outils qui
            marchent déjà.
          </p>
        </Reveal>
      </div>

      <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
        <div>
          <Reveal delay={150} className="mb-5">
            <Badge>Construit avec 14 associations</Badge>
          </Reveal>
          <Reveal as="h1" delay={280}>
            <span className="block text-5xl font-normal leading-[1.05] tracking-tight text-white drop-shadow-lg sm:text-6xl lg:text-7xl">
              Moins de fichiers.
              <br />
              Plus de mission.
            </span>
          </Reveal>
        </div>

        <Reveal delay={420} className="self-start md:self-auto">
          <div className="flex items-center gap-4 rounded-xl bg-white/15 p-3 backdrop-blur-md">
            <div className="flex h-24 w-20 shrink-0 items-center justify-center rounded-lg border border-white/20 bg-white/10">
              <Hexagon size={32} strokeWidth={1.25} className="text-white/80" />
            </div>
            <div className="flex flex-col gap-1.5 pr-2">
              <p className="text-sm font-medium text-white">Parlez à l'équipe</p>
              <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-white/60">
                30 min · sans engagement
              </p>
              <a
                href="#demo"
                className="mt-1.5 inline-flex w-fit items-center gap-1 rounded-full bg-white px-4 py-2 text-xs font-medium text-black transition-colors duration-300 hover:bg-white/85"
              >
                Réserver ma démo
                <ChevronRight size={14} />
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
