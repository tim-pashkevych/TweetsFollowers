import { createSelector } from "@reduxjs/toolkit"
import { selectFollowers } from "../followers/slice"
import { selectAuthUser } from "../auth/slice"

export const selectFilter = state => state.users.filter
export const selectPage = state => state.users.page
export const selectItemsPerPage = state => state.users.itemsPerPage
export const selectUsers = state => state.users.data
export const selectIsLoadingUsers = state => state.users.isLoading
export const selectError = state => state.users.error

export const selectPaginatedUsers = createSelector(
  [selectUsers, selectPage, selectItemsPerPage],
  (users, page, itemsPerPage) => {
    return users.slice(0, page * itemsPerPage)
  },
)

export const selectUsersWithFollowers = createSelector(
  [selectAuthUser, selectUsers, selectFollowers, selectFilter],
  (autUser, users, followers, filter) => {
    let filteredUsers = users.map(user => ({
      ...user,
      followers: followers.filter(
        follower => Number(follower.userId) === Number(user.id),
      ),
    }))

    switch (filter) {
      case "follow":
        filteredUsers = filteredUsers.filter(
          user =>
            user.followers.filter(
              follower => Number(follower.followerId) === Number(autUser.id),
            ).length === 0,
        )
        break
      case "followings":
        filteredUsers = filteredUsers.filter(
          user =>
            user.followers.filter(
              follower => Number(follower.followerId) === Number(autUser.id),
            ).length !== 0,
        )
        break
      default:
        break
    }

    return filteredUsers.filter(user => Number(user.id) !== Number(autUser.id))
  },
)

export const selectPaginatedUsersWithFollowers = createSelector(
  [
    selectAuthUser,
    selectUsers,
    selectFollowers,
    selectPage,
    selectItemsPerPage,
    selectFilter,
  ],
  (autUser, users, followers, page, itemsPerPage, filter) => {
    let filteredUsers = users.map(user => ({
      ...user,
      followers: followers.filter(
        follower => Number(follower.userId) === Number(user.id),
      ),
    }))

    switch (filter) {
      case "follow":
        filteredUsers = filteredUsers.filter(
          user =>
            user.followers.filter(
              follower => Number(follower.followerId) === Number(autUser.id),
            ).length === 0,
        )
        break
      case "followings":
        filteredUsers = filteredUsers.filter(
          user =>
            user.followers.filter(
              follower => Number(follower.followerId) === Number(autUser.id),
            ).length !== 0,
        )
        break
      default:
        break
    }

    return filteredUsers
      .filter(user => Number(user.id) !== Number(autUser.id))
      .slice(0, page * itemsPerPage)
  },
)
