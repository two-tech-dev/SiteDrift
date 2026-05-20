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
    :class="{ scrolled }"
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
      </nav>
    </div>
  </header>
</template>

<style scoped>
.nav-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 50;
  padding: 1rem 0;
  background: transparent;
  transition:
    background-color var(--transition-base),
    box-shadow var(--transition-base),
    padding var(--transition-base);
}

.nav-header.scrolled {
  background: var(--color-surface);
  box-shadow: var(--shadow-sm);
  border-bottom: 1px solid var(--color-border);
  padding: 0.75rem 0;
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
  font-size: 1.35rem;
  font-weight: 900;
  letter-spacing: 0.01em;
  color: var(--color-text-primary);
}

.brand-icon {
  width: 28px;
  height: 28px;
  object-fit: contain;
}

.nav-links {
  display: flex;
  gap: 0.25rem;
  padding: 0.2rem;
  border-radius: var(--radius-full);
  border: 1px solid var(--color-border);
  background: var(--color-surface);
}

.nav-link {
  padding: 0.45rem 1rem;
  border-radius: var(--radius-full);
  font-weight: 500;
  font-size: 0.85rem;
  color: var(--color-text-secondary);
  transition:
    color var(--transition-fast),
    background-color var(--transition-fast);
}

.nav-link:hover {
  color: var(--color-text-primary);
}

.nav-link.active {
  background: var(--color-brand-light);
  color: var(--color-brand-dark);
}

@media (max-width: 768px) {
  .nav-header {
    padding: 0.75rem 0;
  }

  .nav-container {
    width: min(100% - 2rem, 1200px);
    flex-direction: column;
    gap: 0.6rem;
  }

  .brand {
    font-size: 1.2rem;
  }

  .brand-icon {
    width: 24px;
    height: 24px;
  }

  .nav-link {
    padding: 0.4rem 0.8rem;
    font-size: 0.8rem;
  }
}
</style>
