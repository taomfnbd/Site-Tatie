# Site Tatie — consignes de maintenance

Site React 18 + Vite + Tailwind d’Alaïs Tavernier, naturopathe à Vacqueyras. Dépôt `taomfnbd/Site-Tatie`, branche principale `main`. Node 24 LTS.

## Vérifier avant publication

Exécuter `npm run check`, `npm run test:e2e` et `npm audit`. Ne pas pousser directement sur main : branche → PR → contrôles et preview Netlify → merge. Le merge déclenche la production. Préserver les modifications locales et ne pas inclure HANDOFF.md ou un fichier d’identifiants dans un commit.

Production : https://alais-tavernier-naturopathe.fr
Site Netlify : `e9872838-c910-4bf1-9797-eb046ce90f69` (`lucent-cucurucho-5d32b0`). Vérifier cet ID, car d’anciens liens CLI pointaient vers un autre site. L’état réel du deploy Netlify fait foi en cas de statut GitHub bloqué.

## Routage et rendu

BrowserRouter et pré-rendu HTML intégral au build. Dix routes publiques, dont `/about` et `/confidentialite`, plus une 404. `scripts/prerender.mjs` génère les pages, le sitemap et `version.json` à partir des routes connues et des données. Les anciennes URL en hash sont migrées par main.jsx, en préservant le paramètre admin.

Garder le contenu public visible dès le HTML initial ; ne pas réintroduire une liste de sections vide au premier rendu, une cascade de Suspense au-dessus de la ligne de flottaison ou des animations qui masquent le contenu avant JavaScript. MotionConfig respecte la réduction des mouvements. Les FAQ utilisent details/summary et restent utilisables sans JavaScript.

## CMS et sécurité

L’accès se fait avec `?admin`. Mot de passe vérifié côté serveur, session HttpOnly/Secure/SameSite=Strict. Aucun secret ne doit utiliser le préfixe VITE_. Ne jamais réintroduire un jeton Bearer de publication dans le client, un mot de passe codé en dur, ou une authentification déduite de sessionStorage.

Préserver ConfirmModal, ToastContainer, l’édition inline et les garde-fous de brouillon/publication. Un brouillon authentifié ne doit jamais remplacer le contenu public d’un visiteur. Vérifier la révision avant toute publication ; rejeter les conflits en 409. Nettoyer le HTML côté serveur et côté rendu. Les règles d’autorisation précèdent tout accès à GitHub et à la médiathèque. Les fonctions ne doivent pas exposer leurs secrets ou les réponses internes GitHub.

`ADMIN_PASSWORD_HASH` et `ADMIN_SESSION_SECRET` sont des variables serveur. Les clés GitHub sont réservées aux fonctions. Les photos importées sont converties et stockées dans Netlify Blobs, jamais en base64 dans siteContent. Les uploads supportent JPG, PNG, WebP et AVIF, 5 Mo max.

## Contenu et médias

`src/data/siteContent.js` est la source publiée. Header/footer partagent les liens. Le catalogue de prestations alimente les cartes de l’accueil, les tarifs synchronisés et les offres JSON-LD. Les FAQ du graphe proviennent du contenu visible. Utiliser `syncServicePrices` pour toute évolution des tarifs.

Les photos historiques sont désormais disponibles en WebP local, aux tailles 480/800/1200. Le helper media mappe aussi les anciennes URL connues vers ces assets. Le portrait principal est eager et prioritaire ; les images sous le premier écran restent lazy. Le CMS conserve les textes alternatifs. Les libellules décoratives sont locales et ont un alt vide.

Conserver l’identité sauge/beige. Les fonds d’action utilisent `#5e7056` ou plus sombre avec texte blanc ; ne pas utiliser blanc sur `#95a58d` (contraste insuffisant). Les éléments de navigation et le zoom doivent rester accessibles.

Contact utilise téléphone/Resalib ; pas de formulaire public. Aucun traceur optionnel actif : ne pas ajouter une bannière de consentement sans inventorier les traitements et connecter réellement le choix à leur chargement. Garder la page de confidentialité cohérente avec les usages réels.

## Maintenance

Le keep-alive Supabase et les composants de formulaire/cookies inutilisés ont été retirés. Les sauvegardes Supabase sont conservées sans migration de données. Pas de suppression des archives ou de ressources distantes sans besoin établi.

Un commit accepté par GitHub n’est pas encore une mise en ligne. Le CMS attend la révision de version.json. Ne pas annoncer qu’une erreur a été signalée automatiquement si aucun système de suivi n’est configuré.
