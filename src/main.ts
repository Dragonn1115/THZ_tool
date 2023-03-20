

import { createApp } from 'vue'
import App from './App.vue'
import Home from './App1.vue'
import StatPage from './App2.vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import './assets/main.css'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: '/', redirect: '/home' }, // 添加redirect选项，重定向到路径为'/home'的路由
    { path: '/home', component: Home },
    { path: '/stat', component: StatPage },  
  ],
})

createApp(App).use(router).mount('#app')
