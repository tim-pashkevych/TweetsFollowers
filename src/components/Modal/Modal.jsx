import { createPortal } from "react-dom"
import styles from "./Modal.module.css"

export const Modal = ({ children }) => {
  return createPortal(
    <div className={styles.modalWindow}>
      <div className={styles.modalWindowContent}>{children}</div>
    </div>,
    document.getElementById(`modal-root`),
  )
}
