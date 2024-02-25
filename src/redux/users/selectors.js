import { createSelector } from "@reduxjs/toolkit"
import { selectFollowers } from "../followers/slice"
import { selectAuthUser } from "../auth/slice"

export const selectUsers = state => state.users.data
export const selectIsLoadingUsers = state => state.users.isLoading
export const selectError = state => state.users.error

export const selectUsersWithFollowers = createSelector(
  [selectAuthUser, selectUsers, selectFollowers],
  (autUser, users, followers) =>
    users
      .filter(user => Number(user.id) !== Number(autUser.id))
      .map(user => ({
        ...user,
        followers: followers.filter(
          follower => Number(follower.userId) === Number(user.id),
        ),
      })),
)
