<template>
  <div class="recommend">
    <Scroll ref="scroll" class="recommend-content" :data="recomPlayList">
      <div>
        <div class="slider-wrapper">
          <slider v-if="recommends.length">
            <div v-for="item in recommends" :key="item.id">
              <a :href="item.linkUrl">
                <img :src="item.picUrl" alt @load="loadImg">
              </a>
            </div>
          </slider>
        </div>
        <div class="recommend-list">
          <h1 class="list-title">热门歌单推荐</h1>
          <ul>
            <li v-for="item in recomPlayList" :key="item.content_id" class="item">
              <img v-lazy="item.cover" alt class="icon">
              <div class="text">
                <h2 class="name">{{ item.title }}</h2>
                <p class="desc">播放量：{{ _getPlayNum(item.listen_num) }}</p>
              </div>
            </li>
          </ul>
        </div>
        <div class="loading-container">
          <Loading v-show="!recomPlayList.length" />
        </div>
      </div>
    </Scroll>
    <router-view />
  </div>
</template>
<script>
import { getRecommend, getDiscList } from 'api/recommend'
import { ERR_OK } from 'api/config'
import Scroll from 'base/scroll/scroll'
import Slider from 'base/slider/slider'
import Loading from 'base/loading/loading'
export default {
  components: { Slider, Scroll, Loading },
  data() {
    return {
      isImgLoaded: false,
      recommends: [],
      recomPlayList: []
    }
  },
  computed: {},
  created() {
    this._getRecommend()
    this._getDiscList()
  },
  methods: {
    // 获取推荐列表
    _getRecommend() {
      getRecommend().then(res => {
        if (res.code !== ERR_OK) {
          console.log(res.code)
          return
        }
        const result = res.data
        console.log(result)
        this.recommends = result.slider
      })
    },
    // 获取歌单列表
    _getDiscList() {
      getDiscList().then(res => {
        if (res.code !== ERR_OK) {
          console.log('<<<ERR>>>', res.code)
          return
        }
        console.dir(res.recomPlaylist.data.v_hot)
        const result = res.recomPlaylist.data.v_hot
        this.recomPlayList = result
      })
    },
    _getPlayNum(num) {
      return `${Number(num / 10000).toFixed(2)}万`
    },
    loadImg() {
      if (this.isImgLoaded) return
      this.isImgLoaded = true
      this.$refs.scroll.refresh()
    }
  }
}
</script>
<style lang="stylus" scoped>
@import '~common/stylus/variable';

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
