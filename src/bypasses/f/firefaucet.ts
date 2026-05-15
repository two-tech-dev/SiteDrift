import BypassDefinition from '../BypassDefinition';

export default class Firefaucet extends BypassDefinition {
  constructor() {
    super();
    // custom bypass required bases can be set here
  }

  execute() {
    (window as any).setInterval = ((f) => setInterval(f, 1)) as any;
  }
}

export const matches = ['firefaucet.win', 'sfirmware.com', 'emulator.games'];
