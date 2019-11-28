<template>
  <Scroll
    ref="suggest"
    class="suggest"
    :pullup="pullup"
    :data="songList"
    @scrollToEnd="scrollToEnd"
  >
    <ul class="suggest-list">
      <li v-for="(item, index) in songList" :key="index" class="suggest-item">
        <div class="icon">
          <i :class="getIconClas(item)" />
        </div>
        <div class="name">
          <p class="text">{{ getDesc(item) }}</p>
        </div>
      </li>
      <Loading v-show="hasMore" title="" />
    </ul>
  </Scroll>
</template>

<script>
import { search } from 'api/search'
import { ERR_OK } from 'api/config'
import { createSong } from 'common/js/song'
import { getSongKey } from 'api/singer'
import Scroll from 'base/scroll/scroll'
import Loading from 'base/loading/loading'

const TYPE_SINGER = 'singer'

export default {
  name: 'Suggest',
  components: { Scroll, Loading },
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
      page: 1, // 页码
      perpage: 20, // 每页数量
      songList: [],
      pullup: true, // 上拉刷新
      hasMore: true // 是否有更多数据
    }
  },
  watch: {
    query() {
      this.search()
    }
  },
  methods: {
    scrollToEnd() {
      this.loadMore()
    },
    // 查询
    search() {
      this.hasMore = true
      this.page = 1
      this.songList = []
      this.$refs.suggest.scrollTo(0, 0)
      if (!this.query.trim()) return
      search({
        word: this.query,
        page: this.page,
        showSinger: this.showSinger,
        perpage: this.perpage
      }).then(res => {
        console.log(res)
        if (res.code !== ERR_OK) {
          console.log('<<<SEARCH ERROR>>>', res)
          return
        }
        this._genResult(res.data)
        this._checkMore(res.data)
      })
    },
    // 加载更多数据
    loadMore() {
      if (!this.hasMore) return
      this.page++
      search({
        word: this.query,
        page: this.page,
        showSinger: this.showSinger,
        perpage: this.perpage
      }).then(res => {
        console.log(res)
        if (res.code !== ERR_OK) {
          console.log('<<<SEARCH ERROR>>>', res)
          return
        }
        this._genResult(res.data)
        this._checkMore(res.data)
      })
    },
    getIconClas(item) {
      return item.type === TYPE_SINGER ? 'icon-mine' : 'icon-music'
    },
    getDesc(item) {
      return item.type === TYPE_SINGER ? item.singername : `${item.name} - ${item.singer}`
    },
    // 判断是否还有数据
    _checkMore(data) {
      if (!data.song.list.length || data.curnum + this.perpage * data.curpage >= data.totalnum) {
        console.log('no results!!!')
        this.hasMore = false
      }
    },
    // 将数据进行分类，歌手/歌曲
    async _genResult(data) {
      let result = []
      if (data.zhida && data.zhida.albumid) {
        result.push({
          ...data.zhida,
          type: TYPE_SINGER
        })
      }
      if (data.song) {
        const res = await this._normalizeSong(data.song.list)
        result = result.concat(res)
        this.songList = this.songList.concat(result)
        console.log(this.songList)
      }
    },
    async _normalizeSong(list) {
      const result = []
      for (let i = 0; i < list.length; i++) {
        const item = list[i]
        item.mid = item.songmid
        item.id = item.songid
        item.name = item.songname
        item.album = {
          name: item.albumname,
          mid: item.albummid
        }
        const response = await getSongKey(item.songmid)
        if (response.code !== ERR_OK) {
          console.error('<<<GET SONG PURL ERR>>>', response)
          return
        }
        const purl = response.req_0.data.midurlinfo[0].purl
        result.push(createSong(item, purl))
      }
      return result
      // === 需完善歌曲url请求的逻辑 ===
      // return list.map(item => createSong(item.songInfo, ''))
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
