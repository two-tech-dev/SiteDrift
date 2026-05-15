<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import Navbar from './components/Navbar.vue';
import Footer from './components/Footer.vue';

const route = useRoute();
const showNavbar = computed(() => !route.path.startsWith('/admin'));
</script>

<template>
  <div class="shell">
    <Navbar v-if="showNavbar" />
    <router-view v-slot="{ Component }">
      <transition name="slide-fade" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
    <Footer v-if="showNavbar" />
  </div>
</template>

<style>
.shell {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
</style>
