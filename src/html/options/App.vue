<template>
  <main class="options-shell">
    <!-- Side Navigation (Desktop) -->
    <aside class="side-nav">
      <div class="side-brand">
        <div class="avatar">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" class="avatar-icon">
            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
          </svg>
        </div>
        <div>
          <h2 class="brand-title">SiteDrift</h2>
          <p class="brand-sub">Secure Drift Enabled</p>
        </div>
      </div>
      <nav class="nav-links">
        <a href="#settings" class="nav-link active">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M19.14 12.94c.04-.31.06-.63.06-.94 0-.31-.02-.63-.06-.94l2.03-1.58a.49.49 0 00.12-.61l-1.92-3.32a.488.488 0 00-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54a.484.484 0 00-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.04.31-.06.63-.06.94 0 .31.02.63.06.94l-2.03 1.58a.49.49 0 00-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z"/></svg>
          <span>Extension Settings</span>
        </a>
      </nav>
      <div class="side-footer">
        <button class="premium-btn" type="button">Go Premium</button>
      </div>
    </aside>

    <!-- Main Content -->
    <section class="content-area">
      <header class="page-header">
        <div>
          <h1 class="page-title">SiteDrift Options</h1>
          <p class="page-desc">Configure your privacy shielding and drift settings. Changes apply immediately to new tabs.</p>
        </div>
        <div class="status-pill">
          <span class="status-dot"></span>
          <span class="status-text">Shield Active</span>
        </div>
      </header>

      <div class="settings-grid">
        <!-- Group 1: Core Defenses -->
        <div class="setting-group">
          <h3 class="group-title group-primary">Core Defenses</h3>

          <!-- Bypass countdowns -->
          <article class="glass-card" :class="{ disabled: !options.navigationDelayToggle }">
            <div class="card-body">
              <h4 class="card-heading">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" class="card-icon"><path d="M13 3c-4.97 0-9 4.03-9 9H1l3.89 3.89.07.14L9 12H6c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7c-1.93 0-3.68-.79-4.94-2.06l-1.42 1.42A8.954 8.954 0 0013 21c4.97 0 9-4.03 9-9s-4.03-9-9-9zm-1 5v5l4.28 2.54.72-1.21-3.5-2.08V8H12z"/></svg>
                Bypass countdowns
              </h4>
              <p class="card-desc">Automatically skips artificial waiting periods on download and redirect sites.</p>
            </div>
            <div class="card-toggle">
              <label class="toggle">
                <input type="checkbox" v-model="options.navigationDelayToggle" />
                <span class="toggle-track"></span>
              </label>
            </div>
          </article>

          <!-- Bypass trackers -->
          <article class="glass-card" :class="{ disabled: !options.optionTrackerBypass }">
            <div class="card-body">
              <h4 class="card-heading">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" class="card-icon"><path d="M12 7c2.76 0 5 2.24 5 5 0 .65-.13 1.26-.36 1.83l2.92 2.92c1.51-1.26 2.7-2.89 3.43-4.75-1.73-4.39-6-7.5-11-7.5-1.4 0-2.74.25-3.98.7l2.16 2.16C10.74 7.13 11.35 7 12 7zM2 4.27l2.28 2.28.46.46A11.804 11.804 0 001 12c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l.42.42L19.73 22 21 20.73 3.27 3 2 4.27zM7.53 9.8l1.55 1.55c-.05.21-.08.43-.08.65 0 1.66 1.34 3 3 3 .22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53-2.76 0-5-2.24-5-5 0-.79.2-1.53.53-2.2zm4.31-.78l3.15 3.15.02-.16c0-1.66-1.34-3-3-3l-.17.01z"/></svg>
                Bypass trackers
              </h4>
              <p class="card-desc">Strips tracking parameters from URLs before navigation. <a class="inline-link" href="https://unshorten.me/privacy-policy" target="_blank">Privacy Policy</a></p>
            </div>
            <div class="card-toggle">
              <label class="toggle">
                <input type="checkbox" v-model="options.optionTrackerBypass" />
                <span class="toggle-track"></span>
              </label>
            </div>
          </article>

          <!-- Instant navigation for trackers -->
          <article class="glass-card nested" :class="{ disabled: !options.optionInstantNavigationTrackers }">
            <div class="card-body">
              <h4 class="card-heading nested-heading">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" class="card-icon"><path d="M11 21h-1l1-7H7.5c-.88 0-.33-.75-.31-.78C8.48 10.94 10.42 7.54 13.01 3h1l-1 7h3.51c.4 0 .62.19.4.66C12.97 17.55 11 21 11 21z"/></svg>
                Instant navigation for trackers
              </h4>
              <p class="card-desc">Do not wait for destination resolution if tracking pattern is matched.</p>
            </div>
            <div class="card-toggle">
              <label class="toggle">
                <input type="checkbox" v-model="options.optionInstantNavigationTrackers" />
                <span class="toggle-track"></span>
              </label>
            </div>
          </article>

          <!-- Block IP loggers (Critical) -->
          <article class="glass-card critical" :class="{ disabled: !options.optionBlockIpLoggers }">
            <div class="critical-bar"></div>
            <div class="card-body critical-body">
              <div class="critical-header">
                <h4 class="card-heading">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" class="card-icon-error"><path d="M12 2L4 5v6.09c0 5.05 3.41 9.76 8 10.91 4.59-1.15 8-5.86 8-10.91V5l-8-3zm-1.06 13.54L7.4 12l1.41-1.41 2.12 2.12 4.24-4.24 1.41 1.41-5.64 5.66z"/></svg>
                  Block IP loggers
                </h4>
                <span class="critical-badge">Critical</span>
              </div>
              <p class="card-desc">Prevents connection to known malicious IP harvesting domains.</p>
            </div>
            <div class="card-toggle">
              <label class="toggle">
                <input type="checkbox" v-model="options.optionBlockIpLoggers" />
                <span class="toggle-track"></span>
              </label>
            </div>
          </article>
        </div>

        <!-- Group 2: Community Network -->
        <div class="setting-group">
          <h3 class="group-title group-secondary">Community Network</h3>

          <!-- Crowd Bypass -->
          <article class="glass-card" :class="{ disabled: !options.optionCrowdBypass }">
            <div class="card-body">
              <h4 class="card-heading">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" class="card-icon"><path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/></svg>
                Crowd Bypass
              </h4>
              <p class="card-desc">Use community-sourced destination URLs to skip intermediate landing pages entirely.</p>
              <span v-if="tempDisableCrowd" class="warning-badge">Temporarily disabled</span>
            </div>
            <div class="card-toggle">
              <label class="toggle">
                <input type="checkbox" v-model="options.optionCrowdBypass" />
                <span class="toggle-track"></span>
              </label>
            </div>
          </article>

          <!-- Auto-open crowd-bypassed links (nested) -->
          <article class="glass-card nested" :class="{ disabled: !options.optionCrowdOpenDelayToggle }">
            <div class="card-body">
              <h4 class="card-heading nested-heading">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" class="card-icon"><path d="M19 19H5V5h7V3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z"/></svg>
                Auto-open crowd-bypassed links
              </h4>
              <p class="card-desc">Automatically redirect current tab to the destination when found by community.</p>
            </div>
            <div class="card-toggle">
              <label class="toggle">
                <input type="checkbox" v-model="options.optionCrowdOpenDelayToggle" />
                <span class="toggle-track"></span>
              </label>
            </div>
          </article>

          <!-- Auto-close crowd-bypassed links (nested) -->
          <article class="glass-card nested" :class="{ disabled: !options.optionCrowdCloseDelayToggle }">
            <div class="card-body">
              <h4 class="card-heading nested-heading">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" class="card-icon"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>
                Auto-close crowd-bypassed links
              </h4>
              <p class="card-desc">Close the tracking tab once the destination is successfully opened elsewhere.</p>
            </div>
            <div class="card-toggle">
              <label class="toggle">
                <input type="checkbox" v-model="options.optionCrowdCloseDelayToggle" />
                <span class="toggle-track"></span>
              </label>
            </div>
          </article>

          <!-- Session Telemetry -->
          <div class="telemetry-card">
            <div class="telemetry-header">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M13 2.05v2.02c3.95.49 7 3.85 7 7.93 0 3.21-1.92 6-4.72 7.28l1.17 1.76A9.953 9.953 0 0021 12c0-5.18-3.95-9.45-9-9.95zM12 19c-3.87 0-7-3.13-7-7 0-3.53 2.61-6.43 6-6.92V3.03c-4.06.5-7 4.06-7 8.97 0 4.97 4.03 9 9 9a9.994 9.994 0 004.72-1.18l-1.17-1.76c-1.1.58-2.32.94-3.55.94z"/></svg>
              <h4 class="telemetry-title">Session Telemetry</h4>
            </div>
            <div class="telemetry-stats">
              <div>
                <p class="stat-label">Trackers Blocked</p>
                <p class="stat-value">Local</p>
              </div>
              <div>
                <p class="stat-label">Time Saved</p>
                <p class="stat-value stat-secondary">Active</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted, watch } from 'vue';

declare const chrome: any;

const defaultOptions = {
  navigationDelayToggle: true,
  navigationDelay: 10,
  optionTrackerBypass: false,
  optionInstantNavigationTrackers: false,
  optionBlockIpLoggers: true,
  optionCrowdBypass: false,
  optionCrowdOpenDelayToggle: false,
  optionCrowdOpenDelay: 5,
  optionCrowdCloseDelayToggle: false,
  optionCrowdCloseDelay: 15,
  whitelist: '',
};

const options = reactive({ ...defaultOptions });
const version = ref('');
const tempDisableCrowd = ref(false);

const loadData = () => {
  chrome.storage.local.get('version', (data: any) => {
    version.value = (data.version || 'Unknown') + '-Mv3';
  });
  chrome.storage.local.get('options', (result: any) => {
    Object.assign(options, defaultOptions, result.options || {});
  });
  chrome.storage.local.get('tempDisableCrowd', (result: any) => {
    tempDisableCrowd.value = result.tempDisableCrowd === 'true';
  });
};

watch(
  options,
  (newVal) => {
    chrome.storage.local.set({ options: { ...newVal } });
  },
  { deep: true }
);

onMounted(() => {
  loadData();
});
</script>

<style scoped>
/* ===== Global resets ===== */
:global(body) {
  margin: 0;
  min-height: 100vh;
  background: #0b1326;
}
:global(*) {
  box-sizing: border-box;
}

/* ===== Design tokens (from Stitch tailwind config) ===== */
.options-shell {
  --bg: #0b1326;
  --surface-lowest: #060e20;
  --surface-low: #131b2e;
  --surface: #171f33;
  --surface-high: #222a3d;
  --surface-highest: #2d3449;
  --outline: #8c909f;
  --outline-variant: #424754;
  --on-surface: #dae2fd;
  --on-surface-variant: #c2c6d6;
  --primary: #adc6ff;
  --secondary: #ddb7ff;
  --tertiary: #4cd7f6;
  --error: #ffb4ab;
  --on-primary: #002e6a;

  display: flex;
  min-height: 100vh;
  color: var(--on-surface);
  background: var(--bg);
  font-family: Geist, 'Segoe UI', sans-serif;
  font-size: 14px;
  line-height: 20px;
  -webkit-font-smoothing: antialiased;
}

/* ===== Side Navigation ===== */
.side-nav {
  position: fixed;
  inset: 0 auto 0 0;
  display: flex;
  width: 256px;
  flex-direction: column;
  padding: 24px 16px;
  border-right: 1px solid rgba(66, 71, 84, 0.2);
  background: rgba(19, 27, 46, 0.9);
  backdrop-filter: blur(40px);
  -webkit-backdrop-filter: blur(40px);
  box-shadow: 4px 0 24px rgba(0, 0, 0, 0.3);
  z-index: 40;
}

.side-brand {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 0 8px;
  margin-bottom: 32px;
}

.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: var(--surface-highest);
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid rgba(66, 71, 84, 0.3);
  overflow: hidden;
}
.avatar-icon {
  color: var(--on-surface-variant);
}

.brand-title {
  margin: 0;
  font-family: Geist, sans-serif;
  font-size: 20px;
  line-height: 28px;
  letter-spacing: -0.01em;
  font-weight: 600;
  color: var(--primary);
}

.brand-sub {
  margin: 0;
  font-family: 'JetBrains Mono', 'Cascadia Mono', monospace;
  font-size: 12px;
  line-height: 16px;
  letter-spacing: 0.05em;
  font-weight: 500;
  color: var(--on-surface-variant);
  text-transform: uppercase;
}

/* Nav links */
.nav-links {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 0 8px;
}

.nav-link {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  border-radius: 8px;
  color: var(--on-surface-variant);
  text-decoration: none;
  transition: background 0.15s, color 0.15s;
}
.nav-link svg {
  flex-shrink: 0;
  transition: color 0.15s;
}
.nav-link span {
  font-family: 'JetBrains Mono', 'Cascadia Mono', monospace;
  font-size: 12px;
  line-height: 16px;
  letter-spacing: 0.05em;
  font-weight: 500;
  text-transform: uppercase;
}
.nav-link:hover {
  color: var(--on-surface);
  background: rgba(255, 255, 255, 0.05);
}
.nav-link:hover svg {
  color: var(--primary);
}
.nav-link.active {
  background: linear-gradient(90deg, rgba(173, 198, 255, 0.2), rgba(221, 183, 255, 0.1));
  color: var(--primary);
  border-right: 2px solid var(--primary);
  transform: scale(0.98);
}
.nav-link.active svg {
  color: var(--primary);
}

/* Side footer */
.side-footer {
  padding: 0 8px;
  margin-top: auto;
}
.premium-btn {
  width: 100%;
  padding: 12px 16px;
  border: 0;
  border-radius: 8px;
  background: linear-gradient(135deg, #adc6ff 0%, #ddb7ff 100%);
  color: var(--on-primary);
  font-family: 'JetBrains Mono', 'Cascadia Mono', monospace;
  font-size: 12px;
  line-height: 16px;
  letter-spacing: 0.05em;
  font-weight: 700;
  text-transform: uppercase;
  cursor: pointer;
  box-shadow: 0 0 15px rgba(173, 198, 255, 0.2);
  transition: box-shadow 0.2s;
}
.premium-btn:hover {
  box-shadow: 0 0 20px rgba(173, 198, 255, 0.4);
}

/* ===== Main Content Area ===== */
.content-area {
  flex: 1;
  margin-left: 256px;
  padding: 32px 32px 48px;
  max-width: calc(256px + 1024px);
  width: 100%;
}

/* Page header */
.page-header {
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 40px;
}

.page-title {
  margin: 0 0 8px;
  font-family: Geist, sans-serif;
  font-size: 24px;
  line-height: 32px;
  letter-spacing: -0.02em;
  font-weight: 600;
  color: var(--on-surface);
}

.page-desc {
  margin: 0;
  font-size: 16px;
  line-height: 24px;
  color: var(--on-surface-variant);
  max-width: 640px;
}

.status-pill {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-shrink: 0;
  padding: 6px 12px;
  border-radius: 9999px;
  background: var(--surface-highest);
  border: 1px solid rgba(66, 71, 84, 0.3);
}

.status-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--tertiary);
  box-shadow: 0 0 15px rgba(76, 215, 246, 0.3);
}

.status-text {
  font-family: 'JetBrains Mono', 'Cascadia Mono', monospace;
  font-size: 13px;
  line-height: 18px;
  color: var(--tertiary);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

/* ===== Settings Grid ===== */
.settings-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 24px;
}

.setting-group {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.group-title {
  margin: 0;
  font-family: 'JetBrains Mono', 'Cascadia Mono', monospace;
  font-size: 12px;
  line-height: 16px;
  letter-spacing: 0.05em;
  font-weight: 500;
  text-transform: uppercase;
  padding-left: 8px;
  border-left: 2px solid;
}
.group-primary {
  color: var(--primary);
  border-color: var(--primary);
}
.group-secondary {
  color: var(--secondary);
  border-color: var(--secondary);
}

/* ===== Glass Cards ===== */
.glass-card {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
  padding: 20px;
  border-radius: 12px;
  background: rgba(19, 27, 46, 0.6);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  transition: background 0.15s;
}
.glass-card:hover {
  background: rgba(19, 27, 46, 0.7);
}

.glass-card.nested {
  margin-left: 16px;
  background: rgba(19, 27, 46, 0.3);
  border-left: 1px solid rgba(66, 71, 84, 0.2);
}
.glass-card.nested:hover {
  background: rgba(19, 27, 46, 0.45);
}

.glass-card.disabled {
  opacity: 0.7;
}

/* Critical card */
.glass-card.critical {
  position: relative;
  overflow: hidden;
  border-color: rgba(255, 180, 171, 0.2);
}
.critical-bar {
  position: absolute;
  top: 0;
  left: 0;
  width: 4px;
  height: 100%;
  background: var(--error);
}
.critical-body {
  padding-left: 8px;
}
.critical-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 4px;
}
.critical-badge {
  background: rgba(255, 180, 171, 0.1);
  color: var(--error);
  font-family: 'JetBrains Mono', 'Cascadia Mono', monospace;
  font-size: 10px;
  line-height: 14px;
  letter-spacing: 0.05em;
  font-weight: 500;
  text-transform: uppercase;
  padding: 2px 8px;
  border-radius: 4px;
  border: 1px solid rgba(255, 180, 171, 0.2);
}

/* Card body */
.card-body {
  flex: 1;
  min-width: 0;
}

.card-heading {
  margin: 0 0 4px;
  font-family: Geist, sans-serif;
  font-size: 16px;
  line-height: 24px;
  font-weight: 600;
  color: var(--on-surface);
  display: flex;
  align-items: center;
  gap: 8px;
}
.nested-heading {
  font-size: 15px;
}

.card-icon {
  color: var(--outline);
  flex-shrink: 0;
}
.card-icon-error {
  color: var(--error);
  flex-shrink: 0;
}

.card-desc {
  margin: 0;
  font-size: 14px;
  line-height: 20px;
  color: var(--on-surface-variant);
}

.inline-link {
  color: var(--primary);
  text-decoration: none;
}
.inline-link:hover {
  text-decoration: underline;
}

.warning-badge {
  display: inline-block;
  margin-top: 8px;
  background: rgba(255, 180, 171, 0.08);
  color: var(--error);
  font-family: 'JetBrains Mono', 'Cascadia Mono', monospace;
  font-size: 10px;
  line-height: 14px;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  padding: 3px 7px;
  border-radius: 9999px;
  border: 1px solid rgba(255, 180, 171, 0.28);
}

/* ===== Toggle Switch ===== */
.card-toggle {
  padding-top: 4px;
  flex-shrink: 0;
}

.toggle {
  position: relative;
  display: inline-block;
  width: 48px;
  height: 24px;
  cursor: pointer;
}

.toggle input {
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
}

.toggle-track {
  position: absolute;
  inset: 0;
  border-radius: 9999px;
  background: var(--surface-highest);
  border: 1px solid rgba(66, 71, 84, 0.5);
  transition: background 0.3s, box-shadow 0.3s;
}
.toggle-track::before {
  content: '';
  position: absolute;
  top: 2px;
  left: 2px;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: #fff;
  transition: transform 0.3s;
}

.toggle input:checked + .toggle-track {
  background: linear-gradient(135deg, #adc6ff 0%, #ddb7ff 100%);
  box-shadow: 0 0 15px rgba(173, 198, 255, 0.3);
}
.toggle input:checked + .toggle-track::before {
  transform: translateX(24px);
}

/* ===== Telemetry Card ===== */
.telemetry-card {
  margin-top: 32px;
  padding: 20px;
  border-radius: 12px;
  background: rgba(173, 198, 255, 0.05);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(173, 198, 255, 0.2);
}

.telemetry-header {
  display: flex;
  align-items: center;
  gap: 8px;
  color: var(--primary);
  margin-bottom: 16px;
}

.telemetry-title {
  margin: 0;
  font-family: 'JetBrains Mono', 'Cascadia Mono', monospace;
  font-size: 12px;
  line-height: 16px;
  letter-spacing: 0.05em;
  font-weight: 500;
  color: var(--primary);
  text-transform: uppercase;
}

.telemetry-stats {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
}

.stat-label {
  margin: 0 0 4px;
  font-size: 14px;
  line-height: 20px;
  color: var(--on-surface-variant);
}

.stat-value {
  margin: 0;
  font-family: 'JetBrains Mono', 'Cascadia Mono', monospace;
  font-size: 13px;
  line-height: 18px;
  color: var(--on-surface);
  font-size: 20px;
}
.stat-secondary {
  color: var(--secondary);
}

/* ===== Responsive ===== */
@media (max-width: 860px) {
  .options-shell {
    flex-direction: column;
  }
  .side-nav {
    position: static;
    width: 100%;
    border-right: 0;
    border-bottom: 1px solid rgba(66, 71, 84, 0.2);
    padding: 16px;
  }
  .side-brand {
    margin-bottom: 16px;
  }
  .nav-links {
    flex-direction: row;
    flex-wrap: wrap;
  }
  .content-area {
    margin-left: 0;
    padding: 24px 16px 48px;
  }
  .settings-grid {
    grid-template-columns: 1fr;
  }
  .page-header {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>
