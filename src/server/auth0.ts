import { ManagementClient } from "auth0";

export function getAuth0Client() {
  if (!process.env.VITE_AUTH0_DOMAIN) {
    throw new Error('VITE_AUTH0_DOMAIN is not defined')
  }
  if (!process.env.AUTH0_CLIENT_ID_API) {
    throw new Error('AUTH0_CLIENT_ID_API is not defined')
  }
  if (!process.env.AUTH0_CLIENT_SECRET_API) {
    throw new Error('AUTH0_CLIENT_SECRET_API is not defined')
  }

  return new ManagementClient({
    clientId: process.env.AUTH0_CLIENT_ID_API,
    clientSecret: process.env.AUTH0_CLIENT_SECRET_API,
    domain: process.env.VITE_AUTH0_DOMAIN,
  });
}
