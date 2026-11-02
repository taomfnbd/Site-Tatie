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

Les photos historiques sont disponibles en WebP local, aux tailles 480/800/1200. Le portrait dispose aussi de variantes AVIF. Préserver `imageDimensions` dans le helper média : dimensions réelles des photos connues, aucune dimension inventée pour un nouvel upload. Le helper media mappe aussi les anciennes URL connues vers ces assets. Le portrait principal est eager et prioritaire ; les images sous le premier écran restent lazy. Le CMS conserve les textes alternatifs. Les libellules décoratives sont locales et ont un alt vide.

Conserver l’identité sauge/beige. Les fonds d’action utilisent `#5e7056` ou plus sombre avec texte blanc ; ne pas utiliser blanc sur `#95a58d` (contraste insuffisant). Les éléments de navigation et le zoom doivent rester accessibles.

Contact utilise téléphone/Resalib ; pas de formulaire public. Garder la page de confidentialité cohérente avec les usages réels.

## Audience et présence locale

Le suivi optionnel est actif uniquement après consentement explicite. `src/analytics/events.js` et `Audience.jsx` gèrent le choix pendant 180 jours, son expiration dans un onglet ouvert et son retrait entre onglets. Refuser et accepter doivent rester également accessibles. Exclure administration, previews et robots ; ne jamais enregistrer de nom, contenu libre, données de santé, IP, identifiant visiteur ou URL/referrer complets.

Les fonctions `/api/audience/event` et `/api/admin/audience` utilisent des agrégats Netlify Blobs avec mises à jour conditionnelles ETag. Conservation de 90 jours, tableau privé dans l’administration, périodes 7/30/90 jours et export CSV. Un clic Resalib, téléphone ou email ne prouve jamais une réservation, un appel ou un message. Les rendez-vous confirmés ne sont pas connectés. Voir `TRACKING.md`.

Les coordonnées et liens proviennent de `getBusinessProfile` dans `src/utils/business.js`. La fiche Google vérifiée porte le Place ID `ChIJG-MmWnE9HY0RX9u_WlAr-KU`. Ne pas inventer de GPS, avis, note ou équipement. Le propriétaire de ce projet n’est pas administrateur de la fiche Google : ne pas modifier cette fiche ni demander des droits sans instruction explicite.

Les horaires du lundi/jeudi divergent encore : site 9–17 h, fiche Google 14–18 h. Attendre la confirmation d’Alaïs avant de les harmoniser. Ne pas garantir indexation, classement ou citations par les IA. Voir `SEO-LOCAL.md` et le kit généré par `npm run export:local -- "/chemin/de/sortie"`.

## Design

Préserver la palette sauge/beige, le portrait réel et le contenu éditable. Les titres éditoriaux utilisent Georgia système via `.font-editorial`, sans police distante. Conserver les contrastes, le focus clavier, la réduction des mouvements et les cibles tactiles. Examiner les rendus mobile et bureau après toute modification visuelle ; éviter défilement horizontal, recadrage du visage et décalages de mise en page.

## Maintenance

Le keep-alive Supabase et les composants de formulaire/cookies inutilisés ont été retirés. Les sauvegardes Supabase sont conservées sans migration de données. Pas de suppression des archives ou de ressources distantes sans besoin établi.

Un commit accepté par GitHub n’est pas encore une mise en ligne. Le CMS attend la révision de version.json. Ne pas annoncer qu’une erreur a été signalée automatiquement si aucun système de suivi n’est configuré.
