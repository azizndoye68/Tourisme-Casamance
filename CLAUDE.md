# Mission

Tu es mon développeur full stack senior. Développe un site web vitrine de tourisme sur la **Casamance (Sénégal)**, de la conception au déploiement. Le site doit être beau, très rapide sur mobile, bien référencé et facile à mettre à jour par des non-développeurs.

Avant de coder, lis tout ce document, résume-moi ton plan en 10 lignes maximum, puis commence par la phase 1. Si une information essentielle manque, pose-moi une seule question groupée. Ne devine pas le contenu éditorial : utilise des textes d'exemple clairement marqués [À REMPLACER].

# Stack imposée

- Frontend : Next.js (App Router) + TypeScript + Tailwind CSS
- CMS headless : Strapi v5 (TypeScript) avec PostgreSQL
- Internationalisation : next-intl, français par défaut, anglais en second (structure prête pour d'autres langues)
- Images : next/image, formats WebP/AVIF, lazy loading
- Cartes : Leaflet + OpenStreetMap (pas de Google Maps)
- Conteneurisation : Docker Compose (frontend, Strapi, PostgreSQL), variables dans .env.example
- Qualité : ESLint, Prettier, tests de base (Vitest ou Playwright pour le parcours principal), GitHub Actions (lint + build + tests)
- Hébergement cible : frontend sur Vercel ou VPS, Strapi sur VPS avec Docker

# Direction artistique

**Principe** : un site chaleureux et vivant où **la verdure de la Casamance est la star** (mangroves, palmiers, forêts, rizières). Style éditorial moderne, coins très arrondis, motif signature en **arche** (bords supérieurs arrondis) et en **feuille** (rayon `0 44px 0 44px`). Pas de copie d'un site existant.

**Palette (définir en variables CSS / tokens Tailwind)**
- forest `#0E2A20` (fond sombre, texte principal)
- leaf `#14503A`
- emerald `#1E7F55` (couleur principale, boutons, titres d'accent)
- lime `#B6D94A` (accent clair sur fond sombre)
- mint `#CFE6B5` et `#E4F2CF` (halos, fonds doux)
- cream `#F2F6EA` (fond de page)
- coral `#FF6B3D` (petite touche : soleil, rare)
- sun `#FFB627` (réservé à la saison sèche)
- muted `#4F6358` (texte secondaire)

**Typographies (Google Fonts via next/font)** : Bricolage Grotesque 600/800 pour les titres (letter-spacing -0.02em), Manrope 400/500/600/700 pour le texte.

**Règles de style** : titres H2 autour de 52px sur desktop ; boutons en pilule (min 48px de haut) ; cartes avec rayon 24 à 32px ; pas d'emoji ; pas de dégradés décoratifs ; couleurs en aplats ; ratio de contraste AA minimum ; mobile first.

# Pages et sections

## Accueil
1. **Header** : logo « Casamance » avec un petit rond corail, menu (Destinations, Activités, Itinéraires, Quand partir, Où dormir), sélecteur FR/EN, bouton vert « Planifier mon voyage ». Menu burger sur mobile.
2. **Hero** : colonne texte à gauche (pastille « Sud du Sénégal », titre « Là où la mangrove rencontre l'océan » avec « mangrove » en emerald, sous-titre, deux boutons « Voir les itinéraires » et « Explorer les lieux », 3 chiffres clés : 28 350 km² de territoire, 300 km de fleuve, 0 voiture à Carabane). À droite : grande photo en forme d'**arche** avec un halo vert clair derrière, un petit cercle photo qui chevauche et un badge incliné « Saison sèche nov. à mai ».
3. **Bandeau canopée** : bord de feuillage découpé en haut d'un bandeau vert forêt contenant « Plages ✦ Mangroves ✦ Culture diola ✦ Écotourisme ✦ Pirogue ».
4. **La Casamance en vert** : section émeraude, titre « Mangroves, palmeraies et forêts à perte de vue », pastilles en forme de feuille (Palétuviers, Palmeraies, Caïlcédrats, Fromagers, Rôniers, Flamboyants).
5. **Destinations** : grille asymétrique de 5 cartes arrondies (grande carte Île de Carabane sur 2 lignes, puis Cap Skirring, Oussouye, Kafountine et Abéné, Basse Casamance), étiquette blanche avec nom et sous-titre sur chaque photo.
6. **Activités** : section vert forêt, liste numérotée (01 à 04) : Pirogue dans les bolongs, Observation des oiseaux, Villages et poterie, Marchés et gastronomie. Chaque ligne : numéro, titre, description, pastille de thème, flèche.
7. **Itinéraires** : 3 cartes colorées (3 jours « Le grand classique », 5 jours « Nature et culture », 7 jours « La Casamance complète ») avec la liste des étapes.
8. **Quand partir** : bloc blanc arrondi, deux cartes (Saison sèche nov. à mai en jaune, Hivernage juin à oct. en vert) et une frise des 12 mois.
9. **Où dormir** : 3 cartes avec photo en arche (campement, écolodge, hôtel), nom, lieu, prix « à partir de ».
10. **Témoignage** : bandeau lime avec une grande citation.
11. **Appel à l'action** : grand bloc vert forêt arrondi, inscription à la lettre d'information (email) + bouton WhatsApp.
12. **Footer** : logo, liens, mentions légales, confidentialité.

## Autres pages (gabarits dynamiques alimentés par Strapi)
- `/destinations` (liste filtrable par thème) et `/destinations/[slug]` (galerie, description, carte Leaflet, activités liées, hébergements proches)
- `/activites` et `/activites/[slug]`
- `/itineraires` et `/itineraires/[slug]` (étapes jour par jour, carte avec tracé)
- `/hebergements` et `/hebergements/[slug]` (bouton WhatsApp, prix indicatif)
- `/quand-partir`, `/infos-pratiques`, `/contact`, `/mentions-legales`, `/confidentialite`
- Pages 404 et erreur soignées

# Modèle de contenu Strapi (avec i18n activé)

- **Destination** : nom, slug, type (ville, île, plage, nature, culture), résumé, description riche, galerie, latitude/longitude, tags, mise en avant (booléen)
- **Activité** : titre, slug, résumé, description, thème, durée, destinations liées, galerie
- **Itinéraire** : titre, slug, nombre de jours, résumé, étapes (composant répétable : jour, titre, texte, destination liée)
- **Hébergement** : nom, slug, type (campement, écolodge, hôtel), destination, prix indicatif, contact WhatsApp, galerie
- **Témoignage** : texte, prénom, pays, publié
- **Page d'accueil** (single type) : tous les textes éditables du hero, des chiffres clés et des blocs
- **Paramètres du site** (single type) : nom, téléphone, email, WhatsApp, réseaux sociaux
- Rôles : un rôle « Éditeur » sans accès aux paramètres techniques

Fournis un script de seed avec des données d'exemple (toutes marquées [À REMPLACER]).

# Exigences non fonctionnelles

- **Performance** : Lighthouse mobile ≥ 90 partout ; images optimisées ; rendu statique (ISR) quand c'est possible ; polices préchargées
- **SEO** : métadonnées par page et par langue, balises hreflang, Open Graph, sitemap.xml, robots.txt, données structurées JSON-LD (TouristDestination, LodgingBusiness), URL propres
- **Accessibilité** : navigation clavier, focus visibles, textes alternatifs, labels de formulaires, respect de prefers-reduced-motion
- **Sécurité** : validation côté serveur du formulaire de contact et de la newsletter, protection anti-spam (honeypot + limitation de débit), en-têtes de sécurité, secrets hors du dépôt
- **Contexte local** : le site doit rester utilisable avec une connexion lente ; bouton WhatsApp visible sur mobile ; prévoir plus tard le paiement mobile (Wave, Orange Money) sans l'implémenter maintenant
- **Analytics** : option respectueuse de la vie privée (Plausible ou Umami), sans bandeau cookies inutile

# Plan de travail (une phase à la fois, validation avant la suivante)

1. **Fondations** : dépôt, structure, Docker Compose, Tailwind avec les tokens, polices, layout (header, footer), i18n
2. **Design system** : composants réutilisables (Button, Pill, Card, ArchImage, LeafChip, SectionTitle, MonthStrip) avec Storybook ou une page de démonstration
3. **Page d'accueil** complète, avec données statiques d'abord
4. **Strapi** : modèles, permissions, seed, connexion du frontend
5. **Pages dynamiques** : destinations, activités, itinéraires, hébergements, cartes Leaflet
6. **Formulaires** : contact et newsletter
7. **SEO, performance, accessibilité** : audit Lighthouse et corrections
8. **Tests, CI et déploiement** : README clair (installation, variables, commandes, déploiement)

# Règles de collaboration

- Commits petits et explicites (Conventional Commits)
- Après chaque phase : liste ce qui est fait, ce qui reste, et comment le lancer
- Pas de dépendance inutile ; justifie tout ajout majeur
- N'invente jamais de faits touristiques (prix, horaires, numéros) : utilise [À REMPLACER]
- Les photos sont des emplacements ; prévois des composants qui affichent un placeholder propre tant qu'il n'y a pas d'image
- Mets à jour le README à chaque phase

# Critères de réussite

- `docker compose up` lance tout en local
- L'accueil correspond à la direction artistique ci-dessus, sur mobile comme sur desktop
- Un éditeur peut ajouter une destination avec photos depuis Strapi, en français et en anglais, sans toucher au code
- Lighthouse mobile ≥ 90 (performance, accessibilité, bonnes pratiques, SEO)