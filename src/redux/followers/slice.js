import { createSlice, isAnyOf } from "@reduxjs/toolkit"
import { addFollowerThunk, fetchFollowersThunk } from "./operations"
import { fetchUsersThunk } from "../users/operations"

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
        state.data = payload
      })
      .addCase(fetchFollowersThunk.pending, state => {
        state.isLoading = true
      })
      .addCase(fetchUsersThunk.rejected, (state, { payload }) => {
        state.error = payload
      })
      .addCase(addFollowerThunk.fulfilled, (state, { payload }) => {
        state.data.push(payload)
      })
      .addCase(addFollowerThunk.pending, state => {
        state.isLoading = true
      })
      .addCase(addFollowerThunk.rejected, (state, { payload }) => {
        state.error = payload
      })
      .addMatcher(
        isAnyOf(
          fetchFollowersThunk.fulfilled,
          fetchFollowersThunk.rejected,
          addFollowerThunk.fulfilled,
          addFollowerThunk.rejected,
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
