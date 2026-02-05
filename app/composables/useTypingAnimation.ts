import { ref, computed, watch } from 'vue'

interface TypingAnimationOptions {
  text: string | string[]
  typingSpeed?: number
  initialDelay?: number
  pauseDuration?: number
  deletingSpeed?: number
  loop?: boolean
  textColors?: string[]
  variableSpeed?: { min: number; max: number }
  reverseMode?: boolean
  onSentenceComplete?: (sentence: string, index: number) => void
}

export function useTypingAnimation(options: TypingAnimationOptions) {
  const displayedText = ref('')
  const currentCharIndex = ref(0)
  const isDeleting = ref(false)
  const currentTextIndex = ref(0)
  const isVisible = ref(true)

  const textArray = computed(() => 
    Array.isArray(options.text) ? options.text : [options.text]
  )

  const getRandomSpeed = () => {
    if (!options.variableSpeed) return options.typingSpeed || 50
    const { min, max } = options.variableSpeed
    return Math.random() * (max - min) + min
  }

  const getCurrentTextColor = () => {
    if (!options.textColors?.length) return '#ffffff'
    return options.textColors[currentTextIndex.value % options.textColors.length]
  }

  let timeout: ReturnType<typeof setTimeout> | null = null

  const clearTimeoutIfNeeded = () => {
    if (timeout) clearTimeout(timeout)
  }

  const executeTypingAnimation = () => {
    const currentText = textArray.value[currentTextIndex.value]
    
    if (!currentText) {
      if (currentTextIndex.value === textArray.value.length - 1 && !options.loop) return
      currentTextIndex.value = (currentTextIndex.value + 1) % textArray.value.length
      currentCharIndex.value = 0
      timeout = setTimeout(() => executeTypingAnimation(), options.pauseDuration || 2000)
      return
    }
    
    const processedText = options.reverseMode 
      ? currentText.split('').reverse().join('') 
      : currentText

    if (isDeleting.value) {
      if (displayedText.value === '') {
        isDeleting.value = false
        if (currentTextIndex.value === textArray.value.length - 1 && !options.loop) return

        const currentSentence = textArray.value[currentTextIndex.value]
        if (currentSentence) {
          options.onSentenceComplete?.(currentSentence, currentTextIndex.value)
        }

        currentTextIndex.value = (currentTextIndex.value + 1) % textArray.value.length
        currentCharIndex.value = 0
        timeout = setTimeout(() => {}, options.pauseDuration || 2000)
      } else {
        timeout = setTimeout(() => {
          displayedText.value = displayedText.value.slice(0, -1)
        }, options.deletingSpeed || 30)
      }
    } else {
      if (currentCharIndex.value < processedText.length) {
        timeout = setTimeout(
          () => {
            displayedText.value += processedText[currentCharIndex.value]
            currentCharIndex.value += 1
          },
          options.variableSpeed ? getRandomSpeed() : (options.typingSpeed || 50)
        )
      } else if (textArray.value.length > 1) {
        timeout = setTimeout(() => {
          isDeleting.value = true
        }, options.pauseDuration || 2000)
      }
    }
  }

  const startAnimation = () => {
    isVisible.value = true
  }

  const stopAnimation = () => {
    isVisible.value = false
    clearTimeoutIfNeeded()
  }

  watch(
    [displayedText, currentCharIndex, isDeleting, isVisible],
    () => {
      if (!isVisible.value) return
      clearTimeoutIfNeeded()

      if (currentCharIndex.value === 0 && !isDeleting.value && displayedText.value === '') {
        timeout = setTimeout(() => {
          executeTypingAnimation()
        }, options.initialDelay || 0)
      } else {
        executeTypingAnimation()
      }
    },
    { immediate: true }
  )

  return {
    displayedText,
    currentCharIndex,
    isDeleting,
    currentTextIndex,
    isVisible,
    getCurrentTextColor,
    startAnimation,
    stopAnimation,
    clearTimeoutIfNeeded
  }
}
