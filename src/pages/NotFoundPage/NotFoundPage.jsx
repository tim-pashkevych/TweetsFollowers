import logoImg from "@/assets/images/logo.png"
import styles from "./NotFoundPage.module.css"
import { Link } from "react-router-dom"

const NotFoundPage = () => {
  return (
    <div className={styles.container}>
      <img src={logoImg} alt='Logo image' width={200} height={200} />
      <h1>Nothing found</h1>
      <Link to='/' className={styles.button}>
        Go to Home page
      </Link>
    </div>
  )
}

export default NotFoundPage
