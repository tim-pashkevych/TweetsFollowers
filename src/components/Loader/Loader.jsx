import { Bars } from "react-loader-spinner"
import styles from "./Loader.module.css"

export const Loader = () => {
  return (
    <div className={styles.container}>
      <Bars
        height={100}
        width={100}
        color='rgb(77, 34, 169)'
        ariaLabel='Bars-loading'
      />
    </div>
  )
}
