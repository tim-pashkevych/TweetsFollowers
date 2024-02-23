import styles from "./TweetsCard.module.css"

import goitImg from "@/assets/images/goit-logo.png"
import tweetsImg from "@/assets/images/tweets.png"
import commentImg from "@/assets/images/comment.png"
import commentHeartImg from "@/assets/images/comment-heart.png"
import heartImg from "@/assets/images/heart.png"
import avatarImg from "@/assets/images/avatar.png"
import { toast } from "react-toastify"
import { api } from "@/axiosConfig/tweetsCarsApi"
import clsx from "clsx"

export const TweetsCard = ({
  user = {},
  userFollowers = [],
  authUser = {},
  onClick,
}) => {
  const { id: userId, tweets: userTweetsCnt } = user
  const isFollowing = userFollowers.filter(
    follower => Number(follower.followerId) === Number(authUser?.id),
  ).length

  const handleOnClick = () => {
    if (isFollowing) {
      toast.info("You are already following")
      return
    }

    api
      .post(`followers`, { userId, followerId: authUser?.id })
      .then(resp => onClick(resp.data))
      .catch(error => toast.error(error.message))
  }

  return (
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
        <div className={styles.tweetsCount}>{userTweetsCnt} Tweets</div>
        <div className={styles.tweetsFollowers}>
          {userFollowers.length} Followers
        </div>
        <button
          className={clsx(styles.button, {
            [styles.followingBtn]: isFollowing,
            [styles.followBtn]: !isFollowing,
          })}
          type='button'
          onClick={handleOnClick}
          disabled={isFollowing}
        >
          {isFollowing ? "Following" : "Follow"}
        </button>
      </div>
    </div>
  )
}
