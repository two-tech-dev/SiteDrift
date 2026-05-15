import BypassDefinition from '../BypassDefinition';

export default class Onelink extends BypassDefinition {
  constructor() {
    super();
    this.ensure_dom = true;
  }

  execute() {
    (window as any).setInterval = ((f) => setInterval(f, 1)) as any;
    const b = document.getElementById('go_next') as HTMLAnchorElement | null;
    if (b && this.helpers.isGoodLink(b.href)) {
      this.helpers.safelyAssign(b.href);
    } else {
      this.helpers.ifElement('#download', (el: HTMLAnchorElement) =>
        this.helpers.safelyNavigate(el.href)
      );
    }
  }
}

export const matches = ['1link.club'];
