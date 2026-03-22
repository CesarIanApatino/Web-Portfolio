<script setup lang="ts">
  const { initScroll, setupParallax, destroy } = useScrollAnimation()
  const showContent = ref(false)

  const handleLoaderComplete = () => {
    showContent.value = true
  }

  onMounted(() => {
    initScroll()
    setTimeout(() => setupParallax(), 100)
  })

  onUnmounted(() => {
    destroy()
  })
</script>

<template>
  <div class="relative">
    <TerminalLoader @loader-complete="handleLoaderComplete" />

    <ClientOnly>
      <Transition name="fade-in">
        <Hero v-if="showContent" />
      </Transition>
    </ClientOnly>

    <div class="relative z-20">
      <div class="h-screen" />
      <Transition name="fade-in">
        <Planx v-if="showContent" />
      </Transition>
    </div>
  </div>
</template>

<style scoped>
  .fade-in-enter-active { transition: opacity 0.8s ease-in; }
  .fade-in-enter-from   { opacity: 0; }
  .fade-in-enter-to     { opacity: 1; }
</style>