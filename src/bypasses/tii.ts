import BypassDefinition from './BypassDefinition';

export default class TiiLa extends BypassDefinition {
  constructor() {
    super();
    this.ensure_dom = true;
  }

  execute() {
    const urlObj = new URL(window.location.href)
    this.helpers.crowdQuery('tii.la', urlObj.pathname.slice(1)).then((dest) => {
        this.helpers.crowdNavigate(dest)
      });
      /*keep checking for the button*/
    setInterval(() => {
        const button = document.querySelector("a.btn.btn-success.btn-lg.get-link");
  // @ts-ignore
        if (button && button.href) {
  // @ts-ignore
            this.helpers.crowdContribute('tii.la', urlObj.pathname.slice(1), button.href)
  // @ts-ignore
            this.helpers.safelyNavigate(button.href)
        }
      }, 500);
    
  }
}

export const matches = ['tii.la'];
