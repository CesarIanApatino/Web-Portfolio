<template>
  <div style="width: 100%; height: 100%; overflow: hidden; background: black; box-sizing: border-box;">
    <nav style="display: flex; flex-direction: column; height: 100%; margin: 0; padding: 0;">

      <div
        v-for="(item, idx) in items"
        :key="idx"
        :ref="el => setItemRef(el as HTMLDivElement, idx)"
        @mouseenter="ev => handleMouseEnter(ev, idx)"
        @mouseleave="ev => handleMouseLeave(ev, idx)"
        :style="{
          height: hoveredIdx === idx ? '40%' : `${60 / items.length}%`,
          minHeight: '0',
          position: 'relative',
          overflow: 'hidden',
          isolation: 'isolate',
          borderTop: '1px solid white',
          transition: 'height 0.5s cubic-bezier(0.76, 0, 0.24, 1)',
          boxSizing: 'border-box'
        }"
      >

        <!-- DEFAULT state -->
        <div style="display: flex; align-items: center; justify-content: center; height: 100%; position: relative;">
          <span class="uppercase font-semibold text-white" style="font-size: 5vh;">{{ item.text }}</span>
          <span
            class="font-mono font-bold"
            style="position: absolute; left: 1.5rem; bottom: 0.5rem; font-size: 4rem; line-height: 1; color: #dc2626;"
          >
            {{ String(idx + 1).padStart(2, '0') }}
          </span>
        </div>

        <!-- HOVER OVERLAY -->
        <div
          :ref="el => (marqueeRefs[idx] = el as HTMLDivElement)"
          style="
            position: absolute;
            top: 0; left: 0;
            width: 100%; height: 100%;
            background: white;
            overflow: hidden;
            transform: translateY(100%);
            z-index: 10;
          "
        >
          <div
            :ref="el => (marqueeInnerRefs[idx] = el as HTMLDivElement)"
            style="position: relative; height: 100%; display: flex; align-items: center; transform: translateY(-100%);"
          >

            <!-- Left: title + description -->
            <div style="
              position: absolute;
              left: 2rem; top: 50%;
              transform: translateY(-50%);
              text-align: left;
              max-width: 55%;
              box-sizing: border-box;
            ">
              <span class="uppercase font-semibold text-black block" style="font-size: 5vh;">{{ item.text }}</span>
              <p class="font-mono text-sm text-black leading-relaxed mt-2">{{ item.description }}</p>
              <span class="font-mono text-xs uppercase tracking-widest mt-2 block" style="color: #dc2626;">{{ item.stack }}</span>
            </div>

            <!-- Right: open panel button -->
            <div
              @click.stop="activeItem = item"
              style="
                position: absolute;
                right: 3rem; top: 50%;
                transform: translateY(-50%);
                display: flex;
                align-items: center;
                justify-content: center;
                width: 3rem; height: 3rem;
                border: 2px solid #dc2626;
                cursor: pointer;
                z-index: 20;
              "
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="black" stroke-width="3">
                <line x1="19" y1="12" x2="5" y2="12"/>
                <polyline points="12 19 5 12 12 5"/>
              </svg>
            </div>

          </div>
        </div>

      </div>
    </nav>

    <!-- SIDE PANEL -->
    <Teleport to="body">

      <!-- backdrop -->
      <Transition name="backdrop">
        <div
          v-if="activeItem"
          @click="activeItem = null"
          style="position: fixed; inset: 0; background: rgba(0,0,0,0.6); z-index: 998; cursor: pointer;"
        />
      </Transition>

      <!-- panel -->
      <div
        style="
          position: fixed;
          top: 0; right: 0;
          width: 500px; height: 100vh;
          background: white;
          z-index: 999;
          display: flex;
          flex-direction: column;
          transition: transform 0.5s cubic-bezier(0.76, 0, 0.24, 1);
          overflow: hidden;
        "
        :style="{ transform: activeItem ? 'translateX(0)' : 'translateX(100%)' }"
      >

        <!-- close button -->
        <div style="display: flex; justify-content: flex-end; padding: 1.5rem; flex-shrink: 0; border-bottom: 1px solid black;">
          <div
            @click="activeItem = null"
            class="close-btn"
            style="
              width: 2.5rem; height: 2.5rem;
              border: 2px solid #dc2626;
              display: flex; align-items: center; justify-content: center;
              cursor: pointer;
              transition: background 0.2s;
            "
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="black" stroke-width="3">
              <line x1="18" y1="6" x2="6" y2="18"/>
              <line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </div>
        </div>

        <!-- scrollable content area -->
        <div style="flex: 1; overflow-y: auto; display: flex; flex-direction: column;">

          <!-- IMAGE CAROUSEL -->
          <div
            v-if="activeImages.length"
            style="width: 100%; height: 250px; flex-shrink: 0; position: relative; overflow: hidden; background: black;"
          >
            <!-- slides -->
            <div
              style="display: flex; height: 100%; transition: transform 0.5s cubic-bezier(0.76, 0, 0.24, 1);"
              :style="{ transform: `translateX(-${carouselIndex * 100}%)` }"
            >
              <div
                v-for="(img, i) in activeImages"
                :key="i"
                style="min-width: 100%; height: 100%; flex-shrink: 0; cursor: zoom-in; overflow: hidden;"
                @click="lightboxImage = img"
              >
                <img
                  :src="img"
                  :alt="`${activeItem?.text} screenshot ${i + 1}`"
                  style="width: 100%; height: 100%; object-fit: cover; display: block; transition: transform 0.4s ease;"
                  class="carousel-img"
                />
              </div>
            </div>

            <!-- dots -->
            <div
              v-if="activeImages.length > 1"
              style="position: absolute; bottom: 0.75rem; left: 50%; transform: translateX(-50%); display: flex; gap: 0.4rem;"
            >
              <div
                v-for="(_, i) in activeImages"
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

            <!-- zoom hint -->
            <div style="position: absolute; top: 0.75rem; right: 0.75rem; background: rgba(0,0,0,0.6); padding: 0.25rem 0.5rem;">
              <span style="font-family: monospace; font-size: 0.6rem; color: white; text-transform: uppercase; letter-spacing: 0.1em;">
                click to enlarge
              </span>
            </div>
          </div>
          
          <div style="padding: 2rem;">

            <!-- title -->
            <span
              class="uppercase font-bold text-black"
              style="font-size: 2rem; display: block; margin-bottom: 0.5rem; line-height: 1.1;"
            >
              {{ activeItem?.text }}
            </span>

            <!-- Year and Role -->
            <div style="display: flex; gap: 1.5rem; margin-bottom: 1rem; flex-wrap: wrap;">
              <div v-if="activeItem?.year" style="display: flex; align-items: center; gap: 0.5rem;">
                <span style="font-family: monospace; font-size: 0.65rem; text-transform: uppercase; letter-spacing: 0.1em; color: rgba(0,0,0,0.5);">
                  YEAR
                </span>
                <span style="font-family: monospace; font-size: 0.75rem; font-weight: bold; color: #dc2626;">
                  {{ activeItem.year }}
                </span>
              </div>
              <div v-if="activeItem?.role" style="display: flex; align-items: center; gap: 0.5rem;">
                <span style="font-family: monospace; font-size: 0.65rem; text-transform: uppercase; letter-spacing: 0.1em; color: rgba(0,0,0,0.5);">
                  ROLE
                </span>
                <span style="font-family: monospace; font-size: 0.75rem; font-weight: bold; color: black;">
                  {{ activeItem.role }}
                </span>
              </div>
            </div>

            <!-- stack tags -->
            <div style="display: flex; flex-wrap: wrap; gap: 0.4rem; margin-bottom: 1.5rem;">
              <span
                v-for="tag in stackTags"
                :key="tag"
                style="
                  font-family: monospace;
                  font-size: 0.65rem;
                  text-transform: uppercase;
                  letter-spacing: 0.08em;
                  padding: 0.2rem 0.5rem;
                  border: 1px solid #dc2626;
                  color: #dc2626;
                "
              >
                {{ tag }}
              </span>
            </div>

            <!-- description -->
            <p class="font-mono text-sm text-black leading-relaxed" style="border-left: 2px solid black; padding-left: 1rem; margin-bottom: 2rem;">
              {{ activeItem?.description }}
            </p>

            <!-- FEATURES SECTION (NEW!) -->
            <div v-if="activeItem?.features && activeItem.features.length" style="margin-bottom: 2rem;">
              <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 1rem;">
                <span style="font-family: monospace; font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.15em; font-weight: bold; color: black;">
                  KEY FEATURES
                </span>
                <div style="flex: 1; height: 1px; background: rgba(0,0,0,0.2);"></div>
              </div>
              
              <ul style="list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 0.75rem;">
                <li 
                  v-for="(feature, idx) in activeItem.features" 
                  :key="idx"
                  style="
                    font-family: monospace;
                    font-size: 0.75rem;
                    color: rgba(0,0,0,0.8);
                    padding-left: 1.25rem;
                    position: relative;
                    line-height: 1.5;
                  "
                >
                  <span style="position: absolute; left: 0; color: #dc2626; font-weight: bold;">→</span>
                  {{ feature }}
                </li>
              </ul>
            </div>

            <!-- visit link -->
            <a 
              v-if="activeItem?.link && activeItem.link !== '#'"
              :href="activeItem.link" 
              target="_blank"
              class="visit-link"
              style="
                display: inline-flex;
                align-items: center;
                gap: 0.5rem;
                border: 2px solid black;
                padding: 0.75rem 1.5rem;
                font-family: monospace;
                font-size: 0.75rem;
                text-transform: uppercase;
                letter-spacing: 0.1em;
                text-decoration: none;
                color: black;
                transition: background 0.2s, color 0.2s;
              "
            >
              View Project
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="5" y1="12" x2="19" y2="12"/>
                <polyline points="12 5 19 12 12 19"/>
              </svg>
            </a>

            <!-- Coming Soon badge if no link -->
            <div
              v-else
              style="
                display: inline-flex;
                align-items: center;
                gap: 0.5rem;
                border: 2px solid rgba(0,0,0,0.2);
                padding: 0.75rem 1.5rem;
                font-family: monospace;
                font-size: 0.75rem;
                text-transform: uppercase;
                letter-spacing: 0.1em;
                color: rgba(0,0,0,0.4);
              "
            >
              Private Repository — available upon request
            </div>

          </div>
        </div>
      </div>
    </Teleport>

    <!-- LIGHTBOX -->
    <Teleport to="body">
      <Transition name="lightbox">
        <div
          v-if="lightboxImage"
          @click="lightboxImage = null"
          style="
            position: fixed; inset: 0;
            background: rgba(0,0,0,0.92);
            z-index: 1100;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: zoom-out;
            padding: 2rem;
          "
        >
          <img
            :src="lightboxImage"
            style="
              max-width: 90vw;
              max-height: 90vh;
              object-fit: contain;
              display: block;
              box-shadow: 0 0 0 1px white;
            "
            @click.stop
          />
          <!-- close -->
          <div style="position: absolute; top: 1.5rem; right: 1.5rem;">
            <div
              style="
                width: 2.5rem; height: 2.5rem;
                border: 2px solid #dc2626;
                display: flex; align-items: center; justify-content: center;
                cursor: pointer; background: black;
              "
              @click="lightboxImage = null"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3">
                <line x1="18" y1="6" x2="6" y2="18"/>
                <line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>

  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onBeforeUnmount } from 'vue'
import { gsap } from 'gsap'

interface MenuItemProps {
  link: string
  text: string
  description?: string
  stack?: string
  images?: string[]
  image?: string
  category?: string
  year?: string
  role?: string
  features?: string[]
}

const props = withDefaults(defineProps<{ items?: MenuItemProps[] }>(), {
  items: () => []
})

const itemRefs = ref<(HTMLDivElement | null)[]>([])
const marqueeRefs = ref<(HTMLDivElement | null)[]>([])
const marqueeInnerRefs = ref<(HTMLDivElement | null)[]>([])
const hoveredIdx = ref<number | null>(null)
const activeItem = ref<MenuItemProps | null>(null)
const carouselIndex = ref(0)
const lightboxImage = ref<string | null>(null)
let carouselTimer: ReturnType<typeof setInterval> | null = null

const setItemRef = (el: HTMLDivElement | null, idx: number) => {
  if (el) itemRefs.value[idx] = el
}

const findClosestEdge = (mouseX: number, mouseY: number, width: number, height: number) => {
  const top = Math.pow(mouseX - width / 2, 2) + Math.pow(mouseY, 2)
  const bottom = Math.pow(mouseX - width / 2, 2) + Math.pow(mouseY - height, 2)
  return top < bottom ? 'top' : 'bottom'
}

const handleMouseEnter = (ev: MouseEvent, idx: number) => {
  hoveredIdx.value = idx

  const itemRef = itemRefs.value[idx]
  const marqueeRef = marqueeRefs.value[idx]
  const marqueeInnerRef = marqueeInnerRefs.value[idx]
  if (!itemRef || !marqueeRef || !marqueeInnerRef) return

  const rect = itemRef.getBoundingClientRect()
  const edge = findClosestEdge(ev.clientX - rect.left, ev.clientY - rect.top, rect.width, rect.height)

  gsap.timeline({ defaults: { duration: 0.5, ease: 'expo.out' } })
    .set(marqueeRef, { y: edge === 'top' ? '-100%' : '100%' })
    .set(marqueeInnerRef, { y: edge === 'top' ? '100%' : '-100%' })
    .to([marqueeRef, marqueeInnerRef], { y: '0%' })
}

const handleMouseLeave = (ev: MouseEvent, idx: number) => {
  hoveredIdx.value = null

  const itemRef = itemRefs.value[idx]
  const marqueeRef = marqueeRefs.value[idx]
  const marqueeInnerRef = marqueeInnerRefs.value[idx]
  if (!itemRef || !marqueeRef || !marqueeInnerRef) return

  const rect = itemRef.getBoundingClientRect()
  const edge = findClosestEdge(ev.clientX - rect.left, ev.clientY - rect.top, rect.width, rect.height)

  gsap.timeline({ defaults: { duration: 0.5, ease: 'expo.out' } })
    .to(marqueeRef, { y: edge === 'top' ? '-100%' : '100%' })
    .to(marqueeInnerRef, { y: edge === 'top' ? '100%' : '-100%' }, '<')
}

const activeImages = computed<string[]>(() => {
  if (!activeItem.value) return []
  if (activeItem.value.images?.length) return activeItem.value.images
  if (activeItem.value.image) return [activeItem.value.image]
  return []
})

const stackTags = computed<string[]>(() => {
  return activeItem.value?.stack?.split(',').map(s => s.trim()).filter(Boolean) ?? []
})

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

<style scoped>
/* backdrop transition */
.backdrop-enter-active, .backdrop-leave-active { transition: opacity 0.3s ease; }
.backdrop-enter-from, .backdrop-leave-to { opacity: 0; }

/* lightbox transition */
.lightbox-enter-active, .lightbox-leave-active { transition: opacity 0.25s ease; }
.lightbox-enter-from, .lightbox-leave-to { opacity: 0; }

/* carousel image hover zoom */
.carousel-img:hover { transform: scale(1.03); }

/* close button hover */
.close-btn:hover { background: #dc2626; }
.close-btn:hover svg line { stroke: white; }

/* visit link hover */
.visit-link:hover { background: black; color: white; }
</style>