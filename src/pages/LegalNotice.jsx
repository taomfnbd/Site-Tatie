import React from 'react';
import SectionManager from '../components/admin/SectionManager';
import { initialSiteContent } from '../data/siteContent';

const LegalNotice = () => {
  return (
    <SectionManager 
      pageKey="legal-notice" 
      defaultSections={initialSiteContent.pages['legal-notice'] || []} 
    />
  );
};

export default LegalNotice;
