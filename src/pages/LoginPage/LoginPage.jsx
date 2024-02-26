import { useDispatch, useSelector } from "react-redux"
import { selectPaginatedUsers } from "@/redux/users/selectors"
import { UserCard } from "@/components"

import styles from "./LoginPage.module.css"
import { useEffect } from "react"
import { fetchUsersThunk } from "@/redux/users/operations"
import { nextPage, resetPage } from "@/redux/users/slice"

const LoginPage = () => {
  const dispatch = useDispatch()
  const users = useSelector(selectPaginatedUsers)

  useEffect(() => {
    dispatch(resetPage())
    dispatch(fetchUsersThunk())
  }, [dispatch])

  return (
    <div className={styles.container}>
      <ul className={styles.usersContainer}>
        {users.map(user => (
          <li className={styles.userItem} key={user.id}>
            <UserCard user={user} />
          </li>
        ))}
      </ul>
      <button
        type='button'
        className={styles.loadMoreBtn}
        onClick={() => dispatch(nextPage())}
      >
        Load more
      </button>
    </div>
  )
}

export default LoginPage
