import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
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

export default router
