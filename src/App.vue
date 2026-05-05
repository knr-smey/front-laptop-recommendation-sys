<template>
  <div class="relative h-dvh overflow-hidden bg-[#06101d] px-4 py-4 text-slate-100 sm:px-6 sm:py-6">
    <div class="pointer-events-none absolute -left-12 -top-12 h-64 w-64 rounded-full bg-[rgba(255,125,92,0.22)] blur-3xl"></div>
    <div class="pointer-events-none absolute bottom-[8%] right-[5%] h-72 w-72 rounded-full bg-[rgba(85,221,196,0.14)] blur-3xl"></div>

    <div class="relative z-10 grid h-full grid-cols-1 gap-5 xl:grid-cols-[280px_minmax(0,1fr)_320px]">
      <aside class="flex flex-col h-full rounded-[28px] border border-white/10 bg-[linear-gradient(180deg,rgba(9,18,32,0.86),rgba(6,12,23,0.92))] p-5 shadow-[0_24px_60px_rgba(0,0,0,0.32)] backdrop-blur-xl">

        <!-- TOP CONTENT -->
        <div class="flex-1">

          <p class="mb-4 text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-400/80">
            Laptop Recommender
          </p>

          <!-- <div class="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between xl:flex-col xl:items-stretch">
            <div>
              <p class="mb-2 text-[11px] font-bold uppercase tracking-[0.24em] text-[#7ce5ce]">
                AI Buying Copilot
              </p>
              <h1 class="max-w-[10ch] font-['Space_Grotesk'] text-3xl font-bold leading-none text-white">
                Laptop Match Studio
              </h1>
            </div>

            <button
              class="rounded-2xl bg-[linear-gradient(135deg,#f8fafc,#7ce5ce)] px-4 py-3 text-sm font-bold text-slate-950 shadow-[0_12px_30px_rgba(124,229,206,0.2)] transition hover:-translate-y-0.5"
              @click="newChat"
            >
              + New Chat
            </button>
          </div> -->

          <!-- STATS -->
          <div class="mt-6 grid grid-cols-2 gap-3">
            <div class="rounded-[20px] border border-white/8 bg-white/4 p-4">
              <span class="block font-['Space_Grotesk'] text-3xl font-bold text-white">
                {{ messages.length }}
              </span>
              <span class="mt-1 block text-[11px] uppercase tracking-[0.24em] text-slate-400/80">
                Messages
              </span>
            </div>

            <div class="rounded-[20px] border border-white/8 bg-white/4 p-4">
              <span class="block font-['Space_Grotesk'] text-3xl font-bold text-white">
                {{ activeFilterCount }}
              </span>
              <span class="mt-1 block text-[11px] uppercase tracking-[0.24em] text-slate-400/80">
                Filters
              </span>
            </div>
          </div>

          <!-- CHAT HISTORY -->
          <div class="mt-7">
            <p class="mb-3 text-[11px] uppercase tracking-[0.24em] text-slate-400/80">
              Recent Chats
            </p>

            <button
              v-for="chat in chatHistory"
              :key="chat.id"
              class="mt-2 flex w-full items-center gap-3 rounded-[18px] border border-white/8 bg-white/3 px-4 py-3 text-left text-slate-100 transition hover:-translate-y-0.5 hover:border-[#7ce5ce]/35"
              @click="switchChat(chat.id)"
            >
              <span class="h-2.5 w-2.5 rounded-full bg-[linear-gradient(135deg,#7ce5ce,#ff8c69)] shadow-[0_0_14px_rgba(124,229,206,0.55)]"></span>
              <span>{{ chat.title }}</span>
            </button>
          </div>

        </div>

        <!-- USER ACCOUNT (BOTTOM) -->
        <div ref="accountMenuRef" class="relative mt-6 border-t border-white/10 pt-4">
          <button class="flex w-full items-center gap-3 rounded-[20px] px-2 py-2 text-left transition hover:bg-white/4" @click="toggleAccountMenu">
            <div class="h-10 w-10 rounded-full bg-[linear-gradient(135deg,#7ce5ce,#6366f1)] flex items-center justify-center text-sm font-bold text-slate-900">
              {{ userInitial }}
            </div>

            <div class="flex-1">
              <p class="text-sm font-semibold text-white">{{ user.name }}</p>
              <p class="text-[11px] text-slate-400">{{ user.plan }}</p>
            </div>

            <div class="flex items-center gap-3">
              <div class="h-2 w-2 rounded-full bg-green-400 shadow-[0_0_8px_rgba(34,197,94,0.7)]"></div>
              <svg class="h-4 w-4 text-slate-400 transition" :class="isAccountMenuOpen ? 'rotate-180' : ''" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 0 1 1.06.02L10 11.168l3.71-3.938a.75.75 0 1 1 1.08 1.04l-4.25 4.51a.75.75 0 0 1-1.08 0l-4.25-4.51a.75.75 0 0 1 .02-1.06Z" clip-rule="evenodd" />
              </svg>
            </div>
          </button>

          <div v-if="isAccountMenuOpen" class="absolute bottom-full left-0 z-30 mb-3 w-[260px] rounded-[22px] border border-white/10 bg-[rgba(32,39,53,0.96)] p-4 shadow-[0_24px_50px_rgba(0,0,0,0.45)] backdrop-blur-xl">
            <div class="flex items-center gap-3 rounded-[16px] bg-white/4 px-3 py-3">
              <div class="flex h-10 w-10 items-center justify-center rounded-full bg-[linear-gradient(135deg,#34d399,#38bdf8)] text-sm font-bold text-white">
                {{ userInitial }}
              </div>
              <div class="min-w-0 flex-1">
                <p class="truncate text-sm font-semibold text-white">{{ user.name }}</p>
                <p class="text-xs text-slate-400">{{ user.plan }}</p>
              </div>
              <svg class="h-4 w-4 text-slate-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fill-rule="evenodd" d="M7.22 4.97a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L10.94 10 7.22 6.28a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd" />
              </svg>
            </div>

            <div class="my-3 h-px bg-white/10"></div>

            <button v-for="item in accountMenuItems" :key="item.label" class="flex w-full items-center gap-3 rounded-[14px] px-3 py-2.5 text-left text-slate-100 transition hover:bg-white/6" @click="handleAccountAction(item.label)">
              <span class="w-5 text-center text-slate-300">{{ item.icon }}</span>
              <span class="flex-1">{{ item.label }}</span>
              <span v-if="item.hasChevron" class="text-slate-400">›</span>
            </button>

            <div class="my-3 h-px bg-white/10"></div>

            <button class="flex w-full items-center gap-3 rounded-[14px] px-3 py-2.5 text-left text-rose-200 transition hover:bg-white/6" @click="handleAccountAction('Log out')">
              <span class="w-5 text-center">↪</span>
              <span>Log out</span>
            </button>
          </div>
        </div>

      </aside>

      <main class="flex h-full min-h-0 flex-col overflow-hidden rounded-[34px] border border-white/10 bg-[linear-gradient(180deg,rgba(9,18,32,0.86),rgba(6,12,23,0.92))] shadow-[0_24px_60px_rgba(0,0,0,0.32)] backdrop-blur-xl">
        <div class="flex flex-col gap-4 border-b border-white/8 bg-[linear-gradient(180deg,rgba(255,255,255,0.04),transparent)] px-5 py-6 sm:px-7 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <p class="mb-2 text-[11px] font-bold uppercase tracking-[0.24em] text-[#7ce5ce]">
              Personalized Search
            </p>
            <h2 class="font-['Space_Grotesk'] text-2xl font-bold leading-none text-white">
              Tell me what kind of laptop you want
            </h2>
          </div>

          <div class="inline-flex items-center gap-3 self-start rounded-full border border-white/10 bg-white/4 px-4 py-2 text-sm text-slate-200">
            <span :class="['h-2.5 w-2.5 rounded-full shadow-[0_0_0_0_rgba(124,229,206,0.65)]', isTyping ? 'animate-status-pulse bg-[#7ce5ce]' : 'bg-emerald-300']"></span>
            <span>{{ isTyping ? 'Thinking' : 'Ready' }}</span>
          </div>
        </div>

        <div ref="messagesContainer" class="min-h-0 flex-1 overflow-y-auto px-5 py-7 sm:px-7">
          <div v-if="!messages.length" class="max-w-3xl rounded-[28px] border border-white/10 bg-[linear-gradient(135deg,rgba(255,140,105,0.18),rgba(124,229,206,0.10)),rgba(255,255,255,0.04)] p-7 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]">
            <p class="text-[11px] uppercase tracking-[0.24em] text-slate-400/80">Smart discovery</p>
            <h3 class="mt-2 max-w-[12ch] font-['Space_Grotesk'] text-4xl font-bold leading-none text-white sm:text-5xl">
              Start with a vibe, a budget, or a use case.
            </h3>
            <p class="mt-4 max-w-2xl text-sm leading-7 text-slate-200/80 sm:text-base">
              Ask for a gaming setup, a clean student laptop, or a business machine
              with strong battery life. The filters on the right can sharpen the search.
            </p>

            <div class="mt-5 flex flex-wrap gap-3">
              <span class="rounded-full border border-white/12 bg-white/4 px-4 py-2 text-sm text-slate-100">Performance picks</span>
              <span class="rounded-full border border-white/12 bg-white/4 px-4 py-2 text-sm text-slate-100">Budget-friendly</span>
              <span class="rounded-full border border-white/12 bg-white/4 px-4 py-2 text-sm text-slate-100">Creator-ready</span>
            </div>
          </div>

          <div v-for="msg in messages" :key="msg.id" :class="['mt-6 flex flex-col gap-2', msg.role === 'user' ? 'items-end' : 'items-start']">
            <div class="text-[11px] uppercase tracking-[0.24em] text-slate-400/80">{{ msg.role === 'user' ? 'You' : 'AI Curator' }}</div>

            <div :class="['max-w-full rounded-[22px] px-4 py-4 text-sm leading-7 sm:max-w-[78%] sm:px-5', msg.role === 'user' ? 'rounded-br-[8px] bg-[linear-gradient(135deg,#f6fbff,#7ce5ce)] text-slate-950 shadow-[0_18px_40px_rgba(124,229,206,0.12)]' : 'rounded-bl-[8px] border border-white/8 bg-white/5 text-slate-100']">
              {{ msg.content }}
            </div>
          </div>

          <div v-if="isTyping" class="mt-6 inline-flex items-center gap-3 rounded-[18px] border border-white/8 bg-white/4 px-4 py-3">
            <span class="text-[11px] uppercase tracking-[0.24em] text-slate-400/80">AI Curator is typing</span>
            <div class="flex gap-1.5">
              <span class="h-2 w-2 rounded-full bg-[#7ce5ce] animate-bounce [animation-delay:0ms]"></span>
              <span class="h-2 w-2 rounded-full bg-[#7ce5ce] animate-bounce [animation-delay:150ms]"></span>
              <span class="h-2 w-2 rounded-full bg-[#7ce5ce] animate-bounce [animation-delay:300ms]"></span>
            </div>
          </div>
        </div>

        <div class="border-t border-white/8 bg-[linear-gradient(180deg,transparent,rgba(255,255,255,0.02))] px-5 pb-8 pt-4 sm:px-6">
          <div class="flex w-full items-center gap-3 rounded-[26px] border border-white/10 bg-[linear-gradient(180deg,rgba(12,20,35,0.96),rgba(8,14,26,0.98))] px-3 py-3 shadow-[0_18px_40px_rgba(0,0,0,0.28)] ring-1 ring-white/5 backdrop-blur-xl">
            <div class="flex min-w-0 flex-1 items-center gap-3 rounded-[20px] border border-white/6 bg-black/20 px-4 py-1.5">
              <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-white/6 text-lg text-[#7ce5ce]">
                ✦
              </div>

              <input v-model="inputText" @keyup.enter="sendMessage" placeholder="Describe your ideal laptop..." class="min-w-0 flex-1 bg-transparent py-3 text-[15px] text-slate-50 outline-none placeholder:text-slate-400/60" />
            </div>

            <button @click="sendMessage" class="inline-flex h-12 shrink-0 items-center justify-center rounded-[18px] bg-[linear-gradient(135deg,#ff8c69,#ffd166)] px-5 font-bold text-slate-900 transition hover:-translate-y-0.5 hover:shadow-[0_14px_28px_rgba(255,140,105,0.22)]">Send</button>
          </div>
        </div>
      </main>

      <aside class="rounded-[28px] border border-white/10 bg-[linear-gradient(180deg,rgba(9,18,32,0.86),rgba(6,12,23,0.92))] p-5 shadow-[0_24px_60px_rgba(0,0,0,0.32)] backdrop-blur-xl">
        <p class="mb-4 text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-400/80">
          Control Deck
        </p>

        <div class="mb-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between xl:flex-col xl:items-stretch">
          <div>
            <p class="mb-2 text-[11px] font-bold uppercase tracking-[0.24em] text-[#7ce5ce]">
              Smart Filters
            </p>
            <h2 class="font-['Space_Grotesk'] text-2xl font-bold leading-none text-white">
              Build the perfect shortlist
            </h2>
          </div>

          <button class="rounded-[18px] border border-white/12 bg-white/3 px-4 py-2.5 font-semibold text-slate-100 transition hover:-translate-y-0.5 hover:border-[#7ce5ce]/35" @click="clearFilters">Reset</button>
        </div>

        <div class="flex flex-col gap-4">
          <section v-for="(items, key) in options" :key="key" class="rounded-[22px] border border-white/8 bg-white/3 p-4">
            <div class="mb-4 flex items-center justify-between gap-3">
              <p class="m-0 font-semibold text-white">{{ formatLabel(key) }}</p>
              <span class="text-[11px] uppercase tracking-[0.24em] text-slate-400/80">{{ filters[key] || 'Any' }}</span>
            </div>

            <div class="flex flex-wrap gap-2.5">
              <button v-for="item in items" :key="item" @click="setFilter(key, item)" :class="['rounded-full border px-3.5 py-2 text-sm transition hover:-translate-y-0.5 hover:border-[#7ce5ce]/35', filters[key] === item ? 'border-transparent bg-[linear-gradient(135deg,rgba(124,229,206,0.95),rgba(255,140,105,0.95))] text-slate-950 shadow-[0_12px_24px_rgba(255,140,105,0.18)]' : 'border-white/12 bg-white/4 text-slate-200']">
                {{ item }}
              </button>
            </div>
          </section>
        </div>
      </aside>
    </div>
  </div>
</template>

<script setup>
import { computed, nextTick, onBeforeUnmount, onMounted, reactive, ref, watch } from 'vue'

const messages = ref([])
const inputText = ref('')
const isTyping = ref(false)
const messagesContainer = ref(null)
const accountMenuRef = ref(null)
const isAccountMenuOpen = ref(false)
const user = ref({
  name: 'Raksmey',
  plan: 'Pro Plan'
})

const chatHistory = ref([
  { id: 1, title: 'New Chat' },
  { id: 2, title: 'Gaming under $1200' },
  { id: 3, title: 'Business travel picks' }
])

const filters = reactive({
  brand: '',
  budget: '',
  ram: '',
  type: ''
})

const options = {
  brand: ['ASUS', 'Dell', 'HP', 'Lenovo'],
  budget: ['<500', '500-800', '800-1200'],
  ram: ['8GB', '16GB', '32GB'],
  type: ['Gaming', 'Student', 'Business']
}

const accountMenuItems = [
  { label: 'Upgrade plan', icon: '✦', hasChevron: false },
  // { label: 'Personalization', icon: '◔', hasChevron: false },
  { label: 'Profile', icon: '◉', hasChevron: false },
  { label: 'Settings', icon: '⚙', hasChevron: false },
  { label: 'Help', icon: '?', hasChevron: true }
]

const activeFilterCount = computed(() =>
  Object.values(filters).filter(Boolean).length
)

const userInitial = computed(() => user.value.name.charAt(0).toUpperCase())

function sendMessage() {
  if (!inputText.value.trim()) return

  messages.value.push({
    id: Date.now(),
    role: 'user',
    content: inputText.value
  })

  simulateAI(inputText.value)
  inputText.value = ''
}

function setFilter(key, value) {
  filters[key] = filters[key] === value ? '' : value

  const selections = Object.entries(filters)
    .filter(([, selected]) => selected)
    .map(([name, selected]) => `${formatLabel(name)}: ${selected}`)

  const prompt = selections.length
    ? `Recommend a laptop with ${selections.join(', ')}.`
    : 'Recommend a versatile laptop for everyday use.'

  messages.value.push({
    id: Date.now(),
    role: 'user',
    content: prompt
  })

  simulateAI(prompt)
}

function simulateAI(text) {
  isTyping.value = true

  setTimeout(() => {
    isTyping.value = false
    messages.value.push({
      id: Date.now() + 1,
      role: 'assistant',
      content: `Curated recommendations are ready for: ${text}`
    })
  }, 1000)
}

function newChat() {
  messages.value = []
  inputText.value = ''
}

function switchChat() {
  messages.value = []
}

function clearFilters() {
  Object.keys(filters).forEach((key) => {
    filters[key] = ''
  })
}

function toggleAccountMenu() {
  isAccountMenuOpen.value = !isAccountMenuOpen.value
}

function closeAccountMenu() {
  isAccountMenuOpen.value = false
}

function handleAccountAction() {
  closeAccountMenu()
}

function formatLabel(value) {
  return value.charAt(0).toUpperCase() + value.slice(1)
}

function scrollToLatest() {
  nextTick(() => {
    const container = messagesContainer.value

    if (!container) return

    container.scrollTo({
      top: container.scrollHeight,
      behavior: 'smooth'
    })
  })
}

watch(
  () => messages.value.length,
  () => {
    scrollToLatest()
  }
)

watch(isTyping, (typing) => {
  if (typing) {
    scrollToLatest()
  }
})

function handleWindowClick(event) {
  if (!accountMenuRef.value?.contains(event.target)) {
    closeAccountMenu()
  }
}

onMounted(() => {
  window.addEventListener('click', handleWindowClick)
})

onBeforeUnmount(() => {
  window.removeEventListener('click', handleWindowClick)
})
</script>
