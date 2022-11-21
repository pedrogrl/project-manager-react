import {FaFacebook, FaInstagram, FaTwitter} from 'react-icons/fa'

import styles from './Footer.module.css'

export default function Footer(){

  return (
    <footer className={styles.footer}>
      <ul className={styles.ul}>
        <li>
          <FaFacebook/>
        </li>
        <li>
          <FaInstagram/>
        </li>
        <li>
          <FaTwitter/>
        </li>
      </ul>
      <p>
        <span>Costs</span> &copy; 2022
      </p>
    </footer>
  )
}