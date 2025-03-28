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

const TimelineContainer = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  position: relative;
  padding: 2rem 0;

  &::before {
    content: '';
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    width: 2px;
    height: 100%;
    background: #00ff00;
    box-shadow: 0 0 10px rgba(0, 255, 0, 0.5);
  }
`;

const TimelineItem = styled(motion.div)`
  width: 50%;
  padding: 2rem;
  position: relative;
  margin-bottom: 2rem;
  background: rgba(0, 17, 0, 0.5);
  border: 2px solid #00ff00;
  border-radius: 15px;
  box-shadow: 0 0 20px rgba(0, 255, 0, 0.1);

  &:nth-child(odd) {
    margin-left: auto;
  }

  &::before {
    content: '';
    position: absolute;
    top: 50%;
    width: 20px;
    height: 20px;
    background: #00ff00;
    border-radius: 50%;
    box-shadow: 0 0 10px rgba(0, 255, 0, 0.5);
  }

  &:nth-child(odd)::before {
    left: -60px;
    transform: translateY(-50%);
  }

  &:nth-child(even)::before {
    right: -60px;
    transform: translateY(-50%);
  }

  @media (max-width: 768px) {
    width: 100%;
    margin-left: 0 !important;

    &::before {
      left: -30px !important;
      right: auto !important;
    }
  }
`;

const CompanyLogo = styled.img`
  width: 50px;
  height: 50px;
  margin-bottom: 1rem;
  border: 2px solid #00ff00;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 255, 0, 0.3);
`;

const CompanyName = styled.h3`
  font-family: 'Press Start 2P', cursive;
  color: #00ff00;
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
  text-shadow: 0 0 5px rgba(0, 255, 0, 0.5);
`;

const Role = styled.h4`
  font-family: 'Press Start 2P', cursive;
  color: #00ff00;
  font-size: 1rem;
  margin-bottom: 0.5rem;
`;

const Duration = styled.p`
  font-family: 'Press Start 2P', cursive;
  color: #00ff00;
  font-size: 0.8rem;
  margin-bottom: 1rem;
  opacity: 0.8;
`;

const Location = styled.p`
  font-family: 'Press Start 2P', cursive;
  color: #00ff00;
  font-size: 0.8rem;
  margin-bottom: 1rem;
  opacity: 0.8;
`;

const Description = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const DescriptionItem = styled.li`
  font-family: 'Press Start 2P', cursive;
  color: #ffffff;
  font-size: 0.8rem;
  margin-bottom: 0.5rem;
  padding-left: 1.5rem;
  position: relative;

  &::before {
    content: '>';
    position: absolute;
    left: 0;
    color: #00ff00;
  }
`;

const SkillsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 1rem;
`;

const SkillTag = styled.span`
  font-family: 'Press Start 2P', cursive;
  font-size: 0.7rem;
  color: #00ff00;
  background: rgba(0, 255, 0, 0.1);
  padding: 0.3rem 0.6rem;
  border-radius: 4px;
  border: 1px solid #00ff00;
`;

const experiences = [
  {
    id: 1,
    company: 'Megapixel Developments',
    logo: 'megapixel-logo.png',
    role: 'Founder',
    duration: 'Jan 2025 - Present',
    location: 'Remote',
    description: [
      'Started a freelance web development company with two fellow students to provide budget-friendly websites for individuals and small businesses.',
      'Currently working as a student entrepreneur, managing client communication, and delivering creative web solutions while balancing academic responsibilities.',
      'Collaborating with co-founders to design, develop, and deploy user-friendly websites tailored to client needs.'
    ],
    skills: ['Project Management', 'Teamwork', 'Web Development', 'Client Communication', 'Business Development']
  },
  {
    id: 2,
    company: 'Foundation Young Help Suriname',
    logo: 'young-help-logo.png',
    role: 'Junior Mentor',
    duration: 'Nov 2024 - Present',
    location: 'Paramaribo, Suriname',
    description: [
      'Passionate about tech and youth development, grown from peer mentor to junior mentor.',
      'Dedicated to inspiring Suriname\'s youth through robotics, programming, and volunteering.',
      'Always open to connecting with others who value mentorship and innovation.'
    ],
    skills: ['Project Management', 'Project Planning', 'Mentoring', 'Youth Development', 'Robotics']
  },
  {
    id: 3,
    company: 'Foundation Young Help Suriname',
    logo: 'young-help-logo.png',
    role: 'Peer Mentor',
    duration: 'Mar 2024 - Nov 2024',
    location: 'Paramaribo, Suriname',
    description: [
      'Specialized in both robot building and coding for the Surinamese Robotics Team.',
      'Inspired and empowered youth to step out of their comfort zones and strive for greatness.',
      'Fostered a culture of innovation and curiosity through knowledge sharing.'
    ],
    skills: ['Mentoring', 'Peer Mentoring', 'Robotics', 'Programming', 'Youth Empowerment', 'STEM Education']
  },
  {
    id: 4,
    company: 'Computer Hardware Services N.V.',
    logo: 'chs-logo.png',
    role: 'IT Technician',
    duration: 'Aug 2024 - Sep 2024',
    location: 'Paramaribo, Suriname',
    description: [
      'Diagnosed and repaired hardware issues during summer vacation.',
      'Provided technical support to clients.',
      'Assisted in the maintenance of computer systems.',
      'Developed technical skills and deepened understanding of IT hardware and customer service.'
    ],
    skills: ['Computer Repair', 'Communication', 'Technical Support', 'Hardware Maintenance']
  },
  {
    id: 5,
    company: 'Computer Hardware Services N.V.',
    logo: 'chs-logo.png',
    role: 'IT Technician Intern',
    duration: 'Apr 2024 - Jul 2024',
    location: 'Paramaribo, Suriname',
    description: [
      'Installed and configured hardware and software.',
      'Maintained and troubleshooted hardware and software systems.',
      'Provided technical support to system users.',
      'Applied theoretical knowledge to real-world scenarios.'
    ],
    skills: ['Leadership', 'Teamwork', 'Hardware Installation', 'Software Configuration', 'Technical Support']
  }
];

const ExperienceTimeline: React.FC = () => {
  return (
    <Section id="experience">
      <Title
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        Experience Timeline
      </Title>
      <TimelineContainer>
        {experiences.map((experience, index) => (
          <TimelineItem
            key={experience.id}
            initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: index * 0.2 }}
          >
            <CompanyLogo src={experience.logo} alt={experience.company} />
            <CompanyName>{experience.company}</CompanyName>
            <Role>{experience.role}</Role>
            <Duration>{experience.duration}</Duration>
            <Location>{experience.location}</Location>
            <Description>
              {experience.description.map((item, i) => (
                <DescriptionItem key={i}>{item}</DescriptionItem>
              ))}
            </Description>
            <SkillsContainer>
              {experience.skills.map((skill, i) => (
                <SkillTag key={i}>{skill}</SkillTag>
              ))}
            </SkillsContainer>
          </TimelineItem>
        ))}
      </TimelineContainer>
    </Section>
  );
};

export default ExperienceTimeline; 