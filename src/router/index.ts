import { createRouter, createWebHashHistory } from 'vue-router';
import { useAuthStore } from '@/stores/auth';

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/Home.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/permissao-trabalho/criar',
    name: 'create-work-permission',
    component: () => import('../views/work-permission/CreateWorkPermission.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/account',
    name: 'account',
    component: () => import('../views/Account.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/sign-up',
    name: 'sign-up',
    component: () => import('../views/SignUp.vue'),
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/Login.vue'),
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'pageNotFound',
    component: () => import('../views/PageNotFound.vue'),
  },
];

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes,
});

router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore();

  if (authStore.isFirstVisit) {
    await authStore.monitorAuthState();
    authStore.isFirstVisit = false;
  }

  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next({ name: 'login' }); // Redirect to login page
  } else {
    next(); // Allow pagination
  }
});

export default router;
