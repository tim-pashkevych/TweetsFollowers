import { createSlice, isAnyOf } from "@reduxjs/toolkit"
import { refreshUserThunk } from "./operations"

const initialState = {
  userId: null,
  data: [],
  isLoggedIn: false,
  isLoading: false,
  error: null,
}

const slice = createSlice({
  name: "auth",
  initialState,
  selectors: {
    selectAuthUser: state => state.data,
    selectIsLoggedIn: state => state.isLoggedIn,
    selectIsLoading: state => state.isLoading,
    selectError: state => state.error,
  },
  reducers: {
    login: (state, { payload }) => {
      state.userId = payload.id
      state.data = payload
      state.isLoggedIn = true
      state.error = null
    },
    logout: () => {
      return initialState
    },
  },
  extraReducers: builder => {
    builder
      .addCase(refreshUserThunk.fulfilled, (state, { payload }) => {
        state.data = payload
        state.isLoggedIn = true
      })
      .addCase(refreshUserThunk.pending, state => {
        state.isLoading = true
      })
      .addCase(refreshUserThunk.rejected, (state, { payload }) => {
        state.error = payload
      })
      .addMatcher(
        isAnyOf(refreshUserThunk.fulfilled, refreshUserThunk.rejected),
        state => {
          state.isLoading = false
        },
      )
  },
})

export const authReducer = slice.reducer
export const { login, logout } = slice.actions
export const {
  selectAuthUser,
  selectIsLoggedIn,
  selectIsLoading,
  selectError,
} = slice.selectors
