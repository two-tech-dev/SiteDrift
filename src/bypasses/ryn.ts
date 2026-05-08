import BypassDefinition from './BypassDefinition';

export default class Ryn extends BypassDefinition {
  constructor() {
    super();
    // custom bypass required bases can be set here
  }

  execute() {
    if (typeof countdown == 'function') {
      document.write('<div id="link"><p id="timer">0</p></div>');
      countdown();
      this.helpers.safelyNavigate((document.querySelector('#link > a') as HTMLAnchorElement | null)?.href);
    }
  }
}

export const matches = ['ryn.cc'];
