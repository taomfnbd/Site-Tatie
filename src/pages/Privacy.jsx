import React from "react";
import { useContent } from "../contexts/ContentContext";
import { getBusinessProfile } from "../utils/business";
import { Link } from "react-router-dom";
export default function Privacy() {
  const { globalContent } = useContent();
  const profile = getBusinessProfile(globalContent);
  return (
    <article className="max-w-3xl mx-auto px-5 py-14 sm:py-20 prose prose-stone prose-a:text-[#5e7056]">
      <h1>Confidentialité et données personnelles</h1>
      <p>Dernière mise à jour : 2 novembre 2026.</p>
      <h2>Qui est responsable de vos données ?</h2>
      <p>
        {profile.name}, {profile.displayAddress}. Pour toute question ou pour
        exercer vos droits :{" "}
        <a href="mailto:alais.tavernier@gmail.com">alais.tavernier@gmail.com</a>
        .
      </p>
      <h2>Consulter ce site</h2>
      <p>
        Le site ne charge pas de traceur publicitaire. Une mesure d’audience
        facultative est activée uniquement après votre accord. Les données
        techniques nécessaires à l’hébergement et à la sécurité, telles que
        l’adresse IP et les informations de requête, peuvent être traitées par
        l’hébergeur Netlify. Aucun compte visiteur n’est nécessaire.
      </p>
      <h2>Mesure d’audience facultative</h2>
      <p>
        Sur la base de votre consentement, le site compte les pages vues et les
        clics vers Resalib, le téléphone, l’email, les itinéraires et Instagram.
        Seuls le chemin d’une page connue, la catégorie de provenance (Google,
        fiche Google via son lien balisé, réseau social, accès direct ou autre),
        la catégorie d’écran (mobile ou ordinateur/tablette) et le type d’action
        sont transmis à notre hébergeur Netlify, puis agrégés par journée. Les
        paramètres d’URL, adresses email, numéros de téléphone, noms, contenus
        de messages et données de rendez-vous ne sont pas enregistrés dans ces
        statistiques. Aucun identifiant de visiteur ni empreinte numérique n’est
        créé ; les adresses IP ne sont pas conservées dans les compteurs
        d’audience.
      </p>
      <p>
        Ces statistiques servent exclusivement à améliorer ce site. Elles sont
        accessibles uniquement à l’administration et conservées 90 jours, avec
        suppression quotidienne des compteurs expirés. Le choix d’accepter ou de
        refuser est conservé localement sur votre navigateur pendant six mois.
        Vous pouvez le modifier à tout moment via « Préférences de mesure
        d’audience » en bas de page ; le retrait arrête les nouvelles mesures.
        Les compteurs déjà agrégés ne permettent pas d’isoler une personne.
        Refuser ne limite aucune fonction du site.
      </p>
      <p>
        Netlify traite les requêtes nécessaires au fonctionnement du service, ce
        qui peut impliquer des transferts hors de l’Union européenne selon ses
        conditions et garanties contractuelles. Consultez la{" "}
        <a
          href="https://www.netlify.com/privacy/"
          target="_blank"
          rel="noopener noreferrer"
        >
          politique de confidentialité de Netlify
        </a>
        . La mesure ne confirme ni les rendez-vous pris sur Resalib, ni les
        appels aboutis, ni les emails envoyés.
      </p>
      <h2>Prendre contact ou rendez-vous</h2>
      <p>
        Vous pouvez joindre Alaïs par téléphone ou prendre rendez-vous sur
        Resalib. Ce site ne propose pas de formulaire de contact. Si vous
        écrivez par email, vos coordonnées et le contenu du message servent à
        répondre à votre demande, dans le cadre des échanges préalables à une
        prestation ou de la relation client. Évitez d’envoyer des informations
        médicales détaillées par email.
      </p>
      <p>
        Resalib est un service externe disposant de sa propre politique de
        confidentialité. Les liens vers Instagram et Google Maps ouvrent
        également des services externes : ces sites ne sont pas intégrés à la
        page et ne sont contactés que si vous suivez leurs liens.
      </p>
      <h2>Stockage et sécurité</h2>
      <p>
        Le choix de mesure d’audience est enregistré dans le stockage local du
        navigateur, sans cookie publicitaire. L’administration utilise un cookie
        de session sécurisé, nécessaire à la connexion, valable au maximum
        quatre heures, et un brouillon conservé sur l’appareil de
        l’administratrice. Ces éléments ne servent pas à suivre les visiteurs.
      </p>
      <p>
        Les échanges de contact sont conservés le temps nécessaire à leur
        traitement et au suivi de la relation, sous réserve des obligations
        légales de conservation applicables. Les données techniques
        d’hébergement sont gérées selon les conditions et durées de conservation
        du prestataire. Vous pouvez demander des précisions à Alaïs avant de
        communiquer vos informations.
      </p>
      <h2>Vos droits</h2>
      <p>
        Selon votre situation, vous pouvez demander l’accès, la rectification,
        l’effacement ou la limitation de vos données, vous opposer à leur
        traitement et demander leur portabilité lorsque ce droit s’applique.
        Adressez votre demande à l’email indiqué ci-dessus. Vous pouvez
        également introduire une réclamation auprès de la{" "}
        <a
          href="https://www.cnil.fr/fr/plaintes"
          target="_blank"
          rel="noopener noreferrer"
        >
          CNIL
        </a>
        .
      </p>
      <p>
        <Link to="/mentions-legales">Consulter les mentions légales</Link>
      </p>
    </article>
  );
}
