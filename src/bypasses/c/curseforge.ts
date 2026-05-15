import BypassDefinition from '../BypassDefinition';

export default class Curseforge extends BypassDefinition {
  constructor() {
    super();
    // custom bypass required bases can be set here
  }

  execute() {
    (window as any).setInterval = (f => setInterval(f, 100)) as any
  }
}

export const matches = ['curseforge.com'];
