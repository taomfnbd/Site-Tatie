import React from 'react';
import SectionManager from '../components/admin/SectionManager';
import { initialSiteContent } from '../data/siteContent';

const Contact = () => {
  return (
    <SectionManager
      pageKey="contact"
      defaultSections={initialSiteContent.pages.contact || []}
    />
  );
};

export default Contact;
