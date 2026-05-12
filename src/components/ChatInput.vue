<template>
  <div class="border-t border-white/8 bg-[linear-gradient(180deg,transparent,rgba(255,255,255,0.02))] px-5 pb-8 pt-4 sm:px-6">
    <div class="flex w-full items-center gap-3 rounded-[26px] border border-white/10 bg-[linear-gradient(180deg,rgba(12,20,35,0.96),rgba(8,14,26,0.98))] px-3 py-3 shadow-[0_18px_40px_rgba(0,0,0,0.28)] ring-1 ring-white/5 backdrop-blur-xl">
      <div class="flex min-w-0 flex-1 items-center gap-3 rounded-[20px] border border-white/6 bg-black/20 px-4 py-1.5">
        <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-white/6 text-lg text-[#7ce5ce]">✦</div>

        <input :value="modelValue" @input="$emit('update:modelValue', $event.target.value)" @keyup.enter="onSend" :placeholder="placeholder" class="min-w-0 flex-1 bg-transparent py-3 text-[15px] text-slate-50 outline-none placeholder:text-slate-400/60" />
      </div>

      <button @click="onSend" class="inline-flex h-12 shrink-0 items-center justify-center rounded-[18px] bg-[linear-gradient(135deg,#ff8c69,#ffd166)] px-5 font-bold text-slate-900 transition hover:-translate-y-0.5 hover:shadow-[0_14px_28px_rgba(255,140,105,0.22)]">Send</button>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({ modelValue: String, placeholder: { type: String, default: 'Describe your ideal laptop...' } })
const emit = defineEmits(['update:modelValue', 'send'])

function onSend() {
  emit('send')
}
</script>
