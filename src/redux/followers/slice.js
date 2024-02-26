import { createSlice, isAnyOf } from "@reduxjs/toolkit"
import {
  addFollowerThunk,
  deleteFollowerThunk,
  fetchFollowersThunk,
} from "./operations"

const initialState = { data: [], isLoading: false, error: null }

const slice = createSlice({
  name: "followers",
  initialState,
  selectors: {
    selectFollowers: state => state.data,
    selectIsLoadingFollowers: state => state.isLoading,
    selectError: state => state.error,
  },
  extraReducers: builder => {
    builder
      .addCase(fetchFollowersThunk.fulfilled, (state, { payload }) => {
        state.error = null
        state.data = payload
      })
      .addCase(addFollowerThunk.fulfilled, (state, { payload }) => {
        state.error = null
        state.data.push(payload)
      })
      .addCase(deleteFollowerThunk.fulfilled, (state, { payload }) => {
        state.error = null
        state.data = state.data.filter(
          follower => Number(follower.id) !== Number(payload.id),
        )
      })
      .addMatcher(
        isAnyOf(
          fetchFollowersThunk.pending,
          addFollowerThunk.pending,
          deleteFollowerThunk.pending,
        ),
        state => {
          state.isLoading = true
        },
      )
      .addMatcher(
        isAnyOf(
          fetchFollowersThunk.rejected,
          addFollowerThunk.rejected,
          deleteFollowerThunk.rejected,
        ),
        (state, { payload }) => {
          state.error = payload
        },
      )
      .addMatcher(
        isAnyOf(
          fetchFollowersThunk.fulfilled,
          fetchFollowersThunk.rejected,
          addFollowerThunk.fulfilled,
          addFollowerThunk.rejected,
          deleteFollowerThunk.fulfilled,
          deleteFollowerThunk.rejected,
        ),
        state => {
          state.isLoading = false
        },
      )
  },
})

export const followersReducer = slice.reducer
export const { selectFollowers, selectIsLoadingFollowers, selectError } =
  slice.selectors
