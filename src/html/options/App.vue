<template>
  <div id="options-app">
    <nav>
      <ul>
        <div class="logo-wrapper">
          <img class="logo" src="../../icon/branding.png" alt="SiteDrift" />
        </div>
        <div class="spacer"></div>
        <li class="navlink"><a href="https://sitedrift.team/changelog" target="_blank" data-message="changelog">Changelog</a></li>
        <li class="navlink"><a href="https://sitedrift.team/faq" target="_blank" data-message="faq">FAQ</a></li>
        <li class="navlink"><a href="https://sitedrift.team/contributors" target="_blank" data-message="contributors">Contributors</a></li>
      </ul>
    </nav>
    <div>
      <div id="contribute" hidden>
        <p>
          <span>SiteDrift needs contributors to help bring parity to the Mv3 extension! Click </span>
          <a href="https://discord.gg/RSAf7b5njt" target="_blank">here</a>
          <span> to see how you can help!</span>
        </p>
        <div id="close"></div>
      </div>
      <form id="options-form" @submit.prevent>
        <section>
          <h2 data-message="options">Options</h2>
          <div class="option">
            <label class="ffInput">
              <input v-model="options.navigationDelayToggle" type="checkbox" />
              <span class="checkmark"></span>
            </label>
            <span data-message="optionsNavigationDelay" for="option-navigation-delay">Bypass countdowns</span>
            <p data-message="optionsNavigationDelayDescription"></p>
          </div>
          <hr /><br />
          <div class="option">
            <label class="ffInput">
              <input v-model="options.optionTrackerBypass" type="checkbox" />
              <span class="checkmark"></span>
            </label>
            <span data-message="optionsTrackerBypass" for="option-tracker-bypass">Bypass trackers</span> (<a href="https://unshorten.me/privacy-policy" target="_blank" data-message="privacyPolicy" class="link">Privacy Policy</a>)
            <p data-message="optionsTrackerBypassDescription"></p>
          </div>
          <div class="indentedOption">
            <label class="ffInput">
              <input v-model="options.optionInstantNavigationTrackers" type="checkbox" />
              <span class="checkmark"></span>
            </label>
            <span data-message="optionsInstantNavigationTrackers" for="option-instant-navigation-trackers">Instant navigation for trackers</span>
            <p data-message="optionsInstantNavigationTrackersDescription"></p>
          </div>
          <hr /><br />
          <div class="option">
            <label class="ffInput">
              <input v-model="options.optionBlockIpLoggers" type="checkbox" />
              <span class="checkmark"></span>
            </label>
            <span data-message="optionsBlockIPLoggers" for="option-block-ip-loggers">Block IP loggers</span>
            <p data-message="optionsBlockIPLoggersDescription"></p>
          </div>
          <hr /><br />
          <div class="option">
            <label class="ffInput">
              <input v-model="options.optionCrowdBypass" type="checkbox" />
              <span class="checkmark"></span>
            </label>
            <span data-message="optionsCrowdBypass" for="option-crowd-bypass">Crowd Bypass</span> (<a href="https://github.com/2Tech Studio (2tech.studio) (prev FastForward)/SiteDrift/blob/master/PRIVACY.md#crowd-bypass" target="_blank" data-message="privacyPolicy" class="link">Privacy Policy</a>)
            <p data-message="optionsCrowdBypassDescription"></p>
            <span v-if="tempDisableCrowd" id="crowdTempDisabledMessage">
              (<span class="text-warn" data-message="crowdBypassTempDisabled">Temporarily Disabled</span>)
            </span>
          </div>
          <div class="indentedOption">
            <label class="ffInput">
              <input v-model="options.optionCrowdOpenDelayToggle" type="checkbox" />
              <span class="checkmark"></span>
            </label>
            <span data-message="optionsCrowdAutoOpen" for="option-crowd-open-delay">Auto-open crowd-bypassed links</span>
            <p data-message="optionsCrowdAutoOpenDescription"></p>
          </div>
          <div class="indentedOption">
            <label class="ffInput">
              <input v-model="options.optionCrowdCloseDelayToggle" type="checkbox" />
              <span class="checkmark"></span>
            </label>
            <span data-message="optionsCrowdAutoClose" for="option-crowd-close-delay">Auto-close crowd-bypassed links</span>
            <p data-message="optionsCrowdAutoCloseDescription"></p>
          </div>
        </section>
        <section>
          <h2 data-message="optionsWhitelist">Whitelist</h2>
          <p data-message="optionsWhitelistDescription" v-html="whitelistDesc"></p>
          <textarea
            id="whitelist"
            v-model="options.whitelist"
            class="ffInput"
            spellcheck="false"
            :class="{ invalid: isInvalid }"
          ></textarea>
        </section>
      </form>
      <p class="version">
        <span data-message="version">Version:</span> <span>{{ version }}</span>
      </p>
    </div>
  </div>
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
const whitelistDesc = ref('Add domains you wish to not bypass here. E.g. <code>subdomain.domain.tld</code> or <code>domain.tld</code>');

const isInvalid = computed(() => options.whitelist.includes('/'));

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
.invalid {
  border-color: red !important;
}
</style>
