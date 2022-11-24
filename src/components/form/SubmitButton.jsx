import styles from "./SubmitButton.module.css";

export default function SubmitButton({
  text,
  width
}) {
  
  return (
    <div>
      <button className={styles.button} style={{width: width}}>{text}</button>
    </div>
  );
}
