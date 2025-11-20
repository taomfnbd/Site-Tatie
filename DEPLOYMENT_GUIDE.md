# 🚀 Guide de Déploiement - Site Alaïs Tavernier

## Étapes de déploiement sur Netlify

### 1. Préparation du repository

**✅ Vérifications avant déploiement :**
- [ ] Code committé et pushé sur GitHub/GitLab
- [ ] Dependencies à jour dans `package.json`
- [ ] Build fonctionne en local (`npm run build`)
- [ ] Tous les fichiers de configuration présents

### 2. Connexion à Netlify

1. **Aller sur [netlify.com](https://netlify.com)**
2. **Se connecter ou créer un compte**
3. **Cliquer sur "New site from Git"**
4. **Sélectionner votre provider Git** (GitHub/GitLab)
5. **Choisir le repository** `alais-tavernier-naturopathe`

### 3. Configuration du build

**Paramètres de build :**
```
Build command: npm run build
Publish directory: dist
Node version: 18
```

**Variables d'environnement :**
- Aucune variable requise pour le moment
- Le fichier `netlify.toml` configure automatiquement tout

### 4. Activation de Netlify Identity

**Étapes :**
1. **Aller dans Site Settings**
2. **Cliquer sur "Identity" dans le menu**
3. **Cliquer sur "Enable Identity"**
4. **Dans Services → Cliquer sur "Enable Git Gateway"**

**Configuration Identity :**
- **Registration preferences** : "Invite only" (recommandé)
- **External providers** : Désactivés (optionnel)
- **Emails** : Templates par défaut OK

### 5. Invitation de l'administratrice

**Inviter Alaïs :**
1. **Identity tab → "Invite users"**
2. **Email** : `contact@alais-tavernier.fr` (ou son email personnel)
3. **Role** : Laisser vide ou créer un rôle "admin"
4. **Envoyer l'invitation**

**Instructions pour Alaïs :**
- Elle recevra un email d'invitation
- Cliquer sur le lien et créer son mot de passe
- Accéder au CMS via `https://son-site.netlify.app/admin`

### 6. Configuration du formulaire de contact

**Automatique :**
- Netlify détecte automatiquement le formulaire
- Accessible dans Dashboard → Forms

**Configuration des notifications email :**
1. **Site Settings → Forms → Form notifications**
2. **Add notification → Email notification**
3. **Email to notify** : `contact@alais-tavernier.fr`
4. **Event to listen for** : Form submission

### 7. Configuration du domaine personnalisé (optionnel)

**Si domaine personnalisé :**
1. **Site Settings → Domain management**
2. **Add custom domain**
3. **Suivre les instructions DNS**

**Configuration DNS recommandée :**
```
Type: CNAME
Name: www
Value: [nom-du-site].netlify.app

Type: ALIAS/ANAME (ou A record)
Name: @
Value: [IP Netlify ou nom-du-site].netlify.app
```

### 8. Optimisations post-déploiement

**Analytics (optionnel) :**
- Activer Netlify Analytics
- Ou intégrer Google Analytics

**Sécurité :**
- HTTPS automatique (Let's Encrypt)
- Headers de sécurité configurés via `netlify.toml`

**Performance :**
- Build optimization activée
- Asset optimization automatique
- CDN global Netlify

## 🔧 Configuration avancée

### Variables d'environnement futures
```
# Si EmailJS est activé plus tard
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
```

### Webhooks (optionnel)
- Notifications Slack/Discord des déploiements
- Intégrations tierces

### Redirections personnalisées
Le fichier `netlify.toml` inclut déjà :
```toml
[[redirects]]
  from = "/admin"
  to = "/admin/index.html"
  status = 200
```

## 📋 Checklist finale

### ✅ Vérifications post-déploiement

**Fonctionnalités de base :**
- [ ] Site accessible sur l'URL Netlify
- [ ] Navigation fonctionne sur toutes les pages
- [ ] Images se chargent correctement
- [ ] Design responsive sur mobile/desktop

**CMS :**
- [ ] `/admin` accessible
- [ ] Netlify Identity activé
- [ ] Alaïs peut se connecter
- [ ] Modification de contenu fonctionne
- [ ] Sauvegarde et publication OK

**Formulaire de contact :**
- [ ] Formulaire s'affiche correctement
- [ ] Soumission fonctionne
- [ ] Email de notification reçu
- [ ] Données visibles dans Netlify Dashboard

**Performance :**
- [ ] Temps de chargement < 3s
- [ ] Score Lighthouse > 90
- [ ] Pas d'erreurs console

### 🚨 Tests critiques

**Test du formulaire :**
1. Remplir le formulaire de contact
2. Vérifier la réception de l'email
3. Contrôler les données dans Netlify Forms

**Test du CMS :**
1. Se connecter sur `/admin`
2. Modifier un texte sur la page d'accueil
3. Sauvegarder et vérifier le changement en ligne

**Test mobile :**
1. Ouvrir sur smartphone
2. Tester la navigation
3. Vérifier le formulaire de contact

## 📞 Support et maintenance

### Accès administrateur
- **Netlify Dashboard** : Accès complet au déploiement
- **GitHub/GitLab** : Code source et versions
- **CMS** : Interface de gestion de contenu

### Monitoring
- **Uptime** : Monitoring automatique Netlify
- **Analytics** : Statistiques de visite
- **Forms** : Suivi des soumissions

### Backup
- **Code** : Versionné sur Git
- **Contenu** : Sauvegardé dans les commits Git
- **Déploiements** : Historique Netlify

---

**🎉 Le site est prêt pour la production !**

Une fois ces étapes complétées, le site sera entièrement fonctionnel et Alaïs pourra gérer son contenu de manière autonome via l'interface CMS.