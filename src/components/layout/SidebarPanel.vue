<script setup>
import { inject, ref } from 'vue'
import {
  sidebarHistoryGroups,
  sidebarMenuItems,
  sidebarPromo,
} from '../../data/laptopAssistant'

const { isDark, toggleTheme } = inject('theme', {
  isDark: ref(false),
  toggleTheme: () => {},
})

const iconMap = {
  chevrons: {
    viewBox: '0 0 24 24',
    paths: ['M13.5 7.5 9 12l4.5 4.5', 'M18.5 7.5 14 12l4.5 4.5'],
  },
  home: {
    viewBox: '0 0 24 24',
    paths: ['M4 10.5 12 4l8 6.5', 'M6.5 9.75v9.25h11V9.75', 'M10 19v-4.5h4V19'],
  },
  chat: {
    viewBox: '0 0 24 24',
    paths: ['M20 12a8 8 0 1 1-3.2-6.4', 'M20 4v4h-4', 'M8 20l-3 2v-4'],
  },
  tasks: {
    viewBox: '0 0 24 24',
    paths: ['M9 7h8', 'M9 12h8', 'M9 17h6', 'M5.5 7h.01', 'M5.5 12h.01', 'M5.5 17h.01'],
  },
  meetings: {
    viewBox: '0 0 24 24',
    paths: [
      'M4.5 7.5h10a1.5 1.5 0 0 1 1.5 1.5v6a1.5 1.5 0 0 1-1.5 1.5h-10A1.5 1.5 0 0 1 3 15V9a1.5 1.5 0 0 1 1.5-1.5Z',
      'M16 10.25 20 8.5v7l-4-1.75',
    ],
  },
  files: {
    viewBox: '0 0 24 24',
    paths: [
      'M8 4.5h5l4 4V19a1.5 1.5 0 0 1-1.5 1.5h-7A1.5 1.5 0 0 1 7 19V6A1.5 1.5 0 0 1 8.5 4.5Z',
      'M13 4.5V9h4.5',
      'M10 13h4',
      'M10 16h4',
    ],
  },
  shared: {
    viewBox: '0 0 24 24',
    paths: [
      'M16 6.5a2.5 2.5 0 1 0 0-.01',
      'M6 13a2.5 2.5 0 1 0 0-.01',
      'M16 19.5a2.5 2.5 0 1 0 0-.01',
      'M8.2 11.8l5.7-3.1',
      'M8.2 14.2l5.7 3.1',
    ],
  },
  ring: {
    viewBox: '0 0 24 24',
    paths: ['M12 5.25a6.75 6.75 0 1 0 6.75 6.75', 'M20.25 7.5V3.75H16.5'],
  },
  dots: {
    viewBox: '0 0 24 24',
    paths: ['M6.5 12h.01', 'M12 12h.01', 'M17.5 12h.01'],
  },
  sun: {
    viewBox: '0 0 24 24',
    paths: [
      'M12 3.75v2.5',
      'M12 17.75v2.5',
      'M4.75 12h2.5',
      'M16.75 12h2.5',
      'M6.7 6.7l1.75 1.75',
      'M15.55 15.55l1.75 1.75',
      'M17.3 6.7l-1.75 1.75',
      'M8.45 15.55 6.7 17.3',
      'M12 8.25a3.75 3.75 0 1 0 0 7.5 3.75 3.75 0 0 0 0-7.5Z',
    ],
  },
  moon: {
    viewBox: '0 0 24 24',
    paths: ['M18 14.5A6.5 6.5 0 0 1 9.5 6a7.25 7.25 0 1 0 8.5 8.5Z'],
  },
}
</script>

<template>
  <aside
    :class="[
      'theme-transition no-scrollbar flex h-full w-full shrink-0 flex-col overflow-y-auto border-r px-5 py-6 lg:w-[320px]',
      isDark
        ? 'border-slate-800/80 bg-slate-950 text-slate-100'
        : 'border-slate-200/80 bg-white text-slate-900',
    ]"
  >
    <div class="flex items-center justify-between">
      <div class="flex items-center gap-3">
        <div class="relative grid h-11 w-11 place-items-center rounded-full bg-[linear-gradient(135deg,#eec9ab,#d88f6c)] text-sm font-semibold text-white">
          LR
          <span :class="['absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 bg-emerald-400', isDark ? 'border-slate-950' : 'border-white']"></span>
        </div>

        <div>
          <p class="text-[18px] font-semibold tracking-[-0.02em]">Laptop Recommender</p>
        </div>
      </div>

      <div class="flex items-center gap-2">
        <button
          type="button"
          :class="[
            'grid h-9 w-9 place-items-center rounded-full transition',
            isDark
              ? 'bg-slate-900 text-slate-300 hover:bg-slate-800 hover:text-white'
              : 'text-slate-400 hover:bg-slate-100 hover:text-slate-700',
          ]"
          :aria-label="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
          @click="toggleTheme"
        >
          <svg v-if="isDark" :viewBox="iconMap.sun.viewBox" class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
            <path v-for="path in iconMap.sun.paths" :key="path" :d="path" />
          </svg>
          <svg v-else :viewBox="iconMap.moon.viewBox" class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
            <path v-for="path in iconMap.moon.paths" :key="path" :d="path" />
          </svg>
        </button>

        <button
          type="button"
          :class="[
            'grid h-9 w-9 place-items-center rounded-full transition',
            isDark
              ? 'text-slate-500 hover:bg-slate-900 hover:text-slate-200'
              : 'text-slate-400 hover:bg-slate-100 hover:text-slate-700',
          ]"
          aria-label="Collapse sidebar"
        >
          <svg :viewBox="iconMap.chevrons.viewBox" class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
            <path v-for="path in iconMap.chevrons.paths" :key="path" :d="path" />
          </svg>
        </button>
      </div>
    </div>

    <div
        :class="[
          'theme-transition mt-5 flex items-center justify-between rounded-2xl border px-4 py-3 text-sm',
          isDark
            ? 'border-slate-800 bg-slate-900/80 text-slate-300'
            : 'border-slate-200 bg-slate-50 text-slate-500',
      ]"
    >
      <span>{{ isDark ? 'Dark mode enabled' : 'Light mode enabled' }}</span>
      <span :class="['rounded-full px-2.5 py-1 text-xs font-semibold', isDark ? 'bg-slate-800 text-sky-300' : 'bg-white text-sky-600']">
        {{ isDark ? 'Night' : 'Day' }}
      </span>
    </div>

    <nav class="mt-8 space-y-1.5">
      <button
        v-for="item in sidebarMenuItems"
        :key="item.label"
        type="button"
        :class="[
          'flex w-full items-center justify-between rounded-2xl px-4 py-3 text-left text-[15px] font-medium transition',
          item.active
            ? isDark
              ? 'bg-slate-900 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]'
              : 'bg-[#f4f5f7] text-slate-950 shadow-[inset_0_1px_0_rgba(255,255,255,0.9)]'
            : isDark
              ? 'text-slate-400 hover:bg-slate-900/80 hover:text-slate-100'
              : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900',
        ]"
      >
        <span>{{ item.label }}</span>

        <svg :viewBox="iconMap[item.icon].viewBox" class="h-4.5 w-4.5" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
          <path v-for="path in iconMap[item.icon].paths" :key="path" :d="path" />
        </svg>
      </button>
    </nav>

    <div :class="['mt-7 border-t pt-6', isDark ? 'border-slate-800' : 'border-slate-200']">
      <div v-for="group in sidebarHistoryGroups" :key="group.title" class="mb-6 last:mb-0">
        <p :class="['mb-3 text-sm font-medium', isDark ? 'text-slate-500' : 'text-slate-400']">{{ group.title }}</p>

        <div class="space-y-3">
          <button
            v-for="item in group.items"
            :key="item"
            type="button"
            :class="[
              'block text-left text-[15px] font-medium leading-6 tracking-[-0.02em] transition',
              isDark ? 'text-slate-200 hover:text-sky-300' : 'text-slate-900 hover:text-sky-600',
            ]"
          >
            {{ item }}
          </button>
        </div>
      </div>
    </div>

    <div class="mt-auto space-y-5 pt-6">
      <div
        :class="[
          'theme-transition rounded-[24px] px-4 py-4',
          isDark
            ? 'bg-[linear-gradient(180deg,#111827_0%,#0f172a_100%)] shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]'
            : 'bg-[linear-gradient(180deg,#f7f8fa_0%,#f1f3f6_100%)] shadow-[inset_0_1px_0_rgba(255,255,255,0.8)]',
        ]"
      >
        <div :class="['flex items-center gap-2 text-[15px] font-semibold', isDark ? 'text-slate-100' : 'text-slate-900']">
          <span :class="['grid h-5 w-5 place-items-center rounded-full border', isDark ? 'border-slate-700 text-slate-400' : 'border-slate-300 text-slate-400']">
            <svg :viewBox="iconMap.ring.viewBox" class="h-3.5 w-3.5" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
              <path v-for="path in iconMap.ring.paths" :key="path" :d="path" />
            </svg>
          </span>
          {{ sidebarPromo.title }}
        </div>

        <p :class="['mt-1 text-sm', isDark ? 'text-slate-400' : 'text-slate-500']">{{ sidebarPromo.description }}</p>

        <button
          type="button"
          :class="[
            'mt-4 w-full rounded-full px-4 py-3 text-sm font-semibold text-white transition hover:translate-y-[-1px]',
            isDark
              ? 'bg-[linear-gradient(180deg,#38bdf8_0%,#2563eb_100%)] shadow-[0_12px_24px_rgba(37,99,235,0.28)]'
              : 'bg-[linear-gradient(180deg,#59b4ff_0%,#349cff_100%)] shadow-[0_12px_24px_rgba(52,156,255,0.28)]',
          ]"
        >
          {{ sidebarPromo.buttonLabel }}
        </button>
      </div>

      <button
        type="button"
        :class="[
          'flex w-full items-center justify-between rounded-2xl px-1 py-2 text-[15px] font-medium transition',
          isDark ? 'text-slate-400 hover:text-slate-100' : 'text-slate-700 hover:text-slate-950',
        ]"
      >
        <span>Settings</span>

        <svg :class="['h-4.5 w-4.5', isDark ? 'text-slate-500' : 'text-slate-400']" :viewBox="iconMap.dots.viewBox" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <path v-for="path in iconMap.dots.paths" :key="path" :d="path" />
        </svg>
      </button>
    </div>
  </aside>
</template>
