import { mapGetters } from 'vuex'

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
      throw new Error('component must implement handlePlayList method !!!')
    }
  }
}
