import * as constants from './constants';

declare const browser: typeof chrome;

const isFirefox = /Firefox/i.test(navigator.userAgent);

// Check if the browser is Firefox
if (isFirefox) {
  browser.runtime.onInstalled.addListener((details) => {
    if (details.reason === 'install') {
      browser.storage.local.get('consentStatus').then(function (data) {
        const consentStatus = data.consentStatus;
        if (consentStatus !== 'granted') {
          browser.tabs.create({
            url: 'html/consent.html',
          });
          return;
        }
      });
      return;
    }
  });
}

const brws = typeof browser !== 'undefined' ? browser : chrome;
const fetchDomains = ['crowd.sitedrift.team', 'redirect-api.work.ink']; //only allow requests to these domains

interface Options {
  optionCrowdBypass?: boolean;
  optionBlockIpLoggers?: boolean;
  optionTrackerBypass?: boolean;
  optionInstantNavigationTrackers?: boolean;
  whitelist?: string;
  [key: string]: unknown;
}

interface Stats {
  totalBypasses: number;
  timeSavedSeconds: number;
  lastBypass: string;
}

async function getOptions(): Promise<Options> {
  const result = await brws.storage.local.get('options');
  return result.options as Options;
}

function ffclipboardClear() {
  brws.storage.local.set({ ff_clipboard: '{}' });
}

function clearCrowdIgnoredURLs() {
  brws.storage.local.set({ crowd_ignore: '{}' });
}

function firstrun(details) {
  if (details.reason == 'install' || details.reason == 'update') {
    brws.tabs.create({ url: 'https://sitedrift.team/firstrun' });
    ffclipboardClear();
    brws.storage.local.set({ tempDisableCrowd: 'false' });
    brws.storage.local.set({ version: brws.runtime.getManifest().version });
    brws.runtime.openOptionsPage(); //required for loading default options, to do: implement a better way
    brws.declarativeNetRequest.updateDynamicRules({
      addRules: constants.beforeNavigateRules,
      removeRuleIds: constants.beforeNavigateRules.map((rule) => rule.id),
    });
    // Register injection_script on install/update
    registerInjectionScript();
  }
}

// === Dynamic injection_script registration (Phase 1) ===

const INJECTION_SCRIPT_ID = 'sitedrift-injection';

function whitelistToExcludeMatches(whitelist: string): string[] {
  if (!whitelist || !whitelist.trim()) return [];
  return whitelist
    .split('\n')
    .map((d) => d.trim())
    .filter(Boolean)
    .map((domain) => `*://${domain}/*`);
}

async function registerInjectionScript() {
  // Unregister first to avoid duplicate
  try {
    await brws.scripting.unregisterContentScripts({ ids: [INJECTION_SCRIPT_ID] });
  } catch {
    // Script not registered yet, ignore
  }

  const result = await brws.storage.local.get(['extensionEnabled', 'options']);
  if (result.extensionEnabled === false) {
    console.log('SiteDrift: Extension disabled, not registering injection script');
    return;
  }

  const options = (result.options || {}) as Options;
  const excludeMatches = whitelistToExcludeMatches(options.whitelist || '');

  const scriptConfig: any = {
    id: INJECTION_SCRIPT_ID,
    matches: ['<all_urls>'],
    js: ['injection_script.js'],
    runAt: 'document_start',
    world: 'MAIN',
  };

  if (excludeMatches.length > 0) {
    scriptConfig.excludeMatches = excludeMatches;
  }

  try {
    await brws.scripting.registerContentScripts([scriptConfig]);
    console.log('SiteDrift: Injection script registered');
  } catch (err) {
    console.error('SiteDrift: Failed to register injection script', err);
  }
}

function preflight(details) {
  const url = new URL(details.url);
  if (url.hostname !== 'sitedrift.team') {
    return;
  }
  //navigate
  if (url.pathname === '/bypassed') {
    const ext_url = new URL(brws.runtime.getURL(''));
    url.hostname = ext_url.hostname;
    url.protocol = ext_url.protocol;
    if (url.searchParams.get('crowd') === 'true') {
      url.pathname = '/src/html/crowd-bypassed.html';
    } else {
      url.pathname = '/src/html/before-navigate.html';
    }

    brws.tabs.update(details.tabId, {
      url: url.href,
    });
  }
}

function reEnableCrowdBypassStartup() {
  brws.storage.local.get(['tempDisableCrowd']).then((result) => {
    if (result.tempDisableCrowd === 'true') {
      brws.storage.local.get(['options']).then((result) => {
        const opt = result.options as Options;
        opt.optionCrowdBypass = true;
        brws.storage.local.set({ options: opt });
      });
    }
    brws.storage.local.set({ tempDisableCrowd: 'false' });
  });
}

brws.alarms.onAlarm.addListener((alarm) => {
  brws.storage.local.get(['tempDisableCrowd']).then((result) => {
    if (
      alarm.name === 'enableCrowdBypass' &&
      result.tempDisableCrowd === 'true'
    ) {
      brws.storage.local.get(['options']).then((result) => {
        const opt = result.options as Options;
        opt.optionCrowdBypass = true;
        brws.storage.local.set({ options: opt });
        brws.storage.local.set({ tempDisableCrowd: 'false' });
      });
    }
  });
});

brws.runtime.onInstalled.addListener(firstrun);
brws.runtime.onStartup.addListener(() => {
  ffclipboardClear();
  clearCrowdIgnoredURLs();
  reEnableCrowdBypassStartup();
  brws.storage.local.set({ version: brws.runtime.getManifest().version });
  registerInjectionScript();
});

brws.runtime.onMessage.addListener((request, _, sendResponse) => {
  (async () => {
    // Phase 3: Stats tracking
    if (request.type === 'bypassTriggered') {
      const result = await brws.storage.local.get('stats');
      const stats: Stats = (result.stats as Stats) || { totalBypasses: 0, timeSavedSeconds: 0, lastBypass: '' };
      stats.totalBypasses++;
      stats.timeSavedSeconds += 10; // avg 10s saved per bypass
      stats.lastBypass = request.detail?.domain || '';
      brws.storage.local.set({ stats });
      return;
    }

    const options = await getOptions();
    if (options.optionCrowdBypass === false) {
      return;
    }
    let url: string;
    if (request.type === 'crowdQuery') {
      url = 'https://crowd.sitedrift.team/crowd/query_v1';
    } else {
      url = 'https://crowd.sitedrift.team/crowd/contribute_v1';
    }

    const params = new URLSearchParams();

    if (request.type !== 'followAndContribute') {
      for (const key in request.detail) {
        params.append(key, request.detail[key]);
      }
    } else {
      for (const key in request.detail) {
        if (key === 'target') {
          const dest = new URL(request.detail[key]);
          if (!fetchDomains.includes(dest.hostname)) {
            return;
          }
          const res = await fetch(dest.href, {
            method: 'GET',
            redirect: 'follow',
          });
          params.append(key, res.url);
        } else {
          params.append(key, request.detail[key]);
        }
      }
    }

    const response = await fetch(url, {
      method: 'POST',
      body: params.toString(),
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
    if (request.type === 'crowdQuery')
      response.text().then((res) => {
        sendResponse(res);
      });
  })();
  return true;
});

brws.storage.onChanged.addListener((changes) => {
  // Re-register injection script when enabled state or whitelist changes
  if (changes.extensionEnabled || changes.options) {
    registerInjectionScript();
  }

  getOptions().then((options) => {
    if (typeof options === 'undefined') {
      return;
    }
    if (options.optionBlockIpLoggers === false) {
      brws.declarativeNetRequest.updateEnabledRulesets({
        disableRulesetIds: ['ipLoggerRuleset'],
      });
    } else {
      brws.declarativeNetRequest.updateEnabledRulesets({
        enableRulesetIds: ['ipLoggerRuleset'],
      });
    }
    if (options.optionTrackerBypass === false) {
      brws.declarativeNetRequest.updateEnabledRulesets({
        disableRulesetIds: ['trackerRuleset'],
      });
    } else {
      brws.declarativeNetRequest.updateEnabledRulesets({
        enableRulesetIds: ['trackerRuleset'],
      });
    }
  });
});

export {};
