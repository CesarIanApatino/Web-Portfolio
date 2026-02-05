<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const cursorX = ref(0)
const cursorY = ref(0)
const cursorSize = ref(20)
const isHovering = ref(false)

const updateCursor = (e: MouseEvent) => {
  cursorX.value = e.clientX
  cursorY.value = e.clientY
}

const handleMouseEnter = () => {
  isHovering.value = true
  cursorSize.value = 40
}

const handleMouseLeave = () => {
  isHovering.value = false
  cursorSize.value = 20
}

onMounted(() => {
  window.addEventListener('mousemove', updateCursor)
  const interactiveElements = document.querySelectorAll('a, button, [role="button"], .cursor-hover')
  interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', handleMouseEnter)
    el.addEventListener('mouseleave', handleMouseLeave)
  })
})

onUnmounted(() => {
  window.removeEventListener('mousemove', updateCursor)
  
  const interactiveElements = document.querySelectorAll('a, button, [role="button"], .cursor-hover')
  interactiveElements.forEach(el => {
    el.removeEventListener('mouseenter', handleMouseEnter)
    el.removeEventListener('mouseleave', handleMouseLeave)
  })
})
</script>

<template>
  <div class="custom-cursor-wrapper">
    <div 
      class="cursor-dot"
      :style="{
        left: `${cursorX}px`,
        top: `${cursorY}px`,
        width: `${cursorSize}px`,
        height: `${cursorSize}px`
      }"
      :class="{ 'cursor-hover': isHovering }"
    />
    
    <div 
      class="cursor-outline"
      :style="{
        left: `${cursorX}px`,
        top: `${cursorY}px`
      }"
      :class="{ 'cursor-hover': isHovering }"
    />
  </div>
</template>

<style scoped>
.custom-cursor-wrapper {
  pointer-events: none;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 9999;
}

.cursor-dot {
  position: fixed;
  transform: translate(-50%, -50%);
  border: 2px solid #fff;
  border-radius: 0;
  transition: width 0.3s ease, height 0.3s ease, background-color 0.3s ease;
  pointer-events: none;
  z-index: 9999;
  mix-blend-mode: difference;
}

.cursor-dot.cursor-hover {
  background-color: rgba(255, 0, 0, 0.3);
  border-color: #ff0000;
}

.cursor-outline {
  position: fixed;
  width: 40px;
  height: 40px;
  transform: translate(-50%, -50%);
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 0;
  transition: all 0.15s ease-out;
  pointer-events: none;
  z-index: 9998;
}

.cursor-outline.cursor-hover {
  width: 60px;
  height: 60px;
  border-color: rgba(255, 0, 0, 0.5);
}

:global(body) {
  cursor: none;
}

:global(a, button, [role="button"]) {
  cursor: none;
}

@media (max-width: 768px) {
  .custom-cursor-wrapper {
    display: none;
  }
  
  :global(body),
  :global(a, button, [role="button"]) {
    cursor: auto;
  }
}
</style>