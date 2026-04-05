<script setup>
import { computed, reactive } from 'vue'
import {
  messages,
  preferenceGroups,
  quickActions,
  suggestionCard,
  tips,
} from '../../data/laptopAssistant'

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

const iconMap = {
  sparkles: {
    viewBox: '0 0 24 24',
    paths: ['M12 3.5 13.8 8.2 18.5 10 13.8 11.8 12 16.5 10.2 11.8 5.5 10 10.2 8.2Z', 'M18.5 3.5v3', 'M20 5h-3', 'M4 15.5v5', 'M6.5 18H1.5'],
  },
  send: {
    viewBox: '0 0 24 24',
    paths: ['m4 12 15-7-3 7 3 7-15-7Z', 'M16 12H8'],
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
    class="no-scrollbar h-full flex-1 overflow-y-auto bg-[radial-gradient(circle_at_top_left,_rgba(255,255,255,0.9),_rgba(241,246,252,0.95)_30%,_rgba(235,242,250,0.9)_100%)] px-4 py-4 md:px-6 md:py-5"
  >
    <div
      class="flex min-h-full w-full flex-col rounded-[32px] border border-white/80 bg-[linear-gradient(180deg,rgba(255,255,255,0.92),rgba(247,250,253,0.96))] shadow-[0_20px_60px_rgba(15,23,42,0.06)]"
    >
      <header class="border-b border-slate-200/80 px-6 py-5 md:px-8">
        <div class="flex items-center gap-4">
          <div
            class="grid h-12 w-12 place-items-center rounded-2xl bg-[linear-gradient(135deg,#1da1ff,#0f7cff)] text-white shadow-[0_16px_32px_rgba(14,116,255,0.28)]"
          >
            <svg
              :viewBox="iconMap.sparkles.viewBox"
              class="h-5 w-5"
              fill="none"
              stroke="currentColor"
              stroke-width="1.8"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path v-for="path in iconMap.sparkles.paths" :key="path" :d="path" />
            </svg>
          </div>

          <div>
            <p class="text-sm font-semibold uppercase tracking-[0.28em] text-sky-500">Recommendation Engine</p>
            <h1 class="mt-1 text-2xl font-semibold tracking-[-0.04em] text-slate-950">
              Laptop Recommendation Chat
            </h1>
          </div>
        </div>
      </header>

      <section class="grid flex-1 gap-6 px-4 py-4 md:px-6 lg:grid-cols-[minmax(0,1fr)_320px]">
        <div class="flex min-h-0 flex-col rounded-[28px] border border-slate-200/70 bg-white/80">
          <div class="border-b border-slate-200/70 px-5 py-4 md:px-6">
            <div class="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p class="text-lg font-semibold tracking-[-0.03em] text-slate-950">
                  Find the right laptop for each user
                </p>
                <p class="mt-1 text-sm text-slate-500">
                  Rank models by budget, use case, specs, and buying priorities.
                </p>
              </div>

              <div class="flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-500">
                <span class="h-2 w-2 rounded-full bg-emerald-400"></span>
                Recommendation model active
              </div>
            </div>
          </div>

          <div class="no-scrollbar flex-1 space-y-6 overflow-y-auto px-5 py-6 md:px-6">
            <div class="grid gap-3 md:grid-cols-2">
              <button
                v-for="action in quickActions"
                :key="action"
                type="button"
                class="rounded-2xl border border-slate-200 bg-[linear-gradient(180deg,#ffffff,#f8fbff)] px-4 py-4 text-left text-sm font-medium text-slate-700 transition hover:border-sky-200 hover:bg-sky-50/70 hover:text-slate-950"
              >
                {{ action }}
              </button>
            </div>

            <article
              v-for="message in messages"
              :key="`${message.author}-${message.time}`"
              :class="[
                'flex gap-4',
                message.role === 'user' ? 'justify-end' : 'justify-start',
              ]"
            >
              <template v-if="message.role === 'assistant'">
                <div
                  class="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-[linear-gradient(135deg,#1da1ff,#0f7cff)] text-sm font-semibold text-white shadow-[0_10px_24px_rgba(14,116,255,0.22)]"
                >
                  AI
                </div>
              </template>

              <div
                :class="[
                  'max-w-[760px] rounded-[24px] px-5 py-4 shadow-[0_12px_28px_rgba(15,23,42,0.04)]',
                  message.role === 'user'
                    ? 'bg-[linear-gradient(180deg,#1797ff,#0e82ff)] text-white'
                    : 'border border-slate-200/70 bg-white text-slate-800',
                ]"
              >
                <div class="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em]">
                  <span :class="message.role === 'user' ? 'text-blue-100' : 'text-sky-500'">
                    {{ message.author }}
                  </span>
                  <span :class="message.role === 'user' ? 'text-blue-100/70' : 'text-slate-400'">
                    {{ message.time }}
                  </span>
                </div>

                <p
                  :class="[
                    'mt-3 text-[15px] leading-7',
                    message.role === 'user' ? 'text-white' : 'text-slate-600',
                  ]"
                >
                  {{ message.text }}
                </p>

                <div v-if="message.chips" class="mt-4 flex flex-wrap gap-2">
                  <span
                    v-for="chip in message.chips"
                    :key="chip"
                    class="rounded-full bg-sky-50 px-3 py-1.5 text-xs font-semibold text-sky-600"
                  >
                    {{ chip }}
                  </span>
                </div>
              </div>

              <template v-if="message.role === 'user'">
                <div
                  class="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-[linear-gradient(135deg,#ffd6b0,#efa06a)] text-sm font-semibold text-white"
                >
                  You
                </div>
              </template>
            </article>
          </div>

          <div class="border-t border-slate-200/70 px-5 py-4 md:px-6">
            <div class="rounded-[28px] border border-slate-200 bg-white p-3 shadow-[0_10px_24px_rgba(15,23,42,0.04)]">
              <textarea
                rows="3"
                class="w-full resize-none border-0 bg-transparent px-2 py-2 text-[15px] leading-7 text-slate-700 outline-none placeholder:text-slate-400"
                placeholder="Ask for a laptop recommendation by budget, purpose, or specific specs..."
              ></textarea>

              <div class="mt-2 flex flex-wrap items-center justify-between gap-3">
                <div class="flex items-center gap-2">
                  <button
                    type="button"
                    class="grid h-11 w-11 place-items-center rounded-full border border-slate-200 text-slate-500 transition hover:border-sky-200 hover:text-sky-600"
                  >
                    <svg
                      :viewBox="iconMap.paperclip.viewBox"
                      class="h-4.5 w-4.5"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="1.8"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <path v-for="path in iconMap.paperclip.paths" :key="path" :d="path" />
                    </svg>
                  </button>

                  <button
                    type="button"
                    class="grid h-11 w-11 place-items-center rounded-full border border-slate-200 text-slate-500 transition hover:border-sky-200 hover:text-sky-600"
                  >
                    <svg
                      :viewBox="iconMap.sliders.viewBox"
                      class="h-4.5 w-4.5"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="1.8"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <path v-for="path in iconMap.sliders.paths" :key="path" :d="path" />
                    </svg>
                  </button>
                </div>

                <button
                  type="button"
                  class="flex items-center gap-2 rounded-full bg-[linear-gradient(180deg,#34a8ff,#1188ff)] px-5 py-3 text-sm font-semibold text-white shadow-[0_14px_28px_rgba(17,136,255,0.25)] transition hover:translate-y-[-1px]"
                >
                  Get recommendation
                  
                </button>
              </div>
            </div>
          </div>
        </div>

        <aside class="space-y-4">
          <div class="rounded-[28px] border border-slate-200/70 bg-white/85 p-5 shadow-[0_12px_28px_rgba(15,23,42,0.04)]">
            <p class="text-xs font-semibold uppercase tracking-[0.22em] text-sky-500">Workspace</p>
            <h2 class="mt-2 text-xl font-semibold tracking-[-0.03em] text-slate-950">
              Recommendation settings
            </h2>
            <p class="mt-2 text-sm leading-6 text-slate-500">
              Let users pick the laptop profile before generating recommendations.
            </p>

            <div class="mt-4 space-y-4">
              <div
                v-for="group in preferenceGroups"
                :key="group.key"
                class="rounded-2xl bg-slate-50 px-4 py-4"
              >
                <p class="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                  {{ group.label }}
                </p>

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
                        : 'border-slate-200 bg-white text-slate-600 hover:border-sky-200 hover:text-sky-600',
                    ]"
                  >
                    {{ option }}
                  </button>
                </div>
              </div>
            </div>

            <div class="mt-4 rounded-2xl border border-dashed border-slate-200 bg-white px-4 py-4">
              <p class="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                Current picks
              </p>
              <div class="mt-3 flex flex-wrap gap-2">
                <span
                  v-for="item in selectedPreferenceSummary"
                  :key="item.label"
                  class="rounded-full bg-sky-50 px-3 py-2 text-xs font-semibold text-sky-700"
                >
                  {{ item.label }}: {{ item.value }}
                </span>
              </div>
            </div>
          </div>

          <div class="rounded-[28px] border border-slate-200/70 bg-[linear-gradient(180deg,#0f172a,#162845)] p-5 text-white shadow-[0_16px_40px_rgba(15,23,42,0.18)]">
            <p class="text-xs font-semibold uppercase tracking-[0.22em] text-sky-300">{{ suggestionCard.eyebrow }}</p>
            <h2 class="mt-2 text-xl font-semibold tracking-[-0.03em]">
              {{ suggestionCard.title }}
            </h2>
            <p class="mt-3 text-sm leading-7 text-slate-300">
              {{ suggestionCard.description }}
            </p>
            <button
              type="button"
              class="mt-5 w-full rounded-full bg-white px-4 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-100"
            >
              {{ suggestionCard.buttonLabel }}
            </button>
          </div>

          <div class="rounded-[28px] border border-slate-200/70 bg-white/85 p-5 shadow-[0_12px_28px_rgba(15,23,42,0.04)]">
            <p class="text-xs font-semibold uppercase tracking-[0.22em] text-sky-500">Tips</p>
            <ul class="mt-3 space-y-3 text-sm leading-7 text-slate-600">
              <li v-for="tip in tips" :key="tip">{{ tip }}</li>
            </ul>
          </div>
        </aside>
      </section>
    </div>
  </main>
</template>
