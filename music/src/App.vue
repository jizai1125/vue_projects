<template>
  <div id="app">
    <m-header />
    <tab />
    <keep-alive>
      <router-view />
    </keep-alive>
    <player />
  </div>
</template>
<script>
import MHeader from '@/components/m-header/m-header'
import Tab from '@/components/tab/tab'
import Player from 'components/player/player'

export default {
  components: {
    MHeader,
    Tab,
    Player
  },
  data() {
    return {}
  }
}
</script>
<style lang="stylus" scoped>
</style>
