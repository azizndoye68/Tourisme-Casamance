# Tourisme Casamance

Site vitrine bilingue (français / anglais) consacré à la Casamance. Le site est généré en fichiers statiques à partir de contenus locaux : aucun CMS, serveur applicatif ou base de données n’est nécessaire.

## Stack

- Next.js 14, React et TypeScript
- Tailwind CSS
- next-intl pour les textes français et anglais
- Leaflet et OpenStreetMap pour les cartes
- Export HTML/CSS/JS dans `frontend/out`

## Développement

Prérequis : Node.js 20 ou supérieur et npm 10 ou supérieur.

```bash
npm install --prefix frontend
npm run dev
```

Le serveur de développement affiche son URL dans le terminal (souvent <http://localhost:3001> lorsque le port 3000 est pris). Il compile chaque page à la première visite ; ces compilations à froid sont normales en développement. Arrête un serveur déjà lancé avec `Ctrl+C` avant d’en ouvrir un autre.

Pour naviguer dans la version optimisée, lance `npm start`. Cette commande génère l’export statique puis sert les fichiers sur <http://127.0.0.1:3000>. Les clics entre pages utilisent alors les pages déjà générées, sans compilation à la demande.

## Générer le site statique

```bash
npm run build
```

Le résultat prêt à héberger se trouve dans `frontend/out`. Publiez le contenu de ce dossier sur un hébergeur de fichiers statiques comme Vercel, Netlify, GitHub Pages ou un serveur web. Aucun service Node.js ne doit rester en ligne après la génération.

Pour générer les métadonnées et le sitemap avec le domaine public, créez `frontend/.env.local` depuis `frontend/.env.example` et définissez `NEXT_PUBLIC_SITE_URL`.

## Contenus

Les contenus des destinations, activités, itinéraires et hébergements sont dans [`frontend/src/data/content.json`](frontend/src/data/content.json). Vérifiez les descriptions, coordonnées et informations pratiques avant publication. Les photos d’illustration actuelles sont des images de démonstration servies par Unsplash ; remplacez-les par des photos locales autorisées avant la mise en ligne.

Les traductions de l’interface sont dans `frontend/messages/fr.json` et `frontend/messages/en.json`. Les styles, composants et pages se trouvent dans `frontend/src`.

## Commandes

```bash
npm run dev           # Développement local
npm run build         # Export statique dans frontend/out
npm start             # Construire et servir la version optimisée
npm run preview       # Servir le dernier export déjà généré sur le port 3000
npm run type-check    # Vérification TypeScript
npm run lint          # ESLint
npm run test          # Tests Vitest
npm run format        # Formater les fichiers frontend
```

Les cartes Leaflet chargent leurs tuiles OpenStreetMap depuis le navigateur. Le site lui-même ne contacte aucun backend.
