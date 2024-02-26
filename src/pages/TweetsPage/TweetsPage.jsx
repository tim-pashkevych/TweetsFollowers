import { fetchFollowersThunk } from "@/redux/followers/operations"
import { fetchUsersThunk } from "@/redux/users/operations"
import {
  selectIsLoadingUsers,
  selectUsersWithFollowers,
} from "@/redux/users/selectors"
import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"

import styles from "./TweetsPage.module.css"
import { Loader, TweetsCard } from "@/components"
import { selectIsLoadingFollowers } from "@/redux/followers/slice"
import { nextPage, resetPage } from "@/redux/users/slice"
import { useNavigate } from "react-router-dom"
import clsx from "clsx"

const TweetsPage = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const users = useSelector(selectUsersWithFollowers)

  useEffect(() => {
    dispatch(resetPage())
    dispatch(fetchUsersThunk())
    dispatch(fetchFollowersThunk())
  }, [dispatch])

  return (
    <div className={styles.container}>
      <button
        type='button'
        className={clsx(styles.button, styles.goBackBtn)}
        onClick={() => navigate("/")}
      >
        Back
      </button>
      <ul className={styles.cardsContainer}>
        {users.map(user => (
          <li key={user.id}>
            <TweetsCard user={user} />
          </li>
        ))}
      </ul>
      <button
        type='button'
        className={clsx(styles.button, styles.loadMoreBtn)}
        onClick={() => dispatch(nextPage())}
      >
        Load more
      </button>
    </div>
  )
}

export default TweetsPage
