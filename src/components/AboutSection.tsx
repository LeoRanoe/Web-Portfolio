import React from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 4rem 2rem;
  display: flex;
  gap: 3rem;
  align-items: flex-start;
  position: relative;
  z-index: 1;

  @media (max-width: 768px) {
    flex-direction: column;
    padding: 2rem 1rem;
    gap: 2rem;
  }
`

const LeftSection = styled.div`
  flex: 0 0 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;

  @media (max-width: 768px) {
    flex: 1;
    width: 100%;
  }
`

const RightSection = styled.div`
  flex: 1;
  background: rgba(0, 0, 0, 0.5);
  border: 1px solid rgba(0, 255, 0, 0.2);
  border-radius: 8px;
  padding: 2rem;
  backdrop-filter: blur(10px);

  @media (max-width: 768px) {
    padding: 1.5rem;
  }
`

const ProfileImage = styled(motion.img)`
  width: 250px;
  height: 250px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid #00ff00;
  box-shadow: 0 0 20px rgba(0, 255, 0, 0.2);
  margin-bottom: 1.5rem;
  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 0 30px rgba(0, 255, 0, 0.3);
    border-color: #00ffaa;
  }

  @media (max-width: 768px) {
    width: 200px;
    height: 200px;
  }
`

const ProfileTitle = styled(motion.h2)`
  font-family: 'Press Start 2P', cursive;
  color: #00ff00;
  font-size: 1.5rem;
  margin-bottom: 1rem;
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

  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
`

const ProfileDescription = styled(motion.p)`
  font-family: 'Press Start 2P', cursive;
  color: #fff;
  font-size: 0.8rem;
  line-height: 1.6;
  margin-bottom: 1.5rem;
  text-shadow: 0 0 5px rgba(0, 255, 0, 0.3);

  @media (max-width: 768px) {
    font-size: 0.7rem;
  }
`

const InfoBox = styled.div`
  width: 100%;
  background: rgba(0, 0, 0, 0.5);
  border: 1px solid rgba(0, 255, 0, 0.2);
  border-radius: 8px;
  padding: 1.5rem;
  margin-top: 1rem;
  backdrop-filter: blur(10px);

  @media (max-width: 768px) {
    padding: 1rem;
  }
`

const InfoItem = styled.div`
  text-align: left;
  margin-bottom: 1rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid rgba(0, 255, 0, 0.1);

  &:last-child {
    margin-bottom: 0;
    padding-bottom: 0;
    border-bottom: none;
  }
`

const InfoLabel = styled.div`
  font-family: 'Press Start 2P', cursive;
  color: #00ff00;
  font-size: 0.7rem;
  margin-bottom: 0.3rem;
  text-shadow: 0 0 5px rgba(0, 255, 0, 0.3);
`

const InfoValue = styled.div`
  font-family: 'Press Start 2P', cursive;
  color: #fff;
  font-size: 0.8rem;
  text-shadow: 0 0 5px rgba(0, 255, 0, 0.2);
`

const SkillsTitle = styled.h3`
  font-family: 'Press Start 2P', cursive;
  color: #00ff00;
  font-size: 1.2rem;
  margin-bottom: 2rem;
  text-shadow: 0 0 10px rgba(0, 255, 0, 0.5);
`

const SkillsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
`

const SkillItem = styled(motion.div)`
  background: rgba(0, 255, 0, 0.05);
  border: 1px solid rgba(0, 255, 0, 0.2);
  border-radius: 4px;
  padding: 1rem;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(0, 255, 0, 0.1);
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(0, 255, 0, 0.2);
  }
`

const SkillName = styled.div`
  font-family: 'Press Start 2P', cursive;
  color: #fff;
  font-size: 0.8rem;
  margin-bottom: 0.5rem;
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

const AboutSection: React.FC = () => {
  return (
    <Container>
      <LeftSection>
        <ProfileImage 
          src="/profile.jpg" 
          alt="Leonardo Ranoesendjojo"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        />
        <ProfileTitle>Leonardo Ranoesendjojo</ProfileTitle>
        <ProfileDescription>
          🌟 18-year-old aspiring Software Engineer | Youth Tech Advocate | Lifelong Learner
        </ProfileDescription>
        <InfoBox>
          <InfoItem>
            <InfoLabel>Location</InfoLabel>
            <InfoValue>Paramaribo, Suriname</InfoValue>
          </InfoItem>
          <InfoItem>
            <InfoLabel>Education</InfoLabel>
            <InfoValue>ICT Studies at NATIN</InfoValue>
          </InfoItem>
          <InfoItem>
            <InfoLabel>Experience</InfoLabel>
            <InfoValue>2+ Years</InfoValue>
          </InfoItem>
        </InfoBox>
      </LeftSection>

      <RightSection>
        <SkillsTitle>Skills & Expertise</SkillsTitle>
        <SkillsGrid>
          <SkillItem
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <SkillName>Programming</SkillName>
            <SkillLevel level={90} />
          </SkillItem>
          <SkillItem
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <SkillName>Robotics</SkillName>
            <SkillLevel level={85} />
          </SkillItem>
          <SkillItem
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <SkillName>Web Development</SkillName>
            <SkillLevel level={95} />
          </SkillItem>
          <SkillItem
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <SkillName>Project Management</SkillName>
            <SkillLevel level={85} />
          </SkillItem>
          <SkillItem
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <SkillName>Mentoring</SkillName>
            <SkillLevel level={90} />
          </SkillItem>
          <SkillItem
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
          >
            <SkillName>Team Leadership</SkillName>
            <SkillLevel level={80} />
          </SkillItem>
        </SkillsGrid>
      </RightSection>
    </Container>
  )
}

export default AboutSection 