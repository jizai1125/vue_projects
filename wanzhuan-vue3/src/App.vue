<script setup>
import { useStore } from 'vuex';
const store = useStore()
const setUser = () => {
  store.dispatch('getUser', { name: 'jizai' })
}
</script>

<template>
  <div>
    <div class="ani">
      username: {{ $store.getters.username }}
      <button @click="setUser">set user</button>
    </div>
    <router-link to="/">首页</router-link> |
    <router-link to="/about">关于</router-link>
  </div>
  <router-view></router-view>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.ani {
  animation: test 1s linear 2 alternate forwards;
}
@keyframes test {
  0% {
    margin-left: 200px;
  }
  100% {
    margin-left: 0;
  }
}
</style>
