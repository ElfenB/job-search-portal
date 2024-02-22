import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.benelfen.jobsearchportal',
  appName: 'job-search-portal',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  }
};

export default config;
