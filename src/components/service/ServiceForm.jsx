import { useState } from "react";
import Input from "../form/Input";
import SubmitButton from "../form/SubmitButton";
import styles from "../project/ProjectForm.module.css";

export default function ServiceForm({ handleSubmit, btnText, projectData }) {
  const [service, setService] = useState({});

  return (
    <form className={styles.form} onSubmit={submit}>
      <Input
        type={"text"}
        textLabel={"Name"}
        name={"name"}
        placeholder={"Enter the service name"}
        handleOnChange={handleChange}
      />
      <Input
        type={"number"}
        textLabel={"Cost"}
        name={"cost"}
        placeholder={"Enter the service cost"}
        handleOnChange={handleChange}
      />
      <Input
        type={"text"}
        textLabel={"Description"}
        name={"description"}
        placeholder={"Enter the service description"}
        handleOnChange={handleChange}
      />
      <SubmitButton text={btnText} />
    </form>
  );

  function submit(e) {
    e.preventDefault();
    projectData.services.push(service);
    handleSubmit(projectData);
  }

  function handleChange(e) {
    setService({ ...service, [e.target.name]: e.target.value });
  }
}
