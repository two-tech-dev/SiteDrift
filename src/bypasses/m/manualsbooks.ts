import BypassDefinition from '../BypassDefinition';

export default class Manualsbooks extends BypassDefinition {
  constructor() {
    super();
  }

  execute() {
    this.helpers.ensureDomLoaded(() => {
      const downloadEl = document.getElementById(
        'download'
      ) as HTMLAnchorElement | null;
      if (downloadEl) {
        this.helpers.safelyNavigate(downloadEl.href);
      }
    });
  }
}

export const matches = ['manualsbooks.com'];
