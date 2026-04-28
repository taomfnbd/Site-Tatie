import React from 'react';
import { FiAlertTriangle } from 'react-icons/fi';

const SafeIcon = ({ icon, ...props }) => {
  let IconComponent;
  try {
    IconComponent = icon;
  } catch (e) {
    IconComponent = null;
  }

  const a11yProps = { 'aria-hidden': 'true', focusable: 'false', ...props };
  return IconComponent
    ? React.createElement(IconComponent, a11yProps)
    : <FiAlertTriangle {...a11yProps} />;
};

export default SafeIcon;
