import { ref } from 'vue'
import { sendUserMessage } from '../services/chatService'

export function useChat() {
  const messages = ref([])
  const inputText = ref('')
  const isTyping = ref(false)

  async function sendMessage(text = null) {
    const payload = ((text ?? inputText.value) || '').trim()
    if (!payload) return

    // push user message
    messages.value.push({ id: Date.now(), role: 'user', content: payload })
    inputText.value = ''

    try {
      isTyping.value = true
      const reply = await sendUserMessage(payload)
      // append assistant reply
      messages.value.push({ id: Date.now() + 1, role: reply.role, content: reply.content })
    } catch (err) {
      messages.value.push({ id: Date.now() + 2, role: 'assistant', content: 'Sorry — something went wrong.' })
      console.error('useChat.sendMessage error', err)
    } finally {
      isTyping.value = false
    }
  }

  function newChat() {
    messages.value = []
    inputText.value = ''
  }

  function switchChat() {
    // placeholder for switching chat histories — load persisted chat here
    messages.value = []
  }

  return {
    messages,
    inputText,
    isTyping,
    sendMessage,
    newChat,
    switchChat
  }
}
