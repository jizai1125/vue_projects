<template>
  <div :style="fontstyle">
    <div class="rate" @mouseout="mouseOut">
      <span
        @click="onRate(num)"
        @mouseover="mouseOver(num)"
        v-for="num in 5"
        :key="num"
        >☆</span
      >
      <span class="hollow" :style="fontwidth">
        <span
          @click="onRate(num)"
          @mouseover="mouseOver(num)"
          v-for="num in 5"
          :key="num"
          >★</span
        >
      </span>
    </div>
  </div>
</template>
<script setup>
import { ref, computed } from "vue";
let props = defineProps({
  // value: Number,
  modelValue: Number,
  theme: { type: String, default: "orange" },
});
const themeObj = {
  black: "#00",
  white: "#fff",
  red: "#f5222d",
  orange: "#fa541c",
  yellow: "#fadb14",
  green: "#73d13d",
  blue: "#40a9ff",
};
const fontstyle = computed(() => {
  return `color:${themeObj[props.theme]};`;
});
// 评分宽度
let width = ref(props.modelValue);
function mouseOver(i) {
  width.value = i;
}
function mouseOut() {
  width.value = props.modelValue;
}
const fontwidth = computed(() => `width:${width.value}em;`);
let emits = defineEmits(["update-rate", "update:modelValue"]);
function onRate(num) {
  // emits("update-rate", num);
  emits('update:modelValue', num)
}
</script>

<style scoped>
.rate {
  position: relative;
  display: inline-block;
}
.rate > span.hollow {
  position: absolute;
  display: inline-block;
  top: 0;
  left: 0;
  width: 0;
  overflow: hidden;
}
</style>
