# PilotAsso — site vitrine

Landing page PilotAsso : React + TypeScript + Vite + Tailwind CSS + lucide-react.
Fond vidéo plein écran piloté par le scroll, typographie Inter, panneaux en verre dépoli.

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
- La vidéo de fond est servie depuis un CDN tiers : héberger une copie (ou votre propre vidéo) dont vous avez les droits.
- Le formulaire newsletter n'est pas encore relié à un service d'envoi.
