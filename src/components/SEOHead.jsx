import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useContent } from '../contexts/ContentContext';
import { updatePageSEO, getStructuredData, seoConfig } from '../utils/seo';

const SEOHead = () => {
  const location = useLocation();
  const path = location.pathname.replace(/\/+$/, "") || "/";
  const { globalContent, pagesContent } = useContent();

  useEffect(() => {
    const pageConfig = seoConfig[path] || seoConfig['/404'];
    updatePageSEO(pageConfig);

    let structuredDataScript = document.getElementById('structured-data');

    if (!structuredDataScript) {
      structuredDataScript = document.createElement('script');
      structuredDataScript.id = 'structured-data';
      structuredDataScript.type = 'application/ld+json';
      document.head.appendChild(structuredDataScript);
    }

    structuredDataScript.textContent = JSON.stringify(getStructuredData(path, { ...globalContent, pages: Object.fromEntries(Object.entries(pagesContent).map(([key,page]) => [key,page.sections])) }));
  }, [path, globalContent, pagesContent]);

  return null; // Ce composant ne rend rien visuellement
};

export default SEOHead;
