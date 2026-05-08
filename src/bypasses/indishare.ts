import BypassDefinition from './BypassDefinition';

export default class Indishare extends BypassDefinition {
  constructor() {
    super();
    // custom bypass required bases can be set here
  }

  execute() {
    (window as any).setTimeout = (f => setTimeout(f, 1)) as any
  }
}

export const matches = ['indishare.org', 'solvetube.site'];
