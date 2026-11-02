import { mkdir, writeFile, copyFile } from "node:fs/promises";
import { resolve } from "node:path";
import { initialSiteContent as content } from "../src/data/siteContent.js";
import { getBusinessProfile, bookingUrl } from "../src/utils/business.js";
import { SITE_URL } from "../src/utils/seo.js";
const output = resolve(process.argv[2] || "audits/kit-local");
await mkdir(output, { recursive: true });
const profile = getBusinessProfile(content);
await mkdir(resolve(output, "photos-existantes"), { recursive: true });
for (const [source, filename] of [
  ["photo-1-1200.webp", "portrait-alais.webp"],
  ["photo-2-1200.webp", "massage-assis-detail.webp"],
  ["photo-3-1200.webp", "massage-assis-cabinet.webp"],
  ["photo-4-1200.webp", "echange-au-cabinet.webp"],
])
  await copyFile(
    new URL(`../public/images/${source}`, import.meta.url),
    resolve(output, "photos-existantes", filename),
  );
const website = `${SITE_URL}/?utm_source=google&utm_medium=organic&utm_campaign=fiche_etablissement`;
const description = `${profile.name} vous accueille sur rendez-vous au cabinet de Vacqueyras, dans le Vaucluse, pour des consultations de naturopathie, des séances de réflexologie et du massage assis habillé, sans huile. Formée pendant trois ans à l’école Æsculape d’Aix-en-Provence, elle propose une approche attentive à vos habitudes et à votre rythme de vie. La naturopathie comprend un bilan de vitalité et des conseils personnalisés en hygiène de vie. Ces prestations de bien-être ne comportent ni diagnostic médical ni prescription et ne remplacent pas un suivi médical.`;
if (description.length > 750)
  throw new Error("Description trop longue pour Google.");
const services = content.pages.services
  .filter((s) => s.type === "service_card")
  .flatMap(({ content: card }) =>
    card.prices.map((price) => ({
      service: card.title,
      format: price.type,
      duree: price.duration,
      prix: price.price,
      lien: SITE_URL + card.linkUrl,
      description: card.description,
    })),
  );
const csv = [
  ["Service", "Format", "Durée", "Prix", "Page"],
  ...services.map((s) => [s.service, s.format, s.duree, s.prix, s.lien]),
]
  .map((row) =>
    row.map((value) => `"${String(value).replaceAll('"', '""')}"`).join(";"),
  )
  .join("\r\n");
await writeFile(resolve(output, "services.csv"), "\uFEFF" + csv);
await writeFile(resolve(output, "description-google.txt"), description + "\n");
await writeFile(
  resolve(output, "coordonnees.json"),
  JSON.stringify(
    {
      name: profile.name,
      phone: profile.telephone,
      address: profile.displayAddress,
      website,
      bookingUrl,
      instagram: profile.instagramUrl,
      schedule: content.footer.schedule,
      services,
    },
    null,
    2,
  ),
);
const schedule = content.footer.schedule
  .map(
    (day) => `- ${day.day} : ${day.hours}${day.note ? ` (${day.note})` : ""}`,
  )
  .join("\n");
const catalogue = services
  .map(
    (s) =>
      `- **${s.service} — ${s.format}** : ${s.duree}, ${s.prix}. ${s.description}\n  Page : ${s.lien}`,
  )
  .join("\n");
const text = `# Kit de référencement local — ${profile.name}

Généré le ${new Date().toISOString().slice(0, 10)} depuis le contenu du site. Textes prêts à utiliser, non publiés sur des services externes. Régénérer ce kit après toute modification des coordonnées, horaires ou tarifs.

## 1. Fiche Google existante : champs à vérifier et compléter

- Nom public : **${profile.name}**. Conserver le nom réel déjà utilisé sur la signalétique ; ajouter « Naturopathe » seulement si cela fait partie du nom public réel. Pas de renommage artificiel par commune.
- Catégorie principale à rechercher : **Naturopathe**, si proposée par Google pour cette activité. Confirmer sa disponibilité dans la fiche ; catégories secondaires uniquement si elles décrivent effectivement les services.
- Adresse : **${profile.displayAddress}**.
- Téléphone : **${profile.telephone}**.
- Site : ${website}
- Rendez-vous : ${bookingUrl}
- Instagram : ${profile.instagramUrl}
- Tarifs et durées : ${SITE_URL}/prestations
- Accueil au cabinet, sur rendez-vous. Ne pas annoncer de téléconsultation ou déplacement à domicile sans confirmation d’Alaïs.

Le lien Site balisé alimente la catégorie « Fiche Google (lien balisé) » du tableau, après accord du visiteur. C’est une attribution déclarative du lien, pas une réservation confirmée ni une preuve indépendante d’origine.

### Horaires actuellement publiés sur le site

${schedule}

Faire confirmer ces disponibilités avant de modifier la fiche. Les plages indiquées sont des plages de rendez-vous, pas une promesse d’accueil sans réservation. Ne pas compléter d’horaires spéciaux ou de jours fériés sans information.

### Description prête à coller (${description.length}/750 caractères)

${description}

Pas de lien ni HTML dans ce champ. Le lien Site et le lien Rendez-vous disposent de leurs propres champs.

### Services à renseigner

${catalogue}

Fichier services.csv joint pour faciliter la saisie. Ce CSV n’est pas présenté comme un format d’import automatique accepté par Google. Vérifier les services et prix du profil Resalib, notamment les formats massage et réflexologie ; les extraits de moteurs de recherche peuvent être anciens.

## 2. Photos existantes et prises de vue à compléter

- Le dossier photos-existantes contient le portrait et trois photos déjà utilisées sur le site : deux mises en situation de massage assis et un échange au cabinet. Les images sources sont copiées sans modification.
- Plusieurs photos montrent une autre personne : confirmer son accord et les droits de réutilisation avant de les charger sur une autre plateforme. Leur présence sur le site ne prouve pas un consentement couvrant Google.
- Les sources sont en WebP ; préparer au besoin une exportation JPG/PNG selon les formats acceptés par la plateforme, sans modifier la réalité du lieu.
- Entrée extérieure et accès au cabinet : cadrage permettant de reconnaître le bon lieu.
- Vue intérieure du cabinet et installation de massage : photographie réelle du lieu actuel, sans client identifiable.
- Détail de la chaise et espace d’accueil : lumière naturelle, image nette, sans données personnelles visibles.

Aucune image du cabinet n’a été inventée. Restent à confirmer : stationnement, marches, accès PMR, interphone ou indications d’arrivée. Ne rien publier sur ces points sans validation.

## 3. Message neutre pour proposer un avis

À envoyer uniquement à des personnes ayant réellement bénéficié d’une séance, sans sélection selon leur satisfaction et sans contrepartie. Aucun message n’a été envoyé par l’assistant.

> Bonjour, merci pour votre visite au cabinet. Si vous le souhaitez, vous pouvez partager librement votre expérience en laissant un avis. Votre retour peut aider d’autres personnes à choisir leur séance. Il n’y a aucune obligation, et je vous invite à ne pas y inclure d’informations médicales ou personnelles. Merci, Alaïs.

Support possible immédiatement : le profil Resalib ${bookingUrl}. Pour Google, récupérer le lien officiel « Demander des avis » depuis la fiche vérifiée ; aucun lien d’avis Google fictif n’est fourni. Ajouter ce lien avant l’envoi du message si vous choisissez Google.

Réponse simple à un avis :

> Merci d’avoir pris le temps de partager votre retour. Au plaisir de vous accueillir de nouveau. Alaïs.

Ne pas confirmer publiquement des informations de santé ou les détails d’une séance.

## 4. Cohérence des profils et demandes de liens

### Profil Resalib existant

Vérifier : adresse, téléphone, description, prestations, tarifs et présence du site actuel. L’adresse publique correspond à celle du site. Aucun nombre d’avis n’est recopié ici : les résultats publics consultés ne sont pas tous datés de la même façon.

### Pistes pertinentes vérifiées ou à examiner

- **Mairie de Vacqueyras** : site référencé par Service Public, https://ville-vacqueyras.fr/ ; accueil@ville-vacqueyras.fr ; demander si un annuaire local accueille les activités du village. La mairie n’a pas été identifiée comme partenaire existant et aucune inscription n’est garantie.
- **École Æsculape** : https://aesculape.eu/ ; demander à l’école si un profil d’ancienne élève peut mentionner le cabinet et son site. Ne pas présenter l’école comme recommandant personnellement la praticienne sans accord.
- **Partenaires locaux connus d’Alaïs** : identifier les relations réelles avant toute demande. Pas de liste de faux partenaires, d’achat de liens de classement ou d’inscription massive.

### Brouillon de demande à la mairie

Objet : Informations sur un éventuel annuaire des activités de Vacqueyras

> Bonjour, je suis ${profile.name}, naturopathe installée au ${profile.displayAddress}. Je propose des consultations de naturopathie, des séances de réflexologie et du massage assis, sur rendez-vous. Existe-t-il un annuaire municipal ou une rubrique locale permettant de présenter une activité du village ? Mon site rassemble les coordonnées et les prestations : ${SITE_URL}/. Je peux vous transmettre les informations nécessaires si ce type de présentation est possible. Merci pour votre aide. Alaïs Tavernier.

Brouillon non envoyé. Vérifier la signature et le destinataire avant envoi.

## 5. Mesures et statut réel

- Site : corrections SEO et données structurées publiées, accès aux dix pages vérifié.
- Audience : tableau privé, collecte après consentement, nouvelles mesures seulement.
- Fiche Google : lien exact et accès propriétaire non fournis ; aucune modification ou revendication effectuée.
- Photos du cabinet et accès : validation d’Alaïs nécessaire.
- Avis : messages préparés ; aucun envoi et aucun nouvel avis promis.
- Liens partenaires : pistes et brouillon préparés ; aucun lien obtenu annoncé.
- Search Console : utiliser les rapports réels pour observer l’indexation et les requêtes ; aucune position garantie.

## Références de travail

- Modification des champs Google : https://support.google.com/business/answer/3039617?hl=fr
- Consignes de représentation : https://support.google.com/business/answer/3038177?hl=fr
- Règles des avis : https://support.google.com/contributionpolicy/answer/7400114?hl=fr
- Mairie, source Service Public : https://lannuaire.service-public.gouv.fr/provence-alpes-cote-d-azur/vaucluse/49af05f6-ac9b-4d3d-982a-5943b7656b59
- Profil Resalib : ${bookingUrl}
`;
await writeFile(resolve(output, "KIT-LOCAL.md"), text);
console.log(
  `Kit local généré : ${output} (description ${description.length}/750, ${services.length} formats de séance).`,
);
