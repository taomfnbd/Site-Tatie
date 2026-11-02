> Document historique : le CMS et le déploiement ont évolué le 2 novembre 2026. Consulter [README.md](README.md) pour le fonctionnement actuel.

# Configuration du Formulaire de Contact

## État actuel
Le formulaire est configuré pour utiliser **Netlify Forms**, une solution intégrée et gratuite.

## Solutions disponibles

### 1. 🟢 Netlify Forms (Actuelle - Recommandée)
**Avantages :**
- ✅ Gratuit (jusqu'à 100 soumissions/mois)
- ✅ Aucune configuration supplémentaire 
- ✅ Intégré à Netlify
- ✅ Notifications par email automatiques
- ✅ Interface de gestion des soumissions
- ✅ Protection anti-spam

**Configuration :**
- Le formulaire est déjà configuré
- Les emails arrivent directement dans la boîte Netlify
- Possibilité de redirection vers un email personnel

### 2. 🟡 EmailJS (Alternative)
**Avantages :**
- ✅ Envoi direct depuis le navigateur
- ✅ Templates personnalisables
- ✅ Gratuit (jusqu'à 200 emails/mois)

**Configuration requise :**
```bash
npm install @emailjs/browser
```
- Créer un compte sur emailjs.com
- Configurer les identifiants

### 3. 🔴 Mailto (Basique)
**Inconvénients :**
- ❌ Nécessite un client email installé
- ❌ Pas d'envoi automatique
- ❌ Mauvaise expérience utilisateur mobile

## Configuration Netlify Forms

### 1. Activation automatique
Le formulaire est déjà configuré avec :
```html
<form 
  name="contact"
  method="POST"
  data-netlify="true"
  data-netlify-honeypot="bot-field"
>
```

### 2. Accès aux soumissions
1. Aller sur le dashboard Netlify
2. Cliquer sur "Forms" dans le menu
3. Voir toutes les soumissions

### 3. Configuration des notifications email
1. Dans Netlify Dashboard → Site Settings → Forms
2. Aller à "Form notifications"  
3. Ajouter une notification email
4. Entrer l'email de destination : `contact@alais-tavernier.fr`

### 4. Template email personnalisé
```
Nouveau message depuis le site web

Nom: {{name}}
Email: {{email}}

Message:
{{message}}

Consentements:
- Données: {{consent-data}}
- Confidentialité: {{consent-privacy}}

Envoyé le: {{created_at}}
```

## Recommandations

### Pour ce projet :
1. **Utiliser Netlify Forms** (déjà configuré)
2. Configurer les notifications email vers `contact@alais-tavernier.fr`
3. Tester le formulaire après déploiement

### Alternatives si besoin :
- **EmailJS** pour plus de contrôle sur l'envoi
- **Service tiers** (Formspree, Getform) pour des besoins avancés

## Test du formulaire

### Après déploiement :
1. Aller sur `/contact`
2. Remplir et envoyer le formulaire  
3. Vérifier dans Netlify Dashboard → Forms
4. Configurer les notifications email si nécessaire

### Debug si problème :
- Vérifier que le site est déployé sur Netlify
- Vérifier les attributs `data-netlify="true"`
- Consulter les logs de déploiement Netlify