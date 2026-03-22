<script setup lang="ts">
  import { gsap } from 'gsap'
  import { ScrollTrigger } from 'gsap/ScrollTrigger'
  import type { Experience } from '~/types/stack'

  const props = defineProps<{ experience: Experience }>()

  const cardRef = ref<HTMLDivElement | null>(null)
  const achievementRefs = ref<HTMLLIElement[]>([])
  const carouselIndex = ref(0)

  let carouselTimer:         ReturnType<typeof setInterval> | null = null
  let scrollTriggerInstance: ScrollTrigger | null = null

  const isTech    = computed(() => props.experience.type === 'tech')
  const hasImages = computed(() =>
    isTech.value && (props.experience.images?.length ?? 0) > 0
  )

  const startCarousel = () => {
    if (!hasImages.value || (props.experience.images?.length ?? 0) <= 1) return
    carouselTimer = setInterval(() => {
      carouselIndex.value =
        (carouselIndex.value + 1) % (props.experience.images?.length ?? 1)
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
    scrollTriggerInstance?.kill()
  })
</script>

<template>

  <!-- ── TECH CARD ── -->
  <div v-if="isTech" ref="cardRef" class="card-tech">

    <!-- Carousel -->
    <div v-if="hasImages" class="carousel">
      <div
        class="carousel__track"
        :style="{ transform: `translateX(-${carouselIndex * 100}%)` }"
      >
        <div
          v-for="(img, i) in experience.images"
          :key="i"
          class="carousel__slide"
        >
          <img
            :src="img"
            :alt="`${experience.company} screenshot ${i + 1}`"
            class="carousel__img"
          />
        </div>
      </div>

      <div v-if="(experience.images?.length ?? 0) > 1" class="carousel__dots">
        <button
          v-for="(_, i) in experience.images"
          :key="i"
          class="carousel__dot"
          :class="{ 'carousel__dot--active': carouselIndex === i }"
          @click="carouselIndex = i"
          :aria-label="`Go to image ${i + 1}`"
        />
      </div>
    </div>

    <!-- Body -->
    <div class="card-tech__body">

      <!-- Header -->
      <div class="card-tech__header">
        <div>
          <h3 class="card-tech__company font-display">{{ experience.company }}</h3>
          <p class="card-tech__position font-mono">{{ experience.position }}</p>
        </div>
        <div class="card-tech__period font-mono">{{ experience.period }}</div>
      </div>

      <!-- Description -->
      <p class="card-tech__desc font-mono">{{ experience.description }}</p>

      <!-- Achievements -->
      <div v-if="experience.achievements.length">
        <p class="card-tech__achievements-label font-mono">Key Achievements:</p>
        <ul class="card-tech__achievements-list">
          <li
            v-for="achievement in experience.achievements"
            :key="achievement"
            :ref="el => { if (el) achievementRefs.push(el as HTMLLIElement) }"
            class="card-tech__achievement font-mono"
          >
            <span class="card-tech__bullet">▸</span>
            <span class="card-tech__achievement-text">{{ achievement }}</span>
          </li>
        </ul>
      </div>

    </div>
  </div>

  <!-- ── OTHER CARD ── -->
  <div v-else ref="cardRef" class="card-other">
    <div class="card-other__header">
      <div>
        <h3 class="card-other__company font-mono">{{ experience.company }}</h3>
        <p class="card-other__position font-mono">{{ experience.position }}</p>
      </div>
      <span class="card-other__period font-mono">{{ experience.period }}</span>
    </div>
    <p class="card-other__desc font-mono">{{ experience.description }}</p>
  </div>

</template>

<style scoped>
/* ── Tech card ── */
.card-tech {
  border: 2px solid white;
  overflow: hidden;
  cursor: default;
  transition: background 0.3s ease, border-color 0.3s ease;
}

.card-tech:hover { background: white; border-color: white; }
.card-tech:hover .card-tech__company    { color: black; }
.card-tech:hover .card-tech__desc       { color: black; opacity: 1; }
.card-tech:hover .card-tech__achievement-text { color: black; }
.card-tech:hover .card-tech__period     { border-color: black; color: black; }

.card-tech__body {
  padding: 2rem 2.5rem;
}

.card-tech__header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 1rem;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
}

.card-tech__company {
  font-size: clamp(1.4rem, 2.5vw, 2rem);
  margin: 0 0 0.4rem 0;
  transition: color 0.3s;
}

.card-tech__position {
  font-size: 0.75rem;
  color: #dc2626;
  letter-spacing: 0.15em;
  text-transform: uppercase;
}

.card-tech__period {
  border: 1px solid white;
  padding: 0.35rem 0.85rem;
  font-size: 0.65rem;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  white-space: nowrap;
  transition: border-color 0.3s, color 0.3s;
}

.card-tech__desc {
  font-size: 0.8rem;
  line-height: 1.7;
  margin-bottom: 1.5rem;
  opacity: 0.75;
  transition: color 0.3s, opacity 0.3s;
}

.card-tech__achievements-label {
  font-size: 0.65rem;
  letter-spacing: 0.2em;
  opacity: 0.45;
  margin-bottom: 0.75rem;
  text-transform: uppercase;
}

.card-tech__achievements-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
}

.card-tech__achievement {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  font-size: 0.78rem;
  line-height: 1.6;
}

.card-tech__bullet {
  color: #dc2626;
  margin-top: 2px;
  flex-shrink: 0;
}

.card-tech__achievement-text { transition: color 0.3s; }

/* ── Other card ── */
.card-other {
  border: 1px dashed rgba(255, 255, 255, 0.25);
  padding: 1.5rem 2rem;
  opacity: 0.5;
  transition: border-color 0.3s, opacity 0.3s;
}

.card-other:hover {
  opacity: 0.85;
  border-color: rgba(255, 255, 255, 0.45);
}

.card-other__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
}

.card-other__company {
  font-size: 0.95rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin: 0 0 0.3rem 0;
}

.card-other__position {
  font-size: 0.7rem;
  color: rgba(255, 255, 255, 0.4);
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

.card-other__period {
  font-size: 0.65rem;
  letter-spacing: 0.15em;
  color: rgba(255, 255, 255, 0.3);
  text-transform: uppercase;
}

.card-other__desc {
  font-size: 0.72rem;
  margin-top: 0.75rem;
  opacity: 0.5;
  line-height: 1.6;
}

/* ── Carousel ── */
.carousel {
  width: 100%;
  height: 220px;
  overflow: hidden;
  position: relative;
  background: black;
  flex-shrink: 0;
}

.carousel__track {
  display: flex;
  height: 100%;
  transition: transform 0.5s cubic-bezier(0.76, 0, 0.24, 1);
}

.carousel__slide {
  min-width: 100%;
  height: 100%;
  flex-shrink: 0;
  overflow: hidden;
}

.carousel__img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.carousel__dots {
  position: absolute;
  bottom: 0.75rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 0.4rem;
}

.carousel__dot {
  width: 0.4rem;
  height: 0.4rem;
  background: white;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
}

.carousel__dot--active {
  width: 1.5rem;
  background: #dc2626;
}
</style>