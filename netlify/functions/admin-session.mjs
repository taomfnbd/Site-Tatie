import { authenticated, json, sameOrigin, sessionCookie } from '../lib/auth.mjs';
export default function handler(request) {
  if (request.method === 'GET') return json({ authenticated: authenticated(request) });
  if (request.method === 'DELETE') {
    if (!sameOrigin(request)) return json({ error: 'Origine non autorisée.' }, 403);
    return json({ authenticated: false }, 200, { 'Set-Cookie': sessionCookie('', true) });
  }
  return json({ error: 'Méthode non autorisée.' }, 405, { Allow: 'GET, DELETE' });
}
export const config = { path: '/api/admin/session' };
