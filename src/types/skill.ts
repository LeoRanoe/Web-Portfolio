export interface Skill {
  id: string
  name: string
  category: 'frontend' | 'backend' | 'tools' | 'other'
  level: number
  maxLevel: number
  xp: number
  maxXp: number
  description: string
  icon: string
  isUnlocked: boolean
} 