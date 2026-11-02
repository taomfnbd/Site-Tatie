# Site d’Alaïs Tavernier

Site vitrine de naturopathie, réflexologie et massage assis à Vacqueyras.

Production : https://alais-tavernier-naturopathe.fr
Code : React 18, Vite, Tailwind CSS, pré-rendu HTML, Netlify Functions.

## Développement

Utiliser Node 24 LTS et `npm ci`.

- `npm run dev` : développement Vite.
- `npm run check` : lint JS/TS, vérification TypeScript, tests métier et build avec pré-rendu.
- `npm run test:e2e` : tests Chromium sur le build ; lance automatiquement le serveur de prévisualisation.
- `npm run build` : produit les dix pages HTML, la page 404, le sitemap et la version du contenu.
- `node scripts/serve-preview.mjs` : prévisualisation statique sur le port 4173. Les opérations CMS exigent Netlify.
- `node scripts/optimize-images.mjs` : régénération facultative des photos WebP depuis les sources historiques ; les fichiers optimisés sont déjà versionnés.

Les tests navigateur nécessitent `npx playwright install chromium`. GitHub Actions exécute les contrôles et les tests de navigation sur chaque PR.

## Édition du contenu

Ouvrir `https://alais-tavernier-naturopathe.fr/?admin`, puis utiliser le mot de passe privé du cabinet. Le mot de passe n’est jamais intégré au code client. Ne pas utiliser les anciens identifiants : ils ont été remplacés après l’audit.

L’authentification est vérifiée par le serveur. Une session de quatre heures maximum utilise un cookie HttpOnly, Secure, SameSite=Strict. Les endpoints sensibles contrôlent aussi l’origine de la requête et bénéficient de limites de débit Netlify.

« Enregistrer » conserve un brouillon sur l’appareil. Ce brouillon ne remplace jamais le contenu des visiteurs publics. « Publier » vérifie la révision de départ, valide/nettoie les données et crée un commit de contenu sur GitHub. Netlify reconstruit ensuite les pages. La barre d’édition distingue brouillon, mise en ligne en cours et version vérifiée en ligne.

Si le contenu a changé depuis un brouillon, exporter le brouillon puis repartir du site publié. Cette protection évite les écrasements silencieux. Les images importées sont converties en WebP et stockées dans la médiathèque Netlify Blobs ; elles ne sont pas incorporées en base64 au JavaScript.

## Variables d’environnement

À configurer dans Netlify, jamais dans Git ou dans une variable préfixée `VITE_` :

- `ADMIN_PASSWORD_HASH` : `sel:hash-hex`, hash scrypt de 64 octets (N=16384, r=8, p=1).
- `ADMIN_SESSION_SECRET` : secret aléatoire d’au moins 32 caractères.
- `GITHUB_TOKEN` : accès restreint au dépôt, avec écriture du contenu.
- `REPO_OWNER`, `REPO_NAME`, et éventuellement `BRANCH` (défaut `main`).

Les anciens `VITE_ADMIN_PASSWORD`, `VITE_ADMIN_API_SECRET`, `ADMIN_API_TOKEN` et `ADMIN_API_SECRET` ne sont plus utilisés. Une rotation du secret de session invalide les sessions existantes. Ne pas réintroduire un secret dans les ressources publiques.

## Architecture

- `src/data/siteContent.js` : contenu publié et catalogue des prestations.
- `src/utils/servicePrices.js` : synchronisation des tarifs entre catalogue et détails.
- `src/utils/seo.js` : métadonnées et JSON-LD dérivés des données du site.
- `src/entry-server.jsx`, `scripts/prerender.mjs` : HTML initial complet et sitemap.
- `src/contexts/ContentContext.tsx` : brouillons authentifiés, publication et suivi.
- `netlify/functions/` et `netlify/lib/` : connexion, publication et médiathèque.
- `public/images/` : photos optimisées et éléments décoratifs locaux.

Les URL publiques sont des chemins ordinaires (`/reflexologie`). Les anciens liens `/#/reflexologie` sont migrés côté navigateur, en conservant `?admin`. Les URL inconnues renvoient une vraie réponse 404 avec un écran utile. Le site ne charge pas d’outil publicitaire. Une mesure d’audience agrégée est activée après accord du visiteur ; ses préférences sont modifiables en bas de page. Le tableau privé et les limites des compteurs sont décrits dans TRACKING.md. Contact se fait par téléphone ou Resalib, sans formulaire hébergé ici.

## Préparer la fiche Google et les profils locaux

`npm run export:local -- "/chemin/du/kit"` génère depuis les données publiées une description de fiche, les coordonnées, les horaires, un catalogue CSV et des brouillons de demandes d’avis/liens. Cela ne modifie aucun compte externe et n’envoie aucun message. Le kit indique les éléments restant à confirmer : fiche Google exacte, accès propriétaire, photos, stationnement et accessibilité. Régénérer le kit après toute modification du contenu.

Le lien de site fourni dans le kit comporte un balisage fixe reconnu comme « Fiche Google (lien balisé) » dans les statistiques, uniquement après consentement. Seule la catégorie est enregistrée ; il ne s’agit pas d’une confirmation de rendez-vous.

## Publication et vérification

Ne pas pousser directement sur `main`. Créer une branche, ouvrir une PR, attendre les contrôles et vérifier le deploy preview Netlify avant de fusionner. Le merge déclenche la production.

Le site Netlify correct est `e9872838-c910-4bf1-9797-eb046ce90f69` (`lucent-cucurucho-5d32b0`). Toujours vérifier cet identifiant avant une commande de déploiement. Un ancien lien local pointait vers un autre projet.

Le statut Netlify du déploiement et sa révision font foi. Vérifier les pages réelles, les en-têtes, les anciennes URL, la session administrateur et le refus d’une publication non authentifiée. Pour un deploy CLI local, reconstruire les fonctions avant l’envoi : un ancien cache peut contenir des versions périmées. Les fonctions utilisant Sharp doivent être construites pour l’environnement Linux du serveur ; le build Netlify depuis Git est la référence.

Les anciens guides CMS sont historiques. Ce README et CLAUDE.md décrivent le fonctionnement actuel. Les sauvegardes Supabase ont été conservées à titre d’archive ; le CMS actuel ne les utilise pas.
