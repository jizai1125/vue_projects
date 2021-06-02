<template>
  <div class="search">
    <div class="search-box-wrapper">
      <search-box
        ref="searchBox"
        @query="queryChange"
      />
    </div>
    <div v-show="!query" ref="shortcutWrapper" class="shortcut-wrapper">
      <scroll ref="shortcut" class="shortcut" :data="shortcut" :refresh-delay="refreshDelay">
        <div>
          <div class="hot-key">
            <h1 class="title">热门搜索</h1>
            <ul>
              <li v-for="item in hotKey" :key="item.hotkey_id" class="item" @click="addQuery(item.title)">{{ item.title }}</li>
            </ul>
          </div>
          <div v-show="searchHistory.length" class="search-history">
            <div class="title">
              <span class="text">搜索历史</span>
              <span class="clear" @click="showConfirm">
                <i class="icon-clear" />
              </span>
            </div>
            <search-list
              :searches="searchHistory"
              @select="addQuery"
              @delete="deleteSearchHistory"
            />
          </div>
        </div>
      </scroll>
    </div>
    <div v-show="query" ref="searchResult" class="search-result">
      <suggest
        ref="suggest"
        :query="query"
        :show-singer="showSinger"
        @beforeListScroll="blurInput"
        @select="saveSearch"
      />
    </div>
    <confirm ref="confirm" text="是否清空搜索历史？" confirm-btn-text="清空" @confirm="clearSearchHistory" />
    <transition name="slide">
      <router-view />
    </transition>
  </div>
</template>

<script>
import Scroll from 'base/scroll/scroll'
import SearchBox from 'base/search-box/search-box'
import Suggest from 'components/suggest/suggest'
import SearchList from 'base/search-list/search-list'
import Confirm from 'base/confirm/confirm'
import { getHotKey } from 'api/search'
import { ERR_OK } from 'api/config'
import { playlistMixin, searchMixin } from 'common/js/mixin'
import { mapActions } from 'vuex'

export default {
  name: 'Search',
  components: {
    Scroll,
    SearchBox,
    Suggest,
    SearchList,
    Confirm
  },
  mixins: [playlistMixin, searchMixin],
  data() {
    return {
      hotKey: [],
      showSinger: true
    }
  },
  computed: {
    shortcut() {
      return this.hotKey.concat(this.searchHistory)
    }
    // ...mapGetters([
    //   'searchHistory'
    // ])
  },
  watch: {
    query(newVal) {
      if (!newVal) {
        setTimeout(() => {
          this.$refs.shortcut.refresh()
        }, 20)
      }
    }
  },
  created() {
    this._getHotKey()
  },
  methods: {
    // blurInput() {
    //   this.$refs.searchBox.blur()
    // },
    // queryChange(query) {
    //   this.query = query
    // },
    // addQuery(query) {
    //   this.$refs.searchBox.setQuery(query)
    // },
    // saveSearch() {
    //   this.saveSearchHistory(this.query)
    // },
    showConfirm() {
      this.$refs.confirm.show()
    },
    handlePlayList(playList) {
      const bottom = playList.length > 0 ? '60px' : 0
      this.$refs.shortcutWrapper.style.bottom = bottom
      this.$refs.shortcut.refresh()
      this.$refs.searchResult.style.bottom = bottom
      this.$refs.suggest.refresh()
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
    },
    ...mapActions([
      // 'saveSearchHistory',
      // 'deleteSearchHistory',
      'clearSearchHistory'
    ])
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
