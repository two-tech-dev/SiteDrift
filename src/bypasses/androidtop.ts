import BypassDefinition from './BypassDefinition';

export default class Androidtop extends BypassDefinition {
  constructor() {
    super();
    this.ensure_dom = true;
  }

  execute() {
    // If the variable downloadTimer is defined, then use clearInterval to stop the timer.
    document.querySelector('.counterhide').setAttribute('style', 'opacity: 0; visibility: hidden; height: 0px;');
    document.querySelector('.download-result').setAttribute('style', 'opacity: 1; visibility: visible;');
  }
}

export const matches = ['androidtop.net'];
