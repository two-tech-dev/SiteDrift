declare const browser: typeof chrome;
const brws = typeof browser !== 'undefined' ? browser : chrome;

// injection_script.ts is now injected directly via manifest (world: "MAIN")
// This content_script only handles cross-world event forwarding (clipboard, crowd).

//sd + first 10 characters of SHA256 of sitedrift to prevent collisions
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

document.addEventListener('sd5a79e655f0_ffclipboardSet', onFFClipboardSet);
document.addEventListener('sd5a79e655f0_ffclipboardGet', onFFClipboardGet);
document.addEventListener('sd5a79e655f0_ffclipboardClear', onFFClipboardClear);

export {};
