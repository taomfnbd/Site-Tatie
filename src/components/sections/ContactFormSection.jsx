import React, { useState } from 'react';
import { motion } from 'framer-motion';
import StaticDragonfly from '../../common/StaticDragonfly';
import EditableText from '../admin/EditableText';
import SafeIcon from '../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiCheck, FiAlertCircle, FiInfo, FiSend } = FiIcons;

const ContactFormSection = ({ content, onUpdate }) => {
  const data = {
    title: 'Envoyez-moi un message',
    ...content
  };

  const updateField = (field, value) => {
    onUpdate({ ...data, [field]: value });
  };

  // Form state (non persisté dans le CMS, c'est pour l'utilisateur final)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    consentData: false,
    consentPrivacy: false
  });

  const [formStatus, setFormStatus] = useState('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value });
  };

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
          'consentData': formData.consentData.toString(),
          'consentPrivacy': formData.consentPrivacy.toString()
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

  const handleSubmit = handleSubmitNetlify;

  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8 }}
      className="bg-white rounded-2xl p-8 lg:p-10 shadow-sm relative overflow-hidden border border-stone-100 mb-8"
    >
      <StaticDragonfly type={3} className="absolute top-6 right-6 w-12 h-12 opacity-50" />
      <EditableText
        value={data.title}
        onChange={(val) => updateField('title', val)}
        element="h2"
        className="text-2xl font-medium text-stone-800 mb-8 tracking-wide"
      />

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

      <form 
        name="contact"
        method="POST"
        data-netlify="true"
        data-netlify-honeypot="bot-field"
        onSubmit={handleSubmit} 
        className="space-y-6"
      >
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
  );
};

export default ContactFormSection;
