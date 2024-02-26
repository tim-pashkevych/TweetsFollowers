import goitImg from "@/assets/images/goit-logo.png"
import tweetsImg from "@/assets/images/tweets.png"
import commentImg from "@/assets/images/comment.png"
import commentHeartImg from "@/assets/images/comment-heart.png"
import heartImg from "@/assets/images/heart.png"
import avatarImg from "@/assets/images/avatar.png"
import clsx from "clsx"
import styles from "./HomePage.module.css"
import { Link } from "react-router-dom"
import { useSelector } from "react-redux"
import { selectIsLoggedIn } from "@/redux/auth/slice"

const HomePage = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn)

  return (
    <div className={styles.container}>
      <div className={styles.tweetsCardContainer}>
        <div className={styles.tweetsCardHeader}>
          <img src={goitImg} className={styles.goitImg} />
          <img src={tweetsImg} className={styles.tweetsImg} />
          <img src={commentImg} className={styles.commentImg} />
          <img src={commentHeartImg} className={styles.commentHeartImg} />
          <img src={heartImg} className={styles.heartImg} />
        </div>
        <div className={styles.tweetsCardMain}>
          <div className={styles.avatarImgWrap}>
            <img src={avatarImg} className={styles.avatarImg} />
          </div>
        </div>
        <div className={styles.tweetsCardFooter}>
          <Link
            to={isLoggedIn ? "/tweets" : "/login"}
            className={styles.button}
          >
            {isLoggedIn ? "Tweets" : "Login"}
          </Link>
        </div>
      </div>
    </div>
  )
}

export default HomePage
