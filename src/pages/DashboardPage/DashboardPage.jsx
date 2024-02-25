import { fetchFollowersThunk } from "@/redux/followers/operations"
import { fetchUsersThunk } from "@/redux/users/operations"
import { selectUsersWithFollowers } from "@/redux/users/selectors"
import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"

import styles from "./DashboardPage.module.css"
import { TweetsCard } from "@/components"

const DashboardPage = () => {
  const dispatch = useDispatch()
  const users = useSelector(selectUsersWithFollowers)

  useEffect(() => {
    dispatch(fetchUsersThunk())
    dispatch(fetchFollowersThunk())
  }, [dispatch])

  return (
    <ul className={styles.cardsContainer}>
      {users.map(user => (
        <li key={user.id}>
          <TweetsCard user={user} />
        </li>
      ))}
    </ul>
  )
}

export default DashboardPage
