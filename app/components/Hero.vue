<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'
import { OrbitControls } from '@tresjs/cientos'
import { ref, shallowRef, onMounted, onUnmounted, computed } from 'vue'
import { use3DAnimation } from '~/composables/Use3danimation'

const gl = shallowRef()
const scrollProgress = ref(0)
const torusRef = shallowRef()
const { animateShapes, animateOnScroll } = use3DAnimation()

const baseCameraPosition = ref<[number, number, number]>([7, 10, 10])
const cameraDistance = 13
const mouseX = ref(0)
const mouseY = ref(0)
const isMouseDown = ref(false)

const cameraPosition = computed(() => baseCameraPosition.value)

const handleScroll = () => {
  const heroSection = document.querySelector('.hero-3d')
  if (heroSection) {
    const rect = heroSection.getBoundingClientRect()
    const progress = Math.max(0, Math.min(1, -rect.top / rect.height))
    scrollProgress.value = progress
  }
}

const handleMouseMove = (event: MouseEvent) => {
  if (!isMouseDown.value) return

  const heroSection = document.querySelector('.hero-3d')
  if (!heroSection) return

  const rect = heroSection.getBoundingClientRect()
  
  mouseX.value = ((event.clientX - rect.left) / rect.width) * 2 - 1
  mouseY.value = ((event.clientY - rect.top) / rect.height) * 2 - 1

  const phi = Math.atan2(mouseX.value, 1) * 2.0
  const theta = Math.acos(Math.max(-1, Math.min(1, -mouseY.value))) * 2.0

  const newX = cameraDistance * Math.sin(theta) * Math.sin(phi)
  const newY = cameraDistance * Math.cos(theta)
  const newZ = cameraDistance * Math.sin(theta) * Math.cos(phi)

  baseCameraPosition.value = [newX, newY, newZ]
}

const handleMouseDown = () => {
  isMouseDown.value = true
}

const handleMouseUp = () => {
  isMouseDown.value = false
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
  document.addEventListener('mousemove', handleMouseMove)
  document.addEventListener('mousedown', handleMouseDown)
  document.addEventListener('mouseup', handleMouseUp)
  
  if (torusRef.value) {
    animateShapes([torusRef.value])
  }
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
  document.removeEventListener('mousemove', handleMouseMove)
  document.removeEventListener('mousedown', handleMouseDown)
  document.removeEventListener('mouseup', handleMouseUp)
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
      <TresMesh :position="[-8, -1, 2]" :rotation="[0.5, 0.5, 0]">
        <TresBoxGeometry :args="[2, 2, 2]" />
        <TresMeshBasicMaterial
          color="#ffffff"
          :wireframe="true"
          :wireframeLinewidth="2"
        />
      </TresMesh>

      <!-- Right Icosahedron: White wireframe icosahedron at [3,2,-1] -->
      <TresMesh :position="[6, 3, -2]" :rotation="[0, 0, 0]">
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
      <TresMesh :position="[-3, -4, 1]" :rotation="[0.3, 0.3, 0.3]">
        <TresBoxGeometry :args="[1, 1, 1]" />
        <TresMeshBasicMaterial
          color="#ffffff"
          :wireframe="true"
        />
      </TresMesh>

      <!-- Top-Left Octahedron: White wireframe octahedron at [-1,3,-2] -->
      <TresMesh :position="[-2, 4, -3]" :rotation="[0, 0.4, 0]">
        <TresOctahedronGeometry :args="[0.7]" />
        <TresMeshBasicMaterial
          color="#ffffff"
          :wireframe="true"
        />
      </TresMesh>

      <!-- Right-Bottom Cone: Red wireframe cone at [2.5,-1.5,0] -->
      <TresMesh :position="[4, -3, 1]" :rotation="[0.2, 0, 0]">
        <TresConeGeometry :args="[0.6, 1.5, 4]" />
        <TresMeshBasicMaterial
          color="#ff0000"
          :wireframe="true"
        />
      </TresMesh>

      <!-- Far-Right Torus: Small white wireframe torus at [4,-0.5,-3] -->
      <TresMesh :position="[5, 1, -4]" :rotation="[1, 0, 0.5]">
        <TresTorusGeometry :args="[0.5, 0.15, 6, 12]" />
        <TresMeshBasicMaterial
          color="#ffffff"
          :wireframe="true"
        />
      </TresMesh>

      <!-- Random Sphere: Red wireframe sphere at [2, 3, 2] -->
      <TresMesh :position="[3, 5, 3]" :rotation="[0.4, 0.6, 0.2]">
        <TresSphereGeometry :args="[0.9, 8, 8]" />
        <TresMeshBasicMaterial
          color="#ff0000"
          :wireframe="true"
        />
      </TresMesh>

      <!-- Random Dodecahedron: White wireframe at [-4, 2, 3] -->
      <TresMesh :position="[-6, 3, 4]" :rotation="[0.3, 0.5, 0.7]">
        <TresDodecahedronGeometry :args="[0.6]" />
        <TresMeshBasicMaterial
          color="#ffffff"
          :wireframe="true"
        />
      </TresMesh>

      <!-- Random Tetrahedron: Red wireframe at [1, -3, -2] -->
      <TresMesh :position="[2, -5, -3]" :rotation="[0.2, 0.8, 0.4]">
        <TresTetrahedronGeometry :args="[0.7]" />
        <TresMeshBasicMaterial
          color="#ff0000"
          :wireframe="true"
        />
      </TresMesh>

      <!-- Random Cylinder: White wireframe at [-2, 1, 4] -->
      <TresMesh :position="[-3, 2, 5]" :rotation="[0.5, 0.2, 0.3]">
        <TresCylinderGeometry :args="[0.5, 0.5, 1.2, 8]" />
        <TresMeshBasicMaterial
          color="#ffffff"
          :wireframe="true"
        />
      </TresMesh>

      <!-- Random Pyramid: Red wireframe at [5, 1, -1] -->
      <TresMesh :position="[6, 2, -2]" :rotation="[0.1, 0.3, 0.6]">
        <TresPlaneGeometry :args="[1, 1, 4, 4]" />
        <TresMeshBasicMaterial
          color="#ff0000"
          :wireframe="true"
        />
      </TresMesh>

      <!-- Random Icosahedron: White wireframe at [-3, -2, 2] -->
      <TresMesh :position="[-4, -3, 3]" :rotation="[0.7, 0.4, 0.5]">
        <TresIcosahedronGeometry :args="[0.75, 1]" />
        <TresMeshBasicMaterial
          color="#ffffff"
          :wireframe="true"
        />
      </TresMesh>

      <!-- Additional Sphere: Red wireframe at [1, 4, -4] -->
      <TresMesh :position="[1, 5, -5]" :rotation="[0.6, 0.3, 0.4]">
        <TresSphereGeometry :args="[0.8, 8, 8]" />
        <TresMeshBasicMaterial
          color="#ff0000"
          :wireframe="true"
        />
      </TresMesh>

      <!-- Additional Octahedron: White wireframe at [-5, -3, -3] -->
      <TresMesh :position="[-7, -4, -4]" :rotation="[0.5, 0.6, 0.3]">
        <TresOctahedronGeometry :args="[0.65]" />
        <TresMeshBasicMaterial
          color="#ffffff"
          :wireframe="true"
        />
      </TresMesh>

      <!-- Additional Cone: Red wireframe at [4, 4, 2] -->
      <TresMesh :position="[5, 4, 3]" :rotation="[0.4, 0.2, 0.5]">
        <TresConeGeometry :args="[0.55, 1.3, 5]" />
        <TresMeshBasicMaterial
          color="#ff0000"
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
        <div class="availability-badge">
          <span class="dot"></span>
          <span class="availability-text">OPEN TO FULL-TIME OPPORTUNITIES</span>
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
  .availability-badge {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    border: 1px solid rgba(255, 255, 255, 0.2);
    padding: 6px 14px;
    font-family: var(--font-mono);
    font-size: 10px;
    letter-spacing: 0.15em;
    margin-top: 1rem;
  }

  .dot {
    width: 8px;
    height: 8px;
    background: #00FF00;
    border-radius: 50%;
    animation: pulse 2s infinite;
  }

  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.3; }
  }
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