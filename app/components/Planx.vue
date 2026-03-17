<script setup lang="ts">
import { ref, onMounted } from 'vue'
import Avatar from 'primevue/avatar';
import type { Experience } from './TimelineItem.vue'
import ContactForm from './ContactForm.vue'
import FallingText from './FallingText.vue'
import Test from './Test.vue'
import Masonry from './Masonry.vue'

const isContactModalOpen = ref(false)

const openContactModal = () => {
  isContactModalOpen.value = true
}

const closeContactModal = () => {
  isContactModalOpen.value = false
}

const projects = ref([
  {
    id: 1,
    title: 'Funds Recorder',
    category: 'GUI',
    description: 'A Simple GUI Fund Records System with a CRUD Function with No Databse use. By using File Handling and Text Manipulation',
    year: '2025',
    tags: ['Java'],
    demoUrl: 'https://github.com/username/project1',
    codeUrl: 'https://github.com/username/project1',
    images: ['/Icon/Laravel.png', '/Icon/Three.png', '/Icon/gsap.png', '/Icon/monitor_958857.png', '/Icon/system-design.svg']
  },
  {
    id: 2,
    title: 'Web-Based Faculty Evaluation with Sentiment Analysis',
    category: 'Web App',
    description: 'An AI Faculty Evaluation with Sentiment Analysis is a Institution Evaluation System with Sentiment Analysis that Identify the feedback of students if its Positive, Negative or Neutral and separate them categoricaly.',
    year: '2025',
    tags: ['Python', 'Google Colab', 'Flask'],
    demoUrl: 'https://example.com/demo2',
    codeUrl: 'https://github.com/username/project2'
  },
  {
    id: 3,
    title: 'Tourist Spot',
    category: 'Mobile App',
    description: 'User-friendly mobile app designed to help travelers discover and explore tourist spots, featuring intuitive navigation, hotspot recommendations, and bookmarking functionality.',
    year: '2025',
    tags: ['Flutter', 'Firebase', 'Openstreetmap'],
    demoUrl: 'https://example.com/demo3',
    codeUrl: 'https://github.com/username/project3'
  }
])

const skills = ref([
 'TYPESCRIPT', 'VUE.JS', 'NUXT',
  'THREE.JS', 'GSAP', 'NODE.JS',
  'PYTHON', 'DESIGN', 'UI/UX', 'LARAVEL',
  'PHP','JAVA'
])

const experience = ref<Experience[]>([
  // — TECH —
  {
    id: 1,
    type: 'tech' as const,
    company: 'Engtech Global Solution Inc.',
    position: 'Junior Fullstack Developer',
    period: '2025 - PRESENT',
    description: 'Full-stack development of enterprise ERP systems, delivering 4–5 tasks weekly across the Accounting module.',
    achievements: [
      'Rapidly adapted to a complex legacy codebase and contributed meaningfully within the first month',
      'Contributed to technical discussions, identifying edge cases and proposing practical solutions',
    ],
    images: [
    ]
  },
  // — OTHER —
  {
    id: 2,
    type: 'other' as const,
    company: 'Self-Employed',
    position: 'Carpenter / Construction Helper',
    period: '2022 - 2023',
    description: 'Hands-on construction and carpentry work. Built discipline, attention to detail, and the ability to work under physical and time pressure.',
    achievements: [],
  },
  {
    id: 3,
    type: 'other' as const,
    company: 'Various Clients',
    position: 'Data Encoder',
    period: '2023 - 2024',
    description: 'Encoded and organized large volumes of data with high accuracy. Strengthened focus, consistency, and data handling skills.',
    achievements: [],
  },
])

const techLogos = ref([
  { 
    node: '<i class="pi pi-code" style="font-size: 2rem;"></i>', 
    title: "Development", 
    href: "https://vuejs.org" 
  },
  { 
    node: '<i class="pi pi-desktop" style="font-size: 2rem;"></i>', 
    title: "Frontend", 
    href: "https://vitejs.dev" 
  },
  { 
    node: '<i class="pi pi-server" style="font-size: 2rem;"></i>', 
    title: "Backend", 
    href: "https://nodejs.org" 
  },
  { 
    node: '<i class="pi pi-database" style="font-size: 2rem;"></i>', 
    title: "Database", 
    href: "https://www.postgresql.org" 
  },
]);

// Alternative with image sources
const imageLogos = [
  { src: "/logos/company1.png", alt: "Company 1", href: "https://company1.com" },
  { src: "/logos/company2.png", alt: "Company 2", href: "https://company2.com" },
  { src: "/logos/company3.png", alt: "Company 3", href: "https://company3.com" },
];

onMounted(() => {
  const sections = document.querySelectorAll('section')
  sections.forEach(section => {
    section.classList.add('fade-in-section')
  })
})
</script>

<template>
  <div class="parallax-content relative z-10 bg-black">
    <div class="parallax-layer layer-1 absolute inset-0 pointer-events-none">
      <div class="absolute top-1/4 left-1/4 brutal-border w-64 h-64 opacity-10"></div>
      <div class="absolute bottom-1/4 right-1/4 brutal-border-red w-48 h-48 opacity-10 rotate-45"></div>
      
      <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-5">
        <p class="font-display text-[20rem] leading-none whitespace-nowrap">PORTFOLIO</p>
      </div>
    </div>

    <div class="parallax-layer layer-2 absolute inset-0 pointer-events-none">
      <div class="absolute top-[30%] right-[10%] brutal-border w-32 h-32 opacity-20"></div>
      <div class="absolute top-[60%] left-[15%] brutal-border-red w-24 h-24 opacity-20 rotate-45"></div>
      <div class="absolute bottom-[20%] right-[20%] brutal-border w-16 h-16 opacity-15"></div>
    </div>

    <!-- Main Content -->
    <div class="relative z-20 max-w-7xl mx-auto px-6 md:px-12">
      
      <!-- About Section -->
      <section class="fade-in-section min-h-screen flex items-center py-24">
        <div class="w-full">
          <div class="brutal-border p-1 mb-4 inline-block">
            <span class="font-mono text-xs tracking-widest">[ ABOUT ]</span>
          </div>
        <div class="grid md:grid-cols-2 mt-12 border-t-4 border-black">

          <div class="relative border-r-0 md:border-r-4 border-white/20 border-b-4 md:border-b-0">
            
            <div class="corner-bracket-tl" />
            <div class="corner-bracket-tr" />

            <div class="w-full h-[340px] px-6 pb-6 pt-6">
              <ClientOnly>
                <FallingText
                  text="TRANSFORMING IDEAS INTO REALITY"
                  :highlight-words="['REALITY']"
                  trigger="hover"
                  :gravity="1.2"
                  font-size="clamp(2.2rem, 4.5vw, 4rem)"
                />
              </ClientOnly>
            </div>
          </div>

          <!-- RIGHT: About Panel -->
          <div class="relative bg-black text-white p-8 flex flex-col gap-6 min-h-[360px]">
            
            <!-- Red top-right corner dot -->
            <div class="absolute top-0 right-0 w-4 h-4 bg-red-600" />

            <!-- Section label -->
            <span class="text-[10px] font-black tracking-[0.25em] uppercase text-white/30">
              — WHO I AM
            </span>

            <!-- Bio text -->
            <p class="font-mono text-sm leading-relaxed text-white/75 max-w-sm">
              Hey, I'm <span class="text-white font-black not-italic">Ian</span> — a developer passionate 
              about building things that look great and feel effortless to use. 
              Always learning, always building.
            </p>

            <!-- Divider -->
            <div class="flex items-center gap-3">
              <div class="divider-dashed" />
              <span>Currently Exploring</span>
              <div class="divider-dashed" />
            </div>

            <!-- Tech Stack Grid -->
            <div class="grid grid-cols-4 gap-3">

              <!-- Laravel -->
              <div class="group flex flex-col items-center gap-2">
                <div class="icon-box">
                  <Avatar image="/Icon/laravel.svg" size="large" shape="square"
                    :style="{ width: '100%', height: '100%', objectFit: 'contain' }" />
                </div>
                <span class="text-muted-40" style="font-size: 9px; letter-spacing: 0.1em; text-transform: uppercase; font-weight: 900;">Laravel</span>
              </div>

              <!-- GSAP -->
              <div class="group flex flex-col items-center gap-2">
                <div class="icon-box">
                  <Avatar image="/Icon/gsap.svg" size="large" shape="square"
                    :style="{ width: '100%', height: '100%', objectFit: 'contain' }" />
                </div>
                <span class="text-muted-40" style="font-size: 9px; letter-spacing: 0.1em; text-transform: uppercase; font-weight: 900;">GSAP</span>
              </div>

              <!-- Three.js -->
              <div class="group flex flex-col items-center gap-2">
                <div class="icon-box">
                  <Avatar image="/Icon/Three.svg" size="large" shape="square"
                    :style="{ width: '100%', height: '100%', objectFit: 'contain', background: 'white' }" />
                </div>
                <span class="text-muted-40" style="font-size: 9px; letter-spacing: 0.1em; text-transform: uppercase; font-weight: 900;">Three.js</span>
              </div>

              <!-- System Design -->
              <div class="group flex flex-col items-center gap-2">
                <div class="icon-box">
                  <Avatar image="/Icon/system-design.svg" size="large" shape="square"
                    :style="{ width: '100%', height: '100%', objectFit: 'contain' }" />
                </div>
                <span class="text-muted-40" style="font-size: 9px; letter-spacing: 0.1em; text-transform: uppercase; font-weight: 900;">System Design</span>
              </div>
            </div>

            <!-- Bottom stat strip -->
            <div class="border-top-muted mt-auto pt-4 flex justify-between items-center">
              <span class="font-mono text-muted" style="font-size: 10px; letter-spacing: 0.1em;">EST. 2025</span>
              <div class="flex gap-1">
                <div class="dot-red" />
                <div class="dot-muted" />
                <div class="dot-muted" />
              </div>
            </div>

          </div>
        </div>
        </div>
      </section>

      <!-- Projects Section -->
      <section class="fade-in-section min-h-screen py-24">
        <Test />
      </section>

      <!-- Experience/Timeline Section -->
      <section class="fade-in-section min-h-screen py-24">
        <div class="brutal-border p-1 mb-4 inline-block">
          <span class="font-mono text-xs tracking-widest">[ EXPERIENCE ]</span>
        </div>

        <h2 class="font-display text-5xl md:text-7xl mb-16 leading-tight">
          WORK<br/>
          <span class="text-brutalist-red">HISTORY</span>
        </h2>

        <!-- TECH -->
        <div style="margin-bottom: 3rem;">
          <p style="font-family: monospace; font-size: 0.65rem; letter-spacing: 0.25em; color: #dc2626; text-transform: uppercase; margin-bottom: 1.5rem;">
            — TECH
          </p>
          <div class="space-y-8">
            <TimelineItem
              v-for="exp in experience.filter(e => e.type === 'tech')"
              :key="exp.id"
              :experience="exp"
            />
          </div>
        </div>

        <!-- OTHER -->
        <div>
          <p style="font-family: monospace; font-size: 0.65rem; letter-spacing: 0.25em; color: rgba(255,255,255,0.3); text-transform: uppercase; margin-bottom: 1.5rem;">
            — OTHER
          </p>
          <div class="space-y-4">
            <TimelineItem
              v-for="exp in experience.filter(e => e.type === 'other')"
              :key="exp.id"
              :experience="exp"
            />
          </div>
        </div>
      </section>

      <!-- Skills Section -->
      <section class="fade-in-section min-h-screen py-24">
        <div class="tes">
        <Masonry />
        </div>
      </section>

      <section class="fade-in-section min-h-screen py-24">
        <div class="tes">
        <Services />
        </div>
      </section>
      
        <section class="contact-section">
          <div class="contact-container">
            
            <!-- Header -->
            <div class="contact-header">
              <div class="brutal-border label-box">
                <span class="label-text">[ CONNECT ]</span>
              </div>
              
              <h2 class="contact-title">
                LET'S<br/>
                <span class="text-red">WORK</span><br/>
                TOGETHER
              </h2>
            </div>

            <!-- Contact Info Cards -->
            <div class="contact-grid">
              <a 
                href="https://www.linkedin.com/in/cesar-ian-apatino-b217893ab/"
                target="_blank"
                class="contact-card red-border"
              >
               <span class="block-number">01</span>
                <div class="card-label">LINKEDIN</div>
                <div class="card-value">linkedin.com/in/cesar-ian-apatino-b217893ab</div>
                <div class="card-arrow">→</div>
              </a>

              <div class="contact-card white-border">
                <span class="block-number">02</span>
                <div class="card-label">LOCATION</div>
                <div class="card-value">Butuan City, Philippines</div>
              </div>

              <a 
                href="https://github.com/GameSa0" 
                target="_blank"
                class="contact-card red-border"
              >
                <span class="block-number">03</span>
                <div class="card-label">GITHUB</div>
                <div class="card-value">github.com/GameSa0</div>
                <div class="card-arrow">→</div>
              </a>
            </div>

            <!-- CTA Box (moved from Services) -->
            <div class="contact-cta-box">
              <div class="cta-box">
                <div class="cta-content">
                  <span class="cta-label">READY TO START?</span>
                  <h3 class="cta-title">LET'S BUILD SOMETHING GREAT</h3>
                  <p class="cta-text">
                    Get in touch to discuss your project requirements and timeline.
                  </p>
                </div>
                <button @click="openContactModal" class="cta-button">
                  <span>GET IN TOUCH</span>
                  <span class="button-arrow">→</span>
                </button>
              </div>
            </div>

            <!-- Download CV Button -->
            <div class="download-cv-section">
              <a 
                href="/assets/CV/resume.pdf" 
                download
                target="_blank"
                rel="noreferrer noopener"
                class="download-cv-button"
              >
                <span class="button-icon">↓</span>
                <span class="button-text">DOWNLOAD CV</span>
              </a>
            </div>

          </div>

          <!-- Footer -->
          <footer class="contact-footer">
            <div class="footer-line"></div>
            <div class="footer-content">
              <span class="footer-text">© 2025 CESAR IAN APATINO</span>
              <span class="footer-text">TO LAZY TO DESIGN</span>
            </div>
          </footer>
        </section>

      <!-- Contact Modal -->
      <ContactModal :is-open="isContactModalOpen" @close="closeContactModal" />
        </div>
      </div>
</template>

<style scoped>
.contact-section {
  min-height: 100vh;
  background: #000;
  padding: 6rem 1.5rem 0;
}

.contact-container {
  max-width: 1200px;
  margin: 0 auto;
}

/* Header */
.contact-header {
  margin-bottom: 4rem;
}

.label-box {
  display: inline-block;
  padding: 6px 16px;
  margin-bottom: 2rem;
}

.label-text {
  font-family: var(--font-mono);
  font-size: 10px;
  letter-spacing: 0.2em;
  color: #fff;
}

.contact-title {
  font-family: var(--font-display);
  font-size: clamp(3rem, 8vw, 6rem);
  line-height: 0.9;
  color: #fff;
  margin: 0;
}

.text-red {
  color: #FF0000;
}

/* Contact Grid */
.contact-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
  margin-bottom: 4rem;
}

.contact-card {
  border: 2px solid #fff;
  padding: 1.5rem;
  position: relative;
  transition: all 0.3s ease;
  cursor: pointer;
  text-decoration: none;
  color: #fff;
  display: block;
}

.contact-card.red-border {
  border: 3px solid #FF0000;
}

.contact-card:hover.red-border {
  background: #FF0000;
  color: #000;
}

.contact-card:hover.white-border {
  background: #fff;
  color: #000;
}

.card-label {
  font-family: var(--font-mono);
  font-size: 10px;
  letter-spacing: 0.15em;
  opacity: 0.5;
  margin-bottom: 0.5rem;
}

.card-value {
  font-family: var(--font-mono);
  font-size: 13px;
  letter-spacing: 0.02em;
  line-height: 1.5;
}

.card-arrow {
  position: absolute;
  bottom: 1.5rem;
  right: 1.5rem;
  font-size: 20px;
  transition: transform 0.3s ease;
}

.contact-card:hover .card-arrow {
  transform: translateX(5px);
}

/* CTA Box (from Services) */
.contact-cta-box {
  margin-bottom: 2rem;
}

.cta-box {
  border: 3px solid #FF0000;
  padding: 3rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 3rem;
  background: #000;
  transition: background 0.3s ease;
}

.cta-box:hover {
  background: rgba(255, 0, 0, 0.05);
}

.cta-content {
  flex: 1;
}

.cta-label {
  font-family: var(--font-mono);
  font-size: 10px;
  letter-spacing: 0.2em;
  color: #FF0000;
  display: block;
  margin-bottom: 0.5rem;
}

.cta-title {
  font-family: var(--font-display);
  font-size: clamp(1.5rem, 4vw, 2.5rem);
  color: #fff;
  margin: 0 0 0.75rem 0;
  line-height: 1.1;
}

.cta-text {
  font-family: var(--font-mono);
  font-size: 13px;
  color: rgba(255, 255, 255, 0.7);
  margin: 0;
  line-height: 1.6;
}

.cta-button {
  border: 2px solid #fff;
  background: transparent;
  padding: 1.25rem 2rem;
  font-family: var(--font-mono);
  font-size: 12px;
  letter-spacing: 0.15em;
  color: #fff;
  display: inline-flex;
  align-items: center;
  gap: 1rem;
  transition: all 0.3s ease;
  white-space: nowrap;
  position: relative;
  overflow: hidden;
  cursor: pointer;
}

.cta-button::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: #fff;
  transition: left 0.4s ease;
  z-index: 0;
}

.cta-button:hover::before {
  left: 0;
}

.cta-button:hover {
  color: #000;
  border-color: #fff;
}

.cta-button span {
  position: relative;
  z-index: 1;
}

.button-arrow {
  font-size: 18px;
  transition: transform 0.3s ease;
}

.cta-button:hover .button-arrow {
  transform: translateX(5px);
}

/* Download CV Section */
.download-cv-section {
  display: flex;
  justify-content: center;
  margin-top: 2rem;
}

.download-cv-button {
  border: 3px solid #fff;
  background: transparent;
  color: #fff;
  padding: 1.5rem 2.5rem;
  font-family: var(--font-mono);
  font-size: 14px;
  letter-spacing: 0.15em;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 1rem;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  text-decoration: none;
}

.download-cv-button::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: #fff;
  transition: left 0.4s ease;
  z-index: 0;
}

.download-cv-button:hover::before {
  left: 0;
}

.download-cv-button:hover {
  color: #000;
}

.button-text,
.button-icon {
  position: relative;
  z-index: 1;
}

.button-icon {
  font-size: 20px;
  font-weight: bold;
}

/* Footer */
.contact-footer {
  margin-top: 6rem;
  padding: 2rem 0;
}

.footer-line {
  width: 100%;
  height: 2px;
  background: #fff;
  margin-bottom: 2rem;
}

.footer-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-family: var(--font-mono);
  font-size: 10px;
  letter-spacing: 0.1em;
  color: rgba(255, 255, 255, 0.5);
  flex-wrap: wrap;
  gap: 1rem;
}

/* Responsive */
@media (max-width: 1024px) {
  .cta-box {
    flex-direction: column;
    text-align: center;
    align-items: center;
    padding: 2rem;
  }
}

@media (max-width: 768px) {
  .contact-section {
    padding: 4rem 1rem 0;
  }

  .contact-grid {
    grid-template-columns: 1fr;
  }

  .cta-box {
    padding: 2rem;
  }

  .download-cv-button {
    width: 100%;
    justify-content: center;
  }

  .footer-content {
    flex-direction: column;
    text-align: center;
  }
}
</style>