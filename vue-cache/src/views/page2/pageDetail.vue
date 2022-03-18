<template>
  <div class="pageDetail">
    <h1>pageDetail</h1>
    <input type="text" />
    <Button type="primary" @click="$router.push('/page2/pageList')">返回</Button>
  </div>
</template>

<script>
export default {
  name: 'pageDetail',
  data() {
    return {}
  },
  created() {},
  mounted() {},
  methods: {}
}
</script>

<style lang="less" scoped>
.page2_2 {
  height: 100%;
}
</style>
