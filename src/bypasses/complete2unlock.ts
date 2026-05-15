import BypassDefinition from './BypassDefinition';

export default class Complete2unlock extends BypassDefinition {
  constructor() {
    super();
    this.ensure_dom = true;
  }

  execute() {
    const timer = setInterval(() => {
      const link_success_button = document.getElementById(
        'link-success-button'
      );
      if (!link_success_button) return;

      const unlock_panels = document.querySelectorAll('.unlockpanel');

      if (0 === unlock_panels.length) return;

      clearInterval(timer);
      // override the window open method, no more annoying popups
      (window as any).open = () => {};

      unlock_panels.forEach((panel) => (panel as HTMLElement).click());

      const is_button_enabled_timer = setInterval(() => {
        if ((link_success_button as HTMLButtonElement).hasAttribute('disabled'))
          return;

        clearInterval(is_button_enabled_timer);
        (link_success_button as HTMLElement).click();
      }, 100);
    }, 300);

    setInterval(() => clearInterval(timer), 30000);
  }
}

export const matches = ['complete2unlock.com'];
