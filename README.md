# Alaïs Tavernier - Site Web Naturopathe

Site web professionnel pour Alaïs Tavernier, naturopathe et praticienne en massage bien-être à Vacqueyras.

## 🌟 Fonctionnalités

- **Site vitrine moderne** avec design responsive
- **Système de gestion de contenu (CMS)** via Decap CMS
- **Formulaire de contact** intégré avec Netlify Forms
- **Optimisation SEO** complète
- **Performance optimisée** avec Vite et React

## 🚀 Technologies utilisées

- **React 18** - Interface utilisateur moderne
- **Vite** - Build tool rapide et optimisé
- **Tailwind CSS** - Framework CSS utilitaire
- **Framer Motion** - Animations fluides
- **React Router** - Navigation
- **Decap CMS** - Gestion de contenu
- **Netlify** - Hébergement et déploiement

## 📁 Structure du projet

```
├── public/
│   ├── admin/              # Interface CMS
│   └── images/uploads/     # Images uploadées
├── src/
│   ├── components/         # Composants React
│   ├── pages/             # Pages du site
│   ├── common/            # Composants réutilisables
│   └── content/           # Fichiers de contenu Markdown
├── netlify.toml           # Configuration Netlify
└── README_CMS.md         # Guide CMS détaillé
```

## 🛠️ Installation et développement

### Prérequis
- Node.js 18+
- npm ou yarn

### Installation

```bash
# Cloner le repository
git clone [url-du-repository]
cd alais-tavernier-naturopathe

# Installer les dépendances
npm install

# Démarrer le serveur de développement
npm run dev
```

### Scripts disponibles

```bash
npm run dev      # Serveur de développement
npm run build    # Build de production
npm run lint     # Vérification du code
npm run preview  # Aperçu du build
```

## 🌐 Déploiement

### Netlify (Recommandé)

1. **Connecter à Netlify**
   - Build command: `npm run build`
   - Publish directory: `dist`

2. **Activer Netlify Identity**
   - Site Settings → Identity → Enable Identity
   - Services → Enable Git Gateway

3. **Configuration automatique**
   - Le fichier `netlify.toml` configure automatiquement les redirections
   - Le CMS est accessible sur `/admin`

## 📝 Gestion de contenu

### Accès au CMS
- URL: `https://votre-site.netlify.app/admin`
- Authentification via Netlify Identity
- Interface intuitive pour modifier le contenu

### Sections modifiables
- **Page d'accueil** : Hero, parcours, services, CTA
- **Services** : Descriptions, tarifs, bienfaits
- **Contact** : Informations, horaires, paiement
- **Configuration** : SEO, informations générales
- **Médias** : Gestion des images

## 📧 Formulaire de contact

### Configuration actuelle
- **Netlify Forms** (gratuit jusqu'à 100 soumissions/mois)
- Protection anti-spam intégrée
- Notifications email automatiques

### Configuration des emails
1. Netlify Dashboard → Site Settings → Forms
2. Form notifications → Add notification
3. Email de destination: `contact@alais-tavernier.fr`

## 🎨 Personnalisation

### Couleurs principales
```css
--primary: #95a58d      /* Vert sauge */
--primary-dark: #7a8471 /* Vert sauge foncé */
--stone-25: #fefdfb     /* Beige très clair */
```

### Images des libellules
- Libellule 1: Logo/décoration principale
- Libellule 2: Décoration secondaire
- Libellule 3: Accent décoratif

## 📱 Responsive Design

- **Mobile First** : Optimisé pour tous les écrans
- **Breakpoints** : xs (475px), sm (640px), md (768px), lg (1024px), xl (1280px)
- **Navigation mobile** : Menu hamburger avec animations

## ⚡ Performance

### Optimisations incluses
- **Lazy loading** des images
- **Preload** des ressources critiques
- **Compression** automatique des assets
- **Cache** optimisé via Netlify
- **Minification** CSS/JS automatique

## 🔍 SEO

### Optimisations SEO
- **Meta tags** complets
- **Open Graph** et Twitter Cards
- **Structured data** (JSON-LD)
- **Sitemap** automatique
- **URLs** optimisées

## 🐛 Dépannage

### Problèmes courants

1. **CMS ne se charge pas**
   - Vérifier Netlify Identity activé
   - Vérifier Git Gateway configuré

2. **Formulaire ne fonctionne pas**
   - Vérifier attribut `data-netlify="true"`
   - Consulter Netlify Dashboard → Forms

3. **Images ne s'affichent pas**
   - Vérifier les URLs des images
   - Contrôler les permissions

## 📞 Support

### Ressources utiles
- [Documentation Netlify](https://docs.netlify.com)
- [Guide Decap CMS](https://decapcms.org/docs/)
- [Tailwind CSS](https://tailwindcss.com/docs)

---

**Version** : 1.0.0  
**Dernière mise à jour** : Janvier 2024  
**Licence** : Propriétaire