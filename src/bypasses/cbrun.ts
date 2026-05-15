import BypassDefinition from './BypassDefinition';

export default class Cbrun extends BypassDefinition {
  constructor() {
    super();
    this.ensure_dom = true;
  }
  execute() {
    const a = document.querySelector('a.btn') as HTMLAnchorElement | null;
    if (a) {
      this.helpers.safelyNavigate(a.href);
    }
  }
}

export const matches = ['cb.run', 'cb.click'];
