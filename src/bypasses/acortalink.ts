import BypassDefinition from './BypassDefinition';

export default class Acortalink extends BypassDefinition {
  constructor() {
    super();
    this.ensure_dom = true;
  }

  execute() {
    function rot13(str) {
      const input = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
      const output = 'NOPQRSTUVWXYZABCDEFGHIJKLMnopqrstuvwxyzabcdefghijklm';
      const index = (x) => input.indexOf(x);
      const translate = (x) => (index(x) > -1 ? output[index(x)] : x);
      return str.split('').map(translate).join('');
    }
    // Triggered on example.com and subdomains (e.g. www.example.com)
    this.helpers.ensureDomLoaded(() => {
      // Triggered as soon as the DOM is ready
      (window as any).open = (linkacorta: string | URL) => {
        this.helpers.safelyNavigate(
          rot13(atob((linkacorta as string).substring(30)))
        );
      };
      GetLink();
    });
  }
}

export const matches = ['acortalink.me'];
