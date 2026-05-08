import BypassDefinition from './BypassDefinition'

export default class Rekonise extends BypassDefinition {
    constructor() {
        super()
    }

    execute() {
        const xhr = new XMLHttpRequest()
        xhr.onload = () => {
            const data = JSON.parse(xhr.responseText)
            this.helpers.safelyNavigate(data.url)
        }
        xhr.open(
            'GET',
            `https://api.rekonise.com/social-unlocks${location.pathname}`,
            true
        )
        xhr.send()
    }
}
export const matches = ['rekonise.com']
