import * as domHelpers from '../helpers/dom';

const bypassModules = import.meta.glob('../bypasses/*.ts', { eager: true });

function matchingBypass(bypasses: any) {
  for (const [path, module] of Object.entries(bypasses)) {
    const matches = (module as any).matches;
    if (!matches) continue;
    for (const key of matches) {
      if (key.charAt(0) === '/' && key.charAt(key.length - 1) === '/') {
        let pattern = new RegExp(key.substring(1, key.length - 1));
        if (pattern.test(location.href)) {
          return module;
        }
      } else if (key === location.host) {
        return module;
      }
    }
  }
  return null;
}

const match = matchingBypass(bypassModules);
if (match) {
  const BypassClass = (match as any).default;
  const bps = new BypassClass();
  bps.set_helpers(domHelpers);
  console.log(`ensure_dom: ${bps.ensure_dom}`);
  if (bps.ensure_dom) {
    let executed = false;
    document.addEventListener('readystatechange', () => {
      if (
        ['interactive', 'complete'].includes(document.readyState) &&
        !executed
      ) {
        executed = true;
        bps.execute();
      }
    });
    document.addEventListener('DOMContentLoaded', () => {
      if (!executed) {
        executed = true;
        bps.execute();
      }
    });
  } else {
    bps.execute();
  }
}
