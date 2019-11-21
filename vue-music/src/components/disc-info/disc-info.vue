<template>
  <transition name="slide">
    <music-list
      :bg-image="bgImage"
      :title="title"
      :song-list="discList"
    />
  </transition>
</template>

<script>
import MusicList from 'components/music-list/music-list'
import { getDiscInfo } from 'api/recommend'
import { ERR_OK } from 'api/config'
import { mapGetters } from 'vuex'
import { createSong } from 'common/js/song'
import { getSongKey } from 'api/singer'
export default {
  components: {
    MusicList
  },
  data() {
    return {
      discList: []
    }
  },
  computed: {
    bgImage() {
      return this.currentDisc.cover
    },
    title() {
      return this.currentDisc.title
    },
    ...mapGetters([
      'currentDisc'
    ])
  },
  created() {
    console.log(this.currentDisc)
    this._getDiscInfo(this.currentDisc.content_id)
  },
  methods: {
    _getDiscInfo(content_id) {
      console.log(content_id)
      if (!content_id) {
        this.$router.push({
          path: '/recommend'
        })
        return
      }
      getDiscInfo(content_id).then(res => {
        if (res.code !== ERR_OK) {
          console.log('<<<getdiscInfo error>>>')
          return
        }
        console.log(res)
        const discList = res.cdlist[0].songlist
        this._normalizeSong(discList).then(res => {
          console.log(res)
          this.discList = res
        })
      })
    },
    async _normalizeSong(list) {
      const result = []
      for (let i = 0; i < list.length; i++) {
        const item = list[i]
        const response = await getSongKey(item.mid)
        if (response.code !== ERR_OK) {
          console.error('<<<GET SONG PURL ERR>>>', response)
          return
        }
        const purl = response.req_0.data.midurlinfo[0].purl
        console.log(purl)
        result.push(createSong(item, purl))
      }
      return result
      // === 需完善歌曲url请求的逻辑 ===
      // return list.map(item => createSong(item.songInfo, ''))
    }
  }
}
</script>

<style lang="stylus" scoped>
.slide-enter-active, .slide-leave-active {
  transition: all .3s;
}
.slide-enter, .slide-leave-to {
  transform: translate3d(100%, 0, 0);
}
</style>
