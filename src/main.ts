import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import '../public/css/reset.css';

const app = createApp(App);
app.use(store);
app.use(router);
app.mount("#app");
// createApp(App).use(store).use(router).mount('#app')
