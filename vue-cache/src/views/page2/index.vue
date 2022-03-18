<template>
  <div class="page2">
    <keep-alive :include="cacheViews">
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'page2',
  computed: {
    ...mapGetters(['cacheViews']),
  },
  data() {
    return {}
  },
  created() {},
  mounted() {},
  methods: {}
}
</script>

<style lang="less" scoped>
.page2 {
  height: 100%;
}
</style>
