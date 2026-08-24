/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Public Web3Forms access key - safe on the client, forwards submissions to kontakt.rymn@gmail.com. */
  readonly VITE_WEB3FORMS_ACCESS_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
