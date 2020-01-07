import { mapGetters, mapMutations, mapActions } from 'vuex'
import { playMode } from 'common/js/config'
import { shuffle } from 'common/js/util'

// 修复滚动列表底部被播放器player.vue遮住问题
export const playlistMixin = {
  computed: {
    ...mapGetters([
      'playList'
    ])
  },
  watch: {
    playList(newList) {
      this.handlePlayList(newList)
    }
  },
  mounted() {
    this.handlePlayList(this.playList)
  },
  activated() {
    this.handlePlayList(this.playList)
  },
  methods: {
    handlePlayList() {
      throw new Error('👀👀👀component must implement handlePlayList method !!!')
    }
  }
}

// 播放器player相关
export const playerMixin = {
  computed: {
    iconMode() {
      return this.mode === playMode.sequence ? 'icon-sequence' : this.mode === playMode.loop ? 'icon-loop' : 'icon-random'
    },
    ...mapGetters([
      'playList',
      'sequenceList',
      'currentSong',
      'mode',
      'favoriteList'
    ])
  },
  methods: {
    // 切换播放模式
    changeMode() {
      const mode = (this.mode + 1) % 3
      this.setplayMode(mode)
      let list = null
      if (mode === playMode.random) {
        list = shuffle(this.sequenceList)
      } else {
        list = this.sequenceList
      }
      this.resetCurrentIndex(list)
      this.setPlayList(list)
    },
    // 设置当前歌曲索引
    resetCurrentIndex(list) {
      const index = list.findIndex(item => item.id === this.currentSong.id)
      this.setCurrentIndex(index)
    },
    getFavoriteIcon(song) {
      // console.log(song)
      return this.isFavorite(song) ? 'icon-favorite' : 'icon-not-favorite'
    },
    // 收藏歌曲
    toggleFavorite(song) {
      this.isFavorite(song) ? this.deleteFavoriteSong(song) : this.saveFavoriteSong(song)
    },
    isFavorite(song) {
      const flag = this.favoriteList.some(item => item.id === song.id)
      // console.log(flag)
      return flag
    },
    ...mapMutations({
      setCurrentIndex: 'SET_CURRENT_INDEX',
      setplayMode: 'SET_PLAY_MODE',
      setPlayList: 'SET_PLAYLIST',
      setPlayingState: 'SET_PLAYING_STATE'
    }),
    ...mapActions([
      'saveFavoriteSong',
      'deleteFavoriteSong'
    ])
  }
}

// 搜索相关
export const searchMixin = {
  computed: {
    ...mapGetters([
      'searchHistory'
    ])
  },
  data() {
    return {
      query: '',
      refreshDelay: 100
    }
  },
  methods: {
    addQuery(query) {
      this.$refs.searchBox.setQuery(query)
    },
    queryChange(query) {
      this.query = query
    },
    blurInput() {
      this.$refs.searchBox.blur()
    },
    saveSearch() {
      this.saveSearchHistory(this.query)
    },
    ...mapActions([
      'saveSearchHistory',
      'deleteSearchHistory'
    ])
  }
}
