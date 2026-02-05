import { gsap } from 'gsap'
import type { TresObject } from '@tresjs/core'

export const use3DAnimation = () => {
  const animateShapes = (shapes: TresObject[]) => {
    shapes.forEach((shape, index) => {
      // Continuous rotation
      gsap.to(shape.rotation, {
        x: `+=${Math.PI * 2}`,
        y: `+=${Math.PI * 2}`,
        duration: 20 + index * 5,
        repeat: -1,
        ease: 'none',
      })

      // Floating animation
      gsap.to(shape.position, {
        y: `+=${0.3 + index * 0.1}`,
        duration: 3 + index * 0.5,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      })
    })
  }

  const animateOnScroll = (mesh: TresObject, scrollProgress: number) => {
    if (!mesh) return

    // Scale down as user scrolls
    const scale = 1 - scrollProgress * 0.3
    mesh.scale.set(scale, scale, scale)

    // Fade out
    if (mesh.material && 'opacity' in mesh.material) {
      mesh.material.opacity = 1 - scrollProgress
    }

    // Rotate faster on scroll
    mesh.rotation.y += scrollProgress * 0.02
  }

  const animateOnMouseMove = (
    mesh: TresObject,
    mouseX: number,
    mouseY: number,
    speed: number = 0.05
  ) => {
    if (!mesh) return

    gsap.to(mesh.rotation, {
      x: mouseY * speed,
      y: mouseX * speed,
      duration: 1,
      ease: 'power2.out',
    })
  }

  return {
    animateShapes,
    animateOnScroll,
    animateOnMouseMove,
  }
}