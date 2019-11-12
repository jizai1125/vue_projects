<template>
  <div ref="progressBar" class="progress-bar" @click="progressBarClick">
    <div class="bar-inner">
      <div ref="progress" class="progress" />
      <div
        ref="progressBtn"
        class="progress-btn-wrapper"
        @touchstart.prevent="progressTouchStart"
        @touchmove.prevent="progressTouchMove"
        @touchend="progressTouchEnd"
      >
        <div class="progress-btn" />
      </div>
    </div>
  </div>
</template>

<script>
const progressBtnWidth = 16
export default {
  name: 'ProgressBar',
  props: {
    percent: {
      type: Number,
      default: 0
    }
  },
  watch: {
    percent(newPercent) {
      if (newPercent < 0 || this.touch.initiated) return
      const barWidth = this.$refs.progressBar.clientWidth - progressBtnWidth
      const offsetWidth = newPercent * barWidth
      this._offset(offsetWidth)
    }
  },
  created() {
    this.touch = {
      initiated: false,
      startX: 0,
      progressWidth: 0
    }
  },
  methods: {
    progressBarClick(e) {
      console.log(e)
      const barWidth = this.$refs.progressBar.clientWidth - progressBtnWidth
      const rect = this.$refs.progressBar.getBoundingClientRect()
      const diffX = e.pageX - rect.left
      const offsetWidth = Math.min(barWidth, Math.max(0, diffX))
      this._offset(offsetWidth)
      this._triggerPercent()
    },
    progressTouchStart(e) {
      this.touch.initiated = true
      this.touch.startX = e.touches[0].clientX
      this.touch.progressWidth = this.$refs.progress.clientWidth
    },
    progressTouchMove(e) {
      if (!this.touch.initiated) return
      const barWidth = this.$refs.progressBar.clientWidth - progressBtnWidth
      const diffX = e.touches[0].clientX - this.touch.startX
      const offsetWidth = Math.min(barWidth, Math.max(0, this.touch.progressWidth + diffX))
      this._offset(offsetWidth)
    },
    progressTouchEnd() {
      this.touch.initiated = false
      this._triggerPercent()
    },
    _triggerPercent() {
      const barWidth = this.$refs.progressBar.clientWidth - progressBtnWidth
      const percent = this.$refs.progress.clientWidth / barWidth
      this.$emit('percentChange', percent)
    },
    _offset(width) {
      this.$refs.progress.style.width = `${width}px`
      this.$refs.progressBtn.style.transform = `translate3d(${width}px, 0, 0)`
    }
  }
}
</script>

<style lang="stylus" scoped>
  @import "~common/stylus/variable"

  .progress-bar
    height: 30px
    .bar-inner
      position: relative
      top: 13px
      height: 4px
      background: rgba(0, 0, 0, 0.3)
      .progress
        position: absolute
        height: 100%
        background: $color-theme
      .progress-btn-wrapper
        position: absolute
        left: -8px
        top: -13px
        width: 30px
        height: 30px
        .progress-btn
          position: relative
          top: 7px
          left: 7px
          box-sizing: border-box
          width: 16px
          height: 16px
          border: 3px solid $color-text
          border-radius: 50%
          background: $color-theme
</style>
