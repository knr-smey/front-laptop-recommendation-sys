<template>
  <aside class="rounded-[28px] border border-white/10 bg-[linear-gradient(180deg,rgba(9,18,32,0.86),rgba(6,12,23,0.92))] p-5 shadow-[0_24px_60px_rgba(0,0,0,0.32)] backdrop-blur-xl">
    <p class="mb-4 text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-400/80">Control Deck</p>

    <div class="mb-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between xl:flex-col xl:items-stretch">
      <div>
        <p class="mb-2 text-[11px] font-bold uppercase tracking-[0.24em] text-[#7ce5ce]">Smart Filters</p>
        <h2 class="font-['Space_Grotesk'] text-2xl font-bold leading-none text-white">Build the perfect shortlist</h2>
      </div>

      <button class="rounded-[18px] border border-white/12 bg-white/3 px-4 py-2.5 font-semibold text-slate-100 transition hover:-translate-y-0.5 hover:border-[#7ce5ce]/35" @click="$emit('clear-filters')">Reset</button>
    </div>

    <div class="flex flex-col gap-4">
      <section v-for="(items, key) in options" :key="key" class="rounded-[22px] border border-white/8 bg-white/3 p-4">
        <div class="mb-4 flex items-center justify-between gap-3">
          <p class="m-0 font-semibold text-white">{{ formatLabel(key) }}</p>
          <span class="text-[11px] uppercase tracking-[0.24em] text-slate-400/80">{{ filters[key] || 'Any' }}</span>
        </div>

        <div class="flex flex-wrap gap-2.5">
          <button v-for="item in items" :key="item" @click="$emit('set-filter', { key, item })" :class="['rounded-full border px-3.5 py-2 text-sm transition hover:-translate-y-0.5 hover:border-[#7ce5ce]/35', filters[key] === item ? 'border-transparent bg-[linear-gradient(135deg,rgba(124,229,206,0.95),rgba(255,140,105,0.95))] text-slate-950 shadow-[0_12px_24px_rgba(255,140,105,0.18)]' : 'border-white/12 bg-white/4 text-slate-200']">
            {{ item }}
          </button>
        </div>
      </section>
    </div>
  </aside>
</template>

<script setup>
const props = defineProps({ options: Object, filters: Object })
const emit = defineEmits(['set-filter', 'clear-filters'])

function formatLabel(value) {
  return value.charAt(0).toUpperCase() + value.slice(1)
}
</script>
