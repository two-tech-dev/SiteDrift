import BypassDefinition from './BypassDefinition'

export default class Filehorse extends BypassDefinition {
    constructor() {
        super()
        // custom bypass required bases can be set here
    }

    execute() {
        this.helpers.ensureDomLoaded(() => {
            this.helpers.ifElement("a#download_url[href]", addr => {
  // @ts-ignore
                if (typeof timerx == "number"){
  // @ts-ignore
                    clearTimeout(timerx)
                }
                this.helpers.safelyAssign(addr.href)
            })
        })
    }
}

export const matches = ['filehorse.com']
