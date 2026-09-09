const seed = require('./data/seed');

const CONTACT_EMAIL = process.env.CONTACT_EMAIL || seed.site.email;
const SITE_ORIGIN = process.env.SITE_ORIGIN || 'http://localhost:4200';

async function sendContactEmail({ name, email, message }) {
  if (process.env.GMAIL_APP_PASSWORD) {
    const nodemailer = require('nodemailer');
    const user = process.env.GMAIL_USER || CONTACT_EMAIL;
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: { user, pass: process.env.GMAIL_APP_PASSWORD },
    });
    await transporter.sendMail({
      from: `"SynapseDevs" <${user}>`,
      to: CONTACT_EMAIL,
      replyTo: email,
      subject: `Portfolio enquiry from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
    });
    return { via: 'gmail' };
  }

  const response = await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(CONTACT_EMAIL)}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Origin: SITE_ORIGIN,
      Referer: `${SITE_ORIGIN}/contact`,
    },
    body: JSON.stringify({
      name,
      email,
      message,
      _subject: `SynapseDevs enquiry from ${name}`,
      _replyto: email,
      _captcha: 'false',
      _template: 'table',
    }),
  });
  const payload = await response.json().catch(() => ({}));
  const text = String(payload.message || '');
  if (text.toLowerCase().includes('activation')) {
    return { via: 'formsubmit', needsActivation: true };
  }
  if (!response.ok || payload.success === false || payload.success === 'false') {
    throw new Error(payload.message || 'Could not deliver email');
  }
  return { via: 'formsubmit' };
}

module.exports = { sendContactEmail, CONTACT_EMAIL };
