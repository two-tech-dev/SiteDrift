<div align="center">
<h1>SiteDrift</h1>
<p>Don't waste your time with compliance. SiteDrift automatically skips annoying link shorteners.</p>

<a href="https://github.com/two-tech-dev/FastForward/blob/main/.github/workflows/main.yml"><img alt="Build" src="https://img.shields.io/github/actions/workflow/status/two-tech-dev/FastForward/main.yml?branch=main&label=Build&style=for-the-badge&logo=githubactions"></a>
<a href="https://discord.gg/DYeCKWP3jB"><img alt="Discord" src="https://img.shields.io/discord/1448225921373966521?label=Discord&logo=discord&style=for-the-badge"></a>

</div>

---

## About

SiteDrift is a browser extension that automatically bypasses annoying link shorteners so you don't waste time clicking through ads and countdown timers. It is a continuation of the [FastForward](https://github.com/FastForwardTeam/FastForward) project, rebuilt and maintained by **2Tech Studio**.

SiteDrift targets **Manifest V3** and is built with [Vite](https://vitejs.dev/) + [CRXJS](https://crxjs.dev/vite-plugin).

> The extension is not yet published to any store. Follow [manual installation](#manual-installation) to load it in your browser.

---

## Manual Installation

See the full guide in [docs/INSTALLING.md](./docs/INSTALLING.md).

**Quick steps (Chromium):**

1. Download or build the extension (see [Building from Source](#building-from-source)).
2. Open `chrome://extensions/` and enable **Developer Mode**.
3. Click **Load unpacked** and select the `dist/` folder.

**Firefox:**

1. Open `about:debugging#/runtime/this-firefox`.
2. Click **Load Temporary Add-on** and select any file inside `dist/`.

---

## Building from Source

```bash
npm install
npm run build    # production build → dist/
npm run dev      # dev server with HMR
npm run lint     # run ESLint
```

Requires **Node.js 18+**.

---

## Supported Websites

See [docs/Bypassed.md](./docs/Bypassed.md) for the full list of bypassed sites.

---

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md). We welcome bypass additions and bug fixes.

Join our [Discord](https://discord.gg/DYeCKWP3jB) to discuss changes before submitting a PR.

---

## Privacy

See [PRIVACY.md](./PRIVACY.md).

---

## License

[GPL-3.0](./LICENSE) © 2Tech Studio
