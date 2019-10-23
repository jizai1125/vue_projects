<template>
  <div class="singer-Wrapper">
    <list-view :data="singerList" :tags="tags" />
  </div>
</template>
<script>
import { getSingerList } from 'api/singer'
import { ERR_OK } from 'api/config'
import ListView from 'base/listview/listview'
export default {
  components: { ListView },
  data() {
    return {
      singerList: [],
      tags: []
    }
  },
  created() {
    this._getSingerList({ index: -100 })
  },
  methods: {
    async _getSingerList(params) {
      await getSingerList(params).then(res => {
        if (res.code !== ERR_OK) {
          console.log('get singerList ERR CODE', res.code)
          return
        }
        const result = res.singerList.data
        this.tags = result.tags.index
      })
      const promises = this.tags.map(item => {
        return getSingerList({ index: item.id })
      })
      console.log(promises)
      Promise.all(promises).then(res => {
        this.singerList = res.map((item, index) => {
          return ({
            tag: this.tags[index].name,
            data: item.singerList.data.singerlist
          })
        })
        console.log(this.singerList)
      }).catch(err => {
        console.log(err)
      })
    }
  }
}
</script>
<style lang="stylus" scoped>
.singer-Wrapper
  // position absolute
  // top 88px
  // bottom 0
  width 100%
  height 100%
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
