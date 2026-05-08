import BypassDefinition from './BypassDefinition'

export default class Tiklat extends BypassDefinition {
  constructor () {
    super()
  }

  execute () {
    (window as any).setInterval = (func => setInterval(func, 1)) as any
    this.helpers.awaitElement('.skip > .wait > .skip > .btn > a[href]', a => {
      this.helpers.safelyNavigate(a.href)
    })
  }
}

export const matches = ['tik.lat']
