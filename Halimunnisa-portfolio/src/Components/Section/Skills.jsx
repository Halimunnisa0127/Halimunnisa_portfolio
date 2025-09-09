import React, { useEffect, useRef } from "react";
import styled, { keyframes } from "styled-components";
import { skills } from "../../data/constants";
import Tilt from "react-parallax-tilt";
// Animations
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const float = keyframes`
  0% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
  100% {
    transform: translateY(0px);
  }
`;

const gradient = keyframes`
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
`;

const pulse = keyframes`
  0% {
    box-shadow: 0 0 0 0 rgba(23, 92, 230, 0.4);
  }
  70% {
    box-shadow: 0 0 0 10px rgba(23, 92, 230, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(23, 92, 230, 0);
  }
`;

// Styled Components
const Container = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  z-index: 1;
  align-items: center;
  padding: 80px 0;
  overflow: hidden;
`;

const Wrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  max-width: 1350px;
  padding: 0 20px;
  gap: 12px;
`;

const Title = styled.h2`
  font-size: 52px;
  text-align: center;
  font-weight: 700;
  margin-bottom: 20px;
  color: ${({ theme }) => theme.text_primary};
  background: linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab);
  background-size: 300% 300%;
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: ${gradient} 8s ease infinite;
  
  @media (max-width: 768px) {
    font-size: 36px;
  }
`;

const Desc = styled.p`
  font-size: 18px;
  text-align: center;
  max-width: 600px;
  color: ${({ theme }) => theme.text_secondary};
  margin-bottom: 50px;
  line-height: 1.5;
  
  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

const SkillsRow = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 30px;
  width: 100%;
  margin-top: 30px;
  
  @media (max-width: 768px) {
    gap: 20px;
  }
`;

const SkillCard = styled.div`
  background: rgba(17, 25, 40, 0.83);
  border: 1px solid rgba(255, 255, 255, 0.125);
  box-shadow: rgba(23, 92, 230, 0.15) 0px 4px 24px;
  border-radius: 18px;
  padding: 28px 36px;
  transition: all 0.3s ease;
  animation: ${fadeIn} 0.8s ease forwards;
  opacity: 0;
  transform: translateY(30px);
  flex: 1;
  min-width: 300px;
  max-width: 500px;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: rgba(23, 92, 230, 0.3) 0px 12px 36px;
  }
  
  @media (max-width: 768px) {
    padding: 20px 24px;
    min-width: 100%;
  }
`;

const SkillTitle = styled.h3`
  font-size: 28px;
  font-weight: 600;
  margin-bottom: 25px;
  text-align: center;
  color: ${({ theme }) => theme.text_primary};
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 50px;
    height: 3px;
    background: linear-gradient(90deg, #13B0F5 -10%, #E70FAA 100%);
    border-radius: 3px;
  }
`;

const SkillList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  justify-content: center;
`;

const SkillItem = styled.div`
  font-size: 16px;
  font-weight: 400;
  color: ${({ theme }) => theme.text_primary};
  background: rgba(57, 134, 235, 0.1);
  border: 1px solid rgba(57, 134, 235, 0.2);
  border-radius: 12px;
  padding: 12px 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: all 0.3s ease;
  cursor: default;
  
  &:hover {
    background: rgba(57, 134, 235, 0.2);
    transform: scale(1.05);
    animation: ${pulse} 1.5s infinite;
  }
  
  @media (max-width: 768px) {
    font-size: 14px;
    padding: 10px 14px;
  }
`;

const SkillImage = styled.img`
  width: 24px;
  height: 24px;
  transition: all 0.3s ease;
  
  ${SkillItem}:hover & {
    transform: scale(1.2) rotate(5deg);
  }
`;

const FloatingShape = styled.div`
  position: absolute;
  width: 300px;
  height: 300px;
  border-radius: 50%;
  background: linear-gradient(180deg, rgba(23, 92, 230, 0.2) 0%, rgba(23, 92, 230, 0) 100%);
  filter: blur(40px);
  z-index: -1;
  top: 10%;
  left: 10%;
  animation: ${float} 15s ease-in-out infinite;
  
  &:nth-child(2) {
    top: 60%;
    left: 70%;
    width: 200px;
    height: 200px;
    animation-delay: 2s;
  }
`;

const Skills = () => {
  const skillRefs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, index) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.style.opacity = 1;
              entry.target.style.transform = "translateY(0)";
            }, index * 150);
          }
        });
      },
      { threshold: 0.1 }
    );

    skillRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      skillRefs.current.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, []);

  // Separate skills into frontend and others
  const frontendSkills = skills.filter(skill => skill.title === "Frontend");
  const otherSkills = skills.filter(skill => skill.title !== "Frontend");

  return (
    <Container id="Skills">
      <FloatingShape />
      <FloatingShape />
      <Wrapper>
        <Title>Skills & Technologies</Title>
        <Desc>
         Here are some of the skills I've been honing over the past few years. I'm always eager to learn new technologies and expand my expertise.
        </Desc>

        {/* Frontend Skills Row */}
        <SkillsRow>
          {frontendSkills.map((skill, index) => (
            <SkillCard
              key={skill.title}
              ref={(el) => (skillRefs.current[index] = el)}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <SkillTitle>{skill.title}</SkillTitle>
              <SkillList>
                {skill.skills.map((item, idx) => (
                  <SkillItem key={item.name}>
                    <SkillImage src={item.image} alt={item.name} />
                    {item.name}
                  </SkillItem>
                ))}
              </SkillList>
            </SkillCard>
          ))}
        </SkillsRow>

        {/* Backend & Other Skills Row */}
        <SkillsRow>
          {otherSkills.map((skill, index) => (
            <SkillCard
              key={skill.title}
              ref={(el) => (skillRefs.current[frontendSkills.length + index] = el)}
              style={{ animationDelay: `${(frontendSkills.length + index) * 0.1}s` }}
            >
              <SkillTitle>{skill.title}</SkillTitle>
              <SkillList>
                {skill.skills.map((item, idx) => (
                  <SkillItem key={item.name}>
                    <SkillImage src={item.image} alt={item.name} />
                    {item.name}
                  </SkillItem>
                ))}
              </SkillList>
            </SkillCard>
          ))}
        </SkillsRow>
      </Wrapper>
    </Container>
  );
};

export default Skills;