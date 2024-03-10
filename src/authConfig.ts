import type { Auth0ProviderOptions } from "@auth0/auth0-react";
import { isNative } from "./utils/isNative";

export const authConfig: Auth0ProviderOptions = {
  authorizationParams: {
    // eslint-disable-next-line camelcase
    redirect_uri: isNative ? `com.benelfen.jobsearchportal://${import.meta.env.VITE_AUTH0_DOMAIN}/capacitor/com.benelfen.jobsearchportal/callback` : window.location.origin,
  },
  clientId: isNative ? import.meta.env.VITE_AUTH0_CLIENT_ID : import.meta.env.VITE_AUTH0_CLIENT_ID_WEB,
  domain: import.meta.env.VITE_AUTH0_DOMAIN,
  useRefreshTokens: true,
  useRefreshTokensFallback: false,
};