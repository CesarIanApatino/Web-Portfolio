<script setup lang="ts">
import { ref } from 'vue'
const services = [
  {
    number: '01',
    title: 'WEB APPLICATIONS',
    description: 'Modern, responsive web applications built with Vue.js, Nuxt, and Laravel.',
    features: [
      'Vue.js / Nuxt development',  
      'API integration',
      'Cloud deployment',
      'Performance optimization'
    ],
    type: 'featured'
  },
  {
    number: '02',
    title: 'AI/ML INTEGRATION',
    description: 'Machine learning solutions including sentiment analysis, NLP, and data-driven applications using Python.',
    features: [
      'Sentiment analysis systems',
      'Natural language processing',
      'Python/Flask development',
      'Database integration'
    ],
    type: 'standard'
  }
]

const workTypes = [
  { icon: '💼', label: 'FREELANCE PROJECTS', active: true },
  { icon: '🤝', label: 'CONTRACT WORK', active: true },
  { icon: '⚡', label: 'FULL-TIME OPPORTUNITIES', active: true }
]

const hoveredService = ref<number | null>(null)
</script>

<template>
  <section class="services-section">
    <div class="services-container">
      
      <!-- Section Header -->
      <div class="section-header">
        <div class="brutal-border label-box">
          <span class="label-text">[ WHAT I DO ]</span>
        </div>
        
        <h2 class="section-title">
          SERVICES
        </h2>

        <p class="section-intro">
          Specialized in building desktop applications, web platforms, 
          and AI-powered solutions. Available for freelance, contract, 
          and full-time opportunities.
        </p>
      </div>

      <!-- Services Grid -->
      <div class="services-grid">
        <div
          v-for="(service, index) in services"
          :key="service.number"
          @mouseenter="hoveredService = index"
          @mouseleave="hoveredService = null"
          :class="[
            'service-card',
            service.type === 'featured' ? 'featured' : 'standard',
            hoveredService === index ? 'hovered' : ''
          ]"
        >
          <!-- Service Number -->
          <div class="service-number">{{ service.number }}</div>

          <!-- Service Title -->
          <h3 class="service-title">{{ service.title }}</h3>

          <!-- Service Description -->
          <p class="service-description">{{ service.description }}</p>

          <!-- Service Features -->
          <ul class="service-features">
            <li 
              v-for="(feature, idx) in service.features" 
              :key="idx"
              class="feature-item"
            >
              <span class="feature-arrow">→</span>
              <span class="feature-text">{{ feature }}</span>
            </li>
          </ul>
        </div>
      </div>

      <!-- Work Types -->
      <div class="work-types">
        <div class="work-types-header">
          <span class="work-types-label">AVAILABLE FOR</span>
          <div class="divider-line"></div>
        </div>

        <div class="work-types-grid">
          <div
            v-for="(type, idx) in workTypes"
            :key="idx"
            :class="['work-type-card', type.active ? 'active' : '']"
          >
            <span class="work-icon">{{ type.icon }}</span>
            <span class="work-label">{{ type.label }}</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.services-section {
  min-height: 100vh;
  background: #000;
  padding: 6rem 1.5rem;
}

.services-container {
  max-width: 1400px;
  margin: 0 auto;
}

/* Section Header */
.section-header {
  margin-bottom: 4rem;
}

.label-box {
  display: inline-block;
  padding: 6px 16px;
  margin-bottom: 2rem;
}

.label-text {
  font-family: var(--font-mono);
  font-size: 10px;
  letter-spacing: 0.2em;
  color: #fff;
}

.section-title {
  font-family: var(--font-display);
  font-size: clamp(3rem, 8vw, 6rem);
  line-height: 0.9;
  color: #fff;
  margin: 0 0 1.5rem 0;
}

.section-intro {
  font-family: var(--font-mono);
  font-size: 14px;
  line-height: 1.8;
  color: rgba(255, 255, 255, 0.7);
  max-width: 600px;
  letter-spacing: 0.02em;
}

/* Services Grid */
.services-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 4rem;
}

.service-card {
  border: 2px solid #fff;
  padding: 2rem;
  background: #000;
  transition: all 0.3s ease;
  position: relative;
  cursor: default;
}

.service-card.featured {
  border: 3px solid #FF0000;
}

.service-card.hovered {
  transform: translateY(-4px);
}

.service-card.featured.hovered {
  background: #FF0000;
  color: #000;
}

.service-card.featured.hovered .service-number,
.service-card.featured.hovered .service-title,
.service-card.featured.hovered .service-description,
.service-card.featured.hovered .feature-text {
  color: #000;
}

.service-card.featured.hovered .feature-arrow {
  color: #fff;
}

.service-card.standard.hovered {
  background: #fff;
  color: #000;
}

.service-card.standard.hovered .service-number,
.service-card.standard.hovered .service-title,
.service-card.standard.hovered .service-description,
.service-card.standard.hovered .feature-text {
  color: #000;
}

.service-card.standard.hovered .feature-arrow {
  color: #FF0000;
}

.service-number {
  font-family: var(--font-display);
  font-size: 3rem;
  color: #FF0000;
  line-height: 1;
  margin-bottom: 1rem;
  transition: color 0.3s ease;
}

.service-title {
  font-family: var(--font-display);
  font-size: 1.5rem;
  color: #fff;
  margin: 0 0 1rem 0;
  letter-spacing: 0.05em;
  transition: color 0.3s ease;
}

.service-description {
  font-family: var(--font-mono);
  font-size: 13px;
  line-height: 1.7;
  color: rgba(255, 255, 255, 0.8);
  margin: 0 0 1.5rem 0;
  letter-spacing: 0.02em;
  transition: color 0.3s ease;
}

.service-features {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.feature-item {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  font-family: var(--font-mono);
  font-size: 12px;
  line-height: 1.5;
}

.feature-arrow {
  color: #FF0000;
  font-weight: bold;
  flex-shrink: 0;
  transition: color 0.3s ease;
}

.feature-text {
  color: rgba(255, 255, 255, 0.7);
  transition: color 0.3s ease;
}

/* Work Types */
.work-types {
  margin-bottom: 4rem;
}

.work-types-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2rem;
}

.work-types-label {
  font-family: var(--font-mono);
  font-size: 12px;
  letter-spacing: 0.15em;
  color: #fff;
  white-space: nowrap;
}

.divider-line {
  flex: 1;
  height: 1px;
  background: rgba(255, 255, 255, 0.2);
}

.work-types-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
}

.work-type-card {
  border: 2px solid rgba(255, 255, 255, 0.2);
  padding: 1.5rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  transition: all 0.3s ease;
  cursor: default;
}

.work-type-card.active {
  border-color: #FF0000;
  background: rgba(255, 0, 0, 0.05);
}

.work-type-card:hover {
  transform: translateX(4px);
  background: #fff;
  color: #000;
}

.work-icon {
  font-size: 1.5rem;
}

.work-label {
  font-family: var(--font-mono);
  font-size: 11px;
  letter-spacing: 0.15em;
  font-weight: bold;
}

/* CTA Section */
.services-cta {
  margin-top: 4rem;
}

.cta-box {
  border: 3px solid #FF0000;
  padding: 3rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 3rem;
  background: #000;
  transition: background 0.3s ease;
}

.cta-box:hover {
  background: rgba(255, 0, 0, 0.05);
}

.cta-content {
  flex: 1;
}

.cta-label {
  font-family: var(--font-mono);
  font-size: 10px;
  letter-spacing: 0.2em;
  color: #FF0000;
  display: block;
  margin-bottom: 0.5rem;
}

.cta-title {
  font-family: var(--font-display);
  font-size: clamp(1.5rem, 4vw, 2.5rem);
  color: #fff;
  margin: 0 0 0.75rem 0;
  line-height: 1.1;
}

.cta-text {
  font-family: var(--font-mono);
  font-size: 13px;
  color: rgba(255, 255, 255, 0.7);
  margin: 0;
  line-height: 1.6;
}

.cta-button {
  border: 2px solid #fff;
  padding: 1.25rem 2rem;
  font-family: var(--font-mono);
  font-size: 12px;
  letter-spacing: 0.15em;
  color: #fff;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 1rem;
  transition: all 0.3s ease;
  white-space: nowrap;
  position: relative;
  overflow: hidden;
}

.cta-button::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: #fff;
  transition: left 0.4s ease;
  z-index: 0;
}

.cta-button:hover::before {
  left: 0;
}

.cta-button:hover {
  color: #000;
  border-color: #fff;
}

.cta-button span {
  position: relative;
  z-index: 1;
}

.button-arrow {
  font-size: 18px;
  transition: transform 0.3s ease;
}

.cta-button:hover .button-arrow {
  transform: translateX(5px);
}

/* Responsive */
@media (max-width: 1024px) {
  .services-grid {
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  }

  .cta-box {
    flex-direction: column;
    text-align: center;
    align-items: center;
  }
}

@media (max-width: 768px) {
  .services-section {
    padding: 4rem 1rem;
  }

  .services-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  .work-types-grid {
    grid-template-columns: 1fr;
  }

  .cta-box {
    padding: 2rem;
  }
}
</style>