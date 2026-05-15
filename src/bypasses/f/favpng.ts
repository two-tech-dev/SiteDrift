import BypassDefinition from '../BypassDefinition';

export default class Favpng extends BypassDefinition {
  constructor() {
    super();
    this.ensure_dom = true;
  }

  execute() {
    const scripts = document.getElementsByTagName('script');
    for (let i = 0; i < scripts.length; i++) {
      const script = scripts[i];
      if (script.textContent.includes('https://download.favpng.com/api_download.php?')) {
        const startIndex = script.textContent.indexOf('https://download.favpng.com/api_download.php?');
        const endIndex = script.textContent.indexOf('"', startIndex);
        this.helpers.safelyNavigate(script.textContent.substring(startIndex, endIndex));
      }
    }
  }
}

export const matches = ['favpng.com'];
