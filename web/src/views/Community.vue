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
    <div class="container" style="max-width: 960px;">

      <div
        class="header-section"
        v-motion
        :initial="{ opacity: 0, y: 20 }"
        :enter="{ opacity: 1, y: 0, transition: { duration: 600 } }"
      >
        <span class="eyebrow">Public Transparency</span>
        <h1>Network Pulse</h1>
        <p class="pulse-intro">
          Aggregate activity from the SiteDrift community network. These counters describe shared bypass usage,
          not individual browsing history, and may lag behind real-time traffic.
        </p>
      </div>

      <div v-if="error" class="error-card card">
        <h2>Stats are offline</h2>
        <p>{{ error }}</p>
      </div>

      <div class="dashboard-grid">
        <div
          class="metric-card card"
          v-motion
          :initial="{ opacity: 0, y: 20 }"
          :enter="{ opacity: 1, y: 0, transition: { duration: 600, delay: 100 } }"
        >
          <div class="metric-label">Community-recorded bypasses</div>
          <div class="metric-value">
            {{ loading ? '...' : (stats?.total_bypasses?.toLocaleString() || '0') }}
          </div>
        </div>

        <div
          class="metric-card card"
          v-motion
          :initial="{ opacity: 0, y: 20 }"
          :enter="{ opacity: 1, y: 0, transition: { duration: 600, delay: 200 } }"
        >
          <div class="metric-label">Recorded today</div>
          <div class="metric-value">
             {{ loading ? '...' : (stats?.today_bypasses?.toLocaleString() || '0') }}
          </div>
        </div>

        <div
          class="leaderboard-card card"
          v-motion
          :initial="{ opacity: 0, y: 20 }"
          :enter="{ opacity: 1, y: 0, transition: { duration: 600, delay: 300 } }"
        >
          <h2 class="leaderboard-title">Most active supported domains</h2>
          <p class="leaderboard-note">Ranked by aggregate recorded bypasses from the public stats endpoint.</p>

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
                <span class="badge badge-brand">{{ domain.count.toLocaleString() }}</span>
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
  max-width: 640px;
  margin: 1rem auto 0;
  font-size: 1.05rem;
  color: var(--color-text-secondary);
}

.error-card {
  padding: 1.75rem;
  margin-bottom: 1.5rem;
  border-color: hsl(0, 60%, 85%);
}

.error-card h2 {
  color: var(--color-danger);
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
}

.error-card p {
  color: var(--color-text-secondary);
  font-size: 0.9rem;
}

.dashboard-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.25rem;
}

.metric-card {
  padding: 2.5rem;
  text-align: center;
}

.metric-label {
  color: var(--color-text-muted);
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin-bottom: 0.75rem;
}

.metric-value {
  font-size: 3rem;
  font-weight: 700;
  line-height: 1;
  color: var(--color-text-primary);
}

.leaderboard-card {
  grid-column: 1 / -1;
  padding: 2.25rem;
  margin-top: 0.5rem;
}

.leaderboard-title {
  margin-bottom: 0.5rem;
  font-size: 1.35rem;
}

.leaderboard-note {
  margin-bottom: 1.75rem;
  color: var(--color-text-secondary);
  font-size: 0.875rem;
}

.domain-list {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
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
  color: var(--color-text-muted);
  font-weight: 700;
  font-size: 1.1rem;
}

.domain-name {
  font-weight: 600;
  font-size: 1rem;
  color: var(--color-text-primary);
}

.domain-bar-bg {
  position: absolute;
  bottom: 0;
  left: 3rem;
  right: 0;
  height: 3px;
  background: var(--color-overlay);
  border-radius: var(--radius-full);
  overflow: hidden;
}

.domain-bar-fill {
  height: 100%;
  background: var(--color-brand);
  border-radius: var(--radius-full);
  transition: width 1s ease-out;
}

@media (max-width: 768px) {
  .dashboard-grid {
    grid-template-columns: 1fr;
  }
}
</style>
