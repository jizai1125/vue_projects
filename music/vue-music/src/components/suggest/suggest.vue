<template>
  <Scroll
    ref="suggest"
    class="suggest"
    :before-scroll="beforeScroll"
    :data="list"
    @beforeScroll="beforeListScroll"
  >
    <div class="song-list-wrapper">
      <song-list :songs="list" @select="selectSong" />
      <Loading v-show="hasMore" title="" />
    </div>
    <div v-show="!hasMore && !list.length" class="no-result-wrapper">
      <no-result title="抱歉，暂无搜索结果" />
    </div>
  </Scroll>
</template>

<script>
import Scroll from "base/scroll/scroll";
import Loading from "base/loading/loading";
import NoResult from "base/no-result/no-result";
import { mapMutations, mapActions } from "vuex";
import SongList from "base/song-list/song-list";
import { querySong } from 'api/song';

export default {
  name: "Suggest",
  components: {
    Scroll,
    Loading,
    NoResult,
    SongList,
  },
  props: {
    query: {
      type: String,
      default: "",
    },
    showSinger: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      list: [],
      beforeScroll: true,
      hasMore: true, // 是否有更多数据
      isScrollEnd: false,
    };
  },
  watch: {
    query() {
      this.search();
    },
  },
  methods: {
    // 选中歌曲
    selectSong(item, index) {
      console.log("select play", item, index);
      // 插入播放列表
      this.insertSong(item);
      this.$emit("select", item);
    },
    beforeListScroll() {
      this.$emit("beforeListScroll");
    },
    // 模糊查询歌曲
    requestData() {
      querySong(this.query)
        .then((res) => {
          this.hasMore = false;
          console.log("query", res);
          this.list = res;
        })
        .catch((err) => {
          this.isScrollEnd = false;
          console.log("error", err);
        });
    },
    // 查询
    search() {
      this.hasMore = true;
      this.list = [];
      this.$refs.suggest.scrollTo(0, 0);
      if (!this.query.trim()) return;
      this.requestData();
    },
    refresh() {
      this.$refs.suggest.refresh();
    },
    ...mapMutations({
      setSinger: "SET_SINGER",
    }),
    ...mapActions(["insertSong"]),
  },
};
</script>

<style lang="stylus" scoped>
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"
.song-list-wrapper {
    padding: 20px 30px;
}
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
