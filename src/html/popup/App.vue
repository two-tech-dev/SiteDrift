<template>
  <main class="popup-container" :class="{ 'is-disabled': !extensionEnabled }">
    <!-- Header Section -->
    <div class="header">
      <div class="header-left">
        <div class="logo-frame">
          <img src="../../icon/48.png" alt="SiteDrift Logo" />
        </div>
        <div>
          <h1 class="brand-name">SiteDrift</h1>
          <div class="status-row">
            <span class="version-pill">{{ version }}</span>
            <div class="active-badge">
              <span class="active-dot" :class="{ 'dot-inactive': !extensionEnabled }"></span>
              <span class="active-text" :class="{ 'text-inactive': !extensionEnabled }">{{ extensionEnabled ? 'Active' : 'Disabled' }}</span>
            </div>
          </div>
        </div>
      </div>
      <button class="power-btn" :class="{ 'power-off': !extensionEnabled }" type="button" aria-label="Power" @click="toggleExtension">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18.36 6.64a9 9 0 1 1-12.73 0"/><line x1="12" y1="2" x2="12" y2="12"/></svg>
      </button>
    </div>

    <!-- Whitelist Section -->
    <div class="whitelist-area">
      <section>
        <div class="section-title">
          <svg class="icon-list" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M3 13h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm4 4h14v-2H7v2zm0 4h14v-2H7v2zM7 7v2h14V7H7z"/></svg>
          <h2 class="section-heading">Whitelist</h2>
        </div>
        <p class="section-desc">Add domains you wish to not bypass.</p>

        <!-- Chips -->
        <div class="chip-list">
          <div v-for="domain in visibleDomains" :key="domain" class="chip">
            <span class="chip-text">{{ domain }}</span>
            <button type="button" aria-label="Remove" class="chip-remove" @click="removeDomain(domain)">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>
            </button>
          </div>
        </div>

        <!-- Textarea -->
        <div class="textarea-wrapper">
          <textarea
            id="whitelist"
            v-model="whitelist"
            spellcheck="false"
            :class="{ invalid: isInvalid }"
            placeholder="Enter domains (one per line)&#10;example.com&#10;*.example.org"
          ></textarea>
          <div class="textarea-buttons">
            <button type="button" aria-label="Clear" class="textarea-btn" @click="whitelist = ''">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/></svg>
            </button>
            <button type="button" aria-label="Save" class="textarea-btn" @click="saveWhitelist">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V7l-4-4zm-5 16c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm3-10H5V5h10v4z"/></svg>
            </button>
          </div>
        </div>
        <p v-if="isInvalid" class="error-msg">Use domains only, without paths or slashes.</p>
      </section>
    </div>

    <!-- Footer Actions -->
    <div class="footer">
      <button class="add-btn" type="button" @click="addCurrentPage">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11h-4v4h-2v-4H7v-2h4V7h2v4h4v2z"/></svg>
        Add Current Page to Whitelist
      </button>
      <div class="options-row">
        <button type="button" class="options-link" @click="openOptions">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M19.14 12.94c.04-.31.06-.63.06-.94 0-.31-.02-.63-.06-.94l2.03-1.58a.49.49 0 00.12-.61l-1.92-3.32a.488.488 0 00-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54a.484.484 0 00-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.04.31-.06.63-.06.94 0 .31.02.63.06.94l-2.03 1.58a.49.49 0 00-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z"/></svg>
          Open Options
        </button>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue';

const whitelist = ref('');
const version = ref('');
const extensionEnabled = ref(true);

const whitelistItems = computed(() =>
  whitelist.value
    .split('\n')
    .map((d) => d.trim())
    .filter(Boolean)
);
const visibleDomains = computed(() =>
  whitelistItems.value.length ? whitelistItems.value.slice(0, 6) : []
);
const isInvalid = computed(() => whitelist.value.includes('/'));

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

const openOptions = () => {
  window.open('/src/html/options.html');
};

const toggleExtension = () => {
  extensionEnabled.value = !extensionEnabled.value;
  chrome.storage.local.set({ extensionEnabled: extensionEnabled.value });
};

const removeDomain = (domain: string) => {
  whitelist.value = whitelistItems.value
    .filter((item) => item !== domain)
    .join('\n');
};

const saveWhitelist = () => {
  chrome.storage.local.get('options', (result: any) => {
    const options = Object.assign({}, defaultOptions, result.options);
    options.whitelist = whitelist.value;
    chrome.storage.local.set({ options });
  });
};

const addCurrentPage = () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs: any[]) => {
    if (!tabs || !tabs[0] || !tabs[0].url) return;
    let hostname = '';
    try {
      hostname = new URL(tabs[0].url).host;
    } catch {
      return;
    }
    if (!hostname || whitelistItems.value.includes(hostname)) return;
    const prefix = whitelist.value !== '' && !whitelist.value.endsWith('\n') ? '\n' : '';
    whitelist.value += prefix + hostname;
  });
};

const loadData = () => {
  chrome.storage.local.get('version', (data: any) => {
    version.value = 'v' + (data.version || '1.2.0');
  });
  chrome.storage.local.get('options', (result: any) => {
    const options = Object.assign({}, defaultOptions, result.options);
    whitelist.value = options.whitelist || '';
  });
  chrome.storage.local.get('extensionEnabled', (result: any) => {
    extensionEnabled.value = result.extensionEnabled !== false;
  });
};

watch(whitelist, (newVal) => {
  chrome.storage.local.get('options', (result: any) => {
    const options = Object.assign({}, defaultOptions, result.options);
    options.whitelist = newVal;
    chrome.storage.local.set({ options });
  });
});

onMounted(() => {
  loadData();
});
</script>

<style scoped>
/* ===== Reset ===== */
:global(body) {
  margin: 0;
  width: 400px;
  min-width: 400px;
  background: #0b1326;
}
:global(*) {
  box-sizing: border-box;
}

/* ===== Tokens (from Stitch tailwind config) ===== */
.popup-container {
  --bg: #0b1326;
  --surface-lowest: #060e20;
  --surface-low: #131b2e;
  --surface: #171f33;
  --surface-high: #222a3d;
  --surface-highest: #2d3449;
  --outline-variant: #424754;
  --on-surface: #dae2fd;
  --on-surface-variant: #c2c6d6;
  --primary: #adc6ff;
  --secondary: #ddb7ff;
  --tertiary: #4cd7f6;
  --error: #ffb4ab;
  --on-primary-container: #00285d;

  width: 400px;
  overflow: hidden;
  border-radius: 12px;
  border: 1px solid rgba(66, 71, 84, 0.3);
  background: var(--surface-low);
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.3);
  color: var(--on-surface);
  font-family: Geist, 'Segoe UI', sans-serif;
  font-size: 14px;
  line-height: 20px;
}

/* ===== Header ===== */
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px; /* p-container-padding = 1rem */
  border-bottom: 1px solid rgba(66, 71, 84, 0.2);
}

.header-left {
  display: flex;
  align-items: center;
  gap: 8px; /* gap-inline-gap = 0.5rem */
}

.logo-frame {
  width: 40px;
  height: 40px;
  border-radius: 8px;
  overflow: hidden;
  background: var(--surface);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.2);
}
.logo-frame img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.brand-name {
  margin: 0;
  font-family: Geist, sans-serif;
  font-size: 20px;
  line-height: 28px;
  letter-spacing: -0.01em;
  font-weight: 600;
  color: var(--primary);
}

.status-row {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 4px;
}

.version-pill {
  font-family: 'JetBrains Mono', monospace;
  font-size: 13px;
  line-height: 18px;
  color: var(--on-surface-variant);
  background: var(--surface-highest);
  padding: 2px 8px;
  border-radius: 9999px;
  border: 1px solid rgba(66, 71, 84, 0.5);
}

.active-badge {
  display: flex;
  align-items: center;
  gap: 4px;
}
.active-dot {
  width: 8px;
  height: 8px;
  border-radius: 9999px;
  background: var(--tertiary);
  box-shadow: 0 0 8px rgba(76, 215, 246, 0.5);
}
.active-text {
  font-family: 'JetBrains Mono', monospace;
  font-size: 12px;
  line-height: 16px;
  letter-spacing: 0.05em;
  font-weight: 500;
  color: var(--tertiary);
  text-transform: uppercase;
}

.power-btn {
  padding: 8px;
  border: 0;
  border-radius: 8px;
  background: transparent;
  color: var(--on-surface-variant);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: color 0.2s, background 0.2s;
}
.power-btn:hover {
  color: var(--on-surface);
  background: rgba(255, 255, 255, 0.05);
}
.power-btn.power-off {
  color: var(--error);
}
.power-btn.power-off:hover {
  color: var(--error);
  background: rgba(255, 180, 171, 0.1);
}

/* Disabled state visual */
.is-disabled .whitelist-area,
.is-disabled .footer {
  opacity: 0.5;
  pointer-events: none;
}

.active-dot.dot-inactive {
  background: var(--error);
  box-shadow: 0 0 8px rgba(255, 180, 171, 0.5);
}
.active-text.text-inactive {
  color: var(--error);
}

/* ===== Whitelist Section ===== */
.whitelist-area {
  padding: 16px; /* p-container-padding */
}
.whitelist-area > section {
  display: flex;
  flex-direction: column;
  gap: 0; /* controlled individually */
}

.section-title {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
}
.icon-list {
  color: var(--primary);
}
.section-heading {
  margin: 0;
  font-family: Geist, sans-serif;
  font-size: 20px;
  line-height: 28px;
  letter-spacing: -0.01em;
  font-weight: 600;
  color: var(--on-surface);
}

.section-desc {
  margin: 0 0 16px;
  font-size: 14px;
  line-height: 20px;
  color: var(--on-surface-variant);
}

/* Chips */
.chip-list {
  display: flex;
  flex-wrap: wrap;
  gap: 8px; /* gap-inline-gap */
  margin-bottom: 16px;
}

.chip {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 6px 12px;
  background: var(--surface);
  border: 1px solid rgba(66, 71, 84, 0.5);
  border-radius: 9999px;
  cursor: default;
  transition: border-color 0.15s;
}
.chip:hover {
  border-color: rgba(173, 198, 255, 0.5);
}
.chip-text {
  font-family: 'JetBrains Mono', monospace;
  font-size: 13px;
  line-height: 18px;
  color: var(--on-surface);
}
.chip-remove {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  border: 0;
  background: transparent;
  color: var(--on-surface-variant);
  cursor: pointer;
  transition: color 0.15s;
}
.chip:hover .chip-remove {
  color: var(--error);
}

/* Textarea */
.textarea-wrapper {
  position: relative;
}
textarea {
  width: 100%;
  height: 128px; /* h-32 */
  background: var(--surface-highest);
  border: 1px solid rgba(66, 71, 84, 0.5);
  border-radius: 8px;
  padding: 12px;
  font-family: 'JetBrains Mono', monospace;
  font-size: 13px;
  line-height: 18px;
  color: var(--on-surface);
  resize: none;
  outline: none;
  transition: border-color 0.15s, box-shadow 0.15s;
}
textarea:focus {
  border-color: var(--primary);
  box-shadow: 0 0 0 1px var(--primary);
}
textarea.invalid {
  border-color: var(--error);
}
textarea::placeholder {
  color: var(--on-surface-variant);
  -webkit-text-fill-color: var(--on-surface-variant);
  opacity: 0.5;
}

.textarea-buttons {
  position: absolute;
  bottom: 8px;
  right: 8px;
  display: flex;
  gap: 8px;
}
.textarea-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 6px;
  border: 0;
  border-radius: 4px;
  background: var(--surface);
  color: var(--on-surface-variant);
  cursor: pointer;
  transition: color 0.15s, background 0.15s;
}
.textarea-btn:hover {
  color: var(--on-surface);
  background: #31394d;
}

.error-msg {
  margin: 8px 0 0;
  color: var(--error);
  font-size: 13px;
}

/* ===== Footer ===== */
.footer {
  padding: 16px; /* p-container-padding */
  background: var(--surface-lowest);
  border-top: 1px solid rgba(66, 71, 84, 0.2);
  display: flex;
  flex-direction: column;
  gap: 12px; /* gap-stack-gap = 0.75rem */
}

.add-btn {
  width: 100%;
  padding: 12px 16px;
  border: 0;
  border-radius: 8px;
  background: linear-gradient(to right, var(--primary), var(--secondary));
  color: var(--on-primary-container);
  font-family: Geist, sans-serif;
  font-size: 20px;
  line-height: 28px;
  letter-spacing: -0.01em;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  cursor: pointer;
  box-shadow: 0 0 15px rgba(59, 130, 246, 0.2);
  transition: opacity 0.15s;
}
.add-btn:hover {
  opacity: 0.9;
}

.options-row {
  display: flex;
  justify-content: center;
}
.options-link {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 0;
  border: 0;
  background: transparent;
  color: var(--on-surface-variant);
  font-family: 'JetBrains Mono', monospace;
  font-size: 12px;
  line-height: 16px;
  letter-spacing: 0.05em;
  font-weight: 500;
  text-transform: uppercase;
  text-decoration: none;
  cursor: pointer;
  transition: color 0.15s;
}
.options-link:hover {
  color: var(--primary);
}
</style>
