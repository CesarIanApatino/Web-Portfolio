<script setup lang="ts">
  const cursorX    = ref(0)
  const cursorY    = ref(0)
  const isHovering = ref(false)

  const INTERACTIVE = 'a, button, [role="button"], .cursor-hover'

  const updateCursor = (e: MouseEvent) => {
    cursorX.value = e.clientX
    cursorY.value = e.clientY
    const target = e.target as Element
    isHovering.value = !!target.closest(INTERACTIVE)
  }

  onMounted(() => {
    window.addEventListener('mousemove', updateCursor)
  })

  onUnmounted(() => {
    window.removeEventListener('mousemove', updateCursor)
  })
</script>

<template>
  <div class="cursor-wrapper">

    <div
      class="cursor-dot"
      :class="{ 'cursor-dot--hover': isHovering }"
      :style="{ left: `${cursorX}px`, top: `${cursorY}px` }"
    />

    <div
      class="cursor-ring"
      :class="{ 'cursor-ring--hover': isHovering }"
      :style="{ left: `${cursorX}px`, top: `${cursorY}px` }"
    />

  </div>
</template>

<style scoped>
  .cursor-wrapper {
    pointer-events: none;
    position: fixed;
    inset: 0;
    z-index: 99999;
  }

  .cursor-dot {
    position: fixed;
    width: 8px;
    height: 8px;
    background: #ffffff;
    transform: translate(-50%, -50%);
    pointer-events: none;
    z-index: 99999;
    transition: width 0.2s ease, height 0.2s ease, background 0.2s ease;
    mix-blend-mode: difference;
  }

  .cursor-dot--hover {
    width: 12px;
    height: 12px;
    background: #ff0000;
  }

  .cursor-ring {
    position: fixed;
    width: 36px;
    height: 36px;
    border: 2px solid #ffffff;
    transform: translate(-50%, -50%);
    pointer-events: none;
    z-index: 99998;
    transition: width 0.25s ease, height 0.25s ease,
                border-color 0.25s ease, border-width 0.25s ease;
    mix-blend-mode: difference;
  }

  .cursor-ring--hover {
    width: 56px;
    height: 56px;
    border-color: #ff0000;
  }

  :global(body)                        { cursor: none; }
  :global(a, button, [role="button"])  { cursor: none; }

  @media (max-width: 768px) {
    .cursor-wrapper                     { display: none; }
    :global(body)                       { cursor: auto; }
    :global(a, button, [role="button"]) { cursor: auto; }
  }
</style>