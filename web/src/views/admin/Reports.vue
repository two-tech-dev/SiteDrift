<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';
import { getReportedLinks, getAccessToken, voteDelete, type ReportedLink } from '../../api';

const router = useRouter();
const reports = ref<ReportedLink[]>([]);
const currentIndex = ref(0);
const loading = ref(true);
const actionMessage = ref('');

async function loadQueue() {
  loading.value = true;
  try {
    const refreshToken = localStorage.getItem('reftoken');
    if (!refreshToken) throw new Error('Not authenticated');
    
    const accessToken = await getAccessToken(refreshToken);
    localStorage.setItem('acctoken', accessToken);
    reports.value = await getReportedLinks(accessToken);
    currentIndex.value = 0;
  } catch (error) {
    if (error instanceof Error && error.message.includes('Unauthorized')) {
      router.push('/admin/login');
    }
  } finally {
    loading.value = false;
  }
}

async function handleAction(action: 'delete' | 'skip') {
  if (currentIndex.value >= reports.value.length) return;
  
  const currentReport = reports.value[currentIndex.value];
  
  if (action === 'delete') {
    try {
      const accessToken = localStorage.getItem('acctoken') || '';
      actionMessage.value = await voteDelete(currentReport, accessToken);
    } catch (error) {
      actionMessage.value = 'Failed to delete link';
    }
  } else {
    actionMessage.value = 'Skipped report';
  }
  
  // Move to next item
  currentIndex.value++;
  
  // Clear message after delay
  setTimeout(() => { actionMessage.value = ''; }, 2000);
}

// Keyboard shortcuts
const handleKeydown = (e: KeyboardEvent) => {
  if (currentIndex.value >= reports.value.length) return;
  
  if (e.key === 'ArrowLeft') {
    handleAction('delete');
  } else if (e.key === 'ArrowRight') {
    handleAction('skip');
  }
};

onMounted(() => {
  loadQueue();
  window.addEventListener('keydown', handleKeydown);
});

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown);
});
</script>

<template>
  <div 
    v-motion
    :initial="{ opacity: 0, y: 20 }"
    :enter="{ opacity: 1, y: 0, transition: { duration: 500 } }"
    class="reports-container"
  >
    <div class="header-row">
      <div>
        <span class="eyebrow">Moderation Queue</span>
        <h1>Reported Links</h1>
      </div>
      <button @click="loadQueue" class="btn btn-secondary">
        ↻ Refresh
      </button>
    </div>

    <div v-if="loading" class="empty-state glass-panel">
      Loading queue...
    </div>
    
    <div v-else-if="currentIndex >= reports.length" class="empty-state glass-panel">
      <div class="icon-success">✓</div>
      <h2>Queue Empty</h2>
      <p class="text-muted">You're all caught up! No more reported links to review.</p>
    </div>

    <div v-else class="queue-interface">
      <div class="queue-progress">
        Report {{ currentIndex + 1 }} of {{ reports.length }}
      </div>
      
      <!-- Current Card -->
      <transition name="slide-fade" mode="out-in">
        <div :key="reports[currentIndex].id" class="report-card glass-panel">
          <div class="card-domain">{{ reports[currentIndex].domain }}</div>
          <div class="card-path">/{{ reports[currentIndex].path }}</div>
          
          <div class="destination-box">
            <div class="label">Resolves to</div>
            <div class="destination-url">{{ reports[currentIndex].destination }}</div>
          </div>
          
          <div class="meta-info">
            <div class="meta-item">
              <strong>{{ reports[currentIndex].times_reported }}</strong> Reports
            </div>
            <div class="meta-item" v-if="reports[currentIndex].voted_by">
              Voted by: <strong>{{ reports[currentIndex].voted_by }}</strong>
            </div>
          </div>
          
          <div class="card-actions">
            <button @click="handleAction('delete')" class="btn btn-danger action-btn">
              <span class="key-hint">←</span> Delete Link
            </button>
            <button @click="handleAction('skip')" class="btn btn-secondary action-btn">
              Skip Report <span class="key-hint">→</span>
            </button>
          </div>
        </div>
      </transition>
      
      <div v-if="actionMessage" class="action-toast">
        {{ actionMessage }}
      </div>
    </div>
  </div>
</template>

<style scoped>
.reports-container {
  max-width: 800px;
  margin: 0 auto;
}

.header-row {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 3rem;
}

.empty-state {
  padding: 5rem 2rem;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.icon-success {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: rgba(129, 201, 149, 0.2);
  color: var(--accent-green);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  font-weight: bold;
}

.queue-interface {
  position: relative;
}

.queue-progress {
  text-align: right;
  margin-bottom: 1rem;
  color: var(--text-muted);
  font-weight: 500;
  font-size: 0.875rem;
}

.report-card {
  padding: 3rem;
  border-radius: 32px;
}

.card-domain {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--text-main);
}

.card-path {
  font-size: 2.5rem;
  font-weight: 900;
  margin-bottom: 2rem;
  color: var(--accent-cyan);
  word-break: break-all;
}

.destination-box {
  background: rgba(0, 0, 0, 0.2);
  padding: 1.5rem;
  border-radius: var(--radius-md);
  margin-bottom: 2rem;
  border: 1px solid var(--border-light);
}

.destination-box .label {
  font-size: 0.875rem;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin-bottom: 0.5rem;
}

.destination-url {
  font-family: monospace;
  font-size: 1.125rem;
  word-break: break-all;
}

.meta-info {
  display: flex;
  gap: 2rem;
  margin-bottom: 3rem;
  color: var(--text-muted);
}

.meta-item strong {
  color: var(--text-main);
  font-size: 1.25rem;
}

.card-actions {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
}

.action-btn {
  padding: 1.5rem;
  font-size: 1.125rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
}

.key-hint {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 6px;
  font-size: 1rem;
}

.btn-danger .key-hint {
  background: rgba(255, 180, 171, 0.2);
}

.action-toast {
  position: absolute;
  bottom: -4rem;
  left: 50%;
  transform: translateX(-50%);
  padding: 0.75rem 1.5rem;
  background: var(--bg-card);
  border: 1px solid var(--border-light);
  border-radius: var(--radius-full);
  color: var(--accent-cyan);
  font-weight: 500;
  animation: fadeUpOut 2s forwards;
}

@keyframes fadeUpOut {
  0% { opacity: 0; transform: translate(-50%, 10px); }
  20% { opacity: 1; transform: translate(-50%, 0); }
  80% { opacity: 1; transform: translate(-50%, 0); }
  100% { opacity: 0; transform: translate(-50%, -10px); }
}

@media (max-width: 640px) {
  .card-actions {
    grid-template-columns: 1fr;
  }
}
</style>
