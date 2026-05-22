// ── Blesk Úklid · Contact-form handler ─────────────────────────────────────
// Netlify Functions v1 format — guaranteed compatible with all Netlify runtimes.
//
// POST /.netlify/functions/submit-form
// Body: JSON { jmeno, email, telefon, mesto, sluzba, zprava, attachments[] }
// attachments: [{ filename, content (base64 string) }]
//
// Required env var:
//   RESEND_API_KEY   — from resend.com/api-keys
//
// Optional env var:
//   RESEND_FROM      — verified sender, e.g. "BLESK ÚKLID Web <noreply@bleskuklid.cz>"
//                      domain MUST be verified at resend.com/domains first
// ─────────────────────────────────────────────────────────────────────────────

import { Resend } from 'resend';

const TO      = 'info@bleskuklid.cz';
const SUBJECT = 'NOVÁ POPTÁVKA';

// ── HTML helpers ──────────────────────────────────────────────────────────────
function escapeHtml(str) {
  return String(str ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function row(label, value) {
  const v = String(value ?? '').trim();
  if (!v) return '';
  return `
      <tr>
        <td style="padding:9px 20px 9px 0;color:#64748b;font-size:13px;white-space:nowrap;
                   vertical-align:top;font-family:Arial,sans-serif;width:110px">${escapeHtml(label)}</td>
        <td style="padding:9px 0;font-size:14px;color:#1e293b;vertical-align:top;
                   font-family:Arial,sans-serif">${escapeHtml(v)}</td>
      </tr>`;
}

function buildHtml({ jmeno, email, telefon, mesto, sluzba, zprava, attachments, timestamp }) {
  const attachNote = attachments.length > 0
    ? `<hr style="border:none;border-top:1px solid #e2e8f0;margin:20px 0">
       <p style="margin:0;font-size:13px;color:#64748b;font-family:Arial,sans-serif">
         📎 ${attachments.length}&nbsp;příloha${
           attachments.length === 1 ? '' : attachments.length < 5 ? 'y' : ''
         } — viz přiložené soubory</p>`
    : '';

  return `<!DOCTYPE html>
<html lang="cs">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f1f5f9;font-family:Arial,sans-serif">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#f1f5f9;padding:32px 16px">
  <tr><td align="center">
    <table cellpadding="0" cellspacing="0" style="max-width:600px;width:100%">
      <!-- Header -->
      <tr><td style="background:#1d4ed8;border-radius:12px 12px 0 0;padding:24px 32px">
        <p style="margin:0;font-size:22px;font-weight:700;color:#fff">⚡ NOVÁ POPTÁVKA</p>
        <p style="margin:6px 0 0;font-size:13px;color:#bfdbfe">Blesk Úklid · ${timestamp}</p>
      </td></tr>
      <!-- Body -->
      <tr><td style="background:#fff;border-radius:0 0 12px 12px;padding:28px 32px;
                     border:1px solid #e2e8f0;border-top:none">
        <table width="100%" cellpadding="0" cellspacing="0">
          ${row('Jméno',   jmeno)}
          ${row('E-mail',  email)}
          ${row('Telefon', telefon)}
          ${row('Město',   mesto)}
          ${row('Služba',  sluzba)}
        </table>
        <hr style="border:none;border-top:1px solid #e2e8f0;margin:20px 0">
        <p style="margin:0 0 8px;color:#64748b;font-size:13px">Zpráva</p>
        <p style="margin:0;font-size:14px;color:#1e293b;line-height:1.75;
                  white-space:pre-wrap">${escapeHtml(zprava)}</p>
        ${attachNote}
      </td></tr>
    </table>
  </td></tr>
</table>
</body>
</html>`;
}

// ── Handler (Netlify Functions v1) ────────────────────────────────────────────
export const handler = async (event) => {
  const headers = { 'Content-Type': 'application/json' };

  // ── 1. Method guard ───────────────────────────────────────────────────────
  console.log('[submit-form] method:', event.httpMethod);
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, headers, body: JSON.stringify({ error: 'Method not allowed' }) };
  }

  // ── 2. API key guard ──────────────────────────────────────────────────────
  if (!process.env.RESEND_API_KEY) {
    console.error('[submit-form] RESEND_API_KEY env var is missing');
    return {
      statusCode: 500, headers,
      body: JSON.stringify({ error: 'Chybí API klíč na serveru (RESEND_API_KEY). Přidejte ho v Netlify → Site configuration → Environment variables a znovu nasaďte.' }),
    };
  }
  console.log('[submit-form] RESEND_API_KEY present, length:', process.env.RESEND_API_KEY.length);

  // ── 3. Parse body ─────────────────────────────────────────────────────────
  let body;
  try {
    body = JSON.parse(event.body || '{}');
  } catch (parseErr) {
    console.error('[submit-form] JSON parse error:', parseErr.message);
    return { statusCode: 400, headers, body: JSON.stringify({ error: 'Neplatné tělo požadavku' }) };
  }

  const {
    jmeno       = '',
    email       = '',
    telefon     = '',
    mesto       = '',
    sluzba      = '',
    zprava      = '',
    attachments = [],
  } = body;

  console.log('[submit-form] fields — jmeno:', !!jmeno.trim(), '| email:', !!email.trim(), '| zprava:', !!zprava.trim(), '| attachments:', attachments.length);

  // ── 4. Validation ─────────────────────────────────────────────────────────
  if (!jmeno.trim())  return { statusCode: 400, headers, body: JSON.stringify({ error: 'Chybí jméno' }) };
  if (!email.trim())  return { statusCode: 400, headers, body: JSON.stringify({ error: 'Chybí e-mail' }) };
  if (!zprava.trim()) return { statusCode: 400, headers, body: JSON.stringify({ error: 'Chybí zpráva' }) };
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
    return { statusCode: 400, headers, body: JSON.stringify({ error: 'Neplatná e-mailová adresa' }) };
  }

  // ── 5. Build email ────────────────────────────────────────────────────────
  const timestamp = new Date().toLocaleString('cs-CZ', {
    timeZone: 'Europe/Prague',
    day: '2-digit', month: '2-digit', year: 'numeric',
    hour: '2-digit', minute: '2-digit',
  });

  const html = buildHtml({ jmeno, email, telefon, mesto, sluzba, zprava, attachments, timestamp });

  const resendAttachments = attachments
    .filter(a => a?.filename && a?.content)
    .map(a => ({ filename: a.filename, content: a.content }));

  const from = process.env.RESEND_FROM || 'BLESK ÚKLID Web <noreply@bleskuklid.cz>';

  console.log('[submit-form] sending — from:', from, '| to:', TO, '| attachments:', resendAttachments.length);

  // ── 6. Send via Resend ────────────────────────────────────────────────────
  const resend = new Resend(process.env.RESEND_API_KEY);

  try {
    const { data, error } = await resend.emails.send({
      from,
      to:          [TO],
      reply_to:    email.trim(),
      subject:     SUBJECT,
      html,
      attachments: resendAttachments,
    });

    // Resend SDK returns { data, error } — error is non-null on API failure
    if (error) {
      console.error('[submit-form] Resend API error:', JSON.stringify(error));
      // Return the real Resend error message so the browser can display/log it
      return {
        statusCode: 502, headers,
        body: JSON.stringify({ error: error.message || JSON.stringify(error) }),
      };
    }

    console.log('[submit-form] email sent OK — Resend id:', data?.id);
    return { statusCode: 200, headers, body: JSON.stringify({ ok: true }) };

  } catch (err) {
    // Network-level or unexpected errors (not Resend API errors)
    console.error('[submit-form] unexpected error:', err?.message);
    console.error('[submit-form] stack:', err?.stack);
    return {
      statusCode: 500, headers,
      body: JSON.stringify({ error: err?.message || 'Neznámá chyba' }),
    };
  }
};
