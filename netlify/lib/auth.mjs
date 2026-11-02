import { createHmac, randomBytes, scryptSync, timingSafeEqual } from 'node:crypto';
export const cookieName = '__Host-tatie-admin';
const lifetime = 60 * 60 * 4;
export function json(data, status = 200, headers = {}) {
  return new Response(JSON.stringify(data), { status, headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store', 'X-Content-Type-Options': 'nosniff', ...headers } });
}
export function sameOrigin(request) {
  const origin = request.headers.get('origin');
  return origin === new URL(request.url).origin && !['cross-site', 'none'].includes(request.headers.get('sec-fetch-site'));
}
function sign(value) {
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!secret || secret.length < 32) throw new Error('Authentication unavailable');
  return createHmac('sha256', secret).update(value).digest('base64url');
}
export function createSession(now = Date.now()) {
  const payload = Buffer.from(JSON.stringify({ exp: Math.floor(now / 1000) + lifetime, nonce: randomBytes(24).toString('base64url') })).toString('base64url');
  return `${payload}.${sign(payload)}`;
}
export function authenticated(request, now = Date.now()) {
  try {
    const cookie = request.headers.get('cookie') || '';
    const token = cookie.split(';').map(v => v.trim()).find(v => v.startsWith(`${cookieName}=`))?.slice(cookieName.length + 1);
    if (!token) return false;
    const [payload, signature, extra] = token.split('.');
    if (!payload || !signature || extra) return false;
    const expected = sign(payload);
    if (signature.length !== expected.length || !timingSafeEqual(Buffer.from(signature), Buffer.from(expected))) return false;
    const data = JSON.parse(Buffer.from(payload, 'base64url').toString());
    return Number.isInteger(data.exp) && data.exp > now / 1000 && data.exp <= now / 1000 + lifetime;
  } catch { return false; }
}
export function sessionCookie(value, expired = false) {
  return `${cookieName}=${value}; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=${expired ? 0 : lifetime}`;
}
export function passwordValid(password) {
  const encoded = process.env.ADMIN_PASSWORD_HASH || '';
  const [salt, hash] = encoded.split(':');
  if (!salt || !hash || typeof password !== 'string' || password.length > 256) return false;
  const actual = scryptSync(password, salt, 64);
  const expected = Buffer.from(hash, 'hex');
  return expected.length === actual.length && timingSafeEqual(expected, actual);
}
export function authorizeMutation(request) {
  if (!sameOrigin(request)) return json({ error: 'Origine non autorisée.' }, 403);
  if (!authenticated(request)) return json({ error: 'Votre session a expiré. Reconnectez-vous.' }, 401);
  return null;
}
