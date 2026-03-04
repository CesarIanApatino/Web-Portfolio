<template>
  <section class="skills-section">
    <div class="section-label">[ CAPABILITIES ]</div>
    <h2 class="section-title">SKILLS</h2>

    <!-- Asymmetric grid -->
    <div class="skills-grid">
      <div class="skill-box large hover-red">
        <span class="skill-name">TYPESCRIPT</span>
      </div>
      <div class="skill-box large hover-red">
        <span class="skill-name">VUE.JS</span>
      </div>
      <div class="skill-box large hover-red">
        <span class="skill-name">NUXT</span>
      </div>
      <div class="skill-box large hover-red">
        <span class="skill-name">LARAVEL</span>
      </div>
      
      <div class="skill-box medium hover-invert">THREE.JS</div>
      <div class="skill-box medium hover-invert">GSAP</div>
      <div class="skill-box medium hover-invert">NODE.JS</div>
      
      <div class="skill-box small hover-invert">PYTHON</div>
      <div class="skill-box small hover-invert">DESIGN</div>
      <div class="skill-box small hover-invert">UI/UX</div>
      <div class="skill-box small hover-invert">PHP</div>
      <div class="skill-box small hover-invert">JAVA</div>
    </div>

    <!-- Stats with better spacing -->
    <div class="stats-grid">
      <div class="stat-box red-border">
        <div class="stat-number">3</div>
        <div class="stat-label">PROJECTS</div>
      </div>
      <div class="stat-box">
        <div class="stat-number">7</div>
        <div class="stat-label">MONTHS EXP</div>
      </div>
      <div class="stat-box">
        <div class="stat-number">∞</div>
        <div class="stat-label">CREATIVITY</div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.skills-section {
  padding: 6rem 1.5rem;
  max-width: 1400px;
  margin: 0 auto;
}

.section-label {
  border: 2px solid white;
  display: inline-block;
  padding: 4px 12px;
  font-family: var(--font-mono);
  font-size: 10px;
  letter-spacing: 0.15em;
  margin-bottom: 1rem;
}

.section-title {
  font-family: var(--font-display);
  font-size: 5rem;
  margin-bottom: 4rem;
  line-height: 1;
}

/* Asymmetric Grid */
.skills-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
  margin-bottom: 4rem;
}

.skill-box {
  border: 2px solid white;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-family: var(--font-mono);
  font-size: 14px;
  letter-spacing: 0.1em;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

/* Size variations */
.skill-box.large {
  grid-column: span 2;
  grid-row: span 2;
  font-size: 18px;
  gap: 1rem;
}

.skill-box.medium {
  grid-column: span 1;
  padding: 1.5rem;
}

.skill-box.small {
  grid-column: span 1;
  padding: 1rem;
  font-size: 12px;
}

/* Hover effects */
.hover-red:hover {
  border-color: #FF0000;
  background: #FF0000;
  color: black;
}

.hover-invert:hover {
  background: white;
  color: black;
}

/* Add scan line effect on hover */
.skill-box::before {
  content: '';
  position: absolute;
  top: -100%;
  left: 0;
  width: 100%;
  height: 2px;
  background: #FF0000;
  transition: top 0.3s ease;
}

.skill-box:hover::before {
  top: 100%;
}

/* Stats Grid */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  margin-top: 4rem;
}

.stat-box {
  border: 2px solid white;
  padding: 3rem 2rem;
  text-align: center;
  transition: all 0.3s ease;
  cursor: pointer;
}

.stat-box.red-border {
  border: 3px solid #FF0000;
}

.stat-box:hover {
  background: white;
  color: black;
}

.stat-number {
  font-family: var(--font-display);
  font-size: 4rem;
  line-height: 1;
  margin-bottom: 0.5rem;
}

.stat-label {
  font-family: var(--font-mono);
  font-size: 10px;
  letter-spacing: 0.15em;
  opacity: 0.7;
}

/* Responsive */
@media (max-width: 1024px) {
  .skills-grid {
    grid-template-columns: repeat(3, 1fr);
  }
  
  .skill-box.large {
    grid-column: span 2;
    grid-row: span 1;
  }
}

@media (max-width: 768px) {
  .skills-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .skill-box.large {
    grid-column: span 2;
  }
  
  .skill-box.medium,
  .skill-box.small {
    grid-column: span 1;
  }
  
  .stats-grid {
    grid-template-columns: 1fr;
  }
}
</style>