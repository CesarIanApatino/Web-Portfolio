<template>
  <div class="w-full" ref="containerRef">

    <div style="margin-bottom: 3rem;">

      <div class="brutal-border p-1 mb-4 inline-block">
        <span class="font-mono text-xs tracking-widest">[ SELECTED WORK ]</span>
      </div>

      <h2 class="font-display leading-tight" style="font-size: clamp(3rem, 7vw, 5rem); margin: 0 0 1.5rem 0;">
        PROJECTS
      </h2>

      <!-- Filter bar below heading -->
      <div style="display: flex; gap: 2rem; border-bottom: 1px solid rgba(255,255,255,0.15); padding-bottom: 1rem;">
        <button
          v-for="f in filters"
          :key="f"
          @click="setFilter(f)"
          :style="{
            fontFamily: 'monospace',
            fontSize: '1rem',
            textTransform: 'uppercase',
            letterSpacing: '0.15em',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            color: activeFilter === f ? 'white' : 'rgba(255,255,255,0.35)',
            borderBottom: activeFilter === f ? '2px solid #dc2626' : '2px solid transparent',
            paddingBottom: '0.25rem',
            transition: 'color 0.2s, border-color 0.2s',
          }"
        >
          {{ f }}
        </button>
      </div>
    </div>
    
    <!-- Animated items wrapper -->
    <div ref="listRef" style="height: 600px;">
      <div
        v-if="filteredItems.length === 0"
        style="
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px solid rgba(255,255,255,0.1);
        "
      >
        <span style="font-family: monospace; font-size: 0.75rem; letter-spacing: 0.2em; color: rgba(255,255,255,0.25); text-transform: uppercase;">
          — No projects yet —
        </span>
      </div>
      <ClientOnly>
        <FlowingMenu :items="filteredItems" />
      </ClientOnly>
    </div>

  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { gsap } from 'gsap'
import FlowingMenu from './FlowingMenu.vue'

type Category = 'ALL' | 'PERSONAL' | 'SCHOOL' | 'WORK'

const filters: Category[] = ['ALL', 'PERSONAL', 'SCHOOL', 'WORK']
const activeFilter = ref<Category>('ALL')
const listRef = ref<HTMLDivElement | null>(null)

const items = [
  {
    link: '#',
    text: 'Funds Recorder',
    category: 'SCHOOL',
    description: 'A Simple GUI Fund Records System with a CRUD Function with No Database use. By using File Handling and Text Manipulation',
    stack: 'Java',
    images: ['/Icon/Laravel.png', '/Icon/Three.png', '/Icon/gsap.png', '/Icon/monitor_958857.png', '/Icon/system-design.svg']
  },
  {
    link: '#',
    text: 'Web-Based Faculty Evaluation with Sentiment Analysis',
    category: 'SCHOOL',
    description: 'An AI Faculty Evaluation with Sentiment Analysis is a Institution Evaluation System with Sentiment Analysis that Identify the feedback of students if its Positive, Negative or Neutral and separate them categorically.',
    stack: 'Python, Google Colab, Flask, Render, Postgres',
  },
  {
    link: '#',
    text: 'Tourist Spot',
    category: 'SCHOOL',
    description: 'User-friendly mobile app designed to help travelers discover and explore tourist spots, featuring intuitive navigation, hotspot recommendations, and bookmarking functionality.',
    stack: 'Flutter, Firebase, Openstreetmap, Firestore',
  },
]

const filteredItems = computed(() =>
  activeFilter.value === 'ALL'
    ? items
    : items.filter(i => i.category === activeFilter.value)
)

const setFilter = (f: Category) => {
  if (f === activeFilter.value) return
  if (!listRef.value) { activeFilter.value = f; return }

  // slide out to left
  gsap.to(listRef.value, {
    x: -40,
    opacity: 0,
    duration: 0.3,
    ease: 'power2.in',
    onComplete: () => {
      activeFilter.value = f

      // reset to right, then slide in
      gsap.fromTo(
        listRef.value,
        { x: 40, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.4, ease: 'power2.out' }
      )
    }
  })
}
</script>