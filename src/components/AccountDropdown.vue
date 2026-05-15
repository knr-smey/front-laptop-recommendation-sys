<template>
  <div ref="menuRef" class="relative mt-6 border-t border-white/15 pt-4 mb-4">
    <button class="flex w-full items-center gap-3 rounded-[20px] border border-white/10 bg-white/5 px-3 py-3 text-left transition duration-200 hover:bg-white/10" @click="toggle">
      <div class="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-cyan-400 to-indigo-500 text-sm font-bold text-white shadow-lg">
        {{ userInitial }}
      </div>

      <div class="min-w-0 flex-1">
        <p class="truncate text-sm font-semibold text-white">{{ user.name }}</p>
        <p class="text-[12px] text-slate-300">{{ user.plan }}</p>
      </div>

      <div class="flex items-center gap-3">
        <div class="h-2.5 w-2.5 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.8)]"></div>

        <svg class="h-4 w-4 text-slate-300 transition duration-200" :class="isOpen ? 'rotate-180' : ''" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 0 1 1.06.02L10 11.168l3.71-3.938a.75.75 0 1 1 1.08 1.04l-4.25 4.51a.75.75 0 0 1-1.08 0l-4.25-4.51a.75.75 0 0 1 .02-1.06Z" clip-rule="evenodd" />
        </svg>
      </div>
    </button>

    <div v-if="isOpen" class="absolute bottom-full left-0 z-30 mb-3 w-[260px] rounded-[24px] border border-white/15 bg-[#111827]/95 p-4 shadow-[0_24px_60px_rgba(0,0,0,0.55)] backdrop-blur-2xl">
      <div class="flex items-center gap-3 rounded-[18px] border border-white/10 bg-white/5 px-3 py-3">
        <div class="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-emerald-400 to-sky-400 text-sm font-bold text-white">
          {{ userInitial }}
        </div>

        <div class="min-w-0 flex-1">
          <p class="truncate text-sm font-semibold text-white">{{ user.name }}</p>
          <p class="text-xs text-slate-300">{{ user.plan }}</p>
        </div>
      </div>

      <div class="my-4 h-px bg-white/10"></div>

      <button v-for="item in menuItems" :key="item.label" class="flex w-full items-center gap-3 rounded-[14px] px-3 py-3 text-left text-slate-100 transition hover:bg-white/10" @click="$emit('action', item.label)">
        <span class="w-5 text-center text-slate-300">{{ item.icon }}</span>
        <span class="flex-1">{{ item.label }}</span>
        <span v-if="item.hasChevron" class="text-slate-400">›</span>
      </button>

      <div class="my-4 h-px bg-white/10"></div>

      <button class="flex w-full items-center gap-3 rounded-[14px] px-3 py-3 text-left text-rose-300 transition hover:bg-rose-500/10" @click="$emit('action', 'Log out')">
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
