import { createSelector } from "@reduxjs/toolkit"
import { selectFollowers } from "../followers/slice"
import { selectAuthUser } from "../auth/slice"

export const selectPage = state => state.users.page
export const selectItemsPerPage = state => state.users.itemsPerPage
export const selectUsers = state => state.users.data
export const selectIsLoadingUsers = state => state.users.isLoading
export const selectError = state => state.users.error

export const selectUsersWithFollowers = createSelector(
  [
    selectAuthUser,
    selectUsers,
    selectFollowers,
    selectPage,
    selectItemsPerPage,
  ],
  (autUser, users, followers, page, itemsPerPage) =>
    users
      .filter(user => Number(user.id) !== Number(autUser.id))
      .slice(0, page * itemsPerPage)
      .map(user => ({
        ...user,
        followers: followers.filter(
          follower => Number(follower.userId) === Number(user.id),
        ),
      })),
)

export const selectPaginatedUsers = createSelector(
  [selectUsers, selectPage, selectItemsPerPage],
  (users, page, itemsPerPage) => {
    return users.slice(0, page * itemsPerPage)
  },
)
