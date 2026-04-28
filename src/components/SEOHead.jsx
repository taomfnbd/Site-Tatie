import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { updatePageSEO, getStructuredData, seoConfig } from '../utils/seo';

const SEOHead = () => {
  const location = useLocation();

  useEffect(() => {
    const pageConfig = seoConfig[location.pathname] || seoConfig['/'];
    updatePageSEO(pageConfig);

    let structuredDataScript = document.getElementById('structured-data');

    if (!structuredDataScript) {
      structuredDataScript = document.createElement('script');
      structuredDataScript.id = 'structured-data';
      structuredDataScript.type = 'application/ld+json';
      document.head.appendChild(structuredDataScript);
    }

    structuredDataScript.textContent = JSON.stringify(getStructuredData(location.pathname));
  }, [location.pathname]);

  return null; // Ce composant ne rend rien visuellement
};

export default SEOHead;
