import Message from "../layout/Message";
import styles from "./Projects.module.css";
import { useLocation } from "react-router-dom";
import Container from "../layout/Container";
import LinkButton from "../layout/LinkButton";
import { useState, useEffect } from "react";
import ProjectCard from "../project/ProjectCard";
import Loading from "../layout/Loading";

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true)
  const [projectMessage, setProjectMessage] = useState('')

  let location = useLocation();
  let message = "";
  if (location.state) {
    message = location.state.message;
  }

  useEffect(() => {
    setTimeout(() => { // carregamento fake
      fetch("http://localhost:5000/projects", {
      method: "GET",
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((data) => data.json())
      .then((newData) => {
        setProjects(newData);
        setIsLoading(false)
      })
      .catch((err) => console.log(err));
    }, 300); 
  }, []);

  return (
    <div className={styles.projectContainer}>
      <div className={styles.projectHeader}>
        <h1>Projects</h1>
        <LinkButton to={"/new-project"} text="New Project" />
      </div>

      {message && <Message type="success" msg={message} />}
      {projectMessage && <Message type="success" msg={projectMessage} />}
      <Container newClass="justify-content-start">
        {projects.length > 0 &&
          projects.map((project) => (
            <ProjectCard
              key={project.id}
              id={project.id}
              name={project.name}
              budget={project.budget}
              category={project.category?.name}
              handleRemove={removeProject}
            />
          ))}

        {isLoading && (<Loading/>)}
        {!isLoading && projects.length === 0 && (
          <p>No projects here!</p>
        )}
      </Container>
    </div>
  );

  function removeProject(id){
    fetch(`http://localhost:5000/projects/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json'
      }
    }).then(data => data.json()).then(() => {
      let filtered = projects.filter((project) => project.id !== id)
      setProjects(filtered)
      setProjectMessage('Project deleted sucessfully!')
    }).catch(err => console.log(err))
  }
}
