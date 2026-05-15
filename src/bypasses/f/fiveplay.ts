import BypassDefinition from '../BypassDefinition';

export default class Fiveplay extends BypassDefinition {
  constructor() {
    super();
    this.ensure_dom = true;
  }

  execute() {
    // Find the div with the class "download_btn", find the a tag within the div, and return the href attribute
    const downloadBtnGroup = document.querySelector('.download-btn-group');
    if (downloadBtnGroup) {
      const anchorElement = downloadBtnGroup.querySelector('a');
      if (anchorElement) {
        this.helpers.safelyAssign(anchorElement.getAttribute('href'));
      }
    }
  }
}

export const matches = ['5play.ru'];
