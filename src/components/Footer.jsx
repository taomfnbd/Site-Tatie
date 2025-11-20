import React, { useEffect } from 'react';
import {Link} from 'react-router-dom';
import SafeIcon from '../common/SafeIcon';
import DragonflyImage from '../common/DragonflyImage';
import EditableText from './admin/EditableText';
import { useContent } from '../contexts/ContentContext';
import * as FiIcons from 'react-icons/fi';

const {FiPhone, FiMail, FiMapPin, FiInstagram, FiCalendar} = FiIcons;

const Footer = () => {
  const { globalContent, updateGlobalContent } = useContent();
  
  // Données par défaut
  const defaultFooterData = {
    brand: {
      name: 'Alaïs Tavernier',
      role: 'Naturopathe',
      description: 'Éducatrice de la santé, je vous accompagne pour devenir autonome et acteur de votre bien-être.'
    },
    contact: {
      phone: '07.81.66.09.29',
      address: '729 route de Sarrians<br />84190 Vacqueyras',
      bookingText: 'Réserver en ligne'
    },
    hours: {
      line1: '<span class="font-medium">Lundi & Jeudi:</span> 9h-17h',
      line2: '<span class="font-medium">Samedi:</span> 9h-12h',
      line3: 'Autres jours: sur RDV'
    },
    social: {
      instagram: 'lali_bellul'
    },
    legal: {
      copyright: '© 2026 Alaïs Tavernier - Naturopathe. Tous droits réservés.'
    }
  };

  // Initialiser ou récupérer les données
  const footerData = globalContent.footer || defaultFooterData;

  // Mettre à jour si c'est la première fois (pour avoir les données dans le context)
  useEffect(() => {
    if (!globalContent.footer) {
      updateGlobalContent('footer', defaultFooterData);
    }
  }, []);

  const updateField = (path, value) => {
    const newData = JSON.parse(JSON.stringify(footerData));
    
    // Helper simple pour path nested (ex: "brand.name")
    const parts = path.split('.');
    let current = newData;
    for (let i = 0; i < parts.length - 1; i++) {
      current = current[parts[i]];
    }
    current[parts[parts.length - 1]] = value;
    
    updateGlobalContent('footer', newData);
  };

  const instagramWebUrl = `https://www.instagram.com/${footerData.social.instagram}/`;
  const instagramAppUrl = `instagram://user?username=${footerData.social.instagram}`;

  const handleInstagramClick = (e) => {
    e.preventDefault();
    if (/Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
      window.location.href = instagramAppUrl;
      setTimeout(() => {
        window.open(instagramWebUrl, '_blank', 'noopener,noreferrer');
      }, 2000);
    } else {
      try {
        window.open(instagramWebUrl, '_blank', 'noopener,noreferrer');
      } catch (error) {
        if (confirm(`Voulez-vous copier le nom d'utilisateur Instagram ?\n\nRecherchez ensuite "@${footerData.social.instagram}" dans Instagram.`)) {
          if (navigator.clipboard) {
            navigator.clipboard.writeText(`@${footerData.social.instagram}`).then(() => {
              alert(`✅ Copié ! Recherchez "@${footerData.social.instagram}" dans Instagram`);
            });
          }
        }
      }
    }
  };

  return (
    <footer className="bg-black text-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {/* Brand */}
          <div className="space-y-4 text-center sm:text-left">
            <div className="flex items-center justify-center sm:justify-start space-x-3">
              <div className="w-8 sm:w-10 h-8 sm:h-10 flex items-center justify-center">
                <DragonflyImage type={3} className="filter brightness-0 invert" />
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-semibold">
                  <EditableText value={footerData.brand.name} onChange={(v) => updateField('brand.name', v)} element="span" />
                </h3>
                <p className="text-[#95a58d] text-xs sm:text-sm font-medium">
                  <EditableText value={footerData.brand.role} onChange={(v) => updateField('brand.role', v)} element="span" />
                </p>
              </div>
            </div>
            <EditableText 
              value={footerData.brand.description} 
              onChange={(v) => updateField('brand.description', v)} 
              element="p" 
              className="text-gray-300 text-xs sm:text-sm leading-relaxed max-w-xs mx-auto sm:mx-0"
            />
          </div>

          {/* Navigation */}
          <div className="text-center sm:text-left">
            <h4 className="font-semibold mb-3 sm:mb-4 text-gray-200 text-sm sm:text-base">Navigation</h4>
            <ul className="space-y-1 sm:space-y-2">
              <li><Link to="/" className="text-gray-300 hover:text-[#95a58d] transition-colors text-xs sm:text-sm">Accueil</Link></li>
              <li><Link to="/prestations" className="text-gray-300 hover:text-[#95a58d] transition-colors text-xs sm:text-sm">Prestations</Link></li>
              <li><Link to="/naturopathie" className="text-gray-300 hover:text-[#95a58d] transition-colors text-xs sm:text-sm">Naturopathie</Link></li>
              <li><Link to="/massage-assis" className="text-gray-300 hover:text-[#95a58d] transition-colors text-xs sm:text-sm">Massage assis</Link></li>
              <li><Link to="/contact" className="text-gray-300 hover:text-[#95a58d] transition-colors text-xs sm:text-sm">Contact</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="text-center sm:text-left">
            <h4 className="font-semibold mb-3 sm:mb-4 text-gray-200 text-sm sm:text-base">Contact</h4>
            <ul className="space-y-2 sm:space-y-3">
              <li className="flex items-center justify-center sm:justify-start space-x-2 sm:space-x-3">
                <SafeIcon icon={FiPhone} className="text-[#95a58d] text-xs sm:text-sm flex-shrink-0" />
                <a href={`tel:${footerData.contact.phone.replace(/\./g, '')}`} className="text-gray-300 hover:text-white transition-colors text-xs sm:text-sm">
                  <EditableText value={footerData.contact.phone} onChange={(v) => updateField('contact.phone', v)} element="span" />
                </a>
              </li>
              <li className="flex items-start justify-center sm:justify-start space-x-2 sm:space-x-3">
                <SafeIcon icon={FiMapPin} className="text-[#95a58d] text-xs sm:text-sm mt-0.5 flex-shrink-0" />
                <EditableText 
                  value={footerData.contact.address} 
                  onChange={(v) => updateField('contact.address', v)} 
                  element="span" 
                  allowHTML={true}
                  className="text-gray-300 text-xs sm:text-sm leading-relaxed text-center sm:text-left"
                />
              </li>
              <li className="flex items-center justify-center sm:justify-start space-x-2 sm:space-x-3">
                <SafeIcon icon={FiCalendar} className="text-[#95a58d] text-xs sm:text-sm flex-shrink-0" />
                <a
                  href="https://www.resalib.fr/praticien/115675-alais-tavernier-naturopathe-vacqueyras"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-white transition-colors text-xs sm:text-sm"
                >
                  <EditableText value={footerData.contact.bookingText} onChange={(v) => updateField('contact.bookingText', v)} element="span" />
                </a>
              </li>
            </ul>
          </div>

          {/* Horaires & Social */}
          <div className="text-center sm:text-left">
            <h4 className="font-semibold mb-3 sm:mb-4 text-gray-200 text-sm sm:text-base">Horaires</h4>
            <div className="space-y-1 text-xs sm:text-sm text-gray-300 mb-4 sm:mb-6">
              <EditableText 
                value={footerData.hours.line1} 
                onChange={(v) => updateField('hours.line1', v)} 
                element="p" 
                allowHTML={true}
              />
              <EditableText 
                value={footerData.hours.line2} 
                onChange={(v) => updateField('hours.line2', v)} 
                element="p" 
                allowHTML={true}
              />
              <EditableText 
                value={footerData.hours.line3} 
                onChange={(v) => updateField('hours.line3', v)} 
                element="p" 
                allowHTML={true} 
                className="text-gray-400 text-xs"
              />
            </div>
            <div>
              <h4 className="font-semibold mb-2 sm:mb-3 text-gray-200 text-sm sm:text-base">Suivez-moi</h4>
              <div className="flex justify-center sm:justify-start">
                <button
                  onClick={handleInstagramClick}
                  className="w-8 sm:w-9 h-8 sm:h-9 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-500 transition-all duration-300 cursor-pointer group"
                  title={`Instagram @${footerData.social.instagram}`}
                >
                  <SafeIcon icon={FiInstagram} className="text-xs sm:text-sm group-hover:scale-110 transition-transform" />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-6 sm:mt-8 pt-4 sm:pt-6 text-center">
          <EditableText 
            value={footerData.legal.copyright} 
            onChange={(v) => updateField('legal.copyright', v)} 
            element="p" 
            style={{color: 'rgb(156,163,175)'}} 
            className="text-gray-400 text-xs sm:text-sm"
          />
          <div className="mt-2 text-xs sm:text-sm text-gray-400 space-x-2 sm:space-x-4">
            <Link to="/mentions-legales" className="hover:text-white transition-colors">Mentions Légales</Link>
            <span>•</span>
            <Link to="/cgu" className="hover:text-white transition-colors">CGU</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
