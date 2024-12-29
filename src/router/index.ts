import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { useAuthStore } from '@/stores/auth'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: { requiresAuth: true },
  },
  {
    path: '/sign-up',
    name: 'signUp',
    component: () => import('../views/SignUp.vue'),
  },
  {
    path: '/login',
    name: 'signIn',
    component: () => import('../views/SignIn.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore()

  if (authStore.isFirstVisit) {
    await authStore.monitorAuthState()
    authStore.isFirstVisit = false
  }

  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next({ name: 'signIn' }) // Redirect to login page
  } else {
    next() // Allow pagination
  }
})

export default router
