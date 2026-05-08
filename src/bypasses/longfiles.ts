import BypassDefinition from './BypassDefinition'

export default class Longfiles extends BypassDefinition {
    constructor() {
        super()
        // custom bypass required bases can be set here
    }

    execute() {
        (window as any).setTimeout = (f => this.helpers.setTimeout(f, 1)) as any
    }
}

export const matches = ['longfiles.com', 'filepuma.com', 'portableapps.com', 'indishare.org', 'solvetube.site']
