import BypassDefinition from './BypassDefinition';

export default class Onelink extends BypassDefinition {
  constructor() {
    super();
    this.ensure_dom = true;
  }

  execute() {
  // @ts-ignore
    window.setInterval = f => setInterval(f, 1);
    let b = document.getElementById('go_next');
  // @ts-ignore
    if (b && this.helpers.isGoodLink(b.href)) {
  // @ts-ignore
      this.helpers.safelyAssign(b.href);
    } else {
      this.helpers.ifElement('#download', b => this.helpers.safelyNavigate(b.href));
    }
  }
}

export const matches = ['1link.club'];
