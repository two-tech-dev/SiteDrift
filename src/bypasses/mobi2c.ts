import BypassDefinition from './BypassDefinition';

export default class Mobi2c extends BypassDefinition {
  constructor() {
    super();
    this.ensure_dom = true;
    // custom bypass required bases can be set here
  }

  execute() {
    this.helpers.setTimeout(() => {
      const submitBtn = document.querySelector(
        '.submitBtn'
      ) as HTMLElement | null;
      if (submitBtn) submitBtn.click();
    }, 3000);
    this.helpers.setInterval(() => {
      const goBtn = document.getElementById('go_d') as HTMLElement | null;
      if (goBtn) goBtn.click();
    }, 3000);
  }
}

export const matches = [
  'mobi2c.com',
  'newforex.online',
  'healthy4pepole.com',
  'world-trips.net',
  'forex-gold.net',
  'healdad.com',
  'world2our.com',
  'gamalk-sehetk.com',
  'mobitaak.com',
  'forexit.online',
  'shopforex.online',
  'bluetechno.net',
];
