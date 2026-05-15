import BypassDefinition from './BypassDefinition'

export default class ONEShortlink extends BypassDefinition {
    constructor() {
        super()
    }

    execute() {
        this.helpers.bypassRequests(async (data: any) => {
            try {
                let json = null;

                // Handle XMLHttpRequest
                if (data.currentTarget) {
                    const xhr = data.currentTarget;
                    if (xhr.responseType === 'json') {
                        json = xhr.response;
                    } else if (xhr.responseText) {
                        // Avoid parsing large non-JSON strings (like JS files) to prevent noise
                        if (xhr.responseText.startsWith('{') || xhr.responseText.startsWith('[')) {
                            json = JSON.parse(xhr.responseText);
                        }
                    }
                }
                // Handle Fetch API
                else if (data.clone) {
                    const text = await data.clone().text();
                    if (text.startsWith('{') || text.startsWith('[')) {
                        json = JSON.parse(text);
                    }
                }

                if (json && json.redirect_url && json.redirect_url.includes("redirect-link?link=")) {
                    console.log("[SiteDrift] Redirect URL found via API:", json.redirect_url);
                    // Bỏ escape slashes (nếu có) và điều hướng
                    const cleanUrl = json.redirect_url.replace(/\\\//g, '/');
                    this.helpers.safelyNavigate(cleanUrl);
                }
            } catch (e) {
                // Ignore errors
            }
        });
    }
}

export const matches = ['1shortlink.com']