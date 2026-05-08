import BypassDefinition from './BypassDefinition';

export default class Uploadrar extends BypassDefinition {
  constructor() {
    super();
    // custom bypass required bases can be set here
  }

  execute() {
    (
      document.querySelector('.mngez-free-download') as HTMLElement | null
    )?.click();
    (
      document.querySelector(
        '#direct_link > a:nth-child(1)'
      ) as HTMLElement | null
    )?.click();
    (
      document.querySelector('#downloadbtn.downloadbtn') as HTMLElement | null
    )?.click();
  }
}

export const matches = ['uploadrar.com', 'uploadrar.net', 'uptomega.me'];
