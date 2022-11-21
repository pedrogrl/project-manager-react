import Input from "../form/Input";
import Select from "../form/Select";
import SubmitButton from "../form/SubmitButton";
import styles from "./ProjectForm.module.css";

export default function ProjectForm({btnText}) {
  return (
    <form className={styles.form}>
      <Input
        type={"text"}
        textLabel={"Project name"}
        placeholder={"Enter your project name"}
      />
      <Input
        type={"number"}
        textLabel={"Project budget"}
        placeholder={"Enter the total budget"}
      />
      <Select name={'categoryId'} textLabel={'Select a category'}  />
      <SubmitButton text={btnText}/>
    </form>
  );
}
