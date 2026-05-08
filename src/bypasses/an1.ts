import BypassDefinition from './BypassDefinition'

export default class An1 extends BypassDefinition {
    constructor() {
        super()
        // custom bypass required bases can be set here
    }

    execute() {
  // @ts-ignore
        window.setTimeout = f => setTimeout(f, 1)
        this.helpers.awaitElement("#waiting > a", a => a.click())
    }
}

export const matches = ['an1.com']
