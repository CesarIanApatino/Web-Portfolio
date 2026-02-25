<script setup lang="ts">
import { ref, computed, watch, onMounted, onBeforeUnmount } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

interface Experience {
  id: number
  company: string
  position: string
  period: string
  description: string
  achievements: string[]
  type: 'tech' | 'other'
  images?: string[]
}

const props = defineProps<{ experience: Experience }>()

const cardRef = ref<HTMLDivElement | null>(null)
const achievementRefs = ref<HTMLLIElement[]>([])
const carouselIndex = ref(0)
let carouselTimer: ReturnType<typeof setInterval> | null = null
let scrollTriggerInstance: ScrollTrigger | null = null

const isTech = computed(() => props.experience.type === 'tech')
const hasImages = computed(() => isTech.value && (props.experience.images?.length ?? 0) > 0)

// carousel
const startCarousel = () => {
  if (!hasImages.value || (props.experience.images?.length ?? 0) <= 1) return
  carouselTimer = setInterval(() => {
    carouselIndex.value = (carouselIndex.value + 1) % (props.experience.images?.length ?? 1)
  }, 3000)
}

onMounted(() => {
  startCarousel()

  if (achievementRefs.value.length) {
    gsap.set(achievementRefs.value, { opacity: 0, x: -20 })
    scrollTriggerInstance = ScrollTrigger.create({
      trigger: cardRef.value,
      start: 'top 75%',
      onEnter: () => {
        gsap.to(achievementRefs.value, {
          opacity: 1,
          x: 0,
          duration: 0.5,
          stagger: 0.1,
          ease: 'power2.out',
        })
      },
      once: true,
    })
  }
})

onBeforeUnmount(() => {
  if (carouselTimer) clearInterval(carouselTimer)
  if (scrollTriggerInstance) scrollTriggerInstance.kill()
})
</script>

<template>

  <!-- TECH CARD -->
  <div
    v-if="isTech"
    ref="cardRef"
    class="timeline-card-tech group"
    style="
      border: 2px solid white;
      overflow: hidden;
      transition: background 0.3s ease, border-color 0.3s ease;
      cursor: default;
    "
  >

    <!-- image carousel -->
    <div
      v-if="hasImages"
      style="width: 100%; height: 220px; overflow: hidden; position: relative; background: black; flex-shrink: 0;"
    >
      <div
        style="display: flex; height: 100%; transition: transform 0.5s cubic-bezier(0.76, 0, 0.24, 1);"
        :style="{ transform: `translateX(-${carouselIndex * 100}%)` }"
      >
        <div
          v-for="(img, i) in experience.images"
          :key="i"
          style="min-width: 100%; height: 100%; flex-shrink: 0; overflow: hidden;"
        >
          <img
            :src="img"
            :alt="`${experience.company} screenshot ${i + 1}`"
            style="width: 100%; height: 100%; object-fit: cover; display: block;"
          />
        </div>
      </div>

      <!-- dots -->
      <div
        v-if="(experience.images?.length ?? 0) > 1"
        style="position: absolute; bottom: 0.75rem; left: 50%; transform: translateX(-50%); display: flex; gap: 0.4rem;"
      >
        <div
          v-for="(_, i) in experience.images"
          :key="i"
          @click="carouselIndex = i"
          :style="{
            width: carouselIndex === i ? '1.5rem' : '0.4rem',
            height: '0.4rem',
            background: carouselIndex === i ? '#dc2626' : 'white',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
          }"
        />
      </div>
    </div>

    <!-- card body -->
    <div style="padding: 2rem 2.5rem;">

      <!-- header -->
      <div style="display: flex; justify-content: space-between; align-items: flex-start; gap: 1rem; margin-bottom: 1.5rem; flex-wrap: wrap;">
        <div>
          <h3
            class="font-display group-tech-title"
            style="font-size: clamp(1.4rem, 2.5vw, 2rem); margin: 0 0 0.4rem 0; transition: color 0.3s;"
          >
            {{ experience.company }}
          </h3>
          <p style="font-family: monospace; font-size: 0.75rem; color: #dc2626; letter-spacing: 0.15em; text-transform: uppercase;">
            {{ experience.position }}
          </p>
        </div>
        <div
          class="period-badge"
          style="
            border: 1px solid white;
            padding: 0.35rem 0.85rem;
            font-family: monospace;
            font-size: 0.65rem;
            letter-spacing: 0.15em;
            text-transform: uppercase;
            white-space: nowrap;
            transition: border-color 0.3s, color 0.3s;
          "
        >
          {{ experience.period }}
        </div>
      </div>

      <!-- description -->
      <p
        class="card-description"
        style="font-family: monospace; font-size: 0.8rem; line-height: 1.7; margin-bottom: 1.5rem; transition: color 0.3s; opacity: 0.75;"
      >
        {{ experience.description }}
      </p>

      <!-- achievements -->
      <div>
        <p style="font-family: monospace; font-size: 0.65rem; letter-spacing: 0.2em; opacity: 0.45; margin-bottom: 0.75rem; text-transform: uppercase;">
          Key Achievements:
        </p>
        <ul style="list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 0.6rem;">
          <li
            v-for="achievement in experience.achievements"
            :key="achievement"
            :ref="el => { if (el) achievementRefs.push(el as HTMLLIElement) }"
            style="display: flex; align-items: flex-start; gap: 0.75rem; font-family: monospace; font-size: 0.78rem; line-height: 1.6;"
          >
            <span style="color: #dc2626; margin-top: 2px; flex-shrink: 0;">▸</span>
            <span class="achievement-text" style="transition: color 0.3s;">{{ achievement }}</span>
          </li>
        </ul>
      </div>

    </div>
  </div>

  <!-- OTHER CARD -->
  <div
    v-else
    ref="cardRef"
    class="timeline-card-other"
    style="
      border: 1px dashed rgba(255,255,255,0.25);
      padding: 1.5rem 2rem;
      transition: border-color 0.3s, opacity 0.3s;
      opacity: 0.5;
    "
  >
    <div style="display: flex; justify-content: space-between; align-items: center; gap: 1rem; flex-wrap: wrap;">
      <div>
        <h3 style="font-family: monospace; font-size: 0.95rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; margin: 0 0 0.3rem 0;">
          {{ experience.company }}
        </h3>
        <p style="font-family: monospace; font-size: 0.7rem; color: rgba(255,255,255,0.4); letter-spacing: 0.1em; text-transform: uppercase;">
          {{ experience.position }}
        </p>
      </div>
      <span style="font-family: monospace; font-size: 0.65rem; letter-spacing: 0.15em; color: rgba(255,255,255,0.3); text-transform: uppercase;">
        {{ experience.period }}
      </span>
    </div>
    <p style="font-family: monospace; font-size: 0.72rem; margin-top: 0.75rem; opacity: 0.5; line-height: 1.6;">
      {{ experience.description }}
    </p>
  </div>

</template>

<style scoped>
/* TECH card hover — full invert */
.timeline-card-tech:hover {
  background: white;
  border-color: white;
}
.timeline-card-tech:hover .group-tech-title { color: black; }
.timeline-card-tech:hover .card-description { color: black; opacity: 1; }
.timeline-card-tech:hover .achievement-text { color: black; }
.timeline-card-tech:hover .period-badge {
  border-color: black;
  color: black;
}

/* OTHER card hover — just brighten */
.timeline-card-other:hover {
  opacity: 0.85;
  border-color: rgba(255,255,255,0.45);
}
</style>