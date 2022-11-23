import styles from "./ProjectCard.module.css";
import { BsPencil, BsFillTrashFill } from "react-icons/bs";
import { Link } from "react-router-dom";

export default function ProjectCard({id,name,budget,category,handleRemove,}) {
  return (
    <div className={styles.projectCard}>
      <h4>{name}</h4>
      <p>
        <span>Total Budget:</span> ${budget}
      </p>

      <p className={styles.category}>
        <span className={`${styles[category.toLowerCase()]}`}></span> {category}
      </p>

      <div className={styles.actions}>
        <Link to={'/'}>
          <BsPencil/> Edit
        </Link>
        <button>
          <BsFillTrashFill/> Delete
        </button>
      </div>
    </div>
  )
}
