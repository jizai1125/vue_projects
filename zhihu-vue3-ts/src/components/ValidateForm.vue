<template>
  <form ref="formRef" class="validate-form-container">
    <slot name="default"></slot>
    <div class="submit-area" @click.prevent="submitForm">
      <slot name="submit">
        <button type="submit" class="btn btn-primary">提交</button>
      </slot>
    </div>
  </form>
</template>

<script lang="ts">
import { defineComponent, onUnmounted } from 'vue'
import mitt from 'mitt'
export const emitter = mitt()
type ValidateFunc = () => boolean

export default defineComponent({
  emits: ['form-submit'],
  setup (props, context) {
    const funcArr: ValidateFunc[] = []
    const submitForm = () => {
      const result = funcArr.map(func => func()).every(flag => flag)
      context.emit('form-submit', result)
    }
    const callback = (func: ValidateFunc) => {
      funcArr.push(func)
    }
    emitter.on('form-item-created', callback)
    onUnmounted(() => {
      emitter.off('form-item-created', callback)
    })
    return {
      submitForm
    }
  }
})
</script>
