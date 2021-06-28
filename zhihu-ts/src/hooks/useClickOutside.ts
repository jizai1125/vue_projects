import { onMounted, onUnmounted, ref, Ref } from 'vue'

/**
 * 判断点击的区域是否在元素内
 * @param ElementRef
 * @returns boolean
 */
function useClickOutside (ElementRef: Ref<null | HTMLElement>) {
  const isClickOutside = ref(false)
  const handleer = (e: MouseEvent) => {
    if (ElementRef.value) {
      if (ElementRef.value.contains(e.target as HTMLElement)) {
        isClickOutside.value = false
      } else {
        isClickOutside.value = true
      }
    }
  }
  onMounted(() => {
    document.addEventListener('click', handleer)
  })
  onUnmounted(() => {
    document.removeEventListener('click', handleer)
  })
  return isClickOutside
}

export default useClickOutside
