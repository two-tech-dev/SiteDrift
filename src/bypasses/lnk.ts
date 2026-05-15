import BypassDefinition from './BypassDefinition';

export default class Lnk extends BypassDefinition {
  constructor() {
    super();
    this.ensure_dom = true;
    // custom bypass required bases can be set here
  }

  execute() {
    if (!window.location.href.includes('/go/')) {
      //Insert /go/ inbetween the domain and the rest of the url
      this.helpers.safelyNavigate(window.location.href.replace(/(https?:\/\/[^/]+)(\/.*)/, '$1/go$2'));
    }
    (document.getElementById('get_link_btn') as HTMLElement | null)?.click();
  }
}

export const matches = ['lnk.parts', 'icerik.site'];

