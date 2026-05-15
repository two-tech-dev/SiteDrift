import { defineManifest } from '@crxjs/vite-plugin';

export default defineManifest(async (env) => ({
  manifest_version: 3,
  name: "SiteDrift",
  description: "__MSG_appDesc__",
  version: "13.15.2",
  default_locale: "en",
  homepage_url: "https://sitedrift.team",
  author: "2Tech Studio (2tech.studio) (prev FastForward)",
  incognito: "split",
  icons: {
    "48": "src/icon/48.png",
    "128": "src/icon/128.png",
    "150": "src/icon/150.png",
    "176": "src/icon/176.png",
    "512": "src/icon/512.png"
  },
  permissions: [
    "alarms",
    "storage",
    "tabs",
    "declarativeNetRequestWithHostAccess"
  ],
  host_permissions: [
    "<all_urls>"
  ],
  options_ui: {
    page: "src/html/options.html",
    open_in_tab: true
  },
  background: {
    service_worker: "src/js/background.ts",
    type: "module"
  },
  action: {
    default_popup: "src/html/popup.html"
  },
  content_scripts: [
    {
      matches: ["<all_urls>"],
      js: ["src/js/content_script.ts"],
      run_at: "document_start"
    },
    {
      matches: ["<all_urls>"],
      js: ["src/js/injection_script.ts"],
      run_at: "document_start",
      world: "MAIN" as any
    }
  ],
  web_accessible_resources: [
    {
      resources: [
        "src/html/before-navigate.html",
        "src/html/blocked.html",
        "src/html/crowd-bypassed.html",
        "src/html/tracker-bypass.html",
        "src/html/options.html",
        "src/icon/48.png"
      ],
      matches: ["<all_urls>"]
    }
  ],
  declarative_net_request: {
    rule_resources: [
      {
        id: "ipLoggerRuleset",
        enabled: true,
        path: "src/rules/ip_logger_blocker.json"
      },
      {
        id: "trackerRuleset",
        enabled: false,
        path: "src/rules/tracker_bypass.json"
      }
    ]
  }
}));
