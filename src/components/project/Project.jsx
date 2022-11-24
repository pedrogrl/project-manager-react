import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Container from "../layout/Container";
import Loading from '../layout/Loading'
import styles from "./Project.module.css";

export default function Project() {
  const { id } = useParams(); // id da url

  const [project, setProject] = useState([]);
  const [showProjectForm, setShowProjectForm] = useState(false)
  useEffect(() => {
    setTimeout(() => { // carregamento fake
      fetch(`http://localhost:5000/projects/${id}`, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((data) => data.json())
      .then((newData) => {
        setProject(newData)
      })
      .catch((err) => console.log(err));
    }, 300);
  }, [id]);

  function toggleProjectForm(){
    setShowProjectForm(!showProjectForm)
  }

  return (
    <>
      {project.name ? (
        <div className={styles.projectDetails}>
          <Container newClass={'flex-direction-column'}>
            <div className={styles.detailsContainer}>
              <h1>Project - {project.name}</h1>
              <button onClick={toggleProjectForm}>
                {!showProjectForm ? 'Edit Project' : 'Close'}
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
                  <p>project details</p>
                </div>
              )}
            </div>
          </Container>
        </div>
      ) : (
        <Loading/>
      )}
    </>
  )
}
