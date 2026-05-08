// @ts-nocheck
export default abstract class BypassDefinition {
    ensure_dom: boolean;
    helpers: any;

    constructor() {
        this.ensure_dom = false;
    }

    set_helpers(helpers: any) {
        this.helpers = helpers;
    }

    abstract execute(): void;
}
