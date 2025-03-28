import React from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'

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

interface ProjectCardProps {
  project: Project
  index: number
}

const CardContainer = styled(motion.div)`
  background: #000;
  border: 2px solid #fff;
  padding: 1.5rem;
  margin: 1rem;
  max-width: 600px;
  position: relative;
  font-family: 'Press Start 2P', cursive;
  color: #fff;
  text-shadow: 2px 2px 0 #000;
  width: 100%;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 0 20px rgba(0, 255, 0, 0.2);
  }

  @media (max-width: 768px) {
    margin: 0.5rem;
    padding: 1rem;
  }
`

const QuestType = styled.div<{ type: Project['questType'] }>`
  position: absolute;
  top: -1rem;
  left: 1rem;
  background: ${props => {
    switch (props.type) {
      case 'main': return '#ff0000'
      case 'side': return '#00ff00'
      case 'daily': return '#0000ff'
      default: return '#ffffff'
    }
  }};
  padding: 0.5rem 1rem;
  font-size: 0.8rem;
  border: 2px solid #fff;

  @media (max-width: 768px) {
    font-size: 0.7rem;
    padding: 0.4rem 0.8rem;
  }
`

const Title = styled.h2`
  font-size: 1.2rem;
  margin-bottom: 1rem;
  padding-right: 2rem;
  color: #00ff00;
  text-shadow: 0 0 10px rgba(0, 255, 0, 0.5);

  @media (max-width: 768px) {
    font-size: 1rem;
    padding-right: 1.5rem;
  }
`

const Description = styled.p`
  font-size: 0.8rem;
  line-height: 1.5;
  margin-bottom: 1rem;
  color: #fff;

  @media (max-width: 768px) {
    font-size: 0.7rem;
  }
`

const TechList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1rem;

  @media (max-width: 768px) {
    gap: 0.3rem;
  }
`

const TechTag = styled.span`
  background: #fff;
  color: #000;
  padding: 0.3rem 0.6rem;
  font-size: 0.7rem;

  @media (max-width: 768px) {
    font-size: 0.6rem;
    padding: 0.2rem 0.4rem;
  }
`

const Links = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;

  @media (max-width: 768px) {
    gap: 0.8rem;
  }
`

const Link = styled.a`
  color: #fff;
  text-decoration: none;
  font-size: 0.8rem;
  position: relative;
  padding: 0.5rem 1rem;
  border: 2px solid #fff;
  transition: all 0.3s ease;

  &:hover {
    background: #fff;
    color: #000;
  }

  @media (max-width: 768px) {
    font-size: 0.7rem;
    padding: 0.4rem 0.8rem;
  }
`

const LevelBadge = styled.div`
  position: absolute;
  top: -1rem;
  right: 1rem;
  background: #fff;
  color: #000;
  padding: 0.3rem 0.6rem;
  font-size: 0.7rem;
  border: 2px solid #000;

  @media (max-width: 768px) {
    font-size: 0.6rem;
    padding: 0.2rem 0.4rem;
  }
`

const ProjectCard: React.FC<ProjectCardProps> = ({ project, index }) => {
  return (
    <CardContainer
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.2 }}
      whileHover={{ scale: 1.02 }}
    >
      <QuestType type={project.questType}>
        {project.questType.toUpperCase()} QUEST
      </QuestType>
      <LevelBadge>Level {project.level}</LevelBadge>
      <Title>{project.title}</Title>
      <Description>{project.description}</Description>
      <TechList>
        {project.technologies.map((tech, i) => (
          <TechTag key={i}>{tech}</TechTag>
        ))}
      </TechList>
      <Links>
        {project.github && (
          <Link href={project.github} target="_blank" rel="noopener noreferrer">
            GitHub
          </Link>
        )}
        {project.link && (
          <Link href={project.link} target="_blank" rel="noopener noreferrer">
            Live Demo
          </Link>
        )}
      </Links>
    </CardContainer>
  )
}

export default ProjectCard 