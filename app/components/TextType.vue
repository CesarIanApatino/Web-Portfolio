<script setup lang="ts">
import { useTypingAnimation } from '../composables/useTypingAnimation'
import { useIntersectionObserver } from '../composables/useIntersectionObserver'
import { useCursorAnimation } from '../composables/useCursorAnimation'

interface TextTypeProps {
  className?: string;
  showCursor?: boolean;
  hideCursorWhileTyping?: boolean;
  cursorCharacter?: string;
  cursorBlinkDuration?: number;
  cursorClassName?: string;
  text: string | string[];
  as?: string;
  typingSpeed?: number;
  initialDelay?: number;
  pauseDuration?: number;
  deletingSpeed?: number;
  loop?: boolean;
  textColors?: string[];
  variableSpeed?: { min: number; max: number };
  onSentenceComplete?: (sentence: string, index: number) => void;
  startOnVisible?: boolean;
  reverseMode?: boolean;
}

const props = withDefaults(defineProps<TextTypeProps>(), {
  as: 'div',
  typingSpeed: 50,
  initialDelay: 0,
  pauseDuration: 2000,
  deletingSpeed: 30,
  loop: true,
  className: '',
  showCursor: true,
  hideCursorWhileTyping: false,
  cursorCharacter: '|',
  cursorBlinkDuration: 0.5,
  textColors: () => [],
  startOnVisible: false,
  reverseMode: false
});

const containerRef = useTemplateRef<Element>('containerRef')

const typingAnimation = useTypingAnimation({
  text: props.text,
  typingSpeed: props.typingSpeed,
  initialDelay: props.initialDelay,
  pauseDuration: props.pauseDuration,
  deletingSpeed: props.deletingSpeed,
  loop: props.loop,
  textColors: props.textColors,
  variableSpeed: props.variableSpeed,
  reverseMode: props.reverseMode,
  onSentenceComplete: props.onSentenceComplete
})

const { isVisible } = useIntersectionObserver(containerRef, {
  threshold: 0.1
})

const { cursorRef } = useCursorAnimation({
  showCursor: props.showCursor,
  cursorBlinkDuration: props.cursorBlinkDuration,
  cursorClassName: props.cursorClassName
})
</script>

<template>
  <component
    :is="as"
    ref="containerRef"
    :class="`inline-block whitespace-pre-wrap tracking-tight ${className}`"
    v-bind="$attrs"
  >
    <span class="inline" :style="{ color: typingAnimation.getCurrentTextColor() }">
      {{ typingAnimation.displayedText }}
    </span>
    <span
      v-if="showCursor"
      ref="cursorRef"
      :class="`ml-1 inline-block opacity-100 ${
        hideCursorWhileTyping && (() => {
          const currentText = Array.isArray(props.text) ? props.text[typingAnimation.currentTextIndex.value] : props.text;
          return currentText && (typingAnimation.currentCharIndex.value < currentText.length || typingAnimation.isDeleting.value);
        })() ? 'hidden' : ''
      } ${cursorClassName}`"
    >
      {{ cursorCharacter }}
    </span>
  </component>
</template>
