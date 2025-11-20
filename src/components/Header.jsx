import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import DragonflyImage from '../common/DragonflyImage';
import EditableText from './admin/EditableText';
import { useContent } from '../contexts/ContentContext';
import * as FiIcons from 'react-icons/fi';

const { FiMenu, FiX } = FiIcons;

const Header = () => {
  const { globalContent, updateGlobalContent } = useContent();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const defaultHeaderData = {
    brand: {
      name: 'Alaïs Tavernier',
      subtitle: 'Naturopathe'
    },
    links: [
      { name: 'Accueil', href: '/' },
      { name: 'Prestations', href: '/prestations' },
      { name: 'Naturopathie', href: '/naturopathie' },
      { name: 'Massage assis', href: '/massage-assis' },
      { name: 'Contact', href: '/contact' }
    ],
    cta: 'Prendre RDV'
  };

  // Initialiser ou récupérer les données
  const headerData = globalContent.header || defaultHeaderData;

  useEffect(() => {
    if (!globalContent.header) {
      updateGlobalContent('header', defaultHeaderData);
    }
  }, []);

  const updateField = (path, value) => {
    const newData = JSON.parse(JSON.stringify(headerData));
    const parts = path.split('.');
    let current = newData;
    for (let i = 0; i < parts.length - 1; i++) {
      current = current[parts[i]];
    }
    current[parts[parts.length - 1]] = value;
    updateGlobalContent('header', newData);
  };

  const updateLinkName = (index, newName) => {
    const newLinks = [...headerData.links];
    newLinks[index].name = newName;
    updateField('links', newLinks);
  };

  const isActive = (href) => location.pathname === href;

  return (
    <header className="bg-white/90 backdrop-blur-lg shadow-sm sticky top-0 z-50 border-b border-stone-100">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 sm:h-18 lg:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 sm:space-x-3 group">
            <div className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
              <DragonflyImage type={3} alt="Logo Alaïs Tavernier - Libellule" />
            </div>
            <div className="hidden xs:block">
              <h1 className="text-sm sm:text-base lg:text-lg font-semibold text-stone-800 group-hover:text-[#95a58d] transition-colors flex items-center">
                <EditableText value={headerData.brand.name} onChange={(v) => updateField('brand.name', v)} element="span" />
              </h1>
              <p className="text-xs text-[#95a58d] -mt-1 font-medium">
                <EditableText value={headerData.brand.subtitle} onChange={(v) => updateField('brand.subtitle', v)} element="span" />
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-2 xl:space-x-4 2xl:space-x-6">
            {headerData.links.map((item, index) => (
              <Link
                key={index}
                to={item.href}
                className={`text-sm xl:text-base font-medium transition-all duration-200 py-2 px-2 xl:px-3 rounded-lg hover:bg-stone-50 flex items-center ${
                  isActive(item.href)
                    ? 'text-[#95a58d] bg-stone-50'
                    : 'text-stone-700 hover:text-[#95a58d]'
                }`}
              >
                <EditableText 
                  value={item.name} 
                  onChange={(v) => updateLinkName(index, v)} 
                  element="span"
                />
              </Link>
            ))}
          </div>

          {/* Right side buttons */}
          <div className="hidden lg:flex items-center space-x-3">
            <a
              href="https://www.resalib.fr/praticien/115675-alais-tavernier-naturopathe-vacqueyras"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#95a58d] text-white px-3 xl:px-5 py-2 xl:py-2.5 rounded-full text-xs xl:text-sm font-medium hover:bg-[#7a8471] transition-all duration-200 shadow-sm hover:shadow-md whitespace-nowrap flex items-center"
            >
              <EditableText value={headerData.cta} onChange={(v) => updateField('cta', v)} element="span" />
            </a>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 rounded-lg hover:bg-stone-100 transition-colors"
            aria-label="Menu de navigation"
          >
            <SafeIcon icon={isMenuOpen ? FiX : FiMenu} className="text-stone-700 text-xl" />
          </button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden overflow-hidden"
            >
              <div className="py-4 space-y-2 border-t border-stone-100">
                {headerData.links.map((item, index) => (
                  <Link
                    key={index}
                    to={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className={`block px-3 py-3 text-base font-medium transition-all duration-200 rounded-lg ${
                      isActive(item.href)
                        ? 'text-[#95a58d] bg-stone-50'
                        : 'text-stone-700 hover:text-[#95a58d] hover:bg-stone-50'
                    }`}
                  >
                    {item.name}
                  </Link>
                ))}

                <div className="pt-3 border-t border-stone-100">
                  <a
                    href="https://www.resalib.fr/praticien/115675-alais-tavernier-naturopathe-vacqueyras"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block bg-[#95a58d] text-white px-3 py-3 rounded-lg text-center font-medium hover:bg-[#7a8471] transition-colors duration-200"
                  >
                    {headerData.cta}
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
};

export default Header;
