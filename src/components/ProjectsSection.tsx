import React from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import ProjectCard from './ProjectCard'

interface Project {
  id: string
  title: string
  description: string
  technologies: string[]
  link: string
  github: string
  questType: 'main' | 'side' | 'daily'
  level: number
}

const Section = styled.section`
  padding: 4rem 2rem;
  background: #000;
  position: relative;
  overflow: hidden;
  width: 100%;
  max-width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: repeating-linear-gradient(
      0deg,
      rgba(0, 255, 0, 0.03) 0px,
      rgba(0, 255, 0, 0.03) 1px,
      transparent 1px,
      transparent 2px
    );
    pointer-events: none;
  }

  @media (max-width: 768px) {
    padding: 2rem 1rem;
  }
`

const Title = styled(motion.h2)`
  font-family: 'Press Start 2P', cursive;
  font-size: 2.5rem;
  color: #00ff00;
  text-align: center;
  margin-bottom: 3rem;
  text-shadow: 0 0 10px rgba(0, 255, 0, 0.5);
  position: relative;
  display: inline-block;
  width: 100%;
  text-align: center;

  &::after {
    content: '';
    position: absolute;
    bottom: -5px;
    left: 50%;
    transform: translateX(-50%);
    width: 80%;
    height: 2px;
    background: linear-gradient(90deg, transparent, #00ff00, transparent);
  }

  @media (max-width: 768px) {
    font-size: 2rem;
    margin-bottom: 2rem;
  }
`

const ProjectsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  padding: 0 2rem;
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
    padding: 0 1rem;
  }
`

const projects: Project[] = [
  {
    id: '1',
    title: 'Transactify',
    description: 'Developed an API with frontend for secure transactions platform during AIthon Hackathon. Collaborated under tight deadlines to create a working product from concept to deployment.',
    technologies: ['Node.js', 'PHP', 'Laravel', 'React Native', 'JavaScript', 'SQL', 'AI'],
    link: 'https://github.com/yourusername/transactify',
    github: 'https://github.com/yourusername/transactify',
    questType: 'main',
    level: 5
  },
  {
    id: '2',
    title: 'Megapixel Developments',
    description: 'Founded a freelance web development company with fellow students, providing budget-friendly websites for individuals and small businesses.',
    technologies: ['Web Development', 'Project Management', 'Client Communication', 'Team Collaboration'],
    link: 'https://megapixeldevelopments.com',
    github: 'https://github.com/yourusername/megapixel',
    questType: 'main',
    level: 4
  }
]

const ProjectsSection: React.FC = () => {
  return (
    <Section>
      <Title
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        Projects
      </Title>
      <ProjectsGrid>
        {projects.map((project, index) => (
          <ProjectCard key={project.id} project={project} index={index} />
        ))}
      </ProjectsGrid>
    </Section>
  )
}

export default ProjectsSection 