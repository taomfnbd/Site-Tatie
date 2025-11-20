import React from 'react';
import SectionManager from '../components/admin/SectionManager';
import StaticDragonfly from '../common/StaticDragonfly';
import { initialSiteContent } from '../data/siteContent';

const Contact = () => {
  return (
    <div className="py-20 relative overflow-hidden bg-stone-25">
      <StaticDragonfly type={2} className="absolute top-20 right-20 w-32 h-32 opacity-35 hidden lg:block" />
      <StaticDragonfly type={1} className="absolute bottom-32 left-20 w-28 h-28 opacity-30 hidden lg:block" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionManager 
          pageKey="contact" 
          defaultSections={initialSiteContent.pages.contact} 
        />
      </div>
    </div>
  );
};

export default Contact;
