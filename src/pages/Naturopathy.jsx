import React from 'react';
import SectionManager from '../components/admin/SectionManager';
import StaticDragonfly from '../common/StaticDragonfly';
import { initialSiteContent } from '../data/siteContent';

const Naturopathy = () => {
  return (
    <div className="relative overflow-hidden">
      <StaticDragonfly type={1} className="absolute top-24 right-16 w-28 h-28 opacity-80 hidden lg:block" />
      <StaticDragonfly type={2} className="absolute bottom-40 left-16 w-24 h-24 opacity-75 hidden lg:block" />
      <SectionManager
        pageKey="naturopathy"
        defaultSections={initialSiteContent.pages.naturopathy || []}
      />
    </div>
  );
};

export default Naturopathy;
