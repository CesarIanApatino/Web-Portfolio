export type ExperienceType = 'tech' | 'other'
export type ProjectCategory = 'ALL' | 'WEB APPS' | 'DESKTOP APPS' | 'ACADEMIC' | 'EXPERIMENTAL' | 'ARCHIVED'
export type SkillSize = 'large' | 'medium' | 'small'
export type SkillHover = 'red' | 'invert'

export interface TechItem {
  name: string
  icon: string
  style?: Record<string, string>
}

export interface Skill {
  label: string
  size: SkillSize
  hover: SkillHover
}

export interface SkillCategory {
  label: string
  skills: Skill[]
}

export interface TechLogo {
  icon: string
  title: string
  href: string
}

export interface Project {
  link: string
  text: string
  category: ProjectCategory
  description: string
  stack: string
  features: string[]
  images: string[]
  year: string
  role: string
}

export interface Experience {
  id: number
  company: string
  position: string
  period: string
  description: string
  achievements: string[]
  type: ExperienceType
  images?: string[]
}

export interface HeroCornerLabel {
  position: 'tl' | 'tr' | 'bl' | 'br'
  text: string
}

export interface LoadingStage {
  text: string
  threshold: number
}

export interface TextTypeProps {
  text:                  string | string[]
  as?:                   string
  className?:            string
  typingSpeed?:          number
  initialDelay?:         number
  pauseDuration?:        number
  deletingSpeed?:        number
  loop?:                 boolean
  textColors?:           string[]
  variableSpeed?:        { min: number; max: number }
  reverseMode?:          boolean
  showCursor?:           boolean
  hideCursorWhileTyping?: boolean
  cursorCharacter?:      string
  cursorBlinkDuration?:  number
  cursorClassName?:      string
  startOnVisible?:       boolean
  onSentenceComplete?:   (sentence: string, index: number) => void
}