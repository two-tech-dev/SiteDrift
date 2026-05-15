import { defineManifest } from '@crxjs/vite-plugin';

export default defineManifest(async (env) => ({
  manifest_version: 3,
  name: "SiteDrift",
  description: "__MSG_appDesc__",
  version: "26.0.0",
  default_locale: "en",
  homepage_url: "https://sitedrift.2tech.studio",
  author: "2Tech Studio (2tech.studio) (prev FastForward)",
  incognito: "split",
  icons: {
    "16": "src/icon/icon16.png",
    "32": "src/icon/icon32.png",
    "48": "src/icon/icon48.png",
    "128": "src/icon/icon128.png"
  },
  permissions: [
    "alarms",
    "scripting",
    "storage",
    "tabs",
    "webNavigation",
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
        "src/icon/icon48.png",
        "src/icon_disabled/icon16.png",
        "src/icon_disabled/icon32.png",
        "src/icon_disabled/icon48.png",
        "src/icon_disabled/icon128.png",
        "injection_script.js"
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
  },
  browser_specific_settings: {
    gecko: {
      id: "sitedrift@2tech.studio",
      strict_min_version: "111.0",
      data_collection_permissions: {
        required: ["none"]
      }
    }
  } as any
}));
