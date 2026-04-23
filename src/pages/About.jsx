import React from 'react';
import SectionManager from '../components/admin/SectionManager';
import { initialSiteContent } from '../data/siteContent';

const About = () => {
  return (
    <SectionManager
      pageKey="about"
      defaultSections={initialSiteContent.pages.about || []}
    />
  );
};

export default About;
