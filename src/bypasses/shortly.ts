import BypassDefinition from './BypassDefinition';

export default class Shortly extends BypassDefinition {
  constructor() {
    super();
    this.ensure_dom = true;
  }

  execute() {
    if (location.pathname.substr(0, 3) === '/r/') {
      (document as any).getElementById = () => ({
        submit: () => {
          const f = document.querySelector('form');
          f.action =
            '/link#' +
            (
              document.querySelector(
                "input[name='id']"
              ) as HTMLInputElement | null
            )?.value;
          f.submit();
        },
      });
    } else if (location.pathname === '/link') {
      const xhr = new XMLHttpRequest();
      xhr.onload = () => this.helpers.safelyNavigate(xhr.responseText);
      xhr.open('POST', 'https://www.shortly.xyz/getlink.php', true);
      xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
      xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
      xhr.send('id=' + location.hash.substr(1));
    }
  }
}

export const matches = ['shortly.xyz'];
