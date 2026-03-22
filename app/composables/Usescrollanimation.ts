import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export const useScrollAnimation = () => {
  let lenis: Lenis | null = null

  const initScroll = () => {
    gsap.registerPlugin(ScrollTrigger)

    lenis = new Lenis({
      duration:           1.2,
      easing:             (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation:        'vertical',
      gestureOrientation: 'vertical',
      smoothWheel:        true,
      wheelMultiplier:    1,
      syncTouch:          false,
      touchMultiplier:    2,
      infinite:           false,
    })

    lenis.on('scroll', ScrollTrigger.update)

    gsap.ticker.add((time) => lenis?.raf(time * 1000))
    gsap.ticker.lagSmoothing(0)

    return lenis
  }
  const setupParallax = () => {

    gsap.utils.toArray('.parallax-slow').forEach((el: any) => {
      gsap.to(el, {
        yPercent: -15,
        ease: 'none',
        scrollTrigger: {
          trigger: el.closest('.planx') ?? el,
          start:   'top bottom',
          end:     'bottom top',
          scrub:   1.5,
        },
      })
    })

    gsap.utils.toArray('.parallax-fast').forEach((el: any) => {
      gsap.to(el, {
        yPercent: -30,
        ease: 'none',
        scrollTrigger: {
          trigger: el.closest('.planx') ?? el,
          start:   'top bottom',
          end:     'bottom top',
          scrub:   1,
        },
      })
    })

    gsap.utils.toArray('.parallax-down').forEach((el: any) => {
      gsap.to(el, {
        yPercent: 10,
        ease: 'none',
        scrollTrigger: {
          trigger: el.closest('.planx') ?? el,
          start:   'top bottom',
          end:     'bottom top',
          scrub:   2,
        },
      })
    })

    gsap.utils.toArray('.divider__shapes').forEach((el: any) => {
      gsap.to(el, {
        xPercent: -5,
        ease: 'none',
        scrollTrigger: {
          trigger: el,
          start:   'top bottom',
          end:     'bottom top',
          scrub:   3,
        },
      })
    })
  }

  const setupScrollReveal = () => {
    gsap.utils.toArray('.planx__section').forEach((section: any) => {
      // Set initial state
      gsap.set(section, { opacity: 0, y: 30 })

      ScrollTrigger.create({
        trigger: section,
        start:   'top 85%',
        once:    true,
        onEnter: () => {
          gsap.to(section, {
            opacity:  1,
            y:        0,
            duration: 0.8,
            ease:     'power2.out',
          })
        },
      })
    })
  }

  const destroy = () => {
    lenis?.destroy()
    lenis = null
    ScrollTrigger.getAll().forEach(t => t.kill())
    gsap.ticker.remove((time) => lenis?.raf(time * 1000))
  }

  return {
    initScroll,
    setupParallax,
    setupScrollReveal,
    destroy,
  }
}