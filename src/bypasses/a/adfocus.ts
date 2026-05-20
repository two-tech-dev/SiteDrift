import BypassDefinition from '../BypassDefinition';

export default class Adfocus extends BypassDefinition {
  constructor() {
    super();
    this.ensure_dom = true;
  }

  execute() {
    for (const script of document.scripts) {
      const match = script.textContent?.match(
        /var\s+click_url\s*=\s*["']([^"']+)["']/
      );
      if (match && match[1]) {
        this.helpers.safelyNavigate(match[1]);
        return;
      }
    }
  }
}

export const matches = ['adfoc.us'];
