import { defineConfig, loadEnv, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { submitContact, type ContactPayload } from './functions/lib/submit-contact';

/** Mirrors the Cloudflare Pages Function locally so Turnstile + mail work on `npm run dev`. */
function devContactApi(): Plugin {
  return {
    name: 'dev-contact-api',
    configureServer(server) {
      server.middlewares.use('/api/contact', async (req, res, next) => {
        if (req.method !== 'POST') {
          next();
          return;
        }

        const env = loadEnv(server.config.mode, server.config.root, '');
        const chunks: Buffer[] = [];

        req.on('data', (chunk) => chunks.push(chunk));
        req.on('end', async () => {
          try {
            const payload = JSON.parse(Buffer.concat(chunks).toString()) as ContactPayload;
            const result = await submitContact(payload, {
              turnstileSecret: env.TURNSTILE_SECRET_KEY,
              web3formsKey: env.WEB3FORMS_ACCESS_KEY,
            });

            res.statusCode = result.ok ? 200 : result.status;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(result.ok ? { success: true } : { success: false, message: result.message }));
          } catch {
            res.statusCode = 500;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ success: false }));
          }
        });
      });
    },
  };
}

// https://vite.dev/config/
// `base: './'` keeps all built asset paths relative, which is required
// for a plain static FTP deployment to a domain root (rymn.me).
export default defineConfig({
  plugins: [react(), tailwindcss(), devContactApi()],
  base: './',
  server: {
    host: true,
    port: 5180,
    strictPort: true,
  },
});
