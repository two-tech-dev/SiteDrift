import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/supported',
      name: 'supported',
      component: () => import('../views/Supported.vue')
    },
    {
      path: '/community',
      name: 'community',
      component: () => import('../views/Community.vue')
    },
    {
      path: '/admin',
      component: () => import('../layouts/AdminLayout.vue'),
      children: [
        {
          path: '',
          redirect: '/admin/dashboard'
        },
        {
          path: 'login',
          name: 'admin-login',
          component: () => import('../views/admin/Login.vue')
        },
        {
          path: 'dashboard',
          name: 'admin-dashboard',
          component: () => import('../views/admin/Dashboard.vue'),
          meta: { requiresAuth: true }
        },
        {
          path: 'reports',
          name: 'admin-reports',
          component: () => import('../views/admin/Reports.vue'),
          meta: { requiresAuth: true }
        },
        {
          path: 'settings',
          name: 'admin-settings',
          component: () => import('../views/admin/Settings.vue'),
          meta: { requiresAuth: true }
        }
      ]
    }
  ]
});

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  const refreshToken = localStorage.getItem('reftoken');

  if (requiresAuth && !refreshToken) {
    next('/admin/login');
  } else if (to.path === '/admin/login' && refreshToken) {
    next('/admin/dashboard');
  } else {
    next();
  }
});

export default router;
