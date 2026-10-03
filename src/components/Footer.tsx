import { useState, type FormEvent } from 'react';
import Logo from './Logo';

const columns = [
  {
    title: 'Produit',
    links: ['Solutions', 'Fédérations & réseaux', 'Tarifs', 'Programme bêta', "S'abonner"],
  },
  {
    title: 'Entreprise',
    links: ['Ressources', 'FAQ', 'Demander une démo', 'Contact'],
  },
];

const legal = ['Mentions légales', 'Confidentialité', 'CGU', 'CGV', 'DPA', 'Cookies', 'Gérer les cookies'];

export default function Footer() {
  const [sent, setSent] = useState(false);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <footer className="bg-ink pt-14 text-white">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 md:px-12">
        <div className="grid gap-10 pb-12 md:grid-cols-[1.4fr_1fr_1fr_1.4fr]">
          <div className="flex flex-col gap-4">
            <Logo />
            <p className="max-w-xs text-sm leading-relaxed text-white/70">
              La plateforme de pilotage des associations. Construite avec des associations, pour les associations.
            </p>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.15em] text-white/55">{col.title}</p>
              <ul className="flex flex-col gap-2.5">
                {col.links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-sm text-white/85 transition-colors duration-300 hover:text-white">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div id="abonnement">
            <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.15em] text-white/55">Restez informé</p>
            <p className="mb-4 text-sm text-white/85">Recevez l'actualité de PilotAsso avant tout le monde.</p>
            {sent ? (
              <p className="text-sm text-white">Merci, c'est noté.</p>
            ) : (
              <form onSubmit={onSubmit} className="flex flex-col gap-3">
                <div className="flex gap-2">
                  <input
                    type="email"
                    required
                    placeholder="vous@association.org"
                    aria-label="Adresse e-mail"
                    className="min-w-0 flex-1 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm text-white placeholder:text-white/45 backdrop-blur-md focus:border-white/50 focus:outline-none"
                  />
                  <button
                    type="submit"
                    className="rounded-full bg-lime-300 px-4 py-2 text-xs font-medium text-black transition-colors duration-300 hover:bg-lime-200"
                  >
                    OK
                  </button>
                </div>
                <label className="flex items-start gap-2 text-xs leading-relaxed text-white/60">
                  <input type="checkbox" required className="mt-0.5 accent-white" />
                  J'accepte de recevoir les actualités PilotAsso. Désinscription possible à tout moment.
                </label>
              </form>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-4 border-t border-white/15 py-6 text-xs text-white/55 md:flex-row md:items-center md:justify-between">
          <p>© 2026 PilotAsso. Tous droits réservés.</p>
          <ul className="flex flex-wrap gap-x-5 gap-y-2">
            {legal.map((item) => (
              <li key={item}>
                <a href="#" className="transition-colors duration-300 hover:text-white">
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
