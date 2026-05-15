import BypassDefinition from './BypassDefinition';

export default class Filepuma extends BypassDefinition {
  constructor() {
    super();
    this.ensure_dom = true;
    // custom bypass required bases can be set here
  }

  execute() {
    // Find the last script in the page
    const scripts = document.getElementsByTagName('script');
    const lastScript = scripts[scripts.length - 1];
    // Get the script's source
    const scriptSrc = lastScript.innerHTML;
    // Find the first location.href in the script and get the value of location.href
    const url = scriptSrc.split('location.href = "')[1].split('"')[0];
    alert(url)

  }
}

export const matches = ['filepuma.com'];
