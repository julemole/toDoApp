import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'acc_ToDoApp',
  webDir: 'www',
  plugins: {
    FirebaseRemoteConfig: {
      minimumFetchIntervalInSeconds: 0
    }
  }
};

export default config;
