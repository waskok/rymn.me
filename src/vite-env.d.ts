/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Public Cloudflare Turnstile site key — rendered in the contact form widget. */
  readonly VITE_TURNSTILE_SITE_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
