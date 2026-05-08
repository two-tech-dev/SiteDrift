import BypassDefinition from './BypassDefinition';

export default class PS4Linux extends BypassDefinition {
  constructor() {
    super();
    this.ensure_dom = true;
  }

  execute() {
    const targetURL = (
      document.querySelector(
        '#skipaft > a:nth-child(1)'
      ) as HTMLAnchorElement | null
    )?.href;
    if (targetURL) {
      this.helpers.safelyNavigate(targetURL);
    }
  }
}

export const matches = ['ps4linux.com'];
