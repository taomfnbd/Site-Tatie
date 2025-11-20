export const initialSiteContent = {
  header: {
    brand: {
      name: 'Alaïs Tavernier',
      subtitle: 'Naturopathe'
    },
    links: [
      { name: 'Accueil', href: '/' },
      { name: 'Prestations', href: '/prestations' },
      { name: 'Naturopathie', href: '/naturopathie' },
      { name: 'Massage assis', href: '/massage-assis' },
      { name: 'Contact', href: '/contact' }
    ],
    cta: 'Prendre RDV'
  },
  footer: {
    brand: {
      name: 'Alaïs Tavernier',
      role: 'Naturopathe',
      description: 'Éducatrice de la santé, je vous accompagne pour devenir autonome et acteur de votre bien-être.'
    },
    contact: {
      phone: '07.81.66.09.29',
      address: '729 route de Sarrians<br />84190 Vacqueyras',
      bookingText: 'Réserver en ligne'
    },
    hours: {
      line1: '<span class="font-medium">Lundi & Jeudi:</span> 9h-17h',
      line2: '<span class="font-medium">Samedi:</span> 9h-12h',
      line3: 'Autres jours: sur RDV'
    },
    social: {
      instagram: 'lali_bellul'
    },
    legal: {
      copyright: '© 2026 Alaïs Tavernier - Naturopathe. Tous droits réservés.'
    }
  },
  pages: {
    home: [
      {
        id: 'hero-1',
        type: 'hero',
        content: {
          firstName: 'Alaïs',
          lastName: 'Tavernier',
          profession: 'Naturopathe',
          subtitle: 'Massage bien-être',
          description: 'Éducatrice de la santé, je vous accompagne pour que vous deveniez autonome et acteur de votre bien-être.',
          quote: 'La force qui est en chacun de nous est notre plus grand médecin',
          quoteAuthor: 'Hippocrate',
        }
      },
      {
        id: 'about-1',
        type: 'about',
        content: {
          titlePrefix: 'Mon',
          title: 'parcours de vie',
          subtitle: 'Découvrez mon cheminement vers la naturopathie',
          content: 'Je suis Alaïs, j\'ai 40 ans. Mon parcours professionnel a débuté dans le domaine médical, en tant que secrétaire médicale, avant d\'évoluer vers la comptabilité au sein d\'un cabinet d\'expertise... L\'expérience du télétravail pendant la période du COVID m\'a offert une véritable prise de conscience : mon activité ne correspondait plus à mes aspirations profondes. C\'est donc tout naturellement que la naturopathie s\'est imposée à moi comme une évidence. En 2022, j\'ai ainsi intégré avec enthousiasme l\'école Aesculape, école libre de naturopathie à Aix-en-Provence, pour y suivre trois années de formation riches d\'apprentissage et de sens.',
          imageUrl: 'https://raw.githubusercontent.com/taomfnbd/image2/main/1.svg',
        }
      },
      {
        id: 'cta-1',
        type: 'cta',
        content: {
          title: 'Prêt(e) à prendre soin de votre bien-être ?',
          description: 'Prenez rendez-vous dès maintenant pour un accompagnement personnalisé',
        }
      }
    ],
    services: [
      {
        id: 'services-header-1',
        type: 'services_header',
        content: {
          titlePrefix: 'Mes',
          title: 'prestations',
          subtitle: 'Des accompagnements personnalisés pour votre bien-être global',
          imageUrl: 'https://raw.githubusercontent.com/taomfnbd/image2/main/3.svg',
        }
      },
      {
        id: 'service-naturopathy-1',
        type: 'service_card',
        content: {
          iconType: 'leaf',
          gradient: 'from-green-25 to-stone-25',
          title: 'Naturopathie',
          subtitle: 'Bilan de vitalité et conseils personnalisés',
          description: 'Un accompagnement complet pour retrouver votre équilibre naturel grâce à un bilan de vitalité personnalisé.',
          benefits: [
            'Bilan de vitalité complet',
            'Conseils alimentaires personnalisés',
            'Recommandations en hygiène de vie',
            'Suivi de votre évolution'
          ],
          prices: [
            { type: 'Première consultation', duration: '1h30', price: '70€' },
            { type: 'Séances suivantes', duration: '1h', price: '50€' }
          ],
          linkUrl: '/naturopathie',
          linkText: 'En savoir plus',
        }
      },
      {
        id: 'service-massage-1',
        type: 'service_card',
        content: {
          iconType: 'heart',
          gradient: 'from-stone-25 to-green-25',
          title: 'Massage assis',
          subtitle: 'Détente immédiate sans se déshabiller',
          description: 'Un massage relaxant pratiqué habillé, ciblé sur les zones de tensions du dos, nuque et épaules.',
          benefits: [
            'Réduction du stress et des tensions',
            'Amélioration du sommeil',
            'Stimulation de la circulation',
            'Boost d\'énergie immédiat'
          ],
          prices: [
            { type: 'Séance complète', duration: '30 min', price: '30€' }
          ],
          linkUrl: '/massage-assis',
          linkText: 'En savoir plus',
        }
      }
    ],
    naturopathy: [
      {
        id: 'naturo-hero',
        type: 'service_hero',
        content: {
          title: 'La naturopathie',
          subtitle: 'Une approche naturelle et globale pour devenir acteur de votre bien-être, en harmonie avec votre corps et votre environnement.',
          imageUrl: 'https://raw.githubusercontent.com/taomfnbd/image2/main/4.svg',
        }
      },
      {
        id: 'naturo-about',
        type: 'service_content',
        content: {
          title: 'Qu\'est-ce que la naturopathie ?',
          paragraphs: [
            'Le naturopathe est un <strong>éducateur de santé</strong>. Il accompagne son client à comprendre le fonctionnement de son organisme, à devenir autonome et acteur de son bien-être.',
            'Son rôle est de révéler en chacun sa propre capacité d\'auto-guérison.',
            'J\'accompagne chaque personne à retrouver vitalité et harmonie grâce à une approche naturelle et globale de la santé : alimentation, émotions, rythme de vie et équilibre intérieur.',
            'La naturopathie s\'adresse à toute personne souhaitant améliorer son bien-être, retrouver vitalité et équilibre au naturel : enfants, adolescents, adultes.',
            'Chaque accompagnement est personnalisé selon votre mode de vie, vos besoins et votre rythme.',
          ],
        }
      },
      {
        id: 'naturo-process',
        type: 'service_process',
        content: {
          title: 'Comment se déroule l\'accompagnement ?',
          steps: [
            {
              title: 'Première consultation',
              description: 'Un bilan de vitalité est établi à partir de questions sur votre parcours de vie, vos habitudes alimentaires et votre quotidien.',
              price: '70€',
              duration: '1h30'
            },
            {
              title: 'Conseils & suivi',
              description: 'Des conseils personnalisés simples et naturels vous sont proposés. Les séances suivantes permettent de suivre l\'évolution et d\'ajuster les recommandations.',
              price: '50€',
              duration: '1h'
            }
          ]
        }
      },
      {
        id: 'naturo-reasons',
        type: 'service_benefits',
        content: {
          title: 'Motifs de consultation',
          benefits: [
            'Troubles digestifs : ballonnements, constipation, reflux',
            'Intolérances ou allergies alimentaires',
            'Rééquilibrage alimentaire',
            'Perte ou prise de poids',
            'Fatigue, manque d\'énergie : sommeil non réparateur, période de surmenage',
            'Gestion du stress et des émotions',
            'Problèmes de peau, cheveux, ongles',
            'Accompagnement à chaque étape de la vie : troubles du cycle menstruel, SPM, pré-ménopause, ménopause',
          ]
        }
      },
      {
        id: 'naturo-cta',
        type: 'service_cta',
        content: {
          title: 'Prêt(e) à commencer votre accompagnement ?',
          showPriceBox: true,
          serviceName: 'Première consultation',
          duration: '1h30',
          price: '70€',
        }
      }
    ],
    massage: [
      {
        id: 'massage-hero',
        type: 'service_hero',
        content: {
          title: 'Massage assis',
          subtitle: 'Une pause bien-être pratique et efficace pour soulager les tensions, réduire le stress et retrouver de l\'énergie, le tout en restant habillé.',
          imageUrl: 'https://raw.githubusercontent.com/taomfnbd/image2/main/2.svg',
        }
      },
      {
        id: 'massage-about',
        type: 'service_content',
        content: {
          title: 'Qu\'est-ce que le massage assis ?',
          paragraphs: [
            'Le massage assis est un <strong>enchaînement précis</strong> composé de pressions et d\'étirements. Il est pratiqué <strong>habillé et sans huile</strong>, ce qui le rend particulièrement pratique et accessible.',
            'Cette technique permet une <strong>détente immédiate</strong> en ciblant les zones où s\'accumulent le plus souvent les tensions : nuque, épaules, dos.',
          ],
        }
      },
      {
        id: 'massage-process',
        type: 'service_process_cards',
        content: {
          title: 'Déroulement de la séance',
          steps: [
            {
              title: 'Installation',
              description: 'Vous êtes installé(e) confortablement sur une chaise de massage spécialement conçue, en position assise.',
            },
            {
              title: 'Massage ciblé',
              description: 'Les zones massées sont le crâne, les épaules, le dos, les bras et les mains avec des techniques précises.',
            },
            {
              title: 'Détente immédiate',
              description: 'Ressentez les bienfaits dès la fin de la séance : détente, soulagement des tensions et regain d\'énergie.',
            }
          ]
        }
      },
      {
        id: 'massage-reasons',
        type: 'service_benefits',
        content: {
          title: 'Bienfaits du massage assis',
          benefits: [
            'Réduit le stress et les tensions (nuque, dos...)',
            'Améliore la qualité du sommeil',
            'Favorise la circulation sanguine et lymphatique',
            'Stimule l\'énergie et la vitalité',
            'Procure une détente immédiate',
            'Soulage les douleurs musculaires',
          ]
        }
      },
      {
        id: 'massage-cta',
        type: 'service_cta',
        content: {
          title: 'Offrez-vous un moment de détente',
          showPriceBox: true,
          serviceName: 'Massage assis',
          duration: '30 minutes',
          price: '30€',
        }
      }
    ],
    contact: [
      {
        id: 'contact-hero',
        type: 'contact_hero',
        content: {
          title: 'Contact & <span class="text-[#95a58d]">Infos pratiques</span>',
          subtitle: 'Toutes les informations pour me contacter et organiser votre rendez-vous',
        }
      },
      {
        id: 'contact-main',
        type: 'contact_details',
        content: {
          directContact: {
              title: 'Contact direct',
              phoneLabel: 'Téléphone',
              phone: '07.81.66.09.29',
              addressLabel: 'Adresse',
              address: '729 route de Sarrians<br />84190 Vacqueyras',
          },
        }
      },
      {
        id: 'contact-form',
        type: 'contact_form',
        content: {
          title: 'Envoyez-moi un message',
        }
      }
    ],
    'legal-notice': [
      {
        id: 'legal-notice',
        type: 'legal_content',
        content: {
          title: 'Mentions <span class="text-[#95a58d]">Légales</span>',
          content: `<h2>1. Éditeur du site</h2>
            <p>
              Le présent site internet [Alaïs Tavernier Naturopathe] est édité par :
            </p>
            <p>
              <strong>Alaïs Tavernier</strong><br />
              Exerçant en micro-entreprise<br />
              <strong>Adresse professionnelle :</strong> 729 route de Sarrians 84190 Vacqueyras<br />
              <strong>Adresse e-mail :</strong> <a href="mailto:alais.tavernier@gmail.com">alais.tavernier@gmail.com</a><br />
              <strong>Téléphone :</strong> <a href="tel:0781660929">0781660929</a><br />
              <strong>Numéro SIRET :</strong> 92766779000020<br />
              <strong>TVA :</strong> non applicable, article 293 B du CGI
            </p>

            <h2>2. Activité</h2>
            <p>
              Naturopathe et praticienne en massages assis, inscrite dans le cadre d'une activité de 
              bien-être et de prévention.
            </p>
            <p>
              <strong>Les prestations proposées ne se substituent en aucun cas à un suivi médical, 
              à un diagnostic ou à un traitement prescrit par un professionnel de santé.</strong>
            </p>

            <h2>3. Directeur de la publication</h2>
            <p>
              Le directeur de la publication est Alaïs Tavernier.
            </p>

            <h2>4. Hébergeur du site</h2>
            <p>
              Le site est hébergé par :<br />
              <strong>Netlify, Inc.</strong><br />
              <strong>Adresse :</strong> 2325 3rd Street, Suite 296, San Francisco, California 94107, USA<br />
              <strong>Site web :</strong> <a href="https://www.netlify.com" target="_blank" rel="noopener noreferrer">www.netlify.com</a>
            </p>

            <h2>5. Propriété intellectuelle</h2>
            <p>
              L'ensemble du contenu présent sur ce site (textes, photographies, graphismes, logo, icônes, 
              etc.) est protégé par le droit de la propriété intellectuelle.
            </p>
            <p>
              Toute reproduction, modification, distribution ou réutilisation, totale ou partielle, sans 
              autorisation écrite préalable de l'éditeur est strictement interdite.
            </p>

            <h2>6. Responsabilité</h2>
            <p>
              L'éditeur du site ne pourra être tenu responsable des dommages directs ou indirects 
              résultant de l'accès ou de l'utilisation du site.
            </p>
            <p>
              Les informations diffusées ont une visée informative et ne peuvent être assimilées à des 
              conseils médicaux ou thérapeutiques.
            </p>
            <p>
              L'utilisateur reconnaît utiliser les informations et services proposés sous sa seule 
              responsabilité.
            </p>

            <h2>7. Liens hypertextes</h2>
            <p>
              Des liens hypertextes peuvent être présents sur le site, notamment vers Instagram et 
              Resalib.
            </p>
            <p>
              Ces liens sont fournis pour la commodité des utilisateurs.
            </p>
            <p>
              L'éditeur du site n'exerce aucun contrôle sur le contenu de ces sites externes et décline toute 
              responsabilité quant à leur contenu ou leur fonctionnement.
            </p>

            <h2>8. Données personnelles</h2>
            <p>
              Conformément à la loi "Informatique et Libertés" et au RGPD, vous disposez d'un droit 
              d'accès, de rectification et de suppression des données vous concernant.
            </p>
            <p>
              Le site ne collecte pas directement de données personnelles. Les prises de rendez-vous 
              s'effectuent via des plateformes externes (Resalib) qui disposent de leurs propres 
              politiques de confidentialité.
            </p>
            <p>
              Pour l'exercice de vos droits, adressez-vous à Alaïs Tavernier par email à 
              <a href="mailto:alais.tavernier@gmail.com">alais.tavernier@gmail.com</a>.
            </p>

            <h2>9. Droit applicable</h2>
            <p>
              Les présentes mentions légales sont régies par le droit français. En cas de litige, 
              les tribunaux français seront seuls compétents.
            </p>`
        }
      }
    ],
    'terms-of-service': [
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
    ]
  }
};
