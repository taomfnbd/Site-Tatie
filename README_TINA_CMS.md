> Document historique : le CMS et le déploiement ont évolué le 2 novembre 2026. Consulter [README.md](README.md) pour le fonctionnement actuel.

# Configuration Tina CMS

## 🚀 Migration de Netlify CMS vers Tina CMS

### Avantages de Tina CMS
- ✅ **Édition visuelle en temps réel** directement sur le site
- ✅ **Interface moderne** et intuitive
- ✅ **Gratuit** jusqu'à 2 utilisateurs
- ✅ **Performance** optimisée
- ✅ **Édition contextuelle** (clic pour modifier)
- ✅ **Preview en temps réel** des changements

## 📋 Configuration initiale

### 1. Créer un compte Tina Cloud
1. Aller sur [app.tina.io](https://app.tina.io)
2. Se connecter avec GitHub
3. Créer un nouveau projet
4. Connecter le repository GitHub
5. Récupérer `TINA_CLIENT_ID` et `TINA_TOKEN`

### 2. Configuration des variables d'environnement
Dans Netlify Dashboard → Site Settings → Environment variables :
```
TINA_CLIENT_ID=your_client_id
TINA_TOKEN=your_token
```

### 3. Déploiement
```bash
# Build local pour tester
npm run build

# Le déploiement sur Netlify se fait automatiquement
# Tina génère automatiquement l'interface d'administration
```

## 🎯 Utilisation pour Alaïs

### Accès à l'éditeur
1. **URL d'édition** : `https://votre-site.netlify.app/admin`
2. **Connexion** : Via GitHub (compte à créer si nécessaire)
3. **Édition** : Directement sur les pages du site

### Fonctionnalités disponibles
- **Édition en temps réel** : Voir les changements immédiatement
- **Interface française** : Tout en français
- **Édition contextuelle** : Cliquer sur le contenu pour le modifier
- **Sauvegarde automatique** : Pas de perte de données
- **Historique** : Possibilité de revenir en arrière

### Pages modifiables
1. **Page d'accueil** (`/`)
   - Section héro (nom, profession, description, citation)
   - Section "Mon parcours" 
   - Section services
   - Section appel à l'action

2. **Page services** (`/prestations`)
   - Descriptions des services
   - Tarifs
   - Bienfaits

3. **Page contact** (`/contact`)
   - Informations de contact
   - Horaires
   - Moyens de paiement

4. **Configuration générale**
   - SEO
   - Informations du site

## 🛠️ Fonctionnement technique

### Structure des fichiers
```
.tina/
├── config.ts          # Configuration Tina
└── __generated__/      # Fichiers générés automatiquement

src/
├── content/           # Fichiers Markdown (contenu)
├── hooks/
│   └── useTina.js    # Hook personnalisé pour Tina
└── components/
    └── TinaProvider.jsx # Provider Tina
```

### Édition du contenu
1. **Mode normal** : Site visible par tous
2. **Mode édition** : Interface d'édition pour les administrateurs
3. **Sauvegarde** : Commit automatique sur GitHub
4. **Déploiement** : Netlify redéploie automatiquement

## 📝 Instructions pour Alaïs

### Première connexion
1. Aller sur `votre-site.netlify.app/admin`
2. Se connecter avec le compte GitHub configuré
3. L'interface d'édition s'ouvre automatiquement

### Modifier du contenu
1. **Cliquer sur l'élément à modifier** directement sur la page
2. **Éditer dans le panneau** qui s'ouvre à droite
3. **Voir le résultat** en temps réel
4. **Sauvegarder** quand satisfait

### Types de modifications possibles
- **Textes** : Titres, descriptions, citations
- **Images** : Upload et remplacement
- **Listes** : Ajouter/supprimer des éléments (bienfaits, horaires)
- **Informations** : Tarifs, contact, horaires

## 🔧 Maintenance et support

### Sauvegardes
- **Automatique** : Chaque modification = commit Git
- **Historique complet** : Accessible via GitHub
- **Restauration** : Possible en cas de problème

### Support technique
- **Documentation** : [tina.io/docs](https://tina.io/docs)
- **Support Tina** : Via Discord ou GitHub
- **Développeur** : Contact en cas de problème complexe

### Monitoring
- **Déploiements** : Visibles dans Netlify Dashboard
- **Erreurs** : Logs accessibles
- **Performance** : Monitoring automatique

## 🚨 Dépannage

### Problèmes courants
1. **Interface ne se charge pas**
   - Vérifier les variables d'environnement
   - Vérifier la connexion GitHub

2. **Modifications non visibles**
   - Attendre le redéploiement (2-5 min)
   - Vider le cache navigateur

3. **Impossible de sauvegarder**
   - Vérifier les permissions GitHub
   - Contacter le support

### Contacts d'urgence
- **Tina Support** : [Discord Tina](https://discord.gg/zumN63Ybpf)
- **Développeur** : [email du développeur]

---

**🎉 Tina CMS est maintenant configuré et prêt à l'emploi !**

L'édition du contenu est maintenant plus intuitive et moderne avec Tina CMS.