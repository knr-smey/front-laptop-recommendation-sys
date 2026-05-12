import { nextTick, watch } from 'vue'

export function useAutoScroll(messagesRef, containerRef) {
  function scrollToLatest() {
    nextTick(() => {
      const container = containerRef.value
      if (!container) return
      container.scrollTo({ top: container.scrollHeight, behavior: 'smooth' })
    })
  }

  // watch messages length changes
  watch(
    () => messagesRef.value.length,
    () => {
      scrollToLatest()
    }
  )

  return { scrollToLatest }
}
