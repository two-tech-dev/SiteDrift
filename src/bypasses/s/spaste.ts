import BypassDefinition from '../BypassDefinition';

export default class Spaste extends BypassDefinition {
  constructor() {
    super();
    this.ensure_dom = true;
  }

  execute() {
    this.helpers.insertInfoBox('Please complete the captcha to continue');

    const observer = new MutationObserver(() => {
      const response = (
        document.querySelector(
          '[name="h-captcha-response"]'
        ) as HTMLTextAreaElement | null
      )?.value;
      if (response) {
        observer.disconnect();
        (
          document.querySelector(
            '#template-contactform-submit'
          ) as HTMLElement | null
        )?.click();
      }
    });

    observer.observe(document.body, {
      subtree: true,
      attributes: true,
      childList: true,
    });
  }
}

export const matches = ['www.spaste.com', 'spaste.com'];
