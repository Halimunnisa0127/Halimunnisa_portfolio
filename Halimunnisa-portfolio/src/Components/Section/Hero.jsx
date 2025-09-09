import React, { useEffect, useRef } from "react";
import styled, { keyframes } from "styled-components";
import { Bio } from "../../data/constants";
import Typewriter from "typewriter-effect";
import HeroBgAnimation from "../HeroBgAnimation";
import Tilt from "react-parallax-tilt";
import { motion } from "framer-motion";
import {
  headContainerAnimation,
  headContentAnimation,
  headTextAnimation,
} from "../../utils/motion";
import StarCanvas from "../canvas/Stars";

// Keyframe animations
const gradientAnimation = keyframes`
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

const float = keyframes`
  0% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-15px);
  }
  100% {
    transform: translateY(0px);
  }
`;

const pulse = keyframes`
  0% {
    transform: scale(1);
    box-shadow: 0 10px 30px rgba(135, 71, 255, 0.4);
  }
  50% {
    transform: scale(1.05);
    box-shadow: 0 15px 40px rgba(135, 71, 255, 0.6);
  }
  100% {
    transform: scale(1);
    box-shadow: 0 10px 30px rgba(135, 71, 255, 0.4);
  }
`;

const glow = keyframes`
  0% {
    filter: drop-shadow(0 0 5px rgba(135, 71, 255, 0.5));
  }
  50% {
    filter: drop-shadow(0 0 20px rgba(135, 71, 255, 0.8));
  }
  100% {
    filter: drop-shadow(0 0 5px rgba(135, 71, 255, 0.5));
  }
`;

// Styled components
const HeroContainer = styled.div`
  display: flex;
  justify-content: center;
  position: relative;
  padding: 120px 30px 180px;
  z-index: 1;
  min-height: 100vh;
  align-items: center;
  overflow: hidden;

  @media (max-width: 960px) {
    padding: 100px 16px 150px;
  }

  @media (max-width: 640px) {
    padding: 80px 16px 120px;
  }

  clip-path: polygon(0 0, 100% 0, 100% 90%, 70% 85%, 0 95%);
`;

const HeroBg = styled.div`
  position: absolute;
  display: flex;
  justify-content: end;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  max-width: 1360px;
  overflow: hidden;
  padding: 0 30px;
  top: 50%;
  left: 50%;
  -webkit-transform: translateX(-50%) translateY(-50%);
  transform: translateX(-50%) translateY(-50%);

  @media (max-width: 960px) {
    justify-content: center;
    padding: 0 0px;
  }
`;

const HeroInnerContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 1300px;
  gap: 40px;

  @media (max-width: 960px) {
    flex-direction: column;
    text-align: center;
    gap: 30px;
  }
`;

const HeroLeftContainer = styled.div`
  width: 60%;
  order: 1;
  
  @media (max-width: 960px) {
    width: 100%;
    order: 2;
    margin-bottom: 30px;
    display: flex;
    gap: 12px;
    flex-direction: column;
    align-items: center;
  }
`;

const HeroRightContainer = styled.div`
  width: 40%;
  order: 2;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  
  @media (max-width: 960px) {
    width: 100%;
    order: 1;
    margin-bottom: 40px;
  }
`;

const Title = styled(motion.div)`
  font-weight: 800;
  font-size: 3.5rem;
  color: ${({ theme }) => theme.text_primary};
  line-height: 1.2;
  margin-bottom: 24px;
  background: linear-gradient(90deg, #ff8a00, #e52e71, #5e17eb, #0063f7);
  background-size: 300% 300%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: ${gradientAnimation} 8s ease infinite;

  @media (max-width: 960px) {
    font-size: 2.8rem;
  }

  @media (max-width: 640px) {
    font-size: 2.2rem;
    margin-bottom: 16px;
  }
`;

const TextLoop = styled.div`
  font-weight: 600;
  font-size: 2rem;
  display: flex;
  gap: 12px;
  color: ${({ theme }) => theme.text_primary};
  line-height: 1.3;
  margin-bottom: 16px;
  align-items: center;
  flex-wrap: wrap;
  justify-content: flex-start;

  @media (max-width: 960px) {
    justify-content: center;
    font-size: 1.7rem;
  }

  @media (max-width: 640px) {
    font-size: 1.4rem;
    margin-bottom: 12px;
  }
`;

const Span = styled.div`
  color: ${({ theme }) => theme.primary};
  font-weight: 700;
  position: relative;
  cursor: pointer;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -5px;
    left: 0;
    width: 100%;
    height: 3px;
    background: linear-gradient(90deg, #ff8a00, #e52e71);
    border-radius: 2px;
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.3s ease;
  }
  
  &:hover::after {
    transform: scaleX(1);
  }
`;

const SubTitle = styled(motion.div)`
  font-size: 1.2rem;
  line-height: 1.6;
  margin-bottom: 42px;
  color: ${({ theme }) => theme.text_primary + 95};
  max-width: 90%;

  @media (max-width: 960px) {
    max-width: 100%;
    font-size: 1.1rem;
  }

  @media (max-width: 640px) {
    font-size: 1rem;
    line-height: 1.5;
    margin-bottom: 32px;
  }
`;

const ResumeButton = styled(motion.a)`
  -webkit-appearance: button;
  -moz-appearance: button;
  appearance: button;
  text-decoration: none;
  width: 100%;
  max-width: 280px;
  text-align: center;
  padding: 18px 0;
  background: linear-gradient(225deg, #7e22ce, #3b82f6);
  border-radius: 50px;
  font-weight: 600;
  font-size: 1.1rem;
  color: white;
  border: none;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  z-index: 1;
  box-shadow: 0 10px 30px rgba(135, 71, 255, 0.4);
  animation: ${pulse} 4s infinite ease-in-out;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(225deg, #3b82f6, #7e22ce);
    opacity: 0;
    transition: opacity 0.3s ease;
    z-index: -1;
  }

  &:hover {
    animation: none;
    transform: translateY(-3px);
    box-shadow: 0 15px 40px rgba(135, 71, 255, 0.6);

    &::before {
      opacity: 1;
    }
  }

  @media (max-width: 640px) {
    padding: 16px 0;
    font-size: 1rem;
    max-width: 250px;
  }
`;


const FloatingElements = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 1;
`;

const FloatingShape = styled.div`
  position: absolute;
  border-radius: 50%;
  background: linear-gradient(45deg, #ff8a0050, #e52e7150);
  filter: blur(40px);
  animation: ${float} 8s ease-in-out infinite;
  
  &:nth-child(1) {
    width: 200px;
    height: 200px;
    top: 10%;
    right: 10%;
    animation-delay: 0s;
  }
  
  &:nth-child(2) {
    width: 150px;
    height: 150px;
    bottom: 20%;
    left: 10%;
    animation-delay: 2s;
    background: linear-gradient(45deg, #5e17eb50, #0063f750);
  }
  
  &:nth-child(3) {
    width: 100px;
    height: 100px;
    top: 50%;
    right: 20%;
    animation-delay: 4s;
    background: linear-gradient(45deg, #00ff9550, #00ccff50);
  }
`;

const ScrollIndicator = styled.div`
  position: absolute;
  bottom: 40px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  color: ${({ theme }) => theme.text_primary};
  opacity: 0.7;
  transition: opacity 0.3s ease;
  cursor: pointer;
  
  &:hover {
    opacity: 1;
  }

  @media (max-width: 640px) {
    bottom: 30px;
  }
`;

const ScrollText = styled.span`
  font-size: 0.9rem;
  margin-bottom: 10px;
  letter-spacing: 1px;
`;

const ScrollArrow = styled.div`
  width: 20px;
  height: 20px;
  border-right: 2px solid ${({ theme }) => theme.text_primary};
  border-bottom: 2px solid ${({ theme }) => theme.text_primary};
  transform: rotate(45deg);
  animation: ${float} 1.5s infinite ease-in-out;
`;

const Hero = () => {
  const scrollToSkills = () => {
    const skillsSection = document.getElementById("skills");
    if (skillsSection) {
      skillsSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div id="About">
      <HeroContainer>
        <HeroBg>
          <StarCanvas />
          <HeroBgAnimation />
        </HeroBg>

        <motion.div {...headContainerAnimation}>
          <HeroInnerContainer>
            <HeroLeftContainer>
              <motion.div {...headTextAnimation}>
                <Title
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  Hi, I am <br /> {Bio.name}
                </Title>
                <TextLoop>
                  I am a
                  <Span>
                    <Typewriter
                      options={{
                        strings: Bio.roles,
                        autoStart: true,
                        loop: true,
                        deleteSpeed: 50,
                        delay: 70,
                        cursor: "_"
                      }}
                    />
                  </Span>
                </TextLoop>
              </motion.div>

              <motion.div {...headContentAnimation}>
                <SubTitle
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  {Bio.description}
                </SubTitle>
              </motion.div>

              <ResumeButton 
                href={Bio.resume} 
                target="_blank"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                Check Resume
              </ResumeButton>
            </HeroLeftContainer>

            <HeroRightContainer>
              <Tilt
                tiltMaxAngleX={10}
                tiltMaxAngleY={10}
                perspective={1000}
                transitionSpeed={1500}
                scale={1.05}
                gyroscope={true}
              >
              </Tilt>
            </HeroRightContainer>
          </HeroInnerContainer>
        </motion.div>

        <ScrollIndicator onClick={scrollToSkills}>
          <ScrollText>Scroll Down</ScrollText>
          <ScrollArrow />
        </ScrollIndicator>
      </HeroContainer>
    </div>
  );
};

export default Hero;