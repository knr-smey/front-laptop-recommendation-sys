import { ref, onBeforeUnmount, onMounted } from 'vue'

export function useAccountMenu() {
  const isOpen = ref(false)
  const menuRef = ref(null)

  function toggle() {
    isOpen.value = !isOpen.value
  }

  function close() {
    isOpen.value = false
  }

  function handleWindowClick(e) {
    if (!menuRef.value?.contains(e.target)) close()
  }

  onMounted(() => window.addEventListener('click', handleWindowClick))
  onBeforeUnmount(() => window.removeEventListener('click', handleWindowClick))

  return { isOpen, menuRef, toggle, close }
}
