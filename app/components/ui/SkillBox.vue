<script setup lang="ts">
import type { Skill } from '~/types/stack'
defineProps<{ skill: Skill }>()
</script>

<template>
  <div
    class="skill-box"
    :class="[`skill-box--${skill.size}`, `skill-box--hover-${skill.hover}`]"
  >
    {{ skill.label }}
  </div>
</template>

<style scoped>
.skill-box {
  border: 2px solid white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--font-mono);
  font-size: 14px;
  letter-spacing: 0.1em;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  padding: 2rem;
}

/* Sizes */
.skill-box--large  { grid-column: span 2; grid-row: span 2; font-size: 18px; }
.skill-box--medium { grid-column: span 1; padding: 1.5rem; }
.skill-box--small  { grid-column: span 1; padding: 1rem; font-size: 12px; }

/* Hover variants */
.skill-box--hover-red:hover    { border-color: #ff0000; background: #ff0000; color: black; }
.skill-box--hover-invert:hover { background: white; color: black; }

/* Scan line */
.skill-box::before {
  content: '';
  position: absolute;
  top: -100%;
  left: 0;
  width: 100%;
  height: 2px;
  background: #ff0000;
  transition: top 0.3s ease;
}
.skill-box:hover::before { top: 100%; }

/* Responsive */
@media (max-width: 1024px) {
  .skill-box--large { grid-row: span 1; }
}

@media (max-width: 768px) {
  .skill-box--large  { grid-column: span 2; }
  .skill-box--medium,
  .skill-box--small  { grid-column: span 1; }
}
</style>