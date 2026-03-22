<script setup lang="ts">
  import type { TechItem } from '~/types/stack'
  defineProps<{ item: TechItem }>()
</script>

<template>
  <div class="group flex flex-col items-center gap-2">
    <div class="icon-box" :style="item.style">
      <img
        :src="item.icon"
        :alt="item.name"
        class="icon-img"
        :class="{ 'icon-img--no-filter': item.style?.background }"
      />
    </div>
    <span class="tech-label">{{ item.name }}</span>
  </div>
</template>

<style scoped>
  .icon-box {
    width: 52px;
    height: 52px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid rgba(255, 255, 255, 0.15);
    padding: 8px;
    box-sizing: border-box;
  }

  .icon-img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    filter: brightness(0) invert(1); /* default: make dark SVGs white */
  }

  /* Icons with a custom background already have correct colors — don't invert */
  .icon-img--no-filter {
    filter: none;
  }

  .tech-label {
    font-size: 9px;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    font-weight: 900;
    color: rgba(255, 255, 255, 0.4);
    text-align: center;
  }
</style>