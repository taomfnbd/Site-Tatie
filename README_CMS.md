# Configuration Decap CMS (Netlify CMS)

## Installation et Configuration

### 1. Déploiement sur Netlify

1. **Connecter le repository à Netlify**
   - Aller sur [netlify.com](https://netlify.com)
   - Cliquer sur "New site from Git"
   - Sélectionner votre repository GitHub/GitLab
   - Build command: `npm run build`
   - Publish directory: `dist`

2. **Activer Netlify Identity**
   - Dans le dashboard Netlify, aller à "Site settings"
   - Cliquer sur "Identity" dans le menu latéral
   - Cliquer sur "Enable Identity"

3. **Configurer Git Gateway**
   - Dans Identity settings, aller à "Services"
   - Cliquer sur "Enable Git Gateway"

4. **Configurer les paramètres d'inscription**
   - Dans Identity settings, aller à "Registration"
   - Sélectionner "Invite only" pour plus de sécurité
   - Optionnel: Configurer les rôles si nécessaire

### 2. Inviter votre cliente

1. **Créer une invitation**
   - Dans le dashboard Netlify, aller à "Identity"
   - Cliquer sur "Invite users"
   - Entrer l'email de votre cliente
   - Envoyer l'invitation

2. **Instructions pour votre cliente**
   - Elle recevra un email d'invitation
   - Elle devra cliquer sur le lien et créer son mot de passe
   - Une fois connectée, elle peut accéder à `/admin` sur le site

### 3. Utilisation du CMS

**Pour accéder à l'interface d'administration :**
- Aller sur `https://votre-site.netlify.app/admin`
- Se connecter avec les identifiants Netlify Identity
- Modifier le contenu via l'interface graphique

**Sections modifiables :**
- **Page d'accueil** : Texte héro, parcours, services, CTA
- **Services/Prestations** : Descriptions, tarifs, bienfaits
- **Contact** : Informations, horaires, moyens de paiement
- **Configuration** : Informations générales du site
- **Médias** : Upload et gestion des images

### 4. Workflow

1. **Modification du contenu**
   - Votre cliente se connecte sur `/admin`
   - Elle modifie le contenu via l'interface
   - Elle sauvegarde les changements

2. **Publication**
   - Les modifications créent automatiquement un commit Git
   - Netlify redéploie automatiquement le site
   - Les changements sont visibles en quelques minutes

### 5. Sécurité

- **Accès restreint** : Seules les personnes invitées peuvent accéder au CMS
- **Authentification** : Via Netlify Identity (sécurisé)
- **Sauvegarde** : Tout est versionné dans Git
- **Rollback** : Possibilité de revenir en arrière facilement

### 6. Support et maintenance

**Pour votre cliente :**
- Interface intuitive, pas de code à modifier
- Prévisualisation en temps réel
- Sauvegarde automatique des brouillons

**Pour vous :**
- Accès complet au code via Git
- Possibilité d'ajouter de nouveaux champs
- Monitoring via Netlify Dashboard

## Structure des fichiers de contenu

```
src/content/
├── home.md          # Page d'accueil
├── services.md      # Page services/prestations  
├── contact.md       # Page contact
└── site.md         # Configuration générale
```

## Ajout de nouveaux champs

Pour ajouter de nouveaux champs modifiables :

1. Modifier `public/admin/config.yml`
2. Ajouter les champs dans la collection appropriée
3. Mettre à jour le fichier markdown correspondant
4. Adapter les composants React pour utiliser les nouvelles données

## Dépannage

**Si le CMS ne se charge pas :**
- Vérifier que Netlify Identity est activé
- Vérifier que Git Gateway est configuré
- Vérifier les permissions du repository

**Si les modifications ne s'affichent pas :**
- Attendre quelques minutes (temps de déploiement)
- Vérifier les logs de build sur Netlify
- Vider le cache du navigateur