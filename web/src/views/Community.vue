<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { getStats, type StatsSummary } from '../api';

const stats = ref<StatsSummary | null>(null);
const loading = ref(true);
const error = ref('');

onMounted(async () => {
  try {
    stats.value = await getStats();
  } catch (err) {
    console.error(err);
    error.value = 'Live community stats are temporarily unavailable. Please check back soon.';
  } finally {
    loading.value = false;
  }
});
</script>

<template>
  <main class="page-wrapper">
    <div class="container" style="max-width: 1000px;">
      
      <div 
        class="header-section"
        v-motion
        :initial="{ opacity: 0, y: 20 }"
        :enter="{ opacity: 1, y: 0, transition: { duration: 600 } }"
      >
        <span class="eyebrow">Public Transparency</span>
        <h1>Network Pulse</h1>
        <p class="pulse-intro text-muted">
          Aggregate activity from the SiteDrift community network. These counters describe shared bypass usage,
          not individual browsing history, and may lag behind real-time traffic.
        </p>
      </div>

      <div v-if="error" class="error-card glass-panel">
        <h2>Stats are offline</h2>
        <p class="text-muted">{{ error }}</p>
      </div>

      <div class="dashboard-grid">
        <!-- Top Metrics -->
        <div 
          class="metric-card glass-panel"
          v-motion
          :initial="{ opacity: 0, y: 20 }"
          :enter="{ opacity: 1, y: 0, transition: { duration: 600, delay: 100 } }"
        >
          <div class="metric-label">Community-recorded bypasses</div>
          <div class="metric-value text-glow">
            {{ loading ? '...' : (stats?.total_bypasses?.toLocaleString() || '0') }}
          </div>
        </div>
        
        <div 
          class="metric-card glass-panel"
          v-motion
          :initial="{ opacity: 0, y: 20 }"
          :enter="{ opacity: 1, y: 0, transition: { duration: 600, delay: 200 } }"
        >
          <div class="metric-label">Recorded today</div>
          <div class="metric-value text-glow">
             {{ loading ? '...' : (stats?.today_bypasses?.toLocaleString() || '0') }}
          </div>
        </div>

        <!-- Top Domains Leaderboard -->
        <div 
          class="leaderboard-card glass-panel"
          v-motion
          :initial="{ opacity: 0, y: 20 }"
          :enter="{ opacity: 1, y: 0, transition: { duration: 600, delay: 300 } }"
        >
          <h2 class="leaderboard-title">Most active supported domains</h2>
          <p class="leaderboard-note text-muted">Ranked by aggregate recorded bypasses from the public stats endpoint.</p>

          <div v-if="loading" class="text-muted text-center py-4">Loading stats...</div>
          <div v-else-if="error" class="text-muted text-center py-4">Domain activity will return when live stats recover.</div>
          <div v-else-if="!stats?.top_domains?.length" class="text-muted text-center py-4">No data available</div>
          
          <div v-else class="domain-list">
            <div 
              v-for="(domain, index) in stats.top_domains" 
              :key="domain.domain"
              class="domain-item"
            >
              <div class="domain-rank">{{ index + 1 }}</div>
              <div class="domain-name">{{ domain.domain }}</div>
              <div class="domain-count">
                <span class="badge badge-blue">{{ domain.count.toLocaleString() }}</span>
              </div>
              <div class="domain-bar-bg">
                <div 
                  class="domain-bar-fill" 
                  :style="{ width: `${(domain.count / stats.top_domains[0].count) * 100}%` }"
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
    </div>
  </main>
</template>

<style scoped>
.header-section {
  margin-bottom: 3rem;
  text-align: center;
}

.pulse-intro {
  max-width: 700px;
  margin: 1.25rem auto 0;
  font-size: 1.1rem;
}

.error-card {
  padding: 2rem;
  margin-bottom: 1.5rem;
  border-color: rgba(255, 180, 171, 0.25);
}

.error-card h2 {
  color: var(--accent-red);
  font-size: 1.3rem;
  margin-bottom: 0.75rem;
}

.dashboard-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
}

.metric-card {
  padding: 3rem;
  text-align: center;
}

.metric-label {
  color: var(--text-muted);
  font-size: 1.125rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin-bottom: 1rem;
}

.metric-value {
  font-size: 4rem;
  font-weight: 700;
  line-height: 1;
}

.text-glow {
  color: var(--accent-cyan);
  text-shadow: 0 0 30px rgba(76, 215, 246, 0.4);
}

.leaderboard-card {
  grid-column: 1 / -1;
  padding: 2.5rem;
  margin-top: 1rem;
}

.leaderboard-title {
  margin-bottom: 0.75rem;
  font-size: 1.5rem;
}

.leaderboard-note {
  margin-bottom: 2rem;
}

.domain-list {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.domain-item {
  display: grid;
  grid-template-columns: 2rem 1fr auto;
  align-items: center;
  gap: 1rem;
  position: relative;
  padding-bottom: 0.5rem;
}

.domain-rank {
  color: var(--text-muted);
  font-weight: 700;
  font-size: 1.25rem;
}

.domain-name {
  font-weight: 600;
  font-size: 1.125rem;
}

.domain-bar-bg {
  position: absolute;
  bottom: 0;
  left: 3rem;
  right: 0;
  height: 4px;
  background: rgba(173, 198, 255, 0.1);
  border-radius: var(--radius-full);
  overflow: hidden;
}

.domain-bar-fill {
  height: 100%;
  background: linear-gradient(90deg, var(--accent-blue), var(--accent-cyan));
  border-radius: var(--radius-full);
  transition: width 1s ease-out;
}

@media (max-width: 768px) {
  .dashboard-grid {
    grid-template-columns: 1fr;
  }
}
</style>
