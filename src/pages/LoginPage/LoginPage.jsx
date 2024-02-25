import { useDispatch, useSelector } from "react-redux"
import { selectUsers } from "@/redux/users/selectors"
import { UserCard } from "@/components"

import styles from "./LoginPage.module.css"
import { useEffect } from "react"
import { fetchUsersThunk } from "@/redux/users/operations"

const LoginPage = () => {
  const dispatch = useDispatch()
  const users = useSelector(selectUsers)

  useEffect(() => {
    dispatch(fetchUsersThunk())
  }, [dispatch])

  return (
    <ul className={styles.usersContainer}>
      {users.map(user => (
        <li className={styles.userItem} key={user.id}>
          <UserCard user={user} />
        </li>
      ))}
    </ul>
  )
}

export default LoginPage
