<script setup lang="ts">
import { ref, computed } from 'vue'
import { gsap } from 'gsap'
import FlowingMenu from './FlowingMenu.vue'

type Category = 'ALL' | 'WEB APPS' | 'DESKTOP APPS' | 'ACADEMIC' | 'EXPERIMENTAL' | 'ARCHIVED'

const filters: Category[] = ['ALL', 'WEB APPS', 'DESKTOP APPS', 'ACADEMIC', 'EXPERIMENTAL', 'ARCHIVED']
const activeFilter = ref<Category>('ALL')
const listRef = ref<HTMLDivElement | null>(null)

const items = [
  {
    link: 'https://github.com/GameSa0/Funds-Recorder',
    text: 'Funds Recorder',
    category: 'ARCHIVED',
    description: 'Desktop GUI application for managing financial records with full CRUD functionality. Built with Java Swing, featuring file-based data persistence without requiring database installation.',
    stack: 'Java, Swing, File I/O',
    features: [
      'Create, read, update, and delete financial records',
      'File-based data storage (no database required)',
      'Custom text parsing and manipulation algorithms',
      'Desktop GUI interface with Java Swing'
    ],
    images: [],
    year: '2025',
    role: 'Solo Developer'
  },
  {
    link: '#',
    text: 'Faculty Evaluation with Sentiment Analysis',
    category: 'ACADEMIC',
    description: 'AI-powered evaluation platform featuring natural language processing and sentiment analysis to automatically classify student feedback as positive, negative, or neutral with categorical separation.',
    stack: 'Python, Flask, Google Colab, PostgreSQL, Render, NLP',
    features: [
      'Sentiment analysis engine (Positive/Negative/Neutral classification)',
      'Automated feedback categorization and reporting',
      'PostgreSQL database integration for data persistence',
      'Cloud deployment on Render platform',
      'Real-time evaluation processing and analytics'
    ],
    images: ['/Images/Sentiment/Sentiment1.png', '/Images/Sentiment/Sentiment2.png', '/Images/Sentiment/Sentiment3.png', '/Images/Sentiment/Sentiment4.png', '/Images/Sentiment/Sentiment5.png'],
    year: '2025',
    role: 'Team Developer (Thesis)'
  },
  {
    link: '#',
    text: 'Tourist Spot',
    category: 'ACADEMIC',
    description: 'Cross-platform mobile application for discovering and exploring tourist destinations with real-time navigation, location-based recommendations, and personalized bookmarking features.',
    stack: 'Flutter, Firebase, Firestore, OpenStreetMap',
    features: [
      'Interactive map with OpenStreetMap integration',
      'Location-based hotspot recommendations',
      'Bookmark and save favorite destinations',
      'Real-time navigation and directions',
      'Firebase authentication and Firestore database'
    ],
    images: ['/Images/MobileApps/MobileApp1.jpg', '/Images/MobileApps/MobileApp2.jpg', '/Images/MobileApps/MobileApp3.jpg', '/Images/MobileApps/MobileApp4.jpg'],
    year: '2025',
    role: 'Solo Developer (Capstone Project)'
  },
  {
    link: '#',
    text: 'Sigma Accounting System',
    category: 'WEB APPS',
    description: 'Contributed to the development of a project in accounting system as part of the Sigma project suite, designed to streamline financial management and reporting for project stakeholders.',
    stack: 'Nuxt.js, Laravel, MySQL, Tailwind CSS, TypeScript, PHP',
    features: [
      'Accounting dashboard with real-time financial data visualization',
      'Automated financial reporting and analytics',
      'Role-based access control for secure data management',
      'Integration with Sigma project suite for seamless data flow',
    ],
    images: ['/Images/1.png'],
    year: '2025',
    role: 'Junior Developer (Internship)'
  },
  {
    link: '#',
    text: 'Predicting Graduate Competitiveness',
    category: 'ACADEMIC',
    description: 'Contributed to the development of a web application that predicts graduate competitiveness based on various factors using a Random Forest machine learning model, providing insights and recommendations for career development.',
    stack: 'Python, Google Colab, Pandas, scikit-learn, Flask, Render',
    features: [
      'Contributed to the development and training of a Random Forest model to predict graduate competitiveness',
      'Performed data preprocessing and feature engineering to improve model accuracy and performance',
      'Designed and implemented an interactive web interface for entering graduate data and displaying prediction results',
      'Ensured a unified evaluation process by maintaining consistent question sets across both the Render app and Google Forms',
    ],
    images: ['/Images/Tracers/Tracer1.png', '/Images/Tracers/tracer2.png', '/Images/Tracers/tracer3.png'],
    year: '2025',
    role: 'Solo Developer (Thesis)'
  },
  {
    link: '#',
    text: 'React Practice Project',
    category: 'EXPERIMENTAL',
    description: 'A personal project built with React to practice and explore frontend development concepts, featuring a simple user interface and interactive components.',
    stack: 'React, Tailwind CSS, TypeScript',
    features: [
      'Compilation of basic React concepts and patterns for practice and learning purposes',
      'Implementation of interactive components and state management',
      'Designed a clean and responsive user interface using Tailwind CSS',
      'Focus on code organization and best practices for maintainability and scalability',
    ],
    images: [],
    year: '2025',
    role: 'Solo Developer (Practice)'
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
      <div style="display: flex; gap: 2rem; border-bottom: 1px solid rgba(255,255,255,0.15); padding-bottom: 1rem; overflow-x: auto;">
        <button
          v-for="f in filters"
          :key="f"
          @click="setFilter(f)"
          :style="{
            fontFamily: 'monospace',
            fontSize: '0.875rem',
            textTransform: 'uppercase',
            letterSpacing: '0.15em',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            color: activeFilter === f ? 'white' : 'rgba(255,255,255,0.35)',
            borderBottom: activeFilter === f ? '2px solid #dc2626' : '2px solid transparent',
            paddingBottom: '0.25rem',
            transition: 'color 0.2s, border-color 0.2s',
            whiteSpace: 'nowrap',
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
          — No projects in this category yet —
        </span>
      </div>
      <ClientOnly>
        <FlowingMenu :items="filteredItems" />
      </ClientOnly>
    </div>

  </div>
</template>

<style scoped>
/* Responsive filter bar */
@media (max-width: 768px) {
  div[style*="display: flex; gap: 2rem"] {
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
  }
}
</style>