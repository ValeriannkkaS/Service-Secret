import { ref } from 'vue'

export const useCopyText = (text) => {
  const copied = ref()
  navigator.clipboard.writeText(text)
  copied.value = 'active'
  setTimeout(() => {
    copied.value = ''
  }, 1000)
  return copied
}
