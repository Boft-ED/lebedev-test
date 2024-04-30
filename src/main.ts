import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { createPinia } from 'pinia';
import ToastPlugin from 'vue-toast-notification';

import './assets/main.css';

const app = createApp(App);
const pinia = createPinia();

app.use(router);
app.use(ToastPlugin);
app.use(pinia);

app.mount('#app');