import type { Experience } from '~/types/stack'

export const useExperience = () => {
  const experience: Experience[] = [
    {
      id: 1,
      type: 'tech',
      company: 'Engtech Global Solution Inc.',
      position: 'Junior Fullstack Developer',
      period: 'AUGUST 2025 - FEBRUARY 2026',
      description: 'Full-stack development of enterprise ERP systems, delivering 4–5 tasks weekly across the Accounting module.',
      achievements: [
        'Delivered fullstack tasks weekly on a live ERP accounting system built with Laravel + Nuxt',
        'Contributed to technical discussions, identifying edge cases and proposing practical solutions',
        'Collaborated with senior developers to implement features and fix bugs in a production environment',
        'Maintained code quality and consistency following established coding standards and best practices',
      ],
      images: [],
    },
    {
      id: 2,
      type: 'other',
      company: 'Self-Employed',
      position: 'Carpenter / Construction Helper',
      period: '2020 - 2021',
      description: 'Hands-on construction and carpentry work. Built discipline, attention to detail, and the ability to work under physical and time pressure.',
      achievements: [],
    },
    {
      id: 3,
      type: 'other',
      company: 'Various Clients',
      position: 'Data Encoder',
      period: 'MARCH 2022 - APRIL 2022',
      description: 'Encoded and organized large volumes of data with high accuracy. Strengthened focus, consistency, and data handling skills.',
      achievements: [],
    },
  ]

  const techExperience = experience.filter(e => e.type === 'tech')
  const otherExperience = experience.filter(e => e.type === 'other')

  return { experience, techExperience, otherExperience }
}