<template>
  <div class="globalHeader"></div>
</template>

<script lang="ts">
import { PropType } from 'vue'
interface UserProps {
  isLogin: boolean
  name?: string
  id?: number
}
export default {
  name: 'GlobalHeader',
  props: {
    user: {
      type: Object as PropType<UserProps>,
      required: true
    }
  },
  setup () {
    return {}
  }
}
</script>

<style scoped>
.globalHeader {
}
</style>
