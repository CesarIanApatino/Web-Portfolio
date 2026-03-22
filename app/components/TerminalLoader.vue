<script setup lang="ts">
  const emit = defineEmits<{ 'loader-complete': [] }>()

  const {
    TICK_INTERVAL,
    COMPLETE_DELAY,
    SKIP_DELAY,
    buildProgressBar,
    getStageText,
    hasSeenLoader,
    markLoaderSeen,
    getRealProgress,
  } = usePortfolioLoader()

  const isLoading      = ref(true)
  const isCRTOut       = ref(false)
  const showSkip       = ref(false)
  const progress       = ref(0)
  const loadingText    = ref('INITIALIZING')
  const glitchText     = ref('INITIALIZING')
  const progressBlocks = computed(() => buildProgressBar(progress.value))

  const GLITCH_CHARS = '!@#$%^&*<>[]{}|/\\'
  let glitchInterval: ReturnType<typeof setInterval> | null = null

  const startGlitch = (targetText: string) => {
    if (glitchInterval) clearInterval(glitchInterval)

    let iterations = 0
    const maxIterations = 8

    glitchInterval = setInterval(() => {
      glitchText.value = targetText
        .split('')
        .map((char, i) => {
          if (char === ' ') return ' '
          if (i < iterations) return targetText[i]
          return GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)]
        })
        .join('')

      iterations++
      if (iterations > maxIterations + targetText.length) {
        glitchText.value = targetText
        if (glitchInterval) clearInterval(glitchInterval)
      }
    }, 40)
  }

  const triggerCRTExit = () => {
    isCRTOut.value = true
    setTimeout(() => {
      isLoading.value = false
      emit('loader-complete')
    }, 600)
  }

  const complete = () => {
    progress.value    = 100
    loadingText.value = 'COMPLETE'
    startGlitch('COMPLETE')
    markLoaderSeen()
    setTimeout(() => triggerCRTExit(), COMPLETE_DELAY)
  }

  const skip = () => {
    markLoaderSeen()
    triggerCRTExit()
  }

  onMounted(async () => {
    if (hasSeenLoader()) {
      isLoading.value = false
      emit('loader-complete')
      return
    }

    setTimeout(() => { showSkip.value = true }, SKIP_DELAY)

    const realLoadPromise = getRealProgress()

    let fakeProgress = 0
    const interval = setInterval(() => {
      fakeProgress += Math.random() * 5 + 2

      if (fakeProgress >= 90) fakeProgress = 90

      progress.value    = fakeProgress
      const newText     = getStageText(fakeProgress)

      if (newText !== loadingText.value) {
        loadingText.value = newText
        startGlitch(newText)
      }
    }, TICK_INTERVAL)

    await realLoadPromise
    clearInterval(interval)
    complete()
  })

  onUnmounted(() => {
    if (glitchInterval) clearInterval(glitchInterval)
  })
</script>

<template>
  <div
    v-if="isLoading"
    class="loader"
    :class="{ 'loader--crt-out': isCRTOut }"
  >

    <div class="loader__scanline loader__scanline--1" />
    <div class="loader__scanline loader__scanline--2" />
    <div class="loader__scanline loader__scanline--3" />

    <div class="loader__crt-line" />

    <div class="loader__box">
      <div class="loader__border">
        <div class="loader__content">

          <div class="loader__prompt font-mono">
            <span class="loader__prompt-symbol">></span>
            <span class="loader__prompt-text">{{ glitchText }}</span>
            <span class="loader__cursor">_</span>
          </div>

          <div class="loader__progress">
            <div class="loader__progress-bar font-mono">{{ progressBlocks }}</div>
            <div class="loader__progress-pct font-mono">{{ Math.floor(progress) }}%</div>
          </div>

          <div class="loader__status font-mono">
            [ LOADING APATINO'S PORTFOLIO ]
          </div>

        </div>
      </div>
    </div>

    <Transition name="skip-fade">
      <button
        v-if="showSkip && !isCRTOut"
        class="loader__skip font-mono"
        @click="skip"
      >
        [ SKIP ]
      </button>
    </Transition>

    <div class="loader__coord loader__coord--tl font-mono">[0x00]</div>
    <div class="loader__coord loader__coord--tr font-mono">[0xFF]</div>
    <div class="loader__coord loader__coord--bl font-mono">[SYS]</div>
    <div class="loader__coord loader__coord--br font-mono">[OK]</div>

  </div>
</template>

<style scoped>
  .loader {
    position: fixed;
    inset: 0;
    background: #000;
    z-index: 99999;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
  }

  .loader--crt-out {
    animation: crt-off 0.6s ease-in forwards;
  }

  .loader__crt-line {
    position: absolute;
    left: 0;
    width: 100%;
    height: 2px;
    background: white;
    opacity: 0;
    pointer-events: none;
    z-index: 10;
  }

  .loader--crt-out .loader__crt-line {
    animation: crt-line-flash 0.6s ease-in forwards;
  }

  @keyframes crt-off {
    0%   { transform: scaleY(1);    opacity: 1; }
    40%  { transform: scaleY(0.01); opacity: 1; }
    60%  { transform: scaleY(0.01); opacity: 1; }
    100% { transform: scaleY(0.01); opacity: 0; }
  }

  @keyframes crt-line-flash {
    0%   { opacity: 0; }
    35%  { opacity: 0; }
    45%  { opacity: 1; }
    80%  { opacity: 1; }
    100% { opacity: 0; }
  }

  .loader__scanline {
    position: absolute;
    left: 0;
    width: 100%;
    height: 2px;
    background: #ff0000;
    pointer-events: none;
  }

  .loader__scanline--1 { opacity: 0.6; animation: scan 2s linear infinite; }
  .loader__scanline--2 { opacity: 0.3; animation: scan 3s linear infinite 0.5s; }
  .loader__scanline--3 { opacity: 0.4; animation: scan 2.5s linear infinite 1s; }

  @keyframes scan {
    from { top: -2px; }
    to   { top: 100%; }
  }

  .loader__box {
    position: relative;
    z-index: 10;
    padding: 3px;
    background: #ff0000;
    animation: glitch-border 0.3s infinite;
  }

  @keyframes glitch-border {
    0%, 90%, 100% { transform: translate(0, 0); }
    92%           { transform: translate(-2px,  2px); }
    94%           { transform: translate( 2px, -2px); }
    96%           { transform: translate(-2px, -2px); }
    98%           { transform: translate( 2px,  2px); }
  }

  .loader__border {
    border: 2px solid white;
    background: #000;
    padding: 2px;
  }

  .loader__content {
    border: 2px solid white;
    padding: 40px 60px;
    min-width: 500px;
    background: #000;
  }

  .loader__prompt {
    font-size: 18px;
    color: #00ff00;
    margin-bottom: 20px;
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .loader__prompt-symbol { color: #ff0000; font-weight: bold; }
  .loader__prompt-text   { letter-spacing: 0.1em; }

  .loader__cursor {
    color: #00ff00;
    animation: blink 1s infinite;
  }

  @keyframes blink {
    0%, 50%   { opacity: 1; }
    51%, 100% { opacity: 0; }
  }

  .loader__progress     { margin-bottom: 20px; }

  .loader__progress-bar {
    font-size: 14px;
    color: #ff0000;
    letter-spacing: 1px;
    margin-bottom: 8px;
    white-space: nowrap;
  }

  .loader__progress-pct {
    font-size: 12px;
    color: white;
    text-align: right;
    letter-spacing: 0.1em;
  }

  .loader__status {
    font-size: 10px;
    color: white;
    opacity: 0.5;
    text-align: center;
    letter-spacing: 0.15em;
    margin-top: 20px;
  }

  .loader__skip {
    position: absolute;
    bottom: 2rem;
    right: 50%;
    transform: translateX(50%);
    background: transparent;
    border: 1px solid rgba(255, 255, 255, 0.3);
    color: rgba(255, 255, 255, 0.4);
    font-size: 10px;
    letter-spacing: 0.2em;
    padding: 6px 16px;
    cursor: pointer;
    transition: color 0.2s, border-color 0.2s;
    z-index: 20;
  }

  .loader__skip:hover {
    color: white;
    border-color: #ff0000;
    color: #ff0000;
  }

  .skip-fade-enter-active { transition: opacity 0.5s ease; }
  .skip-fade-enter-from   { opacity: 0; }

  .loader__coord {
    position: absolute;
    font-size: 10px;
    color: white;
    opacity: 0.3;
    letter-spacing: 0.1em;
  }

  .loader__coord--tl { top: 20px;    left: 20px; }
  .loader__coord--tr { top: 20px;    right: 20px; }
  .loader__coord--bl { bottom: 20px; left: 20px; }
  .loader__coord--br { bottom: 20px; right: 20px; }

  @media (max-width: 768px) {
    .loader__content      { padding: 30px 40px; min-width: 300px; }
    .loader__prompt       { font-size: 14px; }
    .loader__progress-bar { font-size: 10px; }
  }
</style>