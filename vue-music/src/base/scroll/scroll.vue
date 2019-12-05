<template>
  <div ref="wrapper">
    <slot />
  </div>
</template>
<script>
import BScroll from '@better-scroll/core'
export default {
  props: {
    probeType: {
      type: Number,
      default: 1
    },
    click: {
      type: Boolean,
      default: true
    },
    data: {
      type: Array,
      default: null
    },
    listenScroll: {
      type: Boolean,
      defalut: false
    },
    pullup: {
      type: Boolean,
      default: false
    },
    beforeScroll: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      scrollY: 0
    }
  },
  watch: {
    data() {
      setTimeout(() => {
        this.scroll.refresh()
      }, 20)
    }
  },
  mounted() {
    setTimeout(() => {
      this._initScroll()
    }, 20)
  },
  methods: {
    // 初始化滚动
    _initScroll() {
      if (!this.$refs.wrapper) return
      this.scroll = new BScroll(this.$refs.wrapper, {
        probeType: this.probeType,
        click: this.click,
        scrollY: true
      })
      if (this.listenScroll) {
        this.scroll.on('scroll', pos => {
          this.$emit('scroll', pos)
        })
      }
      if (this.pullup) {
        this.scroll.on('scrollEnd', () => {
          if (this.scroll.directionY > 0 && this.scroll.y <= (this.scroll.maxScrollY + 50)) {
            this.$emit('scrollToEnd')
          }
        })
      }
      if (this.beforeScroll) {
        this.scroll.on('beforeScrollStart', () => {
          this.$emit('beforeScroll')
        })
      }
    },
    enable() {
      this.scroll && this.scroll.enable()
    },
    disable() {
      this.scroll && this.scroll.disable()
    },
    refresh() {
      console.log('refresh')
      this.scroll && this.scroll.refresh()
    },
    scrollTo() {
      this.scroll && this.scroll.scrollTo(...arguments)
    },
    scrollToElement() {
      this.scroll && this.scroll.scrollToElement(...arguments)
    }
  }
}
</script>
<style lang="stylus" scoped></style>
