import React, { useState,useEffect } from "react";
import styled from "styled-components";
import { projects } from "../../data/constants";
import ProjectCard from "../../Components/Card/ProjectCard";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: 50px;
  padding: 0px 16px;
  position: relative;
  z-index: 1;
  align-items: center;
  width: 100%;
  box-sizing: border-box;
`;

const Wrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  width: 100%;
  max-width: 1350px;
  gap: 12px;
  box-sizing: border-box;
  @media (max-width: 960px) {
    flex-direction: column;
  }
`;

const Title = styled.div`
  font-size: 52px;
  text-align: center;
  font-weight: 600;
  margin-top: 20px;
  color: ${({ theme }) => theme.text_primary};
  @media (max-width: 768px) {
    margin-top: 12px;
    font-size: 32px;
  }
`;


const Desc = styled.div`
  font-size: 18px;
  text-align: center;
  font-weight: 600;
  color: ${({ theme }) => theme.text_secondary};
  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

const ToggleButtonGroup = styled.div`
  display: flex;
  border: 1.5px solid ${({ theme }) => theme.primary};
  color: ${({ theme }) => theme.primary};
  font-size: 16px;
  border-radius: 12px;
  font-weight: 500;
  margin: 22px 0;
  @media (max-width: 768px) {
    font-size: 12px;
  }
`;

const ToggleButton = styled.div`
  padding: 8px 18px;
  border-radius: 6px;
  cursor: pointer;
  &:hover {
    background: ${({ theme }) => theme.primary + 20};
  }
  @media (max-width: 768px) {
    padding: 6px 8px;
    border-radius: 4px;
  }
  ${({ $active, theme }) =>
    $active &&
    `
    background: ${theme.primary + 20};
    color: ${theme.text_primary};
  `}
`;

const Divider = styled.div`
  width: 1.5px;
  background: ${({ theme }) => theme.primary};
`;

const CardContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: stretch;
  gap: 28px;
  flex-wrap: wrap;
  width: 100%;
  box-sizing: border-box;

  @media (max-width: 600px) {
    gap: 20px;
    padding: 0;
  }
`;

const ShowMoreButton = styled.button`
  margin-top: 36px;
  padding: 12px 30px;
  background: transparent;
  color: ${({ theme }) => theme.primary};
  border: 1.5px solid ${({ theme }) => theme.primary};
  border-radius: 12px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;

  &:hover {
    background: ${({ theme }) => theme.primary};
    color: white;
    transform: translateY(-2px);
    box-shadow: 0 4px 20px rgba(133, 76, 230, 0.4);
  }
`;

const Projects = () => {
  const [toggle, setToggle] = useState("all");
  const [visibleCount, setVisibleCount] = useState(2);

  const filteredProjects =
    toggle === "all"
      ? projects
      : projects.filter((item) => item.category === toggle);

  // Reset to initial 2 projects when category changes
  useEffect(() => {
    setVisibleCount(2);
  }, [toggle]);

  const isAllShown = visibleCount >= filteredProjects.length;

  const handleToggleCount = () => {
    if (isAllShown) {
      // Reset back to showing initial 2 projects
      setVisibleCount(2);
      // Optional smooth scroll back to projects section top
      const projectsSection = document.getElementById("Projects");
      if (projectsSection) {
        projectsSection.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      // Reveal 2 more projects
      setVisibleCount((prev) => Math.min(prev + 2, filteredProjects.length));
    }
  };

  const remaining = Math.max(0, filteredProjects.length - visibleCount);

  return (
    <Container id="Projects">
      <Wrapper>
        <Title>Projects</Title>
        <Desc style={{ marginBottom: "40px" }}>
          I have worked on a wide range of projects, from web applications to deep learning solutions. Here are some of my projects
        </Desc>

        <ToggleButtonGroup>
          <ToggleButton $active={toggle === "all"} onClick={() => setToggle("all")}>
            ALL
          </ToggleButton>
          <Divider />
          <ToggleButton $active={toggle === "web app"} onClick={() => setToggle("web app")}>
            WEB APP'S
          </ToggleButton>
          <Divider />
          <ToggleButton $active={toggle === "Deep learning"} onClick={() => setToggle("Deep learning")}>
            DEEP LEARNING
          </ToggleButton>
        </ToggleButtonGroup>

        <CardContainer>
          {filteredProjects.slice(0, visibleCount).map((project, index) => (
            <ProjectCard key={`project-${project.id || index}`} project={{ ...project, index }} />
          ))}
        </CardContainer>

        {filteredProjects.length > 2 && (
          <ShowMoreButton onClick={handleToggleCount}>
            {isAllShown ? "Show Less" : `Show More (+${Math.min(2, remaining)})`}
          </ShowMoreButton>
        )}
      </Wrapper>
    </Container>
  );
};

export default Projects;
