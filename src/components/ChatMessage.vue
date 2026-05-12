<template>
  <div :class="['mt-6 flex flex-col gap-2', message.role === 'user' ? 'items-end' : 'items-start']">
    <div class="text-[11px] uppercase tracking-[0.24em] text-slate-400/80">{{ message.role === 'user' ? 'You' : 'AI Curator' }}</div>

    <div :class="['max-w-full rounded-[22px] px-4 py-4 text-sm leading-7 sm:max-w-[78%] sm:px-5', message.role === 'user' ? userClasses : assistantClasses]">
      {{ message.content }}
    </div>
  </div>
</template>

<script setup>
const props = defineProps({ message: Object })

const userClasses = 'rounded-br-[8px] bg-[linear-gradient(135deg,#f6fbff,#7ce5ce)] text-slate-950 shadow-[0_18px_40px_rgba(124,229,206,0.12)]'
const assistantClasses = 'rounded-bl-[8px] border border-white/8 bg-white/5 text-slate-100'
</script>
