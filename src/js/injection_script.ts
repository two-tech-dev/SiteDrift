import domHelpers from '../helpers/dom';

const bypassModules = import.meta.glob('../bypasses/**/*.ts', { eager: true });

function matchingBypass(bypasses: any) {
  for (const [path, module] of Object.entries(bypasses)) {
    const matches = (module as any).matches;
    if (!matches) continue;
    for (const key of matches) {
      if (key instanceof RegExp) {
        if (key.test(location.href)) {
          return module;
        }
      } else if (typeof key === 'string') {
        if (key.charAt(0) === '/' && key.charAt(key.length - 1) === '/') {
          const pattern = new RegExp(key.substring(1, key.length - 1));
          if (pattern.test(location.href)) {
            return module;
          }
        } else if (key === location.host) {
          return module;
        }
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

  // Phase 3: Notify content_script about bypass trigger for stats
  document.dispatchEvent(
    new CustomEvent('sd5a79e655f0_bypassTriggered', {
      detail: { domain: location.host },
    })
  );

  // Phase 2: Error boundary — bypass crash won't break the page
  const safeExecute = () => {
    try {
      bps.execute();
    } catch (err) {
      console.error('[SiteDrift] Bypass crashed:', err);
    }
  };

  if (bps.ensure_dom) {
    let executed = false;
    document.addEventListener('readystatechange', () => {
      if (
        ['interactive', 'complete'].includes(document.readyState) &&
        !executed
      ) {
        executed = true;
        safeExecute();
      }
    });
    document.addEventListener('DOMContentLoaded', () => {
      if (!executed) {
        executed = true;
        safeExecute();
      }
    });
  } else {
    safeExecute();
  }
}
