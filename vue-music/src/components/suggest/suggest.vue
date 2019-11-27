<template>
  <div class="suggest">
    <ul class="suggest-list">
      <li v-for="(item, index) in list" :key="index" class="suggest-item">
        <div class="icon">
          <i :class="getIconClas(item)" />
        </div>
        <div class="name">
          <p class="text">{{ getDesc(item) }}</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { search } from 'api/search'
import { ERR_OK } from 'api/config'

const TYPE_SINGER = 'singer'

export default {
  name: 'Suggest',
  props: {
    query: {
      type: String,
      default: ''
    },
    showSinger: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      page: 1,
      list: []
    }
  },
  watch: {
    query() {
      this.search()
    }
  },
  methods: {
    search() {
      search({
        word: this.query,
        page: this.page,
        showSinger: this.showSinger
      }).then(res => {
        console.log(res)
        if (res.code !== ERR_OK) {
          console.log('<<<SEARCH ERROR>>>', res)
          return
        }
        this.list = this._genResult(res.data)
      })
    },
    getIconClas(item) {
      return item.type === TYPE_SINGER ? 'icon-mine' : 'icon-music'
    },
    getDesc(item) {
      if (item.type === TYPE_SINGER) {
        return item.singername
      } else {
        const singerName = item.singer.map(item => item.name).join('/')
        return `${item.songname} - ${singerName}`
      }
    },
    _genResult(data) {
      let result = []
      if (data.zhida && data.zhida.albumid) {
        result.push({
          ...data.zhida,
          type: TYPE_SINGER
        })
      }
      if (data.song) {
        result = result.concat(data.song.list)
      }
      return result
    }
  }

}
</script>

<style lang="stylus" scoped>
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"

  .suggest
    height: 100%
    overflow: hidden
    .suggest-list
      padding: 0 30px
      .suggest-item
        display: flex
        align-items: center
        padding-bottom: 20px
      .icon
        flex: 0 0 30px
        width: 30px
        [class^="icon-"]
          font-size: 14px
          color: $color-text-d
      .name
        flex: 1
        font-size: $font-size-medium
        color: $color-text-d
        overflow: hidden
        .text
          no-wrap()
    .no-result-wrapper
      position: absolute
      width: 100%
      top: 50%
      transform: translateY(-50%)
</style>
