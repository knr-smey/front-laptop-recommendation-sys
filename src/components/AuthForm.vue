<template>
  <div class="rounded-[30px] border border-white/10 bg-[linear-gradient(180deg,rgba(12,20,35,0.94),rgba(7,13,24,0.96))] p-6 shadow-[0_24px_60px_rgba(0,0,0,0.36)] backdrop-blur-xl sm:p-8">
    <div class="flex items-center justify-between gap-4">
      <div>
        <p class="text-[11px] font-semibold uppercase tracking-[0.28em] text-slate-400/80">Welcome back</p>
        <h2 class="mt-2 font-['Space_Grotesk'] text-2xl font-bold text-white">Access your shortlist</h2>
      </div>
      <button class="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-200 transition hover:border-[#7ce5ce]/40 hover:bg-[#7ce5ce]/10" @click="enterGuest">Guest access</button>
    </div>

    <div class="mt-6 grid grid-cols-2 gap-3 rounded-full border border-white/8 bg-white/4 p-1 text-xs font-semibold uppercase tracking-[0.2em]">
      <button
        :class="[
          'rounded-full px-3 py-2 transition',
          activeTab === 'login'
            ? 'bg-[linear-gradient(135deg,rgba(124,229,206,0.9),rgba(255,140,105,0.9))] text-slate-950 shadow-[0_10px_30px_rgba(255,140,105,0.2)]'
            : 'text-slate-300 hover:text-white'
        ]"
        @click="activeTab = 'login'"
      >
        Login
      </button>
      <button
        :class="[
          'rounded-full px-3 py-2 transition',
          activeTab === 'register'
            ? 'bg-[linear-gradient(135deg,rgba(124,229,206,0.9),rgba(255,140,105,0.9))] text-slate-950 shadow-[0_10px_30px_rgba(255,140,105,0.2)]'
            : 'text-slate-300 hover:text-white'
        ]"
        @click="activeTab = 'register'"
      >
        Register
      </button>
    </div>

    <form class="mt-6 space-y-4" @submit.prevent="handleSubmit">
      <div v-if="activeTab === 'register'" class="grid gap-3 sm:grid-cols-2">
        <label class="flex flex-col gap-2 text-xs uppercase tracking-[0.2em] text-slate-400">
          First name
          <input v-model.trim="firstName" type="text" placeholder="Ava" class="rounded-[18px] border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-slate-400/70 focus:border-[#7ce5ce]/60 focus:outline-none" />
        </label>
        <label class="flex flex-col gap-2 text-xs uppercase tracking-[0.2em] text-slate-400">
          Last name
          <input v-model.trim="lastName" type="text" placeholder="Nguyen" class="rounded-[18px] border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-slate-400/70 focus:border-[#7ce5ce]/60 focus:outline-none" />
        </label>
      </div>

      <label class="flex flex-col gap-2 text-xs uppercase tracking-[0.2em] text-slate-400">
        Email
        <input v-model.trim="email" type="email" placeholder="you@email.com" class="rounded-[18px] border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-slate-400/70 focus:border-[#7ce5ce]/60 focus:outline-none" />
      </label>

      <label class="flex flex-col gap-2 text-xs uppercase tracking-[0.2em] text-slate-400">
        Password
        <input v-model="password" type="password" placeholder="••••••••" class="rounded-[18px] border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-slate-400/70 focus:border-[#7ce5ce]/60 focus:outline-none" />
      </label>

      <label v-if="activeTab === 'register'" class="flex flex-col gap-2 text-xs uppercase tracking-[0.2em] text-slate-400">
        Confirm password
        <input v-model="confirmPassword" type="password" placeholder="••••••••" class="rounded-[18px] border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-slate-400/70 focus:border-[#7ce5ce]/60 focus:outline-none" />
      </label>

      <div class="flex items-center justify-between text-xs text-slate-300/80">
        <label class="flex items-center gap-2">
          <input v-model="remember" type="checkbox" class="h-4 w-4 rounded border-white/20 bg-white/5 text-[#7ce5ce]" />
          Keep me signed in
        </label>
        <button type="button" class="text-[#7ce5ce] transition hover:text-[#ff8c69]">Forgot password?</button>
      </div>

      <p v-if="statusMessage" class="rounded-[16px] border border-white/10 bg-white/5 px-4 py-3 text-xs text-slate-200">
        {{ statusMessage }}
      </p>

      <button type="submit" class="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-[18px] bg-[linear-gradient(135deg,#ff8c69,#ffd166)] px-6 py-3 text-sm font-bold text-slate-900 transition hover:-translate-y-0.5 hover:shadow-[0_16px_30px_rgba(255,140,105,0.25)]">
        {{ activeTab === 'login' ? 'Sign in' : 'Create account' }}
      </button>
    </form>

    <div class="mt-4 rounded-[18px] border border-white/10 bg-white/5 px-4 py-3 text-xs text-slate-300/80">
      Static account: <span class="text-slate-100">test@gmail.com</span> · password: <span class="text-slate-100">123456</span>
    </div>

    <div class="mt-6 rounded-[20px] border border-white/10 bg-white/5 px-4 py-3 text-xs text-slate-300/80">
      By continuing, you agree to the Terms and acknowledge the Privacy Policy.
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const emit = defineEmits(['auth-success'])

const activeTab = ref('login')
const firstName = ref('')
const lastName = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const remember = ref(false)
const statusMessage = ref('')

const accounts = ref([
  {
    name: 'Test User',
    email: 'test@gmail.com',
    password: '123456',
    plan: 'Personal'
  }
])

function enterGuest() {
  statusMessage.value = ''
  emit('auth-success', { name: 'Guest', plan: 'Guest' })
}

function handleSubmit() {
  statusMessage.value = ''

  if (!email.value || !password.value) {
    statusMessage.value = 'Email and password are required.'
    return
  }

  if (activeTab.value === 'login') {
    const match = accounts.value.find(
      (account) => account.email.toLowerCase() === email.value.toLowerCase() && account.password === password.value
    )

    if (!match) {
      statusMessage.value = 'Account not found. Try the static account or register.'
      return
    }

    emit('auth-success', { name: match.name, plan: match.plan || 'Personal' })
    return
  }

  if (!firstName.value || !lastName.value) {
    statusMessage.value = 'Please enter first and last name.'
    return
  }

  if (password.value !== confirmPassword.value) {
    statusMessage.value = 'Passwords do not match.'
    return
  }

  const exists = accounts.value.some((account) => account.email.toLowerCase() === email.value.toLowerCase())

  if (exists) {
    statusMessage.value = 'This email is already registered.'
    return
  }

  accounts.value.push({
    name: `${firstName.value} ${lastName.value}`,
    email: email.value,
    password: password.value,
    plan: 'Personal'
  })

  emit('auth-success', { name: `${firstName.value} ${lastName.value}`, plan: 'Personal' })
}
</script>
