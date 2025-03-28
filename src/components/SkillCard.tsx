import React, { useState } from 'react'
import styled from 'styled-components'
import { motion, useAnimation } from 'framer-motion'
import { Skill } from '../types/skill'

const Card = styled(motion.div)`
  background: #000;
  border: 2px solid #fff;
  padding: 1.5rem;
  position: relative;
  font-family: 'Press Start 2P', cursive;
  color: #fff;
  cursor: pointer;
  width: 100%;
`

const Icon = styled.span`
  font-size: 2rem;
  margin-right: 1rem;
`

const Name = styled.h3`
  font-size: 1rem;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
`

const LevelInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
  font-size: 0.8rem;
`

const XPBarContainer = styled.div`
  width: 100%;
  height: 20px;
  background: #333;
  border: 2px solid #fff;
  position: relative;
  overflow: hidden;
`

const XPBar = styled(motion.div)<{ progress: number }>`
  width: ${props => props.progress}%;
  height: 100%;
  background: #fff;
  position: absolute;
  left: 0;
  top: 0;
`

const XPText = styled.span`
  font-size: 0.6rem;
  position: absolute;
  right: 5px;
  top: 50%;
  transform: translateY(-50%);
  color: #000;
  mix-blend-mode: difference;
`

const Description = styled(motion.p)`
  font-size: 0.7rem;
  margin-top: 1rem;
  line-height: 1.5;
  opacity: 0.8;
`

const CategoryBadge = styled.span`
  position: absolute;
  top: -0.5rem;
  right: 1rem;
  background: #fff;
  color: #000;
  padding: 0.3rem 0.6rem;
  font-size: 0.6rem;
  text-transform: uppercase;
`

interface SkillCardProps {
  skill: Skill
}

const SkillCard: React.FC<SkillCardProps> = ({ skill }) => {
  const [isHovered, setIsHovered] = useState(false)
  const controls = useAnimation()

  const handleHover = async () => {
    setIsHovered(true)
    await controls.start({
      width: '100%',
      transition: { duration: 0.8, ease: 'easeOut' }
    })
  }

  const handleHoverEnd = () => {
    setIsHovered(false)
    controls.start({
      width: `${(skill.xp / skill.maxXp) * 100}%`,
      transition: { duration: 0.3 }
    })
  }

  return (
    <Card
      whileHover={{ scale: 1.02 }}
      onHoverStart={handleHover}
      onHoverEnd={handleHoverEnd}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <CategoryBadge>{skill.category}</CategoryBadge>
      <Name>
        <Icon>{skill.icon}</Icon>
        {skill.name}
      </Name>
      <LevelInfo>
        <span>Level {skill.level}</span>
        <span>{skill.xp}/{skill.maxXp} XP</span>
      </LevelInfo>
      <XPBarContainer>
        <XPBar
          progress={(skill.xp / skill.maxXp) * 100}
          animate={controls}
          initial={{ width: `${(skill.xp / skill.maxXp) * 100}%` }}
        />
        <XPText>{Math.round((skill.xp / skill.maxXp) * 100)}%</XPText>
      </XPBarContainer>
      <Description
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: isHovered ? 'auto' : 0, opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      >
        {skill.description}
      </Description>
    </Card>
  )
}

export default SkillCard

 