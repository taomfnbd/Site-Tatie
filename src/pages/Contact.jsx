import React, { useState } from 'react';
import { motion } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import StaticDragonfly from '../common/StaticDragonfly';
import EditableText from '../components/admin/EditableText';
import * as FiIcons from 'react-icons/fi';

const { FiMail, FiPhone, FiMapPin, FiInstagram, FiCalendar, FiSend, FiInfo, FiExternalLink, FiCopy, FiCheck, FiAlertCircle } = FiIcons;

const Contact = () => {
  const [content, setContent] = useState({
    hero: {
      title: 'Contact & <span class="text-[#95a58d]">Infos pratiques</span>',
      subtitle: 'Toutes les informations pour me contacter et organiser votre rendez-vous',
    },
    form: {
      title: 'Envoyez-moi un message',
    },
    directContact: {
      title: 'Contact direct',
      phoneLabel: 'Téléphone',
      phone: '07.81.66.09.29',
      addressLabel: 'Adresse',
      address: '729 route de Sarrians<br />84190 Vacqueyras',
    },
    booking: {
      title: 'Réservation en ligne',
      description: 'Prenez rendez-vous facilement en ligne grâce à Resalib, disponible 24h/24 pour votre confort.',
    },
    schedule: {
      title: 'Horaires',
    },
    payment: {
      title: 'Paiement',
      note: 'Le paiement par virement n\'est pas disponible pour l\'instant.',
    },
    info: {
      title: 'À savoir',
      cancellation: '<strong>Annulation :</strong> Merci de prévenir 24h à l\'avance en cas d\'empêchement.',
      delay: '<strong>Retard :</strong> Un retard peut réduire la durée de votre séance pour respecter les rendez-vous suivants.',
      firstVisit: '<strong>Première visite :</strong> Prévoyez 5 minutes supplémentaires pour l\'accueil et les formalités.',
    },
    instagram: {
      title: 'Suivez-moi sur Instagram',
      handle: '@lali_bellul',
      description: 'Retrouvez mes conseils bien-être, astuces naturopathie et actualités du cabinet',
    },
    location: {
      title: 'Localisation',
      address: '729 route de Sarrians, 84190 Vacqueyras',
    },
  });

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    consentData: false,
    consentPrivacy: false
  });

  const [formStatus, setFormStatus] = useState('idle'); // 'idle', 'sending', 'success', 'error'
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value });
  };

  // Solution 1: Netlify Forms (Recommandée pour ce projet)
  const handleSubmitNetlify = async (e) => {
    e.preventDefault();
    
    if (!formData.consentData || !formData.consentPrivacy) {
      setErrorMessage('Veuillez accepter les conditions avant d\'envoyer le message.');
      setFormStatus('error');
      return;
    }

    setFormStatus('sending');
    setErrorMessage('');

    try {
      const response = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
          'form-name': 'contact',
          'name': formData.name,
          'email': formData.email,
          'message': formData.message,
          'consent-data': formData.consentData,
          'consent-privacy': formData.consentPrivacy
        }).toString()
      });

      if (response.ok) {
        setFormStatus('success');
        setFormData({ name: '', email: '', message: '', consentData: false, consentPrivacy: false });
      } else {
        throw new Error('Erreur lors de l\'envoi');
      }
    } catch (error) {
      setFormStatus('error');
      setErrorMessage('Une erreur est survenue. Veuillez réessayer ou nous appeler directement.');
    }
  };

  // Solution 2: EmailJS (Alternative) - Commented out to fix build error
  /*
  const handleSubmitEmailJS = async (e) => {
    e.preventDefault();
    
    if (!formData.consentData || !formData.consentPrivacy) {
      setErrorMessage('Veuillez accepter les conditions avant d\'envoyer le message.');
      setFormStatus('error');
      return;
    }

    setFormStatus('sending');
    setErrorMessage('');

    try {
      // Nécessite l'installation d'EmailJS: npm install @emailjs/browser
      // Et la configuration sur emailjs.com
      const { emailjs } = await import('@emailjs/browser');
      
      await emailjs.send(
        'YOUR_SERVICE_ID', // À configurer
        'YOUR_TEMPLATE_ID', // À configurer
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
          to_email: 'contact@alais-tavernier.fr'
        },
        'YOUR_PUBLIC_KEY' // À configurer
      );

      setFormStatus('success');
      setFormData({ name: '', email: '', message: '', consentData: false, consentPrivacy: false });
    } catch (error) {
      setFormStatus('error');
      setErrorMessage('Une erreur est survenue. Veuillez réessayer ou nous appeler directement.');
    }
  };
  */

  // Solution 3: Mailto amélioré (Solution actuelle améliorée)
  const handleSubmitMailto = (e) => {
    e.preventDefault();
    
    if (!formData.consentData || !formData.consentPrivacy) {
      setErrorMessage('Veuillez accepter les conditions avant d\'envoyer le message.');
      setFormStatus('error');
      return;
    }

    const subject = `Contact depuis le site - ${formData.name}`;
    const body = `Nom: ${formData.name}
Email: ${formData.email}

Message:
${formData.message}

---
Consentements:
- Utilisation des données: ${formData.consentData ? 'Accepté' : 'Refusé'}
- Confidentialité: ${formData.consentPrivacy ? 'Accepté' : 'Refusé'}`;

    const mailtoLink = `mailto:contact@alais-tavernier.fr?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    
    // Essayer d'ouvrir le client email
    window.location.href = mailtoLink;
    
    // Afficher un message d'information
    setFormStatus('mailto-opened');
  };

  // Utiliser la solution Netlify Forms par défaut
  const handleSubmit = handleSubmitNetlify;

  const instagramWebUrl = 'https://www.instagram.com/lali_bellul/';
  const instagramAppUrl = 'instagram://user?username=lali_bellul';

  const copyInstagramUsername = async () => {
    try {
      await navigator.clipboard.writeText('@lali_bellul');
      alert('✅ Nom d\'utilisateur copié !\n\nRecherchez "@lali_bellul" dans Instagram');
    } catch (err) {
      const textArea = document.createElement('textarea');
      textArea.value = '@lali_bellul';
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      alert('✅ Nom d\'utilisateur copié !\n\nRecherchez "@lali_bellul" dans Instagram');
    }
  };

  const handleInstagramClick = async (e) => {
    e.preventDefault();
    try {
      const newWindow = window.open(instagramWebUrl, '_blank', 'noopener,noreferrer');
      setTimeout(() => {
        if (!newWindow || newWindow.closed) {
          showInstagramAlternatives();
        }
      }, 1000);
    } catch (error) {
      showInstagramAlternatives();
    }
  };

  const showInstagramAlternatives = () => {
    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4';
    modal.innerHTML = `
      <div class="bg-white rounded-2xl p-6 max-w-md w-full">
        <div class="text-center mb-6">
          <div class="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg class="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </svg>
          </div>
          <h3 class="text-xl font-bold text-gray-800 mb-2">Suivez-moi sur Instagram</h3>
          <p class="text-gray-600 text-sm">Essayons une autre méthode</p>
        </div>
        <div class="space-y-4">
          <div class="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-4 border border-purple-100">
            <p class="font-semibold text-gray-800 mb-2">@lali_bellul</p>
            <p class="text-sm text-gray-600 mb-3">Retrouvez mes conseils bien-être et actualités</p>
            <div class="space-y-2">
              <button onclick="copyUsername()" class="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:from-purple-600 hover:to-pink-600 transition-all">
                📋 Copier le nom d'utilisateur
              </button>
              <button onclick="tryInstagramApp()" class="w-full border border-purple-300 text-purple-600 px-4 py-2 rounded-lg text-sm font-medium hover:bg-purple-50 transition-all">
                📱 Ouvrir l'app Instagram
              </button>
              <a href="${instagramWebUrl}" target="_blank" class="block w-full bg-gray-100 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-200 transition-all text-center">
                🌐 Lien direct profil
              </a>
            </div>
          </div>
          <div class="text-xs text-gray-500 space-y-1 bg-gray-50 p-3 rounded-lg">
            <p><strong>Instructions manuelles :</strong></p>
            <p>1. Ouvrez l'application Instagram</p>
            <p>2. Tapez <strong>"lali_bellul"</strong> dans la recherche</p>
            <p>3. Ou recherchez <strong>"Alaïs Tavernier"</strong></p>
          </div>
          <button onclick="closeModal()" class="w-full bg-gray-200 text-gray-700 py-2 rounded-lg font-medium hover:bg-gray-300 transition-colors">
            Fermer
          </button>
        </div>
      </div>
    `;

    window.copyUsername = copyInstagramUsername;
    window.tryInstagramApp = () => {
      window.location.href = instagramAppUrl;
      setTimeout(() => {
        alert('💡 Si l\'app ne s\'ouvre pas :\n\n1. Ouvrez Instagram manuellement\n2. Recherchez "lali_bellul"\n3. Ou recherchez "Alaïs Tavernier"');
      }, 2000);
    };
    window.closeModal = () => {
      document.body.removeChild(modal);
    };

    document.body.appendChild(modal);
  };

  const schedule = [
    { day: 'Lundi', hours: '9h00 – 17h00', note: 'dernier RDV 17h' },
    { day: 'Mardi', hours: 'Fermé', note: '' },
    { day: 'Mercredi', hours: 'Fermé', note: '' },
    { day: 'Jeudi', hours: '9h00 – 17h00', note: 'dernier RDV 17h' },
    { day: 'Vendredi', hours: 'Fermé', note: '' },
    { day: 'Samedi', hours: '9h00 – 12h00', note: 'dernier RDV 12h' },
    { day: 'Dimanche', hours: 'Fermé', note: '' }
  ];

  const paymentMethods = [
    'Chèque',
    'Espèces',
    'Paiement via Resalib'
  ];

  return (
    <div className="py-20 relative overflow-hidden bg-stone-25">
      {/* Libellules décoratives statiques */}
      <StaticDragonfly type={2} className="absolute top-20 right-20 w-32 h-32 opacity-35 hidden lg:block" />
      <StaticDragonfly type={1} className="absolute bottom-32 left-20 w-28 h-28 opacity-30 hidden lg:block" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 relative"
        >
          {/* Libellule statique au-dessus du titre */}
          <StaticDragonfly type={1} className="absolute -top-8 left-1/2 transform -translate-x-1/2 w-24 h-24 opacity-60" />
          <h1 className="text-4xl lg:text-5xl font-light text-stone-800 mb-6 tracking-wide pt-8">
            <EditableText
              value={content.hero.title}
              onChange={(val) => setContent({ ...content, hero: { ...content.hero, title: val } })}
              element="span"
              allowHTML={true}
              className="inline"
            />
          </h1>
          <EditableText
            value={content.hero.subtitle}
            onChange={(val) => setContent({ ...content, hero: { ...content.hero, subtitle: val } })}
            element="p"
            className="text-lg text-stone-600 max-w-2xl mx-auto font-light"
          />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-white rounded-2xl p-8 lg:p-10 shadow-sm relative overflow-hidden border border-stone-100"
          >
            <StaticDragonfly type={3} className="absolute top-6 right-6 w-12 h-12 opacity-50" />
            <EditableText
              value={content.form.title}
              onChange={(val) => setContent({ ...content, form: { ...content.form, title: val } })}
              element="h2"
              className="text-2xl font-medium text-stone-800 mb-8 tracking-wide"
            />

            {/* Messages de statut */}
            {formStatus === 'success' && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center space-x-3"
              >
                <SafeIcon icon={FiCheck} className="text-green-500 flex-shrink-0" />
                <span className="text-green-700 text-sm">
                  ✅ Message envoyé avec succès ! Je vous répondrai dans les plus brefs délais.
                </span>
              </motion.div>
            )}

            {formStatus === 'error' && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center space-x-3"
              >
                <SafeIcon icon={FiAlertCircle} className="text-red-500 flex-shrink-0" />
                <span className="text-red-700 text-sm">{errorMessage}</span>
              </motion.div>
            )}

            {formStatus === 'mailto-opened' && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg"
              >
                <div className="flex items-start space-x-3">
                  <SafeIcon icon={FiInfo} className="text-blue-500 flex-shrink-0 mt-0.5" />
                  <div className="text-blue-700 text-sm">
                    <p className="font-medium mb-1">Votre client email s'est ouvert</p>
                    <p>Vérifiez votre application email (Outlook, Mail, etc.) et envoyez le message.</p>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Formulaire avec attribut netlify */}
            <form 
              name="contact"
              method="POST"
              data-netlify="true"
              data-netlify-honeypot="bot-field"
              onSubmit={handleSubmit} 
              className="space-y-6"
            >
              {/* Champ caché pour Netlify */}
              <input type="hidden" name="form-name" value="contact" />
              <input type="hidden" name="bot-field" />

              <div>
                <label htmlFor="name" className="block text-sm font-medium text-stone-700 mb-2">Nom *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-[#95a58d] focus:border-transparent transition-colors font-light"
                  placeholder="Votre nom"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-stone-700 mb-2">Email *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-[#95a58d] focus:border-transparent transition-colors font-light"
                  placeholder="votre@email.com"
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-stone-700 mb-2">Message *</label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows="6"
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-[#95a58d] focus:border-transparent transition-colors resize-none font-light"
                  placeholder="Votre message..."
                ></textarea>
              </div>
              
              <div className="space-y-4 p-4 bg-stone-50 rounded-lg border border-stone-100">
                <label className="flex items-start space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    name="consentData"
                    checked={formData.consentData}
                    onChange={handleChange}
                    className="mt-1 w-4 h-4 text-[#95a58d] border-stone-300 rounded focus:ring-[#95a58d]"
                  />
                  <span className="text-sm text-stone-700 font-light">J'accepte l'utilisation de mes données dans le cadre de ce contact. *</span>
                </label>
                <label className="flex items-start space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    name="consentPrivacy"
                    checked={formData.consentPrivacy}
                    onChange={handleChange}
                    className="mt-1 w-4 h-4 text-[#95a58d] border-stone-300 rounded focus:ring-[#95a58d]"
                  />
                  <span className="text-sm text-stone-700 font-light">J'ai bien pris connaissance du principe de confidentialité. *</span>
                </label>
              </div>
              
              <button
                type="submit"
                disabled={formStatus === 'sending'}
                className="w-full bg-[#95a58d] text-white px-8 py-3 rounded-lg font-medium hover:bg-[#7a8471] transition-all duration-300 shadow-sm hover:shadow-md flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {formStatus === 'sending' ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    <span>Envoi en cours...</span>
                  </>
                ) : (
                  <>
                    <SafeIcon icon={FiSend} />
                    <span>Envoyer le message</span>
                  </>
                )}
              </button>
            </form>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            <div className="bg-gradient-to-br from-[#95a58d] to-[#7a8471] rounded-2xl p-8 text-white relative overflow-hidden">
              <StaticDragonfly type={1} className="absolute bottom-6 right-6 w-16 h-16 opacity-30 filter brightness-0 invert" />
              <EditableText
                value={content.directContact.title}
                onChange={(val) => setContent({ ...content, directContact: { ...content.directContact, title: val } })}
                element="h2"
                className="text-2xl font-medium mb-8 tracking-wide"
              />
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <SafeIcon icon={FiPhone} className="text-2xl text-white" />
                  <div>
                    <EditableText
                      value={content.directContact.phoneLabel}
                      onChange={(val) => setContent({ ...content, directContact: { ...content.directContact, phoneLabel: val } })}
                      element="p"
                      className="text-green-100 text-sm font-light"
                    />
                    <a href="tel:0781660929" className="text-lg font-medium hover:text-green-100 transition-colors">
                      <EditableText
                        value={content.directContact.phone}
                        onChange={(val) => setContent({ ...content, directContact: { ...content.directContact, phone: val } })}
                        element="span"
                        className="inline"
                      />
                    </a>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <SafeIcon icon={FiMapPin} className="text-2xl text-white" />
                  <div>
                    <EditableText
                      value={content.directContact.addressLabel}
                      onChange={(val) => setContent({ ...content, directContact: { ...content.directContact, addressLabel: val } })}
                      element="p"
                      className="text-green-100 text-sm font-light"
                    />
                    <EditableText
                      value={content.directContact.address}
                      onChange={(val) => setContent({ ...content, directContact: { ...content.directContact, address: val } })}
                      element="p"
                      allowHTML={true}
                      className="text-base font-light"
                    />
                  </div>
                </div>
              </div>
              <div className="mt-8 pt-8 border-t border-white/20">
                <a
                  href="tel:0781660929"
                  className="w-full bg-white text-[#95a58d] py-3 rounded-lg font-medium hover:bg-stone-100 transition-colors flex items-center justify-center space-x-2"
                >
                  <SafeIcon icon={FiPhone} />
                  <span>Appeler maintenant</span>
                </a>
              </div>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-sm relative overflow-hidden border border-stone-100">
              <div className="flex items-center space-x-4 mb-6">
                <SafeIcon icon={FiCalendar} className="text-2xl text-[#95a58d]" />
                <EditableText
                  value={content.booking.title}
                  onChange={(val) => setContent({ ...content, booking: { ...content.booking, title: val } })}
                  element="h3"
                  className="text-xl font-medium text-stone-800 tracking-wide"
                />
              </div>
              <EditableText
                value={content.booking.description}
                onChange={(val) => setContent({ ...content, booking: { ...content.booking, description: val } })}
                element="p"
                className="text-stone-600 mb-6 font-light"
              />
              <a
                href="https://www.resalib.fr/praticien/115675-alais-tavernier-naturopathe-vacqueyras"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-[#95a58d] text-white py-3 rounded-lg font-medium hover:bg-[#7a8471] transition-colors flex items-center justify-center space-x-2"
              >
                <SafeIcon icon={FiCalendar} />
                <span>Réserver sur Resalib</span>
              </a>
            </div>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-xl p-8 shadow-sm relative overflow-hidden border border-stone-100"
          >
            <EditableText
              value={content.schedule.title}
              onChange={(val) => setContent({ ...content, schedule: { ...content.schedule, title: val } })}
              element="h3"
              className="text-xl font-medium text-stone-800 mb-6 tracking-wide"
            />
            <div className="space-y-3">
              {schedule.map((item, index) => (
                <div
                  key={index}
                  className={`flex justify-between items-center p-3 rounded-lg ${
                    item.hours === 'Fermé'
                      ? 'bg-stone-50 text-stone-500'
                      : 'bg-green-50 text-stone-700'
                  }`}
                >
                  <span className="font-medium text-sm">{item.day}</span>
                  <div className="text-right">
                    <div className="font-medium text-sm">{item.hours}</div>
                    {item.note && <div className="text-xs text-stone-500 font-light">({item.note})</div>}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-white rounded-xl p-8 shadow-sm relative overflow-hidden border border-stone-100"
          >
            <EditableText
              value={content.payment.title}
              onChange={(val) => setContent({ ...content, payment: { ...content.payment, title: val } })}
              element="h3"
              className="text-xl font-medium text-stone-800 mb-6 tracking-wide"
            />
            <div className="grid grid-cols-1 gap-3">
              {paymentMethods.map((method, index) => (
                <div key={index} className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                  <div className="w-1.5 h-1.5 bg-[#95a58d] rounded-full"></div>
                  <span className="text-stone-700 font-light text-sm">{method}</span>
                </div>
              ))}
            </div>
            <EditableText
              value={content.payment.note}
              onChange={(val) => setContent({ ...content, payment: { ...content.payment, note: val } })}
              element="p"
              className="text-xs text-stone-500 mt-4 italic font-light"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-amber-50 border border-amber-200 rounded-xl p-8 relative overflow-hidden"
          >
            <div className="flex items-center space-x-4 mb-6">
              <SafeIcon icon={FiInfo} className="text-2xl text-amber-500" />
              <EditableText
                value={content.info.title}
                onChange={(val) => setContent({ ...content, info: { ...content.info, title: val } })}
                element="h3"
                className="text-xl font-medium text-stone-800 tracking-wide"
              />
            </div>
            <div className="space-y-4 text-stone-700 text-sm font-light">
              <EditableText
                value={content.info.cancellation}
                onChange={(val) => setContent({ ...content, info: { ...content.info, cancellation: val } })}
                element="p"
                allowHTML={true}
                className="inline"
              />
              <EditableText
                value={content.info.delay}
                onChange={(val) => setContent({ ...content, info: { ...content.info, delay: val } })}
                element="p"
                allowHTML={true}
                className="inline"
              />
              <EditableText
                value={content.info.firstVisit}
                onChange={(val) => setContent({ ...content, info: { ...content.info, firstVisit: val } })}
                element="p"
                allowHTML={true}
                className="inline"
              />
            </div>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-xl p-8 shadow-sm relative overflow-hidden border border-stone-100"
          >
            <EditableText
              value={content.instagram.title}
              onChange={(val) => setContent({ ...content, instagram: { ...content.instagram, title: val } })}
              element="h3"
              className="text-xl font-medium text-stone-800 mb-6 tracking-wide"
            />
            <div className="space-y-4">
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-100">
                <div className="flex items-center space-x-3 mb-3">
                  <SafeIcon icon={FiInstagram} className="text-xl text-purple-600" />
                  <EditableText
                    value={content.instagram.handle}
                    onChange={(val) => setContent({ ...content, instagram: { ...content.instagram, handle: val } })}
                    element="span"
                    className="text-base font-medium text-stone-800"
                  />
                </div>
                <EditableText
                  value={content.instagram.description}
                  onChange={(val) => setContent({ ...content, instagram: { ...content.instagram, description: val } })}
                  element="p"
                  className="text-stone-600 text-sm mb-4 font-light"
                />
                <div className="space-y-3">
                  <button
                    onClick={handleInstagramClick}
                    className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-2.5 rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-300 font-medium flex items-center justify-center space-x-2 text-sm"
                  >
                    <SafeIcon icon={FiExternalLink} />
                    <span>Visiter mon Instagram</span>
                  </button>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-gradient-to-br from-green-25 to-stone-25 rounded-xl p-8 text-center relative overflow-hidden border border-stone-100"
          >
            <EditableText
              value={content.location.title}
              onChange={(val) => setContent({ ...content, location: { ...content.location, title: val } })}
              element="h3"
              className="text-xl font-medium text-stone-800 mb-4 tracking-wide"
            />
            <EditableText
              value={content.location.address}
              onChange={(val) => setContent({ ...content, location: { ...content.location, address: val } })}
              element="p"
              className="text-stone-600 mb-6 font-light"
            />
            <a
              href="https://maps.google.com/?q=729+route+de+Sarrians,+84190+Vacqueyras"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 bg-[#95a58d] text-white px-6 py-3 rounded-lg hover:bg-[#7a8471] transition-colors"
            >
              <SafeIcon icon={FiMapPin} />
              <span>Voir sur Google Maps</span>
            </a>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Contact;