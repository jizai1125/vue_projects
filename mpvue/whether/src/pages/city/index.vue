<template>
  <div>
    <h1>city</h1>
    <h1>time: {{ time }}</h1>
    <h1>{{ date }}</h1>
    <h1>{{ date_1 }}</h1>
  </div>
</template>

<script>
import utils from "@/utils";
export default {
  name: "index",
  data() {
    return {
      time: '',
      date: new Date().toTimeString(),
      date_1: new Date().toLocaleString()
    };
  },
  created() {
    this.test()
  },
  methods: {
    test() {
      let time = utils.formatTime(new Date())
      console.log('time: ', time);
      setTimeout(() => {
        this.time = time;
      }, 7000);
    }
  }
};
</script>

<style lang="css" scoped>
</style>
