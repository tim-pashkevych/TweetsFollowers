import { useDispatch, useSelector } from "react-redux"
import { Link, NavLink } from "react-router-dom"

import { logout, selectAuthUser, selectIsLoggedIn } from "@/redux/auth/slice"
import logoImg from "@/assets/images/logo.png"
import styles from "./Header.module.css"

export const Header = () => {
  const dispatch = useDispatch()
  const isLoggedIn = useSelector(selectIsLoggedIn)
  const authUser = useSelector(selectAuthUser)

  return (
    <div className={styles.header}>
      <div className={styles.logoContainer}>
        <Link to='/'>
          <img src={logoImg} alt='Logo' width={60} height={60} />
        </Link>
        <div>Tweets Follower</div>
      </div>
      <ul className={styles.navMenu}>
        {isLoggedIn && (
          <>
            <li>Hello, {authUser.name}</li>
            <li>
              <Link to='/' onClick={() => dispatch(logout())}>
                Logout
              </Link>
            </li>
          </>
        )}

        {!isLoggedIn && (
          <>
            <li>
              <NavLink to='/login'>Login</NavLink>
            </li>
          </>
        )}
      </ul>
    </div>
  )
}
