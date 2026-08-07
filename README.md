# Uchuu website

The Uchuu landing page is a Svelte 5 and Vite application deployed as static
assets on Cloudflare Workers.

## Development

This repository uses Bun 1.3.0.

```sh
bun install
bun run dev
```

Create a production build and preview it locally with:

```sh
bun run build
bun run preview
```

## Cloudflare deployment

The Worker is configured in `wrangler.jsonc`. To deploy from an authenticated
local environment, run:

```sh
bun run deploy
```

For automatic deployments, import `uchuudev/website` from **Workers & Pages**
in the Cloudflare dashboard and use these settings:

- Production branch: `main`
- Build command: `bun run build`
- Deploy command: `bunx wrangler deploy`
- Non-production deploy command: `bunx wrangler versions upload`
- Root directory: `/`

The Cloudflare Worker name must be `uchuu-website` to match `wrangler.jsonc`.
The same file routes both production hostnames to the Worker; requests to
`uchuu.dev` are permanently redirected to `www.uchuu.dev` by `src/worker.ts`.
