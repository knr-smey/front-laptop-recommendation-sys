import { computed, ref } from 'vue'
import { sendUserMessage } from '../services/chatService'

export function useChat() {
  const inputText = ref('')
  const isTyping = ref(false)
  const chatIdSeed = ref(1)
  const activeChatId = ref(1)
  const chats = ref([
    {
      id: 1,
      title: 'New Chat',
      messages: []
    }
  ])

  const activeChat = computed(() => chats.value.find((chat) => chat.id === activeChatId.value) ?? chats.value[0])
  const messages = computed(() => activeChat.value?.messages ?? [])
  const chatHistory = computed(() =>
    chats.value.map((chat) => ({
      id: chat.id,
      title: chat.title
    }))
  )

  function buildChatTitle(text) {
    const trimmed = text.trim()
    if (!trimmed) return 'New Chat'
    return trimmed.length > 32 ? `${trimmed.slice(0, 32)}...` : trimmed
  }

  function ensureActiveChat() {
    if (activeChat.value) return activeChat.value

    const freshChat = {
      id: ++chatIdSeed.value,
      title: 'New Chat',
      messages: []
    }

    chats.value.unshift(freshChat)
    activeChatId.value = freshChat.id
    return freshChat
  }

  async function sendMessage(text = null) {
    const payload = ((text ?? inputText.value) || '').trim()
    if (!payload) return

    const chat = ensureActiveChat()

    if (!chat.messages.length) {
      chat.title = buildChatTitle(payload)
    }

    chat.messages.push({ id: Date.now(), role: 'user', content: payload })
    inputText.value = ''

    try {
      isTyping.value = true
      const reply = await sendUserMessage(payload)
      chat.messages.push({ id: Date.now() + 1, role: reply.role, content: reply.content })
    } catch (err) {
      chat.messages.push({ id: Date.now() + 2, role: 'assistant', content: 'Sorry — something went wrong.' })
      console.error('useChat.sendMessage error', err)
    } finally {
      isTyping.value = false
    }
  }

  function newChat() {
    inputText.value = ''

    if (activeChat.value && !activeChat.value.messages.length && activeChat.value.title === 'New Chat') {
      return
    }

    const freshChat = {
      id: ++chatIdSeed.value,
      title: 'New Chat',
      messages: []
    }
    chats.value.unshift(freshChat)
    activeChatId.value = freshChat.id
  }

  function switchChat(chatId) {
    const targetChat = chats.value.find((chat) => chat.id === chatId)
    if (!targetChat) return

    activeChatId.value = chatId
    inputText.value = ''
  }

  return {
    activeChatId,
    chatHistory,
    messages,
    inputText,
    isTyping,
    sendMessage,
    newChat,
    switchChat
  }
}
