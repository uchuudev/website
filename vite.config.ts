import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import solid from "vite-plugin-solid";
import vercel from 'vite-plugin-vercel';

export default defineConfig({
  plugins: [solid(), tailwindcss(), vercel()],
  server: {
    port: process.env.PORT as unknown as number,
  },
});
