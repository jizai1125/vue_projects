<template>
<div >
  <Scroll class="listView">
    <div>
      <ul>
        <li>1</li>
        <li>2</li>
        <li>32</li>
        <li>3</li>
        <li>32</li>
        <li>32</li>
        <li>3</li>
        <li>3</li>
        <li>3</li>
        <li>3</li>
        <li>1</li>
        <li>2</li>
        <li>32</li>
        <li>3</li>
        <li>32</li>
        <li>32</li>
        <li>3</li>
        <li>3</li>
        <li>3</li>
        <li>3</li>
        <li>1</li>
        <li>2</li>
        <li>32</li>
        <li>3</li>
        <li>32</li>
        <li>32</li>
        <li>3</li>
        <li>3</li>
        <li>3</li>
        <li>3</li><li>1</li>
        <li>2</li>
        <li>32</li>
        <li>3</li>
        <li>32</li>
        <li>32</li>
        <li>3</li>
        <li>3</li>
        <li>3</li>
        <li>3</li><li>1</li>
        <li>2</li>
        <li>32</li>
        <li>3</li>
        <li>32</li>
        <li>32</li>
        <li>3</li>
        <li>3</li>
        <li>3</li>
        <li>3</li><li>1</li>
        <li>2</li>
        <li>32</li>
        <li>3</li>
        <li>32</li>
        <li>32</li>
        <li>3</li>
        <li>3</li>
        <li>3</li>
        <li>3</li><li>1</li>
        <li>2</li>
        <li>32</li>
        <li>3</li>
        <li>32</li>
        <li>32</li>
        <li>3</li>
        <li>3</li>
        <li>3</li>
        <li>3</li><li>1</li>
        <li>2</li>
        <li>32</li>
        <li>3</li>
        <li>32</li>
        <li>32</li>
        <li>3</li>
        <li>3</li>
        <li>3</li>
        <li>3</li>
      </ul>
    </div>
  </Scroll>
</div>
</template>
<script>
import Scroll from "base/scroll/scroll";
export default {
  components: { Scroll },
  props: {
    data: {
      type: Array,
      default: null
    }
  },
  data() {
    return {

    }
  },
  methods: {

  }
}
</script>
<style lang="stylus" scoped>
  @import "~common/stylus/variable"
.listView
  position: absolute
  width: 100%
  height: 100%
  overflow: hidden
  background: $color-background
</style>