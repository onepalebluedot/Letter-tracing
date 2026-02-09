export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const pathname = url.pathname === "/" ? "/index.html" : url.pathname;
    const defaultAssetUrl = new URL(url);
    defaultAssetUrl.pathname = pathname;

    const defaultAssetResponse = await env.ASSETS.fetch(
      new Request(defaultAssetUrl.toString(), request)
    );
    if (defaultAssetResponse.status !== 404 || pathname.startsWith("/public/")) {
      return defaultAssetResponse;
    }

    // Fallback for misconfigured assets directory that points to repo root.
    const publicAssetUrl = new URL(url);
    publicAssetUrl.pathname = `/public${pathname}`;
    return env.ASSETS.fetch(new Request(publicAssetUrl.toString(), request));
  }
};
