<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';
import { computed } from 'vue';

const route = useRoute();
const router = useRouter();

const isLoginPage = computed(() => route.path === '/admin/login');

const handleLogout = () => {
  localStorage.removeItem('reftoken');
  localStorage.removeItem('acctoken');
  router.push('/admin/login');
};
</script>

<template>
  <div class="admin-shell">
    
    <!-- Sidebar only visible if not login page -->
    <aside v-if="!isLoginPage" class="admin-sidebar glass-panel">
      <div class="sidebar-header">
        <div class="brand" @click="router.push('/')" style="cursor: pointer;">SiteDrift</div>
        <div class="eyebrow" style="margin: 0;">Admin</div>
      </div>
      
      <nav class="sidebar-nav">
        <router-link to="/admin/dashboard" class="sidebar-link" active-class="active">
          Dashboard
        </router-link>
        <router-link to="/admin/reports" class="sidebar-link" active-class="active">
          Reports Queue
        </router-link>
        <router-link to="/admin/settings" class="sidebar-link" active-class="active">
          Settings
        </router-link>
      </nav>
      
      <div class="sidebar-footer">
        <button @click="handleLogout" class="btn btn-ghost w-full justify-start">
          Sign Out
        </button>
      </div>
    </aside>

    <!-- Main Content Area -->
    <main class="admin-main" :class="{ 'login-mode': isLoginPage }">
      <router-view v-slot="{ Component }">
        <transition name="slide-fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>
    
  </div>
</template>

<style scoped>
.admin-shell {
  display: flex;
  min-height: 100vh;
}

.admin-sidebar {
  width: 280px;
  display: flex;
  flex-direction: column;
  border-radius: 0;
  border-top: none;
  border-bottom: none;
  border-left: none;
  padding: 2rem 1.5rem;
  position: sticky;
  top: 0;
  height: 100vh;
}

.sidebar-header {
  margin-bottom: 3rem;
}

.sidebar-header .brand {
  font-size: 1.5rem;
  font-weight: 900;
  color: var(--text-main);
  margin-bottom: 0.25rem;
}

.sidebar-nav {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  flex: 1;
}

.sidebar-link {
  padding: 0.75rem 1rem;
  border-radius: var(--radius-md);
  color: var(--text-muted);
  font-weight: 500;
  transition: all 0.2s ease;
}

.sidebar-link:hover {
  color: var(--text-main);
  background: rgba(255, 255, 255, 0.05);
}

.sidebar-link.active {
  color: var(--accent-cyan);
  background: rgba(76, 215, 246, 0.1);
  font-weight: 600;
}

.w-full {
  width: 100%;
}

.justify-start {
  justify-content: flex-start;
}

.admin-main {
  flex: 1;
  padding: 3rem;
  max-width: 1200px;
  margin: 0 auto;
}

.admin-main.login-mode {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
}

@media (max-width: 768px) {
  .admin-shell {
    flex-direction: column;
  }
  
  .admin-sidebar {
    width: 100%;
    height: auto;
    position: static;
    border-right: none;
    border-bottom: 1px solid var(--border-light);
    padding: 1.5rem;
  }
  
  .admin-main {
    padding: 1.5rem;
  }
}
</style>
