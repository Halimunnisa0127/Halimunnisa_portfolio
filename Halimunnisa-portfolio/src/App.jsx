import styled, { ThemeProvider } from "styled-components";
import { darkTheme } from "./utils/Themes";
import Navbar from "./Components/Navbar/Navbar";
import { BrowserRouter } from "react-router-dom";
import Hero from "./Components/Section/Hero";
import Moon from "./Components/Section/Moon";
import Skills from "./Components/Section/Skills";
import Education from "./Components/Section/Education";
import StartCanvas from "./Components/canvas/Stars";
import Projects from "./Components/Section/Projects";
import Contact from "./Components/Section/Contact";
import Footer from "./Components/Section/Footer";
import SplashCursor from "./Components/SplashCursor";

const Body = styled.div`
  background-color: ${({ theme }) => theme.bg};
  color: ${({ theme }) => theme.text};
  width: 100%;
  overflow-x: hidden;
  position: relative;
`;

const Wrapper = styled.div`
  padding-bottom: 100px;
  background: linear-gradient(
      38.73deg,
      rgba(204, 0, 187, 0.15) 0%,
      rgba(201, 32, 184, 0) 50%
    ),
    linear-gradient(
      141.27deg,
      rgba(0, 70, 209, 0) 50%,
      rgba(0, 70, 209, 0.15) 100%
    );
  width: 100%;
  clip-path: polygon(0 0, 100% 0, 100% 100%, 30% 98%, 0 100%);
`;

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <BrowserRouter>
        <Navbar />
        <Body>
          <SplashCursor />
          <StartCanvas />
          <Hero />
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              padding: "40px 0",
              position: "relative",
              zIndex: 10,
            }}
          >
            <Moon />
          </div>
          <Wrapper>
            <Skills />
          </Wrapper>
          <Projects />
          <Wrapper>
            <Education />
            <Contact />
          </Wrapper>
          <Footer />
        </Body>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
