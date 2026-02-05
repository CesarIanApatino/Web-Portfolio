import { ref, onMounted, onBeforeUnmount, type Ref, type ShallowRef } from 'vue'

interface IntersectionObserverOptions {
  threshold?: number
  root?: Element | null
  rootMargin?: string
}

export function useIntersectionObserver(
  target: Ref<Element | undefined | null> | ShallowRef<Element | undefined | null>,
  options: IntersectionObserverOptions = {}
) {
  const isVisible = ref(false)
  const isSupported = 'IntersectionObserver' in window

  let observer: IntersectionObserver | null = null

  const stop = () => {
    if (observer) {
      observer.disconnect()
      observer = null
    }
  }

  onMounted(() => {
    if (!isSupported) {
      isVisible.value = true
      return
    }

    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisible.value = entry.isIntersecting
        })
      },
      {
        threshold: options.threshold || 0.1,
        root: options.root || null,
        rootMargin: options.rootMargin || '0px'
      }
    )

    if (target.value) {
      observer.observe(target.value)
    }
  })

  onBeforeUnmount(() => {
    stop()
  })

  return {
    isVisible,
    isSupported,
    stop
  }
}
