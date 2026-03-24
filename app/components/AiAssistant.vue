<template>
  <!-- Floating trigger button -->
  <Teleport to="body">
    <button
      class="ai-fab"
      :class="{ 'ai-fab--hidden': isOpen }"
      @click="openChat"
      aria-label="Open AI Assistant"
    >
      <span class="ai-fab__icon">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
          <path d="M12 2a10 10 0 1 0 10 10H12V2z"/>
          <path d="M12 2v10l6.5 6.5"/>
          <circle cx="12" cy="12" r="2" fill="currentColor" stroke="none"/>
        </svg>
      </span>
      <span class="ai-fab__label">ASK ME</span>
      <span class="ai-fab__pulse" />
    </button>

    <!-- Chat panel -->
    <Transition name="ai-panel">
      <div v-if="isOpen" class="ai-panel" role="dialog" aria-label="AI Assistant">
        <!-- Scanline overlay -->
        <div class="ai-panel__scanlines" aria-hidden="true" />

        <!-- Header -->
        <header class="ai-panel__header">
          <div class="ai-panel__header-left">
            <span class="ai-panel__status-dot" />
            <span class="ai-panel__title">AI_ASSISTANT<span class="blink">_</span></span>
          </div>
          <div class="ai-panel__header-right">
            <button class="ai-panel__btn" @click="clearChat" title="Clear chat">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="1 4 1 10 7 10"/><polyline points="23 20 23 14 17 14"/>
                <path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4-4.64 4.36A9 9 0 0 1 3.51 15"/>
              </svg>
            </button>
            <button class="ai-panel__btn ai-panel__btn--close" @click="closeChat" title="Close">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>
          </div>
        </header>

        <!-- Messages -->
        <div class="ai-panel__messages" ref="messagesEl">
          <!-- Suggestions (shown when only welcome msg) -->
          <div v-if="messages.length <= 1" class="ai-suggestions">
            <p class="ai-suggestions__label">// try asking:</p>
            <button
              v-for="s in suggestions"
              :key="s"
              class="ai-suggestion"
              @click="sendMessage(s)"
            >{{ s }}</button>
          </div>

          <div
            v-for="msg in messages"
            :key="msg.id"
            class="ai-message"
            :class="`ai-message--${msg.role}`"
          >
            <span class="ai-message__prefix">
              {{ msg.role === 'user' ? '> YOU' : '> AI' }}
            </span>
            <p class="ai-message__content">
              {{ msg.content }}<span v-if="msg.isStreaming" class="blink">▊</span>
            </p>
          </div>

          <!-- Loading indicator -->
          <div v-if="isLoading && !messages[messages.length - 1]?.isStreaming" class="ai-loading">
            <span class="ai-loading__dot" />
            <span class="ai-loading__dot" />
            <span class="ai-loading__dot" />
          </div>
        </div>

        <!-- Input -->
        <form class="ai-panel__input-row" @submit.prevent="handleSubmit">
          <span class="ai-panel__prompt-symbol">&gt;</span>
          <input
            ref="inputEl"
            v-model="inputValue"
            class="ai-panel__input"
            type="text"
            placeholder="ask me anything..."
            :disabled="isLoading"
            autocomplete="off"
            spellcheck="false"
            @keydown.enter.prevent="handleSubmit"
          />
          <button
            class="ai-panel__send"
            type="submit"
            :disabled="isLoading || !inputValue.trim()"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <line x1="22" y1="2" x2="11" y2="13"/>
              <polygon points="22 2 15 22 11 13 2 9 22 2"/>
            </svg>
          </button>
        </form>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, watch, nextTick } from 'vue'
import { useAiAssistant } from '~/composables/useAiAssistant'

const {
  messages,
  isLoading,
  isOpen,
  suggestions,
  openChat,
  closeChat,
  clearChat,
  sendMessage,
} = useAiAssistant()

const inputValue = ref('')
const messagesEl = ref<HTMLElement | null>(null)
const inputEl = ref<HTMLInputElement | null>(null)

async function handleSubmit() {
  const val = inputValue.value.trim()
  if (!val || isLoading.value) return
  inputValue.value = ''
  await sendMessage(val)
}

// Auto-scroll to bottom on new messages
watch(
  messages,
  async () => {
    await nextTick()
    if (messagesEl.value) {
      messagesEl.value.scrollTop = messagesEl.value.scrollHeight
    }
  },
  { deep: true }
)

// Focus input when panel opens
watch(isOpen, async (val) => {
  if (val) {
    await nextTick()
    inputEl.value?.focus()
  }
})
</script>

<style scoped>
/* ── CSS Variables (inherits from your tokens.css) ── */
.ai-fab,
.ai-panel {
  --ai-bg: #0a0a0a;
  --ai-border: rgba(255, 255, 255, 0.12);
  --ai-accent: #00ff88;
  --ai-accent-dim: rgba(0, 255, 136, 0.15);
  --ai-text: #e8e8e8;
  --ai-text-dim: rgba(255, 255, 255, 0.35);
  --ai-user-color: #7eb8ff;
  --ai-font: 'Courier New', 'Consolas', monospace;
  font-family: var(--ai-font);
}

/* ── FAB ── */
.ai-fab {
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  z-index: 9000;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.6rem 1rem 0.6rem 0.75rem;
  background: var(--ai-bg);
  border: 1px solid var(--ai-accent);
  color: var(--ai-accent);
  cursor: pointer;
  font-family: var(--ai-font);
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.15em;
  transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.3s ease, box-shadow 0.3s ease;
  box-shadow: 0 0 20px rgba(0, 255, 136, 0.15), inset 0 0 20px rgba(0, 255, 136, 0.03);
  clip-path: polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px));
}
.ai-fab:hover {
  box-shadow: 0 0 40px rgba(0, 255, 136, 0.35), inset 0 0 20px rgba(0, 255, 136, 0.08);
  transform: translateY(-2px);
}
.ai-fab--hidden {
  opacity: 0;
  pointer-events: none;
  transform: scale(0.85);
}
.ai-fab__icon { display: flex; align-items: center; }
.ai-fab__label { line-height: 1; }
.ai-fab__pulse {
  position: absolute;
  top: 6px; right: 6px;
  width: 6px; height: 6px;
  border-radius: 50%;
  background: var(--ai-accent);
  animation: pulse-ring 2s ease infinite;
}
@keyframes pulse-ring {
  0% { box-shadow: 0 0 0 0 rgba(0, 255, 136, 0.6); }
  70% { box-shadow: 0 0 0 8px rgba(0, 255, 136, 0); }
  100% { box-shadow: 0 0 0 0 rgba(0, 255, 136, 0); }
}

/* ── Panel ── */
.ai-panel {
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  z-index: 9100;
  width: min(420px, calc(100vw - 2rem));
  height: min(560px, calc(100vh - 4rem));
  background: var(--ai-bg);
  border: 1px solid var(--ai-border);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  box-shadow:
    0 0 0 1px rgba(0, 255, 136, 0.08),
    0 32px 80px rgba(0, 0, 0, 0.7),
    0 0 60px rgba(0, 255, 136, 0.05);
  clip-path: polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px));
}

/* CRT scanlines */
.ai-panel__scanlines {
  position: absolute;
  inset: 0;
  z-index: 10;
  pointer-events: none;
  background: repeating-linear-gradient(
    0deg,
    transparent,
    transparent 2px,
    rgba(0, 0, 0, 0.08) 2px,
    rgba(0, 0, 0, 0.08) 4px
  );
}

/* Header */
.ai-panel__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.75rem 1rem;
  border-bottom: 1px solid var(--ai-border);
  background: rgba(0, 255, 136, 0.04);
  flex-shrink: 0;
}
.ai-panel__header-left { display: flex; align-items: center; gap: 0.5rem; }
.ai-panel__header-right { display: flex; align-items: center; gap: 0.25rem; }
.ai-panel__status-dot {
  width: 7px; height: 7px;
  border-radius: 50%;
  background: var(--ai-accent);
  box-shadow: 0 0 6px var(--ai-accent);
  animation: pulse-ring 2s ease infinite;
}
.ai-panel__title {
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.15em;
  color: var(--ai-accent);
}
.ai-panel__btn {
  display: flex; align-items: center; justify-content: center;
  width: 28px; height: 28px;
  background: transparent;
  border: 1px solid transparent;
  color: var(--ai-text-dim);
  cursor: pointer;
  transition: color 0.2s, border-color 0.2s;
  border-radius: 2px;
}
.ai-panel__btn:hover { color: var(--ai-text); border-color: var(--ai-border); }
.ai-panel__btn--close:hover { color: #ff5555; border-color: rgba(255, 85, 85, 0.3); }

/* Messages area */
.ai-panel__messages {
  flex: 1;
  overflow-y: auto;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  scroll-behavior: smooth;
}
.ai-panel__messages::-webkit-scrollbar { width: 3px; }
.ai-panel__messages::-webkit-scrollbar-track { background: transparent; }
.ai-panel__messages::-webkit-scrollbar-thumb { background: rgba(0, 255, 136, 0.2); border-radius: 2px; }

/* Suggestions */
.ai-suggestions { display: flex; flex-direction: column; gap: 0.4rem; }
.ai-suggestions__label {
  font-size: 0.65rem;
  color: var(--ai-text-dim);
  letter-spacing: 0.08em;
  margin-bottom: 0.25rem;
}
.ai-suggestion {
  background: transparent;
  border: 1px solid var(--ai-border);
  color: var(--ai-text-dim);
  font-family: var(--ai-font);
  font-size: 0.72rem;
  padding: 0.4rem 0.75rem;
  cursor: pointer;
  text-align: left;
  letter-spacing: 0.04em;
  transition: color 0.2s, border-color 0.2s, background 0.2s;
  clip-path: polygon(0 0, calc(100% - 5px) 0, 100% 5px, 100% 100%, 5px 100%, 0 calc(100% - 5px));
}
.ai-suggestion:hover {
  color: var(--ai-accent);
  border-color: rgba(0, 255, 136, 0.4);
  background: var(--ai-accent-dim);
}

/* Messages */
.ai-message { display: flex; flex-direction: column; gap: 0.2rem; }
.ai-message__prefix {
  font-size: 0.6rem;
  letter-spacing: 0.12em;
  font-weight: 700;
}
.ai-message--user .ai-message__prefix { color: var(--ai-user-color); }
.ai-message--assistant .ai-message__prefix { color: var(--ai-accent); }
.ai-message__content {
  font-size: 0.8rem;
  line-height: 1.6;
  color: var(--ai-text);
  margin: 0;
  padding-left: 0.5rem;
  border-left: 2px solid transparent;
}
.ai-message--user .ai-message__content {
  border-left-color: rgba(126, 184, 255, 0.25);
  color: rgba(255, 255, 255, 0.75);
}
.ai-message--assistant .ai-message__content {
  border-left-color: rgba(0, 255, 136, 0.2);
}

/* Loading dots */
.ai-loading {
  display: flex;
  gap: 5px;
  padding-left: 0.5rem;
  padding-top: 0.25rem;
}
.ai-loading__dot {
  width: 5px; height: 5px;
  border-radius: 50%;
  background: var(--ai-accent);
  opacity: 0.4;
  animation: dot-blink 1.2s ease infinite;
}
.ai-loading__dot:nth-child(2) { animation-delay: 0.2s; }
.ai-loading__dot:nth-child(3) { animation-delay: 0.4s; }
@keyframes dot-blink {
  0%, 80%, 100% { opacity: 0.2; transform: scale(0.8); }
  40% { opacity: 1; transform: scale(1); }
}

/* Input row */
.ai-panel__input-row {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  border-top: 1px solid var(--ai-border);
  background: rgba(0, 255, 136, 0.02);
  flex-shrink: 0;
}
.ai-panel__prompt-symbol {
  color: var(--ai-accent);
  font-size: 0.85rem;
  user-select: none;
  flex-shrink: 0;
}
.ai-panel__input {
  flex: 1;
  background: transparent;
  border: none;
  outline: none;
  color: var(--ai-text);
  font-family: var(--ai-font);
  font-size: 0.8rem;
  letter-spacing: 0.03em;
  caret-color: var(--ai-accent);
}
.ai-panel__input::placeholder { color: var(--ai-text-dim); }
.ai-panel__input:disabled { opacity: 0.5; }
.ai-panel__send {
  display: flex; align-items: center; justify-content: center;
  background: transparent;
  border: 1px solid rgba(0, 255, 136, 0.3);
  color: var(--ai-accent);
  width: 30px; height: 30px;
  cursor: pointer;
  transition: background 0.2s, box-shadow 0.2s;
  flex-shrink: 0;
  clip-path: polygon(0 0, calc(100% - 5px) 0, 100% 5px, 100% 100%, 5px 100%, 0 calc(100% - 5px));
}
.ai-panel__send:hover:not(:disabled) {
  background: var(--ai-accent-dim);
  box-shadow: 0 0 12px rgba(0, 255, 136, 0.2);
}
.ai-panel__send:disabled { opacity: 0.3; cursor: not-allowed; }

/* Blink cursor */
.blink { animation: blink 1s step-end infinite; }
@keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }

/* ── Panel transition ── */
.ai-panel-enter-active {
  transition: opacity 0.25s ease, transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.ai-panel-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}
.ai-panel-enter-from,
.ai-panel-leave-to {
  opacity: 0;
  transform: translateY(16px) scale(0.97);
}

/* ── Mobile ── */
@media (max-width: 480px) {
  .ai-panel {
    bottom: 0;
    right: 0;
    left: 0;
    width: 100%;
    height: 70vh;
    border-left: none;
    border-right: none;
    border-bottom: none;
    clip-path: polygon(0 12px, 12px 0, 100% 0, 100% 100%, 0 100%);
  }
  .ai-fab { bottom: 1.25rem; right: 1.25rem; }
}
</style>