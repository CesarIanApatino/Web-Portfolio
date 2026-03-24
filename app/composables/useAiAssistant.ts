// app/composables/useAiAssistant.ts
import { ref, readonly } from 'vue'

export interface ChatMessage {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
  isStreaming?: boolean
}

export function useAiAssistant() {
  const messages = ref<ChatMessage[]>([])
  const isLoading = ref(false)
  const error = ref<string | null>(null)
  const isOpen = ref(false)

  // Suggested starter questions — edit these to match your actual info
  const suggestions = [
    'What stack do you use?',
    'Tell me about your projects',
    'What\'s your experience?',
    'Are you available for work?',
  ]

  function openChat() {
    isOpen.value = true
    // Add welcome message on first open
    if (messages.value.length === 0) {
      messages.value.push({
        id: crypto.randomUUID(),
        role: 'assistant',
        content: 'Hey! 👋 I\'m an AI trained on everything about me. Ask me about my projects, skills, experience — anything you\'re curious about.',
        timestamp: new Date(),
      })
    }
  }

  function closeChat() {
    isOpen.value = false
  }

  function clearChat() {
    messages.value = []
    error.value = null
  }

  async function sendMessage(content: string) {
    if (!content.trim() || isLoading.value) return

    error.value = null

    // Add user message
    const userMsg: ChatMessage = {
      id: crypto.randomUUID(),
      role: 'user',
      content: content.trim(),
      timestamp: new Date(),
    }
    messages.value.push(userMsg)

    // Add placeholder assistant message
    const assistantMsg: ChatMessage = {
      id: crypto.randomUUID(),
      role: 'assistant',
      content: '',
      timestamp: new Date(),
      isStreaming: true,
    }
    messages.value.push(assistantMsg)
    isLoading.value = true

    try {
      // Build history for API (exclude the empty streaming placeholder)
      const history = messages.value
        .filter((m) => !m.isStreaming && m.content)
        .map((m) => ({ role: m.role, content: m.content }))

      const response = await fetch('/.netlify/functions/ai-assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: history }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Something went wrong')
      }

      // Simulate typewriter on the assistant message
      await typewriterEffect(assistantMsg.id, data.message)
    } catch (err: any) {
      // Replace streaming placeholder with error
      const idx = messages.value.findIndex((m) => m.isStreaming)
      if (idx !== -1) {
        messages.value[idx] = {
          ...(messages.value[idx] as ChatMessage),
          content: err.message || 'Something went wrong. Try again.',
          isStreaming: false,
        }
      }
      error.value = err.message
    } finally {
      isLoading.value = false
    }
  }

  async function typewriterEffect(id: string, fullText: string) {
    const idx = messages.value.findIndex((m) => m.id === id)
    if (idx === -1) return

    const chars = fullText.split('')
    let current = ''

    const base = messages.value[idx] as ChatMessage

    for (const char of chars) {
      current += char
      messages.value[idx] = {
        ...base,
        content: current,
        isStreaming: true,
      }
      // Vary speed slightly for organic feel
      await sleep(Math.random() * 15 + 8)
    }

    // Mark done
    messages.value[idx] = {
      ...base,
      content: fullText,
      isStreaming: false,
    }
  }

  function sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms))
  }

  return {
    messages: readonly(messages),
    isLoading: readonly(isLoading),
    error: readonly(error),
    isOpen: readonly(isOpen),
    suggestions,
    openChat,
    closeChat,
    clearChat,
    sendMessage,
  }
}