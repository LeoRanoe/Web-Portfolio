import React, { useState } from 'react'
import styled from 'styled-components'
import { motion, AnimatePresence } from 'framer-motion'
import { soundManager } from '../utils/sounds'

interface AboutSectionProps {
  id: string
}

const Section = styled.section`
  min-height: 100vh;
  padding: 4rem 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  z-index: 1;
`

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: start;
  position: relative;
  z-index: 1;
  width: 100%;
  padding: 0 1rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 2rem;
    padding: 0;
  }
`

const ProfileSection = styled(motion.div)`
  position: sticky;
  top: 2rem;
  text-align: center;
  background: rgba(0, 0, 0, 0.5);
  padding: 2rem;
  border-radius: 8px;
  border: 1px solid rgba(0, 255, 0, 0.2);
  box-shadow: 0 0 30px rgba(0, 255, 0, 0.1);
  backdrop-filter: blur(10px);

  @media (max-width: 768px) {
    position: relative;
    top: 0;
    padding: 1.5rem;
  }
`

const ProfilePicture = styled(motion.div)`
  width: 300px;
  height: 300px;
  margin: 0 auto 2rem;
  border-radius: 50%;
  overflow: hidden;
  border: 4px solid #00ff00;
  box-shadow: 0 0 20px rgba(0, 255, 0, 0.3);
  position: relative;

  @media (max-width: 768px) {
    width: 200px;
    height: 200px;
    margin: 0 auto 1.5rem;
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(45deg, transparent, rgba(0, 255, 0, 0.1), transparent);
    animation: scan 2s linear infinite;
  }

  &::after {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(circle, rgba(0, 255, 0, 0.1) 0%, transparent 70%);
    animation: rotate 10s linear infinite;
  }

  @keyframes scan {
    0% { transform: translateY(-100%); }
    100% { transform: translateY(100%); }
  }

  @keyframes rotate {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`

const ProfileImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: grayscale(50%) contrast(1.2);
`

const ProfileTitle = styled(motion.h2)`
  font-family: 'Press Start 2P', cursive;
  color: #00ff00;
  font-size: 1.8rem;
  margin-bottom: 1.5rem;
  text-shadow: 0 0 10px rgba(0, 255, 0, 0.5);
  position: relative;
  display: inline-block;

  @media (max-width: 768px) {
    font-size: 1.4rem;
    margin-bottom: 1rem;
  }

  &::after {
    content: '';
    position: absolute;
    bottom: -5px;
    left: 0;
    width: 100%;
    height: 2px;
    background: linear-gradient(90deg, transparent, #00ff00, transparent);
  }
`

const ProfileDescription = styled(motion.p)`
  font-family: 'Press Start 2P', cursive;
  color: #fff;
  font-size: 0.8rem;
  line-height: 1.8;
  margin-bottom: 2rem;
  text-shadow: 0 0 5px rgba(0, 255, 0, 0.3);

  @media (max-width: 768px) {
    font-size: 0.7rem;
    line-height: 1.6;
    margin-bottom: 1.5rem;
  }
`

const ProfileInfo = styled(motion.div)`
  margin-top: 2rem;
  padding: 2rem;
  background: rgba(0, 255, 0, 0.05);
  border: 1px solid rgba(0, 255, 0, 0.2);
  border-radius: 8px;
  box-shadow: 0 0 20px rgba(0, 255, 0, 0.1);

  @media (max-width: 768px) {
    margin-top: 1.5rem;
    padding: 1.5rem;
  }
`

const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  margin-bottom: 1.5rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 0.8rem;
  }
`

const InfoItem = styled(motion.div)`
  text-align: left;
  padding: 1rem;
  background: rgba(0, 255, 0, 0.05);
  border: 1px solid rgba(0, 255, 0, 0.2);
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;

  @media (max-width: 768px) {
    padding: 0.8rem;
  }

  &:hover {
    background: rgba(0, 255, 0, 0.1);
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(0, 255, 0, 0.2);
  }
`

const InfoLabel = styled.div`
  font-family: 'Press Start 2P', cursive;
  color: #00ff00;
  font-size: 0.7rem;
  margin-bottom: 0.5rem;
  text-shadow: 0 0 5px rgba(0, 255, 0, 0.3);

  @media (max-width: 768px) {
    font-size: 0.6rem;
  }
`

const InfoValue = styled.div`
  font-family: 'Press Start 2P', cursive;
  color: #fff;
  font-size: 0.8rem;
  text-shadow: 0 0 5px rgba(0, 255, 0, 0.2);

  @media (max-width: 768px) {
    font-size: 0.7rem;
  }
`

const SkillsContainer = styled(motion.div)`
  margin-top: 2rem;
  padding: 1.5rem;
  background: rgba(0, 255, 0, 0.05);
  border: 1px solid rgba(0, 255, 0, 0.2);
  border-radius: 8px;
  box-shadow: 0 0 20px rgba(0, 255, 0, 0.1);

  @media (max-width: 768px) {
    margin-top: 1.5rem;
    padding: 1rem;
  }
`

const SkillsTitle = styled(motion.h3)`
  font-family: 'Press Start 2P', cursive;
  color: #00ff00;
  font-size: 1.2rem;
  margin-bottom: 1.5rem;
  text-shadow: 0 0 10px rgba(0, 255, 0, 0.5);
  position: relative;
  display: inline-block;

  @media (max-width: 768px) {
    font-size: 1rem;
    margin-bottom: 1rem;
  }
`

const SkillsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.8rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 0.6rem;
  }
`

const SkillItem = styled(motion.div)`
  padding: 1rem;
  background: rgba(0, 255, 0, 0.05);
  border: 1px solid rgba(0, 255, 0, 0.2);
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;

  @media (max-width: 768px) {
    padding: 0.8rem;
  }

  &:hover {
    background: rgba(0, 255, 0, 0.1);
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(0, 255, 0, 0.2);
  }
`

const SkillName = styled.div`
  font-family: 'Press Start 2P', cursive;
  color: #fff;
  font-size: 0.6rem;
  margin-bottom: 0.3rem;

  @media (max-width: 768px) {
    font-size: 0.5rem;
  }
`

const SkillLevel = styled.div<{ level: number }>`
  height: 4px;
  background: rgba(0, 255, 0, 0.2);
  border-radius: 2px;
  overflow: hidden;

  &::after {
    content: '';
    display: block;
    height: 100%;
    width: ${props => props.level}%;
    background: linear-gradient(90deg, #00ff00, #00ffaa);
    box-shadow: 0 0 10px rgba(0, 255, 0, 0.5);
    transition: width 0.5s ease;
  }
`

const TimelineSection = styled(motion.div)`
  position: relative;
  background: rgba(0, 0, 0, 0.5);
  padding: 2rem;
  border-radius: 8px;
  border: 1px solid rgba(0, 255, 0, 0.2);
  box-shadow: 0 0 30px rgba(0, 255, 0, 0.1);
  backdrop-filter: blur(10px);
`

const TimelineSectionTitle = styled(motion.h2)`
  font-family: 'Press Start 2P', cursive;
  color: #00ff00;
  font-size: 2.2rem;
  margin-bottom: 3rem;
  text-shadow: 0 0 10px rgba(0, 255, 0, 0.5);
  position: relative;
  display: inline-block;

  &::after {
    content: '';
    position: absolute;
    bottom: -5px;
    left: 0;
    width: 100%;
    height: 2px;
    background: linear-gradient(90deg, transparent, #00ff00, transparent);
  }
`

const Timeline = styled.div`
  position: relative;
  padding-left: 2rem;

  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 2px;
    background: linear-gradient(to bottom, #00ff00, #00ffaa);
    box-shadow: 0 0 10px rgba(0, 255, 0, 0.5);
  }
`

const TimelineItem = styled(motion.div)`
  position: relative;
  margin-bottom: 3rem;
  padding: 1.5rem;
  background: rgba(0, 255, 0, 0.05);
  border: 1px solid rgba(0, 255, 0, 0.2);
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(0, 255, 0, 0.1);
    transform: translateX(10px);
    border-color: #00ff00;
    box-shadow: 0 0 20px rgba(0, 255, 0, 0.2);
  }

  &::before {
    content: '';
    position: absolute;
    left: -2.4rem;
    top: 50%;
    width: 1rem;
    height: 1rem;
    background: #00ff00;
    border-radius: 50%;
    transform: translateY(-50%);
    box-shadow: 0 0 10px rgba(0, 255, 0, 0.5);
  }
`

const TimelineDate = styled.div`
  font-family: 'Press Start 2P', cursive;
  color: #00ff00;
  font-size: 0.9rem;
  margin-bottom: 0.8rem;
  text-shadow: 0 0 5px rgba(0, 255, 0, 0.3);
`

const TimelineItemTitle = styled.h3`
  font-family: 'Press Start 2P', cursive;
  color: #fff;
  font-size: 1.1rem;
  margin-bottom: 0.8rem;
  text-shadow: 0 0 5px rgba(0, 255, 0, 0.2);
`

const TimelineDescription = styled.p`
  font-family: 'Press Start 2P', cursive;
  color: #ccc;
  font-size: 0.7rem;
  line-height: 1.8;
  text-shadow: 0 0 5px rgba(0, 255, 0, 0.1);
`

const timelineData = [
  {
    date: '2023 - Present',
    title: 'Full Stack Developer',
    description: 'Working on various web applications using React, Node.js, and TypeScript. Focused on creating responsive and user-friendly interfaces.'
  },
  {
    date: '2021 - 2023',
    title: 'Frontend Developer',
    description: 'Developed and maintained multiple client-side applications using modern JavaScript frameworks and libraries.'
  },
  {
    date: '2019 - 2021',
    title: 'Junior Developer',
    description: 'Started my journey in web development, learning the fundamentals of programming and web technologies.'
  }
]

const profileInfo = {
  location: 'Suriname',
  education: 'ICT-Software Engineering',
  school: 'NATIN-MBO',
  graduation: '2026',
  languages: 'English, Dutch',
  interests: 'Robotics, Videography'
}

const skills = [
  // Frontend
  { name: 'React', level: 90, category: 'Frontend' },
  { name: 'TypeScript', level: 85, category: 'Frontend' },
  { name: 'HTML/CSS', level: 95, category: 'Frontend' },
  { name: 'JavaScript', level: 90, category: 'Frontend' },
  // Backend
  { name: 'Node.js', level: 80, category: 'Backend' },
  { name: 'Python', level: 75, category: 'Backend' },
  { name: 'SQL', level: 70, category: 'Backend' },
  { name: 'REST APIs', level: 85, category: 'Backend' },
  // Tools & Others
  { name: 'Git', level: 85, category: 'Tools' },
  { name: 'Docker', level: 70, category: 'Tools' },
  { name: 'AWS', level: 65, category: 'Tools' },
  { name: 'CI/CD', level: 75, category: 'Tools' }
]

const SkillCategory = styled(motion.div)`
  margin-bottom: 1.5rem;
`

const CategoryTitle = styled(motion.h4)`
  font-family: 'Press Start 2P', cursive;
  color: #00ff00;
  font-size: 0.8rem;
  margin-bottom: 0.8rem;
  text-shadow: 0 0 10px rgba(0, 255, 0, 0.5);
`

const Tooltip = styled(motion.div)`
  position: absolute;
  background: rgba(0, 0, 0, 0.9);
  border: 1px solid #00ff00;
  border-radius: 4px;
  padding: 0.5rem;
  font-family: 'Press Start 2P', cursive;
  font-size: 0.6rem;
  color: #fff;
  z-index: 100;
  pointer-events: none;
  box-shadow: 0 0 10px rgba(0, 255, 0, 0.3);
  white-space: nowrap;
`

const SkillItemContainer = styled(motion.div)`
  position: relative;
`

const SkillLevelText = styled(motion.div)`
  font-family: 'Press Start 2P', cursive;
  color: #00ff00;
  font-size: 0.5rem;
  margin-top: 0.3rem;
  text-align: right;
`

const SkillIcon = styled(motion.div)`
  width: 16px;
  height: 16px;
  margin-right: 0.5rem;
  display: inline-block;
  vertical-align: middle;
`

const SkillHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 0.3rem;
`

const skillDetails = {
  React: {
    icon: '⚛️',
    description: 'Advanced React with hooks, context, and performance optimization'
  },
  TypeScript: {
    icon: '📘',
    description: 'Strong typing and advanced TypeScript features'
  },
  'HTML/CSS': {
    icon: '🎨',
    description: 'Responsive design and modern CSS techniques'
  },
  JavaScript: {
    icon: '⚡',
    description: 'ES6+ features and modern JavaScript patterns'
  },
  'Node.js': {
    icon: '🟢',
    description: 'Backend development and API design'
  },
  Python: {
    icon: '🐍',
    description: 'Scripting and automation'
  },
  SQL: {
    icon: '🗄️',
    description: 'Database design and optimization'
  },
  'REST APIs': {
    icon: '🔌',
    description: 'API design and integration'
  },
  Git: {
    icon: '📦',
    description: 'Version control and collaboration'
  },
  Docker: {
    icon: '🐳',
    description: 'Containerization and deployment'
  },
  AWS: {
    icon: '☁️',
    description: 'Cloud services and infrastructure'
  },
  'CI/CD': {
    icon: '🔄',
    description: 'Continuous integration and deployment'
  }
}

const ExperienceTimeline = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  margin-top: 2rem;
  position: relative;
  z-index: 1;
`

const ExperienceItem = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 1rem;
  background: rgba(0, 255, 0, 0.05);
  border: 1px solid rgba(0, 255, 0, 0.2);
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(0, 255, 0, 0.1);
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(0, 255, 0, 0.2);
  }
`

const ExperienceDate = styled.div`
  font-family: 'Press Start 2P', cursive;
  color: #00ff00;
  font-size: 0.9rem;
  text-shadow: 0 0 5px rgba(0, 255, 0, 0.3);
`

const ExperienceTitle = styled.h3`
  font-family: 'Press Start 2P', cursive;
  color: #fff;
  font-size: 1.1rem;
  text-shadow: 0 0 5px rgba(0, 255, 0, 0.2);
`

const ExperienceCompany = styled.div`
  font-family: 'Press Start 2P', cursive;
  color: #ccc;
  font-size: 0.7rem;
  text-shadow: 0 0 5px rgba(0, 255, 0, 0.1);
`

const ExperienceDescription = styled.p`
  font-family: 'Press Start 2P', cursive;
  color: #ccc;
  font-size: 0.7rem;
  line-height: 1.8;
  text-shadow: 0 0 5px rgba(0, 255, 0, 0.1);
`

const AboutSection: React.FC<AboutSectionProps> = ({ id }) => {
  const [activeSkill, setActiveSkill] = useState<string | null>(null)
  const [activeCategory, setActiveCategory] = useState<string | null>(null)

  const handleSkillClick = (skill: string) => {
    setActiveSkill(skill)
    setActiveCategory(null)
  }

  const handleCategoryClick = (category: string) => {
    soundManager.play('click')
    setActiveCategory(category)
  }

  const categories = Array.from(new Set(skills.map(skill => skill.category)))
  const filteredSkills = skills.filter(skill => skill.category === activeCategory)

  return (
    <Section id={id}>
      <Container>
        <ProfileSection
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <ProfilePicture
            whileHover={{ scale: 1.05 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <ProfileImage src="/profile.jpg" alt="Leonardo Ranoesendjojo" />
          </ProfilePicture>
          <ProfileTitle
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            About Me
          </ProfileTitle>
          <ProfileDescription
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            I'm a passionate Full Stack Developer with a strong foundation in web development
            and a keen eye for creating engaging user experiences. My journey in tech has
            been driven by a love for problem-solving and a desire to build meaningful
            applications that make a difference.
          </ProfileDescription>

          <ProfileInfo
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <InfoGrid>
              {Object.entries(profileInfo).map(([key, value]) => (
                <InfoItem
                  key={key}
                  whileHover={{ scale: 1.02 }}
                  onClick={() => soundManager.play('click')}
                >
                  <InfoLabel>{key.charAt(0).toUpperCase() + key.slice(1)}</InfoLabel>
                  <InfoValue>{value}</InfoValue>
                </InfoItem>
              ))}
            </InfoGrid>

            <SkillsContainer>
              <SkillsTitle>Skills</SkillsTitle>
              <SkillsGrid style={{ marginBottom: '1rem' }}>
                {categories.map((category) => (
                  <SkillItem
                    key={category}
                    whileHover={{ scale: 1.02 }}
                    onClick={(event) => handleCategoryClick(category)}
                    style={{
                      background: activeCategory === category ? 'rgba(0, 255, 0, 0.15)' : 'rgba(0, 255, 0, 0.05)',
                      borderColor: activeCategory === category ? '#00ff00' : 'rgba(0, 255, 0, 0.2)'
                    }}
                  >
                    <SkillName>{category}</SkillName>
                  </SkillItem>
                ))}
              </SkillsGrid>

              <SkillCategory>
                <CategoryTitle>{activeCategory}</CategoryTitle>
                <SkillsGrid>
                  {filteredSkills.map((skill) => (
                    <SkillItemContainer
                      key={skill.name}
                      whileHover={{ scale: 1.02 }}
                      onClick={(event) => handleSkillClick(skill.name)}
                    >
                      <SkillName>{skill.name}</SkillName>
                      <SkillLevel level={skill.level} />
                    </SkillItemContainer>
                  ))}
                </SkillsGrid>
              </SkillCategory>
            </SkillsContainer>
          </ProfileInfo>
        </ProfileSection>

        <ExperienceTimeline>
          {timelineData.map((exp, index) => (
            <ExperienceItem
              key={index}
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <ExperienceDate>{exp.date}</ExperienceDate>
              <ExperienceTitle>{exp.title}</ExperienceTitle>
              <ExperienceDescription>{exp.description}</ExperienceDescription>
            </ExperienceItem>
          ))}
        </ExperienceTimeline>
      </Container>

      <AnimatePresence>
        {activeSkill && (
          <Tooltip
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            style={{
              left: 10,
              top: 10
            }}
          >
            {skillDetails[activeSkill as keyof typeof skillDetails]?.description}
          </Tooltip>
        )}
      </AnimatePresence>
    </Section>
  )
}

export default AboutSection 