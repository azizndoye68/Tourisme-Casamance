# Mission

Maintenir un site vitrine statique, bilingue (français/anglais), pour le tourisme en Casamance. Le dépôt ne contient aucun backend, CMS, base de données ou API dynamique.

## Stack

- Next.js App Router avec export statique (`frontend/out`)
- TypeScript, React et Tailwind CSS
- next-intl pour l’interface française et anglaise
- Leaflet avec OpenStreetMap pour les cartes
- Hébergement sur une plateforme de fichiers statiques

## Règles de contenu

- Les données éditoriales sont maintenues dans `frontend/src/data/content.json`.
- Les traductions UI résident dans `frontend/messages/fr.json` et `frontend/messages/en.json`.
- Ne pas inventer de prix, horaires, numéros, lieux ou faits touristiques. Les informations inconnues restent marquées `[À REMPLACER]` ou sont omises.
- Les images sont des fichiers locaux dans `frontend/public`; utiliser un placeholder local tant qu’une image n’est pas fournie.
- Toute nouvelle page doit pouvoir être générée au build sans réseau, base de données ni secret d’exécution. Seules les tuiles de carte peuvent être chargées depuis OpenStreetMap dans le navigateur.

## Démarrage et publication

- Développement : `npm run dev`
- Export : `npm run build`
- Le résultat publiable est `frontend/out`.
- Utiliser `npm run type-check`, `npm run lint` et `npm run test` pour les vérifications du frontend.

## Direction artistique

Conserver l’identité éditoriale chaleureuse et végétale : verts forêt et émeraude, fond crème, formes arrondies, motifs arche et feuille, typographie système sans chargement externe. Concevoir d’abord pour mobile, assurer la navigation clavier et respecter `prefers-reduced-motion`.
