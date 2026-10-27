import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { randomUUID } from 'node:crypto';
import { store } from './store.js';

const app = express();
const port = Number(process.env.PORT || 8000);
const jwtSecret = process.env.JWT_SECRET || 'development-only-change-me';
const adminEmail = (process.env.ADMIN_EMAIL || 'admin@example.com').toLowerCase();
const adminPassword = process.env.ADMIN_PASSWORD || 'change-this-password';
const adminPasswordHash = bcrypt.hashSync(adminPassword, 10);
const allowedOrigins = (process.env.CORS_ORIGINS || 'http://localhost:3000').split(',').map((s) => s.trim());
const emailFromName = process.env.EMAIL_FROM_NAME || 'NextGen Web Solutions';
const ownerEmail = process.env.OWNER_EMAIL || 'nextgenwebsolution08@gmail.com';
const missingEmailConfig = ['EMERGENT_EMAIL_KEY'].filter((key) => !process.env[key]);
if (missingEmailConfig.length) {
  console.warn(`Email notifications are disabled; missing configuration: ${missingEmailConfig.join(', ')}`);
}

app.use(cors({ origin: (origin, done) => done(null, !origin || allowedOrigins.includes('*') || allowedOrigins.includes(origin)), credentials: true }));
app.use(express.json({ limit: '1mb' }));
app.use(cookieParser());

const fail = (res, status, detail) => res.status(status).json({ detail });
const isEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value || '');
const escapeHtml = (value) => String(value).replace(/[&<>"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char]);
const makeToken = (email, type, expiresIn) => jwt.sign({ sub: email, type }, jwtSecret, { expiresIn });
const setCookies = (res, email) => {
  const secure = process.env.NODE_ENV === 'production';
  res.cookie('access_token', makeToken(email, 'access', '1h'), { httpOnly: true, secure, sameSite: secure ? 'none' : 'lax', maxAge: 3600000, path: '/' });
  res.cookie('refresh_token', makeToken(email, 'refresh', '7d'), { httpOnly: true, secure, sameSite: secure ? 'none' : 'lax', maxAge: 604800000, path: '/' });
};
function requireAdmin(req, res, next) {
  const token = req.cookies.access_token || (req.get('authorization') || '').replace(/^Bearer\s+/i, '');
  if (!token) return fail(res, 401, 'Not authenticated');
  try {
    const payload = jwt.verify(token, jwtSecret);
    if (payload.type !== 'access' || payload.sub !== adminEmail) return fail(res, 401, 'Invalid token');
    req.admin = { email: adminEmail, role: 'admin' };
    next();
  } catch { return fail(res, 401, 'Invalid or expired token'); }
}

async function sendInquiryEmail(inquiry) {
  const { EMERGENT_EMAIL_KEY } = process.env;
  if (!EMERGENT_EMAIL_KEY) return false;
  const rows = [
    ['Name', inquiry.name], ['Email', inquiry.email], ['Phone', inquiry.phone],
    ['Service', inquiry.service], ['Project brief', inquiry.message],
  ].map(([label, value]) => `<tr><td style="padding:10px 14px;color:#64748b;vertical-align:top">${escapeHtml(label)}</td><td style="padding:10px 14px;color:#0f172a">${escapeHtml(value).replace(/\n/g, '<br>')}</td></tr>`).join('');
  const response = await fetch('https://integrations.emergentagent.com/api/v1/email/send', {
    method: 'POST',
    headers: { 'X-Email-Key': EMERGENT_EMAIL_KEY, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      to: [ownerEmail],
      subject: 'New Project Inquiry — NextGen Web Solutions',
      from_name: emailFromName,
      contact_email: process.env.EMAIL_REPLY_TO || inquiry.email,
      html: `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f8fafc;font-family:Arial,sans-serif"><tr><td style="padding:24px"><h2 style="color:#0f172a">New Project Inquiry</h2><p style="color:#64748b">Received from the NextGen Web Solutions contact form.</p><table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#fff">${rows}</table></td></tr></table>`,
    }),
    signal: AbortSignal.timeout(10000),
  });
  if (!response.ok) {
    console.error(`Email inquiry notification failed (HTTP ${response.status})`);
    return false;
  }
  return true;
}

async function sendWhatsAppLeadAlert(inquiry) {
  const { TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, LEAD_ALERT_PHONE, TWILIO_WHATSAPP_FROM } = process.env;
  if (!TWILIO_ACCOUNT_SID || !TWILIO_AUTH_TOKEN || !LEAD_ALERT_PHONE || !TWILIO_WHATSAPP_FROM) return false;

  const body = [
    `New website inquiry — ${inquiry.name}`,
    `Service: ${inquiry.service}`,
    `Phone: ${inquiry.phone}`,
    `Email: ${inquiry.email}`,
    `Message: ${inquiry.message}`,
  ].join('\n').slice(0, 1500);
  const params = new URLSearchParams({
    To: `whatsapp:${LEAD_ALERT_PHONE}`,
    From: `whatsapp:${TWILIO_WHATSAPP_FROM}`,
    Body: body,
  });
  const credentials = Buffer.from(`${TWILIO_ACCOUNT_SID}:${TWILIO_AUTH_TOKEN}`).toString('base64');
  const response = await fetch(`https://api.twilio.com/2010-04-01/Accounts/${TWILIO_ACCOUNT_SID}/Messages.json`, {
    method: 'POST',
    headers: { Authorization: `Basic ${credentials}`, 'Content-Type': 'application/x-www-form-urlencoded' },
    body: params,
  });
  if (!response.ok) {
    console.error(`WhatsApp lead alert failed (Twilio HTTP ${response.status})`);
    return false;
  }
  return true;
}

app.get('/', (_req, res) => res.json({ message: 'NextGen Web Solutions API is running', health: '/api/' }));
app.get('/api/', (_req, res) => res.json({ message: 'Hello World' }));
app.post('/api/status', (req, res) => {
  if (typeof req.body.client_name !== 'string' || !req.body.client_name.trim()) return fail(res, 422, 'client_name is required');
  const item = { id: randomUUID(), client_name: req.body.client_name.trim(), timestamp: new Date().toISOString() };
  store.statusChecks.push(item);
  res.json(item);
});
app.get('/api/status', (_req, res) => res.json(store.statusChecks.slice(0, 1000)));

app.post('/api/contact', async (req, res) => {
  const { name, email, phone, service, message } = req.body || {};
  if (typeof name !== 'string' || name.trim().length < 2 || name.length > 120) return fail(res, 422, 'Name must be between 2 and 120 characters');
  if (!isEmail(email)) return fail(res, 422, 'A valid email address is required');
  if (typeof phone !== 'string' || phone.trim().length < 7 || phone.length > 24) return fail(res, 422, 'Phone must be between 7 and 24 characters');
  if (typeof service !== 'string' || service.trim().length < 2 || service.length > 80) return fail(res, 422, 'A valid service is required');
  if (typeof message !== 'string' || message.trim().length < 10 || message.length > 5000) return fail(res, 422, 'Message must be between 10 and 5000 characters');
  const inquiry = { id: randomUUID(), name: name.trim(), email: email.toLowerCase(), phone: phone.trim(), service: service.trim(), message: message.trim(), created_at: new Date().toISOString(), status: 'new', is_read: false };
  store.inquiries.push(inquiry);
  console.info(`New inquiry saved: ${inquiry.id} (${inquiry.service})`);
  let emailSent = false;
  try {
    emailSent = await sendInquiryEmail(inquiry);
  } catch (error) {
    console.error('Email inquiry notification failed:', error.message);
  }
  let whatsappSent = false;
  try {
    whatsappSent = await sendWhatsAppLeadAlert(inquiry);
  } catch (error) {
    console.error('WhatsApp lead alert failed:', error.message);
  }
  res.status(201).json({ status: 'success', inquiry_id: inquiry.id, email_sent: emailSent, whatsapp_sent: whatsappSent });
});

app.post('/api/admin/login', async (req, res) => {
  const { email, password } = req.body || {};
  if (!isEmail(email) || typeof password !== 'string') return fail(res, 422, 'Valid email and password are required');
  const normalized = email.toLowerCase();
  const identifier = `${req.ip}:${normalized}`;
  const attempt = store.loginAttempts.get(identifier);
  if (attempt?.count >= 5 && Date.now() - attempt.last_failed < 900000) return fail(res, 429, 'Too many failed attempts. Try again in 15 minutes.');
  const ok = normalized === adminEmail && await bcrypt.compare(password, adminPasswordHash);
  if (!ok) {
    const current = store.loginAttempts.get(identifier) || { count: 0 };
    store.loginAttempts.set(identifier, { count: current.count + 1, last_failed: Date.now() });
    return fail(res, 401, 'Invalid email or password');
  }
  store.loginAttempts.delete(identifier);
  setCookies(res, normalized);
  res.json({ email: normalized, role: 'admin' });
});
app.post('/api/admin/refresh', (req, res) => {
  const token = req.cookies.refresh_token;
  if (!token) return fail(res, 401, 'No refresh token');
  try {
    const payload = jwt.verify(token, jwtSecret);
    if (payload.type !== 'refresh' || payload.sub !== adminEmail) return fail(res, 401, 'Invalid session');
    setCookies(res, adminEmail);
    res.json({ email: adminEmail, role: 'admin' });
  } catch { return fail(res, 401, 'Session expired. Please log in again.'); }
});
app.post('/api/admin/logout', (_req, res) => {
  res.clearCookie('access_token', { path: '/' });
  res.clearCookie('refresh_token', { path: '/' });
  res.json({ status: 'logged_out' });
});
app.get('/api/admin/me', requireAdmin, (req, res) => res.json(req.admin));
app.get('/api/admin/inquiries', requireAdmin, (_req, res) => {
  const inquiries = store.listInquiries().map((item) => ({ ...item, is_read: item.is_read ?? false }));
  res.json({ inquiries, total: inquiries.length });
});
app.patch('/api/admin/inquiries/:id/read', requireAdmin, (req, res) => {
  const inquiry = store.findInquiry(req.params.id);
  if (!inquiry) return fail(res, 404, 'Inquiry not found');
  inquiry.is_read = true;
  res.json({ status: 'success' });
});
app.patch('/api/admin/inquiries/:id/status', requireAdmin, (req, res) => {
  if (!['new', 'in_talk', 'won'].includes(req.body?.status)) return fail(res, 400, 'Invalid status');
  const inquiry = store.findInquiry(req.params.id);
  if (!inquiry) return fail(res, 404, 'Inquiry not found');
  inquiry.status = req.body.status;
  res.json({ status: 'success', inquiry_status: inquiry.status });
});

app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(500).json({ detail: 'Internal server error' });
});
app.listen(port, () => console.log(`NextGen API listening on http://localhost:${port}`));
