<script setup lang="ts">
const currentYear = new Date().getFullYear();
</script>

<template>
  <footer class="site-footer">
    <div class="container">
      <div class="footer-content">
        <div class="brand-section">
          <div class="brand">SiteDrift</div>
          <p class="footer-tagline">
            The community-driven extension that instantly skips irritating link shorteners.
          </p>
        </div>

        <div class="links-section">
          <div class="link-group">
            <h4>Product</h4>
            <router-link to="/">Home</router-link>
            <router-link to="/supported">Supported Sites</router-link>
            <router-link to="/community">Community Stats</router-link>
          </div>

          <div class="link-group">
            <h4>Open Source</h4>
            <a href="https://github.com/two-tech-dev/SiteDrift" target="_blank" rel="noopener noreferrer">GitHub Repository</a>
            <a href="https://github.com/two-tech-dev/SiteDrift/issues" target="_blank" rel="noopener noreferrer">Report an Issue</a>
          </div>
        </div>
      </div>

      <div class="footer-bottom">
        <p>
          &copy; {{ currentYear }} SiteDrift, Powered by
          <a href="https://2tech.studio" target="_blank" rel="noopener noreferrer" class="studio-link">2Tech Studio</a>
        </p>
        <div class="legal-links">
          <router-link to="/admin/login">Admin Access</router-link>
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.site-footer {
  margin-top: auto;
  border-top: 1px solid var(--color-border);
  background: var(--color-overlay);
  padding: 3.5rem 0 1.5rem;
}

.footer-content {
  display: flex;
  justify-content: space-between;
  gap: 4rem;
  margin-bottom: 3rem;
}

.brand-section {
  max-width: 300px;
}

.brand {
  font-size: 1.35rem;
  font-weight: 900;
  color: var(--color-text-primary);
  margin-bottom: 0.75rem;
}

.footer-tagline {
  color: var(--color-text-secondary);
  font-size: 0.9rem;
  line-height: 1.6;
}

.links-section {
  display: flex;
  gap: 4rem;
}

.link-group {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.link-group h4 {
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--color-text-primary);
  margin-bottom: 0.25rem;
}

.link-group a {
  color: var(--color-text-secondary);
  font-size: 0.9rem;
}

.link-group a:hover {
  color: var(--color-brand);
}

.footer-bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 1.5rem;
  border-top: 1px solid var(--color-border);
  font-size: 0.8rem;
  color: var(--color-text-muted);
}

.legal-links a {
  color: var(--color-text-muted);
}

.legal-links a:hover {
  color: var(--color-text-primary);
}

.studio-link {
  color: var(--color-text-primary);
  font-weight: 500;
}

.studio-link:hover {
  color: var(--color-brand);
}

@media (max-width: 768px) {
  .footer-content {
    flex-direction: column;
    gap: 2.5rem;
  }

  .links-section {
    flex-direction: column;
    gap: 2rem;
  }

  .footer-bottom {
    flex-direction: column;
    text-align: center;
    gap: 0.75rem;
  }
}
</style>
