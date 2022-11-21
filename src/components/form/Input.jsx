import styles from "./Input.module.css";

export default function Input({
  type,
  placeholder,
  name,
  textLabel,
  value,
  handleOnChange,
}) {
  return (
    <div className={styles.form}>
      <label htmlFor={name}>{textLabel}</label>
      <input
        type={type}
        name={name}
        id={name}
        placeholder={placeholder}
        onChange={handleOnChange}
        value={value}
      />
    </div>
  );
}
