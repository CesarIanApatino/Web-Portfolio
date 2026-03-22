<script setup lang="ts">
  const { techStack } = useAbout()
</script>

<template>
  <section class="w-full">
    <div class="brutal-border p-1 mb-4 inline-block">
      <span class="font-mono text-xs tracking-widest">[ ABOUT ]</span>
    </div>
    <div class="grid md:grid-cols-2 mt-12 border-t-4 border-black">

      <!-- Left: Animated text -->
      <div class="relative border-b-4 md:border-b-0 md:border-r-4 border-white/20">
        <div class="corner-bracket-tl" />
        <div class="corner-bracket-tr" />
        <div class="w-full h-[340px] px-6 pt-6 pb-6">
          <ClientOnly>
            <AnimationFallingText
              text="TRANSFORMING IDEAS INTO REALITY"
              :highlight-words="['REALITY']"
              trigger="hover"
              :gravity="1.2"
              font-size="clamp(2.2rem, 4.5vw, 4rem)"
            />
          </ClientOnly>
        </div>
      </div>


      <div class="relative bg-black text-white p-8 flex flex-col gap-6 min-h-[360px]">
        <div class="absolute top-0 right-0 w-4 h-4 bg-red-600" />

        <span class="section-eyebrow">— WHO I AM</span>

        <div class="flex flex-col gap-3">
          <p class="bio-text">
            Hey, I'm <strong class="text-white">Ian</strong> — a
            <strong class="text-white">junior developer</strong> from
            <span class="text-white/90">Butuan City</span>, who builds fullstack
            web applications with <span class="text-white/90">Vue.js, Nuxt, and Laravel</span>.
          </p>
          <p class="bio-subtext">
            <span class="text-red-500 font-bold">7 months in</span>, I've shipped web apps
            and academic research projects.
            <span class="text-white font-bold">Currently seeking full-time roles.</span>
          </p>
        </div>

        <div class="flex items-center gap-3">
          <div class="divider-dashed" />
          <span class="font-mono text-[10px] tracking-wider text-white/40">Currently Enhancing</span>
          <div class="divider-dashed" />
        </div>

        <div class="grid grid-cols-4 gap-3">
          <UiTechBadge v-for="item in techStack" :key="item.name" :item="item" />
        </div>

        <div class="mt-auto pt-4 flex justify-between items-center border-t border-white/10">
          <span class="font-mono text-[10px] tracking-widest text-white/40">EST. 2025</span>
          <div class="flex gap-1">
            <div class="dot-red" />
            <div class="dot-muted" />
            <div class="dot-muted" />
          </div>
        </div>
      </div>

    </div>
  </section>
</template>