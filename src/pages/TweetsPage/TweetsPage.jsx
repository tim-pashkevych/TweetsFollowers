import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import Select from "react-select"
import clsx from "clsx"

import { fetchFollowersThunk } from "@/redux/followers/operations"
import { nextPage, resetPage, setFilter } from "@/redux/users/slice"
import { fetchUsersThunk } from "@/redux/users/operations"
import {
  selectFilter,
  selectPaginatedUsersWithFollowers,
  selectUsersWithFollowers,
} from "@/redux/users/selectors"

import styles from "./TweetsPage.module.css"
import { TweetsCard } from "@/components"

const TweetsPage = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const filter = useSelector(selectFilter)
  const users = useSelector(selectPaginatedUsersWithFollowers)
  const allUsers = useSelector(selectUsersWithFollowers)
  const isLastPageLoaded = users.length === allUsers.length

  const options = [
    { value: "all", label: "All" },
    { value: "follow", label: "Follow" },
    { value: "followings", label: "Followings" },
  ]

  useEffect(() => {
    dispatch(resetPage())
    dispatch(fetchUsersThunk())
    dispatch(fetchFollowersThunk())
  }, [dispatch])

  return (
    <div className={styles.container}>
      <div className={styles.controls}>
        <button
          type='button'
          className={clsx(styles.button, styles.goBackBtn)}
          onClick={() => navigate("/")}
        >
          Back
        </button>
        <Select
          defaultValue={filter}
          onChange={selectedOption => dispatch(setFilter(selectedOption.value))}
          options={options}
          classNames={{
            control: () => styles.filter,
          }}
        />
      </div>

      {users.length > 0 && (
        <ul className={styles.cardsContainer}>
          {users.map(user => (
            <li key={user.id}>
              <TweetsCard user={user} />
            </li>
          ))}
        </ul>
      )}

      {users.length === 0 && <p>No data</p>}

      {!isLastPageLoaded && (
        <button
          type='button'
          className={clsx(styles.button, styles.loadMoreBtn)}
          onClick={() => dispatch(nextPage())}
        >
          Load more
        </button>
      )}
    </div>
  )
}

export default TweetsPage
