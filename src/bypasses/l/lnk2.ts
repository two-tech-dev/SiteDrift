import BypassDefinition from '../BypassDefinition';

export default class Lnk2 extends BypassDefinition {
  constructor() {
    super();
    this.ensure_dom = true;
  }

  execute() {
    if (window.location.pathname.startsWith('/go/')) {
      const form = document.querySelector('form') as HTMLFormElement | null;
      if (form) form.submit();
    } else {
      const btn = document.getElementById('getLink');
      if (btn) btn.removeAttribute('disabled');
      this.helpers.insertInfoBox(
        'Please complete the captcha, then we can bypass you'
      );
    }
  }
}

export const matches = ['lnk2.cc'];
