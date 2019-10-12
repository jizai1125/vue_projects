<template>
  <div id="app">
    <Test>
      <h1>this is a slot!!!!</h1>
      <hr>
      <button @click="changeComp('Comp1'), message(componentName)">1</button>
      <button @click="changeComp('Comp2'), message(componentName)">2</button>
      <h1>keep alive</h1>
      <keep-alive>
        <component :is='componentName'></component
      </keep-alive>
    </Test>
  </div>
</template>

<script>
  import {mixin} from './mixin'
import Test from '@/components/test'
import Comp1 from '@/components/comp1'
import Comp2 from '@/components/comp2'
export default {
  name: 'app',
  mixins: [ mixin ],
  components: {
    Test,
    Comp1,
    Comp2,
  },
  data() {
    return {
      componentName: ''
    }
  },
  computed: {

  },
  methods: {
    changeComp(num) {
      this.componentName = num
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
