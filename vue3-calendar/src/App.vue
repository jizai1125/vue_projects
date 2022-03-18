<template>
  <!-- <img alt="Vue logo" src="./assets/logo.png" /> -->
  <!-- <HelloWorld msg="Hello Vue 3 + Vite" /> -->
  <h1>父组件 date: {{ date }}</h1>
  <Calendar v-model="date" @change="change" />
</template>
<script setup>
// import HelloWorld from "./components/HelloWorld.vue";
// This starter template is using Vue 3 experimental <script setup> SFCs

import { ref } from "vue";

// Check out https://github.com/vuejs/rfcs/blob/script-setup-2/active-rfcs/0000-script-setup.md
const date = ref("2021-5-16");
const change = (val) => {
  console.log(val);
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
