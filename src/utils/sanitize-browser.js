import DOMPurify from 'dompurify';
DOMPurify.addHook('afterSanitizeAttributes',node=>{ if(node.tagName==='A') node.setAttribute('rel','noopener noreferrer'); });
export const cleanHTML = (html='') => DOMPurify.sanitize(String(html), {
  ALLOWED_TAGS:['p','br','strong','em','b','i','u','span','a','ul','ol','li','h2','h3','h4','blockquote'],
  ALLOWED_ATTR:['class','href','target','rel'], ALLOW_DATA_ATTR:false, ALLOW_ARIA_ATTR:false,
});
