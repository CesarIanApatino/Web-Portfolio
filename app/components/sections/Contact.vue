<script setup lang="ts">
import ContactModal from '~/components/contact/ContactModal.vue'

const { contactLinks } = useContact()
const isModalOpen = ref(false)
</script>

<template>
  <section class="contact-section">
    <div class="contact-container">

      <!-- Header -->
      <div class="contact-header">
        <div class="brutal-border p-1 mb-4 inline-block">
          <span class="font-mono text-xs tracking-widest">[ CONNECT ]</span>
        </div>
        <h2 class="contact-title font-display">
          LET'S<br/>
          <span class="text-brutalist-red">WORK</span><br/>
          TOGETHER
        </h2>
      </div>

      <!-- Contact cards -->
      <div class="contact-grid">
        <component
          :is="link.href ? 'a' : 'div'"
          v-for="link in contactLinks"
          :key="link.id"
          :href="link.href ?? undefined"
          :target="link.href ? '_blank' : undefined"
          :rel="link.href ? 'noopener noreferrer' : undefined"
          class="contact-card"
          :class="`contact-card--${link.border}`"
        >
          <span class="contact-card__number font-mono">{{ link.id }}</span>
          <div class="contact-card__label font-mono">{{ link.label }}</div>
          <div class="contact-card__value font-mono">{{ link.value }}</div>
          <div v-if="link.href" class="contact-card__arrow">→</div>
        </component>
      </div>

      <!-- CTA -->
      <div class="cta-box">
        <div class="cta-box__content">
          <span class="cta-box__eyebrow font-mono">READY TO START?</span>
          <h3 class="cta-box__title font-display">LET'S BUILD SOMETHING GREAT</h3>
          <p class="cta-box__text font-mono">
            Get in touch to discuss your project requirements and timeline.
          </p>
        </div>
        <!-- ✅ Opens modal directly — no emit -->
        <button class="cta-box__btn font-mono" @click="isModalOpen = true">
          <span>GET IN TOUCH</span>
          <span>→</span>
        </button>
      </div>

      <!-- Download CV -->
      <div class="cv-download">
        <a
          href="/assets/CV/Cesar_Ian_Apatino_Resume.pdf"
          download
          target="_blank"
          rel="noopener noreferrer"
          class="cv-download__btn font-mono"
        >
          <span>↓</span>
          <span>DOWNLOAD CV</span>
        </a>
      </div>

    </div>

    <!-- Footer -->
    <footer class="contact-footer">
      <div class="contact-footer__line" />
      <div class="contact-footer__content">
        <span class="contact-footer__text font-mono">© 2025 CESAR IAN APATINO</span>
        <span class="contact-footer__text font-mono">TOO LAZY TO DESIGN</span>
      </div>
    </footer>

    <!-- ✅ Modal is fully self-contained here -->
    <ContactModal :is-open="isModalOpen" @close="isModalOpen = false" />

  </section>
</template>

<style scoped>
.contact-section { width: 100%; }

.contact-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 6rem 1.5rem;
}

/* Header */
.contact-title {
  font-size: clamp(3rem, 8vw, 6rem);
  line-height: 1;
  margin-bottom: 4rem;
}

/* Cards */
.contact-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  margin-bottom: 4rem;
}

.contact-card {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 2rem;
  text-decoration: none;
  color: white;
  transition: background 0.3s, color 0.3s;
  position: relative;
}

.contact-card--red   { border: 2px solid #ff0000; }
.contact-card--white { border: 2px solid white; }
.contact-card--red:hover { background: #ff0000; color: black; }

.contact-card__number {
  font-size: 4rem;
  font-weight: 700;
  line-height: 1;
  color: #ff0000;
  opacity: 0.3;
}

.contact-card__label {
  font-size: 0.65rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  opacity: 0.5;
}

.contact-card__value {
  font-size: 0.8rem;
  letter-spacing: 0.05em;
  word-break: break-all;
}

.contact-card__arrow {
  position: absolute;
  bottom: 2rem;
  right: 2rem;
  font-size: 1.5rem;
  transition: transform 0.3s;
}

.contact-card--red:hover .contact-card__arrow { transform: translateX(4px); }

/* CTA */
.cta-box {
  border: 3px solid #ff0000;
  padding: 3rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 2rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
}

.cta-box__eyebrow {
  font-size: 0.65rem;
  letter-spacing: 0.25em;
  color: #ff0000;
  text-transform: uppercase;
  display: block;
  margin-bottom: 0.5rem;
}

.cta-box__title {
  font-size: clamp(1.5rem, 3vw, 2rem);
  margin-bottom: 0.75rem;
}

.cta-box__text {
  font-size: 0.8rem;
  opacity: 0.6;
  line-height: 1.6;
}

.cta-box__btn {
  display: flex;
  align-items: center;
  gap: 1rem;
  border: 3px solid white;
  background: transparent;
  color: white;
  padding: 1.25rem 2rem;
  font-size: 0.75rem;
  letter-spacing: 0.15em;
  cursor: pointer;
  white-space: nowrap;
  transition: background 0.3s, color 0.3s, border-color 0.3s;
}
.cta-box__btn:hover { background: white; color: black; }

/* CV */
.cv-download { text-align: center; margin-top: 2rem; }

.cv-download__btn {
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  border: 2px solid white;
  padding: 1rem 2rem;
  font-size: 0.75rem;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  text-decoration: none;
  color: white;
  transition: background 0.3s, color 0.3s;
}
.cv-download__btn:hover { background: white; color: black; }

/* Footer */
.contact-footer { padding: 0 1.5rem 2rem; }

.contact-footer__line {
  height: 1px;
  background: rgba(255, 255, 255, 0.15);
  margin-bottom: 2rem;
}

.contact-footer__content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
}

.contact-footer__text {
  font-size: 0.65rem;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.3);
}

@media (max-width: 768px) {
  .contact-grid { grid-template-columns: 1fr; }
  .cta-box      { flex-direction: column; align-items: flex-start; }
  .cta-box__btn { width: 100%; justify-content: space-between; }
}
</style>