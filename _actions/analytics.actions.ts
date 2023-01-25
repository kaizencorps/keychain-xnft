import mixpanel from 'mixpanel-browser';
import { EVENTS } from '../constants/analytics';
import {ENABLE_ANALYTICS, MIXPANEL_API_KEY} from "../types/utils/config";

function useAnalyticsActions() {
  const enabled = ENABLE_ANALYTICS;
  const DEFAULT_PROPS = {
    System: 'Vanguard',
  };

  if (enabled) {
    mixpanel.init(MIXPANEL_API_KEY);
  }

  function identify(keychainName) {
    if (enabled) {
      mixpanel.identify(keychainName);
    }
  }

  // add another identifier for this player
  function alias(aliasId, originalId) {
    if (enabled) {
      mixpanel.alias(aliasId, originalId);
    }
  }

  function trackEvent(eventName, properties = {}) {
    if (enabled) {
      // mixpanel.track(`app:${object}_${action}`);
      mixpanel.track(eventName, { ...DEFAULT_PROPS, ...properties });
    }
  }

  function trackPage(page, properties = {}) {
    if (enabled) {
      // mixpanel.track(`app:page_${page}`);
      mixpanel.track(EVENTS.pageView, {
        ...DEFAULT_PROPS,
        Page: page,
        ...properties,
      });
    }
  }

  function trackClick(name, properties = {}) {
    if (enabled) {
      trackEvent(EVENTS.click, {
        name,
        ...properties,
      });
    }
  }

  return {
    identify,
    alias,
    trackEvent,
    trackPage,
    trackClick,
  };
}

export { useAnalyticsActions };
