import type { SkillCategory, TechLogo } from '~/types/stack'

export const useSkills = () => {
  const categories: SkillCategory[] = [
    {
      label: '— CORE STACK',
      skills: [
        { label: 'TYPESCRIPT', size: 'large', hover: 'red' },
        { label: 'VUE.JS',     size: 'large', hover: 'red' },
        { label: 'NUXT',       size: 'large', hover: 'red' },
        { label: 'LARAVEL',    size: 'large', hover: 'red' },
      ],
    },
    {
      label: '— FRONTEND',
      skills: [
        { label: 'THREE.JS', size: 'medium', hover: 'invert' },
        { label: 'GSAP',     size: 'medium', hover: 'invert' },
        { label: 'UI/UX',    size: 'medium', hover: 'invert' },
        { label: 'DESIGN',   size: 'medium', hover: 'invert' },
      ],
    },
    {
      label: '— BACKEND & DB',
      skills: [
        { label: 'PHP',        size: 'medium', hover: 'invert' },
        { label: 'NODE.JS',    size: 'medium', hover: 'invert' },
        { label: 'POSTGRESQL', size: 'medium', hover: 'invert' },
        { label: 'MYSQL',      size: 'medium', hover: 'invert' },
        { label: 'PYTHON',     size: 'medium', hover: 'invert' },
      ],
    },
  ]

  const techLogos: TechLogo[] = [
    { icon: 'pi pi-code',     title: 'Development', href: 'https://vuejs.org' },
    { icon: 'pi pi-desktop',  title: 'Frontend',    href: 'https://vitejs.dev' },
    { icon: 'pi pi-server',   title: 'Backend',     href: 'https://nodejs.org' },
    { icon: 'pi pi-database', title: 'Database',    href: 'https://www.postgresql.org' },
  ]

  return { categories, techLogos }
}