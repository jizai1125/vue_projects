<template>
  <li class="dropdown-option" :class="{ disabled: disabled }">
    <slot />
  </li>
</template>

<script lang="ts">
import { ref } from 'vue'
export default {
  name: 'DropdownItem',
  props: {
    disabled: {
      type: Boolean,
      default: false
    }
  },
  setup (props, context) {
    return {}
  }
}
</script>

<style scoped>
.dropdown-option.disabled * {
  color: #6c757d;
  pointer-events: none;
  background-color: transparent;
}
</style>
