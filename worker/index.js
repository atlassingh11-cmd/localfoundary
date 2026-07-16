const HTML_CACHE = 'public, max-age=0, must-revalidate';
const ASSET_CACHE = 'public, max-age=31536000, immutable';

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
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
