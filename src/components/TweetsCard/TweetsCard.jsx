import { useDispatch, useSelector } from "react-redux"
import clsx from "clsx"

import { selectAuthUser } from "@/redux/auth/slice"
import {
  addFollowerThunk,
  deleteFollowerThunk,
} from "@/redux/followers/operations"

import goitImg from "@/assets/images/goit-logo.png"
import tweetsImg from "@/assets/images/tweets.png"
import commentImg from "@/assets/images/comment.png"
import commentHeartImg from "@/assets/images/comment-heart.png"
import heartImg from "@/assets/images/heart.png"
import avatarImg from "@/assets/images/avatar.png"
import styles from "./TweetsCard.module.css"

export const TweetsCard = ({ user = {} }) => {
  const dispatch = useDispatch()
  const authUser = useSelector(selectAuthUser)
  const { id: userId, tweets: userTweetsCnt, followers } = user
  const isFollowing = followers.find(
    follower => Number(follower.followerId) === Number(authUser.id),
  )

  const handleOnClick = () => {
    if (isFollowing) {
      dispatch(deleteFollowerThunk(isFollowing.id))
    } else {
      dispatch(addFollowerThunk({ userId, followerId: authUser.id }))
    }
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
          {followers.length} Followers
        </div>
        <button
          className={clsx(styles.button, {
            [styles.followingBtn]: isFollowing,
            [styles.followBtn]: !isFollowing,
          })}
          type='button'
          onClick={handleOnClick}
        >
          {isFollowing ? "Following" : "Follow"}
        </button>
      </div>
    </div>
  )
}
