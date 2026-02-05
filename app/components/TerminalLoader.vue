<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'

const emit = defineEmits(['loader-complete'])

const isLoading = ref(true)
const loadingProgress = ref(0)
const loadingText = ref('INITIALIZING')

// Loading messages sequence - Add type annotation
const messages: string[] = [
  'INITIALIZING',
  'LOADING ASSETS',
  'RENDERING SCENE',
  'COMPLETE'
]

onMounted(() => {
  // Simulate loading progress
  let progress = 0
  let messageIndex = 0
  
  const interval = setInterval(() => {
    progress += Math.random() * 15 + 5
    
    if (progress >= 100) {
      progress = 100
      loadingProgress.value = progress
      loadingText.value = messages[3] || 'COMPLETE' // Add fallback
      
      // Wait a bit then hide loader
      setTimeout(() => {
        isLoading.value = false
        emit('loader-complete')
      }, 500)
      
      clearInterval(interval)
    } else {
      loadingProgress.value = progress
      
      // Update message based on progress
      if (progress > 25 && messageIndex === 0) {
        messageIndex = 1
        loadingText.value = messages[1] || 'LOADING ASSETS' // Add fallback
      } else if (progress > 60 && messageIndex === 1) {
        messageIndex = 2
        loadingText.value = messages[2] || 'RENDERING SCENE' // Add fallback
      }
    }
  }, 200)
})

// Create progress bar blocks
const progressBlocks = computed(() => {
  const totalBlocks = 30
  const filledBlocks = Math.floor((loadingProgress.value / 100) * totalBlocks)
  let bar = ''
  for (let i = 0; i < totalBlocks; i++) {
    bar += i < filledBlocks ? '█' : '░'
  }
  return bar
})
</script>

<template>
  <div v-if="isLoading" class="terminal-loader">
    <!-- Scan lines -->
    <div class="scan-line scan-line-1"></div>
    <div class="scan-line scan-line-2"></div>
    <div class="scan-line scan-line-3"></div>

    <!-- Main loader box -->
    <div class="loader-box">
      <div class="loader-border">
        <div class="loader-content">
          <!-- Terminal prompt -->
          <div class="terminal-prompt">
            <span class="prompt-symbol">></span>
            <span class="loading-text">{{ loadingText }}</span>
            <span class="cursor-blink">_</span>
          </div>

          <!-- Progress bar -->
          <div class="progress-container">
            <div class="progress-bar-ascii">{{ progressBlocks }}</div>
            <div class="progress-percentage">{{ Math.floor(loadingProgress) }}%</div>
          </div>

          <!-- Status -->
          <div class="status-text">
            [ LOADING APATINO'S PORTFOLIO ]
          </div>
        </div>
      </div>
    </div>

    <!-- Corner coordinates -->
    <div class="loader-coords top-left">[0x00]</div>
    <div class="loader-coords top-right">[0xFF]</div>
    <div class="loader-coords bottom-left">[SYS]</div>
    <div class="loader-coords bottom-right">[OK]</div>
  </div>
</template>

<style scoped>
/* ... all your existing styles stay the same ... */
.terminal-loader {
  position: fixed;
  inset: 0;
  background: #000000;
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

/* Scan lines */
.scan-line {
  position: absolute;
  left: 0;
  width: 100%;
  height: 2px;
  background: var(--color-accent);
  opacity: 0.6;
  pointer-events: none;
}

.scan-line-1 {
  animation: scanVertical 2s linear infinite;
}

.scan-line-2 {
  animation: scanVertical 3s linear infinite;
  animation-delay: 0.5s;
  opacity: 0.3;
}

.scan-line-3 {
  animation: scanVertical 2.5s linear infinite;
  animation-delay: 1s;
  opacity: 0.4;
}

@keyframes scanVertical {
  0% {
    top: -2px;
  }
  100% {
    top: 100%;
  }
}

/* Loader box */
.loader-box {
  position: relative;
  z-index: 10;
  padding: 3px;
  background: var(--color-accent);
  animation: glitchBorder 0.3s infinite;
}

@keyframes glitchBorder {
  0%, 90%, 100% {
    transform: translate(0, 0);
  }
  92% {
    transform: translate(-2px, 2px);
  }
  94% {
    transform: translate(2px, -2px);
  }
  96% {
    transform: translate(-2px, -2px);
  }
  98% {
    transform: translate(2px, 2px);
  }
}

.loader-border {
  border: 2px solid var(--color-fg);
  background: #000000;
  padding: 2px;
}

.loader-content {
  border: 2px solid var(--color-fg);
  padding: 40px 60px;
  min-width: 500px;
  background: #000000;
}

/* Terminal prompt */
.terminal-prompt {
  font-family: var(--font-mono);
  font-size: 18px;
  color: #00ff00;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.prompt-symbol {
  color: var(--color-accent);
  font-weight: bold;
}

.loading-text {
  letter-spacing: 0.1em;
}

.cursor-blink {
  animation: blink 1s infinite;
  color: #00ff00;
}

@keyframes blink {
  0%, 50% {
    opacity: 1;
  }
  51%, 100% {
    opacity: 0;
  }
}

/* Progress bar */
.progress-container {
  margin-bottom: 20px;
}

.progress-bar-ascii {
  font-family: var(--font-mono);
  font-size: 14px;
  color: var(--color-accent);
  letter-spacing: 1px;
  margin-bottom: 8px;
  white-space: nowrap;
}

.progress-percentage {
  font-family: var(--font-mono);
  font-size: 12px;
  color: var(--color-fg);
  text-align: right;
  letter-spacing: 0.1em;
}

/* Status text */
.status-text {
  font-family: var(--font-mono);
  font-size: 10px;
  color: var(--color-fg);
  opacity: 0.5;
  text-align: center;
  letter-spacing: 0.15em;
  margin-top: 20px;
}

/* Corner coordinates */
.loader-coords {
  position: absolute;
  font-family: var(--font-mono);
  font-size: 10px;
  color: var(--color-fg);
  opacity: 0.3;
  letter-spacing: 0.1em;
}

.top-left {
  top: 20px;
  left: 20px;
}

.top-right {
  top: 20px;
  right: 20px;
}

.bottom-left {
  bottom: 20px;
  left: 20px;
}

.bottom-right {
  bottom: 20px;
  right: 20px;
}

/* Responsive */
@media (max-width: 768px) {
  .loader-content {
    padding: 30px 40px;
    min-width: 300px;
  }

  .terminal-prompt {
    font-size: 14px;
  }

  .progress-bar-ascii {
    font-size: 10px;
  }
}
</style>