import React from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'

const Section = styled.section`
  min-height: 100vh;
  padding: 4rem 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  z-index: 1;
`

const Title = styled(motion.h2)`
  font-family: 'Press Start 2P', cursive;
  color: #00ff00;
  font-size: 2.5rem;
  margin-bottom: 3rem;
  text-align: center;
  text-shadow: 0 0 10px rgba(0, 255, 0, 0.5);
`

const Content = styled.div`
  display: flex;
  gap: 4rem;
  max-width: 1200px;
  margin: 0 auto;
  align-items: flex-start;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 2rem;
  }
`

const ProfileImage = styled(motion.img)`
  width: 300px;
  height: 300px;
  border-radius: 15px;
  object-fit: cover;
  border: 2px solid #00ff00;
  box-shadow: 0 0 20px rgba(0, 255, 0, 0.3);

  @media (max-width: 768px) {
    width: 200px;
    height: 200px;
  }
`

const InfoContainer = styled.div`
  flex: 1;
`

const Description = styled(motion.p)`
  color: #ffffff;
  font-size: 1.1rem;
  line-height: 1.8;
  margin-bottom: 2rem;
  text-align: justify;
`

const SkillsContainer = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  margin-top: 2rem;
`

const SkillCard = styled(motion.div)`
  background: rgba(0, 255, 0, 0.1);
  border: 1px solid #00ff00;
  padding: 1.5rem;
  border-radius: 8px;
  text-align: center;

  h3 {
    color: #00ff00;
    margin-bottom: 1rem;
    font-family: 'Press Start 2P', cursive;
    font-size: 1rem;
  }

  p {
    color: #ffffff;
  }
`

const AboutSection: React.FC = () => {
  return (
    <Section>
      <Title
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        About Me
      </Title>
      <Content>
        <ProfileImage
          src="/profile.jpg"
          alt="Leonardo Ranoesendjojo"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        />
        <InfoContainer>
          <Description
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            I'm a passionate Full Stack Developer and robotics enthusiast from Paramaribo, Suriname. Currently pursuing my ICT Studies at NATIN, I combine my technical expertise with creative problem-solving to build innovative solutions. My journey in technology has led me to explore various aspects of software development, robotics, and project management.
          </Description>
          <SkillsContainer
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <SkillCard
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <h3>Programming</h3>
              <p>TypeScript, Python, Java</p>
            </SkillCard>
            <SkillCard
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <h3>Robotics</h3>
              <p>Robot Design, Control Systems</p>
            </SkillCard>
            <SkillCard
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <h3>Web Development</h3>
              <p>React, Node.js, Next.js</p>
            </SkillCard>
            <SkillCard
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <h3>Leadership</h3>
              <p>Team Management, Mentoring</p>
            </SkillCard>
          </SkillsContainer>
        </InfoContainer>
      </Content>
    </Section>
  )
}

export default AboutSection 