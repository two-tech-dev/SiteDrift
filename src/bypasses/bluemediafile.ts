import BypassDefinition from './BypassDefinition';

export default class Bluemediafile extends BypassDefinition {
  constructor() {
    super();
    this.ensure_dom = true;
  }

  execute() {
    if (location.href.match(/\/url-generator(-\d+)?\.php\?url=/) === null)
      return;

  // @ts-ignore
    window.Time_Start -= 5000;
  // @ts-ignore
    window.i = 0;
    this.helpers.awaitElement('input#nut[src]', (i) => i.parentNode.submit());
  }
}

export const matches = [
  'bluemediafiles.com',
  'bluemediafile.sbs',
  'bluemediafile.site',
];
