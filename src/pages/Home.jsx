import React from 'react';
import SectionManager from '../components/admin/SectionManager';
import { initialSiteContent } from '../data/siteContent';

const Home = () => {
  return (
    <SectionManager
      pageKey="home"
      defaultSections={initialSiteContent.pages.home || []}
    />
  );
};

export default Home;
