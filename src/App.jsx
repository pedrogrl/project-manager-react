import { BrowserRouter, Routes, Route } from "react-router-dom";

import Container from "./components/layout/Container";
import Footer from "./components/layout/Footer";
import Navbar from "./components/layout/Navbar";

import Company from "./components/pages/Company";
import Contact from "./components/pages/Contact";
import Home from "./components/pages/Home";
import NewProject from "./components/pages/NewProject";
import Projects from "./components/pages/Projects";
import Project from "./components/project/Project";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Container newClass="min-height-75">
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/company" element={<Company />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/new-project" element={<NewProject />} />
          <Route path="/project/:id" element={<Project/>} />
        </Routes>
      </Container>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
