import { onMounted, onBeforeUnmount, useTemplateRef } from 'vue'
import { gsap } from 'gsap'

interface CursorAnimationOptions {
  showCursor?: boolean
  cursorBlinkDuration?: number
  cursorClassName?: string
}

export function useCursorAnimation(options: CursorAnimationOptions = {}) {
  const cursorRef = useTemplateRef('cursorRef')
  let timeline: gsap.core.Tween | null = null

  const startAnimation = () => {
    if (!options.showCursor || !cursorRef.value) return

    gsap.set(cursorRef.value, { opacity: 1 })
    timeline = gsap.to(cursorRef.value, {
      opacity: 0,
      duration: options.cursorBlinkDuration || 0.5,
      repeat: -1,
      yoyo: true,
      ease: 'power2.inOut'
    })
  }

  const stopAnimation = () => {
    if (timeline) {
      timeline.kill()
      timeline = null
    }
  }

  onMounted(() => {
    startAnimation()
  })

  onBeforeUnmount(() => {
    stopAnimation()
  })

  return {
    cursorRef,
    startAnimation,
    stopAnimation
  }
}
