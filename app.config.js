import 'dotenv/config';

const envs = {
  prod: {
    name: 'Keychain',
    slug: 'keychain',
    // bundleIdentifier: '',
    // package: '',
  },
  dev: {
    name: 'Keychain Dev',
    slug: 'keychain-dev',
    // bundleIdentifier: '',
    // package: '',
  }
};

const getEnv = () => envs[process.env.APP_ENV] ?? envs.dev;


export default {
  expo: {
    name: getEnv().name,
    slug: getEnv().slug,
    entryPoint: './App.tsx',
    scheme: 'keychain',
    // owner: '',
    version: '0.0.1',
    // icon: '',
    // splash: {
    //   image: '',
    //   resizeMode: 'cover',
    //   backgroundColor: '#ffffff',
    // },
    updates: {
      fallbackToCacheTimeout: 0,
    },
    assetBundlePatterns: ['**/*'],
    notification: {
      iosDisplayInForeground: true,
      // color: '',
      // icon: ''
    },
    ios: {
      supportsTablet: true,
      requireFullScreen: true,
      // bundleIdentifier: getEnv().bundleIdentifier,
    },
    android: {
      // googleServicesFile: './google-services.json',
      // package: getEnv().package,
    },
    // web: {
    //   favicon: './assets/pngs/favicon.png',
    // },
    extra: {
      ENV: process.env.ENV,
      BASE_API_URL: process.env.BASE_API_URL,
      RPC_ENDPOINT: process.env.RPC_ENDPOINT,
      SOLANA_NETWORK: process.env.SOLANA_NETWORK,
      KEYCHAIN_TREASURY: process.env.KEYCHAIN_TREASURY,
      HELIUS_API_KEY: process.env.HELIUS_API_KEY,
      KAIZEN_CORPS_URL: process.env.KAIZEN_CORPS_URL
    },
  },
};
