import 'dotenv/config';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import express from 'express';
import nodemailer from 'nodemailer';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = Number(process.env.PORT || 3000);
const TARGET_EMAIL = process.env.CONTACT_TO_EMAIL || 'ankitk13266@gmail.com';
const INQUIRIES_DIR = path.join(__dirname, 'data');
const INQUIRIES_FILE = path.join(INQUIRIES_DIR, 'inquiries.json');

function getBaseUrl(req) {
  const configured = process.env.APP_URL?.trim();
  if (configured && configured !== 'MY_APP_URL') {
    return configured.replace(/\/+$/, '');
  }
  const proto = req.headers['x-forwarded-proto'] || req.protocol || 'https';
  const host = req.get('host') || `localhost:${PORT}`;
  return `${proto}://${host}`;
}

function saveInquiryToDisk(entry) {
  try {
    fs.mkdirSync(INQUIRIES_DIR, { recursive: true });
    let existing = [];
    if (fs.existsSync(INQUIRIES_FILE)) {
      const raw = fs.readFileSync(INQUIRIES_FILE, 'utf-8');
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        existing = parsed;
      }
    }
    existing.unshift(entry);
    fs.writeFileSync(INQUIRIES_FILE, JSON.stringify(existing.slice(0, 200), null, 2), 'utf-8');
  } catch (err) {
    console.error('Failed to persist inquiry locally:', err);
  }
}

function looksLikeEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

function escapeHtml(text) {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function buildLlmsTxt(baseUrl, full = false) {
  const core = [
    '# Ankit Kumar — MERN Stack Developer & Customer Operations Specialist',
    '',
    '> Official portfolio of Ankit Kumar, based in Darbhanga, Bihar, India. Combines 3+ years of live healthcare pharmacy billing and Daikin/Hitachi customer care operations with self-taught MERN Stack engineering, Groq AI workflows, and GSAP 2D motion UI.',
    '',
    '## Key Links',
    `- [Home & Story](${baseUrl}/): Overview, turning point narrative, capabilities, and FAQs`,
    `- [Selected Works](${baseUrl}/work): Case studies for Vanguard CRM, AI T&C Summarizer, Kinetic 2D GSAP Lab, and Operations`,
    `- [2D Physics & Playground](${baseUrl}/playground): Interactive 2D physics experiments and UI micro-studies`,
    `- [About & Timeline](${baseUrl}/about): Work experience, technical + operational stack, education, and certificates`,
    `- [Contact & Hire](${baseUrl}/contact): Direct inquiry form and verified contact details`,
    '',
    '## Contact & Profiles',
    '- Email: ankitk13266@gmail.com',
    '- Phone: +91-7544873709',
    '- Location: Sahganj, Benta, Laheriasarai, Darbhanga, Bihar - 846003, India (Open to Remote & Relocation)',
    '- LinkedIn: https://www.linkedin.com/in/ankit-io',
    '- GitHub: https://github.com/issue14js',
    '- Instagram: https://www.instagram.com/issue.io/',
    '- Certificates Drive: https://drive.google.com/drive/folders/1IU9Revo3VLZeRyVfg-HmcxdrRjEi8ke2',
  ];

  if (!full) return core.join('\n');

  return [
    ...core,
    '',
    '## Work Experience',
    '1. Customer Care Officer (CCO) — Galaxy Service (Authorized Partner: Daikin & Hitachi), Aug 2026 – Present, Darbhanga, Bihar',
    '2. Pharmacy Sales & Data Entry Executive — Ugana Medico (Under Darbhanga Heart Hospital), Jul 2023 – Jul 2026, Darbhanga, Bihar',
    '3. Full Stack Development Intern — InCodec Technology (1 Month MERN Stack Internship)',
    '',
    '## Featured Projects',
    '- Vanguard CRM: React.js + Context API + custom Tactile Ivory UI system with Login/Register auth and multi-level lead filtering.',
    '- AI Terms & Conditions Summarizer: Built at Sheryians Cohort Hackathon 2026 (Team Afdhruval) using Node.js, Express.js, and Groq API.',
    '- Kinetic 2D & GSAP Lab: MERN Stack, JavaScript ES6+, GSAP ScrollTrigger choreography, and AWS pipelines.',
    '',
    '## Education & Certifications',
    '- ITI COPA — Integrated Infotech Private ITI, Baheri (NCVT Approved, Pursuing)',
    '- 10th Standard — BBOSE (Score: 315)',
    '- Full Stack Web Development & DSA Excellence — Sheryians Coding School (June 2026)',
    '- Web Design & Development — NSDC Skill India Digital Hub (June 2026)',
    '- Data Analytics Job Simulation — Deloitte (Forage)',
    '- Product Management Job Simulation — Electronic Arts (Forage)',
  ].join('\n');
}

async function startServer() {
  const app = express();
  app.use(express.json({ limit: '64kb' }));

  // Search Engine & AI Crawler Endpoints
  app.get('/robots.txt', (req, res) => {
    const baseUrl = getBaseUrl(req);
    res.type('text/plain').send(
      [
        'User-agent: *',
        'Allow: /',
        '',
        '# Welcome AI Search & Grounding Crawlers',
        'User-agent: Googlebot',
        'Allow: /',
        'User-agent: Google-Extended',
        'Allow: /',
        'User-agent: OAI-SearchBot',
        'Allow: /',
        'User-agent: ChatGPT-User',
        'Allow: /',
        'User-agent: PerplexityBot',
        'Allow: /',
        'User-agent: ClaudeBot',
        'Allow: /',
        'User-agent: Bingbot',
        'Allow: /',
        '',
        `Sitemap: ${baseUrl}/sitemap.xml`,
        `# AI Context File: ${baseUrl}/llms.txt`,
      ].join('\n')
    );
  });

  app.get('/sitemap.xml', (req, res) => {
    const baseUrl = getBaseUrl(req);
    const lastmod = new Date().toISOString().split('T')[0];
    const routes = [
      { path: '/', priority: '1.0', changefreq: 'weekly' },
      { path: '/work', priority: '0.9', changefreq: 'weekly' },
      { path: '/about', priority: '0.9', changefreq: 'monthly' },
      { path: '/playground', priority: '0.8', changefreq: 'monthly' },
      { path: '/contact', priority: '0.8', changefreq: 'monthly' },
    ];
    const urls = routes
      .map(
        (r) => `  <url>
    <loc>${baseUrl}${r.path}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${r.changefreq}</changefreq>
    <priority>${r.priority}</priority>
  </url>`
      )
      .join('\n');

    res.type('application/xml').send(
      `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>`
    );
  });

  app.get('/llms.txt', (req, res) => {
    res.type('text/plain; charset=utf-8').send(buildLlmsTxt(getBaseUrl(req), false));
  });

  app.get('/llms-full.txt', (req, res) => {
    res.type('text/plain; charset=utf-8').send(buildLlmsTxt(getBaseUrl(req), true));
  });

  app.get('/api/health', (_req, res) => {
    const emailConfigured = Boolean(
      (process.env.SMTP_USER?.trim() && process.env.SMTP_PASS?.trim()) ||
        process.env.RESEND_API_KEY?.trim()
    );
    res.json({ ok: true, emailConfigured });
  });

  app.post('/api/contact', async (req, res) => {
    const body = req.body || {};
    const name = typeof body.name === 'string' ? body.name.trim() : '';
    const contact = typeof body.contact === 'string' ? body.contact.trim() : '';
    const inquiryType =
      typeof body.inquiryType === 'string' && body.inquiryType.trim()
        ? body.inquiryType.trim()
        : 'General Inquiry';
    const message = typeof body.message === 'string' ? body.message.trim() : '';

    if (!contact) {
      res.status(400).json({ ok: false, error: 'Please enter your email or phone number.' });
      return;
    }
    if (!message || message.length < 3) {
      res.status(400).json({ ok: false, error: 'Please write a short message before submitting.' });
      return;
    }
    if (name.length > 120 || contact.length > 160 || message.length > 4000) {
      res.status(400).json({ ok: false, error: 'Input exceeds allowed character length.' });
      return;
    }

    const senderLabel = name || 'Portfolio Visitor';
    const subject = `[Portfolio · ${inquiryType}] New message from ${senderLabel}`;
    const textBody = [
      'New Portfolio Contact Submission',
      '--------------------------------',
      `Name: ${senderLabel}`,
      `Visitor Contact: ${contact}`,
      `Inquiry Type: ${inquiryType}`,
      `Submitted: ${new Date().toISOString()}`,
      '',
      'Message:',
      message,
    ].join('\n');

    const htmlBody = `
      <div style="font-family: system-ui, -apple-system, sans-serif; color: #141413; background: #f4f1ea; padding: 24px; border: 1px solid #14141322;">
        <p style="font-size: 11px; letter-spacing: 0.14em; text-transform: uppercase; color: #d9381e; margin: 0 0 8px;">Portfolio Inquiry · ${escapeHtml(inquiryType)}</p>
        <h2 style="margin: 0 0 16px; font-size: 20px;">Message from ${escapeHtml(senderLabel)}</h2>
        <p style="margin: 0 0 6px;"><strong>Visitor Contact:</strong> ${escapeHtml(contact)}</p>
        <p style="margin: 0 0 16px;"><strong>Topic:</strong> ${escapeHtml(inquiryType)}</p>
        <div style="background: #ffffff; padding: 16px; border-left: 3px solid #d9381e; white-space: pre-wrap;">${escapeHtml(message)}</div>
      </div>
    `;

    let deliveryMethod = 'saved_only';

    const smtpHost = (process.env.SMTP_HOST || 'smtp.gmail.com').trim();
    const smtpUser = process.env.SMTP_USER?.trim();
    const rawSmtpPass = process.env.SMTP_PASS?.trim() || '';
    const smtpPass = smtpHost.includes('gmail')
      ? rawSmtpPass.replace(/\s+/g, '')
      : rawSmtpPass;
    const resendKey = process.env.RESEND_API_KEY?.trim();

    if (smtpUser && smtpPass) {
      try {
        const smtpPort = Number(process.env.SMTP_PORT || 465);
        const transporter = nodemailer.createTransport({
          host: smtpHost,
          port: smtpPort,
          secure: smtpPort === 465,
          auth: {
            user: smtpUser,
            pass: smtpPass,
          },
        });

        await transporter.sendMail({
          from: `"Ankit Portfolio" <${smtpUser}>`,
          to: TARGET_EMAIL,
          replyTo: looksLikeEmail(contact) ? contact : undefined,
          subject,
          text: textBody,
          html: htmlBody,
        });

        deliveryMethod = 'smtp';
      } catch (err) {
        console.error('SMTP email send failed:', err);
      }
    } else if (resendKey) {
      try {
        const resendRes = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${resendKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            from: process.env.RESEND_FROM_EMAIL || 'Ankit Portfolio <onboarding@resend.dev>',
            to: [TARGET_EMAIL],
            reply_to: looksLikeEmail(contact) ? contact : undefined,
            subject,
            text: textBody,
            html: htmlBody,
          }),
        });

        if (resendRes.ok) {
          deliveryMethod = 'resend';
        } else {
          console.error('Resend API error:', await resendRes.text());
        }
      } catch (err) {
        console.error('Resend request failed:', err);
      }
    }

    const entry = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      name: senderLabel,
      contact,
      inquiryType,
      message,
      submittedAt: new Date().toISOString(),
      deliveryMethod,
    };
    saveInquiryToDisk(entry);

    res.json({
      ok: true,
      saved: true,
      delivered: deliveryMethod !== 'saved_only',
      method: deliveryMethod,
      targetEmail: TARGET_EMAIL,
    });
  });

  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT,  () => {
    console.log(`Server listening on :${PORT}`);
  });
}

startServer();
