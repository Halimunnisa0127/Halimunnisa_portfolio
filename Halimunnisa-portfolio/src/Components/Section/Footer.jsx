import React, { useState } from "react";
import styled from "styled-components";
import { Bio } from "../../data/constants";
import {
  FacebookRounded,
  Instagram,
  LinkedIn,
  Twitter,
  Email,
  ContentCopy,
} from "@mui/icons-material";

// Footer Container
const FooterContainer = styled.footer`
  width: 100%;
  padding: 3rem 1rem 2rem 1rem;
  background-color: ${({ theme }) => theme.bg};
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  z-index: 10;
`;

// Footer Content Wrapper
const FooterWrapper = styled.div`
  width: 100%;
  max-width: 1200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  color: ${({ theme }) => theme.text_primary};
  text-align: center;
`;

// Logo / Name
const Logo = styled.h2`
  font-weight: 700;
  font-size: 1.5rem;
  color: ${({ theme }) => theme.primary};
`;

// Navigation Links
const Nav = styled.nav`
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  justify-content: center;
  margin: 1rem 0;

  @media (max-width: 480px) {
    gap: 1rem;
  }
`;

const NavLink = styled.a`
  color: ${({ theme }) => theme.text_primary};
  text-decoration: none;
  font-size: 1rem;
  transition: color 0.2s ease;

  &:hover {
    color: ${({ theme }) => theme.primary};
  }
`;

// Social Icons Container
const SocialMediaIcons = styled.div`
  display: flex;
  gap: 1.5rem;
  margin: 1rem 0;
`;

const SocialMediaIcon = styled.a`
  color: ${({ theme }) => theme.text_primary};
  font-size: 1.5rem;
  transition: color 0.2s ease;

  &:hover {
    color: ${({ theme }) => theme.primary};
  }
`;

// Copyright
const Copyright = styled.p`
  font-size: 0.85rem;
  color: ${({ theme }) => theme.soft2};
  margin-top: 1rem;
`;

// Email Container
const EmailContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin: 0.5rem 0;
`;

const EmailLink = styled.a`
  color: ${({ theme }) => theme.text_primary};
  text-decoration: none;
  font-size: 1.1rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: color 0.2s ease;

  &:hover {
    color: ${({ theme }) => theme.primary};
  }
`;

const CopyButton = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.text_primary};
  cursor: pointer;
  display: flex;
  align-items: center;
  padding: 0.25rem;
  border-radius: 4px;
  transition: all 0.2s ease;

  &:hover {
    color: ${({ theme }) => theme.primary};
    background: ${({ theme }) => theme.primary + 20};
  }
`;

const Tooltip = styled.div`
  position: absolute;
  bottom: 100%;
  left: 50%;
  transform: translateX(-50%);
  padding: 0.5rem;
  background: ${({ theme }) => theme.primary};
  color: white;
  border-radius: 4px;
  font-size: 0.8rem;
  margin-bottom: 0.5rem;
  white-space: nowrap;

  &::after {
    content: '';
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    border-width: 5px;
    border-style: solid;
    border-color: ${({ theme }) => theme.primary} transparent transparent transparent;
  }
`;

const CopyButtonContainer = styled.div`
  position: relative;
  display: inline-block;
`;

const Footer = () => {
  const navItems = ["About", "Skills", "Projects", "Education"];
  const socialItems = [
    { icon: <FacebookRounded />, link: Bio.facebook, label: "Facebook" },
    { icon: <Twitter />, link: Bio.twitter, label: "Twitter" },
    { icon: <LinkedIn />, link: Bio.linkedin, label: "LinkedIn" },
    { icon: <Instagram />, link: Bio.insta, label: "Instagram" },
  ];

  const [showTooltip, setShowTooltip] = useState(false);

  const copyEmailToClipboard = () => {
    navigator.clipboard.writeText(Bio.email);
    setShowTooltip(true);
    setTimeout(() => setShowTooltip(false), 2000);
  };

  return (
    <FooterContainer>
      <FooterWrapper>
        <h1>Contact Me</h1>
        <Logo>Halimunnsa Shaik</Logo>
        
        <EmailContainer>
          <EmailLink href={`mailto:${Bio.email}`}>
            <Email />
            {Bio.email}
          </EmailLink>
          <CopyButtonContainer>
            <CopyButton onClick={copyEmailToClipboard} aria-label="Copy email">
              <ContentCopy fontSize="small" />
            </CopyButton>
            {showTooltip && <Tooltip>Email copied to clipboard!</Tooltip>}
          </CopyButtonContainer>
        </EmailContainer>

        <Nav>
          {navItems.map((item) => (
            <NavLink key={item} href={`#${item}`}>
              {item}
            </NavLink>
          ))}
        </Nav>

        <SocialMediaIcons>
          {socialItems.map((item) => (
            <SocialMediaIcon
              key={item.label}
              href={item.link}
              target="_blank"
              aria-label={item.label}
              rel="noopener noreferrer"
            >
              {item.icon}
            </SocialMediaIcon>
          ))}
        </SocialMediaIcons>

        <Copyright>
          &copy; {new Date().getFullYear()} Halimunnsa Shaik. All rights reserved.
        </Copyright>
      </FooterWrapper>
    </FooterContainer>
  );
};

export default Footer;