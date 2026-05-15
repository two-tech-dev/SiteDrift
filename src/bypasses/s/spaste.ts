import BypassDefinition from '../BypassDefinition';

export default class Spaste extends BypassDefinition {
  constructor() {
    super();
    this.ensure_dom = true;
    // custom bypass required bases can be set here
  }

  execute() {
    this.helpers.insertInfoBox('Please complete the captcha to continue');
    const doTheThing = (f) =>
      setTimeout(() => {
        const item = document.querySelector('#currentCapQue').textContent;
        document.querySelectorAll('.markAnswer').forEach((el) => {
          if (
            el
              .querySelector('img')
              ?.getAttribute('src')
              ?.toLowerCase()
              .indexOf(item) ??
            -1 > -1
          ) {
            (el as HTMLElement).click();
          }
        });
        f();
      }, 200);
    (
      document.querySelector('#captchaVerifiedStatus') as HTMLElement | null
    )?.click();
    doTheThing(() =>
      doTheThing(() =>
        doTheThing(() =>
          (
            document.querySelector(
              '#template-contactform-submit'
            ) as HTMLElement | null
          )?.click()
        )
      )
    );
  }
}

export const matches = ['spaste.com/s', 'spaste.com/site'];
