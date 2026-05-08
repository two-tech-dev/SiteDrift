declare const browser: typeof chrome;
const brws = typeof browser !== 'undefined' ? browser : chrome;
document.documentElement.setAttribute(
  'dir',
  brws.i18n.getMessage('@@bidi_dir')
);

export {};
