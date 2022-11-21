import styles from "./Select.module.css";

export default function Select({
  name,
  textLabel,
  value,
  handleOnChange,
  options
}) {
  
  return (
    <div className={styles.form}>
      <label htmlFor={name}>{textLabel}</label>
      <select name={name} id={name}>
        <option>Select an option</option>
      </select>
    </div>
  );
}
