import React from "react";
import styled, { keyframes } from "styled-components";
import moonImg from "../../assets/moon-img.png";

const float = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
`;

const spinBg = keyframes`
  0% { background-position: 200% center; }
  100% { background-position: 0% center; }
`;

const pulseGlow = keyframes`
  0%, 100% { 
    opacity: 0.4; 
    transform: scale(0.95); 
  }
  50% { 
    opacity: 0.8; 
    transform: scale(1.05); 
  }
`;

const MoonContainer = styled.div`
  position: relative;
  width: 176px;
  height: 176px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 40px auto;
`;

const Glow = styled.div`
  position: absolute;
  inset: 0;
  width: 120%;
  height: 120%;
  border-radius: 50%;
  animation: ${pulseGlow} 8s ease-in-out infinite;
  background: radial-gradient(circle at center, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0.2) 50%, transparent 70%);
  z-index: 10;
  left: -10%;
  top: -10%;
  pointer-events: none;
`;

const MoonSphere = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background-image: url(${moonImg});
  background-size: 200% auto;
  background-repeat: repeat-x;
  animation: ${spinBg} 20s linear infinite, ${float} 6s ease-in-out infinite;
  filter: brightness(1.1) contrast(1.1);
  z-index: 20;
  position: relative;
  will-change: transform, background-position;
`;

const Shading = styled.div`
  position: absolute;
  inset: 0;
  border-radius: 50%;
  background: radial-gradient(circle at 30% 50%, transparent 40%, rgba(0,0,0,0.6) 100%);
  z-index: 30;
  pointer-events: none;
`;

const Moon = () => {
  return (
    <MoonContainer>
      <Glow />
      <MoonSphere />
      <Shading />
    </MoonContainer>
  );
};

export default Moon;