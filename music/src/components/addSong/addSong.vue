<template>
  <transition name="slide">
    <div v-show="showFlag" class="add-song" @click.stop>
      <div class="header">
        <h1 class="title">添加歌曲列表</h1>
        <div class="close" @click="hide">
          <i class="icon-close" />
        </div>
      </div>
      <div class="search-box-wrapper">
        <search-box ref="searchBox" placeholder="搜索歌曲" @query="queryChange" />
      </div>
      <div v-show="!query" class="shortcut">
        <switches :switches="switches" :current-index="currentIndex" @switch="switchItem" />
        <div class="list-wrapper">
          <!-- 最近播放 -->
          <scroll
            v-if="currentIndex === 0"
            ref="songList"
            :refresh-delay="refreshDelay"
            :data="playHistory"
            class="list-scroll"
          >
            <song-list
              :songs="playHistory"
              class="list-inner"
              @select="selectSong"
            />
          </scroll>
          <!-- 搜索历史 -->
          <scroll v-else ref="searchList" class="list-scroll" :refresh-delay="refreshDelay">
            <search-list
              :searches="searchHistory"
              class="list-inner"
              @select="addQuery"
              @delete="deleteSearchHistory"
            />
          </scroll>
        </div>
      </div>
      <div v-show="query" class="search-result">
        <suggest
          :query="query"
          @select="selectSuggest"
          @beforeListScroll="blurInput"
        />
      </div>
      <top-tip ref="topTip">
        <div class="tip-title">
          <i class="icon-ok" />
          <span class="text">1首歌曲已经添加到播放队列</span>
        </div>
      </top-tip>
    </div>
  </transition>
</template>

<script>
import SearchBox from 'base/search-box/search-box'
import Suggest from 'components/suggest/suggest'
import Switches from 'base/switches/switches'
import Scroll from 'base/scroll/scroll'
import SongList from 'base/song-list/song-list'
import SearchList from 'base/search-list/search-list'
import TopTip from 'base/top-tip/top-tip'
import { searchMixin } from 'common/js/mixin'
import Song from 'common/js/song'
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'AddSong',
  components: { SearchBox, Suggest, Switches, Scroll, SongList, SearchList, TopTip },
  mixins: [searchMixin],
  data() {
    return {
      showFlag: false,
      switches: [{ name: '最近播放' }, { name: '搜索历史' }],
      currentIndex: 0
    }
  },
  computed: {
    ...mapGetters([
      'searchHistory',
      'playHistory'
    ])
  },
  methods: {
    show() {
      this.showFlag = true
      setTimeout(() => {
        if (this.currentIndex === 0) {
          this.$refs.songList.refresh()
        } else {
          this.$refs.searchList.refresh()
        }
      }, 20)
    },
    hide() {
      this.showFlag = false
    },
    switchItem(index) {
      this.currentIndex = index
    },
    // 最近播放
    selectSong(song, index) {
      if (!index) return
      this.showTip()
      this.insertSong(new Song(song))
    },
    selectSuggest() {
      this.saveSearch()
      this.showTip()
    },
    showTip() {
      this.$refs.topTip.show()
    },
    ...mapActions([
      'insertSong',
      'saveSearch'
    ])
  }
}
</script>

<style lang="stylus" scoped>
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"

  .add-song
    position: fixed
    top: 0
    bottom: 0
    width: 100%
    z-index: 200
    background: $color-background
    &.slide-enter-active, &.slide-leave-active
      transition: all 0.3s
    &.slide-enter, &.slide-leave-to
      transform: translate3d(100%, 0, 0)
    .header
      position: relative
      height: 44px
      text-align: center
      .title
        line-height: 44px
        font-size: $font-size-large
        color: $color-text
      .close
        position: absolute
        top: 0
        right: 8px
        .icon-close
          display: block
          padding: 12px
          font-size: 20px
          color: $color-theme

    .search-box-wrapper
      margin: 20px
    .shortcut
      .list-wrapper
        position: absolute
        top: 165px
        bottom: 0
        width: 100%
        .list-scroll
          height: 100%
          overflow: hidden
          .list-inner
            padding: 20px 30px
    .search-result
      position: fixed
      top: 124px
      bottom: 0
      width: 100%
    .tip-title
      text-align: center
      padding: 18px 0
      font-size: 0
      .icon-ok
        font-size: $font-size-medium
        color: $color-theme
        margin-right: 4px
      .text
        font-size: $font-size-medium
        color: $color-text
</style>
