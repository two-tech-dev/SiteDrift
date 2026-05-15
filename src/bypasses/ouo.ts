import BypassDefinition from "./BypassDefinition"

export default class Ouo extends BypassDefinition {
    constructor() {
        super()
    this.ensure_dom = true;
    }
    execute() {
        if (location.pathname !== '/') {
            if (/(go|fbc)/.test(location.pathname.split("/")[1])) {
                (document.querySelector("form") as HTMLFormElement | null)?.submit()
            }
            else {
                const form = document.querySelector("form#form-captcha") as HTMLFormElement;
                if (form) {
                    form.action = `/xreallcygo${location.pathname}`;
                    form.submit();
                }
                else {
                    //this.helpers.crowdBypass()
                }
            }
        }
    }
}
export const matches = ['ouo.press', 'ouo.io']
