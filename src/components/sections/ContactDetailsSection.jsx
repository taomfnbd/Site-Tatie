import React from 'react';
import { motion } from 'framer-motion';
import StaticDragonfly from '../../common/StaticDragonfly';
import EditableText from '../admin/EditableText';
import SafeIcon from '../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiPhone, FiMapPin, FiCalendar, FiInfo, FiInstagram, FiExternalLink } = FiIcons;

const ContactDetailsSection = ({ content, onUpdate }) => {
  const data = {
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
      days: [
        { day: 'Lundi', hours: '9h00 – 17h00', note: 'dernier RDV 17h' },
        { day: 'Mardi', hours: 'Fermé', note: '' },
        { day: 'Mercredi', hours: 'Fermé', note: '' },
        { day: 'Jeudi', hours: '9h00 – 17h00', note: 'dernier RDV 17h' },
        { day: 'Vendredi', hours: 'Fermé', note: '' },
        { day: 'Samedi', hours: '9h00 – 12h00', note: 'dernier RDV 12h' },
        { day: 'Dimanche', hours: 'Fermé', note: '' }
      ]
    },
    payment: {
      title: 'Paiement',
      methods: [
        'Chèque',
        'Espèces',
        'Paiement via Resalib'
      ],
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
    ...content
  };

  const updateField = (path, value) => {
    // Helper pour nested update
    const newData = JSON.parse(JSON.stringify(data));
    const parts = path.split('.');
    let current = newData;
    for (let i = 0; i < parts.length - 1; i++) {
      current = current[parts[i]];
    }
    current[parts[parts.length - 1]] = value;
    onUpdate(newData);
  };

  const instagramWebUrl = 'https://www.instagram.com/lali_bellul/';

  return (
    <div className="space-y-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
         {/* Colonne Gauche (Contact + Résa) est gérée par ContactFormSection ou ici ? */}
         {/* Ah, le layout original mettait Form à gauche et (Contact+Résa) à droite */}
         {/* Comme j'ai séparé Form, ici je vais afficher Contact+Résa en premier, puis le reste */}
         
         {/* Contact Direct */}
         <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-8 lg:col-span-2" // Pleine largeur si pas de form à côté
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-[#95a58d] to-[#7a8471] rounded-2xl p-8 text-white relative overflow-hidden">
              <StaticDragonfly type={1} className="absolute bottom-6 right-6 w-16 h-16 opacity-30 filter brightness-0 invert" />
              <EditableText
                value={data.directContact.title}
                onChange={(val) => updateField('directContact.title', val)}
                element="h2"
                className="text-2xl font-medium mb-8 tracking-wide"
              />
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <SafeIcon icon={FiPhone} className="text-2xl text-white" />
                  <div>
                    <EditableText
                      value={data.directContact.phoneLabel}
                      onChange={(val) => updateField('directContact.phoneLabel', val)}
                      element="p"
                      className="text-green-100 text-sm font-light"
                    />
                    <a href="tel:0781660929" className="text-lg font-medium hover:text-green-100 transition-colors">
                      <EditableText
                        value={data.directContact.phone}
                        onChange={(val) => updateField('directContact.phone', val)}
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
                      value={data.directContact.addressLabel}
                      onChange={(val) => updateField('directContact.addressLabel', val)}
                      element="p"
                      className="text-green-100 text-sm font-light"
                    />
                    <EditableText
                      value={data.directContact.address}
                      onChange={(val) => updateField('directContact.address', val)}
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
                  value={data.booking.title}
                  onChange={(val) => updateField('booking.title', val)}
                  element="h3"
                  className="text-xl font-medium text-stone-800 tracking-wide"
                />
              </div>
              <EditableText
                value={data.booking.description}
                onChange={(val) => updateField('booking.description', val)}
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
            </div>
          </motion.div>
      </div>

      {/* Ligne 2: Horaires, Paiement, Infos */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-xl p-8 shadow-sm relative overflow-hidden border border-stone-100"
          >
            <EditableText
              value={data.schedule.title}
              onChange={(val) => updateField('schedule.title', val)}
              element="h3"
              className="text-xl font-medium text-stone-800 mb-6 tracking-wide"
            />
            <div className="space-y-3">
              {data.schedule.days.map((item, index) => (
                <div
                  key={index}
                  className={`flex justify-between items-center p-3 rounded-lg ${
                    item.hours === 'Fermé'
                      ? 'bg-stone-50 text-stone-500'
                      : 'bg-green-50 text-stone-700'
                  }`}
                >
                  <span className="font-medium text-sm">
                     <EditableText 
                      value={item.day} 
                      onChange={(val) => {
                        const newDays = [...data.schedule.days];
                        newDays[index] = { ...item, day: val };
                        updateField('schedule.days', newDays);
                      }}
                      element="span"
                     />
                  </span>
                  <div className="text-right">
                    <div className="font-medium text-sm">
                       <EditableText 
                        value={item.hours} 
                        onChange={(val) => {
                          const newDays = [...data.schedule.days];
                          newDays[index] = { ...item, hours: val };
                          updateField('schedule.days', newDays);
                        }}
                        element="span"
                       />
                    </div>
                    <div className="text-xs text-stone-500 font-light">
                        <EditableText 
                        value={item.note} 
                        onChange={(val) => {
                          const newDays = [...data.schedule.days];
                          newDays[index] = { ...item, note: val };
                          updateField('schedule.days', newDays);
                        }}
                        element="span"
                       />
                    </div>
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
              value={data.payment.title}
              onChange={(val) => updateField('payment.title', val)}
              element="h3"
              className="text-xl font-medium text-stone-800 mb-6 tracking-wide"
            />
            <div className="grid grid-cols-1 gap-3">
              {data.payment.methods.map((method, index) => (
                <div key={index} className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                  <div className="w-1.5 h-1.5 bg-[#95a58d] rounded-full"></div>
                  <span className="text-stone-700 font-light text-sm">
                    <EditableText 
                      value={method} 
                      onChange={(val) => {
                        const newMethods = [...data.payment.methods];
                        newMethods[index] = val;
                        updateField('payment.methods', newMethods);
                      }}
                      element="span"
                    />
                  </span>
                </div>
              ))}
            </div>
            <EditableText
              value={data.payment.note}
              onChange={(val) => updateField('payment.note', val)}
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
                value={data.info.title}
                onChange={(val) => updateField('info.title', val)}
                element="h3"
                className="text-xl font-medium text-stone-800 tracking-wide"
              />
            </div>
            <div className="space-y-4 text-stone-700 text-sm font-light">
              <EditableText
                value={data.info.cancellation}
                onChange={(val) => updateField('info.cancellation', val)}
                element="p"
                allowHTML={true}
              />
              <EditableText
                value={data.info.delay}
                onChange={(val) => updateField('info.delay', val)}
                element="p"
                allowHTML={true}
              />
              <EditableText
                value={data.info.firstVisit}
                onChange={(val) => updateField('info.firstVisit', val)}
                element="p"
                allowHTML={true}
              />
            </div>
          </motion.div>
        </div>

        {/* Ligne 3: Instagram + Map */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-xl p-8 shadow-sm relative overflow-hidden border border-stone-100"
          >
            <EditableText
              value={data.instagram.title}
              onChange={(val) => updateField('instagram.title', val)}
              element="h3"
              className="text-xl font-medium text-stone-800 mb-6 tracking-wide"
            />
            <div className="space-y-4">
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-100">
                <div className="flex items-center space-x-3 mb-3">
                  <SafeIcon icon={FiInstagram} className="text-xl text-purple-600" />
                  <EditableText
                    value={data.instagram.handle}
                    onChange={(val) => updateField('instagram.handle', val)}
                    element="span"
                    className="text-base font-medium text-stone-800"
                  />
                </div>
                <EditableText
                  value={data.instagram.description}
                  onChange={(val) => updateField('instagram.description', val)}
                  element="p"
                  className="text-stone-600 text-sm mb-4 font-light"
                />
                <div className="space-y-3">
                  <a
                    href={instagramWebUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-2.5 rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-300 font-medium flex items-center justify-center space-x-2 text-sm"
                  >
                    <SafeIcon icon={FiExternalLink} />
                    <span>Visiter mon Instagram</span>
                  </a>
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
              value={data.location.title}
              onChange={(val) => updateField('location.title', val)}
              element="h3"
              className="text-xl font-medium text-stone-800 mb-4 tracking-wide"
            />
            <EditableText
              value={data.location.address}
              onChange={(val) => updateField('location.address', val)}
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
  );
};

export default ContactDetailsSection;
