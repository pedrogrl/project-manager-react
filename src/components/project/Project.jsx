import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { parse, v4 as uuidv4 } from "uuid";
import Container from "../layout/Container";
import Loading from "../layout/Loading";
import Message from "../layout/Message";
import ServiceForm from "../service/ServiceForm";
import styles from "./Project.module.css";
import ProjectForm from "./ProjectForm";

export default function Project() {
  const { id } = useParams(); // id da url

  const [project, setProject] = useState([]);
  const [showProjectForm, setShowProjectForm] = useState(false);
  const [showServiceForm, setShowServiceForm] = useState(false);
  const [message, setMessage] = useState();
  const [type, setType] = useState();

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
  function toggleServiceForm() {
    setShowServiceForm(!showServiceForm);
  }

  function addService(project) {
    const lastService = project.services[project.services.length - 1];
    const lastServiceCost = lastService.cost
    lastService.id = uuidv4();
    const newCost = Number(project.cost) + Number(lastServiceCost);
    if (newCost > Number(project.budget)) {
      setMessage(`The value exceeded the budget!`);
      setType("error");
      project.services.pop();
      return false;
    }

    project.cost = newCost;

    fetch(`http://localhost:5000/projects/${project.id}`, {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(project),
    })
      .then((data) => data.json())
      .then((newData) => {
        console.log(newData);
      })
      .catch((err) => console.log(err));
  }

  return (
    <>
      {project.name ? (
        <div className={styles.projectDetails}>
          <Container newClass={"flex-direction-column"}>
            {message && <Message msg={message} type={type} />}
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

            <div className={styles.serviceFormContainer}>
              <h2>Add a new service</h2>
              <button onClick={toggleServiceForm}>
                {!showServiceForm ? "Add Service" : "Close"}
              </button>
              {showServiceForm && (
                <div className={styles.projectInfo}>
                  <ServiceForm
                    handleSubmit={addService}
                    btnText={"Add Service"}
                    projectData={project}
                  />
                </div>
              )}
            </div>
            <h2>Services</h2>
            <Container newClass="justify-content-start">
              <p>svc items</p>
            </Container>
          </Container>
        </div>
      ) : (
        <Loading />
      )}
    </>
  );

  function editPost(project) {
    setMessage("");
    if (project.budget < project.cost) {
      setMessage("The budget cannot exceed the total amount!");
      setType("error");
      return false;
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
        setShowProjectForm(!showProjectForm);
        setMessage("Project updated sucessfully!");
        setType("success");
      })
      .catch((err) => console.log(err));
  }
}
