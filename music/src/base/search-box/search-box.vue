<template>
  <div class="search-box">
    <i class="icon-search" />
    <input ref="query" v-model="query" type="text" :placeholder="placeholder" class="box">
    <i v-show="query" class="icon-dismiss" @click="clear" />
  </div>
</template>
<script>
import { debounce } from 'common/js/util'
export default {
  name: 'SearchBox',
  props: {
    placeholder: {
      type: String,
      default: '搜索歌曲、歌手'
    }
  },
  data() {
    return {
      query: ''
    }
  },
  created() {
    this.$watch('query', debounce((newValue) => {
      this.$emit('query', newValue)
    }, 300))
  },
  methods: {
    clear() {
      this.query = ''
    },
    setQuery(query) {
      this.query = query
    },
    blur() {
      this.$refs.query.blur()
    }
  }
}
</script>

<style lang="stylus" scoped>
  @import "~common/stylus/variable"

  .search-box
    display: flex
    align-items: center
    box-sizing: border-box
    width: 100%
    padding: 0 6px
    height: 40px
    background: $color-highlight-background
    border-radius: 6px
    .icon-search
      font-size: 24px
      color: $color-background
    .box
      flex: 1
      margin: 0 5px
      line-height: 18px
      background: $color-highlight-background
      color: $color-text
      font-size: $font-size-medium
      &::placeholder
        color: $color-text-d
    .icon-dismiss
      font-size: 16px
      color: $color-background
</style>
