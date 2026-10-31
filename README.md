# Tourisme Casamance

Site vitrine de tourisme pour la Casamance (Sénégal) — Next.js 14 + Strapi v5 + PostgreSQL.

## 🚀 Stack Technique

| Composant | Technologie |
|-----------|-------------|
| Frontend | Next.js 14 (App Router) + TypeScript + Tailwind CSS |
| CMS | Strapi v5 (TypeScript) |
| Base de données | PostgreSQL 16 |
| i18n | next-intl (FR/EN) |
| Cartes | Leaflet + OpenStreetMap |
| Conteneurisation | Docker Compose |
| CI/CD | GitHub Actions |
| Hébergement cible | Vercel (frontend) + VPS (Strapi) |

## 📁 Structure du Projet

```
tourisme-casamance/
├── frontend/                 # Next.js App
│   ├── src/
│   │   ├── app/[locale]/    # Pages par langue
│   │   ├── components/      # Composants UI réutilisables
│   │   ├── lib/             # Utilitaires, config i18n
│   │   └── styles/          # CSS global + tokens Tailwind
│   └── public/              # Assets statiques
├── strapi/                   # Strapi v5 CMS
│   ├── src/
│   │   ├── api/             # Content-types (Destination, Activité...)
│   │   ├── components/      # Composants répétables (Étape itinéraire...)
│   │   └── config/          # Config DB, server, plugins
├── docker-compose.yml        # Orchestration locale
├── .env.example              # Variables d'environnement
└── README.md
```

## 🛠️ Installation Locale

### Prérequis
- Node.js ≥ 20
- Docker & Docker Compose
- npm ≥ 10

### Démarrage Rapide

```bash
# 1. Cloner le dépôt
git clone <repo-url>
cd tourisme-casamance

# 2. Configurer les variables d'environnement
cp .env.example .env
# Éditer .env avec vos secrets (générer les clés avec: openssl rand -base64 32)

# 3. Lancer l'environnement complet
npm run dev
# ou: docker compose up --build
```

### Services Disponibles

| Service | URL | Description |
|---------|-----|-------------|
| Frontend | http://localhost:3000 | Site public (FR/EN) |
| Strapi Admin | http://localhost:1337/admin | Interface d'administration |
| Strapi API | http://localhost:1337/api | API REST |
| PostgreSQL | localhost:5432 | Base de données |

### Commandes Utiles

```bash
# Développement
npm run dev              # Lance tout (frontend + strapi + DB)
npm run dev:frontend     # Frontend seulement
npm run dev:strapi       # Strapi seulement

# Base de données
npm run db:up            # Démarre PostgreSQL seulement
npm run db:down          # Arrête PostgreSQL
npm run db:logs          # Logs PostgreSQL

# Build & Qualité
npm run build            # Build tout
npm run lint             # ESLint tout
npm run lint:fix         # Auto-fix ESLint
npm run format           # Prettier
npm run format:check     # Vérifier Prettier
npm run test             # Tests

# Strapi
npm run strapi:seed      # Seed données d'exemple

# Nettoyage
npm run clean            # Supprime containers, volumes, node_modules
```

## 🎨 Direction Artistique

### Palette de Couleurs
- **Forest** `#0E2A20` — Fond sombre, texte principal
- **Leaf** `#14503A` — Vert forêt moyen
- **Emerald** `#1E7F55` — Couleur principale, boutons, accents
- **Lime** `#B6D94A` — Accent clair sur fond sombre
- **Mint** `#CFE6B5` / `#E4F2CF` — Halos, fonds doux
- **Cream** `#F2F6EA` — Fond de page
- **Coral** `#FF6B3D` — Touche soleil (rare)
- **Sun** `#FFB627` — Saison sèche
- **Muted** `#4F6358` — Texte secondaire

### Typographies
- **Titres** : Bricolage Grotesque 600/800 (letter-spacing: -0.02em)
- **Corps** : Manrope 400/500/600/700

### Formes Signature
- **Arche** : `rounded-arch` (bords supérieurs arrondis)
- **Feuille** : `rounded-leaf` (rayon `0 44px 0 44px`)
- **Carte** : `rounded-card-lg` (32px)
- **Bouton** : Pilule `rounded-pill` (min 48px haut)

## 📝 Modèle de Contenu Strapi

### Collection Types
- **Destination** : nom, slug, type, résumé, description, galerie, lat/lng, tags, miseEnAvant
- **Activité** : titre, slug, résumé, description, thème, durée, destinations liées, galerie
- **Itinéraire** : titre, slug, nombreJours, résumé, étapes (composant répétable)
- **Hébergement** : nom, slug, type, destination, prix, WhatsApp, galerie
- **Témoignage** : texte, prénom, pays, publié

### Single Types
- **Page d'accueil** : Hero, chiffres clés, bandeau canopée, section verte, témoignage, CTA
- **Paramètres du site** : nom, téléphone, email, WhatsApp, réseaux sociaux

### Rôles
- **Éditeur** : Accès aux contenus uniquement (pas de paramètres techniques)

## 🌍 Internationalisation

- **Langue par défaut** : Français (`fr`)
- **Langue secondaire** : Anglais (`en`)
- **Structure** : `/fr/...` et `/en/...` (prefixe obligatoire)
- **Fichiers de traduction** : `frontend/messages/fr.json` et `en.json`

## 🖼️ Gestion des Images

- Formats : WebP/AVIF (générés automatiquement par `next/image`)
- Placeholder : Blur data URL généré au build
- Tailles responsive : `deviceSizes` + `imageSizes` configurés
- Strapi : Provider local (dev) / Cloudinary (prod)

## 🗺️ Cartes

- **Bibliothèque** : Leaflet + React-Leaflet
- **Tuiles** : OpenStreetMap (gratuit, pas de clé API)
- **Marqueurs** : Destinations, hébergements, tracé itinéraires

## 🔒 Sécurité

- Validation côté serveur (Zod)
- Protection anti-spam : Honeypot + Rate limiting
- En-têtes de sécurité (CSP, HSTS, etc.)
- Secrets hors dépôt (`.env` gitignored)
- Rôle "Éditeur" sans accès technique

## ♿ Accessibilité

- Navigation clavier complète
- Focus visible (`focus-visible:ring-2`)
- Textes alternatifs sur toutes les images
- Labels formulaires explicites
- Respect `prefers-reduced-motion`
- Contraste AA minimum

## 📊 Performance Cible

- **Lighthouse Mobile** ≥ 90 (Performance, Accessibilité, Bonnes pratiques, SEO)
- Rendu statique (ISR) quand possible
- Polices préchargées (`next/font`)
- Images optimisées (`next/image`)

## 🚀 Déploiement

### Frontend → Vercel
```bash
# Connecter le repo à Vercel
# Variables d'environnement à définir :
# NEXT_PUBLIC_STRAPI_URL=https://votre-strapi.com
# NEXT_PUBLIC_SITE_URL=https://votre-domaine.com
# STRAPI_API_TOKEN=xxx
```

### Strapi → VPS (Docker)
```bash
# Sur le VPS :
docker compose -f docker-compose.prod.yml up -d
# Configurer Nginx en reverse proxy + SSL (Let's Encrypt)
```

## 📦 Scripts de Seed

```bash
npm run strapi:seed
```
Crée des données d'exemple marquées `[À REMPLACER]` pour tester l'affichage.

## 🤝 Contribution

1. Fork le projet
2. Créer une branche (`git checkout -b feature/amazing-feature`)
3. Commit (`git commit -m 'feat: add amazing feature'`)
4. Push (`git push origin feature/amazing-feature`)
5. Ouvrir une Pull Request

### Conventions de Commit
[Conventional Commits](https://www.conventionalcommits.org/) :
- `feat:` — Nouvelle fonctionnalité
- `fix:` — Correction de bug
- `docs:` — Documentation
- `style:` — Formatage (Prettier)
- `refactor:` — Refactoring
- `test:` — Tests
- `chore:` — Maintenance

## 📄 Licence

Projet privé — Tous droits réservés.

## 📞 Contact

- **Email** : contact@visitecasamance.com
- **Téléphone** : +221 33 990 00 00
- **WhatsApp** : +221 77 000 00 00