<script setup lang="ts">
  import SectionsAbout      from '~/components/sections/About.vue'
  import SectionsProject    from '~/components/sections/Project.vue'
  import SectionsExperience from '~/components/sections/Experience.vue'
  import SectionsSkill      from '~/components/sections/Skill.vue'
  import SectionsContact    from '~/components/sections/Contact.vue'
  import SectionDivider     from '~/components/layout/SectionDivider.vue'

  const { setupParallax, setupScrollReveal } = useScrollAnimation()

  onMounted(() => {
    setTimeout(() => {
      setupScrollReveal()
      setupParallax()
    }, 100)
  })
</script>

<template>
  <div class="planx">

    <div class="planx__bg" aria-hidden="true">
      <div class="planx__scanlines" />
      <p class="planx__watermark font-display parallax-down">PORTFOLIO</p>
      <div class="deco-box deco-box--white deco-box--tl parallax-slow" />
      <div class="deco-box deco-box--red   deco-box--br parallax-fast" />
      <div class="deco-box deco-box--white deco-box--tr parallax-fast" />
      <div class="deco-box deco-box--red   deco-box--bl parallax-slow" />
    </div>

    <!-- Scrollable content -->
    <div class="planx__content">

      <section class="planx__section">
        <SectionsAbout />
      </section>

      <SectionDivider label="PROJECTS" />

      <section class="planx__section">
        <SectionsProject />
      </section>

      <SectionDivider label="EXPERIENCE" />

      <section class="planx__section">
        <SectionsExperience />
      </section>

      <SectionDivider label="SKILLS" />

      <section class="planx__section">
        <SectionsSkill />
      </section>

      <SectionDivider label="CONTACT" />

      <section class="planx__section planx__section--contact">
        <SectionsContact />
      </section>

    </div>
  </div>
</template>

<style scoped>
  .planx {
    position: relative;
    background: #000;
    min-height: 100vh;
    overflow-x: hidden;
  }

  /* ── Background layer ── */
  .planx__bg {
    position: absolute;
    inset: 0;
    pointer-events: none;
    z-index: 0;
    overflow: hidden;
  }

  .planx__scanlines {
    position: absolute;
    inset: 0;
    background-image: repeating-linear-gradient(
      0deg,
      transparent,
      transparent 3px,
      rgba(255, 255, 255, 0.012) 3px,
      rgba(255, 255, 255, 0.012) 4px
    );
  }

  .planx__watermark {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: clamp(6rem, 20vw, 20rem);
    line-height: 1;
    white-space: nowrap;
    color: transparent;
    -webkit-text-stroke: 1px rgba(255, 255, 255, 0.03);
    user-select: none;
    letter-spacing: 0.05em;
    pointer-events: none;
  }

  /* ── Decorative boxes ── */
  .deco-box {
    position: absolute;
    opacity: 0.07;
  }
  .deco-box--white { border: 2px solid white; }
  .deco-box--red   { border: 2px solid #dc2626; }
  .deco-box--tl { top: 15%;    left: 5%;   width: 180px; height: 180px; }
  .deco-box--br { bottom: 12%; right: 6%;  width: 120px; height: 120px; transform: rotate(45deg); }
  .deco-box--tr { top: 40%;    right: 3%;  width: 80px;  height: 80px; }
  .deco-box--bl { bottom: 35%; left: 3%;   width: 60px;  height: 60px;  transform: rotate(45deg); }

  /* ── Content ── */
  .planx__content {
    position: relative;
    z-index: 10;
    max-width: 1400px;
    margin: 0 auto;
    padding: 0 1.5rem;
  }

  .planx__section {
    min-height: 100vh;
    padding: 6rem 0;
  }

  .planx__section--contact {
    padding: 0;
    min-height: unset;
  }

  /* ── Responsive ── */
  @media (max-width: 768px) {
    .planx__content   { padding: 0 1rem; }
    .planx__section   { padding: 4rem 0; }
    .planx__watermark { font-size: 6rem; }
  }
</style>