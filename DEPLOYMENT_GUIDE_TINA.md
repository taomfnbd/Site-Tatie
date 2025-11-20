# 🚀 Guide de Déploiement avec Tina CMS

## Étapes de configuration Tina Cloud

### 1. Créer un projet Tina Cloud
1. **Aller sur [app.tina.io](https://app.tina.io)**
2. **Se connecter avec GitHub**
3. **Cliquer sur "New Project"**
4. **Sélectionner le repository** `alais-tavernier-naturopathe`
5. **Configurer le projet** :
   - Project name: `alais-tavernier-naturopathe`
   - Framework: `Other` (Vite/React)
   - Build command: `npm run build`

### 2. Récupérer les identifiants
1. **Dans le dashboard Tina** → Project Settings
2. **Copier** :
   - `Client ID`
   - `Read-only Token`

### 3. Configuration Netlify

#### Variables d'environnement
Dans Netlify Dashboard → Site Settings → Environment variables :
```
TINA_CLIENT_ID=your_client_id_here
TINA_TOKEN=your_token_here
```

#### Build settings
- **Build command** : `npm run build`
- **Publish directory** : `dist`
- **Node version** : `18`

### 4. Premier déploiement
1. **Push du code** sur GitHub
2. **Netlify déploie automatiquement**
3. **Tina génère l'interface** à `/admin`

## 🔧 Configuration post-déploiement

### 1. Test de l'interface d'administration
1. **Aller sur** `https://votre-site.netlify.app/admin`
2. **Se connecter** avec le compte GitHub configuré sur Tina Cloud
3. **Vérifier** que l'interface se charge correctement

### 2. Test de l'édition
1. **Cliquer sur "Edit this page"** en bas à droite
2. **Modifier un texte** dans l'interface
3. **Sauvegarder** et vérifier le commit sur GitHub
4. **Attendre le redéploiement** (2-5 minutes)
5. **Vérifier** que les changements sont visibles

### 3. Configuration des permissions
1. **Dans Tina Cloud** → Project Settings → Collaborators
2. **Inviter Alaïs** avec son email GitHub
3. **Role** : Editor (peut modifier le contenu)

## 👤 Guide utilisateur pour Alaïs

### Première connexion
1. **Recevoir l'invitation** par email de Tina Cloud
2. **Créer un compte GitHub** si nécessaire
3. **Accepter l'invitation** Tina Cloud
4. **Aller sur** `https://votre-site.netlify.app/admin`
5. **Se connecter** avec GitHub

### Utilisation quotidienne
1. **Aller sur le site** normal
2. **Se connecter** via le bouton "Admin" ou `/admin`
3. **Cliquer sur "Edit this page"** pour modifier
4. **Éditer** le contenu dans l'interface
5. **Sauvegarder** → déploiement automatique

## 🔍 Fonctionnalités Tina disponibles

### Édition visuelle
- **Édition en contexte** : Clic direct sur les éléments
- **Preview temps réel** : Voir les changements immédiatement
- **Interface française** : Tout en français
- **Sauvegarde auto** : Pas de perte de données

### Types de contenu modifiables
- **Textes** : Tous les textes du site
- **Images** : Upload et remplacement
- **Listes** : Horaires, bienfaits, services
- **Rich text** : Texte enrichi avec formatage
- **SEO** : Meta descriptions, titres

### Gestion des médias
- **Upload direct** : Glisser-déposer
- **Organisation** : Dossiers automatiques
- **Optimisation** : Compression automatique
- **Formats** : JPG, PNG, SVG, WebP

## 🚨 Dépannage

### Interface ne se charge pas
1. **Vérifier les variables d'environnement** Netlify
2. **Vérifier la configuration** Tina Cloud
3. **Consulter les logs** de build Netlify
4. **Tester en mode développement** localement

### Impossible de sauvegarder
1. **Vérifier les permissions** GitHub
2. **Vérifier le token** Tina Cloud
3. **Rafraîchir la page** et réessayer
4. **Contacter le support** Tina si persistant

### Modifications non visibles
1. **Attendre le déploiement** (2-5 min)
2. **Vider le cache** navigateur (Ctrl+F5)
3. **Vérifier le commit** sur GitHub
4. **Consulter les logs** Netlify

## 📊 Monitoring et maintenance

### Surveillance
- **Uptime** : Monitoring Netlify automatique
- **Performance** : Lighthouse intégré
- **Erreurs** : Logs Netlify + Tina Cloud
- **Usage** : Dashboard Tina Cloud

### Sauvegardes
- **Git** : Historique complet automatique
- **Tina Cloud** : Backup des configurations
- **Netlify** : Snapshots de déploiement
- **Recovery** : Rollback possible facilement

### Mises à jour
- **Tina** : Mises à jour automatiques du CMS
- **Dependencies** : À faire périodiquement
- **Security** : Patches automatiques Netlify
- **Features** : Nouvelles fonctionnalités Tina

## 📞 Support

### Ressources
- **Documentation Tina** : [tina.io/docs](https://tina.io/docs)
- **Discord Tina** : Support communautaire
- **GitHub Issues** : Pour les bugs techniques
- **Netlify Support** : Pour l'hébergement

### Contacts d'urgence
- **Développeur** : [email]
- **Tina Support** : Via Discord
- **Netlify Support** : Via dashboard

---

**🎉 Configuration Tina CMS terminée !**

Le site dispose maintenant d'un CMS moderne avec édition visuelle en temps réel. Alaïs peut modifier le contenu facilement via l'interface `/admin`.