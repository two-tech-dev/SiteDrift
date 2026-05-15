<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { changePassword } from '../../api';

const router = useRouter();
const username = ref('');
const oldPassword = ref('');
const newPassword = ref('');
const loading = ref(false);
const message = ref('');
const messageType = ref<'success' | 'error'>('success');

async function handlePasswordChange() {
  loading.value = true;
  message.value = '';
  
  try {
    await changePassword(username.value, oldPassword.value, newPassword.value);
    
    // Clear session and redirect on success
    localStorage.removeItem('reftoken');
    localStorage.removeItem('acctoken');
    
    messageType.value = 'success';
    message.value = 'Password changed successfully. Redirecting to login...';
    
    setTimeout(() => {
      router.push('/admin/login');
    }, 2000);
    
  } catch (error) {
    messageType.value = 'error';
    message.value = 'Failed to change password. Please check your credentials.';
  } finally {
    loading.value = false;
  }
}
</script>

<template>
  <div 
    v-motion
    :initial="{ opacity: 0, y: 20 }"
    :enter="{ opacity: 1, y: 0, transition: { duration: 500 } }"
    class="settings-container"
  >
    <div class="header-row">
      <span class="eyebrow">Configuration</span>
      <h1>Settings</h1>
    </div>

    <div class="glass-panel settings-panel">
      <h2>Change Password</h2>
      <p class="text-muted" style="margin-bottom: 2rem;">
        Update your admin credentials. You will be logged out after a successful change.
      </p>

      <form @submit.prevent="handlePasswordChange" class="settings-form">
        <div class="form-group">
          <label for="username">Username</label>
          <input 
            id="username"
            v-model="username" 
            autocomplete="username" 
            required 
            class="input-glass"
          />
        </div>
        
        <div class="form-group">
          <label for="oldPassword">Current Password</label>
          <input 
            id="oldPassword"
            v-model="oldPassword" 
            type="password" 
            autocomplete="current-password" 
            required 
            class="input-glass"
          />
        </div>
        
        <div class="form-group">
          <label for="newPassword">New Password</label>
          <input 
            id="newPassword"
            v-model="newPassword" 
            type="password" 
            autocomplete="new-password" 
            required 
            class="input-glass"
          />
        </div>

        <div v-if="message" class="notice-box" :class="messageType">
          {{ message }}
        </div>

        <div style="margin-top: 1rem;">
          <button 
            type="submit" 
            class="btn btn-primary" 
            :disabled="loading"
          >
            {{ loading ? 'Updating...' : 'Update Password' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped>
.settings-container {
  max-width: 600px;
}

.header-row {
  margin-bottom: 3rem;
}

.settings-panel {
  padding: 3rem;
}

.settings-panel h2 {
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
}

.settings-form {
  display: flex;
  flex-direction: column;
}

.notice-box {
  padding: 1rem;
  border-radius: var(--radius-md);
  margin-bottom: 1.5rem;
  font-weight: 500;
  font-size: 0.875rem;
}

.notice-box.success {
  background: rgba(129, 201, 149, 0.1);
  border: 1px solid rgba(129, 201, 149, 0.2);
  color: var(--accent-green);
}

.notice-box.error {
  background: rgba(255, 180, 171, 0.1);
  border: 1px solid rgba(255, 180, 171, 0.2);
  color: var(--accent-red);
}

@media (max-width: 640px) {
  .settings-panel {
    padding: 2rem;
  }
}
</style>
