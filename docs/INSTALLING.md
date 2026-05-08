# Installing SiteDrift

> SiteDrift is not yet published to any browser store. Use the manual installation instructions below.

## Table of Contents

- [Build from Source](#build-from-source)
- [Chromium (Chrome, Edge, Brave, Opera, Vivaldi…)](#chromium-chrome-edge-brave-opera-vivaldi)
- [Firefox](#firefox)
- [Troubleshooting](#troubleshooting)

---

## Build from Source

Requires **Node.js 18+** and **npm**.

```bash
git clone https://github.com/two-tech-dev/FastForward.git
cd FastForward
npm install
npm run build
```

The built extension will be in the `dist/` folder.

---

## Chromium (Chrome, Edge, Brave, Opera, Vivaldi…)

1. Build the extension (see above), or download a CI artifact from [GitHub Actions](https://github.com/two-tech-dev/FastForward/actions/workflows/main.yml).
2. Open your browser's extensions page:
   - Chrome/Brave: `chrome://extensions/`
   - Edge: `edge://extensions/`
3. Enable **Developer Mode** (toggle in the top-right corner).
4. Click **Load unpacked** and select the `dist/` folder.

---

## Firefox

> Firefox requires Developer Edition or Nightly, or you must disable signature enforcement.

1. Build the extension (see above).
2. Open `about:debugging#/runtime/this-firefox`.
3. Click **Load Temporary Add-on**.
4. Select any file inside the `dist/` folder (e.g. `manifest.json`).

> Note: Temporarily loaded add-ons are removed when Firefox restarts.

To load permanently without signing:

1. Open `about:config` and set `xpinstall.signatures.required` to `false`.
2. Install via `about:addons` → gear icon → **Install Add-on From File**.

---

## Troubleshooting

**"Manifest file is missing or unreadable"**
Make sure you selected the `dist/` folder (the one containing `manifest.json`), not the repo root or a zip file.

**Extension loads but doesn't bypass anything**
Check the browser console (`F12`) on the target page for errors. Make sure the bypass file for that domain exists in `src/bypasses/`.

**Need help?**
Join the [Discord](https://discord.gg/DYeCKWP3jB) for support.
