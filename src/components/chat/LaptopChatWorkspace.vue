<script setup>
import { computed, inject, reactive, ref } from 'vue'
import {
  laptopCatalog,
  preferenceGroups,
  quickActions,
  suggestionCard,
  tips,
} from '../../data/laptopAssistant'

const { isDark } = inject('theme', {
  isDark: ref(false),
})

const selectedPreferences = reactive({
  brand: 'Lenovo',
  budget: '$800-$1200',
  ram: '16GB',
  type: 'Gaming',
  screen: '15.6"',
})

const selectedPreferenceSummary = computed(() =>
  preferenceGroups.map((group) => ({
    label: group.label,
    value: selectedPreferences[group.key],
  })),
)

const rankedLaptops = computed(() =>
  [...laptopCatalog]
    .map((laptop) => {
      let score = 0
      if (laptop.brand === selectedPreferences.brand) score += 3
      if (laptop.budget === selectedPreferences.budget) score += 3
      if (laptop.ram === selectedPreferences.ram) score += 2
      if (laptop.type === selectedPreferences.type) score += 3
      if (laptop.screen === selectedPreferences.screen) score += 1

      return { ...laptop, score }
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, 3),
)

const recommendationInsight = computed(() => {
  const top = rankedLaptops.value[0]

  if (!top) {
    return 'Pick preferences to generate recommendation cards.'
  }

  return `${top.name} is the strongest match right now because it fits your ${selectedPreferences.type.toLowerCase()} use case, ${selectedPreferences.ram} memory target, and ${selectedPreferences.budget} budget range.`
})

const iconMap = {
  sparkles: {
    viewBox: '0 0 24 24',
    paths: ['M12 3.5 13.8 8.2 18.5 10 13.8 11.8 12 16.5 10.2 11.8 5.5 10 10.2 8.2Z', 'M18.5 3.5v3', 'M20 5h-3', 'M4 15.5v5', 'M6.5 18H1.5'],
  },
  paperclip: {
    viewBox: '0 0 24 24',
    paths: ['M9 12.5 14.5 7a3 3 0 1 1 4.2 4.2l-7.4 7.4a5 5 0 0 1-7.1-7.1l7.1-7.1'],
  },
  sliders: {
    viewBox: '0 0 24 24',
    paths: ['M4 6h8', 'M16 6h4', 'M10 6a2 2 0 1 0 4 0 2 2 0 0 0-4 0Z', 'M4 12h4', 'M12 12h8', 'M8 12a2 2 0 1 0 4 0 2 2 0 0 0-4 0Z', 'M4 18h10', 'M18 18h2', 'M14 18a2 2 0 1 0 4 0 2 2 0 0 0-4 0Z'],
  },
}
</script>

<template>
  <main
    :class="[
      'theme-transition no-scrollbar h-full flex-1 overflow-y-auto px-4 py-4 md:px-6 md:py-5',
      isDark
        ? 'bg-[radial-gradient(circle_at_top_left,_rgba(30,41,59,0.95),_rgba(15,23,42,0.98)_40%,_rgba(2,6,23,1)_100%)]'
        : 'bg-[radial-gradient(circle_at_top_left,_rgba(255,255,255,0.9),_rgba(241,246,252,0.95)_30%,_rgba(235,242,250,0.9)_100%)]',
    ]"
  >
    <div
      :class="[
        'theme-transition flex min-h-full w-full flex-col rounded-[32px] border shadow-[0_20px_60px_rgba(15,23,42,0.06)]',
        isDark
          ? 'border-slate-800/80 bg-[linear-gradient(180deg,rgba(15,23,42,0.96),rgba(2,6,23,0.98))]'
          : 'border-white/80 bg-[linear-gradient(180deg,rgba(255,255,255,0.92),rgba(247,250,253,0.96))]',
      ]"
    >
      <header :class="['border-b px-6 py-5 md:px-8', isDark ? 'border-slate-800/90' : 'border-slate-200/80']">
        <div class="flex items-center gap-4">
          <div class="grid h-12 w-12 place-items-center rounded-2xl bg-[linear-gradient(135deg,#1da1ff,#0f7cff)] text-white shadow-[0_16px_32px_rgba(14,116,255,0.28)]">
            <svg :viewBox="iconMap.sparkles.viewBox" class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
              <path v-for="path in iconMap.sparkles.paths" :key="path" :d="path" />
            </svg>
          </div>

          <div>
            <p class="text-sm font-semibold uppercase tracking-[0.28em] text-sky-500">Recommendation Engine</p>
            <h1 :class="['mt-1 text-2xl font-semibold tracking-[-0.04em]', isDark ? 'text-white' : 'text-slate-950']">Laptop Recommendation Workspace</h1>
          </div>
        </div>
      </header>

      <section class="grid gap-6 px-4 py-4 md:px-6 lg:grid-cols-[minmax(0,1fr)_320px]">
        <div :class="['theme-transition rounded-[28px] border', isDark ? 'border-slate-800/80 bg-slate-950/30' : 'border-slate-200/70 bg-white/80']">
          <div :class="['border-b px-5 py-4 md:px-6', isDark ? 'border-slate-800/80' : 'border-slate-200/70']">
            <div class="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p :class="['text-lg font-semibold tracking-[-0.03em]', isDark ? 'text-white' : 'text-slate-950']">Find the right laptop for each user</p>
                <p :class="['mt-1 text-sm', isDark ? 'text-slate-400' : 'text-slate-500']">See the recommendation results immediately instead of an empty chat area.</p>
              </div>

              <div :class="['flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-semibold', isDark ? 'bg-slate-900 text-slate-300' : 'bg-slate-100 text-slate-500']">
                <span class="h-2 w-2 rounded-full bg-emerald-400"></span>
                Ranking engine active
              </div>
            </div>
          </div>

          <div class="space-y-6 px-5 py-6 md:px-6">
            <div class="grid gap-3 md:grid-cols-2">
              <button
                v-for="action in quickActions"
                :key="action"
                type="button"
                :class="[
                  'rounded-2xl border px-4 py-4 text-left text-sm font-medium transition',
                  isDark
                    ? 'border-slate-800 bg-[linear-gradient(180deg,#111827,#0f172a)] text-slate-200 hover:border-sky-700 hover:text-white'
                    : 'border-slate-200 bg-[linear-gradient(180deg,#ffffff,#f8fbff)] text-slate-700 hover:border-sky-200 hover:bg-sky-50/70 hover:text-slate-950',
                ]"
              >
                {{ action }}
              </button>
            </div>

            <div :class="['theme-transition rounded-[26px] border p-5', isDark ? 'border-slate-800 bg-[linear-gradient(180deg,#0f172a,#111827)]' : 'border-slate-200/70 bg-[linear-gradient(180deg,#f8fbff,#f2f7fd)]']">
              <div class="flex flex-wrap items-start justify-between gap-4">
                <div class="max-w-xl">
                  <p class="text-xs font-semibold uppercase tracking-[0.22em] text-sky-500">Live Recommendation Summary</p>
                  <h3 :class="['mt-2 text-2xl font-semibold tracking-[-0.03em]', isDark ? 'text-white' : 'text-slate-950']">Top matches based on your current picks</h3>
                  <p :class="['mt-3 text-sm leading-7', isDark ? 'text-slate-300' : 'text-slate-600']">{{ recommendationInsight }}</p>
                </div>

                <div :class="['theme-transition rounded-2xl px-4 py-3 shadow-[0_10px_24px_rgba(15,23,42,0.05)]', isDark ? 'bg-slate-900' : 'bg-white']">
                  <p :class="['text-xs font-semibold uppercase tracking-[0.18em]', isDark ? 'text-slate-500' : 'text-slate-400']">Active profile</p>
                  <div class="mt-3 flex max-w-[260px] flex-wrap gap-2">
                    <span
                      v-for="item in selectedPreferenceSummary"
                      :key="item.label"
                      :class="[
                        'rounded-full px-3 py-2 text-xs font-semibold',
                        isDark ? 'bg-sky-500/15 text-sky-300' : 'bg-sky-50 text-sky-700',
                      ]"
                    >
                      {{ item.value }}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <div class="mb-4 flex items-center justify-between gap-3">
                <div>
                  <p class="text-xs font-semibold uppercase tracking-[0.22em] text-sky-500">Ranked Results</p>
                  <h3 :class="['mt-1 text-xl font-semibold tracking-[-0.03em]', isDark ? 'text-white' : 'text-slate-950']">Recommended laptops</h3>
                </div>

                <div :class="['rounded-full px-3 py-1.5 text-xs font-semibold', isDark ? 'bg-slate-900 text-slate-300' : 'bg-slate-100 text-slate-500']">
                  {{ rankedLaptops.length }} matches
                </div>
              </div>

              <div class="grid gap-4 xl:grid-cols-3">
                <article
                  v-for="laptop in rankedLaptops"
                  :key="laptop.id"
                  :class="[
                    'theme-transition rounded-[24px] border p-5 shadow-[0_14px_30px_rgba(15,23,42,0.04)]',
                    isDark ? 'border-slate-800 bg-slate-900/90' : 'border-slate-200 bg-white',
                  ]"
                >
                  <div class="flex items-start justify-between gap-3">
                    <div>
                      <span :class="['rounded-full px-3 py-1.5 text-xs font-semibold', isDark ? 'bg-sky-500/15 text-sky-300' : 'bg-sky-50 text-sky-700']">
                        {{ laptop.badge }}
                      </span>
                      <h4 :class="['mt-3 text-lg font-semibold tracking-[-0.03em]', isDark ? 'text-white' : 'text-slate-950']">{{ laptop.name }}</h4>
                      <p :class="['mt-1 text-sm', isDark ? 'text-slate-400' : 'text-slate-500']">{{ laptop.price }}</p>
                    </div>

                    <div :class="['rounded-2xl px-3 py-2 text-sm font-semibold', isDark ? 'bg-slate-800 text-slate-200' : 'bg-slate-100 text-slate-700']">
                      {{ laptop.score }}/12
                    </div>
                  </div>

                  <div :class="['mt-4 space-y-3 text-sm', isDark ? 'text-slate-400' : 'text-slate-600']">
                    <div class="flex items-center justify-between gap-4">
                      <span>CPU</span>
                      <span :class="['font-medium', isDark ? 'text-slate-100' : 'text-slate-900']">{{ laptop.cpu }}</span>
                    </div>
                    <div class="flex items-center justify-between gap-4">
                      <span>GPU</span>
                      <span :class="['font-medium', isDark ? 'text-slate-100' : 'text-slate-900']">{{ laptop.gpu }}</span>
                    </div>
                    <div class="flex items-center justify-between gap-4">
                      <span>Battery</span>
                      <span :class="['font-medium', isDark ? 'text-slate-100' : 'text-slate-900']">{{ laptop.battery }}</span>
                    </div>
                  </div>

                  <div class="mt-4 flex flex-wrap gap-2">
                    <span :class="['rounded-full px-3 py-1.5 text-xs font-semibold', isDark ? 'bg-slate-800 text-slate-200' : 'bg-slate-100 text-slate-700']">{{ laptop.brand }}</span>
                    <span :class="['rounded-full px-3 py-1.5 text-xs font-semibold', isDark ? 'bg-slate-800 text-slate-200' : 'bg-slate-100 text-slate-700']">{{ laptop.type }}</span>
                    <span :class="['rounded-full px-3 py-1.5 text-xs font-semibold', isDark ? 'bg-slate-800 text-slate-200' : 'bg-slate-100 text-slate-700']">{{ laptop.ram }}</span>
                    <span :class="['rounded-full px-3 py-1.5 text-xs font-semibold', isDark ? 'bg-slate-800 text-slate-200' : 'bg-slate-100 text-slate-700']">{{ laptop.screen }}</span>
                  </div>
                </article>
              </div>
            </div>

            <div :class="['theme-transition rounded-[24px] border p-5 shadow-[0_12px_24px_rgba(15,23,42,0.04)]', isDark ? 'border-slate-800 bg-slate-900/90' : 'border-slate-200 bg-white']">
              <p class="text-xs font-semibold uppercase tracking-[0.22em] text-sky-500">Recommendation note</p>
              <p :class="['mt-3 text-[15px] leading-7', isDark ? 'text-slate-300' : 'text-slate-600']">
                Gaming-focused 15.6-inch laptops with 16GB RAM are winning under your current
                budget. If you want lighter weight and longer battery life, switch `Type` to
                `Normal` or `Student`.
              </p>
            </div>

            <div :class="['theme-transition rounded-[28px] border p-3 shadow-[0_10px_24px_rgba(15,23,42,0.04)]', isDark ? 'border-slate-800 bg-slate-900/90' : 'border-slate-200 bg-white']">
              <textarea
                rows="2"
                :class="[
                  'w-full resize-none border-0 bg-transparent px-2 py-2 text-[15px] leading-7 outline-none',
                  isDark ? 'text-slate-200 placeholder:text-slate-500' : 'text-slate-700 placeholder:text-slate-400',
                ]"
                placeholder="Ask for another recommendation, like 'best Dell laptop for students under $800'..."
              ></textarea>

              <div class="mt-2 flex flex-wrap items-center justify-between gap-3">
                <div class="flex items-center gap-2">
                  <button
                    type="button"
                    :class="[
                      'grid h-11 w-11 place-items-center rounded-full border transition',
                      isDark
                        ? 'border-slate-700 text-slate-400 hover:border-sky-500 hover:text-sky-300'
                        : 'border-slate-200 text-slate-500 hover:border-sky-200 hover:text-sky-600',
                    ]"
                  >
                    <svg :viewBox="iconMap.paperclip.viewBox" class="h-4.5 w-4.5" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                      <path v-for="path in iconMap.paperclip.paths" :key="path" :d="path" />
                    </svg>
                  </button>

                  <button
                    type="button"
                    :class="[
                      'grid h-11 w-11 place-items-center rounded-full border transition',
                      isDark
                        ? 'border-slate-700 text-slate-400 hover:border-sky-500 hover:text-sky-300'
                        : 'border-slate-200 text-slate-500 hover:border-sky-200 hover:text-sky-600',
                    ]"
                  >
                    <svg :viewBox="iconMap.sliders.viewBox" class="h-4.5 w-4.5" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                      <path v-for="path in iconMap.sliders.paths" :key="path" :d="path" />
                    </svg>
                  </button>
                </div>

                <button
                  type="button"
                  :class="[
                    'rounded-full px-5 py-3 text-sm font-semibold text-white transition hover:translate-y-[-1px]',
                    isDark
                      ? 'bg-[linear-gradient(180deg,#38bdf8,#2563eb)] shadow-[0_14px_28px_rgba(37,99,235,0.25)]'
                      : 'bg-[linear-gradient(180deg,#34a8ff,#1188ff)] shadow-[0_14px_28px_rgba(17,136,255,0.25)]',
                  ]"
                >
                  Get recommendation
                </button>
              </div>
            </div>
          </div>
        </div>

        <aside class="space-y-4">
          <div :class="['theme-transition rounded-[28px] border p-5 shadow-[0_12px_28px_rgba(15,23,42,0.04)]', isDark ? 'border-slate-800 bg-slate-900/90' : 'border-slate-200/70 bg-white/85']">
            <p class="text-xs font-semibold uppercase tracking-[0.22em] text-sky-500">Workspace</p>
            <h2 :class="['mt-2 text-xl font-semibold tracking-[-0.03em]', isDark ? 'text-white' : 'text-slate-950']">Recommendation settings</h2>
            <p :class="['mt-2 text-sm leading-6', isDark ? 'text-slate-400' : 'text-slate-500']">Let users pick the laptop profile before generating recommendations.</p>

            <div class="mt-4 space-y-4">
              <div
                v-for="group in preferenceGroups"
                :key="group.key"
                :class="['theme-transition rounded-2xl px-4 py-4', isDark ? 'bg-slate-950/80' : 'bg-slate-50']"
              >
                <p :class="['text-xs font-semibold uppercase tracking-[0.18em]', isDark ? 'text-slate-500' : 'text-slate-400']">{{ group.label }}</p>

                <div class="mt-3 flex flex-wrap gap-2">
                  <button
                    v-for="option in group.options"
                    :key="option"
                    type="button"
                    @click="selectedPreferences[group.key] = option"
                    :class="[
                      'rounded-full border px-3 py-2 text-xs font-semibold transition',
                      selectedPreferences[group.key] === option
                        ? 'border-sky-500 bg-sky-500 text-white shadow-[0_10px_20px_rgba(14,116,255,0.22)]'
                        : isDark
                          ? 'border-slate-700 bg-slate-900 text-slate-300 hover:border-sky-500 hover:text-sky-300'
                          : 'border-slate-200 bg-white text-slate-600 hover:border-sky-200 hover:text-sky-600',
                    ]"
                  >
                    {{ option }}
                  </button>
                </div>
              </div>
            </div>

            <div :class="['theme-transition mt-4 rounded-2xl border border-dashed px-4 py-4', isDark ? 'border-slate-700 bg-slate-950/80' : 'border-slate-200 bg-white']">
              <p :class="['text-xs font-semibold uppercase tracking-[0.18em]', isDark ? 'text-slate-500' : 'text-slate-400']">Current picks</p>
              <div class="mt-3 flex flex-wrap gap-2">
                <span
                  v-for="item in selectedPreferenceSummary"
                  :key="item.label"
                  :class="[
                    'rounded-full px-3 py-2 text-xs font-semibold',
                    isDark ? 'bg-sky-500/15 text-sky-300' : 'bg-sky-50 text-sky-700',
                  ]"
                >
                  {{ item.label }}: {{ item.value }}
                </span>
              </div>
            </div>
          </div>
        </aside>
      </section>
    </div>
  </main>
</template>
