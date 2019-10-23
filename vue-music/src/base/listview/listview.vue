<template>
  <div>
    <Scroll class="listView" :data="data">
      <ul>
        <li v-for="group in data" :key="group.tag" class="list-group">
          <h2 class="list-group-title">{{ group.tag }}</h2>
          <ul>
            <li v-for="item in group.data" :key="item.singer_mid" class="list-group-item">
              <img v-lazy="item.singer_pic" class="avatar">
              <span class="name">{{ item.singer_name }}</span>
            </li>
          </ul>
        </li>
      </ul>
      <ul class="tags">
        <li
          v-for="(item, i) in tags"
          :key="item.id"
          :class="['tags-item', i === current ? 'active': '']"
          @click="current = i"
        >{{ item.name }}</li>
      </ul>
    </Scroll>
    <div class="loading-container">
      <Loading v-show="!data.length" />
    </div>
  </div>
</template>
<script>
import Scroll from 'base/scroll/scroll'
import Loading from 'base/loading/loading'

export default {
  components: { Scroll, Loading },
  props: {
    data: {
      type: Array,
      default: null
    },
    tags: {
      type: Array,
      default: null
    }
  },
  data() {
    return {
      current: 0
    }
  },
  methods: {}
}
</script>
<style lang="stylus" scoped>
@import '~common/stylus/variable';

.listView
  position: absolute
  width: 100%
  height: calc(100% - 84px)
  overflow: hidden
  background: $color-background
  .list-group
    padding-bottom: 30px
    .list-group-title
      height: 30px
      line-height: 30px
      padding-left: 30px
      color: $color-text-d
      font-size: $font-size-medium
      background-color: $color-highlight-background
    .list-group-item
      display: flex
      align-items: center
      padding: 20px 0 0 30px
      .avatar
        width: 50px
        height: 50px
        border-radius: 50%
      .name
        margin-left: 20px
        color: $color-text-l
        font-size: $font-size-medium
  .tags
    display: flex
    flex-direction: column
    justify-content: space-around
    position: absolute
    top: 50%
    right: 0
    transform: translateY(-50%)
    height: 90%
    border-radius: 20px
    text-align: center
    font-size: $font-size-small
    color: $color-text-d
    background-color: $color-background-d
    .tags-item
      padding: 0
    .tags-item.active
      color: $color-theme
.loading-container {
  position: absolute;
  width: 100%;
  top: 50%;
  transform: translateY(-50%);
}
</style>
