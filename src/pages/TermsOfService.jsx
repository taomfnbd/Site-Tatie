import React from 'react';
import SectionManager from '../components/admin/SectionManager';

const TermsOfService = () => {
  const defaultSections = [
    {
      id: 'terms-of-service',
      type: 'legal_content',
      content: {
        title: 'Conditions Générales <span class="text-[#95a58d]">d\'Utilisation</span>',
        content: `<h2>1. Présentation du site</h2>
          <p>
            Le présent site internet (Alaïs Tavernier Naturopathe) a pour objet de présenter les activités 
            et prestations de naturopathie et massages assis proposées par Alaïs Tavernier, exerçant 
            en micro-entreprise.
          </p>
          <p>
            Le Site permet également d'accéder à des liens externes (notamment Instagram et Resalib) 
            afin d'obtenir des informations complémentaires ou de prendre rendez-vous.
          </p>

          <h2>2. Acceptation des conditions d'utilisation</h2>
          <p>
            L'accès et l'utilisation du Site impliquent l'acceptation pleine et entière des présentes 
            Conditions Générales d'Utilisation.
          </p>
          <p>
            L'utilisateur s'engage à en prendre connaissance et à les respecter à chaque visite.
          </p>

          <h2>3. Accès au site</h2>
          <p>
            Le Site est accessible à tout moment aux utilisateurs disposant d'une connexion internet.
          </p>
          <p>
            L'éditeur se réserve le droit d'interrompre, de suspendre ou de modifier l'accès au Site pour 
            maintenance ou tout autre motif, sans préavis ni indemnisation.
          </p>

          <h2>4. Contenu du site</h2>
          <p>
            Le Site a pour vocation de fournir des informations générales sur la naturopathie, les 
            massages assis et les prestations proposées par la praticienne.
          </p>
          <p>
            Les informations présentes sur le Site sont fournies à titre indicatif.
          </p>
          <p>
            La praticienne s'efforce d'assurer leur exactitude, mais ne peut garantir l'absence totale 
            d'erreurs ou d'omissions.
          </p>

          <h2>5. Nature des prestations et responsabilité</h2>
          <p>
            Les services proposés sur le Site s'inscrivent dans une démarche de bien-être et 
            d'accompagnement naturel.
          </p>
          <p>
            <strong>Ils ne constituent en aucun cas un acte médical et ne remplacent pas une consultation 
            auprès d'un professionnel de santé.</strong>
          </p>
          <p>
            La naturopathe ne formule aucun diagnostic médical et ne prescrit aucun traitement.
          </p>
          <p>
            L'utilisateur reconnaît que les conseils et pratiques proposés relèvent d'une approche 
            complémentaire du bien-être.
          </p>
          <p>La responsabilité de l'éditeur du Site ne saurait être engagée en cas :</p>
          <ul>
            <li>d'utilisation inappropriée des informations du Site,</li>
            <li>d'interruption de service ou de défaillance technique,</li>
            <li>de dommages directs ou indirects résultant de l'accès ou de l'impossibilité d'accès au Site.</li>
          </ul>

          <h2>6. Propriété intellectuelle</h2>
          <p>
            L'ensemble des éléments présents sur le Site (textes, photographies, logos, graphismes, 
            etc.) sont protégés par le droit de la propriété intellectuelle et demeurent la propriété 
            exclusive de leur auteur ou titulaire des droits.
          </p>
          <p>
            Toute reproduction, représentation, modification ou exploitation, totale ou partielle, sans 
            autorisation écrite préalable, est strictement interdite.
          </p>

          <h2>7. Liens hypertextes</h2>
          <p>
            Le Site peut contenir des liens vers d'autres sites (notamment Instagram ou Resalib).
          </p>
          <p>
            Ces liens sont fournis à titre informatif.
          </p>
          <p>
            L'éditeur du Site ne saurait être tenu responsable du contenu de ces sites tiers ni des 
            éventuels dommages liés à leur utilisation.
          </p>

          <h2>8. Données personnelles</h2>
          <p>
            Le Site ne collecte pas directement de données personnelles.
          </p>
          <p>
            Toute prise de rendez-vous s'effectue via des plateformes externes (telles que Resalib), qui 
            disposent de leurs propres politiques de confidentialité.
          </p>

          <h2>9. Droit applicable</h2>
          <p>
            Les présentes Conditions Générales d'Utilisation sont régies par le droit français.
          </p>
          <p>
            En cas de litige, les parties s'efforceront de trouver une solution amiable avant toute action 
            judiciaire.
          </p>

          <h2>10. Contact</h2>
          <p>Pour toute question relative au Site ou à son utilisation, vous pouvez contacter :</p>
          <p>
            <strong>Alaïs Tavernier</strong><br />
            Micro-entreprise de naturopathie<br />
            <strong>Adresse :</strong> 729 route de Sarrians 84190 VACQUEYRAS<br />
            <strong>E-mail :</strong> <a href="mailto:alais.tavernier@gmail.com">alais.tavernier@gmail.com</a><br />
            <strong>Numéro SIRET :</strong> 92766779000020
          </p>`
      }
    }
  ];

  return (
    <SectionManager 
      pageKey="terms-of-service" 
      defaultSections={defaultSections} 
    />
  );
};

export default TermsOfService;
