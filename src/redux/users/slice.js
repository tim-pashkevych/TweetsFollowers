import { createSlice, isAnyOf } from "@reduxjs/toolkit"
import { fetchUsersThunk } from "./operations"

const initialState = { data: [], isLoading: false, error: null }

const slice = createSlice({
  name: "users",
  initialState,
  extraReducers: builder => {
    builder
      .addCase(fetchUsersThunk.fulfilled, (state, { payload }) => {
        state.data = payload
      })
      .addCase(fetchUsersThunk.pending, state => {
        state.isLoading = true
      })
      .addCase(fetchUsersThunk.rejected, (state, { payload }) => {
        state.error = payload
      })
      .addMatcher(
        isAnyOf(fetchUsersThunk.fulfilled, fetchUsersThunk.rejected),
        state => {
          state.isLoading = false
        },
      )
  },
})

export const usersReducer = slice.reducer
