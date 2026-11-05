# Guide du projet Casamance

Le site est construit avec **Next.js** et les pages sont exportées en fichiers statiques. Le code de l’application se trouve dans `frontend/src`.

## Où trouver les éléments ?

- `frontend/src/app/(accueil)/page.tsx` : page d’entrée avec le choix français ou anglais (`/`).
- `frontend/src/app/(vitrine)/[locale]/page.tsx` : accueil du site (`/fr` ou `/en`). `[locale]` signifie la langue de la page.
- `frontend/src/app/(vitrine)/[locale]/destinations/` : liste des destinations et fiches détaillées.
- `frontend/src/app/(vitrine)/[locale]/activites/` : liste des activités et fiches détaillées.
- `frontend/src/app/(vitrine)/[locale]/hebergements/` : liste des hébergements et fiches détaillées.
- `frontend/src/app/(vitrine)/[locale]/itineraires/` : liste des itinéraires et programmes détaillés.
- `frontend/src/components/` : blocs réutilisés sur plusieurs pages, comme l’en-tête, le pied de page, les cartes et la carte interactive.
- `frontend/src/data/contenu.json` : destinations, activités, hébergements et itinéraires.
- `frontend/traductions/francais.json` et `frontend/traductions/anglais.json` : textes affichés dans chaque langue.
- `frontend/src/styles/globals.css` : styles généraux du site.

## Pourquoi certains fichiers gardent un nom anglais ?

Next.js reconnaît les pages et leur structure grâce à des noms réservés. Il faut donc garder `page.tsx` pour une page et `layout.tsx` pour sa structure commune. Les noms entre parenthèses, comme `(accueil)` et `(vitrine)`, organisent le code sans apparaître dans l’adresse du site.

Dans un dossier de page, `ListeHebergements.tsx` affiche la liste et `DetailHebergement.tsx` affiche une fiche. Le fichier voisin `page.tsx` relie le chemin web au bon composant.

## Commandes utiles

À lancer depuis la racine du projet :

- `npm run dev` : lancer le serveur de développement.
- `npm run type-check` : vérifier les types TypeScript.
- `npm run build` : générer le site statique dans `frontend/out`.
- `npm run preview` : afficher l’export statique.

## Préparer le déploiement Vercel

Le dépôt contient l’application Next.js dans le sous-dossier `frontend`. À la création du projet Vercel :

1. Importer le dépôt GitHub `Tourisme-Casamance`.
2. Définir **Root Directory** sur `frontend`.
3. Choisir **Next.js** comme framework (détection automatique), **Node.js 20.x**, et garder les commandes de build et le dossier de sortie proposés par Vercel.
4. Ajouter les variables d’environnement de production :
   - `NEXT_PUBLIC_SITE_URL` : l’adresse HTTPS finale du site, par exemple `https://visitecasamance.com` si ce domaine est utilisé.
   - `NEXT_PUBLIC_WHATSAPP_NUMBER` : `221773152007`, sans signe `+`.
5. Lancer le déploiement.

Le projet utilise `output: 'export'` : `npm run build` génère les pages statiques dans `frontend/out`. Vercel sait construire et publier l’application Next.js à partir de son répertoire racine. Aucun `vercel.json` ni workflow GitHub Actions n’est requis pour ce projet.
