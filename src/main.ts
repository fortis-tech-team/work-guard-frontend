import './assets/main.css';

import { createApp } from 'vue';
import { createPinia } from 'pinia';
import i18n from './i18n';
import { useAuthStore } from './stores/auth';

import App from './App.vue';
import router from './router';

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(i18n);

// Monitor authentication status
const authStore = useAuthStore();
authStore.monitorAuthState();

app.mount('#app');
