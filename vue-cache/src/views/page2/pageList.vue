<template>
  <div class="pageList">
    <h1>pageList</h1>
    <input type="text" />
    <Table :columns="columns1" :data="data1" @on-row-click="handleRowClick"></Table>
    <div style="text-align:right; margin-top: 10px">
      <Page :total="100" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'pageList',
  data() {
    return {
      columns1: [
        {
          title: 'Name',
          key: 'name'
        },
        {
          title: 'Age',
          key: 'age'
        },
        {
          title: 'Address',
          key: 'address'
        }
      ],
      data1: [
        {
          name: 'John Brown',
          age: 18,
          address: 'New York No. 1 Lake Park',
          date: '2016-10-03'
        },
        {
          name: 'Jim Green',
          age: 24,
          address: 'London No. 1 Lake Park',
          date: '2016-10-01'
        },
        {
          name: 'Joe Black',
          age: 30,
          address: 'Sydney No. 1 Lake Park',
          date: '2016-10-02'
        },
        {
          name: 'Jon Snow',
          age: 26,
          address: 'Ottawa No. 2 Lake Park',
          date: '2016-10-04'
        }
      ]
    }
  },
  created() {},
  mounted() {},
  activated() {
    this.$Message.success("成功获取数据！")
  },
  beforeRouteLeave(to, from, next) {
    // if (to.name != 'page2_2') {
    //   this.$store.commit('DEL_CACHE_VIEW', from.name)
    // }
    next()
  },
  methods: {
    handleRowClick(row) {
      console.log(row)
      this.$router.push('/page2/pageDetail')
    }
  }
}
</script>

<style lang="less" scoped>
.pageList {
  height: 100%;
}
</style>
