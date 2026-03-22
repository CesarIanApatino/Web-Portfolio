<script setup lang="ts">
    const { techExperience, otherExperience } = useExperience()
</script>

<template>
  <section class="experience-section fade-in-section min-h-screen py-24">

    <div class="brutal-border p-1 mb-4 inline-block">
      <span class="font-mono text-xs tracking-widest">[ EXPERIENCE ]</span>
    </div>

    <h2 class="font-display experience-heading leading-tight">
      WORK<br/>
      <span class="text-brutalist-red">HISTORY</span>
    </h2>

    <!-- Tech -->
    <div class="experience-group">
      <p class="experience-group__label experience-group__label--red font-mono">— TECH</p>
      <div class="space-y-8">
        <TimelineItem
          v-for="exp in techExperience"
          :key="exp.id"
          :experience="exp"
        />
      </div>
    </div>

    <!-- Other -->
    <div class="experience-group">
      <p class="experience-group__label experience-group__label--muted font-mono">— OTHER</p>
      <div class="space-y-4">
        <TimelineItem
          v-for="exp in otherExperience"
          :key="exp.id"
          :experience="exp"
        />
      </div>
    </div>

  </section>
</template>

<style scoped>
    .experience-heading {
    font-size: clamp(3rem, 7vw, 4.5rem);
    margin-bottom: 4rem;
    }

    .experience-group {
    margin-bottom: 3rem;
    }

    .experience-group__label {
    font-size: 0.65rem;
    letter-spacing: 0.25em;
    text-transform: uppercase;
    margin-bottom: 1.5rem;
    }

    .experience-group__label--red   { color: #dc2626; }
    .experience-group__label--muted { color: rgba(255, 255, 255, 0.3); }
</style>