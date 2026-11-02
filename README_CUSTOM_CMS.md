> Document historique : le CMS et le déploiement ont évolué le 2 novembre 2026. Consulter [README.md](README.md) pour le fonctionnement actuel.

# 🎨 CMS Inline Editor Personnalisé

## Fonctionnalités

### ✨ Édition inline en temps réel
- **Cliquez pour modifier** : Cliquez directement sur n'importe quel texte ou image pour le modifier
- **Aperçu instantané** : Voyez vos modifications en temps réel
- **Interface intuitive** : Pas besoin de connaissances techniques

### 🔒 Sécurité
- **Authentification par mot de passe** : Accès protégé à l'interface d'édition
- **Session temporaire** : Déconnexion automatique après 24h
- **Sauvegarde locale** : Modifications stockées dans le navigateur

### 📝 Types de contenu modifiables
- **Textes courts** : Titres, sous-titres, noms
- **Textes longs** : Paragraphes, descriptions
- **Images** : Upload depuis l'ordinateur ou URL

## 🚀 Utilisation

### Accès à l'interface
1. Aller sur `https://votre-site.netlify.app/#/admin`
2. Entrer le mot de passe (par défaut : `alais2024admin`)
3. Cliquer sur "Activer édition" dans la barre d'outils

### Modifier du texte
1. **Activer le mode édition** via la barre d'outils
2. **Cliquer sur le texte** que vous voulez modifier
3. **Éditer** dans le champ qui apparaît
4. **Enregistrer** ou **Annuler**

### Modifier une image
1. **Activer le mode édition**
2. **Cliquer sur l'image**
3. **Choisir** :
   - Télécharger depuis l'ordinateur
   - Utiliser une URL
4. **Enregistrer**

### Sauvegarder les modifications
1. **Bouton "Enregistrer"** dans la barre d'outils (apparaît si modifications)
2. **Confirmation** : "Enregistré !"
3. Les modifications sont **persistantes** (stockées localement)

## 🛠️ Configuration

### Changer le mot de passe
Modifier dans `src/cms/CMSAuth.jsx` :
```javascript
const DEFAULT_PASSWORD = 'votre-nouveau-mot-de-passe';
```

### Durée de session
Modifier dans `src/cms/CMSContext.jsx` :
```javascript
// Session expire après 24 heures (en millisecondes)
if (elapsed < 24 * 60 * 60 * 1000) {
  // Changer 24 par le nombre d'heures souhaité
}
```

## 📋 Structure des fichiers

```
src/
├── cms/
│   ├── CMSAuth.jsx          # Authentification
│   ├── CMSContext.jsx       # Gestion d'état
│   ├── CMSToolbar.jsx       # Barre d'outils
│   ├── EditableText.jsx     # Composant texte éditable
│   └── EditableImage.jsx    # Composant image éditable
└── pages/
    ├── CMSAdmin.jsx         # Page d'administration
    └── HomeEditable.jsx     # Exemple page éditable
```

## 🎯 Intégration dans vos pages

### Rendre un texte éditable
```jsx
import EditableText from '../cms/EditableText';

<EditableText 
  id="hero.title"              // ID unique
  defaultValue="Mon Titre"     // Valeur par défaut
  as="h1"                      // Élément HTML (p, h1, span...)
  className="text-4xl"         // Classes CSS
  multiline={false}            // Texte multiligne ?
/>
```

### Rendre une image éditable
```jsx
import EditableImage from '../cms/EditableImage';

<EditableImage 
  id="about.photo"             // ID unique
  defaultSrc="/image.jpg"      // Image par défaut
  alt="Description"            // Texte alternatif
  className="w-full rounded"   // Classes CSS
/>
```

## 💾 Sauvegarde des données

### Stockage local (actuel)
- Les modifications sont **stockées dans le navigateur** (localStorage)
- **Persistant** : Les données restent même après fermeture
- **Limitation** : Données locales à chaque navigateur

### Migration vers serveur (future)
Pour sauvegarder sur serveur, modifier `src/cms/CMSContext.jsx` :
```javascript
const saveChanges = async () => {
  // Sauvegarder localement
  localStorage.setItem('cms-content', JSON.stringify(contentData));
  
  // TODO: Envoyer au serveur
  try {
    await fetch('/api/save-content', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(contentData)
    });
  } catch (error) {
    console.error('Erreur sauvegarde serveur:', error);
  }
  
  return true;
};
```

## 🔧 Personnalisation

### Couleurs de l'éditeur
Modifier dans les composants CMS :
```css
/* Couleur principale */
bg-[#95a58d]  →  bg-[votre-couleur]

/* Couleur hover */
hover:bg-[#7a8471]  →  hover:bg-[votre-couleur]
```

### Icônes de la barre d'outils
Modifier dans `src/cms/CMSToolbar.jsx` :
```javascript
import * as FiIcons from 'react-icons/fi';
const { FiEdit2, FiSave, FiX } = FiIcons;
```

## 📱 Responsive

Le CMS est **entièrement responsive** :
- **Mobile** : Interface adaptée tactile
- **Tablette** : Barre d'outils optimisée
- **Desktop** : Expérience complète

## 🚨 Dépannage

### Modifications non sauvegardées
1. Vérifier que vous avez cliqué sur "Enregistrer"
2. Vérifier la console navigateur (F12)
3. Vider le cache et réessayer

### Mot de passe oublié
Contacter le développeur pour réinitialiser dans le code

### Images ne s'affichent pas
1. Vérifier le format (JPG, PNG, WebP, SVG)
2. Vérifier la taille (max 5MB)
3. Essayer avec une URL externe

## 📈 Améliorations futures

### Court terme
- [ ] Export/Import des données
- [ ] Historique des modifications
- [ ] Undo/Redo

### Moyen terme
- [ ] Sauvegarde sur serveur
- [ ] Multi-utilisateurs
- [ ] Gestion des médias avancée

### Long terme
- [ ] Éditeur WYSIWYG complet
- [ ] Gestion des menus
- [ ] Système de traduction

## 📞 Support

Pour toute question ou problème :
- Consulter ce README
- Vérifier la console navigateur (F12)
- Contacter le développeur

---

**🎉 Votre CMS inline est prêt à l'emploi !**

Simple, intuitif et puissant pour gérer votre contenu sans toucher au code.