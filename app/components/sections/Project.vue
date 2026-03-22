<script setup lang="ts">
import { gsap } from 'gsap'
import type { ProjectCategory } from '~/types/stack'

const { filters, projects } = useProjects()

const activeFilter = ref<ProjectCategory>('ALL')
const listRef = ref<HTMLDivElement | null>(null)
const containerRef = ref<HTMLDivElement | null>(null)

const filteredItems = computed(() =>
  activeFilter.value === 'ALL'
    ? projects
    : projects.filter(p => p.category === activeFilter.value)
)

const containerHeight = computed(() =>
  Math.max(filteredItems.value.length * 100, 200)
)

const setFilter = (f: ProjectCategory) => {
  if (f === activeFilter.value) return
  if (!listRef.value) { activeFilter.value = f; return }

  gsap.to(listRef.value, {
    x: -40,
    opacity: 0,
    duration: 0.3,
    ease: 'power2.in',
    onComplete: () => {
      activeFilter.value = f
      gsap.fromTo(
        listRef.value,
        { x: 40, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.4, ease: 'power2.out' }
      )
    },
  })
}
</script>

<template>
  <div class="w-full" ref="containerRef">

    <div class="projects-header">
      <div class="brutal-border p-1 mb-4 inline-block">
        <span class="font-mono text-xs tracking-widest">[ SELECTED WORK ]</span>
      </div>

      <h2 class="font-display projects-title">PROJECTS</h2>

      <!-- Filter bar -->
      <div class="filter-bar">
        <button
          v-for="f in filters"
          :key="f"
          class="filter-btn font-mono"
          :class="{ 'filter-btn--active': activeFilter === f }"
          @click="setFilter(f)"
        >
          {{ f }}
        </button>
      </div>
    </div>

    <!-- Animated list wrapper -->
    <div ref="listRef" :style="{ height: `${containerHeight}px`, minHeight: '200px' }">

      <!-- Empty state -->
      <div v-if="filteredItems.length === 0" class="empty-state">
        <span class="empty-state__label">— No projects in this category yet —</span>
      </div>

      <!-- FlowingMenu — only mounts when items exist -->
      <ClientOnly v-else>
        <FlowingMenu :items="filteredItems" />
      </ClientOnly>

    </div>

  </div>
</template>

<style scoped>
.projects-header {
  margin-bottom: 3rem;
}

.projects-title {
  font-size: clamp(3rem, 7vw, 5rem);
  margin: 0 0 1.5rem 0;
  line-height: 1;
}

.filter-bar {
  display: flex;
  gap: 2rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.15);
  padding-bottom: 1rem;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
}

.filter-btn {
  font-size: 0.875rem;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  background: none;
  border: none;
  border-bottom: 2px solid transparent;
  padding-bottom: 0.25rem;
  cursor: pointer;
  color: rgba(255, 255, 255, 0.35);
  white-space: nowrap;
  transition: color 0.2s, border-color 0.2s;
}

.filter-btn--active {
  color: white;
  border-bottom-color: #dc2626;
}

.empty-state {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.empty-state__label {
  font-family: monospace;
  font-size: 0.75rem;
  letter-spacing: 0.2em;
  color: rgba(255, 255, 255, 0.25);
  text-transform: uppercase;
}
</style>