import styles from "../project/ProjectCard.module.css";
import { BsFillTrashFill } from "react-icons/bs";

export default function ServiceCard({
  id,
  name,
  cost,
  description,
  handleRemove,
}) {
  return (
    <div className={styles.projectCard}>
      <h4>{name}</h4>
      <p>
        <span>Cost:</span> ${cost}
      </p>
      <p>{description}</p>

      <div className={styles.actions}>
        <button onClick={remove}>
          <BsFillTrashFill /> remove
        </button>
      </div>
    </div>
  );

  function remove(e) {
    e.preventDefault();
    handleRemove(id, cost);
  }
}
