# 📝 Guide d'Utilisation du CMS - Site Alaïs Tavernier

## 🎯 Qu'est-ce que le CMS ?

Votre site dispose d'un **système de gestion de contenu (CMS)** qui vous permet de modifier facilement les textes et images **directement sur le site**, sans aucune connaissance technique. C'est comme WordPress ou Wix, mais intégré directement dans votre site !

---

## 🚀 Comment accéder au CMS ?

### Étape 1 : Se connecter en mode admin

1. **Ouvrez votre site** dans votre navigateur
2. **Ajoutez `?admin` à la fin de l'URL**
   - Exemple local : `http://localhost:5175/?admin`
   - Exemple en ligne : `https://votre-site.netlify.app/?admin`

3. **Une fenêtre de connexion apparaît**
4. **Entrez le mot de passe** : `admin123` (par défaut)
5. **Cliquez sur "Se connecter"**

✅ Vous êtes maintenant connectée en mode admin !

---

## ✏️ Modifier les Textes

### Comment ça marche ?

1. **La barre d'outils admin** apparaît en haut de la page (fond noir)
2. **Cliquez directement sur n'importe quel texte** que vous souhaitez modifier
3. **Un contour bleu** apparaît autour du texte → il est maintenant éditable
4. **Modifiez le texte** comme dans Word
5. **Cliquez en dehors** du texte pour enregistrer automatiquement

### Astuces

- Vous pouvez modifier tous les textes : titres, sous-titres, paragraphes, citations, etc.
- Le texte sélectionné a un **contour bleu** pour vous montrer qu'il est en mode édition
- Appuyez sur **Échap** pour annuler les modifications
- Les textes au survol ont un **contour bleu clair** pour indiquer qu'ils sont cliquables

---

## 🖼️ Modifier les Images

### Comment ça marche ?

1. **Cliquez sur l'image** que vous souhaitez modifier
2. **Une fenêtre s'ouvre** vous demandant l'URL de la nouvelle image
3. **Entrez l'URL de votre image**
   - Exemple : `https://example.com/nouvelle-image.jpg`
   - Ou utilisez une URL d'image hébergée sur un service comme [Imgur](https://imgur.com/) ou [Cloudinary](https://cloudinary.com/)
4. **Validez** et l'image se met à jour instantanément

### Où trouver des URLs d'images ?

- **Héberger sur Imgur** : Gratuit et simple
  1. Allez sur [imgur.com](https://imgur.com/)
  2. Téléchargez votre image
  3. Clic droit sur l'image → "Copier l'adresse de l'image"
  4. Collez cette URL dans le CMS

- **Utiliser vos propres images hébergées**
  - Si vous avez un hébergeur de fichiers
  - Ou demandez à votre développeur de les héberger

---

## 💾 Sauvegarder les Modifications

### Sauvegarde automatique

**Bonne nouvelle !** Vos modifications sont **automatiquement sauvegardées** dans le navigateur dès que vous cliquez en dehors d'un élément modifié.

### Vérifier qu'une modification est sauvegardée

1. Le bouton **"💾 Enregistrer"** dans la barre d'outils s'active s'il y a des modifications non synchronisées
2. Cliquez dessus pour confirmer la sauvegarde
3. Un message "Enregistré !" apparaît

### ⚠️ Important à savoir

Les modifications sont actuellement **sauvegardées localement** dans votre navigateur (localStorage).

**Cela signifie que :**
- ✅ Vos modifications restent même si vous fermez le navigateur
- ✅ Vous pouvez revenir plus tard et continuer vos modifications
- ⚠️ Les modifications sont **uniquement visibles sur votre ordinateur**
- ⚠️ Si vous changez d'ordinateur ou de navigateur, vous ne verrez pas vos modifications

**Pour déployer vos modifications en production** (les rendre visibles pour tout le monde), contactez votre développeur qui pourra :
- Mettre en place un système de sauvegarde sur serveur
- Ou exporter vos modifications et les intégrer au site

---

## 🎨 Les Fonctionnalités de la Barre d'Outils

Quand vous êtes en mode admin, une barre noire apparaît en haut de l'écran avec plusieurs boutons :

### 💾 Enregistrer
- Sauvegarde toutes vos modifications en cours
- S'active uniquement quand il y a des modifications

### 👁️ Aperçu
- Désactive temporairement le mode édition
- Permet de voir le site comme un visiteur le verrait
- Cliquez à nouveau pour réactiver le mode édition

### ❓ Aide
- Affiche des informations d'aide rapide

### 🚪 Déconnexion
- Vous déconnecte du mode admin
- Désactive le mode édition
- Vous ramène au site normal

---

## 📄 Modifier les Différentes Pages

Le CMS fonctionne sur **toutes les pages** de votre site :

1. **Page d'accueil** : `?admin`
2. **Prestations** : Allez sur `/prestations` puis ajoutez `?admin`
3. **Naturopathie** : Allez sur `/naturopathie` puis ajoutez `?admin`
4. **Massage assis** : Allez sur `/massage-assis` puis ajoutez `?admin`
5. **Contact** : Allez sur `/contact` puis ajoutez `?admin`

**Astuce** : Tant que vous êtes connectée en mode admin, le paramètre `?admin` reste actif quand vous naviguez entre les pages.

---

## 🔒 Sécurité

### Changer le mot de passe admin

Par défaut, le mot de passe est `admin123`. Pour le changer, contactez votre développeur qui modifiera le fichier de configuration.

**Vous pouvez aussi définir une variable d'environnement** :
- Créez un fichier `.env` à la racine du projet
- Ajoutez : `VITE_ADMIN_PASSWORD=votre-nouveau-mot-de-passe`

### Recommandations

- ✅ Ne partagez pas le mot de passe admin
- ✅ Déconnectez-vous après chaque session d'édition
- ✅ Utilisez un mot de passe fort (au moins 12 caractères)

---

## 🛠️ Dépannage

### Le mode admin ne s'affiche pas

1. ✅ Vérifiez que vous avez bien ajouté `?admin` à l'URL
2. ✅ Vérifiez que vous avez entré le bon mot de passe
3. ✅ Essayez de rafraîchir la page (F5)
4. ✅ Videz le cache du navigateur (Ctrl+Shift+Suppr)

### Les modifications ne se sauvent pas

1. ✅ Vérifiez que vous avez cliqué en dehors du texte après modification
2. ✅ Cliquez sur le bouton "💾 Enregistrer"
3. ✅ Ouvrez la console du navigateur (F12) pour voir les erreurs
4. ✅ Contactez votre développeur si le problème persiste

### Les images ne s'affichent pas

1. ✅ Vérifiez que l'URL de l'image est correcte
2. ✅ Vérifiez que l'image est accessible publiquement (pas de restriction)
3. ✅ Essayez avec une autre URL d'image
4. ✅ Vérifiez le format de l'image (JPG, PNG, WebP, SVG acceptés)

### J'ai fait une erreur, comment annuler ?

- **Pendant l'édition** : Appuyez sur **Échap** pour annuler
- **Après sauvegarde** : Contactez votre développeur pour restaurer une version précédente

---

## 📞 Support

Pour toute question ou problème :

1. **Consultez ce guide**
2. **Vérifiez la section Dépannage**
3. **Contactez votre développeur** pour :
   - Problèmes techniques
   - Demandes de nouvelles fonctionnalités
   - Mise en place de la sauvegarde serveur
   - Changement de mot de passe
   - Déploiement des modifications en production

---

## 🎉 Récapitulatif Rapide

1. ✅ Ajoutez `?admin` à l'URL
2. ✅ Connectez-vous avec le mot de passe
3. ✅ Cliquez sur les textes/images pour les modifier
4. ✅ Les modifications se sauvent automatiquement
5. ✅ Cliquez sur "💾 Enregistrer" pour confirmer
6. ✅ Déconnectez-vous quand vous avez terminé

**Votre CMS est prêt à l'emploi ! Vous pouvez maintenant gérer votre contenu en toute autonomie.** 🚀

---

*Date de création : Novembre 2025*
*Version du CMS : 1.0*
