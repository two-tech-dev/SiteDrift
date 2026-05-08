import BypassDefinition from './BypassDefinition'

export default class Leitup extends BypassDefinition {
    constructor() {
        super()
        this.ensure_dom = true
    }

    execute() {
        this.helpers.ifElement('input.form-control[type="text"]', (input) => {
            const destination = input.attributes.placeholder.value
            this.helpers.safelyNavigate(destination)
        })
    }
}

export const matches = ['leitup.com']
