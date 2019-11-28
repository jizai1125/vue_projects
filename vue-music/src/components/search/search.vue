<template>
  <div class="search">
    <div class="search-box-wrapper">
      <search-box
        ref="searchBox"
        @query="queryChange"
      />
    </div>
    <div v-show="!query" class="shortcut-wrapper">
      <div class="shortcut">
        <div class="hot-key">
          <h1 class="title">热门搜索</h1>
          <ul>
            <li v-for="item in hotKey" :key="item.hotkey_id" class="item" @click="addQuery(item.title)">{{ item.title }}</li>
          </ul>
        </div>
      </div>
    </div>
    <div v-show="query" class="search-result">
      <suggest :query="query" :show-singer="showSinger" />
    </div>
  </div>
</template>

<script>

import SearchBox from 'base/search-box/search-box'
import Suggest from 'components/suggest/suggest'
import { getSongKey } from 'api/singer'
import { getHotKey } from 'api/search'
import { createSong } from 'common/js/song'
import { ERR_OK } from 'api/config'
export default {
  name: 'Search',
  components: {
    SearchBox,
    Suggest
  },
  data() {
    return {
      hotKey: [],
      query: '',
      showSinger: true
    }
  },
  created() {
    this._getHotKey()
  },
  methods: {
    queryChange(query) {
      this.query = query
    },
    addQuery(query) {
      this.$refs.searchBox.setQuery(query)
    },
    _getHotKey() {
      getHotKey().then(res => {
        console.log(res)
        if (res.hotkey.code !== ERR_OK) {
          console.log('<<<GET HOT KEY ERROR>>>', res)
          return
        }
        this.hotKey = res.hotkey.data.vec_hotkey
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"

  .search
    .search-box-wrapper
      margin: 20px
    .shortcut-wrapper
      position: fixed
      top: 178px
      bottom: 0
      width: 100%
      .shortcut
        height: 100%
        overflow: hidden
        .hot-key
          margin: 0 20px 20px 20px
          .title
            margin-bottom: 20px
            font-size: $font-size-medium
            color: $color-text-l
          .item
            display: inline-block
            padding: 5px 10px
            margin: 0 20px 10px 0
            border-radius: 6px
            background: $color-highlight-background
            font-size: $font-size-medium
            color: $color-text-d
        .search-history
          position: relative
          margin: 0 20px
          .title
            display: flex
            align-items: center
            height: 40px
            font-size: $font-size-medium
            color: $color-text-l
            .text
              flex: 1
            .clear
              extend-click()
              .icon-clear
                font-size: $font-size-medium
                color: $color-text-d
    .search-result
      position: fixed
      width: 100%
      top: 178px
      bottom: 0
  .slide-enter-active, .slide-leave-active
    transition: all 0.3s
  .slide-enter, .slide-leave-to
    transform: translate3d(100%, 0, 0)
</style>
