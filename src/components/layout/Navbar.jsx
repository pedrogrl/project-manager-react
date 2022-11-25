import { Link } from "react-router-dom";

import logo from "../../img/logo.png";
import Container from "./Container";
import styles from "./Navbar.module.css";

export default function Navbar() {
  return (
    <nav className={styles.navbar}>
      <Container>
        <Link to={"/"}>
          <img src={logo} alt="Logo" />
        </Link>
        <ul className={styles.ul}>
          <li>
            <Link to={"/"}>Home</Link>
          </li>
          <li>
            <Link to={"/projects"}>Projects</Link>
          </li>
          <li>
            <Link>Company</Link>
          </li>
          <li>
            <Link>Contact</Link>
          </li>
        </ul>
      </Container>
    </nav>
  );
}
