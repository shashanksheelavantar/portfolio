import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import CustomCursor from "./components/CustomCursor";
import MouseReactiveBackground from "./components/MouseReactiveBackground";
import Home from "./pages/Home";
import ProjectCaseStudy from "./pages/ProjectCaseStudy";

export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <MouseReactiveBackground />
        <CustomCursor />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects/:id" element={<ProjectCaseStudy />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}
