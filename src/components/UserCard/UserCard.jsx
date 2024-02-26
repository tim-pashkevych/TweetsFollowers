import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { login, selectIsLoggedIn } from "@/redux/auth/slice"

import avatarImg from "@/assets/images/avatar.png"
import styles from "./UserCard.module.css"

export const UserCard = ({ user }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const isLoggedIn = useSelector(selectIsLoggedIn)

  const handleLogin = () => {
    dispatch(login(user))
  }

  if (isLoggedIn) {
    navigate("/tweets")
  }

  return (
    <div className={styles.userCardContainer}>
      <div className={styles.avatarImgWrap}>
        <img src={avatarImg} className={styles.avatarImg} />
      </div>
      <div className={styles.userName}>{user.name}</div>
      <button
        className={styles.selectUserBtn}
        onClick={handleLogin}
        type='button'
      >
        Select
      </button>
    </div>
  )
}
