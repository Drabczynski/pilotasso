import { Banknote, Check, Search, Zap, type LucideIcon } from 'lucide-react';
import Reveal from './Reveal';
import Section, { Eyebrow, Heading, Lead } from './Section';

// Unsplash photos (Unsplash License, free for commercial use).
const photo = (id: string, w: number) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&h=${Math.round(w * 0.62)}&q=80`;

const pillars: {
  icon: LucideIcon;
  title: string;
  body: string;
  points: string[];
  image: { id: string; alt: string };
}[] = [
  {
    icon: Banknote,
    title: 'Du budget à la trésorerie',
    body: 'Budget, réel, écarts et trésorerie au même endroit, avec des projections pour anticiper plutôt que subir.',
    points: ['Budget et réalisé comparés en continu', 'Projections de trésorerie', 'Écarts visibles avant qu’ils ne bloquent'],
    image: { id: 'photo-1517048676732-d65bc937f952', alt: 'Une équipe autour d’une table, en réunion de travail' },
  },
  {
    icon: Search,
    title: 'Les financements',
    body: 'Les opportunités pertinentes pour votre association repérées plus tôt, et toutes vos échéances au même endroit.',
    points: ['Opportunités identifiées plus tôt', 'Échéances centralisées', 'Suivi unifié de vos financeurs'],
    image: { id: 'photo-1599059813005-11265ba4b4ce', alt: 'Des bénévoles trient des dons alimentaires' },
  },
  {
    icon: Zap,
    title: 'Les tâches répétitives',
    body: 'L’automatisation libère vos équipes : moins de temps à rassembler l’information, plus de temps pour décider.',
    points: ['Moins de saisie manuelle', 'Aide intelligente à la recherche', 'Préparation des bilans plus rapide'],
    image: { id: 'photo-1787647561633-dcbbad61f227', alt: 'Une bénévole souriante travaille sur son ordinateur' },
  },
];

export default function Pillars() {
  return (
    <Section id="fonctionnalites">
      <div className="max-w-2xl">
        <Reveal>
          <Eyebrow tone="light">La plateforme</Eyebrow>
        </Reveal>
        <Reveal delay={120} className="mt-5">
          <Heading tone="light">Trois sujets qui vous prennent du temps. Une seule plateforme.</Heading>
        </Reveal>
        <Reveal delay={240} className="mt-6">
          <Lead tone="light">
            PilotAsso rassemble ce qu'il faut connaître pour piloter votre association, sans naviguer entre dix
            outils différents.
          </Lead>
        </Reveal>
      </div>

      <div className="mt-14 grid gap-5 md:grid-cols-3">
        {pillars.map(({ icon: Icon, title, body, points, image }, i) => (
          <Reveal key={title} delay={150 + i * 130}>
            <div className="group h-full overflow-hidden rounded-3xl border border-ink/10 bg-white shadow-[0_1px_0_rgba(11,27,51,0.04)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_50px_-24px_rgba(11,27,51,0.35)]">
              <div className="relative overflow-hidden">
                <img
                  src={photo(image.id, 800)}
                  srcSet={`${photo(image.id, 500)} 500w, ${photo(image.id, 800)} 800w`}
                  sizes="(min-width: 768px) 33vw, 100vw"
                  alt={image.alt}
                  loading="lazy"
                  className="aspect-[16/10] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <span className="absolute bottom-4 left-5 flex h-11 w-11 items-center justify-center rounded-xl bg-lime-300 text-ink shadow-lg">
                  <Icon size={20} />
                </span>
              </div>
              <div className="p-7 pt-6">
                <h3 className="text-xl font-semibold tracking-heading text-ink">{title}</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-ink/65">{body}</p>
                <ul className="mt-6 flex flex-col gap-2.5 border-t border-ink/10 pt-6">
                  {points.map((point) => (
                    <li key={point} className="flex items-start gap-2.5 text-sm text-ink/80">
                      <Check size={15} className="mt-0.5 shrink-0 text-lime-600" />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
