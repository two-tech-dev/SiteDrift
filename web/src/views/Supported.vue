<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { supportedSites } from '../data/supportedSites';

const supportedSearch = ref('');
const currentPage = ref(1);
const pageSize = 24;
const repositoryUrl = 'https://github.com/two-tech-dev/SiteDrift';

const filteredSites = computed(() => {
  const query = supportedSearch.value.trim().toLowerCase();
  if (!query) return supportedSites;
  return supportedSites.filter((site) => site.toLowerCase().includes(query));
});

const totalPages = computed(() => Math.max(1, Math.ceil(filteredSites.value.length / pageSize)));
const pageStart = computed(() => filteredSites.value.length ? (currentPage.value - 1) * pageSize + 1 : 0);
const pageEnd = computed(() => Math.min(currentPage.value * pageSize, filteredSites.value.length));
const paginatedSites = computed(() => filteredSites.value.slice(pageStart.value - 1, pageEnd.value));

watch(supportedSearch, () => {
  currentPage.value = 1;
});

watch(totalPages, (pages) => {
  if (currentPage.value > pages) currentPage.value = pages;
});
</script>

<template>
  <main class="page-wrapper">
    <div class="container" style="max-width: 900px;">

      <div
        class="header-section"
        v-motion
        :initial="{ opacity: 0, y: 20 }"
        :enter="{ opacity: 1, y: 0, transition: { duration: 600 } }"
      >
        <span class="eyebrow">Bypass Directory</span>
        <h1>Supported Sites</h1>
        <p class="directory-intro">
          Search the domains SiteDrift currently knows how to handle. Support can change as
          shortener services evolve, so this directory is a transparency snapshot rather than a guarantee.
        </p>

        <div class="directory-stats">
          <div class="directory-stat card">
            <strong>{{ supportedSites.length }}</strong>
            <span>Supported domains</span>
          </div>
          <div class="directory-stat card">
            <strong>Searchable</strong>
            <span>Find root domains quickly</span>
          </div>
          <div class="directory-stat card">
            <strong>Community</strong>
            <span>Improved through contributions</span>
          </div>
        </div>

        <div class="search-container">
          <input
            v-model="supportedSearch"
            class="input-field search-input"
            placeholder="Search domains like linkvertise..."
            aria-label="Search supported domains"
          />
          <div class="search-icon">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </div>
        </div>
        <p class="result-count">Showing {{ pageStart }}–{{ pageEnd }} of {{ filteredSites.length }} matching domains</p>
      </div>

      <section class="support-flow card">
        <div class="flow-item">
          <span class="flow-number">01</span>
          <h2>Domain-specific modules</h2>
          <p>SiteDrift uses targeted bypass logic for supported services instead of one generic shortcut.</p>
        </div>
        <div class="flow-item">
          <span class="flow-number">02</span>
          <h2>Crowd bypass assists repeats</h2>
          <p>When a resolved destination is known, future visits to the same link can move faster.</p>
        </div>
        <div class="flow-item">
          <span class="flow-number">03</span>
          <h2>Support evolves</h2>
          <p>Shortener sites change often, so the directory improves through reports and open-source contributions.</p>
        </div>
      </section>

      <div
        class="sites-grid"
        v-motion
        :initial="{ opacity: 0 }"
        :enter="{ opacity: 1, transition: { duration: 600, delay: 200 } }"
      >
        <div
          v-for="site in paginatedSites"
          :key="site"
          class="site-card card"
        >
          <div class="site-dot"></div>
          {{ site }}
        </div>

        <div v-if="filteredSites.length === 0" class="no-results card">
          <h2>No matching domain yet</h2>
          <p>Try searching the root domain without paths or subpages. If SiteDrift does not support it yet, you can request or contribute support.</p>
          <a :href="repositoryUrl" class="btn btn-secondary">Request support on GitHub</a>
        </div>
      </div>

      <div v-if="filteredSites.length > pageSize" class="pagination card">
        <button class="btn btn-secondary" :disabled="currentPage === 1" @click="currentPage -= 1">Previous</button>
        <span class="pagination-status">Page {{ currentPage }} of {{ totalPages }}</span>
        <button class="btn btn-secondary" :disabled="currentPage === totalPages" @click="currentPage += 1">Next</button>
      </div>

    </div>
  </main>
</template>

<style scoped>
.header-section {
  margin-bottom: 3rem;
  text-align: center;
}

.header-section h1 {
  margin-bottom: 1.25rem;
}

.directory-intro {
  max-width: 680px;
  margin: 0 auto 2rem;
  font-size: 1.05rem;
  color: var(--color-text-secondary);
}

.directory-stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  margin: 0 auto 2rem;
}

.directory-stat {
  padding: 1.25rem;
  text-align: center;
}

.directory-stat strong {
  display: block;
  color: var(--color-brand);
  font-size: 1.35rem;
  margin-bottom: 0.3rem;
}

.directory-stat span {
  color: var(--color-text-secondary);
  font-size: 0.85rem;
}

.search-container {
  position: relative;
  max-width: 500px;
  margin-inline: auto;
}

.search-input {
  padding-left: 2.75rem;
  font-size: 1rem;
  border-radius: var(--radius-full);
}

.search-icon {
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: var(--color-text-muted);
  pointer-events: none;
}

.result-count {
  margin-top: 0.75rem;
  font-size: 0.85rem;
  color: var(--color-text-muted);
}

.support-flow {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
  padding: 2rem;
  margin-bottom: 2.5rem;
}

.flow-number {
  display: inline-flex;
  margin-bottom: 0.75rem;
  color: var(--color-brand);
  font-weight: 700;
  letter-spacing: 0.12em;
}

.flow-item h2 {
  font-size: 1.05rem;
  margin-bottom: 0.5rem;
}

.flow-item p {
  color: var(--color-text-secondary);
  font-size: 0.85rem;
  line-height: 1.5;
}

.sites-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 0.75rem;
}

.site-card {
  padding: 1rem 1.25rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-weight: 500;
  font-size: 0.9rem;
}

.site-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: var(--color-brand);
  flex-shrink: 0;
}

.no-results {
  grid-column: 1 / -1;
  padding: 3.5rem;
  text-align: center;
}

.no-results h2 {
  margin-bottom: 0.75rem;
}

.no-results p {
  max-width: 480px;
  margin: 0 auto 1.5rem;
  color: var(--color-text-secondary);
  font-size: 0.9rem;
}

.pagination {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  margin-top: 1.5rem;
  padding: 0.75rem 1rem;
}

.pagination-status {
  color: var(--color-text-muted);
  font-weight: 600;
  font-size: 0.85rem;
  text-align: center;
}

@media (max-width: 768px) {
  .header-section {
    margin-bottom: 2rem;
  }

  .directory-intro {
    font-size: 0.95rem;
    margin-bottom: 1.5rem;
  }

  .directory-stats,
  .support-flow {
    grid-template-columns: 1fr;
    gap: 0.75rem;
  }

  .support-flow {
    padding: 1.25rem;
    margin-bottom: 2rem;
  }

  .sites-grid {
    grid-template-columns: 1fr;
  }

  .pagination {
    flex-direction: column;
  }

  .pagination .btn {
    width: 100%;
  }
}
</style>
