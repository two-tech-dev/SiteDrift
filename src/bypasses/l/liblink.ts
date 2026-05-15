import BypassDefinition from '../BypassDefinition'

export default class Liblink extends BypassDefinition {
    constructor() {
        super()
        this.ensure_dom = true
    }

    execute() {
        this.helpers.ifElement("body > div > h1 > span", addr => {
            this.helpers.safelyNavigate(addr.innerHTML)
        })
    }
}

export const matches = ['liblink.pl']
