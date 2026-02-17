import React from 'react';
import * as FiIcons from 'react-icons/fi';
import { FiAlertTriangle } from 'react-icons/fi';

const SafeIcon = ({ icon, name, ...props }) => {
  let IconComponent;
  try {
    IconComponent = icon || (name && FiIcons[`Fi${name}`]);
  } catch (e) {
    IconComponent = null;
  }

  const a11yProps = { 'aria-hidden': 'true', focusable: 'false', ...props };
  return IconComponent
    ? React.createElement(IconComponent, a11yProps)
    : <FiAlertTriangle {...a11yProps} />;
};

export default SafeIcon;