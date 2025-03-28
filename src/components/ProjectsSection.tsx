import React from 'react'
import styled, { keyframes } from 'styled-components'
import { motion } from 'framer-motion'

const scanline = keyframes`
  0% {
    transform: translateY(-100%);
  }
  100% {
    transform: translateY(100%);
  }
`;

const glow = keyframes`
  0%, 100% { text-shadow: 0 0 10px rgba(0, 255, 0, 0.5); }
  50% { text-shadow: 0 0 20px rgba(0, 255, 0, 0.8); }
`;

const pulse = keyframes`
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
`;

const Section = styled.section`
  min-height: 100vh;
  padding: 4rem 2rem;
  background: linear-gradient(180deg, #000000 0%, #001100 100%);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 200%;
    background: repeating-linear-gradient(
      0deg,
      rgba(0, 255, 0, 0.03) 0px,
      rgba(0, 255, 0, 0.03) 1px,
      transparent 1px,
      transparent 2px
    );
    pointer-events: none;
    animation: ${scanline} 10s linear infinite;
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
  animation: ${glow} 2s ease-in-out infinite;

  &::after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 60%;
    height: 2px;
    background: linear-gradient(90deg, transparent, #00ff00, transparent);
  }

  @media (max-width: 768px) {
    font-size: 2rem;
    margin-bottom: 2rem;
  }
`

const MissionGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`

const MissionCard = styled(motion.div)`
  background: rgba(0, 17, 0, 0.5);
  border: 2px solid #00ff00;
  border-radius: 15px;
  padding: 2rem;
  position: relative;
  overflow: hidden;
  box-shadow: 0 0 20px rgba(0, 255, 0, 0.1);

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(45deg, transparent, rgba(0, 255, 0, 0.1), transparent);
    transform: translateX(-100%);
    transition: transform 0.5s;
  }

  &:hover::before {
    transform: translateX(100%);
  }
`

const MissionTitle = styled.h3`
  font-family: 'Press Start 2P', cursive;
  color: #00ff00;
  font-size: 1.2rem;
  margin-bottom: 1rem;
  text-shadow: 0 0 5px rgba(0, 255, 0, 0.5);
`

const MissionStatus = styled.span<{ status: 'completed' | 'in-progress' }>`
  font-family: 'Press Start 2P', cursive;
  font-size: 0.8rem;
  color: ${props => props.status === 'completed' ? '#00ff00' : '#ffff00'};
  background: rgba(0, 255, 0, 0.1);
  padding: 0.3rem 0.6rem;
  border-radius: 4px;
  border: 1px solid ${props => props.status === 'completed' ? '#00ff00' : '#ffff00'};
  margin-bottom: 1rem;
  display: inline-block;
`

const MissionDescription = styled.p`
  font-family: 'Press Start 2P', cursive;
  color: #ffffff;
  font-size: 0.8rem;
  margin-bottom: 1.5rem;
  line-height: 1.5;
`

const ToolsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 1rem;
`

const ToolTag = styled.span`
  font-family: 'Press Start 2P', cursive;
  font-size: 0.7rem;
  color: #00ff00;
  background: rgba(0, 255, 0, 0.1);
  padding: 0.3rem 0.6rem;
  border-radius: 4px;
  border: 1px solid #00ff00;
`

const projects = [
  {
    id: 1,
    title: 'Transactify',
    status: 'completed',
    description: 'A secure transaction platform developed during the AIthon Hackathon. Features include API integration, frontend interface, and real-time transaction processing.',
    tools: ['Node.js', 'PHP', 'Laravel', 'React Native', 'JavaScript', 'SQL', 'AI']
  },
  {
    id: 2,
    title: 'SEOGS Oil and Gas Summit Robotics',
    status: 'completed',
    description: 'Led the development of functional robots for showcase at the annual SEOGS Oil and Gas Summit. Focused on innovation and technical excellence.',
    tools: ['Robotics', 'Programming', 'Project Management', 'Team Leadership']
  },
  {
    id: 3,
    title: 'Tech Genius Program',
    status: 'completed',
    description: 'Contributed to the development of STEM education initiatives, focusing on robotics and programming. Won the Drivetrain Engineering competition.',
    tools: ['STEM Education', 'Robotics', 'Mentoring', 'Programming']
  },
  {
    id: 4,
    title: 'FIRST Global Challenge',
    status: 'completed',
    description: 'Represented Suriname in the international robotics competition, developing solutions for global challenges through innovative robotics.',
    tools: ['Robotics', 'International Collaboration', 'Problem Solving', 'Team Leadership']
  }
];

const ProjectsSection: React.FC = () => {
  return (
    <Section id="projects">
      <Title
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        Mission Log
      </Title>
      <MissionGrid>
        {projects.map((project, index) => (
          <MissionCard
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: index * 0.2 }}
          >
            <MissionTitle>{project.title}</MissionTitle>
            <MissionStatus status={project.status as 'completed' | 'in-progress'}>
              {project.status === 'completed' ? 'MISSION COMPLETE' : 'IN PROGRESS'}
            </MissionStatus>
            <MissionDescription>{project.description}</MissionDescription>
            <ToolsContainer>
              {project.tools.map((tool, i) => (
                <ToolTag key={i}>{tool}</ToolTag>
              ))}
            </ToolsContainer>
          </MissionCard>
        ))}
      </MissionGrid>
    </Section>
  )
}

export default ProjectsSection 