import { Hexagon } from 'lucide-react';

export default function Logo() {
  return (
    <a href="#top" className="flex items-center gap-2 text-white" aria-label="PilotAsso, accueil">
      <Hexagon size={24} strokeWidth={1.5} />
      <span className="text-lg font-medium tracking-tight sm:text-xl">pilotasso</span>
    </a>
  );
}
