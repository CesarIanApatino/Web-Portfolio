<script setup lang="ts">
  import { gsap } from 'gsap'
  import type { Project } from '~/types/stack'

  const props = withDefaults(defineProps<{ items?: Project[] }>(), {
    items: () => [],
  })

  const itemRefs = ref<(HTMLDivElement | null)[]>([])
  const marqueeRefs = ref<(HTMLDivElement | null)[]>([])
  const marqueeInnerRefs = ref<(HTMLDivElement | null)[]>([])
  const hoveredIdx = ref<number | null>(null)
  const activeItem = ref<Project | null>(null)
  const carouselIndex = ref(0)
  const lightboxImage = ref<string | null>(null)
  let carouselTimer: ReturnType<typeof setInterval> | null = null


  const setItemRef = (el: HTMLDivElement | null, idx: number) => {
    if (el) itemRefs.value[idx] = el
  }

  const findClosestEdge = (
    mouseX: number, mouseY: number,
    width: number, height: number
  ) => {
    const top    = Math.pow(mouseX - width / 2, 2) + Math.pow(mouseY, 2)
    const bottom = Math.pow(mouseX - width / 2, 2) + Math.pow(mouseY - height, 2)
    return top < bottom ? 'top' : 'bottom'
  }

  const rowHeight = computed(() => {
    const count = props.items.length
    if (count === 0) return '100px'
    return `${100 / count}%`
  })


  const handleMouseEnter = (ev: MouseEvent, idx: number) => {
    hoveredIdx.value = idx
    const item  = itemRefs.value[idx]
    const mq    = marqueeRefs.value[idx]
    const mqIn  = marqueeInnerRefs.value[idx]
    if (!item || !mq || !mqIn) return

    const rect = item.getBoundingClientRect()
    const edge = findClosestEdge(
      ev.clientX - rect.left, ev.clientY - rect.top,
      rect.width, rect.height
    )

    gsap.timeline({ defaults: { duration: 0.5, ease: 'expo.out' } })
      .set(mq,   { y: edge === 'top' ? '-100%' : '100%' })
      .set(mqIn, { y: edge === 'top' ? '100%'  : '-100%' })
      .to([mq, mqIn], { y: '0%' })
  }

  const handleMouseLeave = (ev: MouseEvent, idx: number) => {
    hoveredIdx.value = null
    const item  = itemRefs.value[idx]
    const mq    = marqueeRefs.value[idx]
    const mqIn  = marqueeInnerRefs.value[idx]
    if (!item || !mq || !mqIn) return

    const rect = item.getBoundingClientRect()
    const edge = findClosestEdge(
      ev.clientX - rect.left, ev.clientY - rect.top,
      rect.width, rect.height
    )

    gsap.timeline({ defaults: { duration: 0.5, ease: 'expo.out' } })
      .to(mq,   { y: edge === 'top' ? '-100%' : '100%' })
      .to(mqIn, { y: edge === 'top' ? '100%'  : '-100%' }, '<')
  }


  const activeImages = computed<string[]>(() => {
    if (!activeItem.value) return []
    return activeItem.value.images?.length ? activeItem.value.images : []
  })

  const stackTags = computed<string[]>(() =>
    activeItem.value?.stack?.split(',').map(s => s.trim()).filter(Boolean) ?? []
  )

  watch(activeItem, (val) => {
    carouselIndex.value = 0
    if (carouselTimer) clearInterval(carouselTimer)
    if (val && activeImages.value.length > 1) {
      carouselTimer = setInterval(() => {
        carouselIndex.value = (carouselIndex.value + 1) % activeImages.value.length
      }, 3000)
    }
  })

  onBeforeUnmount(() => {
    if (carouselTimer) clearInterval(carouselTimer)
  })
</script>

<template>
  <div class="flowing-menu">
    <nav class="flowing-menu__nav">
      <div
        v-for="(item, idx) in items"
        :key="idx"
        :ref="el => setItemRef(el as HTMLDivElement, idx)"
        class="flowing-menu__row"
        :style="{
          height: hoveredIdx === idx ? '200px' : rowHeight,
          minHeight: '80px',
        }"
        @mouseenter="ev => handleMouseEnter(ev, idx)"
        @mouseleave="ev => handleMouseLeave(ev, idx)"
      >
        <!-- Default state -->
        <div class="flowing-menu__default">
          <span class="flowing-menu__title">{{ item.text }}</span>
          <span class="flowing-menu__index">{{ String(idx + 1).padStart(2, '0') }}</span>
        </div>

        <!-- Hover overlay -->
        <div
          :ref="el => (marqueeRefs[idx] = el as HTMLDivElement)"
          class="flowing-menu__overlay"
        >
          <div
            :ref="el => (marqueeInnerRefs[idx] = el as HTMLDivElement)"
            class="flowing-menu__overlay-inner"
          >
            <!-- Left: info -->
            <div class="flowing-menu__info">
              <span class="flowing-menu__info-title">{{ item.text }}</span>
              <p class="flowing-menu__info-desc font-mono">{{ item.description }}</p>
              <span class="flowing-menu__info-stack font-mono">{{ item.stack }}</span>
            </div>

            <!-- Right: open button -->
            <button
              class="flowing-menu__open-btn"
              @click.stop="activeItem = item"
              aria-label="View project details"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
                   stroke="black" stroke-width="3">
                <line x1="19" y1="12" x2="5" y2="12"/>
                <polyline points="12 19 5 12 12 5"/>
              </svg>
            </button>
          </div>
        </div>
      </div>

    </nav>

    <!-- ── SIDE PANEL ── -->
    <Teleport to="body">
      <Transition name="backdrop">
        <div
          v-if="activeItem"
          class="panel-backdrop"
          @click="activeItem = null"
        />
      </Transition>

      <div
        class="side-panel"
        :class="{ 'side-panel--open': activeItem }"
      >
        <!-- Close -->
        <div class="side-panel__header">
          <button class="close-btn" @click="activeItem = null" aria-label="Close panel">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                 stroke="black" stroke-width="3">
              <line x1="18" y1="6"  x2="6"  y2="18"/>
              <line x1="6"  y1="6"  x2="18" y2="18"/>
            </svg>
          </button>
        </div>

        <div class="side-panel__body">
          <!-- Carousel -->
          <div v-if="activeImages.length" class="carousel">
            <div
              class="carousel__track"
              :style="{ transform: `translateX(-${carouselIndex * 100}%)` }"
            >
              <div
                v-for="(img, i) in activeImages"
                :key="i"
                class="carousel__slide"
                @click="lightboxImage = img"
              >
                <img :src="img" :alt="`${activeItem?.text} screenshot ${i + 1}`"
                     class="carousel__img" />
              </div>
            </div>

            <div v-if="activeImages.length > 1" class="carousel__dots">
              <button
                v-for="(_, i) in activeImages"
                :key="i"
                class="carousel__dot"
                :class="{ 'carousel__dot--active': carouselIndex === i }"
                @click="carouselIndex = i"
                :aria-label="`Go to image ${i + 1}`"
              />
            </div>

            <div class="carousel__hint">
              <span>click to enlarge</span>
            </div>
          </div>

          <!-- Content -->
          <div class="side-panel__content">
            <span class="side-panel__project-title">{{ activeItem?.text }}</span>

            <!-- Meta -->
            <div class="side-panel__meta">
              <div v-if="activeItem?.year" class="meta-item">
                <span class="meta-item__label">YEAR</span>
                <span class="meta-item__value meta-item__value--red">{{ activeItem.year }}</span>
              </div>
              <div v-if="activeItem?.role" class="meta-item">
                <span class="meta-item__label">ROLE</span>
                <span class="meta-item__value">{{ activeItem.role }}</span>
              </div>
            </div>

            <!-- Stack tags -->
            <div class="stack-tags">
              <span v-for="tag in stackTags" :key="tag" class="stack-tag font-mono">
                {{ tag }}
              </span>
            </div>

            <!-- Description -->
            <p class="side-panel__desc font-mono">{{ activeItem?.description }}</p>

            <!-- Features -->
            <div v-if="activeItem?.features?.length" class="features">
              <div class="features__header">
                <span class="features__label font-mono">KEY FEATURES</span>
                <div class="features__rule" />
              </div>
              <ul class="features__list">
                <li
                  v-for="(feature, i) in activeItem.features"
                  :key="i"
                  class="features__item font-mono"
                >
                  <span class="features__arrow">→</span>
                  {{ feature }}
                </li>
              </ul>
            </div>

            <!-- CTA -->
            <a
              v-if="activeItem?.link && activeItem.link !== '#'"
              :href="activeItem.link"
              target="_blank"
              class="visit-link font-mono"
            >
              View Project
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                   stroke="currentColor" stroke-width="2">
                <line x1="5" y1="12" x2="19" y2="12"/>
                <polyline points="12 5 19 12 12 19"/>
              </svg>
            </a>

            <div v-else class="private-badge font-mono">
              Private Repository — available upon request
            </div>
          </div>
        </div>
      </div>
    </Teleport>

    <!-- ── LIGHTBOX ── -->
    <Teleport to="body">
      <Transition name="lightbox">
        <div
          v-if="lightboxImage"
          class="lightbox"
          @click="lightboxImage = null"
        >
          <img
            :src="lightboxImage"
            class="lightbox__img"
            @click.stop
          />
          <button
            class="lightbox__close"
            @click="lightboxImage = null"
            aria-label="Close lightbox"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                 stroke="white" stroke-width="3">
              <line x1="18" y1="6"  x2="6"  y2="18"/>
              <line x1="6"  y1="6"  x2="18" y2="18"/>
            </svg>
          </button>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<style scoped>
/* ── Layout ── */
  .flowing-menu {
    width: 100%;
    height: 100%;
    overflow: hidden;
    background: black; 
  }
  .flowing-menu__nav { 
    display: flex;
    flex-direction: column;
    height: 100%;
    margin: 0;
    padding: 0;
  }

  .flowing-menu__row {
    position: relative;
    overflow: hidden;
    isolation: isolate;
    border-top: 1px solid white;
    box-sizing: border-box;
    transition: height 0.5s cubic-bezier(0.76, 0, 0.24, 1);
  }

  /* ── Default state ── */
  .flowing-menu__default {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    position: relative;
  }

  .flowing-menu__title {
    font-size: 5vh;
    font-weight: 600;
    text-transform: uppercase;
    color: white;
  }

  .flowing-menu__index {
    position: absolute;
    left: 1.5rem;
    bottom: 0.5rem;
    font-family: monospace;
    font-size: 4rem;
    font-weight: 700;
    line-height: 1;
    color: #dc2626;
  }

  /* ── Hover overlay ── */
  .flowing-menu__overlay {
    position: absolute;
    inset: 0;
    background: white;
    overflow: hidden;
    transform: translateY(100%);
    z-index: 10;
  }

  .flowing-menu__overlay-inner {
    position: relative;
    height: 100%;
    display: flex;
    align-items: center;
    transform: translateY(-100%);
  }

  .flowing-menu__info {
    position: absolute;
    left: 2rem;
    top: 50%;
    transform: translateY(-50%);
    text-align: left;
    max-width: 55%;
}

  .flowing-menu__info-title {
    font-size: 5vh;
    font-weight: 600;
    text-transform: uppercase;
    color: black;
    display: block;
  }

  .flowing-menu__info-desc {
    font-size: 0.875rem;
    color: black;
    line-height: 1.6;
    margin-top: 0.5rem;
  }

  .flowing-menu__info-stack {
    font-size: 0.75rem;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    margin-top: 0.5rem;
    display: block;
    color: #dc2626;
  }

  .flowing-menu__open-btn {
    position: absolute;
    right: 3rem;
    top: 50%;
    transform: translateY(-50%);
    width: 3rem;
    height: 3rem;
    border: 2px solid #dc2626;
    background: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 20;
    transition: background 0.2s;
  }

  .flowing-menu__open-btn:hover {
    background: #dc2626; 
  }
  .flowing-menu__open-btn:hover svg line,
  .flowing-menu__open-btn:hover svg polyline {
    stroke: white;
  }

  /* ── Backdrop ── */
  .panel-backdrop {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.6);
    z-index: 998;
    cursor: pointer;
  }

  /* ── Side panel ── */
  .side-panel {
    position: fixed;
    top: 0; right: 0;
    width: 500px;
    height: 100vh;
    background: white;
    z-index: 999;
    display: flex;
    flex-direction: column;
    transform: translateX(100%);
    transition: transform 0.5s cubic-bezier(0.76, 0, 0.24, 1);
    overflow: hidden;
  }

  .side-panel--open { transform: translateX(0); }

  .side-panel__header {
    display: flex;
    justify-content: flex-end;
    padding: 1.5rem;
    flex-shrink: 0;
    border-bottom: 1px solid black;
  }

  .side-panel__body {
    flex: 1;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
  }

  .side-panel__content { padding: 2rem; }

  .side-panel__project-title {
    font-size: 2rem;
    font-weight: 700;
    text-transform: uppercase;
    color: black;
    display: block;
    margin-bottom: 0.5rem;
    line-height: 1.1;
  }

  /* ── Close button ── */
  .close-btn {
    width: 2.5rem; height: 2.5rem;
    border: 2px solid #dc2626;
    background: none;
    display: flex; align-items: center; justify-content: center;
    cursor: pointer;
    transition: background 0.2s;
  }
  .close-btn:hover { background: #dc2626; }
  .close-btn:hover svg line { stroke: white; }

  /* ── Carousel ── */
  .carousel {
    width: 100%;
    height: 250px;
    flex-shrink: 0;
    position: relative;
    overflow: hidden;
    background: black;
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
    cursor: zoom-in;
    overflow: hidden;
  }

  .carousel__img {
    width: 100%; height: 100%;
    object-fit: cover;
    display: block;
    transition: transform 0.4s ease;
  }
  .carousel__img:hover { transform: scale(1.03); }

  .carousel__dots {
    position: absolute;
    bottom: 0.75rem;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    gap: 0.4rem;
  }

  .carousel__dot {
    width: 0.4rem; height: 0.4rem;
    background: white;
    border: none;
    cursor: pointer;
    transition: all 0.3s ease;
  }

  .carousel__dot--active { width: 1.5rem; background: #dc2626; }

  .carousel__hint {
    position: absolute;
    top: 0.75rem; right: 0.75rem;
    background: rgba(0, 0, 0, 0.6);
    padding: 0.25rem 0.5rem;
  }

  .carousel__hint span {
    font-family: monospace;
    font-size: 0.6rem;
    color: white;
    text-transform: uppercase;
    letter-spacing: 0.1em;
  }

  /* ── Meta ── */
  .side-panel__meta {
    display: flex;
    gap: 1.5rem;
    margin-bottom: 1rem;
    flex-wrap: wrap;
  }

  .meta-item { display: flex; align-items: center; gap: 0.5rem; }

  .meta-item__label {
    font-family: monospace;
    font-size: 0.65rem;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: rgba(0, 0, 0, 0.5);
  }

  .meta-item__value {
    font-family: monospace;
    font-size: 0.75rem;
    font-weight: 700;
    color: black;
  }

  .meta-item__value--red { color: #dc2626; }

  /* ── Stack tags ── */
  .stack-tags { display: flex; flex-wrap: wrap; gap: 0.4rem; margin-bottom: 1.5rem; }

  .stack-tag {
    font-size: 0.65rem;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    padding: 0.2rem 0.5rem;
    border: 1px solid #dc2626;
    color: #dc2626;
  }

  /* ── Description ── */
  .side-panel__desc {
    font-size: 0.875rem;
    color: black;
    line-height: 1.6;
    border-left: 2px solid black;
    padding-left: 1rem;
    margin-bottom: 2rem;
  }

  /* ── Features ── */
  .features { margin-bottom: 2rem; }

  .features__header {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 1rem;
  }

  .features__label {
    font-size: 0.75rem;
    text-transform: uppercase;
    letter-spacing: 0.15em;
    font-weight: 700;
    color: black;
    white-space: nowrap;
  }

  .features__rule { flex: 1; height: 1px; background: rgba(0, 0, 0, 0.2); }

  .features__list { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 0.75rem; }

  .features__item {
    font-size: 0.75rem;
    color: rgba(0, 0, 0, 0.8);
    padding-left: 1.25rem;
    position: relative;
    line-height: 1.5;
  }

  .features__arrow {
    position: absolute;
    left: 0;
    color: #dc2626;
    font-weight: 700;
  }

  /* ── CTA ── */
  .visit-link {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    border: 2px solid black;
    padding: 0.75rem 1.5rem;
    font-size: 0.75rem;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    text-decoration: none;
    color: black;
    transition: background 0.2s, color 0.2s;
  }
  .visit-link:hover { background: black; color: white; }

  .private-badge {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    border: 2px solid rgba(0, 0, 0, 0.2);
    padding: 0.75rem 1.5rem;
    font-size: 0.75rem;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: rgba(0, 0, 0, 0.4);
  }

  /* ── Lightbox ── */
  .lightbox {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.92);
    z-index: 1100;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: zoom-out;
    padding: 2rem;
  }

  .lightbox__img {
    max-width: 90vw;
    max-height: 90vh;
    object-fit: contain;
    display: block;
    box-shadow: 0 0 0 1px white;
  }

  .lightbox__close {
    position: absolute;
    top: 1.5rem; right: 1.5rem;
    width: 2.5rem; height: 2.5rem;
    border: 2px solid #dc2626;
    background: black;
    display: flex; align-items: center; justify-content: center;
    cursor: pointer;
  }

  /* ── Transitions ── */
  .backdrop-enter-active, .backdrop-leave-active { transition: opacity 0.3s ease; }
  .backdrop-enter-from,  .backdrop-leave-to      { opacity: 0; }

  .lightbox-enter-active, .lightbox-leave-active { transition: opacity 0.25s ease; }
  .lightbox-enter-from,  .lightbox-leave-to      { opacity: 0; }
</style>