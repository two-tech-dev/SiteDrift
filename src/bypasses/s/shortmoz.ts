import BypassDefinition from '../BypassDefinition';

export default class Shortmoz extends BypassDefinition {
    constructor() {
        super()
        // custom bypass required bases can be set here
    }

    execute() {
        (window as any).setInterval = (f => setTimeout(f,1)) as any
        this.helpers.awaitElement("a.btn.redirect[href^='http']", a =>
            this.helpers.safelyNavigate(a.href))
    }
}

export const matches = ['shortmoz.link']
