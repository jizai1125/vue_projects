<template>
  <transition name="slide">
    <music-list
      :title="singer.singer_name"
      :bg-image="singer.singer_pic"
      :song-list="songList"
    />
  </transition>
</template>

<script>
import MusicList from 'components/music-list/music-list'

export default {
  components: [
    MusicList
  ],
  data() {
    return {}
  }
}
</script>

<style>

</style>
