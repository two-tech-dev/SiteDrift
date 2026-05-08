// @ts-nocheck
import BypassDefinition from './BypassDefinition';

export default class BlogTechh extends BypassDefinition {
  constructor() {
    super();
  }

  execute() {
    this.helpers.awaitElement("button#getlink", button => {
        button.click()
    })
  }
}

export const matches = ['blogtechh.com', 'oko.sh'];
