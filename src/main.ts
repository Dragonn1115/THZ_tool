

import { createApp } from 'vue'
import App from './App.vue'
import Home from './App1.vue'
import StatPage from './App2.vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import './assets/main.css'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: '/', component: App },
    { path: '/home', component: Home },
    { path: '/stat', component: StatPage },  
],
})

createApp(App).use(router).mount('#app')
