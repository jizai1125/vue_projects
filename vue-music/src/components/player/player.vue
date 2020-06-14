<template>
  <div v-show="playList.length" class="player">
    <transition
      name="normal"
      @enter="enter"
      @after-enter="afterEnter"
      @leave="leave"
      @after-leave="afterLeave"
    >
      <!-- 全屏播放器 -->
      <div v-show="fullScreen" class="normal-player">
        <!-- 背景图 -->
        <div class="background">
          <img width="100%" height="100%" :src="currentSong.image" alt="">
        </div>
        <!-- 返回按钮 -->
        <div class="top">
          <div class="back" @click="back"><i class="icon-back" /></div>
          <h1 class="title" v-html="currentSong.name" />
          <h2 class="subtitle" v-html="currentSong.singer" />
        </div>
        <div
          class="middle"
          @touchstart="middleTouchStart"
          @touchmove="middleTouchMove"
          @touchend="middleTouchEnd"
        >
          <!-- 专辑图片 -->
          <div class="middle-l">
            <div ref="cdWrapper" class="cd-wrapper">
              <div :class="cdRoll" class="cd">
                <img :src="currentSong.image" alt="" class="image">
              </div>
            </div>
            <div class="playing-lyric-wrapper">
              <p v-show="currentShow === 'cd'" class="playing-lyric">{{ playingLyric }}</p>
            </div>
          </div>
          <!-- 歌词 -->
          <Scroll ref="lyricList" class="middle-r" :data="currentLyric&&currentLyric.lines">
            <div class="lyric-wrapper">
              <div v-if="currentLyric">
                <p
                  v-for="(line, idx) in currentLyric.lines"
                  ref="lyricLine"
                  :key="idx"
                  class="text"
                  :class="{'current': currentLineNum === idx}"
                >{{ line.txt }}</p>
              </div>
            </div>
          </Scroll>
        </div>
        <!-- 进度条、控制按钮 -->
        <div class="bottom">
          <div class="dot-wrapper">
            <span :class="['dot', {'active': currentShow === 'cd'}]" />
            <span :class="['dot', {'active': currentShow === 'lyric'}]" />
          </div>
          <div class="progress-wrapper">
            <span class="time time-l">{{ formatTime(currentTime) }}</span>
            <div class="progress-bar-wrapper">
              <progress-bar :percent="percent" @percentChange="onProgressBarChange" />
            </div>
            <span class="time time-r">{{ formatTime(currentSong.duration) }}</span>
          </div>
          <div class="operators">
            <div class="icon i-left">
              <i :class="iconMode" @click="changeMode" />
            </div>
            <div class="icon i-left" :class="disable">
              <i class="icon-prev" @click="preSong" />
            </div>
            <div class="icon i-center" :class="disable">
              <i :class="iconPlay" @click="togglePlaying" />
            </div>
            <div class="icon i-right" :class="disable">
              <i class="icon-next" @click="nextSong" />
            </div>
            <div class="icon i-right">
              <i :class="getFavoriteIcon(currentSong)" @click="toggleFavorite(currentSong)" />
            </div>
          </div>
        </div>
      </div>
    </transition>
    <transition name="mini">
      <!-- mini播放器 -->
      <div v-show="!fullScreen" class="mini-player" @click="setFullScreen(true)">
        <div class="icon">
          <img :class="cdRoll" width="40" height="40" :src="currentSong.image" alt="">
        </div>
        <div class="text">
          <h2 class="name" v-html="currentSong.name" />
          <div class="desc" v-html="currentSong.singer" />
        </div>
        <div class="control">
          <progress-circle :radius="radius" :percent="percent">
            <i :class="iconMiniPlay" class="icon-mini" @click.stop="togglePlaying" />
          </progress-circle>
        </div>
        <div class="control" @click.stop="showPlaylist">
          <i class="icon-playlist" />
        </div>
      </div>
    </transition>
    <!-- 播放列表 -->
    <Playlist ref="playlist" />
    <audio
      ref="audio"
      :src="currentSong.url"
      @timeupdate="updateTime"
      @ended="ended"
      @canplay="ready"
      @error="error"
    />
  </div>
</template>

<script>
import animations from 'create-keyframe-animation'
import { mapGetters, mapMutations, mapActions } from 'vuex'
import ProgressBar from 'base/progress-bar/progress-bar'
import ProgressCircle from 'base/progress-circle/progress-circle'
import Scroll from 'base/scroll/scroll'
import { playMode } from 'common/js/config'
import Lyric from 'lyric-parser'
import Playlist from 'components/playlist/playlist'
import { playerMixin } from 'common/js/mixin'

export default {
  components: { ProgressBar, ProgressCircle, Scroll, Playlist },
  mixins: [playerMixin],
  data() {
    return {
      songReady: false,
      currentTime: 0, // 歌曲当前时间
      radius: 32,
      currentLyric: null, // 歌词对象
      currentLineNum: 0, // 歌词当前行
      currentShow: 'cd', // 歌词（lyric）、专辑封面（cd）
      playingLyric: ''
    }
  },
  computed: {
    percent() {
      return this.currentTime / this.currentSong.duration
    },
    disable() {
      return this.songReady ? '' : 'disable'
    },
    cdRoll() {
      return this.playing ? 'play' : 'play pause'
    },
    iconPlay() {
      return this.playing ? 'icon-pause' : 'icon-play'
    },
    iconMiniPlay() {
      return this.playing ? 'icon-pause-mini' : 'icon-play-mini'
    },
    ...mapGetters([
      'playing',
      'fullScreen',
      'currentIndex'
    ])
  },
  watch: {
    currentSong(newSong, oldSong) {
      if (!newSong.id) return
      if (newSong.id === oldSong.id) return
      this.currentLyric && this.currentLyric.stop()
      // this.$nextTick(() => {
      setTimeout(() => {
        this.$refs.audio.play()
        this.songReady = true
        this.getLyric()
      }, 1000)
      // })
    },
    playing(newStatus) {
      const audio = this.$refs.audio
      this.$nextTick(() => {
        newStatus ? audio.play() : audio.pause()
      })
    }
  },
  created() {
    this.touch = {}
  },
  methods: {
    back() {
      this.setFullScreen(false)
    },
    // 进度条变化
    onProgressBarChange(percent) {
      const currentTime = this.currentSong.duration * percent
      this.$refs.audio.currentTime = currentTime
      if (!this.playing) this.togglePlaying()
      this.currentLyric && this.currentLyric.seek(currentTime * 1000)
    },
    updateTime(e) {
      this.currentTime = e.target.currentTime
    },
    // 歌词
    getLyric() {
      this.currentSong.getLyric().then(res => {
        console.log(res)
        this.currentLyric = new Lyric(res, this.handleLyric)
        if (this.playing) {
          this.currentLyric.play()
        }
      }).catch(err => {
        console.log(err)
        this.currentLyric = null
        this.currentLineNum = 0
        this.playingLyric = ''
      })
    },
    handleLyric({ lineNum, txt }) {
      this.currentLineNum = lineNum
      this.playingLyric = txt
      if (lineNum > 5) {
        this.$refs.lyricList.scrollToElement(this.$refs.lyricLine[lineNum - 5], 1000)
      } else {
        this.$refs.lyricList.scrollTo(0, 0, 1000)
      }
    },
    // cd/歌词切换
    middleTouchStart(e) {
      const touch = e.touches[0]
      this.touch.startX = touch.pageX
      this.touch.startY = touch.pageY
      this.initialed = true
    },
    // cd/歌词切换
    middleTouchMove(e) {
      const touch = e.touches[0]
      const diffX = touch.pageX - this.touch.startX
      const diffY = touch.pageY - this.touch.startY
      if (Math.abs(diffX) < Math.abs(diffY)) {
        return
      }
      const left = this.currentShow === 'cd' ? 0 : -window.innerWidth
      const offsetLeft = Math.min(0, Math.max(-window.innerWidth, diffX + left))
      this.touch.percent = Math.abs(offsetLeft / window.innerWidth)
      this.$refs.lyricList.$el.style.transform = `translate3d(${offsetLeft}px, 0, 0)`
      this.$refs.lyricList.$el.style.transition = 'none'
      this.$refs.cdWrapper.style.opacity = 1 - this.touch.percent
      this.$refs.cdWrapper.style.transition = 'none'
    },
    // cd/歌词切换
    middleTouchEnd() {
      let offsetLeft = 0
      let opacity = 0
      if (this.currentShow === 'cd') {
        if (this.touch.percent > 0.1) {
          offsetLeft = -window.innerWidth
          this.currentShow = 'lyric'
        } else {
          offsetLeft = 0
          opacity = 1
        }
      } else {
        if (this.touch.percent < 0.9) {
          offsetLeft = 0
          this.currentShow = 'cd'
          opacity = 1
        } else {
          offsetLeft = -window.innerWidth
        }
      }
      this.$refs.lyricList.$el.style.transform = `translate3d(${offsetLeft}px, 0, 0)`
      const time = 300
      this.$refs.lyricList.$el.style.transition = `all ${time}ms`
      this.$refs.cdWrapper.style.opacity = opacity
      this.$refs.cdWrapper.style.transition = `all ${time}ms`
    },
    // 歌曲加载完毕
    ready() {
      this.songReady = true
      this.savePlayHistory(this.currentSong)
    },
    // 歌曲加载错误
    error() {
      this.songReady = true
      // this.currentTime = 0
      console.log('<<<song load error>>>')
    },
    // 切换播放状态
    togglePlaying() {
      if (!this.songReady) return
      this.setPlayingState(!this.playing)
      this.currentLyric && this.currentLyric.togglePlay()
    },
    // 播放列表上一首
    preSong() {
      if (!this.songReady) return
      if (this.playList.length === 1) {
        this.loop()
      } else {
        let currentIndex = this.currentIndex
        currentIndex = currentIndex === 0 ? this.playList.length - 1 : currentIndex - 1
        this.setCurrentIndex(currentIndex)
        if (!this.playing) {
          this.setPlayingState(true)
        }
      }
      this.songReady = false
    },
    // 播放列表下一首
    nextSong() {
      if (!this.songReady) return
      if (this.playList.length === 1) {
        this.loop()
      } else {
        let currentIndex = this.currentIndex
        currentIndex = currentIndex === this.playList.length - 1 ? 0 : currentIndex + 1
        this.setCurrentIndex(currentIndex)
        if (!this.playing) {
          this.togglePlaying()
        }
      }
      this.songReady = false
    },
    loop() {
      this.$refs.audio.currentTime = 0
      this.$refs.audio.play()
      this.currentLyric && this.currentLyric.seek(0)
    },
    // 播放结束
    ended() {
      if (this.mode === playMode.loop) {
        this.loop()
        return
      }
      this.nextSong()
    },
    // 显示播放列表
    showPlaylist() {
      this.$refs.playlist.show()
    },
    // cd图片动画
    enter(el, done) {
      const { x, y, scale } = this._getPosAndScale()
      const animation = {
        0: {
          transform: `translate3d(${x}px, ${y}px, 0) scale(${scale})`
        },
        60: {
          transform: `translate3d(0, 0, 0) scale(1.1)`
        },
        100: {
          transform: `translate3d(0, 0, 0) scale(1)`
        }
      }
      animations.registerAnimation({
        name: 'move',
        animation,
        presets: {
          duration: 400,
          easing: 'linear'
        }
      })
      animations.runAnimation(this.$refs.cdWrapper, 'move', done)
    },
    afterEnter(el) {
      animations.unregisterAnimation('move')
      this.$refs.cdWrapper.style.animation = ''
    },
    leave(el, done) {
      const { x, y, scale } = this._getPosAndScale()
      this.$refs.cdWrapper.style.transition = 'all .4s'
      this.$refs.cdWrapper.style.transform = `translate3d(${x}px, ${y}px, 0) scale(${scale})`
      this.$refs.cdWrapper.addEventListener('transitionend', done)
    },
    afterLeave(el) {
      this.$refs.cdWrapper.style.transition = ''
      this.$refs.cdWrapper.style.transform = ''
    },
    formatTime(sec) {
      const interval = sec | 0
      const minute = interval / 60 | 0
      let second = interval % 60
      second = String(second).length === 2 ? second : `0${second}`
      return `${minute}:${second}`
    },
    // 获取mini player歌曲图片位置、相对于normal player歌曲图片的scale
    _getPosAndScale() {
      const targetWidth = 40
      const paddingLeft = 40
      const paddingBottom = 30
      const paddingTop = 80
      const width = window.innerWidth * 0.8
      const scale = targetWidth / width
      const x = -(window.innerWidth / 2 - paddingLeft)
      const y = window.innerHeight - paddingTop - width / 2 - paddingBottom
      return {
        x,
        y,
        scale
      }
    },
    ...mapMutations({
      setFullScreen: 'SET_FULL_SCREEN'
    }),
    ...mapActions([
      'savePlayHistory'
    ])
  }
}
</script>

<style lang="stylus" scoped>
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"

  .player
    .normal-player
      position: fixed
      left: 0
      right: 0
      top: 0
      bottom: 0
      z-index: 150
      background: $color-background
      .background
        position: absolute
        left: 0
        top: 0
        width: 100%
        height: 100%
        z-index: -1
        opacity: 0.6
        filter: blur(20px)
      .top
        position: relative
        margin-bottom: 25px
        .back
          position absolute
          top: 0
          left: 6px
          z-index: 50
          .icon-back
            display: block
            padding: 9px
            font-size: $font-size-large-x
            color: $color-theme
            transform: rotate(-90deg)
        .title
          width: 70%
          margin: 0 auto
          line-height: 40px
          text-align: center
          no-wrap()
          font-size: $font-size-large
          color: $color-text
        .subtitle
          line-height: 20px
          text-align: center
          font-size: $font-size-medium
          color: $color-text
      .middle
        position: fixed
        width: 100%
        top: 80px
        bottom: 170px
        white-space: nowrap
        font-size: 0
        .middle-l
          display: inline-block
          vertical-align: top
          position: relative
          width: 100%
          height: 0
          padding-top: 80%
          .cd-wrapper
            position: absolute
            left: 10%
            top: 0
            width: 80%
            height: 100%
            .cd
              width: 100%
              height: 100%
              box-sizing: border-box
              border: 10px solid rgba(255, 255, 255, 0.1)
              border-radius: 50%
              &.play
                animation: rotate 20s linear infinite
              &.pause
                animation-play-state: paused
              .image
                position: absolute
                left: 0
                top: 0
                width: 100%
                height: 100%
                border-radius: 50%

          .playing-lyric-wrapper
            width: 80%
            margin: 30px auto 0 auto
            overflow: hidden
            text-align: center
            .playing-lyric
              height: 20px
              line-height: 20px
              font-size: $font-size-medium
              color: $color-text-l
        .middle-r
          display: inline-block
          vertical-align: top
          width: 100%
          height: 100%
          overflow: hidden
          .lyric-wrapper
            width: 80%
            margin: 0 auto
            overflow: hidden
            text-align: center
            .text
              line-height: 32px
              color: $color-text-l
              font-size: $font-size-medium
              &.current
                color: $color-text
      .bottom
        position: absolute
        bottom: 50px
        width: 100%
        .dot-wrapper
          text-align: center
          font-size: 0
          .dot
            display: inline-block
            vertical-align: middle
            margin: 0 4px
            width: 8px
            height: 8px
            border-radius: 50%
            background: $color-text-l
            &.active
              width: 20px
              border-radius: 5px
              background: $color-text-ll
        .progress-wrapper
          display: flex
          align-items: center
          width: 80%
          margin: 0px auto
          padding: 10px 0
          .time
            color: $color-text
            font-size: $font-size-small
            flex: 0 0 30px
            line-height: 30px
            width: 30px
            &.time-l
              text-align: left
            &.time-r
              text-align: right
          .progress-bar-wrapper
            flex: 1
        .operators
          display: flex
          align-items: center
          .icon
            flex: 1
            color: $color-theme
            &.disable
              color: $color-theme-d
            i
              font-size: 30px
          .i-left
            text-align: right
          .i-center
            padding: 0 20px
            text-align: center
            i
              font-size: 40px
          .i-right
            text-align: left
          .icon-favorite
            color: $color-sub-theme
      &.normal-enter-active, &.normal-leave-active
        transition: all 0.4s
        .top, .bottom
          transition: all 0.4s cubic-bezier(0.86, 0.18, 0.82, 1.32)
      &.normal-enter, &.normal-leave-to
        opacity: 0
        .top
          transform: translate3d(0, -100px, 0)
        .bottom
          transform: translate3d(0, 100px, 0)
    .mini-player
      display: flex
      align-items: center
      position: fixed
      left: 0
      bottom: 0
      z-index: 180
      width: 100%
      height: 60px
      background: $color-highlight-background
      &.mini-enter-active, &.mini-leave-active
        transition: all 0.4s
      &.mini-enter, &.mini-leave-to
        opacity: 0
      .icon
        flex: 0 0 40px
        width: 40px
        padding: 0 10px 0 20px
        img
          border-radius: 50%
          &.play
            animation: rotate 10s linear infinite
          &.pause
            animation-play-state: paused
      .text
        display: flex
        flex-direction: column
        justify-content: center
        flex: 1
        line-height: 20px
        overflow: hidden
        .name
          margin-bottom: 2px
          no-wrap()
          font-size: $font-size-medium
          color: $color-text
        .desc
          no-wrap()
          font-size: $font-size-small
          color: $color-text-d
      .control
        flex: 0 0 30px
        width: 30px
        padding: 0 10px
        .icon-play-mini, .icon-pause-mini, .icon-playlist
          font-size: 30px
          color: $color-theme-d
        .icon-mini
          font-size: 32px
          position: absolute
          left: 0
          top: 0

  @keyframes rotate
    0%
      transform: rotate(0)
    100%
      transform: rotate(360deg)
</style>
