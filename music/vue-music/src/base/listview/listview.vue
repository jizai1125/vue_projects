<template>
  <Scroll
    ref="listView"
    class="listView"
    :data="data"
    :listen-scroll="listenScroll"
    :probe-type="probeType"
    @scroll="scroll"
  >
    <!-- 歌手列表 -->
    <ul>
      <li ref="listGroup" class="list-group">
        <!-- <h2 class="list-group-title">{{ group.tag }}</h2> -->
        <ul>
          <li v-for="(item, idx) in data" :key="idx" class="list-group-item" @click="selectItem(item)">
            <img v-lazy="'http://localhost:3000' + item.pic" class="avatar">
            <span class="name">{{ item.name }}</span>
          </li>
        </ul>
      </li>
    </ul>
    <!-- 侧边tag栏 -->
    <!-- <ul class="tags" @touchstart="onTagTouchStart" @touchmove.stop.prevent="onTagTouchMove">
      <li
        v-for="(item, i) in tags"
        :key="item.id"
        :data-index="i"
        class="tags-item"
        :class="{'active': currentIndex === i}"
      >
        {{ item.name }}
      </li>
    </ul> -->
    <!-- 固定标题 -->
    <!-- <h1 v-show="fixedTitle" ref="fixedTitle" class="fixed-title">
      {{ fixedTitle }}
    </h1> -->
    <!-- loading -->
    <div class="loading-container">
      <Loading v-show="!data.length" />
    </div>
  </Scroll>
</template>
<script>
import Scroll from 'base/scroll/scroll'
import Loading from 'base/loading/loading'

// const TAG_ITEM_HEIGHT = 18
// const FIXED_TITLE_HEIGHT = 30
export default {
  components: { Scroll, Loading },
  props: {
    data: {
      type: Array,
      default: () => []
    },
    tags: {
      type: Array,
      default: null
    }
  },
  data() {
    return {
      currentIndex: 0,
      scrollY: 0
    }
  },
  computed: {
    // fixedTitle() {
    //   if (this.scrollY >= 0) return ''
    //   return this.tags && this.tags[this.currentIndex].name
    // }
  },
  watch: {
    // data() {
    //   setTimeout(() => {
    //     this._calculateHeight()
    //   }, 20)
    // },
    // scrollY(newValue) {
    //   // console.log(newValue)
    //   const newY = Math.abs(newValue)
    //   // 判断在哪个区间
    //   // const listHeight = this.listHeight
    //   // const len = listHeight.length
    //   // for (let i = 0; i < len; i++) {
    //   //   const height1 = listHeight[i]
    //   //   const height2 = listHeight[i + 1]
    //   //   console.log(height1, height2)
    //   //   if (newY > height1 && newY < height2) {
    //   //     this.currentIndex = i
    //   //     return
    //   //   }
    //   // }
    //   const diffY = this.listHeight[this.currentIndex + 1] - newY
    //   const top = (diffY >= 0 && diffY <= FIXED_TITLE_HEIGHT) ? FIXED_TITLE_HEIGHT - diffY : 0
    //   this.$refs.fixedTitle.style.transform = `translate3d(0, -${top}px, 0)`

    //   const index = this.listHeight.findIndex(item => item > newY)
    //   if (index < 0) return
    //   this.currentIndex = index - 1
    // }
  },
  created() {
    this.touch = {
      index: 0,
      prePageY: 0,
      currPageY: 0
    }
    this.listenScroll = true
    this.probeType = 3
    this.listHeight = []
  },
  methods: {
    selectItem(item) {
      this.$emit('select', item)
    },
    // onTagTouchStart(e) {
    //   let index = e.target.dataset.index
    //   if (!index) return
    //   this.touch.prePageY = e.touches[0].pageY
    //   index = parseInt(index)
    //   this.currentIndex = index
    //   this.touch.index = index
    //   this._scrollTo(index)
    // },
    // onTagTouchMove(e) {
    //   this.touch.currPageY = e.touches[0].pageY
    //   const diff = ((this.touch.currPageY - this.touch.prePageY) / TAG_ITEM_HEIGHT) | 0
    //   const index = diff + this.touch.index
    //   if (index < 0 || index > this.tags.length - 1) return
    //   this.currentIndex = index
    //   this._scrollTo(index)
    // },
    refresh() {
      this.$refs.listView.refresh()
    },
    scroll(pos) {
      this.scrollY = pos.y
    },
    _scrollTo(index) {
      this.$refs.listView.scrollToElement(this.$refs.listGroup[index], 0)
    },
    // _calculateHeight() {
    //   this.listHeight = []
    //   let height = 0
    //   this.listHeight.push(height)
    //   const list = this.$refs.listGroup
    //   for (let i = 0; i < list.length; i++) {
    //     height += list[i].offsetHeight
    //     this.listHeight.push(height)
    //   }
    //   console.log(this.listHeight)
    // }
  }
}
</script>
<style lang="stylus" scoped>
@import '~common/stylus/variable';

.listView {
  position: absolute;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: $color-background;

  .list-group {
    padding-bottom: 30px;

    .list-group-title {
      height: 30px;
      line-height: 30px;
      padding-left: 20px;
      color: $color-text-l;
      font-size: $font-size-medium;
      background-color: $color-highlight-background;
    }

    .list-group-item {
      display: flex;
      align-items: center;
      padding: 20px 0 0 30px;

      .avatar {
        width: 50px;
        height: 50px;
        border-radius: 50%;
      }

      .name {
        margin-left: 20px;
        color: $color-text-l;
        font-size: $font-size-medium;
      }
    }
  }

  .tags {
    position: absolute;
    top: 50%;
    right: 0;
    z-index: 99;
    transform: translateY(-50%);
    border-radius: 20px;
    padding: 20px 0
    text-align: center;
    font-size: $font-size-small;
    color: $color-text-l;
    background-color: $color-background-d;

    .tags-item {
      position: relative;
      height: 18px;
      line-height: 18px;
    }
    .tags-item.active {
      color: $color-theme;
    }
  }
  .fixed-title {
    position: absolute;
    top: 0;
    width: 100%;
    height: 30px
    line-height: 30px
    padding-left: 20px
    font-size: $font-size-medium
    color: $color-text-l
    background: $color-highlight-background
  }
}

.loading-container {
  position: absolute;
  width: 100%;
  top: 50%;
  transform: translateY(-50%);
}
</style>
