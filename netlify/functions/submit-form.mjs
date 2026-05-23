// ── Blesk Úklid · Contact-form handler ──────────────────────────────────────
// Netlify Functions v2 — export default, Web Fetch API (Request / Response).
// Bundled with esbuild from netlify/functions/package.json → resend dep.
//
// POST /.netlify/functions/submit-form
// Body: JSON { jmeno, email, telefon, mesto, sluzba, zprava, attachments[] }
// attachments: [{ filename, content (base64 string) }]
//
// Required env var:  RESEND_API_KEY
// Optional env var:  RESEND_FROM  (default: BLESK ÚKLID Web <noreply@bleskuklid.cz>)
// ─────────────────────────────────────────────────────────────────────────────

import { Resend } from 'resend';

const TO      = 'info@bleskuklid.cz';
const SUBJECT = 'NOVÁ POPTÁVKA';
const HDR     = { 'Content-Type': 'application/json' };

function ok(body)  { return new Response(JSON.stringify(body), { status: 200, headers: HDR }); }
function err(msg, status = 400) {
  console.error('[submit-form] returning', status, '—', msg);
  return new Response(JSON.stringify({ error: msg }), { status, headers: HDR });
}

function esc(s) {
  return String(s ?? '').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')
                        .replace(/"/g,'&quot;').replace(/'/g,'&#39;');
}

function row(label, value) {
  const v = String(value ?? '').trim();
  if (!v) return '';
  return `<tr>
    <td style="padding:9px 20px 9px 0;color:#64748b;font-size:13px;vertical-align:top;font-family:Arial,sans-serif;width:110px">${esc(label)}</td>
    <td style="padding:9px 0;font-size:14px;color:#1e293b;vertical-align:top;font-family:Arial,sans-serif">${esc(v)}</td>
  </tr>`;
}

function buildHtml(f) {
  const note = f.attachments.length
    ? `<hr style="border:none;border-top:1px solid #e2e8f0;margin:20px 0">
       <p style="margin:0;font-size:13px;color:#64748b;font-family:Arial,sans-serif">
         📎 ${f.attachments.length} příloha${f.attachments.length === 1 ? '' : f.attachments.length < 5 ? 'y' : ''}
         — viz přiložené soubory</p>`
    : '';
  return `<!DOCTYPE html><html lang="cs"><head><meta charset="UTF-8"></head>
<body style="margin:0;padding:0;background:#f1f5f9">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#f1f5f9;padding:32px 16px">
  <tr><td align="center"><table cellpadding="0" cellspacing="0" style="max-width:600px;width:100%">
    <tr><td style="background:#1d4ed8;border-radius:12px 12px 0 0;padding:24px 32px">
      <p style="margin:0;font-size:22px;font-weight:700;color:#fff;font-family:Arial,sans-serif">⚡ NOVÁ POPTÁVKA</p>
      <p style="margin:6px 0 0;font-size:13px;color:#bfdbfe;font-family:Arial,sans-serif">Blesk Úklid · ${f.timestamp}</p>
    </td></tr>
    <tr><td style="background:#fff;border-radius:0 0 12px 12px;padding:28px 32px;border:1px solid #e2e8f0;border-top:none">
      <table width="100%" cellpadding="0" cellspacing="0">
        ${row('Jméno',   f.jmeno)}
        ${row('E-mail',  f.email)}
        ${row('Telefon', f.telefon)}
        ${row('Město',   f.mesto)}
        ${row('Služba',  f.sluzba)}
      </table>
      <hr style="border:none;border-top:1px solid #e2e8f0;margin:20px 0">
      <p style="margin:0 0 8px;color:#64748b;font-size:13px;font-family:Arial,sans-serif">Zpráva</p>
      <p style="margin:0;font-size:14px;color:#1e293b;line-height:1.75;white-space:pre-wrap;font-family:Arial,sans-serif">${esc(f.zprava)}</p>
      ${note}
    </td></tr>
  </table></td></tr>
</table></body></html>`;
}

// ── Handler ───────────────────────────────────────────────────────────────────
export default async (req) => {
  console.log('[submit-form] invoked — method:', req.method);

  if (req.method !== 'POST') return err('Method not allowed', 405);

  // ── API key guard ─────────────────────────────────────────────────────────
  if (!process.env.RESEND_API_KEY) {
    console.error('[submit-form] RESEND_API_KEY is not set');
    return err('Server configuration error: RESEND_API_KEY missing', 500);
  }
  console.log('[submit-form] RESEND_API_KEY length:', process.env.RESEND_API_KEY.length);

  // ── Parse body ────────────────────────────────────────────────────────────
  let body;
  try {
    body = await req.json();
  } catch (e) {
    console.error('[submit-form] JSON parse error:', e.message);
    return err('Invalid request body', 400);
  }

  const {
    jmeno = '', email = '', telefon = '', mesto = '',
    sluzba = '', zprava = '', attachments = [],
  } = body;

  console.log('[submit-form] fields — jmeno:', !!jmeno.trim(), '| email:', !!email.trim(), '| zprava:', !!zprava.trim(), '| files:', attachments.length);

  // ── Validate ──────────────────────────────────────────────────────────────
  if (!jmeno.trim())  return err('Chybí jméno');
  if (!email.trim())  return err('Chybí e-mail');
  if (!zprava.trim()) return err('Chybí zpráva');
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) return err('Neplatná e-mailová adresa');

  // ── Build email ───────────────────────────────────────────────────────────
  const timestamp = new Date().toLocaleString('cs-CZ', {
    timeZone: 'Europe/Prague', day: '2-digit', month: '2-digit',
    year: 'numeric', hour: '2-digit', minute: '2-digit',
  });
  const html = buildHtml({ jmeno, email, telefon, mesto, sluzba, zprava, attachments, timestamp });

  const resendAttachments = attachments
    .filter(a => a?.filename && a?.content)
    .map(a => ({ filename: a.filename, content: a.content }));

  const from = process.env.RESEND_FROM || 'BLESK ÚKLID Web <noreply@bleskuklid.cz>';
  console.log('[submit-form] sending — from:', from, '| attachments:', resendAttachments.length);

  // ── Send ──────────────────────────────────────────────────────────────────
  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const { data, error } = await resend.emails.send({
      from, to: [TO], reply_to: email.trim(),
      subject: SUBJECT, html,
      attachments: resendAttachments,
    });

    if (error) {
      console.error('[submit-form] Resend API error:', JSON.stringify(error));
      return err(error.message || JSON.stringify(error), 502);
    }

    console.log('[submit-form] sent OK — id:', data?.id);
    return ok({ ok: true });

  } catch (e) {
    console.error('[submit-form] unexpected error:', e.message);
    console.error('[submit-form] stack:', e.stack);
    return err(e.message || 'Neznámá chyba', 500);
  }
};
