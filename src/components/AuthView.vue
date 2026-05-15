<template>
  <section class="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#06101d] px-4 py-6 text-slate-100 sm:px-8">
    <div class="pointer-events-none absolute -left-16 -top-16 h-72 w-72 rounded-full bg-[rgba(255,125,92,0.22)] blur-3xl"></div>
    <div class="pointer-events-none absolute bottom-[6%] right-[6%] h-80 w-80 rounded-full bg-[rgba(85,221,196,0.16)] blur-3xl"></div>

    <div class="relative z-10 grid w-full max-w-6xl gap-6 lg:grid-cols-[1.1fr_0.9fr]">
      <AuthMarketingPanel />
      <AuthForm @auth-success="$emit('auth-success', $event)" />
    </div>
  </section>
</template>

<script setup>
import AuthForm from './AuthForm.vue'
import AuthMarketingPanel from './AuthMarketingPanel.vue'

defineEmits(['auth-success'])
</script>
