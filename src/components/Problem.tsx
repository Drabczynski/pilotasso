import { FileSpreadsheet, FileText, FolderOpen, Hexagon } from 'lucide-react';
import Reveal from './Reveal';
import Section, { Eyebrow, Lead } from './Section';

const files = [
  { icon: FileSpreadsheet, name: 'Budget_2026_v3_FINAL.xlsx', className: 'rotate-[-4deg]' },
  { icon: FileSpreadsheet, name: 'Trésorerie_mensuelle.xlsx', className: 'translate-x-10 rotate-[3deg]' },
  { icon: FolderOpen, name: 'Subventions (dossier partagé)', className: '-translate-x-4 rotate-[-2deg]' },
  { icon: FileText, name: 'CR_Conseil_administration.docx', className: 'translate-x-6 rotate-[4deg]' },
];

export default function Problem() {
  return (
    <Section className="pt-28 sm:pt-36">
      <div className="grid items-center gap-16 lg:grid-cols-[1.1fr_1fr]">
        <div>
          <Reveal>
            <Eyebrow tone="light">Le constat</Eyebrow>
          </Reveal>
          <Reveal delay={120} className="mt-5">
            <h2 className="text-3xl font-semibold leading-[1.08] tracking-display text-ink sm:text-4xl lg:text-5xl">
              Combien de{' '}
              <span className="bg-[linear-gradient(transparent_62%,#bef264_62%)] px-1">fichiers</span> devez-vous
              ouvrir pour savoir où en est votre association ?
            </h2>
          </Reveal>
          <Reveal delay={240} className="mt-6 max-w-xl">
            <Lead tone="light">
              Un tableau Excel pour le budget, un autre pour la trésorerie, un espace partagé pour les subventions,
              des documents dispersés pour les projets… Chaque réponse demande d'ouvrir plusieurs outils, et
              l'information n'est jamais tout à fait à jour.
            </Lead>
          </Reveal>
        </div>

        <div className="relative mx-auto flex w-full max-w-sm flex-col items-center gap-3">
          {files.map(({ icon: Icon, name, className }, i) => (
            <Reveal key={name} delay={200 + i * 120} from={i % 2 ? 'right' : 'left'} className="w-full">
              <div
                className={`flex items-center gap-3 rounded-xl border border-ink/10 bg-white px-4 py-3 text-sm text-ink/70 shadow-[0_8px_24px_-12px_rgba(11,27,51,0.25)] ${className}`}
              >
                <Icon size={16} className="shrink-0 text-ink/40" />
                <span className="truncate">{name}</span>
              </div>
            </Reveal>
          ))}
          <Reveal delay={750} from="scale" className="mt-6 w-full">
            <div className="flex items-center gap-3 rounded-2xl bg-ink px-5 py-4 text-white shadow-[0_20px_50px_-15px_rgba(11,27,51,0.6)]">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-lime-300 text-ink">
                <Hexagon size={18} strokeWidth={2} />
              </span>
              <div>
                <p className="text-sm font-semibold tracking-snug">Un seul tableau de bord</p>
                <p className="text-xs text-white/60">Toujours à jour, pour toute l'équipe</p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
