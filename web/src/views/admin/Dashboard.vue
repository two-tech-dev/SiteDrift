<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { getStats, type StatsSummary, getReportedLinks, getAccessToken } from '../../api';

const stats = ref<StatsSummary | null>(null);
const queueLength = ref(0);
const loading = ref(true);

onMounted(async () => {
  try {
    stats.value = await getStats();
    
    // Fetch queue length
    const refreshToken = localStorage.getItem('reftoken');
    if (refreshToken) {
      const accessToken = await getAccessToken(refreshToken);
      const reports = await getReportedLinks(accessToken);
      queueLength.value = reports.length;
    }
  } catch (error) {
    console.error(error);
  } finally {
    loading.value = false;
  }
});
</script>

<template>
  <div 
    v-motion
    :initial="{ opacity: 0, y: 20 }"
    :enter="{ opacity: 1, y: 0, transition: { duration: 500 } }"
  >
    <div class="dashboard-header">
      <span class="eyebrow">Overview</span>
      <h1>System Health</h1>
    </div>

    <div class="stats-grid">
      <div class="glass-panel stat-card">
        <div class="stat-icon icon-blue"></div>
        <div class="stat-value">{{ loading ? '...' : (stats?.today_bypasses?.toLocaleString() || '0') }}</div>
        <div class="stat-label">Bypasses Today</div>
      </div>
      
      <div class="glass-panel stat-card">
        <div class="stat-icon icon-cyan"></div>
        <div class="stat-value">{{ loading ? '...' : (stats?.total_bypasses?.toLocaleString() || '0') }}</div>
        <div class="stat-label">Total Resolves</div>
      </div>
      
      <div class="glass-panel stat-card" :class="{ 'warning': queueLength > 10 }">
        <div class="stat-icon icon-red"></div>
        <div class="stat-value">{{ loading ? '...' : queueLength }}</div>
        <div class="stat-label">Pending Reports</div>
        <router-link to="/admin/reports" class="action-link" v-if="queueLength > 0">
          Review Queue →
        </router-link>
      </div>
    </div>
  </div>
</template>

<style scoped>
.dashboard-header {
  margin-bottom: 3rem;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
}

.stat-card {
  padding: 2rem;
  position: relative;
}

.stat-icon {
  width: 48px;
  height: 48px;
  border-radius: 12px;
  margin-bottom: 1.5rem;
}

.icon-blue { background: linear-gradient(135deg, rgba(173, 198, 255, 0.2), transparent); border: 1px solid rgba(173, 198, 255, 0.3); }
.icon-cyan { background: linear-gradient(135deg, rgba(76, 215, 246, 0.2), transparent); border: 1px solid rgba(76, 215, 246, 0.3); }
.icon-red { background: linear-gradient(135deg, rgba(255, 180, 171, 0.2), transparent); border: 1px solid rgba(255, 180, 171, 0.3); }

.stat-value {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  color: var(--text-main);
}

.stat-label {
  color: var(--text-muted);
  font-weight: 500;
}

.stat-card.warning {
  border-color: rgba(255, 180, 171, 0.3);
  box-shadow: 0 0 40px rgba(255, 180, 171, 0.1);
}

.stat-card.warning .stat-value {
  color: var(--accent-red);
}

.action-link {
  position: absolute;
  top: 2rem;
  right: 2rem;
  font-size: 0.875rem;
  color: var(--accent-cyan);
  font-weight: 600;
  transition: all 0.2s;
}

.action-link:hover {
  transform: translateX(4px);
}
</style>
