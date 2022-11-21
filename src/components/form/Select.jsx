import styles from "./Select.module.css";

export default function Select({
  name,
  textLabel,
  value,
  handleOnChange,
  options,
}) {
  return (
    <div className={styles.form}>
      <label htmlFor={name}>{textLabel}</label>
      <select
        name={name}
        id={name}
        onChange={handleOnChange}
        value={value || ""}
      >
        <option>Select an option</option>

        {options.map((option) => (
          <option value={option.id} key={option.id}>
            {option.name}
          </option>
        ))}
      </select>
    </div>
  );
}
