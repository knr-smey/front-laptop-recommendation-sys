<template>
  <AuthView v-if="activeScreen === 'auth'" @auth-success="handleAuthSuccess" />

  <div v-else class="relative h-dvh overflow-hidden bg-[#06101d] px-4 py-4 text-slate-100 sm:px-6 sm:py-6">
    <div class="pointer-events-none absolute -left-12 -top-12 h-64 w-64 rounded-full bg-[rgba(255,125,92,0.22)] blur-3xl"></div>
    <div class="pointer-events-none absolute bottom-[8%] right-[5%] h-72 w-72 rounded-full bg-[rgba(85,221,196,0.14)] blur-3xl"></div>

    <div class="relative z-10 grid h-full grid-cols-1 gap-5 xl:grid-cols-[280px_minmax(0,1fr)_320px]">
      <Sidebar
        :messagesLength="messages.length"
        :activeFilterCount="activeFilterCount"
        :chatHistory="chatHistory"
        :activeChatId="activeChatId"
        :user="user"
        :userInitial="user.name.charAt(0).toUpperCase()"
        :menuItems="ACCOUNT_MENU"
        @account-action="handleAccountAction"
        @switch-chat="switchChat"
        @new-chat="newChat"
      />

      <ChatWindow :messages="messages" :isTyping="isTyping" ref="chatWindowRef">
        <template #input>
          <ChatInput v-model="inputText" @send="() => sendMessage()" />
        </template>
      </ChatWindow>

      <FilterPanel :options="options" :filters="filters" @set-filter="handleSetFilter" @clear-filters="clearFilters" />
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import AuthView from './components/AuthView.vue'
import Sidebar from './components/Sidebar.vue'
import ChatWindow from './components/ChatWindow.vue'
import ChatInput from './components/ChatInput.vue'
import FilterPanel from './components/FilterPanel.vue'
import { useChat } from './composables/useChat'
import { useFilters } from './composables/useFilters'
import { ACCOUNT_MENU } from './constants'

const { messages, inputText, isTyping, chatHistory, activeChatId, sendMessage, newChat, switchChat } = useChat()
const { filters, options, setFilter, clearFilters, activeFilterCount } = useFilters()

const user = ref({ name: 'Raksmey', plan: 'Pro Plan' })
const activeScreen = ref('auth')

const chatWindowRef = ref(null)

function handleSetFilter({ key, item }) {
  setFilter(key, item)

  const selections = Object.entries(filters)
    .filter(([, selected]) => selected)
    .map(([name, selected]) => `${name.charAt(0).toUpperCase() + name.slice(1)}: ${selected}`)

  const prompt = selections.length ? `Recommend a laptop with ${selections.join(', ')}.` : 'Recommend a versatile laptop for everyday use.'

  // send prompt via chat composable
  sendMessage(prompt)
}

function handleAccountAction(label) {
  // placeholder: integrate analytics, routing, auth flows
  console.log('account action', label)

  if (label === 'Log out') {
    activeScreen.value = 'auth'
  }
}

function handleAuthSuccess(payload) {
  user.value = { name: payload?.name || 'Guest', plan: payload?.plan || 'Guest' }
  activeScreen.value = 'app'
}

onMounted(() => {
  // the ChatWindow exposes a `container` ref which can be used for auto-scroll
  // the useAutoScroll composable is lightweight and watches messages; we rely on it inside components or will call scroll manually if needed
  if (chatWindowRef.value?.container) {
    // ensure initial scroll
    chatWindowRef.value.container.scrollTop = chatWindowRef.value.container.scrollHeight
  }
})
</script>
