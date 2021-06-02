<template>
  <div class="music-list">
    <div class="back" @click="back">
      <i class="icon-back" />
    </div>
    <h1 class="title" v-html="title" />
    <!-- 背景图 -->
    <div ref="bgImage" class="bg-image" :style="bgStyle">
      <div v-show="songList.length > 0" ref="playBtn" class="play-wrapper">
        <div class="play" @click="selectRandomPlay">
          <i class="icon-play" />
          <span class="text">随机播放全部</span>
        </div>
      </div>
      <div ref="filter" class="filter" />
    </div>
    <div ref="bgLayer" class="bg-layer" />
    <!-- 歌曲列表 -->
    <Scroll
      ref="list"
      class="list"
      :probe-type="probeType"
      :listen-scroll="listenScroll"
      :data="songList"
      @scroll="scroll"
    >
      <div class="song-list-wrapper">
        <song-list :rank="rank" :songs="songList" @select="selectedItem" />
      </div>
      <div class="loading-container">
        <Loading v-show="!songList.length" />
      </div>
    </Scroll>
  </div>
</template>

<script>
import { playlistMixin } from 'common/js/mixin'
import Scroll from 'base/scroll/scroll'
import SongList from 'base/song-list/song-list'
import Loading from 'base/loading/loading'

import { mapActions } from 'vuex'

export default {
  components: { Scroll, SongList, Loading },
  mixins: [playlistMixin],
  props: {
    bgImage: {
      type: String,
      default: ''
    },
    songList: {
      type: Array,
      default: () => []
    },
    title: {
      type: String,
      default: ''
    },
    rank: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      scrollY: 0
    }
  },
  computed: {
    bgStyle() {
      return `background-image: url(${this.bgImage})`
    }
  },
  watch: {
    rank(newValue) {
      return newValue
    },
    scrollY(newY) {
      const diff = this.bgImageHeight + newY
      let zIndex = 0
      let scale = 1
      let blur = 0
      this.$refs.bgLayer.style.transform = `translate3d(0, ${newY}px, 0)`
      this.$refs.bgLayer.style.webkitTransform = `translate3d(0, ${newY}px, 0)`
      const percent = Math.abs(newY / this.bgImageHeight)
      if (newY > 0) {
        zIndex = 10
        scale = 1 + percent
      } else {
        blur = Math.min(20 * percent, 20)
      }
      this.$refs.filter.style.backdropFilter = `blur(${blur}px)`
      this.$refs.filter.style.webkitBackdropFilter = `blur(${blur}px)`
      if (diff <= this.minTranslateY) {
        zIndex = 10
        this.$refs.bgImage.style.height = `${this.minTranslateY}px`
        this.$refs.bgImage.style.paddingTop = 0
        this.$refs.playBtn.style.display = 'none'
      } else {
        this.$refs.bgImage.style.height = 0
        this.$refs.bgImage.style.paddingTop = '70%'
        this.$refs.playBtn.style.display = ''
      }
      this.$refs.bgImage.style.zIndex = zIndex
      this.$refs.bgImage.style.transform = `scale(${scale})`
      this.$refs.bgImage.style.webkitTransform = `scale(${scale})`
    }
  },
  created() {
    this.listenScroll = true
    this.probeType = 3
  },
  mounted() {
    this.bgImageHeight = this.$refs.bgImage.clientHeight
    this.minTranslateY = 40
    this.$refs.list.$el.style.top = `${this.bgImageHeight}px`
  },
  methods: {
    // 处理列表底部被播放器遮盖
    handlePlayList(playList) {
      this.$refs.list.$el.style.bottom = playList.length > 0 ? '60px' : 0
      this.$refs.list.refresh()
    },
    scroll(pos) {
      this.scrollY = pos.y
    },
    back() {
      this.$router.back()
    },
    selectRandomPlay() {
      this.randomPlay({
        list: this.songList
      })
    },
    selectedItem(item, index) {
      this.selectPlay({
        list: this.songList,
        index
      })
    },
    ...mapActions([
      'selectPlay',
      'randomPlay'
    ])
  }
}
</script>

<style lang="stylus" scoped>
@import '~common/stylus/variable';
@import '~common/stylus/mixin';

.music-list {
  position: fixed;
  z-index: 100;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: $color-background;

  .back {
    position: absolute;
    top: 0;
    left: 6px;
    z-index: 50;

    .icon-back {
      display: block;
      padding: 10px;
      font-size: $font-size-large-x;
      color: $color-theme;
    }
  }

  .title {
    position: absolute;
    top: 0;
    left: 10%;
    z-index: 40;
    width: 80%;
    no-wrap();
    text-align: center;
    line-height: 40px;
    font-size: $font-size-large;
    color: $color-text;
  }

  .bg-image {
    position: relative;
    width: 100%;
    height: 0;
    padding-top: 70%;
    transform-origin: top;
    background-size: cover;

    .play-wrapper {
      position: absolute;
      bottom: 20px;
      z-index: 50;
      width: 100%;

      .play {
        box-sizing: border-box;
        width: 135px;
        padding: 7px 0;
        margin: 0 auto;
        text-align: center;
        border: 1px solid $color-theme;
        color: $color-theme;
        border-radius: 100px;
        font-size: 0;

        .icon-play {
          display: inline-block;
          vertical-align: middle;
          margin-right: 6px;
          font-size: $font-size-medium-x;
        }

        .text {
          display: inline-block;
          vertical-align: middle;
          font-size: $font-size-small;
        }
      }
    }

    .filter {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(7, 17, 27, 0.4);
    }
  }

  .bg-layer {
    position: relative;
    height: 100%;
    background: $color-background;
  }

  .list {
    position: fixed;
    top: 0;
    bottom: 0;
    width: 100%;
    background: $color-background;

    .song-list-wrapper {
      padding: 20px 30px;
    }

    .loading-container {
      position: absolute;
      width: 100%;
      top: 50%;
      transform: translateY(-50%);
    }
  }
}
</style>
