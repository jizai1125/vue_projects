<template>
  <div class="container">
    <global-header :user="user"></global-header>
    <router-view></router-view>
    <footer class="text-center py-4 text-secondary bg-light mt-6">
      <small>
        <ul class="list-inline mb-0">
          <li class="list-inline-item">© 2021 zhihu专栏</li>
          <li class="list-inline-item">课程</li>
          <li class="list-inline-item">文档</li>
          <li class="list-inline-item">联系</li>
          <li class="list-inline-item">更多</li>
        </ul>
      </small>
    </footer>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import 'bootstrap/dist/css/bootstrap.min.css'
import GlobalHeader from './components/Header.vue'
import { useStore } from 'vuex'
import { GlobalDataProps } from './store'

export default defineComponent({
  name: 'App',
  components: {
    GlobalHeader
  },
  setup () {
    const store = useStore<GlobalDataProps>()
    const user = computed(() => store.state.user)
    return {
      user
    }
  }
})
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
