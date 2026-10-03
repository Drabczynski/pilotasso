# PilotAsso — site vitrine

Landing page PilotAsso : React + TypeScript + Vite + Tailwind CSS + lucide-react.
Fond vidéo plein écran piloté par le scroll, typographie Inter (auto-hébergée, interlettrage négatif), panneaux en verre dépoli.

```bash
npm install
npm run dev     # http://localhost:5199
npm run build
```

## Structure

- `src/components/ScrollVideo.tsx` — vidéo de fond « scrubbée » au scroll (cache de frames sur canvas, repli par seek de la vidéo)
- `src/components/Reveal.tsx` — apparition en fondu/translation à l'entrée dans le viewport
- `src/components/Section*.tsx` — sections de la page (hero, vision 360°, positionnement, bêta & démo)
- `src/components/Footer.tsx` — pied de page et inscription newsletter

## À compléter

- Les liens (`#demo`, `#tarifs`, …) sont des ancres provisoires à brancher sur les vraies pages.
- La carte « Parlez à l'équipe » du hero accueille une photo (80×96 px) : remplacer l'icône par un portrait réel.
- La vidéo de fond est `public/video/hero.mp4` (sans audio, une image clé toutes les 4 images pour un scrub fluide) et son image de chargement `hero-poster.jpg`.
- Le formulaire newsletter n'est pas encore relié à un service d'envoi.
