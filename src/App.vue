<script setup>
import { provide, ref, watch } from 'vue'
import SideBar from './components/SideBar.vue'
import Main from './components/Main.vue'

const THEME_STORAGE_KEY = 'laptop-recommender-theme'

const getInitialTheme = () => {
  if (typeof window === 'undefined') {
    return false
  }

  const savedTheme = window.localStorage.getItem(THEME_STORAGE_KEY)
  if (savedTheme === 'dark') return true
  if (savedTheme === 'light') return false

  return window.matchMedia('(prefers-color-scheme: dark)').matches
}

const isDark = ref(getInitialTheme())

const applyTheme = (value) => {
  if (typeof document === 'undefined') {
    return
  }

  document.documentElement.classList.toggle('dark', value)
}

const toggleTheme = () => {
  isDark.value = !isDark.value
}

watch(
  isDark,
  (value) => {
    applyTheme(value)

    if (typeof window !== 'undefined') {
      window.localStorage.setItem(THEME_STORAGE_KEY, value ? 'dark' : 'light')
    }
  },
  { immediate: true },
)

provide('theme', { isDark, toggleTheme })
</script>

<template>
  <div
    :class="[
      'theme-transition h-screen w-screen overflow-hidden',
      isDark ? 'bg-slate-950 text-slate-100' : 'bg-[#f3f6fb] text-slate-900',
    ]"
  >
    <div class="flex h-full w-full flex-col lg:flex-row">
      <SideBar />
      <Main />
    </div>
  </div>
</template>
