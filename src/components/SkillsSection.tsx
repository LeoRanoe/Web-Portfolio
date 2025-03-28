import React, { useState } from 'react'
import styled from 'styled-components'
import { motion, AnimatePresence } from 'framer-motion'
import SkillCard from './SkillCard'
import { skills } from '../data/skills'
import { Skill } from '../types/skill'

interface SkillsSectionProps {
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

const Title = styled(motion.h2)`
  font-family: 'Press Start 2P', cursive;
  color: #00ff00;
  font-size: 2.5rem;
  margin-bottom: 3rem;
  text-align: center;
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

const CategoryFilter = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
  justify-content: center;
  position: relative;
  z-index: 1;
`

const FilterButton = styled(motion.button)<{ isActive: boolean }>`
  font-family: 'Press Start 2P', cursive;
  padding: 0.8rem 1.5rem;
  font-size: 0.8rem;
  background: ${props => props.isActive ? 'rgba(0, 255, 0, 0.2)' : 'rgba(0, 255, 0, 0.1)'};
  border: 2px solid ${props => props.isActive ? '#00ff00' : 'rgba(0, 255, 0, 0.3)'};
  color: ${props => props.isActive ? '#00ff00' : '#fff'};
  cursor: pointer;
  text-transform: uppercase;
  text-shadow: 0 0 5px rgba(0, 255, 0, 0.3);
  transition: all 0.3s ease;

  &:hover {
    background: rgba(0, 255, 0, 0.2);
    border-color: #00ff00;
    box-shadow: 0 0 10px rgba(0, 255, 0, 0.3);
  }
`

const SkillsGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  width: 100%;
  position: relative;
  z-index: 1;
`

const categories = ['all', 'frontend', 'backend', 'tools', 'other'] as const
type Category = typeof categories[number]

const SkillsSection: React.FC<SkillsSectionProps> = ({ id }) => {
  const [selectedCategory, setSelectedCategory] = useState<Category>('all')

  const filteredSkills = skills.filter(skill => 
    selectedCategory === 'all' ? true : skill.category === selectedCategory
  )

  return (
    <Section id={id}>
      <Title
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        Skills
      </Title>
      <CategoryFilter>
        {categories.map(category => (
          <FilterButton
            key={category}
            isActive={category === selectedCategory}
            onClick={() => setSelectedCategory(category)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {category}
          </FilterButton>
        ))}
      </CategoryFilter>
      <SkillsGrid
        initial="hidden"
        animate="visible"
        variants={{
          visible: {
            transition: {
              staggerChildren: 0.1
            }
          }
        }}
      >
        <AnimatePresence mode="wait">
          {filteredSkills.map((skill, index) => (
            <motion.div
              key={skill.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ delay: index * 0.1 }}
            >
              <SkillCard skill={skill} />
            </motion.div>
          ))}
        </AnimatePresence>
      </SkillsGrid>
    </Section>
  )
}

export default SkillsSection 