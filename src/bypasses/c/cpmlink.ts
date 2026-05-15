import BypassDefinition from '../BypassDefinition'

export default class Cpmlink extends BypassDefinition {
    constructor() {
        super()
        this.ensure_dom = true
    }

    execute() {
        // Skip the 5s countdown
        const btn = document.getElementById('btn-main');
        if (btn) {
            btn.className = 'btn btn-warning btn-lg';
            btn.innerHTML = 'Get Link';
        }

        if ((window as any).myCounter) {
            (window as any).myCounter.stop();
        }

        // Click the button to trigger link generation, then navigate
        this.helpers.awaitElement('#btn-main[href]', (a: HTMLAnchorElement) => {
            this.helpers.safelyNavigate(a.href);
        });
    }
}

export const matches = ['cpmlink.net']
