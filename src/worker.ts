interface Env {
  ASSETS: {
    fetch(input: RequestInfo | URL, init?: RequestInit): Promise<Response>;
  };
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    if (url.hostname === "uchuu.dev") {
      url.hostname = "www.uchuu.dev";
      return Response.redirect(url, 308);
    }

    return env.ASSETS.fetch(request);
  },
};
