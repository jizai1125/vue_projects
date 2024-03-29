<template>
  <transition name="list-fade">
    <div v-show="showFlag" class="playlist" @click="hide">
      <div class="list-wrapper" @click.stop>
        <div class="list-header">
          <h1 class="title">
            <i class="icon" :class="iconMode" @click="changeMode" />
            <span class="text">{{ modeDesc }}</span>
            <span class="clear" @click="showConfirm"><i class="icon-clear" /></span>
          </h1>
        </div>
        <scroll ref="listContent" class="list-content" :data="sequenceList" :refresh-delay="refreshDelay">
          <transition-group name="list" tag="ul">
            <li
              v-for="(item, index) in sequenceList"
              ref="listItem"
              :key="item.id"
              class="item"
              :data-id="item.id"
              @click="selectItem(item, index)"
            >
              <i class="current" :class="getCurrentIcon(item)" />
              <span class="text">{{ item.name }}</span>
              <span class="like" @click.stop="toggleFavorite(item)">
                <i :class="getFavoriteIcon(item)" />
              </span>
              <span class="delete" @click.stop="deleteOne(item)">
                <i class="icon-delete" />
              </span>
            </li>
          </transition-group>
        </scroll>
        <div class="list-operate">
          <div class="add" @click="addSong">
            <i class="icon-add" />
            <span class="text">添加歌曲到队列</span>
          </div>
        </div>
        <div class="list-close" @click="hide">
          <span>关闭</span>
        </div>
      </div>
      <confirm ref="confirm" text="是否清空列表？" confirm-btn-text="清空" @confirm="clear" />
      <add-song ref="addSong" />
    </div>
  </transition>
</template>

<script>
import Scroll from 'base/scroll/scroll'
import Confirm from 'base/confirm/confirm'
import AddSong from 'components/addSong/addSong'
import { mapActions } from 'vuex'
import { playMode } from 'common/js/config'
import { playerMixin } from 'common/js/mixin'

export default {
  name: 'Playlist',
  components: {
    Scroll,
    Confirm,
    AddSong
  },
  mixins: [playerMixin],
  data() {
    return {
      showFlag: false,
      modes: ['顺序播放', '单曲循环', '随机播放'],
      refreshDelay: 100
    }
  },
  computed: {
    modeDesc() {
      return this.modes[this.mode]
    }
  },
  watch: {
    currentSong(newSong, oldSong) {
      if (!this.showFlag || newSong.id === oldSong.id) return
      this.scrollToCurrent(newSong)
    }
  },
  methods: {
    addSong() {
      this.$refs.addSong.show()
    },
    showConfirm() {
      this.$refs.confirm.show()
    },
    show() {
      this.showFlag = true
      setTimeout(() => {
        this.$refs.listContent.refresh()
        this.scrollToCurrent(this.currentSong)
      }, 20)
    },
    hide() {
      this.showFlag = false
    },
    getCurrentIcon(item) {
      return this.currentSong.id === item.id ? 'icon-play' : ''
    },
    selectItem(song, index) {
      if (this.mode === playMode.random) {
        index = this.playList.findIndex(item => item.id === song.id)
      }
      this.setCurrentIndex(index)
      this.setPlayingState(true)
    },
    // 滚动到当前歌曲
    scrollToCurrent(current) {
      console.log(current)
      console.log(this)
      this.$nextTick()
        .then(() => {
          // const index = this.sequenceList.findIndex(item => item.id === current.id)
          // this.$refs.listContent.scrollToElement(this.$refs.listItem[index], 300)
          const currentEleIndex = this.$refs.listItem.findIndex(item => {
            return item.dataset.id === current.id.toString()
          })
          this.$refs.listContent.scrollToElement(this.$refs.listItem[currentEleIndex], 300)
        })
    },
    deleteOne(item) {
      this.deleteSong(item)
      if (!this.playList.length) {
        this.hide()
      }
    },
    // 清空播放列表
    clear() {
      this.clearPlaylist()
      this.hide()
    },
    ...mapActions([
      'deleteSong',
      'clearPlaylist'
    ])
  }
}
</script>

<style lang="stylus" scoped>
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"

  .playlist
    position: fixed
    left: 0
    right: 0
    top: 0
    bottom: 0
    z-index: 200
    background-color: $color-background-d
    &.list-fade-enter-active, &.list-fade-leave-active
      transition: opacity 0.3s
      .list-wrapper
        transition: all 0.3s
    &.list-fade-enter, &.list-fade-leave-to
      opacity: 0
      .list-wrapper
        transform: translate3d(0, 100%, 0)
    &.list-fade-enter
    .list-wrapper
      position: absolute
      left: 0
      bottom: 0
      width: 100%
      background-color: $color-highlight-background
      .list-header
        position: relative
        padding: 20px 30px 10px 20px
        .title
          display: flex
          align-items: center
          .icon
            margin-right: 10px
            font-size: 30px
            color: $color-theme-d
          .text
            flex: 1
            font-size: $font-size-medium
            color: $color-text-l
          .clear
            extend-click()
            .icon-clear
              font-size: $font-size-medium
              color: $color-text-d
      .list-content
        max-height: 240px
        overflow: hidden
        .item
          display: flex
          align-items: center
          height: 40px
          padding: 0 30px 0 20px
          overflow: hidden
          &.list-enter-active, &.list-leave-active
            transition: all 0.1s
          &.list-enter, &.list-leave-to
            height: 0
          .current
            flex: 0 0 20px
            width: 20px
            font-size: $font-size-small
            color: $color-theme-d
          .text
            flex: 1
            no-wrap()
            font-size: $font-size-medium
            color: $color-text-d
          .like
            extend-click()
            margin-right: 15px
            font-size: $font-size-small
            color: $color-theme
            .icon-favorite
              color: $color-sub-theme
          .delete
            extend-click()
            font-size: $font-size-small
            color: $color-theme
      .list-operate
        width: 140px
        margin: 20px auto 30px auto
        .add
          display: flex
          align-items: center
          padding: 8px 16px
          border: 1px solid $color-text-l
          border-radius: 100px
          color: $color-text-l
          .icon-add
            margin-right: 5px
            font-size: $font-size-small-s
          .text
            font-size: $font-size-small
      .list-close
        text-align: center
        line-height: 50px
        background: $color-background
        font-size: $font-size-medium-x
        color: $color-text-l
</style>
