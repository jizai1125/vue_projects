<template>
  <transition name="slide">
    <div class="user-center">
      <div class="switches-wrapper">
        <switches
          :switches="switches"
          :current-index="currentIndex"
          @switch="switchItem"
        />
      </div>
      <div class="play-btn" @click="random">
        <i class="icon-play" />
        <span class="text">随机播放全部</span>
      </div>
      <div ref="listWrapper" class="list-wrapper">
        <!-- 我喜欢的 -->
        <scroll
          v-if="currentIndex === 0"
          ref="favoriteList"
          class="list-scroll"
        >
          <div class="list-inner">
            <song-list :songs="favoriteList" @select="selectSong" />
          </div>
        </scroll>
        <!-- 我最近听的 -->
        <scroll v-else ref="playList" class="list-scroll" :data="playHistory">
          <div class="list-inner">
            <song-list :songs="playHistory" @select="selectSong" />
          </div>
        </scroll>
      </div>
      <div v-show="hasResult" class="no-result-wrapper">
        <no-result :title="noResultTitle[currentIndex]" />
      </div>
    </div>
  </transition>
</template>

<script>
import Switches from "base/switches/switches";
import Scroll from "base/scroll/scroll";
import SongList from "base/song-list/song-list";
import NoResult from "base/no-result/no-result";
import { playlistMixin } from "common/js/mixin";
import { mapGetters, mapActions, mapMutations } from "vuex";
import { getCollect } from "api/collect";

export default {
  name: "UserCenter",
  components: { Switches, Scroll, SongList, NoResult },
  mixins: [playlistMixin],
  data() {
    return {
      switches: [{ name: "我喜欢的" }, { name: "最近听的" }],
      noResultTitle: ["暂无收藏歌曲", "最近没有听歌哦"],
      currentIndex: 0,
    };
  },
  computed: {
    hasResult() {
      return this.currentIndex === 0
        ? !this.favoriteList.length
        : !this.playHistory.length;
    },
    ...mapGetters(["playHistory", "favoriteList"]),
  },
  created() {
    getCollect().then((res) => {
      console.log("res", res);
      const list = res.map(item => item.song)
      this.setFavorite(list);
    });
  },
  methods: {
    switchItem(index) {
      this.currentIndex = index;
    },
    // 最近播放
    selectSong(song, index) {
      this.insertSong(song);
    },
    random() {
      const list = this.currentIndex === 0 ? this.favoriteList : this.playHistory;
      this.randomPlay({ list });
    },
    handlePlayList(playList) {
      const bottom = playList.length > 0 ? "60px" : "";
      this.$refs.listWrapper.style.bottom = bottom;
      this.$refs.playList && this.$refs.playList.refresh();
      this.$refs.playHistory && this.$refs.playHistory.refresh();
    },
    ...mapMutations({
      setFavorite: "SET_FAVORITE_LIST",
    }),
    ...mapActions(["insertSong", "randomPlay"]),
  },
};
</script>

<style lang="stylus" scoped>
@import "~common/stylus/variable"

.user-center
  position: fixed
  top: 88px
  bottom: 0
  z-index: 100
  width: 100%
  background: $color-background
  &.slide-enter-active, &.slide-leave-active
    transition: all 0.3s
  &.slide-enter, &.slide-leave-to
    transform: translate3d(100%, 0, 0)
  .back
    position absolute
    top: 0
    left: 6px
    z-index: 50
    .icon-back
      display: block
      padding: 10px
      font-size: $font-size-large-x
      color: $color-theme
  .switches-wrapper
    margin: 10px 0 30px 0
  .play-btn
    box-sizing: border-box
    width: 135px
    padding: 7px 0
    margin: 0 auto
    text-align: center
    border: 1px solid  $color-text-l
    color: $color-text-l
    border-radius: 100px
    font-size: 0
    .icon-play
      display: inline-block
      vertical-align: middle
      margin-right: 6px
      font-size: $font-size-medium-x
    .text
      display: inline-block
      vertical-align: middle
      font-size: $font-size-small
  .list-wrapper
    position: absolute
    top: 110px
    bottom: 0
    width: 100%
    .list-scroll
      height: 100%
      overflow: hidden
      .list-inner
        padding: 20px 30px
  .no-result-wrapper
    position: absolute
    width: 100%
    top: 50%
    transform: translateY(-50%)
</style>
