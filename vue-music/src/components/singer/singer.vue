<template>
  <div ref="singer" class="singer-Wrapper">
    <list-view ref="singerList" :data="singerList" :tags="tags" @select="selectedSinger" />
    <transition name="slide">
      <router-view />
    </transition>
  </div>
</template>
<script>
import { playlistMixin } from 'common/js/mixin'
import { getSingerList } from 'api/singer'
import { ERR_OK } from 'api/config'
import ListView from 'base/listview/listview'
import { mapMutations } from 'vuex'
export default {
  components: { ListView },
  mixins: [playlistMixin],
  data() {
    return {
      singerList: [],
      tags: []
    }
  },
  computed: {
  },
  created() {
    this._getSingerList({ index: -100 })
  },
  methods: {
    handlePlayList(playList) {
      this.$refs.singer.style.bottom = playList.length > 0 ? '60px' : 0
      this.$refs.singerList.refresh()
    },
    selectedSinger(singer) {
      this.$router.push({
        path: `/singer/${singer.singer_mid}`
      })
      this.setSinger(singer)
    },
    async _getSingerList(params) {
      await getSingerList(params).then(res => {
        if (res.code !== ERR_OK) {
          console.log('get singerList ERR CODE', res.code)
          return
        }
        const result = res.singerList.data
        this.tags = result.tags.index
      })
      const promises = this.tags.map(item => {
        return getSingerList({ index: item.id })
      })
      Promise.all(promises).then(res => {
        this.singerList = res.map((item, index) => {
          return ({
            tag: this.tags[index].name,
            data: item.singerList.data.singerlist
          })
        })
        // console.log(this.singerList)
      }).catch(err => {
        console.log(err)
      })
    },
    ...mapMutations({
      setSinger: 'SET_SINGER' // this.setSinger()映射为this.$store.commit('SET_SINGER')
    })
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
.singer-Wrapper
  position: absolute
  top 88px
  bottom 0
  width 100%
  // height calc(100% - 84px)
</style>
