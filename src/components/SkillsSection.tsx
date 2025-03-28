import React from 'react';
import styled, { keyframes } from 'styled-components';
import { motion } from 'framer-motion';

const scanline = keyframes`
  0% { transform: translateY(-100%); }
  100% { transform: translateY(100%); }
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
`;

const Title = styled(motion.h2)`
  font-family: 'Press Start 2P', cursive;
  color: #00ff00;
  font-size: 2.5rem;
  margin-bottom: 3rem;
  text-align: center;
  text-shadow: 0 0 10px rgba(0, 255, 0, 0.5);
  position: relative;
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
`;

const InventoryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

const CategoryContainer = styled(motion.div)`
  background: rgba(0, 17, 0, 0.5);
  border: 2px solid #00ff00;
  border-radius: 15px;
  padding: 2rem;
  box-shadow: 0 0 20px rgba(0, 255, 0, 0.1);
  min-height: 300px;
  display: flex;
  flex-direction: column;
`;

const CategoryTitle = styled.h3`
  font-family: 'Press Start 2P', cursive;
  color: #00ff00;
  font-size: 1rem;
  margin-bottom: 1.5rem;
  text-shadow: 0 0 5px rgba(0, 255, 0, 0.5);
  display: flex;
  align-items: center;
  gap: 0.5rem;
  word-wrap: break-word;

  &::before {
    content: '>';
    color: #00ff00;
  }
`;

const SkillList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

const SkillItem = styled(motion.li)`
  font-family: 'Press Start 2P', cursive;
  color: #ffffff;
  font-size: 0.7rem;
  padding: 0.8rem;
  background: rgba(0, 255, 0, 0.1);
  border: 1px solid #00ff00;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;
  word-wrap: break-word;
  line-height: 1.4;

  &:hover {
    background: rgba(0, 255, 0, 0.2);
    transform: translateX(5px);
  }
`;

const skillCategories = [
  {
    id: 1,
    title: 'Programming',
    icon: '💻',
    skills: ['PHP', 'Laravel', 'JavaScript', 'Node.js', 'React', 'TypeScript']
  },
  {
    id: 2,
    title: 'IT Skills',
    icon: '🔧',
    skills: ['Troubleshooting', 'Networking (CCNA)', 'Computer Hardware', 'System Administration']
  },
  {
    id: 3,
    title: 'Robotics',
    icon: '🤖',
    skills: ['Robot Design', 'Control Systems', 'Programming', 'Team Leadership']
  },
  {
    id: 4,
    title: 'Soft Skills',
    icon: '📚',
    skills: ['Problem Solving', 'Teamwork', 'Project Management', 'Communication']
  }
];

const SkillsSection: React.FC = () => {
  return (
    <Section id="skills">
      <Title
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        Inventory Menu
      </Title>
      <InventoryGrid>
        {skillCategories.map((category, index) => (
          <CategoryContainer
            key={category.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: index * 0.2 }}
          >
            <CategoryTitle>
              {category.icon} {category.title}
            </CategoryTitle>
            <SkillList>
              {category.skills.map((skill, i) => (
                <SkillItem
                  key={i}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {skill}
                </SkillItem>
              ))}
            </SkillList>
          </CategoryContainer>
        ))}
      </InventoryGrid>
    </Section>
  );
};

export default SkillsSection; 