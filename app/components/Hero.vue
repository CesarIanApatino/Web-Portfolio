<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'
import { OrbitControls } from '@tresjs/cientos'
import { ref, shallowRef, onMounted, onUnmounted } from 'vue'

const gl = shallowRef()
const scrollProgress = ref(0)

const cameraPosition = ref<[number, number, number]>([0, 0, 8])

const handleScroll = () => {
  const heroSection = document.querySelector('.hero-3d')
  if (heroSection) {
    const rect = heroSection.getBoundingClientRect()
    const progress = Math.max(0, Math.min(1, -rect.top / rect.height))
    scrollProgress.value = progress
  }
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <div class="hero-3d fixed inset-0 w-full h-screen z-0">
    <div class="scan-line"></div>
    <div class="absolute inset-0 grid-overlay"></div>
    <TresCanvas
      ref="gl"
      clear-color="#000000"
      :alpha="false"
      :antialias="true"
      :style="{ opacity: 1 - scrollProgress }"
    >
      <TresPerspectiveCamera
        :position="cameraPosition"
        :fov="45"
        :near="0.1"
        :far="1000"
      />

      <TresAmbientLight :intensity="0.3" />
      <TresDirectionalLight
        :position="[5, 5, 5]"
        :intensity="0.8"
        color="#ffffff"
      />
      <TresDirectionalLight
        :position="[-5, -5, 5]"
        :intensity="0.4"
        color="#ff0000"
      />

      <TresMesh :position="[0, 0, 0]" :rotation="[0.2, 0.2, 0]">
        <TresBoxGeometry :args="[2, 2, 2]" />
        <TresMeshBasicMaterial
          color="#ffffff"
          :wireframe="true"
          :wireframeLinewidth="2"
        />
      </TresMesh>

      <TresMesh :position="[3, 2, -1]" :rotation="[0, 0, 0]">
        <TresIcosahedronGeometry :args="[0.8, 0]" />
        <TresMeshBasicMaterial
          color="#ffffff"
          :wireframe="true"
        />
      </TresMesh>

      <TresMesh :position="[-3, 0, 0]" :rotation="[0.5, 0.5, 0]">
        <TresTorusGeometry :args="[1, 0.3, 8, 16]" />
        <TresMeshBasicMaterial
          color="#ff0000"
          :wireframe="true"
        />
      </TresMesh>

      <TresMesh :position="[-2, -2, 1]" :rotation="[0.3, 0.3, 0.3]">
        <TresBoxGeometry :args="[1, 1, 1]" />
        <TresMeshBasicMaterial
          color="#ffffff"
          :wireframe="true"
        />
      </TresMesh>

      <TresMesh :position="[-1, 3, -2]" :rotation="[0, 0.4, 0]">
        <TresOctahedronGeometry :args="[0.7]" />
        <TresMeshBasicMaterial
          color="#ffffff"
          :wireframe="true"
        />
      </TresMesh>

      <TresMesh :position="[2.5, -1.5, 0]" :rotation="[0.2, 0, 0]">
        <TresConeGeometry :args="[0.6, 1.5, 4]" />
        <TresMeshBasicMaterial
          color="#ff0000"
          :wireframe="true"
        />
      </TresMesh>

      <TresMesh :position="[4, -0.5, -3]" :rotation="[1, 0, 0.5]">
        <TresTorusGeometry :args="[0.5, 0.15, 6, 12]" />
        <TresMeshBasicMaterial
          color="#ffffff"
          :wireframe="true"
        />
      </TresMesh>

      <OrbitControls
        :enableZoom="false"
        :enablePan="false"
        :autoRotate="true"
        :autoRotateSpeed="0.5"
        :enableDamping="true"
        :dampingFactor="0.05"
      />
    </TresCanvas>

    <!-- Overlay Content -->
    <div class="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
      <div class="text-center space-y-8" :style="{ opacity: 1 - scrollProgress }">
        <!-- Main Title -->
        <h1 
          class="font-display text-7xl md:text-9xl tracking-tight leading-none"
          data-text="Cesar Ian C. Apatino"
        >
          <TextType 
            :text="['Cesar Ian C. Apatino']"
            :typingSpeed="75"
            :pauseDuration="1500"
            :showCursor="true"
            cursorCharacter="|"
          />
        </h1>
        <!-- Subtitle -->
        <div class="space-y-2">
          <div class="brutal-border-red inline-block px-6 py-3">
            <p class="font-mono text-sm md:text-base tracking-widest">
              FULLSTACK DEVELOPER
            </p>
          </div>
          <p class="font-mono text-xs md:text-sm opacity-70 tracking-wider">
            [ MODERN WEBSTACK ]
          </p>
        </div>

        <!-- Scroll Indicator -->
        <div class="mt-16 animate-bounce">
          <div class="brutal-border inline-block p-3">
            <svg 
              class="w-6 h-6" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                stroke-linecap="square" 
                stroke-linejoin="miter" 
                stroke-width="2" 
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </div>
          <p class="font-mono text-xs mt-2 tracking-widest">SCROLL DOWN</p>
        </div>
      </div>
    </div>

    <div class="absolute top-8 left-8 font-mono text-xs tracking-widest opacity-50" :style="{ opacity: (1 - scrollProgress) * 0.5 }">
      <p>[ 001 ]</p>
    </div>
    <div class="absolute top-8 right-8 font-mono text-xs tracking-widest opacity-50" :style="{ opacity: (1 - scrollProgress) * 0.5 }">
      <p>[ 2025 ]</p>
    </div>
    <div class="absolute bottom-8 left-8 font-mono text-xs tracking-widest opacity-50" :style="{ opacity: (1 - scrollProgress) * 0.5 }">
      <p>[ LAT: 8.947890° ]</p>
    </div>
    <div class="absolute bottom-8 right-8 font-mono text-xs tracking-widest opacity-50" :style="{ opacity: (1 - scrollProgress) * 0.5 }">
      <p>[ LONG: 125.532333° ]</p>
    </div>
  </div>
</template>

<style scoped>
h1 {
  text-shadow: 3px 3px 0 rgba(255, 0, 0, 0.3);
}

@media (max-width: 768px) {
  h1 {
    font-size: 3rem;
  }
}
</style>