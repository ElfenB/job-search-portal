import type { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "com.benelfen.jobsearchportal",
  appName: "job-search-portal",
  server: {
    androidScheme: "https",
  },
  webDir: "dist",
};

export default config;
