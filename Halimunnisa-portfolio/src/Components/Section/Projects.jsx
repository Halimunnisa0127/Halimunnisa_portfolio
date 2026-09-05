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
  const [showAll, setShowAll] = useState(false);
  const [visibleCount, setVisibleCount] = useState(0);

  const filteredProjects =
    toggle === "all"
      ? projects
      : projects.filter((item) => item.category === toggle);

  const displayedProjects = showAll
    ? filteredProjects
    : filteredProjects.slice(0, 2);

  // Reset when toggle changes
  useEffect(() => {
    setVisibleCount(0);
    setShowAll(false);
  }, [toggle]);

  // Reset when showAll toggles
  useEffect(() => {
    setVisibleCount(0);
  }, [showAll]);

  // Incrementally reveal cards
  useEffect(() => {
    if (visibleCount < displayedProjects.length) {
      const timer = setTimeout(() => {
        setVisibleCount((prev) => prev + 1);
      }, 150);
      return () => clearTimeout(timer);
    }
  }, [visibleCount, displayedProjects.length]);

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
          {displayedProjects.slice(0, visibleCount).map((project, index) => (
            <ProjectCard key={`project-${project.id || index}`} project={{ ...project, index }} />
          ))}
        </CardContainer>

        {filteredProjects.length > 2 && (
          <ShowMoreButton onClick={() => setShowAll(!showAll)}>
            {showAll ? "Show Less" : `Show More (${filteredProjects.length - 2} More)`}
          </ShowMoreButton>
        )}
      </Wrapper>
    </Container>
  );
};

export default Projects;
