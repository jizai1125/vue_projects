<template>
  <transition name="drop">
    <div v-show="showFlag" class="top-tip" @click.stop="hide">
      <slot />
    </div>
  </transition>
</template>

<script>
export default {
  name: 'TopTip',
  props: {
    delay: {
      type: Number,
      default: 2000
    }
  },
  data() {
    return {
      showFlag: false
    }
  },
  methods: {
    show() {
      if (this.timmer) {
        clearTimeout(this.timmer)
      }
      this.showFlag = true
      this.timmer = setTimeout(() => {
        this.hide()
      }, this.delay)
    },
    hide() {
      this.showFlag = false
    }
  }
}
</script>

<style lang="stylus" scoped>
  @import "~common/stylus/variable"

  .top-tip
    position: fixed
    top: 0
    width: 100%
    z-index: 500
    background: $color-dialog-background
    &.drop-enter-active, &.drop-leave-active
      transition: all 0.3s
    &.drop-enter, &.drop-leave-to
      transform: translate3d(0, -100%, 0)
</style>
