<template>
  <div class="app">
    <div class="navbar">
      <router-link class="nav-item" to="/home">Home</router-link>
      <router-link class="nav-item" to="/stat">StatPage</router-link>
    </div>
    <div class="container">
      <router-view></router-view>
      <div v-if="$route.path === '/'" class="welcome">
        <h1>Welcome!</h1>
        <p>Thank you for visiting our website.</p>
      </div>
    </div>
  </div>
</template>

<style>
.app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.navbar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background-color: #f5f5f5; /* 浅灰色 */
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
  z-index: 999;
}

.nav-item {
  display: inline-block;
  width: 4em;
  text-align: center;
  margin-right: 1em;
  tab-size: 4;
  color: #333; /* 深灰色 */
}

.container {
  margin-top: 50px; /* 使页面内容在导航栏之下 */
}

.welcome {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #ffe0b2; /* 淡橙色 */
  color: #333; /* 深灰色 */
}

h1 {
  font-size: 4rem;
  margin-bottom: 1rem;
}

p {
  font-size: 2rem;
  text-align: center;
  margin-bottom: 2rem;
}

@media (max-width: 768px) {
  h1 {
    font-size: 3rem;
  }
  p {
    font-size: 1.5rem;
  }
}

.main {
  flex: 1;
}
</style>
