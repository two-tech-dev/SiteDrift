<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { getStats, type StatsSummary } from '../api';

const stats = ref<StatsSummary | null>(null);
const statsError = ref('');

onMounted(async () => {
  try {
    stats.value = await getStats();
  } catch (error) {
    statsError.value = error instanceof Error ? error.message : 'Unable to load stats';
  }
});

const installUrl = 'https://chromewebstore.google.com/detail/sitedrift/omfceoggegbdgijlpnmppphjpkapkham';

const formatEstimatedTimeSaved = (totalBypasses?: number) => {
  if (!totalBypasses) return '...';

  const seconds = totalBypasses * 10;
  const minutes = Math.round(seconds / 60);
  const hours = Math.round(seconds / 3600);
  const days = Math.round(seconds / 86400);
  const years = Math.round(seconds / 31536000);

  if (seconds < 60) return `${seconds}s`;
  if (minutes < 60) return `${minutes.toLocaleString()}m`;
  if (hours < 24) return `${hours.toLocaleString()}h`;
  if (days < 365) return `${days.toLocaleString()}d`;
  return `${years.toLocaleString()}y`;
};
</script>

<template>
  <main class="page-wrapper">
    <div class="container">

      <!-- Hero -->
      <section class="hero-section text-center">
        <div
          v-motion
          :initial="{ opacity: 0, y: 40 }"
          :visible-once="{ opacity: 1, y: 0, transition: { type: 'spring', stiffness: 120, damping: 18, delay: 100 } }"
        >
          <div class="hero-badge">
            <span class="status-dot"></span>
            Open Source
          </div>

          <h1 class="hero-title">SiteDrift</h1>

          <p class="hero-lead">
            Skip artificial waits with open-source transparency. SiteDrift helps you move past
            supported shorteners, clean noisy tracking parameters, and use community-powered
            bypass data without hiding how the system works.
          </p>

          <div class="hero-actions">
            <a :href="installUrl" class="btn btn-primary btn-large">
              Add to Browser
            </a>
            <router-link to="/supported" class="btn btn-secondary btn-large">
              View Supported Sites
            </router-link>
          </div>
        </div>
      </section>

      <!-- Browser Mockup -->
      <div
        class="hero-mockup-wrapper"
        v-motion
        :initial="{ opacity: 0, y: 60 }"
        :visible-once="{ opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100, damping: 18, delay: 300 } }"
      >
          <div class="browser-mockup">
            <div class="browser-header">
              <div class="dots">
                <span class="dot dot-red"></span>
                <span class="dot dot-yellow"></span>
                <span class="dot dot-green"></span>
              </div>
              <div class="url-bar">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
                <span>linkvertise.com/dynamic...</span>
              </div>
            </div>
            <div class="browser-body">
              <div class="bypass-flow">
                <div class="flow-step flow-intercepting">Intercepting Linkvertise...</div>
                <div class="flow-arrow">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 5v14M19 12l-7 7-7-7"/></svg>
                </div>
                <div class="flow-step flow-success">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                  Target found. Skipping wait...
                </div>
              </div>
            </div>
          </div>
      </div>

      <!-- Stats -->
      <section
        class="stats-section"
        v-motion
        :initial="{ opacity: 0, y: 30 }"
        :visible-once="{ opacity: 1, y: 0, transition: { type: 'spring', stiffness: 120, damping: 18, delay: 200 } }"
      >
        <p class="section-label">Aggregate community activity</p>
        <div class="stats-row">
          <div class="stat-block">
            <h3>{{ stats?.total_bypasses?.toLocaleString() || '...' }}</h3>
            <p>Community-recorded bypasses</p>
          </div>
          <div class="divider"></div>
          <div class="stat-block">
            <h3>{{ stats?.today_bypasses?.toLocaleString() || '...' }}</h3>
            <p>Bypasses recorded today</p>
          </div>
          <div class="divider"></div>
          <div class="stat-block">
            <h3>{{ formatEstimatedTimeSaved(stats?.total_bypasses) }}</h3>
            <p>Estimated time saved</p>
          </div>
        </div>
        <p class="stats-note">Estimated from roughly 10 seconds saved per successful bypass.</p>
        <p v-if="statsError" class="stats-note stats-error">Live stats are temporarily unavailable.</p>
      </section>

      <!-- Features -->
      <section class="features-section">
        <div class="section-header text-center">
          <span class="eyebrow">Features</span>
          <h2>Everything you need, nothing you don't.</h2>
        </div>

        <div class="features-grid">
          <div
            class="feature-card card col-span-2"
            v-motion
            :initial="{ opacity: 0, y: 30 }"
            :visible-once="{ opacity: 1, y: 0, transition: { type: 'spring', stiffness: 150, damping: 18, delay: 100 } }"
          >
            <h3>Crowd Sourced Intelligence</h3>
            <p>When one user solves a difficult shortlink or CAPTCHA, the final destination is securely shared. The next person to visit that exact link skips the wait entirely.</p>
          </div>

          <div
            class="feature-card card"
            v-motion
            :initial="{ opacity: 0, y: 30 }"
            :visible-once="{ opacity: 1, y: 0, transition: { type: 'spring', stiffness: 150, damping: 18, delay: 200 } }"
          >
            <h3>Tracker Free</h3>
            <p>Strips analytics, UTM parameters, and malicious IP-logging tokens from URLs before you visit them.</p>
          </div>

          <div
            class="feature-card card"
            v-motion
            :initial="{ opacity: 0, y: 30 }"
            :visible-once="{ opacity: 1, y: 0, transition: { type: 'spring', stiffness: 150, damping: 18, delay: 300 } }"
          >
            <h3>100% Open</h3>
            <p>Fully open-source codebase. Audit the extension, the Go backend, and contribute your own bypasses.</p>
          </div>

          <div
            class="feature-card card col-span-2"
            v-motion
            :initial="{ opacity: 0, y: 30 }"
            :visible-once="{ opacity: 1, y: 0, transition: { type: 'spring', stiffness: 150, damping: 18, delay: 400 } }"
          >
            <h3>Universal Support</h3>
            <p>Handles over 50+ of the most stubborn link monetization services (Linkvertise, AdFly, OuO, and dozens more). Works on Chrome, Firefox, and Edge.</p>
          </div>
        </div>
      </section>

      <!-- Trust -->
      <section class="trust-section">
        <div class="section-header text-center">
          <span class="eyebrow">Trust Model</span>
          <h2>Transparent by design.</h2>
        </div>

        <div class="trust-grid">
          <div class="trust-card card">
            <span class="trust-kicker">Audit</span>
            <h3>Open source codebase</h3>
            <p>The extension, bypass modules, and backend are designed to be reviewed rather than trusted blindly.</p>
          </div>
          <div class="trust-card card">
            <span class="trust-kicker">Clean</span>
            <h3>Tracker cleanup</h3>
            <p>Supported URL patterns are cleaned before navigation so unnecessary tracking noise does not follow you.</p>
          </div>
          <div class="trust-card card">
            <span class="trust-kicker">Crowd</span>
            <h3>Community-powered results</h3>
            <p>Crowd bypass data helps repeated links resolve faster while keeping stats focused on aggregate activity.</p>
          </div>
        </div>
      </section>

      <!-- How it Works -->
      <section class="how-section card">
        <div class="text-center" style="margin-bottom: 3rem;">
          <span class="eyebrow">How It Works</span>
          <h2>Three steps. Zero waiting.</h2>
        </div>
        <div class="steps-grid">
          <div class="step-card">
            <div class="step-number">1</div>
            <h3>Click a Link</h3>
            <p>You click on a frustrating link shortener that normally makes you wait 15 seconds.</p>
          </div>
          <div class="step-card">
            <div class="step-number">2</div>
            <h3>SiteDrift Intercepts</h3>
            <p>The extension catches the navigation and executes a specific bypass module for that domain.</p>
          </div>
          <div class="step-card">
            <div class="step-number">3</div>
            <h3>Instant Arrival</h3>
            <p>SiteDrift extracts the hidden target URL and takes you directly to your destination.</p>
          </div>
        </div>
      </section>

      <!-- CTA -->
      <section class="cta-section text-center">
        <h2>Ready to take back your time?</h2>
        <p style="margin-bottom: 2rem; font-size: 1.05rem;">Join thousands of users who browse without artificial roadblocks.</p>
        <a :href="installUrl" class="btn btn-primary btn-large">
          Install SiteDrift
        </a>
      </section>

    </div>
  </main>
</template>

<style scoped>
/* Hero */
.hero-section {
  padding: 6rem 0 4rem;
  min-height: calc(100vh - 10rem);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.hero-badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 5px 14px;
  border-radius: var(--radius-full);
  background: var(--color-brand-light);
  border: 1px solid hsl(189, 60%, 82%);
  font-size: 0.8rem;
  font-weight: 600;
  margin-bottom: 2rem;
  color: var(--color-brand-dark);
}

.status-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: var(--color-brand);
}

.hero-title {
  font-size: clamp(3rem, 6vw, 4.5rem);
  line-height: 1.05;
  margin-bottom: 1.5rem;
  font-weight: 900;
  letter-spacing: -0.04em;
  color: var(--color-text-primary);
}

.hero-lead {
  font-size: 1.15rem;
  max-width: 580px;
  margin: 0 auto 2.5rem;
  line-height: 1.7;
  color: var(--color-text-secondary);
}

.hero-actions {
  display: flex;
  gap: 0.75rem;
  justify-content: center;
  margin-bottom: 2.5rem;
}

.btn-large {
  padding: 0.8rem 1.75rem;
  font-size: 0.95rem;
}

/* Browser Mockup */
.hero-mockup-wrapper {
  width: 100%;
  max-width: 720px;
  margin: 4rem auto 0;
  padding: 2rem;
  background: var(--color-overlay);
  border-radius: var(--radius-xl);
}

.browser-mockup {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  overflow: hidden;
  box-shadow: var(--shadow-lg);
}

.browser-header {
  background: var(--color-overlay);
  padding: 12px 16px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid var(--color-border);
}

.dots {
  display: flex;
  gap: 6px;
  margin-right: 14px;
}

.dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
}

.dot-red { background: #ff5f56; }
.dot-yellow { background: #ffbd2e; }
.dot-green { background: #27c93f; }

.url-bar {
  flex: 1;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  padding: 6px 12px;
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.8rem;
  color: var(--color-text-muted);
  font-family: monospace;
}

.browser-body {
  padding: 3rem 2rem;
  display: flex;
  justify-content: center;
}

.bypass-flow {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  font-family: monospace;
  font-size: 0.875rem;
}

.flow-step {
  padding: 8px 16px;
  border-radius: var(--radius-sm);
}

.flow-intercepting {
  color: var(--color-text-secondary);
  border: 1px dashed var(--color-border-strong);
}

.flow-arrow {
  color: var(--color-text-muted);
}

.flow-success {
  color: var(--color-success);
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 18px;
  background: hsl(145, 50%, 96%);
  border: 1px solid hsl(145, 40%, 78%);
  border-radius: var(--radius-sm);
  font-weight: 600;
}

/* Stats */
.stats-section {
  margin: 5rem 0;
  text-align: center;
}

.section-label {
  color: var(--color-text-muted);
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  margin-bottom: 2rem;
}

.stats-row {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 3rem;
  max-width: 800px;
  margin: 0 auto;
}

.stat-block h3 {
  font-size: 2.25rem;
  color: var(--color-text-primary);
  margin-bottom: 0.4rem;
}

.stat-block p {
  color: var(--color-text-secondary);
  font-size: 0.85rem;
}

.stats-note {
  margin-top: 1.5rem;
  font-size: 0.85rem;
  color: var(--color-text-muted);
}

.stats-error {
  color: var(--color-danger);
}

.divider {
  width: 1px;
  height: 36px;
  background: var(--color-border);
}

/* Features */
.features-section {
  padding: 4rem 0 6rem;
}

.section-header {
  margin-bottom: 2.5rem;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.25rem;
  max-width: 960px;
  margin: 0 auto;
}

.feature-card {
  padding: 2rem;
}

.feature-card h3 {
  margin-bottom: 0.75rem;
}

.feature-card p {
  color: var(--color-text-secondary);
  font-size: 0.9rem;
  line-height: 1.6;
}

.col-span-2 {
  grid-column: span 2;
}

/* Trust */
.trust-section {
  padding: 0 0 6rem;
}

.trust-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.25rem;
  max-width: 960px;
  margin: 0 auto;
}

.trust-card {
  padding: 1.75rem;
}

.trust-kicker {
  display: inline-flex;
  margin-bottom: 0.75rem;
  color: var(--color-brand);
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
}

.trust-card h3 {
  font-size: 1.1rem;
  margin-bottom: 0.6rem;
}

.trust-card p {
  color: var(--color-text-secondary);
  font-size: 0.875rem;
}

/* How it Works */
.how-section {
  margin: 0 0 6rem;
  padding: 3.5rem 2rem;
}

.steps-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  max-width: 900px;
  margin: 0 auto;
}

.step-card {
  text-align: center;
  padding: 1rem;
}

.step-number {
  width: 44px;
  height: 44px;
  margin: 0 auto 1.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: var(--color-brand-light);
  color: var(--color-brand-dark);
  font-size: 1.25rem;
  font-weight: 700;
  border: 1px solid hsl(189, 60%, 82%);
}

.step-card h3 {
  font-size: 1.1rem;
  margin-bottom: 0.75rem;
}

.step-card p {
  color: var(--color-text-secondary);
  font-size: 0.875rem;
}

/* CTA */
.cta-section {
  padding: 4rem 0 6rem;
}

.cta-section h2 {
  margin-bottom: 0.75rem;
}

.cta-section p {
  color: var(--color-text-secondary);
}

@media (max-width: 768px) {
  .hero-section {
    width: 100%;
    overflow: hidden;
  }

  .hero-title {
    font-size: clamp(2.5rem, 14vw, 3.5rem);
  }

  .hero-lead {
    max-width: 100%;
    font-size: 1rem;
  }

  .hero-actions {
    width: 100%;
    flex-direction: column;
    align-items: stretch;
  }

  .hero-actions .btn {
    width: 100%;
    white-space: normal;
    text-align: center;
  }

  .stats-row {
    flex-direction: column;
    gap: 1.5rem;
  }

  .divider {
    width: 36px;
    height: 1px;
  }

  .features-grid, .steps-grid, .trust-grid {
    grid-template-columns: 1fr;
  }

  .col-span-2 {
    grid-column: span 1;
  }
}
</style>
