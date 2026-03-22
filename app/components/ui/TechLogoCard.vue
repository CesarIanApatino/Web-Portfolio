<script setup lang="ts">
    import type { TechLogo } from '~/types/stack'
    defineProps<{ logo: TechLogo }>()
</script>

<template>
  <a :href="logo.href" target="_blank" rel="noopener noreferrer" class="tech-logo-card">
    <i :class="logo.icon" class="tech-logo-card__icon" />
    <span class="tech-logo-card__title font-mono">{{ logo.title }}</span>
  </a>
</template>

<style scoped>
    .tech-logo-card {
    border: 2px solid white;
    padding: 2rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    text-decoration: none;
    color: white;
    transition: background 0.3s, color 0.3s;
    }

    .tech-logo-card:hover { background: white; color: black; }

    .tech-logo-card__icon { font-size: 2rem; }

    .tech-logo-card__title {
    font-size: 10px;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    }
</style>