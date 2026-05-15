import BypassDefinition from './BypassDefinition'

export default class Brpaper extends BypassDefinition {
    constructor() {
        super()
        this.ensure_dom = true
    }

    execute() {
        // Skip the 20s countdown and trigger download immediately
        if ((window as any).DownloadManager) {
            const dm = (window as any).DownloadManager;
            dm.waitTime = 0;
            dm.downloadFile();
        } else {
            // Fallback: submit the download form directly
            this.helpers.awaitElement('#download-form', (form: HTMLFormElement) => {
                form.submit();
            });
        }
    }
}

export const matches = ['brpaper.com']
