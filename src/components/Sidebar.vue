<template>
  <aside class="flex flex-col h-full rounded-[28px] border border-white/10 bg-[linear-gradient(180deg,rgba(9,18,32,0.86),rgba(6,12,23,0.92))] p-5 shadow-[0_24px_60px_rgba(0,0,0,0.32)] backdrop-blur-xl">
    <div class="flex-1">
      <p class="mb-4 text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-400/80">Laptop Recommender</p>

      <div class="mt-6 grid grid-cols-2 gap-3">
        <div class="rounded-[20px] border border-white/8 bg-white/4 p-4">
          <span class="block font-['Space_Grotesk'] text-3xl font-bold text-white">{{ messagesLength }}</span>
          <span class="mt-1 block text-[11px] uppercase tracking-[0.24em] text-slate-400/80">Messages</span>
        </div>

        <div class="rounded-[20px] border border-white/8 bg-white/4 p-4">
          <span class="block font-['Space_Grotesk'] text-3xl font-bold text-white">{{ activeFilterCount }}</span>
          <span class="mt-1 block text-[11px] uppercase tracking-[0.24em] text-slate-400/80">Filters</span>
        </div>
      </div>

      <div class="mt-7">
        <p class="mb-3 text-[11px] uppercase tracking-[0.24em] text-slate-400/80">Recent Chats</p>

        <button v-for="chat in chatHistory" :key="chat.id" class="mt-2 flex w-full items-center gap-3 rounded-[18px] border border-white/8 bg-white/3 px-4 py-3 text-left text-slate-100 transition hover:-translate-y-0.5 hover:border-[#7ce5ce]/35" @click="$emit('switch-chat', chat.id)">
          <span class="h-2.5 w-2.5 rounded-full bg-[linear-gradient(135deg,#7ce5ce,#ff8c69)] shadow-[0_0_14px_rgba(124,229,206,0.55)]"></span>
          <span>{{ chat.title }}</span>
        </button>
      </div>
    </div>

    <AccountDropdown :user="user" :userInitial="userInitial" :menuItems="menuItems" @action="$emit('account-action', $event)" />
  </aside>
</template>

<script setup>
import AccountDropdown from './AccountDropdown.vue'

const props = defineProps({
  messagesLength: { type: Number, required: true },
  activeFilterCount: { type: Number, required: true },
  chatHistory: { type: Array, required: true },
  user: { type: Object, required: true },
  userInitial: { type: String, required: true },
  menuItems: { type: Array, required: true }
})
</script>
