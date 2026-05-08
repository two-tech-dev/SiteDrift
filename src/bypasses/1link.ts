import BypassDefinition from './BypassDefinition'

export default class ONELink extends BypassDefinition {
    constructor() {
        super()
        this.ensure_dom = true
    }

    execute() {
        this.helpers.safelyNavigate((document.querySelector('a#download') as HTMLAnchorElement | null)?.href);
    }
}

export const matches = ['1link.club']