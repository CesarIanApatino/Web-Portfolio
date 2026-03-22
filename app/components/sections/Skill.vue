<script setup lang="ts">
  const { categories, techLogos } = useSkills()
</script>

<template>
  <section class="skills-section">

    <div class="brutal-border p-1 mb-4 inline-block">
      <span class="font-mono text-xs tracking-widest">[ CAPABILITIES ]</span>
    </div>

    <h2 class="skills-title font-display">SKILLS</h2>

    <div v-for="category in categories" :key="category.label">
      <p class="skill-category-label font-mono">{{ category.label }}</p>
      <div class="skills-grid">
        <UiSkillBox
          v-for="skill in category.skills"
          :key="skill.label"
          :skill="skill"
        />
      </div>
    </div>

    <!-- Tech logo cards -->
    <div class="tech-logos-grid">
      <UiTechLogoCard
        v-for="logo in techLogos"
        :key="logo.title"
        :logo="logo"
      />
    </div>

  </section>
</template>

<style scoped>
    .skills-section {
    padding: 6rem 1.5rem;
    max-width: 1400px;
    margin: 0 auto;
    }

    .skills-title {
    font-size: 5rem;
    margin-bottom: 4rem;
    line-height: 1;
    }

    .skills-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 1rem;
    margin-bottom: 4rem;
    }

    .skill-category-label {
    font-size: 11px;
    letter-spacing: 0.15em;
    color: #ff0000;
    margin-bottom: 1rem;
    margin-top: 2rem;
    }

    .tech-logos-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 1rem;
    margin-top: 4rem;
    }

    @media (max-width: 1024px) {
    .skills-grid       { grid-template-columns: repeat(3, 1fr); }
    .tech-logos-grid   { grid-template-columns: repeat(2, 1fr); }
    }

    @media (max-width: 768px) {
    .skills-grid       { grid-template-columns: repeat(2, 1fr); }
    .tech-logos-grid   { grid-template-columns: repeat(2, 1fr); }
    }
</style>