import React from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'

interface Project {
  id: string
  title: string
  organization: string
  location: string
  period: string
  description: string
  skills: string[]
  type: 'robotics' | 'education' | 'competition'
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

const ProjectGrid = styled.div`
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

const ProjectCard = styled(motion.div)`
  background: #000;
  border: 2px solid #fff;
  padding: 1.5rem;
  margin: 1rem;
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

const ProjectType = styled.div<{ type: Project['type'] }>`
  position: absolute;
  top: -1rem;
  left: 1rem;
  background: ${props => {
    switch (props.type) {
      case 'robotics': return '#ff0000'
      case 'education': return '#00ff00'
      case 'competition': return '#0000ff'
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

const ProjectTitle = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
  padding-right: 2rem;
  color: #00ff00;
  text-shadow: 0 0 10px rgba(0, 255, 0, 0.5);

  @media (max-width: 768px) {
    font-size: 1rem;
    padding-right: 1.5rem;
  }
`

const Organization = styled.div`
  font-size: 0.9rem;
  color: #fff;
  margin-bottom: 0.5rem;
`

const Location = styled.div`
  font-size: 0.8rem;
  color: #ccc;
  margin-bottom: 0.5rem;
`

const Period = styled.div`
  font-size: 0.8rem;
  color: #00ff00;
  margin-bottom: 1rem;
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

const SkillsList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 1rem;

  @media (max-width: 768px) {
    gap: 0.3rem;
  }
`

const SkillTag = styled.span`
  background: #fff;
  color: #000;
  padding: 0.3rem 0.6rem;
  font-size: 0.7rem;

  @media (max-width: 768px) {
    font-size: 0.6rem;
    padding: 0.2rem 0.4rem;
  }
`

const projects: Project[] = [
  {
    id: '1',
    title: 'SEOGS Oil and Gas Summit Robotics',
    organization: 'Foundation Young Help Suriname',
    location: 'Paramaribo, Suriname',
    period: 'Apr 2024 - Jun 2024',
    description: 'Led robotics team in building functional robots for the annual SEOGS Oil and Gas Summit in Suriname. Focused on increasing visibility, inspiring youth, and attracting potential investors.',
    skills: ['Robotics', 'Project Planning', 'Leadership', 'Teamwork', 'Public Speaking'],
    type: 'robotics'
  },
  {
    id: '2',
    title: 'Tech Genius Program',
    organization: 'Foundation Young Help Suriname',
    location: 'Paramaribo, Suriname',
    period: 'Mar 2024 - Present',
    description: 'As a peer mentor in the Tech Genius program, contributing to empowering science and technology leadership among Suriname\'s youth through hands-on STEM applications, particularly in robotics.',
    skills: ['STEM Education', 'Robotics', 'Mentoring', 'Leadership', 'Youth Development'],
    type: 'education'
  },
  {
    id: '3',
    title: 'FIRST Global Challenge',
    organization: 'Surinamese Robotics Team',
    location: 'International',
    period: 'Aug 2023 - Oct 2023',
    description: 'Represented Suriname in the international robotics competition, collaborating with global teams to address critical engineering challenges. Part of the traveling team in the FIRST Global Challenge, an Olympics-style event gathering teams from around the world.',
    skills: ['International Competition', 'Robotics', 'Teamwork', 'Problem Solving', 'Engineering'],
    type: 'competition'
  }
]

const NonCodingProjectsSection: React.FC = () => {
  return (
    <Section>
      <Title
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        Non-Coding Projects
      </Title>
      <ProjectGrid>
        {projects.map((project, index) => (
          <ProjectCard
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2 }}
            whileHover={{ scale: 1.02 }}
          >
            <ProjectType type={project.type}>
              {project.type.toUpperCase()}
            </ProjectType>
            <ProjectTitle>{project.title}</ProjectTitle>
            <Organization>{project.organization}</Organization>
            <Location>{project.location}</Location>
            <Period>{project.period}</Period>
            <Description>{project.description}</Description>
            <SkillsList>
              {project.skills.map((skill, i) => (
                <SkillTag key={i}>{skill}</SkillTag>
              ))}
            </SkillsList>
          </ProjectCard>
        ))}
      </ProjectGrid>
    </Section>
  )
}

export default NonCodingProjectsSection 