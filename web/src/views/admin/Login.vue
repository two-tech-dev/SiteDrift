<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { login } from '../../api';

const router = useRouter();
const username = ref('');
const password = ref('');
const loading = ref(false);
const authError = ref('');

async function handleLogin() {
  loading.value = true;
  authError.value = '';
  try {
    const refreshToken = await login(username.value, password.value);
    localStorage.setItem('reftoken', refreshToken);
    router.push('/admin/dashboard');
  } catch {
    authError.value = 'Incorrect username or password';
  } finally {
    loading.value = false;
  }
}
</script>

<template>
  <div 
    class="login-card glass-panel"
    v-motion
    :initial="{ opacity: 0, scale: 0.95, y: 20 }"
    :enter="{ opacity: 1, scale: 1, y: 0, transition: { duration: 500 } }"
  >
    <div class="login-header">
      <div class="brand-logo"></div>
      <span class="eyebrow">Moderator Access</span>
      <h1>Welcome Back</h1>
    </div>

    <form @submit.prevent="handleLogin" class="login-form">
      <div class="form-group">
        <label for="username">Username</label>
        <input 
          id="username"
          v-model="username" 
          autocomplete="username" 
          required 
          class="input-glass"
          placeholder="Enter username"
        />
      </div>
      
      <div class="form-group">
        <label for="password">Password</label>
        <input 
          id="password"
          v-model="password" 
          type="password" 
          autocomplete="current-password" 
          required 
          class="input-glass"
          placeholder="••••••••"
        />
      </div>

      <div v-if="authError" class="error-notice">
        {{ authError }}
      </div>

      <button 
        type="submit" 
        class="btn btn-primary" 
        :disabled="loading"
        style="width: 100%; margin-top: 1rem;"
      >
        {{ loading ? 'Authenticating...' : 'Sign In' }}
      </button>
    </form>
    
    <button @click="router.push('/')" class="btn btn-ghost return-btn">
      ← Return to site
    </button>
  </div>
</template>

<style scoped>
.login-card {
  width: 100%;
  max-width: 440px;
  padding: 3rem;
  border-radius: 32px;
}

.login-header {
  text-align: center;
  margin-bottom: 2.5rem;
}

.brand-logo {
  width: 48px;
  height: 48px;
  background: linear-gradient(135deg, var(--accent-blue), var(--accent-cyan));
  border-radius: 14px;
  margin: 0 auto 1.5rem;
  box-shadow: var(--glow-primary);
}

.login-header h1 {
  font-size: 2.25rem;
}

.error-notice {
  padding: 0.75rem 1rem;
  background: rgba(255, 180, 171, 0.1);
  border: 1px solid rgba(255, 180, 171, 0.2);
  color: var(--accent-red);
  border-radius: var(--radius-md);
  font-size: 0.875rem;
  text-align: center;
  margin-bottom: 1rem;
}

.return-btn {
  width: 100%;
  margin-top: 1.5rem;
  font-size: 0.875rem;
}

@media (max-width: 480px) {
  .login-card {
    padding: 2rem;
  }
}
</style>
