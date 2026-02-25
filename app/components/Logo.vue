<template>
  <div class="flex items-center justify-center p-12 bg-transparent">
  <!-- Logo Container -->
  <div class="relative w-full max-w-xl">
    <svg viewBox="0 0 700 800" xmlns="http://www.w3.org/2000/svg" class="w-full h-auto">
      <!-- Letter C (Stencil Style) -->
      <g fill="#FFFFFF">
        <!-- Top horizontal bar -->
        <path d="M280 165 L440 165 L440 245 L320 245 L320 165 Z" />
        <!-- Left side with angled corners -->
        <path d="M165 280 L280 165 L320 165 L320 245 L245 320 L245 480 L320 555 L320 635 L280 635 L165 520 Z" />
        <!-- Bottom horizontal bar -->
        <path d="M280 635 L440 635 L440 555 L320 555 L320 635 Z" />
        <!-- Stencil cutouts for C -->
        <path d="M340 315 L440 315 L440 395 L340 395 Z" />
        <path d="M340 480 L440 480 L440 600 L340 600 Z" />
      </g>

      <!-- Red Accent Shape (Positioned closer to C) -->
      <path d="M445 265 L490 310 L490 565 L445 610 Z" fill="#9e1b1b" />

      <!-- Letter I (Shifted left to reduce distance) -->
      <g fill="rgb(255, 255, 255)" transform="translate(-40, 0)">
        <!-- Top bar -->
        <path d="M540 165 L740 165 L740 245 L540 245 Z" />
        <!-- Main vertical stem -->
        <path d="M590 245 L690 245 L690 555 L590 555 Z" />
        <!-- Bottom bar -->
        <path d="M540 555 L740 555 L740 635 L540 635 Z" />
      </g>
    </svg>
  </div>
</div>
</template>