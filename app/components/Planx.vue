<script setup lang="ts">
import { ref, onMounted } from 'vue'
import ProjectCard from './ProjectCard.vue'

const projects = ref([
  {
    id: 1,
    title: 'Funds Recorder',
    category: 'GUI',
    description: 'A Simple GUI Fund Records System with a CRUD Function with No Databse use. By using File Handling and Text Manipulation',
    year: '2025',
    tags: ['Java'],
    demoUrl: 'https://github.com/username/project1',
    codeUrl: 'https://github.com/username/project1'
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
  'PHP'
])

const experience = ref([
  {
    id: 1,
    company: 'Engtech Global Solution Inc.',
    position: 'Junior Fullstack Developer',
    period: '2025 - PRESENT',
    description: 'Contributed on development of interactive web experiences using modern frameworks.',
    achievements: [
      'Contributed to full-stack development of enterprise ERP systems Accounting module, completing 4-5 tasks weekly based on complexity',
      'Accelerated project delivery by quickly adapting to complex codebase and learning new technical skills independently',
      'Contributed to technical discussions and brainstorming sessions, identifying potential issues and proposing practical solutions'
    ]
  }
])

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
          
          <h2 class="font-display text-5xl md:text-7xl mb-8 leading-tight">
            TRANSFORMING<br/>
            IDEAS INTO<br/>
            <span class="text-brutalist-red">REALITY</span>
          </h2>
          
          <div class="grid md:grid-cols-2 gap-12 mt-12">
            <div class="brutal-border p-8">
              <p class="font-mono text-sm leading-relaxed opacity-80">
                Hey, I'm Ian. I'm a person who loves programming, designing websites and apps. I enjoy making things that look nice and are easy for people to use.
                I like learning new things and working on projects that help me get better. If you want to work together or see what I can do, check out my portfolio below!
              </p>
            </div>
            
            <div class="brutal-border brutal-border-red p-8">
              <p class="font-mono text-xs tracking-widest mb-4">CURRENT FOCUS:</p>
              <ul class="font-mono text-sm space-y-2">
                <li>> Thres.js & GSAP</li>
                <li>> NUXT</li>
                <li>> Laravel</li>
                <li>> System Design</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <!-- Projects Section -->
      <section class="fade-in-section min-h-screen py-24">
        <div class="brutal-border p-1 mb-4 inline-block">
          <span class="font-mono text-xs tracking-widest">[ SELECTED WORK ]</span>
        </div>
        
        <h2 class="font-display text-5xl md:text-7xl mb-16 leading-tight">
          PERSONAL & SCHOOL PROJECTS
        </h2>

        <div class="space-y-8">
          <ProjectCard
            v-for="(project, index) in projects"
            :key="project.id"
            :project="project"
            :index="index"
          />
        </div>
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

        <div class="space-y-8">
          <TimelineItem
            v-for="exp in experience"
            :key="exp.id"
            :experience="exp"
          />
        </div>
      </section>

      <!-- Skills Section -->
      <section class="fade-in-section min-h-screen py-24">
        <div class="brutal-border p-1 mb-4 inline-block">
          <span class="font-mono text-xs tracking-widest">[ CAPABILITIES ]</span>
        </div>
        
        <h2 class="font-display text-5xl md:text-7xl mb-16 leading-tight">
          SKILLS
        </h2>

        <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div
            v-for="skill in skills"
            :key="skill"
            class="brutal-border p-6 hover:bg-white hover:text-black transition-all duration-300 text-center cursor-pointer"
          >
            <span class="font-mono text-sm tracking-widest">
              {{ skill }}
            </span>
          </div>
        </div>

        <!-- Stats -->
        <div class="grid md:grid-cols-3 gap-8 mt-16">
          <div class="brutal-border-red p-8 text-center hover:bg-brutalist-red hover:text-black transition-all duration-300 cursor-pointer">
            <p class="font-display text-5xl mb-2">3</p>
            <p class="font-mono text-xs tracking-widest opacity-70">PROJECTS</p>
          </div>
          <div class="brutal-border p-8 text-center hover:bg-white hover:text-black transition-all duration-300 cursor-pointer">
            <p class="font-display text-5xl mb-2">7</p>
            <p class="font-mono text-xs tracking-widest opacity-70">MONTHS EXP</p>
          </div>
          <div class="brutal-border p-8 text-center hover:bg-white hover:text-black transition-all duration-300 cursor-pointer">
            <p class="font-display text-5xl mb-2">∞</p>
            <p class="font-mono text-xs tracking-widest opacity-70">CREATIVITY</p>
          </div>
        </div>
      </section>

      <!-- Contact Section -->
      <section class="fade-in-section min-h-screen flex items-center py-24">
        <div class="w-full">
          <div class="brutal-border p-1 mb-4 inline-block">
            <span class="font-mono text-xs tracking-widest">[ CONNECT ]</span>
          </div>
          
          <h2 class="font-display text-5xl md:text-8xl mb-16 leading-tight">
            LET'S<br/>
            <span class="text-brutalist-red">WORK</span><br/>
            TOGETHER
          </h2>

          <div class="mb-16 text-center">
            <div class="brutal-border p-1 mb-4 inline-block">
              <span class="font-mono text-xs tracking-widest">[ CONNECT ]</span>
            </div>
            <div class="grid md:grid-cols-4 gap-4 max-w-3xl mx-auto">
              <a 
                href="mailto:your.email@example.com"
                class="brutal-border p-6 hover:bg-white hover:text-black transition-all duration-300 cursor-pointer text-center text-white no-underline"
              >
                <p class="font-mono text-xs tracking-widest mb-2 opacity-50">EMAIL</p>
                <p class="font-mono text-sm">cesar.ian.apatino23@gmail.com</p>
              </a>
              
              <div class="brutal-border p-6 hover:bg-white hover:text-black transition-all duration-300 cursor-pointer text-center text-white">
                <p class="font-mono text-xs tracking-widest mb-2 opacity-50">LOCATION</p>
                <p class="font-mono text-sm">Butuan City, Philippines</p>
              </div>
              
              <a 
                href="https://github.com/GameSa0" 
                target="_blank"
                class="brutal-border p-6 hover:bg-white hover:text-black transition-all duration-300 cursor-pointer text-center text-white no-underline"
              >
                <p class="font-mono text-xs tracking-widest mb-2 opacity-50">GITHUB</p>
                <p class="font-mono text-sm">github.com/GameSa0</p>
              </a>
              
              <a 
                href="https://linkedin.com/in/yourname" 
                target="_blank"
                class="brutal-border p-6 hover:bg-white hover:text-black transition-all duration-300 cursor-pointer text-center text-white no-underline"
              >
                <p class="font-mono text-xs tracking-widest mb-2 opacity-50">LINKEDIN</p>
                <p class="font-mono text-sm">None</p>
              </a>
            </div>
          </div>

          <!-- Contact Form -->
          <div class="max-w-2xl mx-auto">
            <div class="brutal-border p-1 mb-2 inline-block">
              <span class="font-mono text-xs tracking-widest">[ SEND MESSAGE ]</span>
            </div>
            <ContactForm />
          </div>

          <!-- CTA -->
          <div class="mt-16 text-center">
            <a 
              href="/assets/CV/resume.pdf" 
              download
              class="brutal-border-red px-12 py-6 font-mono text-sm tracking-widest text-white hover:bg-brutalist-red hover:text-black transition-all duration-300 inline-block no-underline"
            >
              DOWNLOAD CV
            </a>
          </div>
        </div>
      </section>

      <!-- Footer -->
      <footer class="py-12 border-t-2 border-white mt-24">
        <div class="flex flex-col md:flex-row justify-between items-center gap-4">
          <p class="font-mono text-xs opacity-50">
            'To Shallow to Brag'
          </p>
          <p class="font-mono text-xs opacity-50">
            DESIGNED & DEVELOPED WITH ❤️
          </p>
        </div>
      </footer>
    </div>
  </div>
</template>

<style scoped>
.parallax-layer {
  will-change: transform;
}

.layer-1 {
  transform: translateZ(-1px) scale(1.1);
}

.layer-2 {
  transform: translateZ(-0.5px) scale(1.05);
}

/* Custom scrollbar */
::-webkit-scrollbar {
  width: 10px;
}

::-webkit-scrollbar-track {
  background: #000;
  border-left: 2px solid #fff;
}

::-webkit-scrollbar-thumb {
  background: #ff0000;
  border: 2px solid #000;
}

::-webkit-scrollbar-thumb:hover {
  background: #fff;
}
</style>
