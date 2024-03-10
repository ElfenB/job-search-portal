/// <reference types="vite/client" />

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
interface ImportMetaEnv {
  readonly VITE_AUTH0_CLIENT_ID: string;
  readonly VITE_AUTH0_CLIENT_ID_WEB: string;
  readonly VITE_AUTH0_DOMAIN: string;
  // more env variables...
}
