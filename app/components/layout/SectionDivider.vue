<script setup lang="ts">
defineProps<{ label: string }>()
</script>

<template>
  <div class="divider" aria-hidden="true">

    <!-- Scanline overlay -->
    <div class="divider__scanlines" />

    <!-- Big background label -->
    <div class="divider__bg-text font-display" >{{ label }}</div>

    <!-- SVG wireframe shapes -->
    <svg class="divider__shapes" viewBox="0 0 1440 160" preserveAspectRatio="none"
         xmlns="http://www.w3.org/2000/svg">

      <!-- Rotating cube — left -->
      <g class="shape shape--white shape--spin-slow" style="transform-origin: 140px 80px;">
        <polygon points="120,40 160,40 160,80 120,80" fill="none" stroke="white" stroke-width="0.8"/>
        <polygon points="130,30 170,30 170,70 130,70" fill="none" stroke="white" stroke-width="0.8"/>
        <line x1="120" y1="40" x2="130" y2="30" stroke="white" stroke-width="0.8"/>
        <line x1="160" y1="40" x2="170" y2="30" stroke="white" stroke-width="0.8"/>
        <line x1="160" y1="80" x2="170" y2="70" stroke="white" stroke-width="0.8"/>
        <line x1="120" y1="80" x2="130" y2="70" stroke="white" stroke-width="0.8"/>
      </g>

      <!-- Triangle — left-center -->
      <g class="shape shape--red shape--float" style="transform-origin: 340px 80px;">
        <polygon points="340,30 310,110 370,110"
                 fill="none" stroke="#dc2626" stroke-width="1"/>
      </g>

      <!-- Octahedron — center-left -->
      <g class="shape shape--white shape--spin-reverse" style="transform-origin: 560px 80px;">
        <polygon points="560,30 600,80 560,130 520,80"
                 fill="none" stroke="white" stroke-width="0.8"/>
        <line x1="560" y1="30" x2="560" y2="130" stroke="white" stroke-width="0.5" opacity="0.4"/>
        <line x1="520" y1="80" x2="600" y2="80" stroke="white" stroke-width="0.5" opacity="0.4"/>
      </g>

      <!-- Small cube — center -->
      <g class="shape shape--red shape--spin-slow" style="transform-origin: 720px 80px;">
        <polygon points="705,60 735,60 735,100 705,100" fill="none" stroke="#dc2626" stroke-width="0.8"/>
        <polygon points="712,52 742,52 742,92 712,92"  fill="none" stroke="#dc2626" stroke-width="0.8"/>
        <line x1="705" y1="60" x2="712" y2="52" stroke="#dc2626" stroke-width="0.8"/>
        <line x1="735" y1="60" x2="742" y2="52" stroke="#dc2626" stroke-width="0.8"/>
        <line x1="735" y1="100" x2="742" y2="92" stroke="#dc2626" stroke-width="0.8"/>
        <line x1="705" y1="100" x2="712" y2="92" stroke="#dc2626" stroke-width="0.8"/>
      </g>

      <!-- Ring — center-right -->
      <g class="shape shape--white shape--float-reverse" style="transform-origin: 900px 80px;">
        <ellipse cx="900" cy="80" rx="38" ry="38"
                 fill="none" stroke="white" stroke-width="0.8"/>
        <ellipse cx="900" cy="80" rx="38" ry="14"
                 fill="none" stroke="white" stroke-width="0.5" opacity="0.5"/>
      </g>

      <!-- Triangle — right-center -->
      <g class="shape shape--red shape--spin-slow" style="transform-origin: 1100px 80px;">
        <polygon points="1100,28 1070,115 1130,115"
                 fill="none" stroke="#dc2626" stroke-width="1"/>
      </g>

      <!-- Cube — right -->
      <g class="shape shape--white shape--spin-reverse" style="transform-origin: 1310px 80px;">
        <polygon points="1290,45 1330,45 1330,85 1290,85" fill="none" stroke="white" stroke-width="0.8"/>
        <polygon points="1298,37 1338,37 1338,77 1298,77" fill="none" stroke="white" stroke-width="0.8"/>
        <line x1="1290" y1="45" x2="1298" y2="37" stroke="white" stroke-width="0.8"/>
        <line x1="1330" y1="45" x2="1338" y2="37" stroke="white" stroke-width="0.8"/>
        <line x1="1330" y1="85" x2="1338" y2="77" stroke="white" stroke-width="0.8"/>
        <line x1="1290" y1="85" x2="1298" y2="77" stroke="white" stroke-width="0.8"/>
      </g>

    </svg>

    <!-- Section label strip -->
    <div class="divider__label-strip">
      <span class="divider__label-text font-mono">— {{ label }}</span>
      <div class="divider__label-line" />
    </div>

  </div>
</template>

<style scoped>
  .divider {
    position: relative;
    width: 100%;
    height: 160px;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  /* Scanlines */
  .divider__scanlines {
    position: absolute;
    inset: 0;
    background-image: repeating-linear-gradient(
      0deg,
      transparent,
      transparent 2px,
      rgba(255, 255, 255, 0.015) 2px,
      rgba(255, 255, 255, 0.015) 4px
    );
    pointer-events: none;
    z-index: 1;
  }

  .divider__bg-text {
    position: absolute;
    font-size: clamp(5rem, 14vw, 12rem);
    font-weight: 900;
    white-space: nowrap;
    color: transparent;
    -webkit-text-stroke: 1px rgba(255, 255, 255, 0.06);
    letter-spacing: 0.05em;
    user-select: none;
    z-index: 3;  /* ← was 0, now above shapes */
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  .divider__shapes {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    z-index: 1;  
    opacity: 0.35;
  }

  /* Label strip at bottom */
  .divider__label-strip {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 0 2rem 0.75rem;
    z-index: 3;
  }

  .divider__label-text {
    font-size: 0.6rem;
    letter-spacing: 0.3em;
    text-transform: uppercase;
    color: rgba(255, 255, 255, 0.25);
    white-space: nowrap;
  }

  .divider__label-line {
    flex: 1;
    height: 1px;
    background: rgba(255, 255, 255, 0.08);
  }

  @keyframes spin-slow    { from { transform: rotate(0deg); }   to { transform: rotate(360deg); } }
  @keyframes spin-reverse { from { transform: rotate(0deg); }   to { transform: rotate(-360deg); } }
  @keyframes float        { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
  @keyframes float-reverse{ 0%,100% { transform: translateY(0); } 50% { transform: translateY(10px); } }

  .shape--spin-slow    { animation: spin-slow    12s linear infinite; }
  .shape--spin-reverse { animation: spin-reverse 9s  linear infinite; }
  .shape--float        { animation: float        4s  ease-in-out infinite; }
  .shape--float-reverse{ animation: float-reverse 5s ease-in-out infinite; }

  @media (prefers-reduced-motion: reduce) {
    .shape--spin-slow,
    .shape--spin-reverse,
    .shape--float,
    .shape--float-reverse { animation: none; }
  }
</style>