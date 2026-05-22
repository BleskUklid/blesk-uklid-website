// ── Blesk Úklid · Contact-form handler ─────────────────────────────────────
// POST /.netlify/functions/submit-form
// Body: JSON { jmeno, email, telefon, mesto, sluzba, zprava, attachments[] }
// attachments: [{ filename, content (base64), type }]
//
// Required env var:
//   RESEND_API_KEY   — from resend.com dashboard
//
// Optional env var:
//   RESEND_FROM      — verified sender address
//                      default: "BLESK ÚKLID Web <noreply@bleskuklid.cz>"
// ─────────────────────────────────────────────────────────────────────────────

import { Resend } from 'resend';

const TO      = 'info@bleskuklid.cz';
const SUBJECT = 'NOVÁ POPTÁVKA';

const JSON_HEADERS = { 'Content-Type': 'application/json' };

// ── Helpers ───────────────────────────────────────────────────────────────────
function escapeHtml(str) {
  return String(str ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function row(label, value) {
  if (!value?.toString().trim()) return '';
  return `
      <tr>
        <td style="padding:9px 20px 9px 0;color:#64748b;font-size:13px;white-space:nowrap;
                   vertical-align:top;font-family:Arial,sans-serif;width:110px">${escapeHtml(label)}</td>
        <td style="padding:9px 0;font-size:14px;color:#1e293b;vertical-align:top;
                   font-family:Arial,sans-serif">${escapeHtml(value)}</td>
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

// ── Handler ───────────────────────────────────────────────────────────────────
export default async (req) => {
  // Only POST
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405, headers: JSON_HEADERS,
    });
  }

  // Parse body
  let body;
  try {
    body = await req.json();
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid request body' }), {
      status: 400, headers: JSON_HEADERS,
    });
  }

  const {
    jmeno   = '',
    email   = '',
    telefon = '',
    mesto   = '',
    sluzba  = '',
    zprava  = '',
    attachments = [],
  } = body;

  // ── Server-side validation ────────────────────────────────────────────────
  if (!jmeno.trim() || !email.trim() || !zprava.trim()) {
    return new Response(JSON.stringify({ error: 'Chybí povinná pole (jméno, e-mail, zpráva)' }), {
      status: 400, headers: JSON_HEADERS,
    });
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
    return new Response(JSON.stringify({ error: 'Neplatná e-mailová adresa' }), {
      status: 400, headers: JSON_HEADERS,
    });
  }

  // ── Timestamp (Prague timezone) ───────────────────────────────────────────
  const timestamp = new Date().toLocaleString('cs-CZ', {
    timeZone: 'Europe/Prague',
    day: '2-digit', month: '2-digit', year: 'numeric',
    hour: '2-digit', minute: '2-digit',
  });

  // ── Build email ───────────────────────────────────────────────────────────
  const html = buildHtml({ jmeno, email, telefon, mesto, sluzba, zprava, attachments, timestamp });

  const resendAttachments = attachments
    .filter(a => a?.filename && a?.content)
    .map(a => ({ filename: a.filename, content: a.content }));

  // ── Send via Resend ───────────────────────────────────────────────────────
  const resend = new Resend(process.env.RESEND_API_KEY);
  const from   = process.env.RESEND_FROM || `BLESK ÚKLID Web <noreply@bleskuklid.cz>`;

  try {
    const { error } = await resend.emails.send({
      from,
      to:       [TO],
      reply_to: email.trim(),
      subject:  SUBJECT,
      html,
      attachments: resendAttachments,
    });

    if (error) throw new Error(error.message ?? JSON.stringify(error));

    return new Response(JSON.stringify({ ok: true }), {
      status: 200, headers: JSON_HEADERS,
    });

  } catch (err) {
    console.error('[submit-form] Resend error:', err?.message ?? err);
    return new Response(JSON.stringify({ ok: false, error: 'Odesílání e-mailu selhalo' }), {
      status: 500, headers: JSON_HEADERS,
    });
  }
};
