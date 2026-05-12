// Lightweight service layer for chat interactions.
// Replace implementations with real API calls when integrating backend.
export async function sendUserMessage(prompt) {
  try {
    // Simulate network latency and streaming-friendly response
    await new Promise((res) => setTimeout(res, 900))

    // Return a mock assistant reply. Production should call an AI endpoint here.
    return {
      role: 'assistant',
      content: `Curated recommendations are ready for: ${prompt}`
    }
  } catch (err) {
    console.error('chatService.sendUserMessage error', err)
    throw err
  }
}
