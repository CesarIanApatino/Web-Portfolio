import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export const useScrollAnimation = () => {
  let lenis: Lenis | null = null
  
  const initScroll = () => {
    gsap.registerPlugin(ScrollTrigger)
    
    lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      syncTouch: false,
      touchMultiplier: 2,
      infinite: false,
    })

    lenis.on('scroll', ScrollTrigger.update)

    gsap.ticker.add((time) => {
      lenis?.raf(time * 1000)
    })

    gsap.ticker.lagSmoothing(0)

    return lenis
  }

  const setupParallax = () => {
    gsap.utils.toArray('.layer-1').forEach((layer: any) => {
      gsap.to(layer, {
        yPercent: -20,
        ease: 'none',
        scrollTrigger: {
          trigger: layer,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
      })
    })

    gsap.utils.toArray('.layer-2').forEach((layer: any) => {
      gsap.to(layer, {
        yPercent: -10,
        ease: 'none',
        scrollTrigger: {
          trigger: layer,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
      })
    })

    gsap.utils.toArray('.layer-4').forEach((layer: any) => {
      gsap.to(layer, {
        yPercent: 10,
        ease: 'none',
        scrollTrigger: {
          trigger: layer,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
      })
    })

    gsap.utils.toArray('.fade-in-section').forEach((section: any) => {
      gsap.from(section, {
        opacity: 0,
        y: 50,
        duration: 1,
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
          end: 'top 50%',
          scrub: 1,
        },
      })
    })
  }

  const destroy = () => {
    if (lenis) {
      lenis.destroy()
      lenis = null
    }
    ScrollTrigger.getAll().forEach(trigger => trigger.kill())
  }

  return {
    initScroll,
    setupParallax,
    destroy,
  }
}

