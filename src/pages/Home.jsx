import React from 'react';
import SectionManager from '../components/admin/SectionManager';
import { initialSiteContent } from '../data/siteContent';

const Home = () => {
  return (
    <div className="relative overflow-hidden">
      <SectionManager 
        pageKey="home" 
        defaultSections={initialSiteContent.pages.home} 
      />
    </div>
  );
};

export default Home;
