import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'

const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY')!
const TO_EMAIL       = Deno.env.get('NOTIFY_EMAIL') ?? 'maria.arenaza@gmail.com'

const WA_NUMBER = '34690954043'
const WA_LINK   = `https://wa.me/${WA_NUMBER}`
const WA_DISPLAY = '+34 690 954 043'

const copy = {
  es: {
    subject:  (nombre: string) => `Hola ${nombre}, hemos recibido tu solicitud — Elcano 7 Bilbao`,
    greeting: (nombre: string) => `Hola ${nombre},`,
    body: `Gracias por su interés en <strong>Elcano 7 Bilbao</strong>. Hemos recibido su solicitud y nos pondremos en contacto con usted a la mayor brevedad posible para agendar una visita.`,
    footer: `Si necesita resolver cualquier duda con urgencia, puede escribirnos por WhatsApp o llamarnos directamente:`,
    closing: 'Un cordial saludo,',
    name: 'María Arenaza',
  },
  en: {
    subject:  (nombre: string) => `Hello ${nombre}, we have received your enquiry — Elcano 7 Bilbao`,
    greeting: (nombre: string) => `Hello ${nombre},`,
    body: `Thank you for your interest in <strong>Elcano 7 Bilbao</strong>. We have received your enquiry and will be in touch as soon as possible to arrange a viewing.`,
    footer: `If you need to reach us urgently, you can message us on WhatsApp or call us directly:`,
    closing: 'Kind regards,',
    name: 'María Arenaza',
  },
}

function buildOwnerHtml(nombre: string, email: string, telefono: string, vivienda: string, mensaje: string | null, fecha: string) {
  const whatsapp = `https://wa.me/34${telefono.replace(/\D/g, '')}?text=${encodeURIComponent(
    `Hola ${nombre}, te escribo desde Elcano 7 Bilbao. Vi que te interesa ${vivienda}.`
  )}`

  return `
    <div style="font-family:sans-serif;max-width:560px;margin:0 auto">
      <h2 style="color:#1A1A1A;border-bottom:2px solid #C9A84C;padding-bottom:8px">
        Nuevo contacto — Elcano 7 Bilbao
      </h2>
      <table style="width:100%;border-collapse:collapse;margin-top:16px">
        <tr><td style="padding:8px 0;color:#666;width:120px">Nombre</td><td style="padding:8px 0;font-weight:600">${nombre}</td></tr>
        <tr><td style="padding:8px 0;color:#666">Email</td><td style="padding:8px 0"><a href="mailto:${email}">${email}</a></td></tr>
        <tr><td style="padding:8px 0;color:#666">Teléfono</td><td style="padding:8px 0"><a href="tel:${telefono}">${telefono}</a></td></tr>
        <tr><td style="padding:8px 0;color:#666">Vivienda</td><td style="padding:8px 0">${vivienda}</td></tr>
        ${mensaje ? `<tr><td style="padding:8px 0;color:#666;vertical-align:top">Mensaje</td><td style="padding:8px 0">${mensaje}</td></tr>` : ''}
        <tr><td style="padding:8px 0;color:#666">Fecha</td><td style="padding:8px 0">${fecha}</td></tr>
      </table>
      <div style="margin-top:24px">
        <a href="mailto:${email}" style="display:inline-block;background:#1A1A1A;color:#fff;padding:12px 24px;border-radius:6px;text-decoration:none;font-weight:600;margin-right:8px">
          Escribir email
        </a>
        <a href="${whatsapp}" style="display:inline-block;background:#25D366;color:#fff;padding:12px 24px;border-radius:6px;text-decoration:none;font-weight:600">
          WhatsApp
        </a>
      </div>
    </div>
  `
}

function buildLeadHtml(nombre: string, vivienda: string, idioma: 'es' | 'en') {
  const t = copy[idioma] ?? copy.es

  return `
    <div style="font-family:sans-serif;max-width:560px;margin:0 auto;color:#1A1A1A">
      <div style="border-bottom:2px solid #C9A84C;padding-bottom:16px;margin-bottom:24px">
        <p style="margin:0;font-size:13px;letter-spacing:2px;color:#C9A84C;text-transform:uppercase">Elcano 7 · Bilbao</p>
      </div>

      <p style="margin:0 0 16px">${t.greeting(nombre)}</p>
      <p style="margin:0 0 16px;line-height:1.6">${t.body}</p>
      <p style="margin:0 0 32px;color:#666;font-size:14px"><strong>${vivienda}</strong></p>

      <p style="margin:0 0 12px;line-height:1.6;font-size:14px;color:#444">${t.footer}</p>
      <div style="margin-bottom:32px">
        <a href="${WA_LINK}" style="display:inline-block;background:#25D366;color:#fff;padding:10px 20px;border-radius:6px;text-decoration:none;font-weight:600;font-size:14px;margin-right:8px">
          WhatsApp
        </a>
        <a href="tel:${WA_NUMBER}" style="display:inline-block;background:#1A1A1A;color:#fff;padding:10px 20px;border-radius:6px;text-decoration:none;font-weight:600;font-size:14px">
          ${WA_DISPLAY}
        </a>
      </div>

      <div style="border-top:1px solid #E5E5E5;padding-top:20px;color:#666;font-size:13px">
        <p style="margin:0">${t.closing}</p>
        <p style="margin:4px 0 0;font-weight:600;color:#1A1A1A">${t.name}</p>
        <p style="margin:4px 0 0"><a href="${WA_LINK}" style="color:#C9A84C;text-decoration:none">${WA_DISPLAY}</a></p>
      </div>
    </div>
  `
}

serve(async (req) => {
  const payload = await req.json()
  const record  = payload.record ?? payload

  const { nombre, email, telefono, vivienda, mensaje, idioma, created_at } = record

  const fecha = new Date(created_at).toLocaleString('es-ES', {
    timeZone: 'Europe/Madrid',
    dateStyle: 'short',
    timeStyle: 'short',
  })

  const lang = (idioma === 'en' ? 'en' : 'es') as 'es' | 'en'
  const t    = copy[lang]

  const sendEmail = (to: string, subject: string, html: string) =>
    fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type':  'application/json',
      },
      body: JSON.stringify({
        from: 'Elcano 7 <notificaciones@elcano7bilbao.com>',
        to:   [to],
        subject,
        html,
      }),
    })

  const [ownerRes, leadRes] = await Promise.all([
    sendEmail(
      TO_EMAIL,
      `Nuevo contacto: ${nombre} — ${vivienda}`,
      buildOwnerHtml(nombre, email, telefono, vivienda, mensaje ?? null, fecha),
    ),
    sendEmail(
      email,
      t.subject(nombre),
      buildLeadHtml(nombre, vivienda, lang),
    ),
  ])

  if (!ownerRes.ok || !leadRes.ok) {
    const err = await (!ownerRes.ok ? ownerRes : leadRes).text()
    console.error('Resend error:', err)
    return new Response(err, { status: 500 })
  }

  return new Response(JSON.stringify({ ok: true }), {
    headers: { 'Content-Type': 'application/json' },
  })
})
