import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// https://vite.dev/config/
// `base: './'` keeps all built asset paths relative, which is required
// for a plain static FTP deployment to a domain root (rymn.me).
export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: './',
});
