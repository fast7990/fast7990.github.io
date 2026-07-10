import { ref } from 'vue'

export function useClipboard() {
  const copied = ref(false)

  const copy = async (text) => {
    try {
      await navigator.clipboard.writeText(text)
      copied.value = true
      setTimeout(() => {
        copied.value = false
      }, 2000)
      return true
    } catch (err) {
      console.error('复制失败:', err)
      return false
    }
  }

  return {
    copied,
    copy
  }
}
