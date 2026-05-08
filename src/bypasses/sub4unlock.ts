import BypassDefinition from './BypassDefinition'

export default class Sub4unlock extends BypassDefinition {
    constructor() {
        super()
        this.ensure_dom = true
    }

    execute() {
  // @ts-ignore
        if (typeof fun2 == "function") {
            window.open = this.helpers.safelyNavigate
  // @ts-ignore
            fun2()
        }
    }
}

export const matches = ['sub4unlock.com']
