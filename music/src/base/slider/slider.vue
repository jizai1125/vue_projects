<template>
  <div ref="slider" class="slider">
    <div ref="sliderGroup" class="slider-group">
      <slot />
    </div>
    <div class="dots">
      <span
        v-for="(item, idx) in dots"
        :key="idx"
        class="dot"
        :class="{active: currentPageIndex === idx}"
      />
    </div>
  </div>
</template>
<script>
import BScroll from '@better-scroll/core';
import Slide from '@better-scroll/slide';
BScroll.use(Slide)
export default {
  props: {
    loop: {
      type: Boolean,
      default: true
    },
    autoPlay: {
      type: Boolean,
      default: true
    },
    interval: {
      type: Number,
      default: 4000
    }
  },
  data() {
    return {
      dots: [],
      currentPageIndex: 0
    }
  },
  mounted() {
    this._setSliderWidth()
    this._initDots()
    this._initSlider()
    if (this.autoPlay) {
      this._play()
    }
    window.addEventListener('resize', e => {
      if (!this.slider) return
      this._setSliderWidth(true)
      this.slider.refresh()
    })
  },
  methods: {
    // 设置总宽度
    _setSliderWidth(isResize) {
      this.children = this.$refs.sliderGroup.children
      let width = 0
      let sliderWidth = this.$refs.slider.clientWidth;
      [].slice.call(this.children).map(item => {
        item.classList.add('slider-item')
        item.style.width = sliderWidth + 'px';
        width += sliderWidth
      })
      if (this.loop && !isResize) {
        width += 2 * sliderWidth
      }
      this.$refs.sliderGroup.style.width = width + 'px';
    },
    // dots初始化
    _initDots() {
      this.dots = new Array(this.children.length)
    },
    // slider初始化
    _initSlider() {
      this.slider = new BScroll(this.$refs.slider, {
        scrollX: true,
        scrollY: false,
        click: true,
        slide: {
          loop: this.loop,
          threshold: 100
        },
        momentum: false,
        bounce: false
      })
      this.slider.on('scrollEnd', () => {
        const pageIndex = this.slider.getCurrentPage().pageX
        this.currentPageIndex = pageIndex
        if (this.autoPlay) {
          clearInterval(this.timer)
          this._play()
        }
      })
    },
    // 自动播放
    _play() {
      this.timer = setInterval(() => {
        this.slider.next()
      }, this.interval)
    }
  }
}
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
@import '~common/stylus/variable';

.slider {
  min-height: 1px;

  .slider-group {
    position: relative;
    overflow: hidden;
    white-space: nowrap;

    .slider-item {
      float: left;
      box-sizing: border-box;
      overflow: hidden;
      text-align: center;

      a {
        display: block;
        width: 100%;
        overflow: hidden;
        text-decoration: none;
      }

      img {
        display: block;
        width: 100%;
      }
    }
  }

  .dots {
    position: absolute;
    right: 0;
    left: 0;
    bottom: 12px;
    text-align: center;
    font-size: 0;

    .dot {
      display: inline-block;
      margin: 0 4px;
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: $color-text-l;

      &.active {
        width: 20px;
        border-radius: 5px;
        background: $color-text-ll;
      }
    }
  }
}
</style>
