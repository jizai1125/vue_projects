<!-- 推荐页 -->
<template>
  <div ref="recommend" class="recommend">
    <Scroll ref="scroll" class="recommend-content" :data="recomPlayList">
      <div>
        <div class="slider-wrapper">
          <slider v-if="recommends.length">
            <div v-for="item in recommends" :key="item.id">
              <a :href="item.linkUrl">
                <img :src="item.picUrl" @load="loadImg">
              </a>
            </div>
          </slider>
        </div>
        <div class="recommend-list">
          <h1 class="list-title">热门歌曲推荐</h1>
          <div class="song-list-wrapper">
            <song-list :songs="recomPlayList" @select="selectSong" />
          </div>
        </div>
        <div class="loading-container">
          <Loading v-show="!recomPlayList.length" />
        </div>
      </div>
    </Scroll>
    <transition name="slide">
      <router-view />
    </transition>
  </div>
</template>
<script>
import { getRecommendSong, getRecommend } from 'api/recommend'
import { ERR_OK } from 'api/config'
import Scroll from 'base/scroll/scroll'
import Slider from 'base/slider/slider'
import Loading from 'base/loading/loading'
import { playlistMixin } from 'common/js/mixin'
import { mapMutations, mapActions } from 'vuex'
import SongList from 'base/song-list/song-list'

export default {
  components: { Slider, Scroll, Loading, SongList },
  mixins: [playlistMixin],
  data() {
    return {
      isImgLoaded: false,
      recommends: [],
      recomPlayList: []
    }
  },
  computed: {},
  created() {
    this._getRecommendSong()
    this._getRecommend()
  },
  methods: {
    // 选中歌曲
    selectSong(item, index) {
      console.log('select play', item, index)
      this.selectPlay({
        list: this.recomPlayList,
        index
      })
    },
    // 获取推荐列表
    _getRecommend() {
      getRecommend().then(res => {
        if (res.code !== 0) {
          console.log(res.code)
          return
        }
        const result = res.data
        console.log('aaaaa', result)
        this.recommends = result.slider
      })
    },
    // 获取推荐歌曲
    _getRecommendSong() {
      getRecommendSong().then(res => {
        console.log(res);
        const list = res.map(item => item.song)
        this.recomPlayList = list
      })
    },
    // 处理列表底部被播放器遮盖
    handlePlayList(playList) {
      this.$refs.recommend.style.bottom = playList.length > 0 ? '60px' : 0
      this.$refs.scroll.refresh()
    },
    _getPlayNum(num) {
      return `${Number(num / 10000).toFixed(2)}万`
    },
    loadImg() {
      if (this.isImgLoaded) return
      this.isImgLoaded = true
      this.$refs.scroll.refresh()
    },
    ...mapActions([
      'selectPlay',
    ]),
    ...mapMutations({
      setCurrentDisc: 'SET_CURRENT_DISC'
    })
  }
}
</script>
<style lang="stylus" scoped>
@import '~common/stylus/variable';

.slide-enter-active, .slide-leave-active {
  transition: all .3s;
}
.slide-enter, .slide-leave-to {
  transform: translate3d(100%, 0, 0);
}
.song-list-wrapper {
    padding: 20px 30px;
}
.recommend {
  position: fixed;
  width: 100%;
  top: 88px;
  bottom: 0;

  .recommend-content {
    height: 100%;
    overflow: hidden;

    .slider-wrapper {
      position: relative;
      width: 100%;
      overflow: hidden;
    }

    .recommend-list {
      .list-title {
        height: 65px;
        line-height: 65px;
        text-align: center;
        font-size: $font-size-medium;
        color: $color-theme;
      }

      .item {
        display: flex;
        box-sizing: border-box;
        align-items: center;
        padding: 0 20px 20px 20px;

        .icon {
          flex: 0 0 60px;
          width: 60px;
          padding-right: 20px;
        }

        .text {
          display: flex;
          flex-direction: column;
          justify-content: center;
          flex: 1;
          line-height: 20px;
          overflow: hidden;
          font-size: $font-size-medium;

          .name {
            margin-bottom: 10px;
            color: $color-text;
          }

          .desc {
            color: $color-text-d;
          }
        }
      }
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
