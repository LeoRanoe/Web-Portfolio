export interface Project {
  id: string
  title: string
  description: string
  technologies: string[]
  imageUrl: string
  githubUrl?: string
  liveUrl?: string
  questType: 'main' | 'side' | 'daily'
  level: number
  xp: number
} 