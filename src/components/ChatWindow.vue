<template>
  <main class="flex h-full min-h-0 flex-col overflow-hidden rounded-[34px] border border-white/10 bg-[linear-gradient(180deg,rgba(9,18,32,0.86),rgba(6,12,23,0.92))] shadow-[0_24px_60px_rgba(0,0,0,0.32)] backdrop-blur-xl">
    <div class="flex flex-col gap-4 border-b border-white/8 bg-[linear-gradient(180deg,rgba(255,255,255,0.04),transparent)] px-5 py-6 sm:px-7 lg:flex-row lg:items-start lg:justify-between">
      <div>
        <p class="mb-2 text-[11px] font-bold uppercase tracking-[0.24em] text-[#7ce5ce]">Personalized Search</p>
        <h2 class="font-['Space_Grotesk'] text-2xl font-bold leading-none text-white">Tell me what kind of laptop you want</h2>
      </div>

      <div class="inline-flex items-center gap-3 self-start rounded-full border border-white/10 bg-white/4 px-4 py-2 text-sm text-slate-200">
        <span :class="['h-2.5 w-2.5 rounded-full shadow-[0_0_0_0_rgba(124,229,206,0.65)]', isTyping ? 'animate-status-pulse bg-[#7ce5ce]' : 'bg-emerald-300']"></span>
        <span>{{ isTyping ? 'Thinking' : 'Ready' }}</span>
      </div>
    </div>

    <div ref="container" class="min-h-0 flex-1 overflow-y-auto px-5 py-7 sm:px-7">
      <EmptyState v-if="!messages.length" />

      <ChatMessage v-for="msg in messages" :key="msg.id" :message="msg" />

      <div v-if="isTyping" class="mt-6 inline-flex items-center gap-3 rounded-[18px] border border-white/8 bg-white/4 px-4 py-3">
        <span class="text-[11px] uppercase tracking-[0.24em] text-slate-400/80">AI Curator is typing</span>
        <div class="flex gap-1.5">
          <span class="h-2 w-2 rounded-full bg-[#7ce5ce] animate-bounce [animation-delay:0ms]"></span>
          <span class="h-2 w-2 rounded-full bg-[#7ce5ce] animate-bounce [animation-delay:150ms]"></span>
          <span class="h-2 w-2 rounded-full bg-[#7ce5ce] animate-bounce [animation-delay:300ms]"></span>
        </div>
      </div>
    </div>

    <slot name="input" />
  </main>
</template>

<script setup>
import { ref, watch } from 'vue'
import ChatMessage from './ChatMessage.vue'
import EmptyState from './EmptyState.vue'

const { messages, isTyping } = defineProps({ messages: Array, isTyping: Boolean })

const container = ref(null)

// expose container so parent can use it with useAutoScroll
defineExpose({ container })
</script>
