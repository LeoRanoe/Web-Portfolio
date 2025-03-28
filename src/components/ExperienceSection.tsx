import React from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'

interface Experience {
  id: string
  title: string
  company: string
  location: string
  period: string
  description: string
  skills: string[]
  type: 'work' | 'volunteer' | 'internship'
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

const ExperienceGrid = styled.div`
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

const ExperienceCard = styled(motion.div)`
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

const ExperienceType = styled.div<{ type: Experience['type'] }>`
  position: absolute;
  top: -1rem;
  left: 1rem;
  background: ${props => {
    switch (props.type) {
      case 'work': return '#ff0000'
      case 'volunteer': return '#00ff00'
      case 'internship': return '#0000ff'
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

const ExperienceTitle = styled.h3`
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

const CompanyName = styled.div`
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

const experiences: Experience[] = [
  {
    id: '1',
    title: 'Founder',
    company: 'Megapixel Developments',
    location: 'Paramaribo, Suriname',
    period: 'Jan 2024 - Present',
    description: 'Founded and lead a freelance web development company with peers, focusing on creating modern web solutions for clients.',
    skills: ['Web Development', 'Project Management', 'Client Communication', 'Team Leadership'],
    type: 'work'
  },
  {
    id: '2',
    title: 'Junior Mentor',
    company: 'Foundation Young Help Suriname',
    location: 'Paramaribo, Suriname',
    period: 'Nov 2024 - Present',
    description: 'Passionate about tech and youth development, grown from peer mentor to junior mentor, now dedicated to inspiring Suriname\'s youth through robotics, programming, and volunteering.',
    skills: ['Mentoring', 'Robotics', 'Programming', 'Youth Development'],
    type: 'volunteer'
  },
  {
    id: '3',
    title: 'IT Technician',
    company: 'Computer Hardware Services N.V.',
    location: 'Paramaribo, Suriname',
    period: 'Jan 2023 - Dec 2023',
    description: 'Provided technical support and hardware maintenance services, developing strong problem-solving and customer service skills.',
    skills: ['Hardware Maintenance', 'Technical Support', 'Customer Service', 'Problem Solving'],
    type: 'work'
  }
]

const ExperienceSection: React.FC = () => {
  return (
    <Section>
      <Title
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        Experience
      </Title>
      <ExperienceGrid>
        {experiences.map((experience, index) => (
          <ExperienceCard
            key={experience.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2 }}
            whileHover={{ scale: 1.02 }}
          >
            <ExperienceType type={experience.type}>
              {experience.type.toUpperCase()}
            </ExperienceType>
            <ExperienceTitle>{experience.title}</ExperienceTitle>
            <CompanyName>{experience.company}</CompanyName>
            <Location>{experience.location}</Location>
            <Period>{experience.period}</Period>
            <Description>{experience.description}</Description>
            <SkillsList>
              {experience.skills.map((skill, i) => (
                <SkillTag key={i}>{skill}</SkillTag>
              ))}
            </SkillsList>
          </ExperienceCard>
        ))}
      </ExperienceGrid>
    </Section>
  )
}

export default ExperienceSection 