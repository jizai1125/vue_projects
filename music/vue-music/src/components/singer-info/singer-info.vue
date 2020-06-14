<template>
  <div class="singer-info">
    <music-list
      :title="singer.name"
      :bg-image="'http://localhost:3000' + singer.pic"
      :song-list="songList"
    />
  </div>
</template>
<script>
import { getSingerSong } from 'api/singer'
import { mapGetters } from 'vuex'

import MusicList from 'components/music-list/music-list'

export default {
  components: {
    MusicList
  },
  data() {
    return {
      songList: [],
      isShowPlayer: false
    }
  },
  computed: {
    ...mapGetters([
      'singer'
    ])
  },
  created() {
    if (!this.singer) return
    this._getSongList(this.singer._id)
  },
  methods: {
    _getSongList(singerId) {
      if (!singerId) {
        this.$router.push('/singer')
        return
      }
      getSingerSong({
        sid: singerId
      }).then(list => {
        console.log(list)
        this.songList = list
      })
    }
  }
}
</script>
<style lang="stylus" scoped>
 @import '~common/stylus/variable'
  .singer-info
    position fixed
    z-index 100
    top 0
    left 0
    right 0
    bottom 0
    background $color-background
</style>
