import sanitizeHtml from 'sanitize-html';
export const cleanHTML = (html = '') => sanitizeHtml(String(html), {
  allowedTags: ['p', 'br', 'strong', 'em', 'b', 'i', 'u', 'span', 'a', 'ul', 'ol', 'li', 'h2', 'h3', 'h4', 'blockquote'],
  allowedAttributes: { '*': ['class'], a: ['href', 'target', 'rel'] },
  allowedSchemes: ['https', 'http', 'mailto', 'tel'],
  allowProtocolRelative: false,
  transformTags: { a: sanitizeHtml.simpleTransform('a', { rel: 'noopener noreferrer' }) },
});
