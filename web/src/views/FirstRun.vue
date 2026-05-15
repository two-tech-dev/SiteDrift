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
          <span class="gradient-text">Welcome to SiteDrift</span>
        </h1>
        
        <p class="subtitle">
          You've successfully installed SiteDrift. You're now ready to drift past link shorteners and ad-walls across the web.
        </p>

        <button class="btn btn-primary cta-btn" @click="finish">
          Start Browsing
        </button>
      </div>

      <div class="features glass-panel">
        <div class="feature-item">
          <div class="feature-icon">🚀</div>
          <div class="feature-text">
            <h3>Instant Bypasses</h3>
            <p>We automatically skip countdowns and ad-walls.</p>
          </div>
        </div>
        <div class="feature-item">
          <div class="feature-icon">🛡️</div>
          <div class="feature-text">
            <h3>Privacy First</h3>
            <p>Block IP loggers and intrusive trackers instantly.</p>
          </div>
        </div>
        <div class="feature-item">
          <div class="feature-icon">🌍</div>
          <div class="feature-text">
            <h3>Crowd Sourced</h3>
            <p>Help others bypass custom links automatically.</p>
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

.cta-btn {
  padding: 1rem 2rem;
  font-size: 1.1rem;
  font-weight: 600;
  margin-top: 1rem;
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
  font-size: 2rem;
  width: 56px;
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.05);
  border-radius: var(--radius-md);
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

  .title {
    font-size: 2.5rem;
  }
  
  .feature-item:hover {
    transform: translateY(-5px);
  }
}
</style>
