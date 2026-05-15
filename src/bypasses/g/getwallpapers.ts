import BypassDefinition from '../BypassDefinition';

export default class Getwallpapers extends BypassDefinition {
  constructor() {
    super();
    // custom bypass required bases can be set here
  }

  execute() {
    (window as any).setInterval = ((f) => setInterval(f, 1)) as any;
  }
}

export const matches = [
  'getwallpapers.com',
  'sammobile.com',
  'ydfile.com',
  'mobilemodsapk.com',
  'dlandroid.com',
  'download.modsofapk.com',
  'zedge.net',
  'fex.net',
  'k2s.cc',
  'u.to',
];
