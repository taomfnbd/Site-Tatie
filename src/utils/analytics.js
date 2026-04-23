export const trackEvent = (eventName, properties = {}) => {
  if (typeof window.gtag !== 'undefined') {
    window.gtag('event', eventName, {
      ...properties,
      send_to: 'GA_MEASUREMENT_ID',
    });
  }

  console.log(`Event tracked: ${eventName}`, properties);
};

export const trackContactFormSubmission = (method = 'form') => {
  trackEvent('contact_form_submission', {
    method,
    page: window.location.pathname,
  });
};

export const trackAppointmentBooking = (service = 'unknown') => {
  trackEvent('appointment_booking', {
    service,
    page: window.location.pathname,
    external_link: 'resalib',
  });
};

export const trackPhoneCall = () => {
  trackEvent('phone_call', {
    page: window.location.pathname,
  });
};

export const trackInstagramClick = () => {
  trackEvent('social_media_click', {
    platform: 'instagram',
    page: window.location.pathname,
  });
};

export const trackPageView = (pageName) => {
  trackEvent('page_view', {
    page_title: document.title,
    page_location: window.location.href,
    page_name: pageName,
  });
};
