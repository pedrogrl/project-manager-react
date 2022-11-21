import styles from "./Home.module.css";
import savings from "../../img/savings.svg";
import LinkButton from "../layout/LinkButton";

export default function Home() {
  return (
    <section className={styles.homeContainer}>
      <h1>
        Welcome to <span>Costs</span>
      </h1>
      <p>Start managing your projects right now!</p>
      <LinkButton to={"/new-project"} text={"Create a new project"} />
      <img src={savings} alt="Costs" />
    </section>
  );
}
