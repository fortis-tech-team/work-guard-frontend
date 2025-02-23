import './assets/main.css';

import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import router from './router';
import i18n from './plugins/i18n';
import vuetify from './plugins/vuetify';

import { useAuthStore } from './stores/auth';

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(i18n);
app.use(vuetify);

// Monitor authentication status
const authStore = useAuthStore();
authStore.monitorAuthState();

app.mount('#app');
