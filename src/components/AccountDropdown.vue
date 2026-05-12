<template>
  <div ref="menuRef" class="relative mt-6 border-t border-white/10 pt-4">
    <button class="flex w-full items-center gap-3 rounded-[20px] px-2 py-2 text-left transition hover:bg-white/4" @click="toggle">
      <div class="h-10 w-10 rounded-full bg-[linear-gradient(135deg,#7ce5ce,#6366f1)] flex items-center justify-center text-sm font-bold text-slate-900">
        {{ userInitial }}
      </div>

      <div class="flex-1">
        <p class="text-sm font-semibold text-white">{{ user.name }}</p>
        <p class="text-[11px] text-slate-400">{{ user.plan }}</p>
      </div>

      <div class="flex items-center gap-3">
        <div class="h-2 w-2 rounded-full bg-green-400 shadow-[0_0_8px_rgba(34,197,94,0.7)]"></div>
        <svg class="h-4 w-4 text-slate-400 transition" :class="isOpen ? 'rotate-180' : ''" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
          <path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 0 1 1.06.02L10 11.168l3.71-3.938a.75.75 0 1 1 1.08 1.04l-4.25 4.51a.75.75 0 0 1-1.08 0l-4.25-4.51a.75.75 0 0 1 .02-1.06Z" clip-rule="evenodd" />
        </svg>
      </div>
    </button>

    <div v-if="isOpen" class="absolute bottom-full left-0 z-30 mb-3 w-[260px] rounded-[22px] border border-white/10 bg-[rgba(32,39,53,0.96)] p-4 shadow-[0_24px_50px_rgba(0,0,0,0.45)] backdrop-blur-xl">
      <div class="flex items-center gap-3 rounded-[16px] bg-white/4 px-3 py-3">
        <div class="flex h-10 w-10 items-center justify-center rounded-full bg-[linear-gradient(135deg,#34d399,#38bdf8)] text-sm font-bold text-white">
          {{ userInitial }}
        </div>
        <div class="min-w-0 flex-1">
          <p class="truncate text-sm font-semibold text-white">{{ user.name }}</p>
          <p class="text-xs text-slate-400">{{ user.plan }}</p>
        </div>
        <svg class="h-4 w-4 text-slate-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
          <path fill-rule="evenodd" d="M7.22 4.97a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L10.94 10 7.22 6.28a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd" />
        </svg>
      </div>

      <div class="my-3 h-px bg-white/10"></div>

      <button v-for="item in menuItems" :key="item.label" class="flex w-full items-center gap-3 rounded-[14px] px-3 py-2.5 text-left text-slate-100 transition hover:bg-white/6" @click="$emit('action', item.label)">
        <span class="w-5 text-center text-slate-300">{{ item.icon }}</span>
        <span class="flex-1">{{ item.label }}</span>
        <span v-if="item.hasChevron" class="text-slate-400">›</span>
      </button>

      <div class="my-3 h-px bg-white/10"></div>

      <button class="flex w-full items-center gap-3 rounded-[14px] px-3 py-2.5 text-left text-rose-200 transition hover:bg-white/6" @click="$emit('action', 'Log out')">
        <span class="w-5 text-center">↪</span>
        <span>Log out</span>
      </button>
    </div>
  </div>
</template>

<script setup>
import { toRefs } from 'vue'
import { useAccountMenu } from '../composables/useAccountMenu'

const props = defineProps({ user: Object, userInitial: String, menuItems: Array })

const { isOpen, menuRef, toggle, close } = useAccountMenu()

defineExpose({ menuRef, close })

function handleAction(label) {
  close()
  // bubble up
  emit('action', label)
}

// local emit helper
const emit = defineEmits(['action'])
</script>
