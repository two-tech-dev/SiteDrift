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

const installUrl = 'https://github.com/2Technologysolutions/SiteDrift';
</script>

<template>
  <main class="page-wrapper">
    <div class="container">
      
      <!-- Clean, Typography-led Hero -->
      <section class="hero-section text-center">
        <div 
          v-motion
          :initial="{ opacity: 0, y: 60, scale: 0.9 }"
          :visible-once="{ opacity: 1, y: 0, scale: 1, transition: { type: 'spring', stiffness: 100, damping: 15, mass: 1, delay: 100 } }"
        >
          <div class="hero-badge">
            <span class="pulse-dot"></span>
            SiteDrift is now Open Source
          </div>
          
          <h1 class="hero-title rainbow-letters">
            <span>S</span><span>i</span><span>t</span><span>e</span><span>D</span><span>r</span><span>i</span><span>f</span><span>t</span>
          </h1>
          
          <p class="hero-lead text-muted">
            <strong style="color: var(--text-main);">Bypass shorteners, Reclaim your time.</strong><br/>
            The community-driven browser extension that instantly skips irritating link shorteners, 
            removes trackers, and takes you straight to your destination. No waiting, no clicking "Next".
          </p>
          
          <div class="hero-actions">
            <a :href="installUrl" class="btn btn-primary btn-large">
              Add to Browser — It's Free
            </a>
            <router-link to="/supported" class="btn btn-secondary btn-large">
              View Supported Sites
            </router-link>
          </div>
        </div>

        <!-- Tangible UI Mockup instead of abstract orbs -->
        <div 
          class="hero-mockup-wrapper"
          v-motion
          :initial="{ opacity: 0, y: 80, rotateX: 10, scale: 0.9 }"
          :visible-once="{ opacity: 1, y: 0, rotateX: 0, scale: 1, transition: { type: 'spring', stiffness: 80, damping: 14, delay: 300 } }"
        >
          <div class="browser-mockup">
            <div class="browser-header">
              <div class="dots">
                <span class="dot close"></span>
                <span class="dot min"></span>
                <span class="dot max"></span>
              </div>
              <div class="url-bar">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="lock-icon"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
                <span>linkvertise.com/dynamic...</span>
              </div>
            </div>
            <div class="browser-body">
              <div class="bypass-animation">
                <div class="step-1">Intercepting Linkvertise...</div>
                <div class="arrow-down">↓</div>
                <div class="step-2 success">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                  Target Found! Skipping wait...
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Minimal Stats Section -->
      <section 
        class="stats-section"
        v-motion
        :initial="{ opacity: 0, scale: 0.8 }"
        :visible-once="{ opacity: 1, scale: 1, transition: { type: 'spring', stiffness: 120, damping: 15, delay: 200 } }"
      >
        <p class="section-label">Trusted by the community to bypass</p>
        <div class="stats-row">
          <div class="stat-block">
            <h3>{{ stats?.total_bypasses?.toLocaleString() || '...' }}</h3>
            <p>Total Links Bypassed</p>
          </div>
          <div class="divider"></div>
          <div class="stat-block">
            <h3>{{ stats?.today_bypasses?.toLocaleString() || '...' }}</h3>
            <p>Bypassed Today</p>
          </div>
          <div class="divider"></div>
          <div class="stat-block">
            <h3>{{ stats?.total_bypasses ? Math.max(1, Math.round((stats.total_bypasses * 10) / 31536000)).toLocaleString() : '...' }}</h3>
            <p>Years of Time Saved</p>
          </div>
        </div>
      </section>

      <!-- Bento-box style features -->
      <section class="features-bento">
        <div class="bento-header text-center">
          <span class="eyebrow">Features</span>
          <h2>Everything you need, nothing you don't.</h2>
        </div>
        
        <div class="bento-grid">
          <div 
            class="bento-card col-span-2 glass-panel"
            v-motion
            :initial="{ opacity: 0, y: 40, scale: 0.95 }"
            :visible-once="{ opacity: 1, y: 0, scale: 1, transition: { type: 'spring', stiffness: 150, damping: 15, delay: 100 } }"
          >
            <div class="bento-content">
              <h3>Crowd Sourced Intelligence</h3>
              <p class="text-muted">You're not alone. When one user solves a difficult shortlink or CAPTCHA, the final destination is securely shared to our backend. The next person to visit that exact link skips the wait entirely. We call this Crowd Bypass.</p>
            </div>
          </div>
          
          <div 
            class="bento-card glass-panel"
            v-motion
            :initial="{ opacity: 0, y: 40, scale: 0.95 }"
            :visible-once="{ opacity: 1, y: 0, scale: 1, transition: { type: 'spring', stiffness: 150, damping: 15, delay: 200 } }"
          >
            <div class="bento-content">
              <h3>Tracker Free</h3>
              <p class="text-muted">Automatically strips out analytics, UTM parameters, and malicious IP-logging tracking tokens from URLs before you visit them.</p>
            </div>
          </div>
          
          <div 
            class="bento-card glass-panel"
            v-motion
            :initial="{ opacity: 0, y: 40, scale: 0.95 }"
            :visible-once="{ opacity: 1, y: 0, scale: 1, transition: { type: 'spring', stiffness: 150, damping: 15, delay: 300 } }"
          >
            <div class="bento-content">
              <h3>100% Open</h3>
              <p class="text-muted">A fully open-source codebase. You can audit the extension, the Go backend, and even contribute your own custom bypasses.</p>
            </div>
          </div>
          
          <div 
            class="bento-card col-span-2 glass-panel"
            v-motion
            :initial="{ opacity: 0, y: 40, scale: 0.95 }"
            :visible-once="{ opacity: 1, y: 0, scale: 1, transition: { type: 'spring', stiffness: 150, damping: 15, delay: 400 } }"
          >
            <div class="bento-content">
              <h3>Universal Support</h3>
              <p class="text-muted">Engineered to handle over 50+ of the most stubborn and annoying link monetization services on the internet (Linkvertise, AdFly, OuO, and dozens more). Works on Chrome, Firefox, and Edge.</p>
            </div>
          </div>
        </div>
      </section>

      <!-- How it Works Section -->
      <section class="how-it-works-section glass-panel">
        <div class="text-center" style="margin-bottom: 3rem;">
          <span class="eyebrow">How It Works</span>
          <h2>Magic, but it's just code.</h2>
        </div>
        <div class="steps-grid">
          <div class="step-card">
            <div class="step-number">1</div>
            <h3>Click a Link</h3>
            <p class="text-muted">You click on a frustrating link shortener or ad-wall that normally makes you wait 15 seconds.</p>
          </div>
          <div class="step-card">
            <div class="step-number">2</div>
            <h3>SiteDrift Intercepts</h3>
            <p class="text-muted">Our extension catches the navigation, analyzes the URL, and executes a specific bypass module for that domain.</p>
          </div>
          <div class="step-card">
            <div class="step-number">3</div>
            <h3>Instant Arrival</h3>
            <p class="text-muted">SiteDrift extracts the hidden target URL and teleports you directly to your actual destination. Zero waiting.</p>
          </div>
        </div>
      </section>

      <!-- CTA Section -->
      <section class="cta-section text-center">
        <h2>Ready to take back your time?</h2>
        <p class="text-muted" style="margin-bottom: 2rem; font-size: 1.1rem;">Join thousands of users who browse the web without artificial roadblocks.</p>
        <a :href="installUrl" class="btn btn-primary btn-large">
          Install SiteDrift Now
        </a>
      </section>
      
    </div>
  </main>
</template>

<style scoped>
/* Hero Section */
.hero-section {
  padding: 4rem 0 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.hero-badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 6px 16px;
  border-radius: var(--radius-full);
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid var(--border-light);
  font-size: 0.875rem;
  font-weight: 500;
  margin-bottom: 2rem;
  color: var(--text-muted);
}

.pulse-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--accent-cyan);
  box-shadow: 0 0 10px var(--accent-cyan);
}

.hero-title {
  font-size: clamp(3rem, 6vw, 5rem);
  line-height: 1.1;
  margin-bottom: 1.5rem;
  font-weight: 800;
  letter-spacing: -0.03em;
}

.rainbow-letters span {
  display: inline-block;
  transition: transform 0.2s ease;
}

.rainbow-letters span:hover {
  transform: translateY(-4px);
}

.rainbow-letters span:nth-child(1) { color: #ff595e; }
.rainbow-letters span:nth-child(2) { color: #ff924c; }
.rainbow-letters span:nth-child(3) { color: #ffca3a; }
.rainbow-letters span:nth-child(4) { color: #8ac926; }
.rainbow-letters span:nth-child(5) { color: #1982c4; }
.rainbow-letters span:nth-child(6) { color: #4267ac; }
.rainbow-letters span:nth-child(7) { color: #6a4c93; }
.rainbow-letters span:nth-child(8) { color: #b56576; }
.rainbow-letters span:nth-child(9) { color: #e56b6f; }

.hero-lead {
  font-size: 1.25rem;
  max-width: 600px;
  margin: 0 auto 3rem;
  line-height: 1.6;
}

.hero-actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-bottom: 12rem; /* Pushed down so the terminal doesn't appear immediately */
}

.btn-large {
  padding: 1rem 2rem;
  font-size: 1.05rem;
  font-weight: 600;
}

/* Browser Mockup */
.hero-mockup-wrapper {
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  perspective: 1000px;
}

.browser-mockup {
  background: #0d1117;
  border: 1px solid var(--border-strong);
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 30px 60px rgba(0, 0, 0, 0.5), 0 0 40px rgba(76, 215, 246, 0.1);
}

.browser-header {
  background: #161b22;
  padding: 12px 16px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid var(--border-light);
}

.dots {
  display: flex;
  gap: 6px;
  margin-right: 16px;
}

.dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
}

.dot.close { background: #ff5f56; }
.dot.min { background: #ffbd2e; }
.dot.max { background: #27c93f; }

.url-bar {
  flex: 1;
  background: #0d1117;
  border: 1px solid var(--border-light);
  border-radius: 6px;
  padding: 6px 12px;
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.875rem;
  color: var(--text-muted);
  font-family: monospace;
}

.browser-body {
  padding: 4rem 2rem;
  display: flex;
  justify-content: center;
  background: radial-gradient(circle at center, rgba(173, 198, 255, 0.05), transparent 60%);
}

.bypass-animation {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  font-family: monospace;
}

.step-1 {
  color: var(--text-muted);
  padding: 8px 16px;
  border: 1px dashed var(--border-strong);
  border-radius: 6px;
}

.arrow-down {
  color: var(--border-strong);
}

.step-2.success {
  color: var(--accent-green);
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 20px;
  background: rgba(129, 201, 149, 0.1);
  border: 1px solid rgba(129, 201, 149, 0.2);
  border-radius: 8px;
  font-weight: 600;
}

/* Stats Section */
.stats-section {
  margin: 6rem 0;
  text-align: center;
}

.section-label {
  color: var(--text-muted);
  font-size: 0.875rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin-bottom: 2rem;
}

.stats-row {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 3rem;
  max-width: 900px;
  margin: 0 auto;
}

.stat-block h3 {
  font-size: 2.5rem;
  color: var(--text-main);
  margin-bottom: 0.5rem;
}

.stat-block p {
  color: var(--text-muted);
  font-size: 0.875rem;
}

.divider {
  width: 1px;
  height: 40px;
  background: var(--border-strong);
}

/* Bento Grid */
.features-bento {
  padding: 4rem 0 8rem;
}

.bento-header {
  margin-bottom: 3rem;
}

.bento-header h2 {
  font-size: 2.25rem;
}

.bento-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
  max-width: 1000px;
  margin: 0 auto;
}

.bento-card {
  padding: 2.5rem;
  border-radius: 24px;
  background: rgba(255, 255, 255, 0.02);
}

.bento-card:hover {
  background: rgba(255, 255, 255, 0.04);
}

.col-span-2 {
  grid-column: span 2;
}

.bento-content h3 {
  font-size: 1.25rem;
  margin-bottom: 1rem;
  color: var(--text-main);
}

  .bento-content p {
    line-height: 1.6;
    font-size: 0.95rem;
  }
  
  /* How it Works Section */
  .how-it-works-section {
    margin: 4rem 0 8rem;
    padding: 4rem 2rem;
  }
  
  .steps-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 2rem;
    max-width: 1000px;
    margin: 0 auto;
  }
  
  .step-card {
    text-align: center;
    padding: 1.5rem;
  }
  
  .step-number {
    width: 48px;
    height: 48px;
    margin: 0 auto 1.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    background: rgba(76, 215, 246, 0.1);
    color: var(--accent-cyan);
    font-size: 1.5rem;
    font-weight: 700;
    border: 2px solid rgba(76, 215, 246, 0.3);
  }
  
  .step-card h3 {
    font-size: 1.25rem;
    margin-bottom: 1rem;
    color: var(--text-main);
  }
  
  /* CTA Section */
  .cta-section {
    padding: 6rem 0 8rem;
    position: relative;
  }
  
  .cta-section::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 600px;
    height: 400px;
    background: radial-gradient(circle, rgba(173, 198, 255, 0.08), transparent 70%);
    z-index: -1;
    pointer-events: none;
  }
  
  .cta-section h2 {
    margin-bottom: 1rem;
  }
  
  @media (max-width: 768px) {
    .hero-actions {
      flex-direction: column;
    }
    
    .stats-row {
      flex-direction: column;
      gap: 2rem;
    }
    
    .divider {
      width: 40px;
      height: 1px;
    }
    
    .bento-grid, .steps-grid {
      grid-template-columns: 1fr;
    }
    
    .col-span-2 {
      grid-column: span 1;
    }
  }
  </style>
