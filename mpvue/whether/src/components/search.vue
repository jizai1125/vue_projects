<template>
    <div class="search">
      <i></i>
      <input type="text" @focus="search">
    </div>
</template>

<script>
  export default {
    name: 'search',
    data () {
      return {

      }
    },
    methods: {
      search () {
        var url = '../city/main'
        console.log('go to page city!')
        wx.navigateTo({url})
      }
    }
  }
</script>

<style scoped>
  .search {
    width: 100%;
    height: 50px;
  }
  input {
    border-bottom: 1px solid;
    width: 50%;
    height: 40px;
    margin: 0 auto;
  }
</style>
