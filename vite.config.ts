import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import vercel from 'vite-plugin-vercel';

export default defineConfig({
  plugins: [svelte(), tailwindcss(), vercel()],
  server: {
    port: process.env.PORT as unknown as number,
  },
});
