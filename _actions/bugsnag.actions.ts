import Bugsnag from '@bugsnag/js';
import BugsnagPluginReact from '@bugsnag/plugin-react';
import { consoleLog } from '_helpers/debug';
import Constants from 'expo-constants';

function useBugsnagActions() {
  const enabled = process.env.REACT_APP_ENV === 'prod' || process.env.REACT_APP_ENABLE_BUGSNAG === 'true';

  function start() {
    if (enabled && Constants.expoConfig.extra.BUGSNAG_API_KEY) {
      consoleLog('initializing bugsnag...');
      Bugsnag.start({
        apiKey: Constants.expoConfig.extra.BUGSNAG_API_KEY,
        plugins: [new BugsnagPluginReact()],
      });
    } else {
      consoleLog('bugsnag disabled');
    }
  }

  function setUser(userId: number, wallet: string) {
    if (enabled) {
      Bugsnag.setUser(userId.toString(), wallet);
    }
  }

  function notify(error) {
    if (enabled) {
      Bugsnag.notify(error);
    }
  }

  return {
    enabled,
    start,
    setUser,
    notify,
  };
}

export { useBugsnagActions };
