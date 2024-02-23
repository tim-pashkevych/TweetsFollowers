import { createSlice } from "@reduxjs/toolkit"
import { fetchUsersThunk } from "./operations"

const initialState = { users: [], isLoading: false, error: null }

const slice = createSlice({
  name: "users",
  initialState,
  extraReducers: builder => {
    builder.addCase(fetchUsersThunk.fulfilled, (state, { payload }) => {})
  },
})

export const usersReducer = slice.reducer
