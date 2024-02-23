import { Modal, TweetsCard, UserCard } from "@/components"
import styles from "./Home.module.css"
import { useContext, useEffect, useRef, useState } from "react"
import { api } from "@/axiosConfig/tweetsCarsApi"
import { toast } from "react-toastify"
import { UserContext } from "@/context/ContextProvider"

const Home = () => {
  const { authUser } = useContext(UserContext)
  const [users, setUsers] = useState([])
  const [followers, setFollowers] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      // Get list of Users
      try {
        const { data } = await api.get("users")
        setUsers(data.filter(user => Number(user.id) !== Number(authUser?.id)))
      } catch (error) {
        toast.error(error.message)
      }

      // Get list of Followers
      try {
        const { data } = await api.get("followers")
        setFollowers(data)
      } catch (error) {
        toast.error(error.message)
      }
    }

    fetchData()
  }, [authUser])

  const handleClickFollowBtn = follower => {
    setFollowers([follower, ...followers])
  }

  return authUser ? (
    <>
      <h1 className={styles.header}>Hello, {authUser.name}</h1>
      <ul className={styles.cardsContainer}>
        {users.map(user => (
          <li key={user.id}>
            <TweetsCard
              authUser={authUser}
              user={user}
              userFollowers={followers.filter(
                follower => Number(follower.userId) === Number(user.id),
              )}
              onClick={handleClickFollowBtn}
            />
          </li>
        ))}
      </ul>
    </>
  ) : (
    <Modal>
      {users.length ? (
        <ul className={styles.usersContainer}>
          {users.map(user => (
            <li className={styles.userItem} key={user.id}>
              <UserCard user={user} />
            </li>
          ))}
        </ul>
      ) : (
        <div className={styles.noDataContainer}>No data</div>
      )}
    </Modal>
  )
}

export default Home
