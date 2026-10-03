import { ArrowRight, ChevronRight } from 'lucide-react';
import DashboardMock from './DashboardMock';
import Reveal from './Reveal';

export default function SectionOne() {
  return (
    <section id="top" className="px-5 pb-24 pt-36 sm:px-8 sm:pt-44 md:px-12">
      <div className="mx-auto flex max-w-6xl flex-col items-center text-center">
        <Reveal delay={100}>
          <a
            href="#beta"
            className="group inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 py-1.5 pl-1.5 pr-4 text-sm text-white/90 backdrop-blur-md transition-colors duration-300 hover:bg-white/20"
          >
            <span className="rounded-full bg-white px-2.5 py-0.5 text-xs font-medium text-black">Bêta</span>
            14 associations construisent PilotAsso
            <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-0.5" />
          </a>
        </Reveal>

        <Reveal as="h1" delay={220} className="mt-8 max-w-5xl">
          <span className="block text-5xl font-semibold leading-[0.98] tracking-display text-white drop-shadow-lg sm:text-6xl md:text-7xl lg:text-[5.5rem]">
            Pilotez votre association,
            <span className="text-white/60"> pas vos fichiers Excel.</span>
          </span>
        </Reveal>

        <Reveal delay={360} className="mt-8 max-w-3xl">
          <p className="text-lg leading-relaxed tracking-snug text-white/85 drop-shadow-md sm:text-xl md:text-[1.375rem] md:leading-relaxed">
            Un budget dans un tableur, la trésorerie dans un autre, les subventions dans un dossier partagé…
            PilotAsso réunit vos finances, vos projets et vos financements en un seul endroit, repère les
            opportunités faites pour vous, et garde les outils qui fonctionnent déjà.
          </p>
        </Reveal>

        <Reveal delay={480} className="mt-10 flex flex-wrap justify-center gap-3">
          <a
            href="#demo"
            className="inline-flex items-center gap-1.5 rounded-full bg-white px-6 py-3 text-sm font-medium tracking-snug text-black transition-colors duration-300 hover:bg-white/85 sm:text-base"
          >
            Réserver ma démo gratuite
            <ChevronRight size={16} />
          </a>
          <a
            href="#solutions"
            className="rounded-full border border-white/25 bg-white/10 px-6 py-3 text-sm tracking-snug text-white backdrop-blur-md transition-colors duration-300 hover:bg-white/20 sm:text-base"
          >
            Découvrir la plateforme
          </a>
        </Reveal>

        <Reveal delay={560}>
          <p className="mt-5 text-sm text-white/60">30 minutes, sans engagement · Construit avec et pour les associations</p>
        </Reveal>

        <DashboardMock />
      </div>
    </section>
  );
}
