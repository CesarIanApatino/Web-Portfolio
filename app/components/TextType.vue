<script setup lang="ts">
import { useTypingAnimation }      from '~/composables/useTypingAnimation'
import { useIntersectionObserver } from '~/composables/useIntersectionObserver'
import { useCursorAnimation }      from '~/composables/useCursorAnimation'
import type { TextTypeProps }      from '~/types/stack'

const props = withDefaults(defineProps<TextTypeProps>(), {
  as:                    'div',
  className:             '',
  typingSpeed:           50,
  initialDelay:          0,
  pauseDuration:         2000,
  deletingSpeed:         30,
  loop:                  true,
  textColors:            () => [],
  showCursor:            true,
  hideCursorWhileTyping: false,
  cursorCharacter:       '|',
  cursorBlinkDuration:   0.5,
  startOnVisible:        false,
  reverseMode:           false,
})

const containerRef = useTemplateRef<Element>('containerRef')

const typingAnimation = useTypingAnimation({
  text:               props.text,
  typingSpeed:        props.typingSpeed,
  initialDelay:       props.initialDelay,
  pauseDuration:      props.pauseDuration,
  deletingSpeed:      props.deletingSpeed,
  loop:               props.loop,
  textColors:         props.textColors,
  variableSpeed:      props.variableSpeed,
  reverseMode:        props.reverseMode,
  onSentenceComplete: props.onSentenceComplete,
})

const { isVisible } = useIntersectionObserver(containerRef, { threshold: 0.1 })

const { cursorRef } = useCursorAnimation({
  showCursor:          props.showCursor,
  cursorBlinkDuration: props.cursorBlinkDuration,
  cursorClassName:     props.cursorClassName,
})

// Extracted computed — avoids IIFE logic inside template
const isCursorHidden = computed(() => {
  if (!props.hideCursorWhileTyping) return false

  const currentText = Array.isArray(props.text)
    ? props.text[typingAnimation.currentTextIndex.value]
    : props.text

  if (!currentText) return false

  return (
    typingAnimation.currentCharIndex.value < currentText.length ||
    typingAnimation.isDeleting.value
  )
})
</script>

<template>
  <component
    :is="as"
    ref="containerRef"
    :class="`inline-block whitespace-pre-wrap tracking-tight ${className}`"
    v-bind="$attrs"
  >
    <span
      class="inline"
      :style="{ color: typingAnimation.getCurrentTextColor() }"
    >
      {{ typingAnimation.displayedText }}
    </span>

    <span
      v-if="showCursor"
      ref="cursorRef"
      :class="['ml-1 inline-block opacity-100', cursorClassName, { 'hidden': isCursorHidden }]"
    >
      {{ cursorCharacter }}
    </span>
  </component>
</template>