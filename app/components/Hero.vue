<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'
import { OrbitControls } from '@tresjs/cientos'
import { ref, shallowRef, onMounted, onUnmounted } from 'vue'
import { use3DAnimation } from '~/composables/Use3danimation'

const gl = shallowRef()
const scrollProgress = ref(0)
const torusRef = shallowRef()
const { animateShapes, animateOnScroll } = use3DAnimation()

const cameraPosition = ref<[number, number, number]>([7, 10, 10])

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
  
  if (torusRef.value) {
    animateShapes([torusRef.value])
  }
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
        :look-at="[0.5, 0.5, 0.5]"
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

      <!-- Left Box: Large white wireframe cube at origin [0,0,0] -->
      <TresMesh :position="[-6, 0, 0]" :rotation="[0.5, 0.5, 0]">
        <TresBoxGeometry :args="[2, 2, 2]" />
        <TresMeshBasicMaterial
          color="#ffffff"
          :wireframe="true"
          :wireframeLinewidth="2"
        />
      </TresMesh>

      <!-- Right Icosahedron: White wireframe icosahedron at [3,2,-1] -->
      <TresMesh :position="[3, 2, -1]" :rotation="[0, 0, 0]">
        <TresIcosahedronGeometry :args="[0.8, 0]" />
        <TresMeshBasicMaterial
          color="#ffffff"
          :wireframe="true"
        />
      </TresMesh>

      <!-- Center Torus: Red wireframe torus at [-3,0,0] -->
      <TresMesh ref="torusRef" :position="[0, 0, 0]" :rotation="[Math.PI/2, 0, 0]">
        <TresTorusGeometry :args="[2, 0.7, 8, 16]" />
        <TresMeshBasicMaterial
          color="#ff0000"
          :wireframe="true"
        />
      </TresMesh>

      <!-- Bottom-Left Box: Small white wireframe cube at [-2,-2,1] -->
      <TresMesh :position="[-2, -2, 1]" :rotation="[0.3, 0.3, 0.3]">
        <TresBoxGeometry :args="[1, 1, 1]" />
        <TresMeshBasicMaterial
          color="#ffffff"
          :wireframe="true"
        />
      </TresMesh>

      <!-- Top-Left Octahedron: White wireframe octahedron at [-1,3,-2] -->
      <TresMesh :position="[-1, 3, -2]" :rotation="[0, 0.4, 0]">
        <TresOctahedronGeometry :args="[0.7]" />
        <TresMeshBasicMaterial
          color="#ffffff"
          :wireframe="true"
        />
      </TresMesh>

      <!-- Right-Bottom Cone: Red wireframe cone at [2.5,-1.5,0] -->
      <TresMesh :position="[2.5, -1.5, 0]" :rotation="[0.2, 0, 0]">
        <TresConeGeometry :args="[0.6, 1.5, 4]" />
        <TresMeshBasicMaterial
          color="#ff0000"
          :wireframe="true"
        />
      </TresMesh>

      <!-- Far-Right Torus: Small white wireframe torus at [4,-0.5,-3] -->
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
        :autoRotateSpeed="0.7"
        :enableDamping="true"
        :dampingFactor="0.05"
      />
    </TresCanvas>

    <!-- Overlay Content -->
    <div class="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
      <div class="text-center space-y-8" :style="{ opacity: 1 - scrollProgress }">
        <!-- Main Title -->
        <h1 
          class="font-display text-8xl md:text-9xl tracking-tight leading-none"
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
        <div class="space-y-3">
          <div class="brutal-border-red inline-block px-6 py-3">
            <p class="font-mono font-bold text-lg md:text-xl tracking-widest" style="text-shadow: 2px 2px 0 rgba(0, 0, 0, 0.94);">
              FULLSTACK DEVELOPER
            </p>
          </div>
        </div>
      </div>
    </div>
    <div class="absolute bottom-8 w-full flex justify-center">
      <div class="mt-16 animate-bounce flex flex-col items-center">
        <div class="p-3">
          <svg 
            class="w-6 h-6" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              stroke-linecap="square" 
              stroke-linejoin="miter" 
              stroke-width="3" 
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </div>
      </div>
    </div>
    
    <div class="absolute top-8 left-8 font-mono text-xs tracking-widest" :style="{ opacity: (1 - scrollProgress) * 0.5 }">
      <p>[ 001 ]</p>
    </div>
    <div class="absolute top-8 right-8 font-mono text-xs tracking-widest" :style="{ opacity: (1 - scrollProgress) * 0.5 }">
      <p>[ 2025 ]</p>
    </div>
    <div class="absolute bottom-8 left-8 font-mono text-xs tracking-widest" :style="{ opacity: (1 - scrollProgress) * 0.5 }">
      <p>[ LAT: 8.947890° ]</p>
    </div>
    <div class="absolute bottom-8 right-8 font-mono text-xs tracking-widest" :style="{ opacity: (1 - scrollProgress) * 0.5 }">
      <p>[ LONG: 125.532333° ]</p>
    </div>
  </div>
</template>

<style scoped>
h1 {
  text-shadow: 3px 3px 0 rgba(255, 0, 0, 0.3);
}

p{
  font-size: 20px;
  color: white;
}

@media (max-width: 768px) {
  h1 {
    font-size: 3rem;
  }
}
</style>