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
        <p class="directory-intro text-muted">
          Search the domains SiteDrift currently knows how to handle. Support can change as
          shortener services evolve, so this directory is a transparency snapshot rather than a guarantee.
        </p>

        <div class="directory-stats">
          <div class="directory-stat glass-panel">
            <strong>{{ supportedSites.length }}</strong>
            <span>Supported domains</span>
          </div>
          <div class="directory-stat glass-panel">
            <strong>Searchable</strong>
            <span>Find root domains quickly</span>
          </div>
          <div class="directory-stat glass-panel">
            <strong>Community</strong>
            <span>Improved through contributions</span>
          </div>
        </div>

        <div class="search-container">
          <input
            v-model="supportedSearch"
            class="input-glass search-input"
            placeholder="Search domains like linkvertise..."
            aria-label="Search supported domains"
          />
          <div class="search-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </div>
        </div>
        <p class="result-count text-muted">Showing {{ pageStart }}–{{ pageEnd }} of {{ filteredSites.length }} matching domains · {{ supportedSites.length }} total</p>
      </div>
      
      <section class="support-flow glass-panel">
        <div class="flow-item">
          <span>01</span>
          <h2>Domain-specific modules</h2>
          <p class="text-muted">SiteDrift uses targeted bypass logic for supported services instead of one generic shortcut.</p>
        </div>
        <div class="flow-item">
          <span>02</span>
          <h2>Crowd bypass assists repeats</h2>
          <p class="text-muted">When a resolved destination is known, future visits to the same link can move faster.</p>
        </div>
        <div class="flow-item">
          <span>03</span>
          <h2>Support evolves</h2>
          <p class="text-muted">Shortener sites change often, so the directory improves through reports and open-source contributions.</p>
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
          class="site-card glass-panel glass-panel-hover"
        >
          <div class="site-dot"></div>
          {{ site }}
        </div>

        <div v-if="filteredSites.length === 0" class="no-results glass-panel">
          <h2>No matching domain yet</h2>
          <p class="text-muted">Try searching the root domain without paths or subpages. If SiteDrift does not support it yet, you can request or contribute support.</p>
          <a :href="repositoryUrl" class="btn btn-secondary">Request support on GitHub</a>
        </div>
      </div>

      <div v-if="filteredSites.length > pageSize" class="pagination glass-panel">
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
  max-width: 720px;
  margin: 0 auto 2rem;
  font-size: 1.1rem;
}

.directory-stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  margin: 0 auto 2rem;
}

.directory-stat {
  padding: 1.25rem;
}

.directory-stat strong {
  display: block;
  color: var(--accent-cyan);
  font-size: 1.5rem;
  margin-bottom: 0.35rem;
}

.directory-stat span {
  color: var(--text-muted);
  font-size: 0.9rem;
}

.search-container {
  position: relative;
  max-width: 600px;
  margin-inline: auto;
}

.search-input {
  padding-left: 3rem;
  font-size: 1.125rem;
  border-radius: var(--radius-full);
}

.search-icon {
  position: absolute;
  left: 1.25rem;
  top: 50%;
  transform: translateY(-50%);
  color: var(--text-muted);
  pointer-events: none;
}

.result-count {
  margin-top: 1rem;
  font-size: 0.95rem;
}

.support-flow {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
  padding: 2rem;
  margin-bottom: 3rem;
}

.flow-item span {
  display: inline-flex;
  margin-bottom: 1rem;
  color: var(--accent-cyan);
  font-weight: 700;
  letter-spacing: 0.16em;
}

.flow-item h2 {
  font-size: 1.15rem;
  margin-bottom: 0.75rem;
}

.sites-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 1rem;
}

.site-card {
  padding: 1.25rem 1.5rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  font-weight: 500;
}

.site-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--accent-cyan);
  box-shadow: 0 0 10px var(--accent-cyan);
}

.no-results {
  grid-column: 1 / -1;
  padding: 4rem;
  text-align: center;
}

.no-results h2 {
  margin-bottom: 1rem;
}

.no-results p {
  max-width: 520px;
  margin: 0 auto 1.5rem;
}

.pagination {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  margin-top: 2rem;
  padding: 1rem;
}

.pagination-status {
  color: var(--text-muted);
  font-weight: 600;
  text-align: center;
}

@media (max-width: 768px) {
  .header-section {
    margin-bottom: 2rem;
  }

  .header-section h1 {
    font-size: clamp(2.5rem, 14vw, 4rem);
  }

  .directory-intro {
    font-size: 1rem;
    margin-bottom: 1.5rem;
  }

  .directory-stats,
  .support-flow {
    grid-template-columns: 1fr;
    gap: 0.75rem;
  }

  .directory-stat {
    padding: 1rem;
    border-radius: var(--radius-md);
  }

  .directory-stat strong {
    font-size: 1.25rem;
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
