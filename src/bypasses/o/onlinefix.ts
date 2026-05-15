import BypassDefinition from '../BypassDefinition'

export default class Onelinefix extends BypassDefinition {
    constructor() {
        super()
        // custom bypass required bases can be set here
    }

    execute() {
        (window as any).setTimeout = (f => setTimeout(f,1)) as any
        this.helpers.awaitElement("#res > center > button.btn[onclick]", but => but.onclick())
    }
}

export const matches = ['online-fix.me/ext/']
