import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Container from "../layout/Container";
import Loading from "../layout/Loading";
import Message from "../layout/Message";
import styles from "./Project.module.css";
import ProjectForm from "./ProjectForm";

export default function Project() {
  const { id } = useParams(); // id da url

  const [project, setProject] = useState([]);
  const [showProjectForm, setShowProjectForm] = useState(false);
  const [message, setMessage] = useState()
  const [type, setType] = useState()


  useEffect(() => {
    setTimeout(() => {
      // carregamento fake
      fetch(`http://localhost:5000/projects/${id}`, {
        method: "GET",
        headers: {
          "Content-type": "application/json",
        },
      })
        .then((data) => data.json())
        .then((newData) => {
          setProject(newData);
        })
        .catch((err) => console.log(err));
    }, 300);
  }, [id]);

  function toggleProjectForm() {
    setShowProjectForm(!showProjectForm);
  }

  return (
    <>
      {project.name ? (
        <div className={styles.projectDetails}>
          <Container newClass={"flex-direction-column"}>
            {message && <Message msg={message} type={type}/>}
            <div className={styles.detailsContainer}>
              <h1>Project - {project.name}</h1>
              <button onClick={toggleProjectForm}>
                {!showProjectForm ? "Edit Project" : "Close"}
              </button>

              {!showProjectForm ? (
                <div className={styles.projectInfo}>
                  <p>
                    <span>Category:</span> {project.category.name}
                  </p>
                  <p>
                    <span>Total Budget:</span> ${project.budget}
                  </p>
                  <p>
                    <span>Used Budget:</span> ${project.cost}
                  </p>
                </div>
              ) : (
                <div className={styles.projectInfo}>
                  <ProjectForm
                    handleSubmit={editPost}
                    btnText={"Save Changes"}
                    projectData={project}
                    btnWidth="auto"
                  />
                </div>
              )}
            </div>
          </Container>
        </div>
      ) : (
        <Loading />
      )}
    </>
  );

  function editPost(project) {
    if (project.budget < project.cost) {
      setMessage('The budget cannot exceed the total amount!')
      setType('error')
      return false
    }

    fetch(`http://localhost:5000/projects/${project.id}`, {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(project),
    })
      .then((data) => data.json())
      .then((newData) => {
        setProject(newData);
        setShowProjectForm(!showProjectForm)
        setMessage('Project updated sucessfully!')
        setType('success')
      })
      .catch((err) => console.log(err));
  }
}
