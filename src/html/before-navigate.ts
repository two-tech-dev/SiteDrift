import './base';
import './i18n';

declare const browser: any;
declare const chrome: any;
const brws = typeof browser !== 'undefined' ? browser : chrome;

const timerElement = document.getElementById('timer') as HTMLElement;
const timerText = timerElement.querySelector('p') as HTMLParagraphElement;

// Get target URL from search parameter
const urlParams = new URLSearchParams(window.location.search);
const targetUrl = urlParams.get('target');

function escapeHtml(unsafe) {
  if (!unsafe) return unsafe; //prevents null objects from throwing an error
  return unsafe
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

// Update destination message with target URL
const destinationElement = document.querySelector('#destination');
destinationElement.innerHTML = brws.i18n.getMessage(
  'beforeNavigateDestination',
  `<br><a href="${escapeHtml(
    targetUrl
  )}" class="link link-preview"><code> ${escapeHtml(targetUrl)} </a></code>`
);

brws.storage.local.get('options', (result) => {
  if (!result.options.navigationDelayToggle) {
    return;
  }
  const delay = result.options.navigationDelay;
  let timeLeft = delay;

  timerElement.classList.remove('uk-hidden');
  timerText.textContent = brws.i18n.getMessage(
    timeLeft === 1 ? 'beforeNavigateTimerSingular' : 'beforeNavigateTimer',
    [timeLeft]
  );

  const interval = setInterval(() => {
    timeLeft--;
    if (timeLeft <= 0) {
      clearInterval(interval);
      window.location.href = targetUrl;
    } else {
      timerText.textContent = brws.i18n.getMessage(
        timeLeft === 1 ? 'beforeNavigateTimerSingular' : 'beforeNavigateTimer',
        [timeLeft]
      );
    }
  }, 1000);
});

export {};
