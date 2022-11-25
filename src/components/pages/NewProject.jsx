import ProjectForm from "../project/ProjectForm";
import styles from "./NewProject.module.css";

import { useNavigate } from "react-router-dom";

export default function NewProject() {
  const navigate = useNavigate();

  function newPost(project) {
    // Initial values
    project.cost = 0;
    project.services = [];

    fetch("http://localhost:5000/projects", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(project),
    })
      .then((data) => data.json())
      .then((newData) => {
        navigate("/projects", {
          state: { message: "New Project created sucessfully!" },
        });
      })
      .catch((error) => console.log(error));
  }

  return (
    <div className={styles.newProjectContainer}>
      <h1>New Project</h1>
      <p>Create a new project then add services</p>
      <ProjectForm handleSubmit={newPost} btnText={"Create Project"} />
    </div>
  );
}
