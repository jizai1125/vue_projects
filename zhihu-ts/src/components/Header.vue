<template>
  <nav class="navbar navbar-light bg-light">
  <div class="container-fluid">
    <span class="navbar-brand mb-0 h1">ZHIHU</span>
  </div>
</nav>
</template>

<script lang="ts">
import { PropType } from 'vue'
export interface UserProps {
  isLogin: boolean
  name?: string
  id?: number
}
export default {
  name: 'Header',
  props: {
    user: {
      type: Object as PropType<UserProps>,
      required: true
    }
  },
  setup () {
    return {}
  }
}
</script>

<style scoped>
</style>
