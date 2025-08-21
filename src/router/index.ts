import { createRouter, createWebHashHistory } from 'vue-router';
import { useAuthStore } from '@/stores/auth';

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/Home.vue'),
  },
  {
    path: '/permissao-trabalho/criar',
    name: 'create-work-permission',
    component: () => import('@/views/work-permission/CreateWorkPermission.vue'),
  },
  {
    path: '/permissao-trabalho',
    name: 'list-work-permission',
    component: () => import('@/views/work-permission/ListWorkPermission.vue'),
  },
  {
    path: '/account',
    name: 'account',
    component: () => import('@/views/Account.vue'),
  },
  {
    path: '/sign-up',
    name: 'sign-up',
    component: () => import('@/views/SignUp.vue'),
    meta: { publicRoute: true },
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/Login.vue'),
    meta: { publicRoute: true },
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'pageNotFound',
    component: () => import('@/views/PageNotFound.vue'),
    meta: { publicRoute: true },
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

  if (!to.meta.publicRoute && !authStore.isAuthenticated) {
    next({ name: 'login' }); // Redirect to login page
  } else {
    next(); // Allow pagination
  }
});

export default router;
