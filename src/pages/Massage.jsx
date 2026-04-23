import React from 'react';
import SectionManager from '../components/admin/SectionManager';
import StaticDragonfly from '../common/StaticDragonfly';
import { initialSiteContent } from '../data/siteContent';

const Massage = () => {
  return (
    <div className="relative overflow-hidden">
      <StaticDragonfly type={2} className="absolute top-24 right-16 w-28 h-28 opacity-80 hidden lg:block" />
      <StaticDragonfly type={1} className="absolute bottom-1/3 left-16 w-24 h-24 opacity-75 hidden lg:block" />
      <SectionManager
        pageKey="massage"
        defaultSections={initialSiteContent.pages.massage || []}
      />
    </div>
  );
};

export default Massage;
