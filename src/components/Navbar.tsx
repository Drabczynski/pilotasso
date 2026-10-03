import { useEffect, useState } from 'react';
import Logo from './Logo';
import Reveal from './Reveal';
import { VIDEO_END_ID } from './ScrollVideo';

const links = [
  { label: 'Solutions', href: '#solutions' },
  { label: 'Fédérations', href: '#federations' },
  { label: 'Tarifs', href: '#tarifs' },
  { label: 'Ressources', href: '#ressources' },
  { label: 'Programme bêta', href: '#beta', sup: '14' },
];

/** True once the white page has slid up under the navbar. */
function useOverLightPage() {
  const [light, setLight] = useState(false);
  useEffect(() => {
    const update = () => {
      const end = document.getElementById(VIDEO_END_ID);
      setLight(!!end && end.getBoundingClientRect().top <= 64);
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, []);
  return light;
}

export default function Navbar() {
  const light = useOverLightPage();

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b backdrop-blur-md transition-colors duration-500 ${
        light ? 'border-ink/10 bg-white/80 text-ink' : 'border-white/15 bg-white/5 text-white'
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8 md:px-12">
        <Reveal>
          <Logo />
        </Reveal>

        <ul className="hidden items-center gap-8 md:flex lg:gap-10">
          {links.map((link, i) => (
            <Reveal as="li" key={link.label} delay={100 + i * 100}>
              <a href={link.href} className="text-sm opacity-80 transition-opacity duration-300 hover:opacity-100">
                {link.label}
                {link.sup && <sup className="ml-0.5 font-mono text-[10px] opacity-60">{link.sup}</sup>}
              </a>
            </Reveal>
          ))}
        </ul>

        <Reveal delay={600} className="flex items-center gap-4">
          <a
            href="#connexion"
            className="hidden text-sm opacity-80 transition-opacity duration-300 hover:opacity-100 lg:inline"
          >
            Connexion
          </a>
          <a
            href="#demo"
            className="rounded-full bg-lime-300 px-4 py-2 text-xs font-medium text-black transition-colors duration-300 hover:bg-lime-200 sm:px-5 sm:text-sm"
          >
            Demander une démo
          </a>
        </Reveal>
      </nav>
    </header>
  );
}
