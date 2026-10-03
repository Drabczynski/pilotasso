import Logo from './Logo';
import Reveal from './Reveal';

const links = [
  { label: 'Solutions', href: '#solutions' },
  { label: 'Fédérations', href: '#federations' },
  { label: 'Tarifs', href: '#tarifs' },
  { label: 'Ressources', href: '#ressources' },
  { label: 'Programme bêta', href: '#beta', sup: '14' },
];

export default function Navbar() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/15 bg-white/5 backdrop-blur-md">
      <nav className="flex items-center justify-between px-5 py-4 sm:px-8 md:px-12">
        <Reveal>
          <Logo />
        </Reveal>

        <ul className="hidden items-center gap-8 md:flex lg:gap-10">
          {links.map((link, i) => (
            <Reveal as="li" key={link.label} delay={100 + i * 100}>
              <a href={link.href} className="text-sm text-white/85 transition-colors duration-300 hover:text-white">
                {link.label}
                {link.sup && <sup className="ml-0.5 font-mono text-[10px] text-white/60">{link.sup}</sup>}
              </a>
            </Reveal>
          ))}
        </ul>

        <Reveal delay={600} className="flex items-center gap-4">
          <a
            href="#connexion"
            className="hidden text-sm text-white/85 transition-colors duration-300 hover:text-white lg:inline"
          >
            Connexion
          </a>
          <a
            href="#demo"
            className="rounded-md border border-white/20 bg-white/15 px-4 py-2 text-xs text-white backdrop-blur-md transition-colors duration-300 hover:bg-white/25 sm:px-5 sm:text-sm"
          >
            Demander une démo
          </a>
        </Reveal>
      </nav>
    </header>
  );
}
