import BypassDefinition from './BypassDefinition'

export default class Linksht extends BypassDefinition {
    constructor() {
        super()
        this.ensure_dom = true
    }

    execute() {
        const getUrl = document.URL;
        const urlSplit = getUrl.split("/");
  // @ts-ignore
        $.post("/Links/Getlink", {id: urlSplit[urlSplit.length - 1]}, function (destination) {
            if(destination!="") {
                location.assign(destination);
            }
        });
    }
}

export const matches = ['linksht.com']