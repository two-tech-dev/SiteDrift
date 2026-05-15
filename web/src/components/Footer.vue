<script setup lang="ts">
const currentYear = new Date().getFullYear();
</script>

<template>
  <footer class="site-footer">
    <div class="container">
      <div class="footer-content">
        <div class="brand-section">
          <div class="brand">SiteDrift</div>
          <p class="text-muted tag-line">
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
            <a href="https://github.com/2Technologysolutions/SiteDrift" target="_blank" rel="noopener noreferrer">GitHub Repository</a>
            <a href="https://github.com/2Technologysolutions/SiteDrift/issues" target="_blank" rel="noopener noreferrer">Report an Issue</a>
          </div>
        </div>
      </div>
      
      <div class="footer-bottom">
        <p class="text-muted">
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
  border-top: 1px solid var(--border-light);
  background: var(--bg-navy);
  padding: 4rem 0 2rem;
}

.footer-content {
  display: flex;
  justify-content: space-between;
  gap: 4rem;
  margin-bottom: 4rem;
}

.brand-section {
  max-width: 320px;
}

.brand {
  font-size: 1.5rem;
  font-weight: 900;
  color: var(--text-main);
  margin-bottom: 1rem;
}

.tag-line {
  line-height: 1.6;
}

.links-section {
  display: flex;
  gap: 4rem;
}

.link-group {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.link-group h4 {
  font-size: 0.875rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--text-main);
  margin-bottom: 0.5rem;
}

.link-group a {
  color: var(--text-muted);
  font-size: 0.95rem;
  transition: color var(--transition-fast);
}

.link-group a:hover {
  color: var(--accent-cyan);
}

.footer-bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 2rem;
  border-top: 1px solid var(--border-light);
  font-size: 0.875rem;
}

.legal-links a {
  color: var(--text-muted);
  transition: color var(--transition-fast);
}

.legal-links a:hover {
  color: var(--text-main);
}

.studio-link {
  color: var(--text-main);
  font-weight: 500;
  transition: color var(--transition-fast);
}

.studio-link:hover {
  color: var(--accent-cyan);
}

@media (max-width: 768px) {
  .footer-content {
    flex-direction: column;
    gap: 3rem;
  }
  
  .links-section {
    flex-direction: column;
    gap: 2.5rem;
  }
  
  .footer-bottom {
    flex-direction: column;
    text-align: center;
    gap: 1rem;
  }
}
</style>
