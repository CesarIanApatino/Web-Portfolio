<script setup lang="ts">
interface Experience {
  id: number
  company: string
  position: string
  period: string
  description: string
  achievements: string[]
}

interface Props {
  experience: Experience
}

defineProps<Props>()
</script>

<template>
  <div class="brutal-border p-8 md:p-12 hover:brutal-border-red transition-all duration-300 group">
    <!-- Header -->
    <div class="flex flex-col md:flex-row justify-between gap-4 mb-6">
      <div class="flex-1">
        <h3 class="font-display text-2xl md:text-3xl mb-2 group-hover:text-brutalist-red transition-colors">
          {{ experience.company }}
        </h3>
        <p class="font-mono text-sm text-brutalist-red tracking-widest">
          {{ experience.position }}
        </p>
      </div>
      <div class="brutal-border px-4 py-2 inline-block h-fit">
        <span class="font-mono text-xs tracking-widest">{{ experience.period }}</span>
      </div>
    </div>
    
    <!-- Description -->
    <p class="font-mono text-sm opacity-70 mb-6 leading-relaxed">
      {{ experience.description }}
    </p>
    
    <!-- Achievements -->
    <div class="space-y-2">
      <p class="font-mono text-xs tracking-widest opacity-50 mb-3">KEY ACHIEVEMENTS:</p>
      <ul class="space-y-2">
        <li 
          v-for="achievement in experience.achievements" 
          :key="achievement"
          class="font-mono text-sm opacity-80 flex items-start gap-3 hover:opacity-100 transition-opacity"
        >
          <span class="text-brutalist-red mt-1">▸</span>
          <span>{{ achievement }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.group:hover h3 {
  text-shadow: 2px 2px 0 rgba(255, 0, 0, 0.3);
}
</style>