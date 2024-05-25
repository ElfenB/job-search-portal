import type { CorsOptions } from "cors";

const whitelistFromEnv = process.env.CORS_WHITELIST

// Fallback to localhost for development
const whitelist = whitelistFromEnv ? whitelistFromEnv.split(',') : ['http://localhost:8100']

export const corsOptions: CorsOptions = {
  origin: (origin, callback) => {
    if (!origin || whitelist.includes(origin)) {
      callback(null, true);
    } else {
      console.error(`Origin ${origin} not allowed by CORS`);
      callback(null, false);
    }
  }
};
