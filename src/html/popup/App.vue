<template>
  <div id="popup-app">
    <nav>
      <ul>
        <div class="logo-wrapper">
          <img class="logo" src="../../icon/branding.png" alt="FastForward" />
        </div>
        <div class="spacer"></div>
      </ul>
    </nav>
    <div>
      <div id="counter" hidden>
        <p>
          <span></span>
          <a href="https://discord.gg/RSAf7b5njt" target="_blank" data-message="support"></a>
        </p>
      </div>
      <form id="options-form" @submit.prevent>
        <section>
          <input
            id="openOptions"
            class="ffInput"
            type="button"
            value="Options Page"
            @click="openOptions"
          />
        </section>
        <section>
          <h2 data-message="optionsWhitelist">Whitelist</h2>
          <p id="whitelistDesc">
            <span v-html="whitelistDesc"></span>
          </p>
          <textarea
            id="whitelist"
            class="ffInput"
            spellcheck="false"
            v-model="whitelist"
            :class="{ invalid: isInvalid }"
          ></textarea>
          <input
            id="addToWhitelist"
            class="ffInput"
            type="button"
            value="Add Current Page To Whitelist"
            @click="addCurrentPage"
          />
        </section>
      </form>
      <p class="version">
        <span data-message="version">Version:</span> <span>{{ version }}</span>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue';

const whitelist = ref('');
const version = ref('');
const whitelistDesc = ref('Add domains you wish to not bypass here. E.g. <code>subdomain.domain.tld</code> or <code>domain.tld</code>');

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

const addCurrentPage = () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs: any[]) => {
    if (!tabs || !tabs[0] || !tabs[0].url) return;
    const hostname = new URL(tabs[0].url).host;
    if (!whitelist.value.includes(hostname)) {
      const prefix = whitelist.value !== '' && !whitelist.value.endsWith('\n') ? '\n' : '';
      whitelist.value += prefix + hostname;
    }
  });
};

const loadData = () => {
  chrome.storage.local.get('version', (data: any) => {
    version.value = (data.version || 'Unknown') + '-Mv3';
  });
  chrome.storage.local.get('options', (result: any) => {
    const options = Object.assign({}, defaultOptions, result.options);
    whitelist.value = options.whitelist || '';
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
#popup-app {
  width: 400px;
}

#openOptions {
  cursor: pointer;
  font-size: 20px;
  margin-left: auto;
  margin-right: auto;
  display: block;
  margin-bottom: 0px;
}

#addToWhitelist {
  cursor: pointer;
  width: -webkit-fill-available;
  width: -moz-available;
}

*:not(textarea) {
  transition: none !important;
}

textarea.invalid {
  border-color: red;
}
</style>
