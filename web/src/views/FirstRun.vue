<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter();

const finish = () => {
  router.push('/');
};
</script>

<template>
  <div class="firstrun-container">
    <div class="welcome-grid">
      <div class="welcome-content">
        <div class="icon-wrapper">
          <img src="/icon128.png" alt="SiteDrift Logo" class="brand-logo" />
        </div>
        
        <h1 class="title">
          <span class="gradient-text">SiteDrift is ready</span>
        </h1>

        <p class="subtitle">
          You're set up to skip supported shortener waits, clean noisy tracking links, and use community bypass results when they are available.
        </p>

        <div class="cta-row">
          <button class="btn btn-primary cta-btn" @click="finish">
            Start Browsing
          </button>
          <router-link to="/supported" class="btn btn-secondary cta-btn">
            View Supported Sites
          </router-link>
        </div>

        <p class="trust-note">Bypass availability depends on each site and link. SiteDrift is open source, so you can review how it works.</p>
      </div>

      <div class="features glass-panel">
        <div class="feature-item">
          <div class="feature-icon">01</div>
          <div class="feature-text">
            <h3>Visit a supported shortener</h3>
            <p>SiteDrift watches for domains listed in the supported directory.</p>
          </div>
        </div>
        <div class="feature-item">
          <div class="feature-icon">02</div>
          <div class="feature-text">
            <h3>SiteDrift checks for a bypass</h3>
            <p>The extension runs domain-specific logic and can use crowd results when available.</p>
          </div>
        </div>
        <div class="feature-item">
          <div class="feature-icon">03</div>
          <div class="feature-text">
            <h3>Continue when a destination is found</h3>
            <p>If a bypass is available, you move forward without the artificial waiting flow.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.firstrun-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  background: var(--bg-main);
  padding-top: 80px; /* Offset for navbar */
}

.welcome-grid {
  max-width: 1100px;
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
}

.welcome-content {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1.5rem;
}

.icon-wrapper {
  width: 96px;
  height: 96px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: var(--radius-lg);
  padding: 1rem;
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
}

.brand-logo {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.title {
  font-size: 3.5rem;
  font-weight: 800;
  margin: 0;
  line-height: 1.1;
}

.subtitle {
  color: var(--text-muted);
  font-size: 1.25rem;
  line-height: 1.6;
  max-width: 500px;
  margin: 0;
}

.cta-row {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-top: 1rem;
}

.cta-btn {
  padding: 1rem 2rem;
  font-size: 1.1rem;
  font-weight: 600;
}

.trust-note {
  max-width: 500px;
  color: var(--text-muted);
  font-size: 0.95rem;
}

.features {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  width: 100%;
  padding: 3rem;
  border-radius: var(--radius-lg);
}

.feature-item {
  display: flex;
  align-items: center;
  gap: 1.25rem;
  padding: 1.5rem;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid var(--border-light);
  border-radius: var(--radius-md);
  transition: all 0.2s ease;
}

.feature-item:hover {
  background: rgba(255, 255, 255, 0.05);
  transform: translateX(5px);
}

.feature-icon {
  width: 56px;
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(76, 215, 246, 0.1);
  border: 1px solid rgba(76, 215, 246, 0.28);
  border-radius: var(--radius-md);
  color: var(--accent-cyan);
  font-size: 0.9rem;
  font-weight: 800;
  letter-spacing: 0.08em;
  flex-shrink: 0;
}

.feature-text h3 {
  color: var(--text-main);
  margin: 0 0 0.25rem 0;
  font-size: 1.1rem;
  font-weight: 600;
}

.feature-text p {
  color: var(--text-muted);
  margin: 0;
  font-size: 0.95rem;
  line-height: 1.5;
}

@media (max-width: 900px) {
  .welcome-grid {
    grid-template-columns: 1fr;
    gap: 3rem;
    text-align: center;
  }
  
  .welcome-content {
    align-items: center;
  }

  .cta-row {
    justify-content: center;
  }

  .title {
    font-size: 2.5rem;
  }
  
  .feature-item:hover {
    transform: translateY(-5px);
  }
}
</style>
