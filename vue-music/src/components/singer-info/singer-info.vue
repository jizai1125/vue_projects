<template>
  <div class="singer-info">
    <music-list
      :title="singer.singer_name"
      :bg-image="singer.singer_pic"
      :song-list="songList"
    />
  </div>
</template>
<script>
import { getSingerSong } from 'api/singer'
import { getSongKey } from 'api/singer'
import { ERR_OK } from 'api/config'
import { mapGetters } from 'vuex'
import { createSong } from 'common/js/song'
import MusicList from 'components/music-list/music-list'
export default {
  components: { MusicList },
  data() {
    return {
      songList: []
    }
  },
  computed: {
    ...mapGetters([
      'singer'
    ])
  },
  created() {
    console.log(this.singer)
    this._getSongList(this.singer.singer_mid)
  },
  methods: {
    _getSongList(singerId) {
      if (!singerId) {
        singerId = this.$route.params.id
      }
      getSingerSong({
        singerMid: singerId
      }).then(res => {
        if (res.code !== ERR_OK) {
          console.log('<<<GET SINGER SONG ERR>>>', res)
          return
        }
        console.log(res.singerSongList.data.songList)
        this._normalizeSong(res.singerSongList.data.songList).then(res => {
          this.songList = res
        })
      })
    },
    async _normalizeSong(list) {
      const result = []
      for (let i = 0; i < list.length; i++) {
        const item = list[i].songInfo
        const response = await getSongKey(item.mid)
        if (response.code !== ERR_OK) {
          console.log('<<<GET SONG PURL ERR>>>', response)
          return
        }
        const purl = response.req_0.data.midurlinfo[0].purl
        result.push(createSong(item, purl))
      }
      return result
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
