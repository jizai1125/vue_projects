<template>
  <div>
    <music-list
      :rank="rank"
      :title="title"
      :bg-image="bgImage"
      :song-list="songList"
    />
  </div>
</template>

<script>
import { getRankInfo } from 'api/rank'
import { ERR_OK } from 'api/config'
import { getSongKey } from 'api/singer'
import { createSong } from 'common/js/song'
import MusicList from 'components/music-list/music-list'
import { mapGetters } from 'vuex'

export default {
  components: {
    MusicList
  },
  data() {
    return {
      rank: true,
      songList: []
    }
  },
  computed: {
    title() {
      return this.currentRank && this.currentRank.title
    },
    bgImage() {
      if (this.songList.length) {
        return this.songList[0].image
      } else {
        return this.currentRank && this.currentRank.frontPicUrl
      }
    },
    ...mapGetters([
      'currentRank'
    ])
  },
  watch: {
  },
  created() {
    this._getRankInfo()
  },

  methods: {
    _getRankInfo() {
      const topId = this.currentRank && this.currentRank.topId
      const period = this.currentRank && this.currentRank.period
      if (!topId) {
        this.$router.back()
        return
      }
      getRankInfo({ topId, period }).then(res => {
        console.log(res)
        if (res.detail.code !== ERR_OK) {
          console.log('<<<GET RANKINFO ERROR>>>')
          return
        }
        const songlist = res.detail.data.songInfoList
        this._normalizeSong(songlist).then(res => {
          console.log(res)
          this.songList = res
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
        // console.log(purl)
        result.push(createSong(item, purl))
      }
      return result
      // === 需完善歌曲url请求的逻辑 ===
      // return list.map(item => createSong(item.songInfo, ''))
    }
  }
}
</script>

<style lang='stylus' scoped>

</style>
