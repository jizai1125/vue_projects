<script setup>
import { ref } from 'vue';
import Rate from '@/components/Rate.vue'
let score = ref(3.5);
// function update(num){ score.value = num}
</script>
<template>
  Home
  <!-- <Rate :value="score" @update-rate="update"></Rate> -->
  <Rate v-model="score"></Rate>
</template>

<style scoped></style>
