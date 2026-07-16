const HTML_CACHE = 'public, max-age=0, must-revalidate';
const ASSET_CACHE = 'public, max-age=31536000, immutable';
const NO_STORE = 'no-store';

const redirect = (location) => new Response(null, {
  status: 303,
  headers: {
    Location: location,
    'Cache-Control': NO_STORE,
  },
});

const clean = (value, max = 2000) => String(value || '')
  .replace(/[\u0000-\u001F\u007F]/g, ' ')
  .trim()
  .slice(0, max);

const validEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

const sendEmail = (apiKey, payload) => fetch('https://api.resend.com/emails', {
  method: 'POST',
  headers: {
    Authorization: `Bearer ${apiKey}`,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(payload),
});

const methodNotAllowed = () => new Response('Method Not Allowed', {
  status: 405,
  headers: {
    Allow: 'POST',
    'Cache-Control': NO_STORE,
  },
});

const handleContactPost = async (request, env) => {
  try {
    const form = await request.formData();
    if (form.get('bot-field')) return redirect('/thanks/');

    const data = {
      name: clean(form.get('name'), 120),
      business: clean(form.get('business'), 160) || '(not provided)',
      email: clean(form.get('email'), 200),
      phone: clean(form.get('phone'), 60) || '(not provided)',
      website: clean(form.get('website'), 300) || '(not provided)',
      industry: clean(form.get('industry'), 160) || '(not provided)',
      service: clean(form.get('service'), 160),
      budget: clean(form.get('budget'), 100) || '(not provided)',
      contactMethod: clean(form.get('contactMethod'), 80) || '(no preference)',
      objective: clean(form.get('objective'), 4000),
      consent: form.get('consent') === 'yes',
      submittedAt: new Date().toISOString(),
    };

    if (!data.name || !validEmail(data.email) || !data.service || !data.objective || !data.consent) {
      return redirect('/contact/?submitted=error');
    }

    if (!env.RESEND_API_KEY) {
      console.error('RESEND_API_KEY is not configured');
      return redirect('/contact/?submitted=error');
    }

    const from = env.CONTACT_FROM || 'Local Foundary Website <noreply@localfoundary.co.uk>';
    const to = env.CONTACT_TO || 'info@localfoundary.co.uk';
    const message = `New Local Foundary project enquiry
─────────────────────────
Name:      ${data.name}
Business:  ${data.business}
Email:     ${data.email}
Phone:     ${data.phone}
Website:   ${data.website}
Industry:  ${data.industry}
Support:   ${data.service}
Budget:    ${data.budget}
Contact:   ${data.contactMethod}
Consent:   Yes

Main business objective:
${data.objective}
─────────────────────────
Submitted: ${data.submittedAt}`;

    const notification = await sendEmail(env.RESEND_API_KEY, {
      from,
      to: [to],
      reply_to: data.email,
      subject: `New project enquiry — ${data.business === '(not provided)' ? data.name : data.business}`,
      text: message,
    });

    if (!notification.ok) {
      console.error('Resend notification failed', notification.status);
      return redirect('/contact/?submitted=error');
    }

    const acknowledgement = await sendEmail(env.RESEND_API_KEY, {
      from,
      to: [data.email],
      reply_to: to,
      subject: 'We received your Local Foundary enquiry',
      text: `Hi ${data.name},

Thanks for getting in touch with Local Foundary. Your enquiry has arrived safely and we aim to reply personally within two working days.

You can reply to this email if there is anything else we should know.

Local Foundary`,
    });

    if (!acknowledgement.ok) {
      console.error('Resend acknowledgement failed', acknowledgement.status);
    }

    return redirect('/thanks/');
  } catch (error) {
    console.error('Contact form request failed', error instanceof Error ? error.message : 'Unknown error');
    return redirect('/contact/?submitted=error');
  }
};

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === '/api/contact' || url.pathname === '/api/contact/') {
      const response = request.method === 'POST'
        ? await handleContactPost(request, env)
        : methodNotAllowed();

      if (url.hostname.endsWith('.workers.dev')) {
        response.headers.set('X-Robots-Tag', 'noindex, nofollow');
      }
      return response;
    }

    const assetResponse = await env.ASSETS.fetch(request);
    const headers = new Headers(assetResponse.headers);
    const isAsset = url.pathname.startsWith('/assets/');

    headers.set('Cache-Control', isAsset ? ASSET_CACHE : HTML_CACHE);
    if (url.hostname.endsWith('.workers.dev')) {
      headers.set('X-Robots-Tag', 'noindex, nofollow');
    }

    if (assetResponse.status === 307) {
      return new Response(null, {
        status: 301,
        headers,
      });
    }

    return new Response(assetResponse.body, {
      status: assetResponse.status,
      statusText: assetResponse.statusText,
      headers,
    });
  },
};
