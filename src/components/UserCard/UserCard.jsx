import { useContext } from "react"
import { UserContext } from "@/context/ContextProvider"
import avatarImg from "@/assets/images/avatar.png"
import styles from "./UserCard.module.css"

export const UserCard = ({ user }) => {
  const { setAuthUser } = useContext(UserContext)
  return (
    <div className={styles.userCardContainer}>
      <div className={styles.avatarImgWrap}>
        <img src={avatarImg} className={styles.avatarImg} />
      </div>
      <div className={styles.userName}>{user.name}</div>
      <button
        className={styles.selectUserBtn}
        onClick={() => setAuthUser(user)}
        type='button'
      >
        Select
      </button>
    </div>
  )
}
