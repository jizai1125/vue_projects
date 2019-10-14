<template>
  <div class="singer-Wrapper">
    <list-view></list-view>
    <!-- <ul class="singer-list">
      <li class="singer-item" v-for="item in hotSingers" :key="item.singer_id">
        <img :src="item.singer_pic" alt />
        <span>{{ item.singer_name }}</span>
      </li>
    </ul>
    <ul class="tags">
      <li class="tags-item" v-for="item in tags['index']" :key="item.name">{{item.name}}</li>
    </ul> -->
  </div>
</template>
<script>
import { getSingerList } from "api/singer";
import { ERR_OK } from "api/config";
import ListView from "base/listview/listview";
export default {
  components: { ListView },
  data() {
    return {
      hotSingers: [],
      tags: []
    };
  },
  created() {
    this._getSingerList();
  },
  methods: {
    _getSingerList() {
      getSingerList().then(res => {
        console.log(res);
        if (res.code !== ERR_OK) {
          console.log("get singerList ERR CODE", res.code);
          return;
        }
        let result = res.singerList.data;
        this.hotSingers = result.singerlist;
        this.tags = result.tags;
      });
    }
  }
};
</script>
<style lang="stylus" scoped>
.singer-Wrapper 
  // position absolute
  // top 88px
  // bottom 0
  width 100%
  .singer-list
    border: 1px solid
  .tags
    position: absolute;
    right: 0;
    top: 0;
    border: 1px solid red;
    .tags-item
      // padding: 5px;
</style>