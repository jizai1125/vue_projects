<template>
  <div class="columnList row">
    <div v-for="column in columnList" :key="column.id" class="col-4 mb-4">
      <div class="card h-100 shadow-sm">
        <div class="card-body text-center">
          <img
            :src="column.avatar"
            :alt="column.title"
            class="rounded-circle border border-light w-25 my-3"
          />
          <h5 class="card-title">{{ column.title }}</h5>
          <p class="card-text text-left">{{ column.description }}</p>
          <a href="#" class="btn btn-outline-primary">进入专栏</a>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { computed, PropType } from 'vue'
export interface ColumnProps {
  id: number
  title: string
  avatar?: string
  description: string
}
export default {
  name: 'ColumnList',
  props: {
    /**
     * 这里特别有一点，我们现在的 Array 是没有类型的，只是一个数组，我们希望它是一个 ColomnProps 的数组，
     * 那么我们是否可以使用了类型断言直接写成 ColomnProps[]，显然是不行的 ，因为 Array 是一个数组的构造函数不是类型，
     * 我们可以使用 PropType 这个方法，它接受一个泛型，将 Array 构造函数返回传入的泛型类型。
     */
    list: {
      type: Array as PropType<ColumnProps[]>,
      required: true
    }
  },
  setup (props) {
    const columnList = computed(() => {
      return props.list.map((item) => {
        if (!item.avatar) item.avatar = require('@/assets/column.jpg')
        return item
      })
    })
    return {
      columnList
    }
  }
}
</script>

<style scoped>
.columnList {
}
</style>
