<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const scrolled = ref(false);

const handleScroll = () => {
  scrolled.value = window.scrollY > 20;
};

onMounted(() => window.addEventListener('scroll', handleScroll));
onUnmounted(() => window.removeEventListener('scroll', handleScroll));
</script>

<template>
  <header 
    class="nav-header"
    :class="{ 'scrolled glass-panel': scrolled }"
  >
    <div class="nav-container">
      <router-link to="/" class="brand">
        <img src="/favicon.png" alt="SiteDrift" class="brand-icon" />
        SiteDrift
      </router-link>
      
      <nav class="nav-links">
        <router-link 
          to="/supported" 
          class="nav-link"
          :class="{ active: route.path === '/supported' }"
        >
          Supported
        </router-link>
        <router-link 
          to="/community" 
          class="nav-link"
          :class="{ active: route.path === '/community' }"
        >
          Community
        </router-link>
        <router-link 
          to="/admin/login" 
          class="nav-link"
          :class="{ active: route.path.startsWith('/admin') }"
        >
          Admin
        </router-link>
      </nav>
    </div>
  </header>
</template>

<style scoped>
.nav-header {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  z-index: 50;
  padding: 1.5rem 0;
  transition: all 0.3s ease;
}

.nav-header.scrolled {
  padding: 1rem 0;
  border-radius: 0;
  border-left: none;
  border-right: none;
  border-top: none;
}

.nav-container {
  width: min(1200px, 100% - 3rem);
  margin-inline: auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.brand {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.5rem;
  font-weight: 900;
  letter-spacing: 0.02em;
  color: var(--text-main);
}

.brand-icon {
  width: 32px;
  height: 32px;
  object-fit: contain;
}

.nav-links {
  display: flex;
  gap: 0.5rem;
  background: rgba(255, 255, 255, 0.03);
  padding: 0.25rem;
  border-radius: var(--radius-full);
  border: 1px solid var(--border-light);
}

.nav-link {
  padding: 0.5rem 1rem;
  border-radius: var(--radius-full);
  font-weight: 500;
  font-size: 0.875rem;
  color: var(--text-muted);
  transition: all 0.2s ease;
}

.nav-link:hover {
  color: var(--text-main);
}

.nav-link.active {
  background: rgba(255, 255, 255, 0.1);
  color: var(--text-main);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
}

@media (max-width: 768px) {
  .nav-header {
    padding: 1rem 0;
  }
  
  .nav-container {
    flex-direction: column;
    gap: 1rem;
  }
}
</style>
