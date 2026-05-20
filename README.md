<div align="center">
  <img src="web/public/icon128.png" width="128" alt="SiteDrift Logo" />
  <h1>SiteDrift</h1>
  <p><strong>Skip the wait. SiteDrift past link shorteners, ad-walls, and trackers.</strong></p>

  <a href="https://chromewebstore.google.com/detail/sitedrift/omfceoggegbdgijlpnmppphjpkapkham"><img alt="Chrome Web Store" src="https://img.shields.io/badge/Chrome-Install-4285F4?style=for-the-badge&logo=googlechrome&logoColor=white"></a>
  <a href="https://addons.mozilla.org/en-US/firefox/addon/sitedrift/"><img alt="Firefox Add-ons" src="https://img.shields.io/badge/Firefox-Install-FF7139?style=for-the-badge&logo=firefoxbrowser&logoColor=white"></a>
  <a href="https://github.com/two-tech-dev/SiteDrift/actions"><img alt="Build Status" src="https://img.shields.io/github/actions/workflow/status/two-tech-dev/SiteDrift/main.yml?branch=main&label=Build&style=for-the-badge&logo=githubactions"></a>
  <a href="https://discord.gg/DYeCKWP3jB"><img alt="Discord" src="https://img.shields.io/discord/1448225921373966521?label=Discord&logo=discord&style=for-the-badge"></a>
  <a href="https://sitedrift.2tech.studio"><img alt="Website" src="https://img.shields.io/badge/Website-sitedrift.2tech.studio-blue?style=for-the-badge"></a>
  <a href="https://ko-fi.com/X8X61ZH3YC"><img alt="Ko-fi" src="https://ko-fi.com/img/githubbutton_sm.svg"></a>
</div>

---

## 🚀 What is SiteDrift?

SiteDrift is an open-source, Manifest V3 compliant browser extension that automatically skips annoying link shorteners, countdown timers, and ad-walls. Save your time and privacy by letting SiteDrift do the heavy lifting.

### 📜 Heritage & Credits
*SiteDrift is a modernized fork and continuation of the [FastForward](https://github.com/FastForwardTeam/FastForward) project (which itself was a continuation of Universal Bypass). We are deeply grateful to the original FastForward and Universal Bypass maintainers and contributors for their foundational work. SiteDrift is now actively developed and maintained by **2Tech Studio**.*

### ✨ Key Features

- **Instant Bypasses:** Automatically skips countdowns, ad-walls, and click-through pages on hundreds of supported sites.
- **Privacy First:** Intercepts and blocks known IP loggers and intrusive trackers instantly.
- **Crowd Sourced:** Leverages a transparent community-powered backend network to automatically bypass dynamic or custom short links.
- **Modern Architecture:** Built strictly for **Manifest V3** with Vue.js, TypeScript, and a high-performance Go backend.

---

## 🛠️ Architecture

SiteDrift operates across three unified components in this monorepo:

1. **The Extension (`/src`):** A Manifest V3 Chrome/Firefox extension built with Vite + CRXJS + Vue 3. 
2. **The Web App (`/web`):** The public landing page and admin dashboard, built as a Vue 3 SPA.
3. **The Backend (`/server`):** A lightweight Go application managing the Crowd Sourced bypass network, tracking stats, and serving the API.

---

## 📦 Installation

### Chrome / Edge / Brave
Install from the [Chrome Web Store](https://chromewebstore.google.com/detail/sitedrift/omfceoggegbdgijlpnmppphjpkapkham).

### Firefox
Install from [Firefox Add-ons](https://addons.mozilla.org/en-US/firefox/addon/sitedrift/).

### Manual Installation
If you prefer to load from source, see [docs/INSTALLING.md](./docs/INSTALLING.md).

---

## 💻 Building from Source

To build SiteDrift locally, you need **Node.js 18+** and **Go 1.21+** (if building the backend).

### Extension & Web Frontend
```bash
# Install dependencies
npm install

# Build the extension (outputs to /dist)
npm run build

# Start extension dev server with HMR
npm run dev

# Run linting
npm run lint
```

### Go Backend
```bash
cd server
go run src/*.go
```

---

## 🤝 Contributing

We welcome community contributions! Whether you're adding new bypasses, fixing bugs, or improving documentation, your help is appreciated.

1. Check the [CONTRIBUTING.md](./CONTRIBUTING.md) guide.
2. See [docs/Bypassed.md](./docs/Bypassed.md) for the current list of supported sites.
3. Join our [Discord](https://discord.gg/DYeCKWP3jB) to discuss major changes before submitting a PR.

---

## 🔒 Privacy & Legal

- **Privacy Policy:** See [PRIVACY.md](./PRIVACY.md). We do not log your browsing history or personal data.
- **License:** [GPL-3.0](./LICENSE) © 2Tech Studio.
