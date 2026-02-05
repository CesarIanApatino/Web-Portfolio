<script setup lang="ts">
interface Project {
  id: number
  title: string
  category: string
  description: string
  year: string
  tags: string[]
  demoUrl: string
  codeUrl: string
}

interface Props {
  project: Project
  index: number
}

defineProps<Props>()
</script>

<template>
  <div class="brutal-border hover:brutal-border-red transition-all duration-300 group">
    <div class="p-8 md:p-12">
      <!-- Header -->
      <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
        <div class="flex items-center gap-6">
          <span class="font-mono text-xs opacity-50">
            {{ String(index + 1).padStart(3, '0') }}
          </span>
          <h3 class="font-display text-2xl md:text-4xl group-hover:text-brutalist-red transition-colors">
            {{ project.title }}
          </h3>
        </div>
        <div class="brutal-border px-4 py-2 inline-block">
          <span class="font-mono text-xs tracking-widest">
            {{ project.category }}
          </span>
        </div>
      </div>
      
      <!-- Description -->
      <div class="flex flex-col md:flex-row justify-between gap-4 mb-6">
        <p class="font-mono text-sm opacity-70 md:w-2/3">
          {{ project.description }}
        </p>
        <span class="font-mono text-xs opacity-50">
          {{ project.year }}
        </span>
      </div>

      <!-- Tech Tags -->
      <div class="flex flex-wrap gap-2 mb-8">
        <span 
          v-for="tag in project.tags" 
          :key="tag"
          class="brutal-border px-3 py-1 text-xs font-mono opacity-70 hover:opacity-100 transition-opacity"
        >
          {{ tag }}
        </span>
      </div>

      <!-- Action Buttons -->
      <div class="flex flex-wrap gap-4">
        <a 
          :href="project.demoUrl" 
          target="_blank"
          rel="noopener noreferrer"
          class="brutal-border px-6 py-3 text-xs font-mono tracking-widest hover:bg-white hover:text-black transition-all duration-300 inline-block"
        >
          VIEW PROJECT →
        </a>
        <a 
          :href="project.codeUrl" 
          target="_blank"
          rel="noopener noreferrer"
          class="brutal-border-red px-6 py-3 text-xs font-mono tracking-widest hover:bg-brutalist-red hover:text-black transition-all duration-300 inline-block"
        >
          SOURCE CODE
        </a>
      </div>
    </div>
  </div>
</template>

<style scoped>
a {
  transition: all 0.3s ease;
}
</style>