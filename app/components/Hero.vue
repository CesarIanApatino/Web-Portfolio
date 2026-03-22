<script setup lang="ts">
  import { TresCanvas } from '@tresjs/core'
  import { OrbitControls } from '@tresjs/cientos'
  import { use3DAnimation } from '~/composables/Use3danimation'

  const { cornerLabels, shapes } = useHero()
  const { animateShapes } = use3DAnimation()

  const gl          = shallowRef()
  const torusRef    = shallowRef()
  const scrollProgress = ref(0)

  const CAMERA_DISTANCE = 13
  const mouseX     = ref(0)
  const mouseY     = ref(0)
  const isMouseDown = ref(false)
  const baseCameraPosition = ref<[number, number, number]>([7, 10, 10])
  const cameraPosition = computed(() => baseCameraPosition.value)

  const handleScroll = () => {
    const hero = document.querySelector('.hero-3d')
    if (!hero) return
    const rect = hero.getBoundingClientRect()
    scrollProgress.value = Math.max(0, Math.min(1, -rect.top / rect.height))
  }

  const handleMouseMove = (e: MouseEvent) => {
    if (!isMouseDown.value) return
    const hero = document.querySelector('.hero-3d')
    if (!hero) return
    const rect = hero.getBoundingClientRect()

    mouseX.value = ((e.clientX - rect.left) / rect.width) * 2 - 1
    mouseY.value = ((e.clientY - rect.top)  / rect.height) * 2 - 1

    const phi   = Math.atan2(mouseX.value, 1) * 2.0
    const theta = Math.acos(Math.max(-1, Math.min(1, -mouseY.value))) * 2.0

    baseCameraPosition.value = [
      CAMERA_DISTANCE * Math.sin(theta) * Math.sin(phi),
      CAMERA_DISTANCE * Math.cos(theta),
      CAMERA_DISTANCE * Math.sin(theta) * Math.cos(phi),
    ]
  }

  const handleMouseDown = () => { isMouseDown.value = true }
  const handleMouseUp   = () => { isMouseDown.value = false }

  onMounted(() => {
    window.addEventListener('scroll',    handleScroll)
    document.addEventListener('mousemove',  handleMouseMove)
    document.addEventListener('mousedown',  handleMouseDown)
    document.addEventListener('mouseup',    handleMouseUp)
    if (torusRef.value) animateShapes([torusRef.value])
  })

  onUnmounted(() => {
    window.removeEventListener('scroll',    handleScroll)
    document.removeEventListener('mousemove',  handleMouseMove)
    document.removeEventListener('mousedown',  handleMouseDown)
    document.removeEventListener('mouseup',    handleMouseUp)
  })

  const fadeStyle = computed(() => ({ opacity: 1 - scrollProgress.value }))
  const cornerFadeStyle = computed(() => ({
    opacity: (1 - scrollProgress.value) * 0.5
  }))
</script>

<template>
  <div class="hero-3d">
    <div class="hero__scanline" />
    <div class="hero__grid" />

    <TresCanvas
      ref="gl"
      clear-color="#000000"
      :alpha="false"
      :antialias="true"
      :style="fadeStyle"
    >
      <TresPerspectiveCamera
        :position="cameraPosition"
        :fov="45"
        :look-at="[0.5, 0.5, 0.5]"
        :near="0.1"
        :far="1000"
      />

      <TresAmbientLight     :intensity="0.3" />
      <TresDirectionalLight :position="[5, 5, 5]"   :intensity="0.8" color="#ffffff" />
      <TresDirectionalLight :position="[-5, -5, 5]" :intensity="0.4" color="#ff0000" />

      <template v-for="(shape, i) in shapes" :key="i">
        <TresMesh
          :ref="shape.isTorus ? (el: any) => { torusRef = el } : undefined"
          :position="shape.position as [number, number, number]"
          :rotation="shape.rotation as [number, number, number]"
        >
          <!-- Box: width, height, depth -->
          <TresBoxGeometry
            v-if="shape.type === 'box'"
            :args="shape.args as [number, number, number]"
          />

          <!-- Icosahedron: radius, detail -->
          <TresIcosahedronGeometry
            v-if="shape.type === 'icosahedron'"
            :args="shape.args as [number, number]"
          />

          <!-- Torus: radius, tube, radialSeg, tubularSeg -->
          <TresTorusGeometry
            v-if="shape.type === 'torus'"
            :args="shape.args as [number, number, number, number]"
          />

          <!-- Octahedron: radius -->
          <TresOctahedronGeometry
            v-if="shape.type === 'octahedron'"
            :args="shape.args as [number]"
          />

          <!-- Cone: radius, height, segments -->
          <TresConeGeometry
            v-if="shape.type === 'cone'"
            :args="shape.args as [number, number, number]"
          />

          <!-- Sphere: radius, widthSeg, heightSeg -->
          <TresSphereGeometry
            v-if="shape.type === 'sphere'"
            :args="shape.args as [number, number, number]"
          />

          <!-- Dodecahedron: radius -->
          <TresDodecahedronGeometry
            v-if="shape.type === 'dodecahedron'"
            :args="shape.args as [number]"
          />

          <!-- Tetrahedron: radius -->
          <TresTetrahedronGeometry
            v-if="shape.type === 'tetrahedron'"
            :args="shape.args as [number]"
          />

          <!-- Cylinder: radiusTop, radiusBottom, height, segments -->
          <TresCylinderGeometry
            v-if="shape.type === 'cylinder'"
            :args="shape.args as [number, number, number, number]"
          />

          <TresMeshBasicMaterial :color="shape.color" :wireframe="true" />
        </TresMesh>
      </template>

      <OrbitControls
        :enable-zoom="false"
        :enable-pan="false"
        :auto-rotate="true"
        :auto-rotate-speed="0.7"
        :enable-damping="true"
        :damping-factor="0.05"
      />
    </TresCanvas>

    <div class="hero__overlay" :style="fadeStyle">
      <div class="hero__center">

        <h1 class="hero__title font-display">
          <TextType
            :text="['Cesar Ian C. Apatino']"
            :typing-speed="75"
            :pause-duration="1500"
            :show-cursor="true"
            cursor-character="|"
          />
        </h1>

        <div class="hero__subtitle">
          <div class="brutal-border-red inline-block px-6 py-3">
            <p class="hero__role font-mono">FULLSTACK DEVELOPER</p>
          </div>
        </div>

        <div class="hero__badge">
          <span class="hero__badge-dot" />
          <span class="hero__badge-text font-mono">OPEN TO FULL-TIME OPPORTUNITIES</span>
        </div>

      </div>
    </div>

    <div class="hero__scroll-indicator">
      <div class="animate-bounce">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            stroke-linecap="square"
            stroke-linejoin="miter"
            stroke-width="3"
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </div>
    </div>

    <div
      v-for="label in cornerLabels"
      :key="label.position"
      class="hero__corner"
      :class="`hero__corner--${label.position}`"
      :style="cornerFadeStyle"
    >
      <p class="font-mono">{{ label.text }}</p>
    </div>

  </div>
</template>

<style scoped>
  .hero-3d {
    position: fixed;
    inset: 0;
    width: 100%;
    height: 100vh;
    z-index: 0;
  }

  /* Overlays */
  .hero__scanline {
    position: absolute;
    inset: 0;
    z-index: 1;
    pointer-events: none;
    background-image: repeating-linear-gradient(
      0deg,
      transparent,
      transparent 2px,
      rgba(255, 255, 255, 0.015) 2px,
      rgba(255, 255, 255, 0.015) 4px
    );
  }

  .hero__grid {
    position: absolute;
    inset: 0;
    z-index: 1;
    pointer-events: none;
    background-image:
      linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px);
    background-size: 60px 60px;
  }

  /* Center content */
  .hero__overlay {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    pointer-events: none;
    z-index: 10;
  }

  .hero__center {
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2rem;
  }

  .hero__title {
    font-size: clamp(3rem, 8vw, 6rem);
    letter-spacing: -0.02em;
    line-height: 1;
    text-shadow: 3px 3px 0 rgba(255, 0, 0, 0.3);
  }

  .hero__role {
    font-size: 1.1rem;
    font-weight: 700;
    letter-spacing: 0.15em;
    color: white;
    text-shadow: 2px 2px 0 rgba(0, 0, 0, 0.94);
  }

  /* Badge */
  .hero__badge {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    border: 1px solid rgba(255, 255, 255, 0.2);
    padding: 6px 14px;
  }

  .hero__badge-dot {
    width: 8px;
    height: 8px;
    background: #00ff00;
    border-radius: 50%;
    animation: pulse 2s infinite;
    flex-shrink: 0;
  }

  .hero__badge-text {
    font-size: 10px;
    letter-spacing: 0.15em;
    color: white;
  }

  /* Scroll indicator */
  .hero__scroll-indicator {
    position: absolute;
    bottom: 2rem;
    width: 100%;
    display: flex;
    justify-content: center;
    z-index: 10;
    color: white;
  }

  /* Corner labels */
  .hero__corner {
    position: absolute;
    font-size: 0.75rem;
    letter-spacing: 0.1em;
    color: white;
    z-index: 10;
  }

  .hero__corner p { font-size: 0.75rem; color: white; }

  .hero__corner--tl { top: 2rem;    left: 2rem; }
  .hero__corner--tr { top: 2rem;    right: 2rem; }
  .hero__corner--bl { bottom: 2rem; left: 2rem; }
  .hero__corner--br { bottom: 2rem; right: 2rem; }

  /* Animations */
  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50%       { opacity: 0.3; }
  }

  @media (max-width: 768px) {
    .hero__title { font-size: 3rem; }
  }
</style>