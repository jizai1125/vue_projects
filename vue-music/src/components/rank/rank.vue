<template>
  <div ref="rank" class="rank">
    <Scroll
      ref="rankList"
      class="toplist"
      :data="rankList"
    >
      <ul>
        <li v-for="(rank, idx) in rankList" :key="idx" class="item" @click="selectRank(rank)">
          <div class="icon">
            <img v-lazy="rank.frontPicUrl" width="100" height="100">
            <span class="listenNum">{{ rank.listenNum | formatListenNum }}</span>
          </div>
          <ul class="songlist">
            <li v-for="(song, index) in rank.song" :key="index" class="song">
              <span>{{ song.rank }}. {{ song.title }}</span>
              <span>{{ song.singerName }}</span>
            </li>
          </ul>
        </li>
      </ul>
      <div v-show="!rankList.length" class="loading-container">
        <Loading />
      </div>
    </Scroll>
    <router-view />
  </div>
</template>

<script>
import { getRank } from 'api/rank'
import { ERR_OK } from 'api/config'
import { playlistMixin } from 'common/js/mixin'
import Scroll from 'base/scroll/scroll'
import Loading from 'base/loading/loading'
import { mapMutations } from 'vuex'

export default {
  name: 'Rank',
  components: { Scroll, Loading },
  filters: {
    formatListenNum(value) {
      return `${(value / 10000).toFixed(2)}万`
    }
  },
  mixins: [playlistMixin],
  data() {
    return {
      rankList: [],
      topList: []
    }
  },
  computed: {
  },
  created() {
    this._getRank()
  },
  methods: {
    handlePlayList(newList) {
      const bottom = newList.length ? '60px' : '0'
      this.$refs.rank.style.bottom = bottom
      this.$refs.rankList.refresh()
    },
    selectRank(item) {
      this.$router.push({
        path: `/rank/${item.topId}`
      })
      this.setCurrentRank(item)
    },
    _getRank() {
      getRank().then(res => {
        console.log(res)
        if (res.topList.code !== ERR_OK) {
          console.log('GET RANK ERROR')
          return
        }
        const group = res.topList.data.group
        this.topList = group
        this.rankList = group.map(item => item.toplist).flat()
      })
    },
    ...mapMutations({
      setCurrentRank: 'SET_CURRENT_RANK'
    })
  }
}
</script>

<style lang="stylus" scoped>
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"

  .rank
    position: fixed
    width: 100%
    top: 88px
    bottom: 0
    .toplist
      height: 100%
      overflow: hidden
      .item
        display: flex
        margin: 0 20px
        padding-top: 20px
        height: 100px
        &:last-child
          padding-bottom: 20px
        .icon
          position relative
          flex: 0 0 100px
          width: 100px
          height: 100px
          .listenNum
            position: absolute
            left: 50%
            bottom: 10%
            transform: translate3d(-50%, 0, 0)
            font-size: $font-size-small
            white-space: nowrap
        .songlist
          flex: 1
          display: flex
          flex-direction: column
          justify-content: center
          padding: 0 20px
          height: 100px
          overflow: hidden
          background: $color-highlight-background
          color: $color-text-d
          font-size: $font-size-small
          .song
            no-wrap()
            line-height: 26px
      .loading-container
        position: absolute
        width: 100%
        top: 50%
        transform: translateY(-50%)
  .slide-enter-active, .slide-leave-active
    transition: all 0.3s ease

  .slide-enter, .slide-leave-to
    transform: translate3d(100%, 0, 0)
</style>
