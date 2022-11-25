import { useEffect, useState } from "react";
import Input from "../form/Input";
import Select from "../form/Select";
import SubmitButton from "../form/SubmitButton";
import styles from "./ProjectForm.module.css";

export default function ProjectForm({
  handleSubmit,
  btnText,
  btnWidth,
  projectData,
}) {
  const [project, setProject] = useState(projectData || {});
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/categories", {
      method: "GET",
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((data) => data.json())
      .then((newData) => {
        setCategories(newData);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <form className={styles.form} onSubmit={submit}>
      <Input
        type={"text"}
        textLabel={"Project name"}
        name={"name"}
        placeholder={"Enter your project name"}
        handleOnChange={handleChange}
        value={project.name ? project.name : ""}
      />
      <Input
        type={"number"}
        textLabel={"Project budget"}
        name={"budget"}
        placeholder={"Enter the total budget"}
        handleOnChange={handleChange}
        value={project.budget ? project.budget : ""}
      />
      <Select
        name={"categoryId"}
        textLabel={"Select a category"}
        options={categories}
        handleOnChange={handleCategory}
        value={project.category ? project.category.id : ""}
      />
      <SubmitButton text={btnText} width={btnWidth} />
    </form>
  );

  function handleChange(e) {
    setProject({ ...project, [e.target.name]: e.target.value });
  }

  function handleCategory(e) {
    setProject({
      ...project,
      category: {
        id: e.target.value,
        name: e.target.options[e.target.selectedIndex].text,
      },
    });
  }

  function submit(e) {
    e.preventDefault();
    handleSubmit(project);
  }
}
