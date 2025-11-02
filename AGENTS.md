# AGENTS.md
- Repo uses Bun 1.3.0; sync deps with `bun install`.
- Dev server: `bun run dev`; production build: `bun run build`; preview: `bun run preview`.
- No lint or test scripts yet—coordinate before adding new tooling.
- When tests exist prefer `bun test`; run one file via `bun test path/to/spec.ts`.
- Svelte 5 + Vite core with Tailwind 4 and D3 integrations.
- Keep third-party imports before relative modules; group styles/assets last.
- Maintain double quotes and semicolons in TS/JS to match current style.
- Follow two-space indentation, LF endings, and final newline per .editorconfig.
- Use `<script lang="ts">` blocks first, markup second, local helpers third.
- Favor `const` for immutable values; reserve `let` for reactive Svelte state.
- Export component props with explicit types; annotate DOM refs like `HTMLDivElement`.
- Lifecycle hooks (`onMount`, `onDestroy`) must add and clean up listeners/timers.
- Reactive statements should guard prerequisites before mutating state.
- D3 helpers should return cleanup callbacks and clear selections on resize.
- Guard DOM-dependent logic with null checks before accessing properties.
- Tailwind utility classes drive layout; keep global CSS limited to `src/index.css`.
- Avoid introducing default exports in utilities; prefer named functions.
- Environment tweaks live in `vite.config.ts`; extend plugins sparingly and sort imports.
- No Cursor or Copilot instruction files currently exist; nothing additional to inherit.

--

In addition you are able to use the Svelte MCP server, where you have access to comprehensive Svelte 5 and SvelteKit documentation. Here's how to use the available tools effectively:

## Available MCP Tools:

### 1. list-sections

Use this FIRST to discover all available documentation sections. Returns a structured list with titles, use_cases, and paths.
When asked about Svelte or SvelteKit topics, ALWAYS use this tool at the start of the chat to find relevant sections.

### 2. get-documentation

Retrieves full documentation content for specific sections. Accepts single or multiple sections.
After calling the list-sections tool, you MUST analyze the returned documentation sections (especially the use_cases field) and then use the get-documentation tool to fetch ALL documentation sections that are relevant for the user's task.

### 3. svelte-autofixer

Analyzes Svelte code and returns issues and suggestions.
You MUST use this tool whenever writing Svelte code before sending it to the user. Keep calling it until no issues or suggestions are returned.

### 4. playground-link

Generates a Svelte Playground link with the provided code.
After completing the code, ask the user if they want a playground link. Only call this tool after user confirmation and NEVER if code was written to files in their project.
