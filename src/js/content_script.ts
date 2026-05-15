declare const browser: typeof chrome;
const brws = typeof browser !== 'undefined' ? browser : chrome;
interface Options {
  optionCrowdBypass?: boolean;
  optionBlockIpLoggers?: boolean;
  optionTrackerBypass?: boolean;
  optionInstantNavigationTrackers?: boolean;
  whitelist?: string;
  [key: string]: unknown;
}

async function getOptions(): Promise<Options> {
  const result = await brws.storage.local.get('options');
  return result.options as Options;
}

function getExtBaseURL() {
  return brws.runtime.getURL('/');
}

async function injectScript() {
  const enabledResult = await brws.storage.local.get('extensionEnabled');
  if (enabledResult.extensionEnabled === false) {
    console.log('SiteDrift: Extension disabled');
    return;
  }
  const options = await getOptions();
  if (
    options &&
    options.whitelist &&
    matchDomains(window.location.hostname, options.whitelist)
  ) {
    console.log('SiteDrift: Site whitelisted');
    return;
  }
  const script = document.createElement('script');
  script.src =
    brws.runtime.getURL('injection_script.js') +
    '?' +
    new URLSearchParams({ ext_base_URL: getExtBaseURL() }); //pass base url to injection script https://stackoverflow.com/a/9517879
  script.onload = function () {
    script.remove();
  };
  (document.head || document.documentElement).appendChild(script);
}

//ff + first 10 characters of SHA256 of sitedrift to prevent collisions
document.addEventListener('sd5a79e655f0_crowdQuery', async (event: Event) => {
  const data = (event as CustomEvent).detail;
  const response = await brws.runtime.sendMessage({
    type: 'crowdQuery',
    detail: data,
  });
  console.log(response);
  document.dispatchEvent(
    new CustomEvent('sd5a79e655f0_crowdResponse', { detail: response })
  );
});

function matchDomains(inputString, domains) {
  const domainList = domains.split('\n');
  for (const domain of domainList) {
    const regex = new RegExp('^' + domain.replace(/\*/g, '[^.]+') + '$');
    if (regex.test(inputString)) {
      return true;
    }
  }
  return false;
}

document.addEventListener('sd5a79e655f0_crowdContribute', (event: Event) => {
  const data = (event as CustomEvent).detail;
  brws.runtime.sendMessage({
    type: 'crowdContribute',
    detail: data,
  });
});
document.addEventListener('sd5a79e655f0_followAndContribute', (event: Event) => {
  const data = (event as CustomEvent).detail;
  brws.runtime.sendMessage({
    type: 'followAndContribute',
    detail: data,
  });
});

function onFFClipboardSet(event: Event) {
  const { key, value } = (event as CustomEvent).detail;
  brws.storage.local.get('ffclipboard', (result) => {
    const ffclipboard = result.ffclipboard || {};
    ffclipboard[key] = value;
    brws.storage.local.set({ ffclipboard });
  });
}

function onFFClipboardGet(event: Event) {
  const { key } = (event as CustomEvent).detail;
  brws.storage.local.get('ffclipboard', (result) => {
    const value = result.ffclipboard ? result.ffclipboard[key] : undefined;
    const responseEvent = new CustomEvent('sd5a79e655f0_ffclipboardResponse', {
      detail: { key, value },
    });
    document.dispatchEvent(responseEvent);
  });
}

function onFFClipboardClear(event: Event) {
  const { key } = (event as CustomEvent).detail;
  brws.storage.local.get('ffclipboard', (result) => {
    if (result.ffclipboard) {
      delete result.ffclipboard[key];
      brws.storage.local.set({ ffclipboard: result.ffclipboard });
    }
  });
}

injectScript();
document.addEventListener('sd5a79e655f0_ffclipboardSet', onFFClipboardSet);
document.addEventListener('sd5a79e655f0_ffclipboardGet', onFFClipboardGet);
document.addEventListener('sd5a79e655f0_ffclipboardClear', onFFClipboardClear);

export {};
