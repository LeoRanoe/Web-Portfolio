import { Project } from '../types/project'

export const projects: Project[] = [
  {
    id: '1',
    title: 'Robotics Mentorship Program',
    description: 'Led and developed a comprehensive robotics mentorship program for youth, focusing on hands-on learning and project-based development.',
    technologies: ['Robotics', 'Mentoring', 'Project Management', 'Leadership'],
    imageUrl: '/projects/robotics.png',
    questType: 'main',
    level: 90,
    xp: 900
  },
  {
    id: '2',
    title: 'IT Support System',
    description: 'Implemented and maintained a comprehensive IT support system for hardware and network infrastructure.',
    technologies: ['Hardware Support', 'Networking', 'System Administration', 'Technical Support'],
    imageUrl: '/projects/it-support.png',
    questType: 'side',
    level: 85,
    xp: 850
  },
  {
    id: '3',
    title: 'Megapixel Developments',
    description: 'Founded and lead a development company focused on creating innovative solutions and maintaining strong client relationships.',
    technologies: ['Project Management', 'Client Relations', 'Team Leadership', 'Business Development'],
    imageUrl: '/projects/megapixel.png',
    questType: 'main',
    level: 95,
    xp: 950
  }
] 