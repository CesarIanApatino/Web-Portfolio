import type { TechItem } from '~/types/stack'

export const useAbout = () => {
  const techStack: TechItem[] = [
    { name: 'Laravel',       icon: '/Icon/laravel.svg' },     
    { name: 'GSAP',          icon: '/Icon/gsap.svg' },       
    { name: 'Three.js',      icon: '/Icon/Three.svg', style: { background: 'white' } },
    { name: 'System Design', icon: '/Icon/system-design.svg', style: { background: '#1a1a1a' } }
  ]
  return { techStack }
}