# Statistiques du site

Le bouton **Statistiques**, dans la barre de l’administration `/?admin`, affiche les compteurs des 7, 30 ou 90 derniers jours : pages vues, clics vers Resalib, téléphone, email, Google Maps (fiche et itinéraire) et Instagram, sources et catégories d’écran, détail quotidien et export CSV. Les jours sont en UTC.

## Ce que les chiffres signifient

- Début de mesure à la mise en ligne ; aucun historique reconstitué.
- Uniquement les navigateurs ayant explicitement accepté la mesure. Le refus reste sans effet sur la navigation et les réservations.
- Pas de personnes uniques, sessions ou parcours individuels : un retour sur une page est une nouvelle vue.
- Provenance limitée à des catégories, sans URL référente, texte libre de campagne ou identifiants. Le lien du kit Google porte trois balises fixes (`utm_source=google`, `utm_medium=organic`, `utm_campaign=fiche_etablissement`) reconnues comme la catégorie « Fiche Google ». Seule cette catégorie est envoyée ; les paramètres ne sont pas stockés. Un lien partagé ou modifié peut fausser cette attribution déclarative. « Direct » inclut les sources masquées par les navigateurs. La provenance est celle disponible au chargement du document, appliquée aux pages vues de ce document ; ce n’est pas une attribution de conversion.
- **Clic Resalib ≠ réservation confirmée. Clic téléphone ≠ appel abouti. Clic email ≠ message envoyé ou reçu.** Ces confirmations ne sont pas connectées.
- Robots reconnaissables et administrateurs exclus au mieux ; les compteurs publics peuvent être manipulés. Les utiliser pour suivre des tendances, jamais comme preuve de facturation.
- Prévisualisations Netlify exclues côté client et serveur.

## Protection et conservation

Accord préalable, refus et acceptation de même présentation, choix local pendant six mois, retrait depuis le bouton en bas de page. L’expiration du choix et son effacement depuis un autre onglet arrêtent aussi les nouvelles mesures sans attendre un rechargement. Les clics droits ne sont pas comptés comme actions de contact ; les clics du milieu le sont. Pas d’identifiant visiteur, empreinte, géolocalisation ou adresse IP dans les statistiques stockées. Pas de nom, email, numéro de téléphone, données de santé ni texte libre collecté. Ne pas enrichir ce suivi avec des informations de rendez-vous identifiantes.

Les requêtes sont traitées par Netlify, comme les autres requêtes du site : les garanties du prestataire et les éventuels transferts sont décrits dans la politique de confidentialité. Aucune prétention à une exemption ou certification CNIL.

Stockage `audience-v1` : quatre compteurs agrégés par date UTC, mises à jour conditionnelles avec ETag pour éviter la perte d’incréments concurrents. Pas de journal individuel d’événements. Lecture réservée à une session d’administration signée côté serveur. Nettoyage quotidien à 03:15 UTC des jours au-delà de la fenêtre de 90 jours (suppression au plus tard au nettoyage suivant). En cas d’échec de stockage, le site continue à fonctionner, mais le compteur peut être incomplet.

## Réservations et messages réellement reçus

Aucune interface de retour de conversion Resalib n’a été identifiée et validée pour ce compte. Pour aller plus loin, il faut l’accès professionnel et vérifier les fonctions d’attribution/export/intégration disponibles auprès de Resalib. Ne jamais annoncer une réservation sur la seule base d’un clic. Une boîte mail ou un formulaire avec accusé serveur serait nécessaire pour compter des messages réellement reçus ; aucun accès à la boîte d’Alaïs n’a été fourni.

Search Console reste la source des impressions, requêtes Google et clics de recherche. Ce tableau ne copie pas ces données et ne suppose pas que tout trafic Google vient de la recherche naturelle.

## Références

- [CNIL : outils de mesure d’audience](https://www.cnil.fr/fr/cookies-solutions-pour-les-outils-de-mesure-daudience)
- [Netlify : stockage, cohérence et écritures conditionnelles](https://docs.netlify.com/build/data-and-storage/netlify-blobs/)
- [Netlify : contexte de déploiement côté serveur](https://docs.netlify.com/build/functions/api/#deploy)
