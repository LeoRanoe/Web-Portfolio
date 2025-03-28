import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const Section = styled.section`
  padding: 2rem;
  background: #000;
  color: #00ff00;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Title = styled.h2`
  font-size: 2rem;
  margin-bottom: 2rem;
  text-align: center;
  font-family: 'Press Start 2P', cursive;
`;

const SkillsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const SkillCard = styled(motion.div)`
  background: #111;
  border: 2px solid #00ff00;
  padding: 1.5rem;
  border-radius: 8px;
  text-align: center;
`;

const SkillTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: #00ff00;
  font-family: 'Press Start 2P', cursive;
`;

const SkillDescription = styled.p`
  font-size: 1rem;
  line-height: 1.6;
  margin-bottom: 1rem;
`;

const SkillsList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  text-align: left;
`;

const SkillItem = styled.li`
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;

  &:before {
    content: '>';
    margin-right: 0.5rem;
    color: #00ff00;
  }
`;

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

const SkillsSection: React.FC = () => {
  const skills = [
    {
      title: 'Frontend Development',
      description: 'Building responsive and interactive user interfaces',
      items: ['React', 'TypeScript', 'Next.js', 'Styled Components', 'Tailwind CSS']
    },
    {
      title: 'Backend Development',
      description: 'Creating scalable server-side applications',
      items: ['Node.js', 'Express', 'Python', 'Django', 'PostgreSQL']
    },
    {
      title: 'DevOps & Tools',
      description: 'Managing deployment and development workflow',
      items: ['Git', 'Docker', 'AWS', 'CI/CD', 'Linux']
    }
  ];

  return (
    <Section id="skills">
      <Title>Skills</Title>
      <SkillsGrid>
        {skills.map((skill, index) => (
          <SkillCard
            key={index}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
          >
            <SkillTitle>{skill.title}</SkillTitle>
            <SkillDescription>{skill.description}</SkillDescription>
            <SkillsList>
              {skill.items.map((item, itemIndex) => (
                <SkillItem key={itemIndex}>{item}</SkillItem>
              ))}
            </SkillsList>
          </SkillCard>
        ))}
      </SkillsGrid>
    </Section>
  );
};

export default SkillsSection; 